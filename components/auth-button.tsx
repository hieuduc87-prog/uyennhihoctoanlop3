'use client'

import { createClient, isSupabaseConfigured } from '@/lib/supabase'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { User } from '@supabase/supabase-js'

export default function AuthButton() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) return
    const supabase = createClient()
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
  }, [configured])

  if (!configured) return null

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    setUser(null)
    router.refresh()
  }

  if (user) {
    return (
      <button
        onClick={handleLogout}
        style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: 20,
          padding: '8px 16px',
          color: '#fff',
          fontSize: 12,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: "'Nunito', sans-serif",
        }}
      >
        ☁️ {user.email?.split('@')[0]} · Đăng xuất
      </button>
    )
  }

  return (
    <button
      onClick={() => router.push('/login')}
      style={{
        background: 'linear-gradient(135deg, rgba(255,107,157,0.3), rgba(192,132,252,0.3))',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: 20,
        padding: '8px 16px',
        color: '#fff',
        fontSize: 12,
        fontWeight: 600,
        cursor: 'pointer',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      ☁️ Đăng nhập
    </button>
  )
}
