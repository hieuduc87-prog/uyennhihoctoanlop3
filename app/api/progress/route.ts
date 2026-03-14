import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  if (!url || !key || url === 'your-supabase-url') return null
  return createClient(url, key)
}

// GET /api/progress?player=uyennhi
export async function GET(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ data: null })

  const playerId = req.nextUrl.searchParams.get('player') || 'uyennhi'

  const { data, error } = await supabase
    .from('game_progress')
    .select('data, updated_at')
    .eq('player_id', playerId)
    .single()

  if (error || !data) return NextResponse.json({ data: null })
  return NextResponse.json({ data: data.data, updated_at: data.updated_at })
}

// POST /api/progress { player_id, data }
export async function POST(req: NextRequest) {
  const supabase = getSupabase()
  if (!supabase) return NextResponse.json({ error: 'not configured' }, { status: 503 })

  const body = await req.json()
  const playerId = body.player_id || 'uyennhi'

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
