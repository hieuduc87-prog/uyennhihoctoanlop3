// ============ ICON SYSTEM CONFIG ============
// 44 icons across 6 categories, designed for 3D Pixar style at generation time
// Each icon has: name, label (Vietnamese), category, color, SVG path, emoji fallback

export interface IconDef {
  name: string
  label: string
  category: string
  color: string
  emoji: string      // fallback when image not available
  path: string       // SVG path data (viewBox 0 0 24 24)
  desc?: string      // description for AI art generation prompt
}

export interface IconCategory {
  id: string
  label: string
  color: string
}

export const ICON_CATEGORIES: IconCategory[] = [
  { id: 'subjects',     label: 'Môn Học',       color: '#ff5a9e' },
  { id: 'grades',       label: 'Lớp Học',       color: '#b44dff' },
  { id: 'navigation',   label: 'Điều Hướng',    color: '#3dc2ff' },
  { id: 'actions',      label: 'Hành Động',     color: '#2ddba6' },
  { id: 'rewards',      label: 'Phần Thưởng',   color: '#ffc233' },
  { id: 'ui_elements',  label: 'Giao Diện',     color: '#ff6b6b' },
]

export const ICON_SIZES = {
  xs: 16,
  sm: 20,
  md: 24,
  lg: 32,
  xl: 40,
  xxl: 48,
  hero: 64,
} as const

export type IconSize = keyof typeof ICON_SIZES

export const ALL_ICONS: IconDef[] = [
  // --- subjects (3) ---
  { name: 'math',        label: 'Toán',          category: 'subjects',    color: '#ff5a9e', emoji: '🔢',
    path: 'M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm3 5v2h2v-2H9zm4 0v2h2v-2h-2zm-4 4v2h2v-2H9zm4 4v2h2v-2h-2zm-4 0v2h2v-2H9zm4-4v2h2v-2h-2z',
    desc: 'Calculator with numbers, 3D cartoon style, pink tones' },
  { name: 'vietnamese',  label: 'Tiếng Việt',    category: 'subjects',    color: '#b44dff', emoji: '📝',
    path: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 4v2h10V7H7zm0 4v2h8v-2H7zm0 4v2h6v-2H7z',
    desc: 'Open book with Vietnamese text, 3D cartoon style, purple tones' },
  { name: 'english',     label: 'English',       category: 'subjects',    color: '#3dc2ff', emoji: '🌍',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z',
    desc: 'Globe with ABC letters, 3D cartoon style, sky blue tones' },
  // --- grades (5) ---
  { name: 'grade1', label: 'Lớp 1', category: 'grades', color: '#ff5a9e', emoji: '🐘',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    desc: 'Number 1 badge with elephant, pink, 3D Pixar' },
  { name: 'grade2', label: 'Lớp 2', category: 'grades', color: '#10b981', emoji: '🦊',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    desc: 'Number 2 badge with fox, green, 3D Pixar' },
  { name: 'grade3', label: 'Lớp 3', category: 'grades', color: '#b44dff', emoji: '🐕',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    desc: 'Number 3 badge with corgi, purple, 3D Pixar' },
  { name: 'grade4', label: 'Lớp 4', category: 'grades', color: '#f59e0b', emoji: '🐱',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    desc: 'Number 4 badge with cat, amber, 3D Pixar' },
  { name: 'grade5', label: 'Lớp 5', category: 'grades', color: '#ef4444', emoji: '🦁',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z',
    desc: 'Number 5 badge with lion, red, 3D Pixar' },
  // --- navigation (4) ---
  { name: 'home', label: 'Trang Chủ', category: 'navigation', color: '#3dc2ff', emoji: '🏠',
    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { name: 'back', label: 'Quay Lại', category: 'navigation', color: '#3dc2ff', emoji: '⬅️',
    path: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' },
  { name: 'next', label: 'Tiếp Theo', category: 'navigation', color: '#3dc2ff', emoji: '➡️',
    path: 'M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z' },
  { name: 'menu', label: 'Menu', category: 'navigation', color: '#b44dff', emoji: '☰',
    path: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' },
  // --- actions (5) ---
  { name: 'play', label: 'Chơi', category: 'actions', color: '#2ddba6', emoji: '▶️',
    path: 'M8 5v14l11-7z' },
  { name: 'pause', label: 'Tạm Dừng', category: 'actions', color: '#ffc233', emoji: '⏸️',
    path: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' },
  { name: 'check', label: 'Đúng', category: 'actions', color: '#2ddba6', emoji: '✅',
    path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
  { name: 'close', label: 'Đóng', category: 'actions', color: '#ff6b6b', emoji: '❌',
    path: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' },
  { name: 'refresh', label: 'Làm Lại', category: 'actions', color: '#3dc2ff', emoji: '🔄',
    path: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' },
  // --- rewards (4) ---
  { name: 'star', label: 'Ngôi Sao', category: 'rewards', color: '#ffc233', emoji: '⭐',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'trophy', label: 'Cúp', category: 'rewards', color: '#ffc233', emoji: '🏆',
    path: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z' },
  { name: 'gem', label: 'Kim Cương', category: 'rewards', color: '#b44dff', emoji: '💎',
    path: 'M19 3H5L2 9l10 12L22 9l-3-6zm-7 11.17L6.2 9h11.6L12 14.17z' },
  { name: 'heart', label: 'Tim', category: 'rewards', color: '#ff5a9e', emoji: '❤️',
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  // --- ui_elements (4) ---
  { name: 'settings', label: 'Cài Đặt', category: 'ui_elements', color: '#ff6b6b', emoji: '⚙️',
    path: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
  { name: 'sound_on', label: 'Âm Thanh', category: 'ui_elements', color: '#2ddba6', emoji: '🔊',
    path: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' },
  { name: 'sound_off', label: 'Tắt Tiếng', category: 'ui_elements', color: '#ff6b6b', emoji: '🔇',
    path: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' },
  { name: 'fullscreen', label: 'Toàn Màn Hình', category: 'ui_elements', color: '#b44dff', emoji: '⛶',
    path: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' },
]

export function getIcon(name: string): IconDef | undefined {
  return ALL_ICONS.find(i => i.name === name)
}

export function getIconsByCategory(category: string): IconDef[] {
  return ALL_ICONS.filter(i => i.category === category)
}
