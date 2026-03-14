'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AuthButton() {
  const [username, setUsername] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const u = localStorage.getItem('voicon_user')
    if (u) setUsername(u)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('voicon_user')
    localStorage.removeItem('player_profile')
    document.cookie = 'logged_in=0; path=/; max-age=0'
    document.cookie = 'guest_mode=0; path=/; max-age=0'
    setUsername(null)
    router.push('/login')
  }

  if (username) {
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
        ☁️ {username} · Đăng xuất
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
