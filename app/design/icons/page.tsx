'use client'

import { useState, useMemo } from 'react'

/* ------------------------------------------------------------------ */
/*  DATA                                                               */
/* ------------------------------------------------------------------ */

interface IconDef {
  name: string
  label: string
  category: string
  color: string
  path: string          // SVG path(s)
  viewBox?: string
}

const ICON_CATEGORIES = [
  { id: 'subjects',     label: 'Mon Hoc',       color: '#ff5a9e' },
  { id: 'grades',       label: 'Lop Hoc',       color: '#b44dff' },
  { id: 'navigation',   label: 'Dieu Huong',    color: '#3dc2ff' },
  { id: 'actions',      label: 'Hanh Dong',     color: '#2ddba6' },
  { id: 'rewards',      label: 'Phan Thuong',   color: '#ffc233' },
  { id: 'ui_elements',  label: 'Giao Dien',     color: '#ff6b6b' },
] as const

const ALL_ICONS: IconDef[] = [
  // --- subjects ---
  { name: 'math',        label: 'Toan',          category: 'subjects',    color: '#ff5a9e',
    path: 'M6 2h12a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2zm3 5v2h2v-2H9zm4 0v2h2v-2h-2zm-4 4v2h2v-2H9zm4 4v2h2v-2h-2zm-4 0v2h2v-2H9zm4-4v2h2v-2h-2z' },
  { name: 'vietnamese',  label: 'Tieng Viet',    category: 'subjects',    color: '#b44dff',
    path: 'M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2zm2 4v2h10V7H7zm0 4v2h8v-2H7zm0 4v2h6v-2H7z' },
  { name: 'english',     label: 'English',       category: 'subjects',    color: '#3dc2ff',
    path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z' },
  // --- grades ---
  { name: 'grade1',      label: 'Lop 1',         category: 'grades',      color: '#ff5a9e',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'grade2',      label: 'Lop 2',         category: 'grades',      color: '#ffc233',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'grade3',      label: 'Lop 3',         category: 'grades',      color: '#2ddba6',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  // --- navigation ---
  { name: 'home',        label: 'Trang Chu',     category: 'navigation',  color: '#3dc2ff',
    path: 'M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z' },
  { name: 'back',        label: 'Quay Lai',      category: 'navigation',  color: '#3dc2ff',
    path: 'M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z' },
  { name: 'next',        label: 'Tiep Theo',     category: 'navigation',  color: '#3dc2ff',
    path: 'M4 11h12.17l-5.59-5.59L12 4l8 8-8 8-1.41-1.41L16.17 13H4v-2z' },
  { name: 'menu',        label: 'Menu',          category: 'navigation',  color: '#b44dff',
    path: 'M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z' },
  // --- actions ---
  { name: 'play',        label: 'Choi',          category: 'actions',     color: '#2ddba6',
    path: 'M8 5v14l11-7z' },
  { name: 'pause',       label: 'Tam Dung',      category: 'actions',     color: '#ffc233',
    path: 'M6 19h4V5H6v14zm8-14v14h4V5h-4z' },
  { name: 'check',       label: 'Dung',          category: 'actions',     color: '#2ddba6',
    path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z' },
  { name: 'close',       label: 'Dong',          category: 'actions',     color: '#ff6b6b',
    path: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' },
  { name: 'refresh',     label: 'Lam Lai',       category: 'actions',     color: '#3dc2ff',
    path: 'M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z' },
  // --- rewards ---
  { name: 'star',        label: 'Ngoi Sao',      category: 'rewards',     color: '#ffc233',
    path: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z' },
  { name: 'trophy',      label: 'Cup',           category: 'rewards',     color: '#ffc233',
    path: 'M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z' },
  { name: 'gem',         label: 'Kim Cuong',     category: 'rewards',     color: '#b44dff',
    path: 'M19 3H5L2 9l10 12L22 9l-3-6zm-7 11.17L6.2 9h11.6L12 14.17z' },
  { name: 'heart',       label: 'Tim',           category: 'rewards',     color: '#ff5a9e',
    path: 'M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' },
  // --- ui_elements ---
  { name: 'settings',    label: 'Cai Dat',       category: 'ui_elements', color: '#ff6b6b',
    path: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54a.484.484 0 00-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z' },
  { name: 'sound_on',    label: 'Am Thanh',      category: 'ui_elements', color: '#2ddba6',
    path: 'M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z' },
  { name: 'sound_off',   label: 'Tat Tieng',     category: 'ui_elements', color: '#ff6b6b',
    path: 'M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06a8.99 8.99 0 003.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z' },
  { name: 'fullscreen',  label: 'Toan Man Hinh', category: 'ui_elements', color: '#b44dff',
    path: 'M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z' },
]

/* ------------------------------------------------------------------ */
/*  Icon3D — SVG renderer with 3D look                                */
/* ------------------------------------------------------------------ */

function lighten(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(255 * pct))
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * pct))
  const b = Math.min(255, (n & 0xff) + Math.round(255 * pct))
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`
}

function Icon3D({
  icon,
  size = 48,
  showLabel = true,
}: {
  icon: IconDef
  size?: number
  showLabel?: boolean
}) {
  const pad = Math.round(size * 0.18)
  const total = size + pad * 2
  const light = lighten(icon.color, 0.25)

  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
      <svg
        width={total}
        height={total}
        viewBox={`0 0 ${total} ${total}`}
        style={{ filter: `drop-shadow(0 ${Math.round(size * 0.08)}px ${Math.round(size * 0.15)}px rgba(0,0,0,.35))` }}
      >
        <defs>
          <linearGradient id={`bg-${icon.name}-${size}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={light} />
            <stop offset="100%" stopColor={icon.color} />
          </linearGradient>
          <linearGradient id={`shine-${icon.name}-${size}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,.45)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>
        </defs>
        {/* background pill */}
        <rect
          x={0} y={0} width={total} height={total}
          rx={Math.round(total * 0.26)} ry={Math.round(total * 0.26)}
          fill={`url(#bg-${icon.name}-${size})`}
        />
        {/* shine overlay */}
        <rect
          x={0} y={0} width={total} height={total * 0.55}
          rx={Math.round(total * 0.26)} ry={Math.round(total * 0.26)}
          fill={`url(#shine-${icon.name}-${size})`}
        />
        {/* icon path */}
        <g transform={`translate(${pad},${pad}) scale(${size / 24})`}>
          <path d={icon.path} fill="#fff" />
        </g>
      </svg>
      {showLabel && (
        <span style={{ fontSize: Math.max(11, Math.round(size * 0.26)), color: 'rgba(255,255,255,.7)', fontWeight: 600 }}>
          {icon.label}
        </span>
      )}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Shared UI bits                                                     */
/* ------------------------------------------------------------------ */

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: "'Baloo 2',cursive",
      fontSize: 26,
      fontWeight: 800,
      marginBottom: 16,
      background: 'linear-gradient(135deg,#ff5a9e,#ffc233)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
    }}>
      {children}
    </h2>
  )
}

const preStyle: React.CSSProperties = {
  background: 'rgba(0,0,0,.35)',
  borderRadius: 12,
  padding: 16,
  fontSize: 13,
  lineHeight: 1.6,
  overflowX: 'auto',
  color: '#e0e0e0',
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
}

/* ------------------------------------------------------------------ */
/*  Tabs                                                               */
/* ------------------------------------------------------------------ */

function GalleryTab({ filter }: { filter: string }) {
  const filtered = useMemo(() => {
    if (filter === 'all') return ALL_ICONS
    return ALL_ICONS.filter(i => i.category === filter)
  }, [filter])

  const grouped = useMemo(() => {
    const map = new Map<string, IconDef[]>()
    for (const icon of filtered) {
      const arr = map.get(icon.category) || []
      arr.push(icon)
      map.set(icon.category, arr)
    }
    return map
  }, [filtered])

  return (
    <div>
      {[...grouped.entries()].map(([catId, icons]) => {
        const cat = ICON_CATEGORIES.find(c => c.id === catId)
        return (
          <div key={catId} style={{ marginBottom: 32 }}>
            <div style={{
              fontSize: 16, fontWeight: 700, color: cat?.color ?? '#fff',
              marginBottom: 12, textTransform: 'uppercase', letterSpacing: 1,
            }}>
              {cat?.label ?? catId}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
              {icons.map(icon => (
                <div
                  key={icon.name}
                  style={{
                    background: 'rgba(255,255,255,.06)',
                    borderRadius: 16,
                    padding: '16px 12px',
                    textAlign: 'center',
                    minWidth: 90,
                    transition: 'transform .15s',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)')}
                  onMouseLeave={e => (e.currentTarget.style.transform = '')}
                >
                  <Icon3D icon={icon} size={48} />
                </div>
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

function SizesTab() {
  const sizes = [24, 32, 48, 64, 96]
  const sample = ALL_ICONS[0] // math icon

  return (
    <div>
      <Heading>Kich Thuoc</Heading>
      <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 20, fontSize: 14 }}>
        Cac kich thuoc icon tu 24px den 96px. Dung size 48 lam mac dinh.
      </p>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 28, alignItems: 'flex-end' }}>
        {sizes.map(s => (
          <div key={s} style={{ textAlign: 'center' }}>
            <Icon3D icon={sample} size={s} showLabel={false} />
            <div style={{ marginTop: 8, fontSize: 13, color: 'rgba(255,255,255,.5)', fontWeight: 600 }}>
              {s}px
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 36 }}>
        <Heading>Tat Ca Icon - 64px</Heading>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
          {ALL_ICONS.map(icon => (
            <Icon3D key={icon.name} icon={icon} size={64} />
          ))}
        </div>
      </div>
    </div>
  )
}

function PromptsTab() {
  return (
    <div>
      <Heading>Prompt Tao Icon</Heading>
      <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 20, fontSize: 14 }}>
        Cac prompt de tao icon 3D cho du an game hoc tap tre em.
      </p>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#ffc233', marginBottom: 8 }}>
            Style chung:
          </div>
          <pre style={preStyle}>{`3D cartoon icon, cute rounded style, vibrant gradient background,
glossy highlight on top, soft shadow underneath,
child-friendly, playful, mobile game UI style,
no text, centered composition, solid color background for easy extraction`}</pre>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#ff5a9e', marginBottom: 8 }}>
            Icon mon Toan:
          </div>
          <pre style={preStyle}>{`3D cartoon math icon, cute calculator with big buttons and happy face,
pink-to-magenta gradient background (#ff5a9e),
glossy bubble style, rounded corners,
child-friendly game UI, no text`}</pre>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#b44dff', marginBottom: 8 }}>
            Icon mon Tieng Viet:
          </div>
          <pre style={preStyle}>{`3D cartoon Vietnamese language icon, cute open book with colorful pages,
purple gradient background (#b44dff),
glossy highlight, rounded bubbly style,
child-friendly game UI, no text`}</pre>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#3dc2ff', marginBottom: 8 }}>
            Icon mon English:
          </div>
          <pre style={preStyle}>{`3D cartoon English language icon, cute globe with ABC letters floating,
cyan-blue gradient background (#3dc2ff),
glossy bubble style, playful,
child-friendly game UI, no text`}</pre>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#2ddba6', marginBottom: 8 }}>
            Icon hanh dong (Play, Check...):
          </div>
          <pre style={preStyle}>{`3D cartoon play button icon, rounded triangle in circle,
green-mint gradient background (#2ddba6),
glossy highlight on top half, soft bottom shadow,
child-friendly game UI, no text`}</pre>
        </div>

        <div>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#ffc233', marginBottom: 8 }}>
            Icon phan thuong (Star, Trophy...):
          </div>
          <pre style={preStyle}>{`3D cartoon golden star icon, shiny metallic gold surface,
golden-yellow gradient background (#ffc233),
sparkle effects, glossy highlight,
child-friendly reward UI, no text`}</pre>
        </div>
      </div>
    </div>
  )
}

function CodeTab() {
  const sampleCode = `import { Icon3D } from '@/components/Icon3D'

// Basic usage
<Icon3D icon={icons.math} size={48} />

// Without label
<Icon3D icon={icons.star} size={32} showLabel={false} />

// Icon data structure
const icon: IconDef = {
  name: 'math',
  label: 'Toan',
  category: 'subjects',
  color: '#ff5a9e',
  path: 'M6 2h12a2 2 0 012 2v16...',
}

// Color categories
const CATEGORIES = {
  subjects:    '#ff5a9e',  // Pink
  grades:      '#b44dff',  // Purple
  navigation:  '#3dc2ff',  // Cyan
  actions:     '#2ddba6',  // Mint
  rewards:     '#ffc233',  // Gold
  ui_elements: '#ff6b6b',  // Red
}

// lighten() utility
function lighten(hex: string, pct: number): string {
  const n = parseInt(hex.replace('#', ''), 16)
  const r = Math.min(255, ((n >> 16) & 0xff) + Math.round(255 * pct))
  const g = Math.min(255, ((n >> 8) & 0xff) + Math.round(255 * pct))
  const b = Math.min(255, (n & 0xff) + Math.round(255 * pct))
  return \`#\${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}\`
}`

  return (
    <div>
      <Heading>Code Tham Khao</Heading>
      <p style={{ color: 'rgba(255,255,255,.6)', marginBottom: 20, fontSize: 14 }}>
        Cach su dung Icon3D component trong code.
      </p>
      <pre style={preStyle}>{sampleCode}</pre>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main page component                                                */
/* ------------------------------------------------------------------ */

const TABS = [
  { id: 'gallery', label: 'Gallery' },
  { id: 'sizes',   label: 'Sizes' },
  { id: 'prompts', label: 'Prompts' },
  { id: 'code',    label: 'Code' },
] as const

type TabId = (typeof TABS)[number]['id']

export default function IconSystemDesign() {
  const [activeTab, setActiveTab] = useState<TabId>('gallery')
  const [filter, setFilter] = useState('all')

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(170deg,#1b0a3c 0%,#2d1463 35%,#3a1878 60%,#2a1260 100%)',
      color: '#fff',
      fontFamily: "'Nunito',sans-serif",
      padding: '30px 20px',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* Title */}
        <h1 style={{
          fontFamily: "'Baloo 2',cursive",
          fontSize: 36,
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: 8,
          background: 'linear-gradient(135deg,#ff5a9e,#ffc233,#b44dff,#3dc2ff)',
          backgroundSize: '300% 300%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Icon System
        </h1>
        <p style={{ textAlign: 'center', color: 'rgba(255,255,255,.5)', fontSize: 14, marginBottom: 28 }}>
          He thong icon 3D cho Vuong Quoc Hoc Gioi
        </p>

        {/* Tab bar */}
        <div style={{
          display: 'flex',
          gap: 8,
          justifyContent: 'center',
          marginBottom: 24,
          flexWrap: 'wrap',
        }}>
          {TABS.map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              style={{
                padding: '8px 20px',
                borderRadius: 20,
                border: 'none',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
                fontFamily: "'Nunito',sans-serif",
                transition: 'all .15s',
                background: activeTab === t.id
                  ? 'linear-gradient(135deg,#ff5a9e,#b44dff)'
                  : 'rgba(255,255,255,.1)',
                color: '#fff',
                boxShadow: activeTab === t.id
                  ? '0 4px 0 rgba(0,0,0,.25),0 8px 20px rgba(255,90,158,.3)'
                  : '0 2px 0 rgba(0,0,0,.15)',
              }}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Category filter (gallery tab only) */}
        {activeTab === 'gallery' && (
          <div style={{
            display: 'flex',
            gap: 6,
            justifyContent: 'center',
            marginBottom: 24,
            flexWrap: 'wrap',
          }}>
            <button
              onClick={() => setFilter('all')}
              style={{
                padding: '5px 14px',
                borderRadius: 14,
                border: filter === 'all' ? '2px solid #ffc233' : '2px solid rgba(255,255,255,.15)',
                background: filter === 'all' ? 'rgba(255,194,51,.15)' : 'transparent',
                color: filter === 'all' ? '#ffc233' : 'rgba(255,255,255,.5)',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                fontFamily: "'Nunito',sans-serif",
              }}
            >
              Tat Ca
            </button>
            {ICON_CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setFilter(cat.id)}
                style={{
                  padding: '5px 14px',
                  borderRadius: 14,
                  border: filter === cat.id ? `2px solid ${cat.color}` : '2px solid rgba(255,255,255,.15)',
                  background: filter === cat.id ? `${cat.color}22` : 'transparent',
                  color: filter === cat.id ? cat.color : 'rgba(255,255,255,.5)',
                  fontSize: 12,
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontFamily: "'Nunito',sans-serif",
                }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}

        {/* Tab content */}
        <div style={{
          background: 'rgba(255,255,255,.04)',
          borderRadius: 20,
          padding: 24,
          border: '1px solid rgba(255,255,255,.08)',
        }}>
          {activeTab === 'gallery' && <GalleryTab filter={filter} />}
          {activeTab === 'sizes' && <SizesTab />}
          {activeTab === 'prompts' && <PromptsTab />}
          {activeTab === 'code' && <CodeTab />}
        </div>

        {/* Footer */}
        <div style={{
          textAlign: 'center',
          marginTop: 32,
          fontSize: 12,
          color: 'rgba(255,255,255,.3)',
        }}>
          Vuong Quoc Hoc Gioi - Icon System Design v1.0
        </div>
      </div>
    </div>
  )
}
