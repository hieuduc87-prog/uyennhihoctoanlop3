'use client'

import { useEffect, useState } from 'react'

const SAVE_KEY = 'uynhi3sub_v1'

export default function Game() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded) return
    setLoaded(true)

    // Load game.js immediately (don't block on cloud data)
    const script = document.createElement('script')
    script.src = '/game.js?v=4'
    document.body.appendChild(script)

    // Cloud sync in background
    loadCloudData()

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

function migrateOldFormat(old: Record<string, unknown>): Record<string, unknown> {
  // If already new format (has 'sp' key), return as-is
  if (old.sp) return old
  // Migrate from old format (skill_progress, total_correct, etc.)
  return {
    level: old.level || 1,
    xp: old.xp || 0,
    stars: old.stars || 0,
    gems: old.gems || 0,
    streak: old.streak || 0,
    lastPlay: old.last_play_date || old.lastPlay || null,
    sp: old.skill_progress || {},
    ach: old.achievements || {},
    daily: old.daily || { date: null, m: [] },
    tc: old.total_correct || 0,
    tp: old.total_played || 0,
    combo: 0,
    mc: old.max_combo || 0,
    ct: old.corgi_taps || 0,
  }
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
      const migrated = migrateOldFormat(data)
      const localRaw = localStorage.getItem(SAVE_KEY)
      if (localRaw) {
        const local = JSON.parse(localRaw)
        const cloudScore = ((migrated.tp as number) || 0) + ((migrated.level as number) || 0) * 1000
        const localScore = (local.tp || 0) + (local.level || 0) * 1000
        if (cloudScore >= localScore) {
          localStorage.setItem(SAVE_KEY, JSON.stringify(migrated))
        }
      } else {
        localStorage.setItem(SAVE_KEY, JSON.stringify(migrated))
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
