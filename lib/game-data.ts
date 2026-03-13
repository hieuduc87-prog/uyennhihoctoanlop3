import { createClient } from './supabase'

export interface PlayerProgress {
  level: number
  xp: number
  stars: number
  gems: number
  streak: number
  last_play_date: string | null
  skill_progress: Record<string, { level: number; correct: number; total: number }>
  achievements: Record<string, boolean>
  daily: { date: string | null; missions: DailyMission[] }
  total_correct: number
  total_played: number
  max_combo: number
  corgi_taps: number
}

export interface DailyMission {
  id: string
  name: string
  desc: string
  target: number
  progress: number
  reward: number
  emoji: string
  claimed?: boolean
}

export function defaultProgress(): PlayerProgress {
  return {
    level: 1,
    xp: 0,
    stars: 0,
    gems: 0,
    streak: 0,
    last_play_date: null,
    skill_progress: {},
    achievements: {},
    daily: { date: null, missions: [] },
    total_correct: 0,
    total_played: 0,
    max_combo: 0,
    corgi_taps: 0,
  }
}

const LOCAL_KEY = 'uynhi_corgi_math_v3'

export function loadLocal(): PlayerProgress {
  try {
    const d = JSON.parse(localStorage.getItem(LOCAL_KEY) || '')
    if (d && d.level) return d
  } catch {}
  return defaultProgress()
}

export function saveLocal(data: PlayerProgress) {
  localStorage.setItem(LOCAL_KEY, JSON.stringify(data))
}

export async function loadCloud(userId: string): Promise<PlayerProgress | null> {
  const supabase = createClient()
  const { data, error } = await supabase
    .from('player_progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error || !data) return null

  return {
    level: data.level,
    xp: data.xp,
    stars: data.stars,
    gems: data.gems,
    streak: data.streak,
    last_play_date: data.last_play_date,
    skill_progress: data.skill_progress || {},
    achievements: data.achievements || {},
    daily: data.daily || { date: null, missions: [] },
    total_correct: data.total_correct,
    total_played: data.total_played,
    max_combo: data.max_combo,
    corgi_taps: data.corgi_taps,
  }
}

export async function saveCloud(userId: string, progress: PlayerProgress) {
  const supabase = createClient()
  const { error } = await supabase
    .from('player_progress')
    .upsert({
      user_id: userId,
      level: progress.level,
      xp: progress.xp,
      stars: progress.stars,
      gems: progress.gems,
      streak: progress.streak,
      last_play_date: progress.last_play_date,
      skill_progress: progress.skill_progress,
      achievements: progress.achievements,
      daily: progress.daily,
      total_correct: progress.total_correct,
      total_played: progress.total_played,
      max_combo: progress.max_combo,
      corgi_taps: progress.corgi_taps,
      updated_at: new Date().toISOString(),
    }, { onConflict: 'user_id' })

  if (error) console.error('Save cloud error:', error)
}
