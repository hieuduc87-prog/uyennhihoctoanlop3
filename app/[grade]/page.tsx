'use client'

import { use } from 'react'
import { notFound } from 'next/navigation'
import GameShell from '@/components/game-shell'
import { getGrade } from '@/lib/grade-registry'

export default function GradePage({ params }: { params: Promise<{ grade: string }> }) {
  const { grade } = use(params)
  const entry = getGrade(grade)
  if (!entry) notFound()
  return <GameShell gradeScript={`/grades/${entry.id}.js`} saveKey={`vuongquoc_${entry.id}`} />
}
