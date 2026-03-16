import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { createHash } from 'crypto'
import { signSession, sessionCookieOptions, getSessionUser } from '@/lib/session'
import { VALID_GRADE_IDS } from '@/lib/grade-registry'

const BCRYPT_ROUNDS = 10

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  return createClient(url, key)
}

// Simple in-memory rate limiter (per-IP, resets on deploy)
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 5
const RATE_WINDOW = 60_000

function isRateLimited(ip: string): boolean {
  const now = Date.now()
  const entry = rateMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW })
    return false
  }
  entry.count++
  return entry.count > RATE_LIMIT
}

// Legacy SHA-256 hash (for migration only)
function legacyHash(pw: string): string {
  return createHash('sha256').update(pw + '_vuongquoc_salt_2026').digest('hex')
}

function sanitize(s: string, maxLen = 50): string {
  return s.trim().slice(0, maxLen)
}

// Helper: set session cookie on response
function setSessionCookie(res: NextResponse, username: string) {
  const opts = sessionCookieOptions()
  res.cookies.set(opts.name, signSession(username), opts)
  res.cookies.set('logged_in', '1', { path: '/', maxAge: opts.maxAge, sameSite: 'lax', secure: opts.secure })
}

const USER_SELECT = 'id,username,display_name,gender,pet,grade,created_at'

// CSRF: verify Origin matches Host
function verifyCsrf(req: NextRequest): boolean {
  const origin = req.headers.get('origin')
  const host = req.headers.get('host')
  if (!origin || !host) return true // Allow non-browser clients (no Origin header)
  try {
    return new URL(origin).host === host
  } catch {
    return false
  }
}

// POST /api/auth — login / register / change-password
export async function POST(req: NextRequest) {
  if (!verifyCsrf(req)) {
    return NextResponse.json({ error: 'Invalid request origin' }, { status: 403 })
  }

  const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    || req.headers.get('x-real-ip')
    || 'unknown'
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: 'Quá nhiều yêu cầu. Thử lại sau 1 phút!' }, { status: 429 })
  }

  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'not configured' }, { status: 503 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const { action } = body
  const username = typeof body.username === 'string' ? sanitize(body.username, 30).toLowerCase() : ''
  const password = typeof body.password === 'string' ? (body.password as string).slice(0, 100) : ''

  if (action === 'login') {
    if (!username || !password) {
      return NextResponse.json({ error: 'Nhập đầy đủ tên đăng nhập và mật khẩu!' }, { status: 400 })
    }

    // Fetch user by username (password verified in app, not in query)
    const { data: users, error } = await supabase
      .from('users')
      .select(USER_SELECT + ',password')
      .eq('username', username)
      .limit(1)

    if (error) return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 })
    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = users[0] as any
    const storedPw: string = user.password || ''
    let verified = false

    // Try bcrypt first
    if (storedPw.startsWith('$2')) {
      verified = await bcrypt.compare(password, storedPw)
    } else {
      // Legacy: SHA-256 only — auto-migrate to bcrypt
      verified = storedPw === legacyHash(password)
      if (verified) {
        const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS)
        await supabase.from('users').update({ password: hashed }).eq('id', user.id)
      }
    }

    if (!verified) {
      return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' }, { status: 401 })
    }

    const { password: _, ...safeUser } = user
    const res = NextResponse.json({ user: safeUser })
    setSessionCookie(res, user.username)
    return res
  }

  if (action === 'register') {
    const display_name = typeof body.display_name === 'string' ? sanitize(body.display_name, 30) : ''
    const gender = body.gender === 'boy' ? 'boy' : 'girl'
    const pet = ['corgi', 'cat', 'trex', 'dragon'].includes(body.pet as string) ? body.pet : 'corgi'
    let grade: string = 'lop1'
    if (typeof body.grade === 'string' && VALID_GRADE_IDS.includes(body.grade)) {
      grade = body.grade
    } else if (typeof body.grade === 'number' && body.grade >= 1 && body.grade <= 5) {
      grade = 'lop' + body.grade
    }
    const email = typeof body.email === 'string' ? sanitize(body.email, 100) : ''

    if (!username || !password || !display_name) {
      return NextResponse.json({ error: 'Thiếu thông tin đăng ký' }, { status: 400 })
    }
    if (username.length < 3) {
      return NextResponse.json({ error: 'Tên đăng nhập cần ít nhất 3 ký tự!' }, { status: 400 })
    }
    if (!/^[a-z0-9_]+$/.test(username)) {
      return NextResponse.json({ error: 'Tên đăng nhập chỉ gồm chữ thường, số và dấu _' }, { status: 400 })
    }
    if (password.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu cần ít nhất 6 ký tự!' }, { status: 400 })
    }

    const hashed = await bcrypt.hash(password, BCRYPT_ROUNDS)
    const row: Record<string, unknown> = {
      username,
      password: hashed,
      display_name,
      gender,
      pet,
      grade,
    }
    if (email && email.includes('@')) row.email = email

    const { data, error } = await supabase
      .from('users')
      .insert(row)
      .select(USER_SELECT)

    if (error) {
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        return NextResponse.json({ error: 'Tên đăng nhập đã có người dùng!' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Lỗi đăng ký. Thử lại nhé!' }, { status: 500 })
    }
    const user = Array.isArray(data) ? data[0] : data
    const res = NextResponse.json({ user })
    if (user?.username) {
      setSessionCookie(res, user.username)
    }
    return res
  }

  if (action === 'change-password') {
    // Verify session: only allow changing own password
    const sessionUser = getSessionUser(req)
    if (!sessionUser || sessionUser !== username) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
    }

    const newPassword = typeof body.new_password === 'string' ? (body.new_password as string).slice(0, 100) : ''
    if (!username || !password || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu mới cần ít nhất 6 ký tự!' }, { status: 400 })
    }

    // Fetch user to verify old password
    const { data: users } = await supabase
      .from('users')
      .select('id,password')
      .eq('username', username)
      .limit(1)

    if (!users || users.length === 0) {
      return NextResponse.json({ error: 'Mật khẩu cũ sai!' }, { status: 401 })
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const user = users[0] as any
    const storedPw: string = user.password || ''
    let verified = false

    if (storedPw.startsWith('$2')) {
      verified = await bcrypt.compare(password, storedPw)
    } else {
      verified = storedPw === legacyHash(password)
    }

    if (!verified) {
      return NextResponse.json({ error: 'Mật khẩu cũ sai!' }, { status: 401 })
    }

    const hashed = await bcrypt.hash(newPassword, BCRYPT_ROUNDS)
    const { error: updateErr } = await supabase
      .from('users')
      .update({ password: hashed })
      .eq('id', user.id)

    if (updateErr) return NextResponse.json({ error: 'Lỗi cập nhật. Thử lại!' }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
