import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'
import { getSessionUser } from '@/lib/session'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  return createClient(url, key)
}

/** Verify session user owns this player_id (format: username_grade) */
function verifyOwnership(sessionUser: string | null, player: string): boolean {
  if (!sessionUser) return false
  // player_id is either "username" or "username_vuongquoc_lopX"
  return player === sessionUser || player.startsWith(sessionUser + '_')
}

// GET /api/progress?player=xxx&grade=vuongquoc_lop1
export async function GET(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ data: null })

  const player = req.nextUrl.searchParams.get('player')
  const grade = req.nextUrl.searchParams.get('grade') || ''
  if (!player) return NextResponse.json({ data: null })

  // Verify ownership: session user must match player
  const sessionUser = getSessionUser(req)
  if (!verifyOwnership(sessionUser, player)) {
    // Guest users (no session) can still use local storage, just no cloud sync
    return NextResponse.json({ data: null })
  }

  const playerId = grade ? `${player}_${grade}` : player

  const { data, error } = await supabase
    .from('game_progress')
    .select('data, updated_at')
    .eq('player_id', playerId)
    .single()

  if (error || !data) return NextResponse.json({ data: null })
  return NextResponse.json({ data: data.data, updated_at: data.updated_at })
}

// POST /api/progress { player_id, grade, data }
export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'not configured' }, { status: 503 })

  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  const player = typeof body.player_id === 'string' ? body.player_id : ''
  const grade = typeof body.grade === 'string' ? body.grade : ''
  if (!player) return NextResponse.json({ error: 'player_id required' }, { status: 400 })

  // Verify ownership: session user must match player_id
  const sessionUser = getSessionUser(req)
  if (!verifyOwnership(sessionUser, player)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 })
  }

  const playerId = grade ? `${player}_${grade}` : player

  const { error } = await supabase
    .from('game_progress')
    .upsert({
      player_id: playerId,
      data: body.data,
      updated_at: new Date().toISOString()
    }, { onConflict: 'player_id' })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json({ ok: true })
}
