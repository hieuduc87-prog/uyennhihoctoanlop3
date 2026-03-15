export interface GradeEntry {
  id: string
  name: string
  emoji: string
  desc: string
  color: string
  mascot: string
  order: number
}

export const GRADE_REGISTRY: GradeEntry[] = [
  { id: 'lop1', name: 'Lớp 1', emoji: '🐕', desc: '9 Toán + 6 TV + 6 Eng', color: '#ff5a9e', mascot: '/pets/corgi_level_1.svg', order: 1 },
  { id: 'lop2', name: 'Lớp 2', emoji: '🐱', desc: '9 Toán + 7 TV + 6 Eng', color: '#10b981', mascot: '/pets/cat_level_2.svg', order: 2 },
  { id: 'lop3', name: 'Lớp 3', emoji: '🦖', desc: '10 Toán + 8 TV + 8 Eng', color: '#b44dff', mascot: '/pets/trex_level_3.svg', order: 3 },
  { id: 'lop4', name: 'Lớp 4', emoji: '🐉', desc: '10 Toán + 8 TV + 8 Eng', color: '#f59e0b', mascot: '/pets/dragon_level_4.svg', order: 4 },
  { id: 'lop5', name: 'Lớp 5', emoji: '👑', desc: '10 Toán + 8 TV + 8 Eng', color: '#ef4444', mascot: '/characters/girl_level_5.svg', order: 5 },
]

export function getGrade(id: string): GradeEntry | undefined {
  return GRADE_REGISTRY.find(g => g.id === id)
}
