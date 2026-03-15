import { NextRequest, NextResponse } from 'next/server'
import { MsEdgeTTS, OUTPUT_FORMAT } from 'msedge-tts'

const VOICE_VI = 'vi-VN-NamMinhNeural'
const VOICE_EN = 'en-US-GuyNeural'

export async function GET(req: NextRequest) {
  const text = req.nextUrl.searchParams.get('text')
  const lang = req.nextUrl.searchParams.get('lang') || 'vi'

  if (!text || text.length > 500) {
    return NextResponse.json({ error: 'Invalid text' }, { status: 400 })
  }

  try {
    const tts = new MsEdgeTTS()
    await tts.setMetadata(lang === 'en' ? VOICE_EN : VOICE_VI, OUTPUT_FORMAT.AUDIO_24KHZ_48KBITRATE_MONO_MP3)

    const readable = tts.toStream(text)
    const chunks: Buffer[] = []

    await new Promise<void>((resolve, reject) => {
      readable.on('data', (chunk: { audio: Buffer }) => {
        chunks.push(chunk.audio)
      })
      readable.on('end', () => resolve())
      readable.on('error', reject)
    })

    const audioBuffer = Buffer.concat(chunks)

    return new NextResponse(audioBuffer, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=86400, s-maxage=86400',
      },
    })
  } catch (e) {
    console.error('[TTS Error]', e)
    return NextResponse.json({ error: 'TTS failed' }, { status: 500 })
  }
}
