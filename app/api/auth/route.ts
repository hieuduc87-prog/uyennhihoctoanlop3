import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  return createClient(url, key)
}

// POST /api/auth — login
export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'not configured' }, { status: 503 })

  const body = await req.json()
  const { action, username, password, display_name, gender, pet, email, grade } = body

  if (action === 'login') {
    if (!username || !password) {
      return NextResponse.json({ error: 'Nhập đầy đủ tên đăng nhập và mật khẩu!' }, { status: 400 })
    }
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('username', username.trim().toLowerCase())
      .eq('password', password)
      .limit(1)

    if (error) return NextResponse.json({ error: 'Lỗi hệ thống' }, { status: 500 })
    if (!data || data.length === 0) {
      return NextResponse.json({ error: 'Sai tên đăng nhập hoặc mật khẩu!' }, { status: 401 })
    }
    return NextResponse.json({ user: data[0] })
  }

  if (action === 'register') {
    if (!username || !password || !display_name) {
      return NextResponse.json({ error: 'Thiếu thông tin đăng ký' }, { status: 400 })
    }
    const row: Record<string, unknown> = {
      username: username.trim().toLowerCase(),
      password,
      display_name: display_name.trim(),
      gender: gender || 'girl',
      pet: pet || 'corgi',
      grade: grade || 0,
    }
    if (email) row.email = email.trim()

    const { data, error } = await supabase
      .from('users')
      .insert(row)
      .select()

    if (error) {
      if (error.message?.includes('unique') || error.message?.includes('duplicate')) {
        return NextResponse.json({ error: 'Tên đăng nhập đã có người dùng!' }, { status: 409 })
      }
      return NextResponse.json({ error: error.message }, { status: 500 })
    }
    const user = Array.isArray(data) ? data[0] : data
    return NextResponse.json({ user })
  }

  if (action === 'change-password') {
    if (!username || !password || !body.new_password) {
      return NextResponse.json({ error: 'Thiếu thông tin' }, { status: 400 })
    }
    // Verify old password
    const { data: check } = await supabase
      .from('users')
      .select('id')
      .eq('username', username)
      .eq('password', password)
      .limit(1)

    if (!check || check.length === 0) {
      return NextResponse.json({ error: 'Mật khẩu cũ sai!' }, { status: 401 })
    }
    // Update
    const { error: updateErr } = await supabase
      .from('users')
      .update({ password: body.new_password })
      .eq('username', username)

    if (updateErr) return NextResponse.json({ error: updateErr.message }, { status: 500 })
    return NextResponse.json({ ok: true })
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 })
}
