import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { signSession, sessionCookieOptions } from '@/lib/session'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  return createClient(url, key)
}

// Simple in-memory rate limiter (per-IP, resets on deploy)
const rateMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 10 // max attempts
const RATE_WINDOW = 60_000 // per 1 minute

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

function hashPassword(pw: string): string {
  return createHash('sha256').update(pw + '_vuongquoc_salt_2026').digest('hex')
}

function sanitize(s: string, maxLen = 50): string {
  return s.trim().slice(0, maxLen)
}

// POST /api/auth — login / register / change-password
export async function POST(req: NextRequest) {
  // Rate limit by IP
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

    // Try hashed password first, fallback to plaintext for legacy accounts
    const hashed = hashPassword(password)
    let { data, error } = await supabase
      .from('users')
      .select('id,username,display_name,gender,pet,grade,created_at')
      .eq('username', username)
      .eq('password', hashed)
      .limit(1)

    if (!error && (!data || data.length === 0)) {
      // Fallback: check plaintext password (legacy)
      const legacy = await supabase
        .from('users')
        .select('id,username,display_name,gender,pet,grade,created_at')
        .eq('username', username)
        .eq('password', password)
        .limit(1)
      data = legacy.data
      error = legacy.error

      // Auto-migrate: hash the plaintext password
      if (data && data.length > 0) {
        await supabase
          .from('users')
          .update({ password: hashed })
          .eq('username', username)
          .eq('password', password)
      }
    }

    if (error) return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 })
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' }, { status: 401 })
    }
    // Never return password field — set signed session cookie
    const res = NextResponse.json({ user: data[0] })
    const opts = sessionCookieOptions()
    res.cookies.set(opts.name, signSession(data[0].username), opts)
    return res
  }

  if (action === 'register') {
    const display_name = typeof body.display_name === 'string' ? sanitize(body.display_name, 30) : ''
    const gender = body.gender === 'boy' ? 'boy' : 'girl'
    const pet = ['corgi', 'cat', 'elephant'].includes(body.pet as string) ? body.pet : 'corgi'
    const grade = typeof body.grade === 'number' && body.grade >= 1 && body.grade <= 5 ? body.grade : 1
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

    const row: Record<string, unknown> = {
      username,
      password: hashPassword(password),
      display_name,
      gender,
      pet,
      grade,
    }
    if (email && email.includes('@')) row.email = email

    const { data, error } = await supabase
      .from('users')
      .insert(row)
      .select('id,username,display_name,gender,pet,grade,created_at')

    if (error) {
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        return NextResponse.json({ error: 'Tên đăng nhập đã có người dùng!' }, { status: 409 })
      }
      return NextResponse.json({ error: 'Lỗi đăng ký. Thử lại nhé!' }, { status: 500 })
    }
    const user = Array.isArray(data) ? data[0] : data
    const res = NextResponse.json({ user })
    if (user?.username) {
      const opts = sessionCookieOptions()
      res.cookies.set(opts.name, signSession(user.username), opts)
    }
    return res
  }

  if (action === 'change-password') {
    const newPassword = typeof body.new_password === 'string' ? (body.new_password as string).slice(0, 100) : ''
    if (!username || !password || !newPassword) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }
    if (newPassword.length < 6) {
      return NextResponse.json({ error: 'Mật khẩu mới cần ít nhất 6 ký tự!' }, { status: 400 })
    }

    // Verify old password (try hashed, then plaintext)
    const hashed = hashPassword(password)
    let { data: check } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .eq('password', hashed)
      .limit(1)

    if (!check || check.length === 0) {
      const legacy = await supabase
        .from('users')
        .select('id')
        .eq('username', username)
        .eq('password', password)
        .limit(1)
      check = legacy.data
    }

    if (!check || check.length === 0) {
      return NextResponse.json({ error: 'Mật khẩu cũ sai!' }, { status: 401 })
    }

    const { error: updateErr } = await supabase
      .from('users')
      .update({ password: hashPassword(newPassword) })
      .eq('id', check[0].id)

    if (updateErr) return NextResponse.json({ error: 'Lỗi cập nhật. Thử lại!' }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
