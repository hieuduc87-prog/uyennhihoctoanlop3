import { logEvent } from 'firebase/analytics'
import { getFirebaseAnalytics } from './firebase'

async function track(event: string, params?: Record<string, string | number | boolean>) {
  const analytics = await getFirebaseAnalytics()
  if (!analytics) return
  logEvent(analytics, event, params)
}

// --- Game events ---

export function trackQuestionAnswered(params: {
  grade: string
  subject: string
  correct: boolean
  difficulty?: number
  time_spent_ms?: number
}) {
  track('question_answered', params)
}

export function trackLevelCompleted(params: {
  grade: string
  level: number
  stars_earned: number
  gems_earned: number
}) {
  track('level_completed', params)
}

export function trackSubjectSelected(params: {
  grade: string
  subject: string
}) {
  track('subject_selected', params)
}

export function trackStreak(params: {
  grade: string
  streak_count: number
}) {
  track('streak_count', params)
}

export function trackSessionDuration(params: {
  grade: string
  duration_seconds: number
  questions_played: number
}) {
  track('session_duration', params)
}

export function trackSpinWheel(params: {
  grade: string
  prize: string
  cost_gems: number
}) {
  track('spin_wheel', params)
}

export function trackPetEvolution(params: {
  pet: string
  new_level: number
}) {
  track('pet_evolution', params)
}

export function trackLogin(method: 'password' | 'guest') {
  track('login', { method })
}

export function trackRegister() {
  track('sign_up', { method: 'password' })
}

export { track }
