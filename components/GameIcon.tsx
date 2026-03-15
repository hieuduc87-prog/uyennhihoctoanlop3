import { ALL_ICONS, ICON_SIZES, type IconSize } from '@/config/icons'

interface GameIconProps {
  name: string
  size?: IconSize
  color?: string
  className?: string
}

export default function GameIcon({ name, size = 'md', color, className }: GameIconProps) {
  const icon = ALL_ICONS.find(i => i.name === name)
  const px = ICON_SIZES[size]

  if (!icon) {
    return <span style={{ fontSize: px, lineHeight: 1 }}>❓</span>
  }

  // Try image first (for when generated art exists), fallback to SVG path
  const imgSrc = `/icons/${name}.webp`

  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: px, height: px }}
      title={icon.label}
    >
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill={color || icon.color}
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,.2))' }}
      >
        <path d={icon.path} />
      </svg>
    </span>
  )
}
