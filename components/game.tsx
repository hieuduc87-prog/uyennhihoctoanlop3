'use client'

import { useEffect, useState } from 'react'

const SAVE_KEY = 'uynhi3sub_v1'

export default function Game() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    setLoaded(true)

    loadCloudData().then(() => {
      const script = document.createElement('script')
      script.src = '/game.js?v=2'
      document.body.appendChild(script)
    })

    let saveTimer: ReturnType<typeof setTimeout>
    const handleSave = () => {
      clearTimeout(saveTimer)
      saveTimer = setTimeout(saveToCloud, 2000)
    }
    window.addEventListener('game-save', handleSave)

    return () => {
      window.removeEventListener('game-save', handleSave)
      clearTimeout(saveTimer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      if (w.__gameTimerInt) clearInterval(w.__gameTimerInt)
    }
  }, [loaded])

  return null
}

async function loadCloudData() {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch('/api/progress?player=uyennhi', { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return
    const { data } = await res.json()
    if (data && data.level) {
      const localRaw = localStorage.getItem(SAVE_KEY)
      if (localRaw) {
        const local = JSON.parse(localRaw)
        const cloudScore = (data.tp || 0) + (data.level || 0) * 1000
        const localScore = (local.tp || 0) + (local.level || 0) * 1000
        if (cloudScore >= localScore) {
          localStorage.setItem(SAVE_KEY, JSON.stringify(data))
        }
      } else {
        localStorage.setItem(SAVE_KEY, JSON.stringify(data))
      }
    }
  } catch {
    // Network error or timeout — use localStorage fallback
  }
}

async function saveToCloud() {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_id: 'uyennhi', data: JSON.parse(raw) })
    })
  } catch {
    // Silently fail
  }
}
