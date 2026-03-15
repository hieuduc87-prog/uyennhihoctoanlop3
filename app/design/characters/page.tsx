'use client'

import { useState } from 'react'

// ── Data ──────────────────────────────────────────────────────────────

const LEVELS = [
  { level: 1, title: 'Tập Sự', xp: 0, color: '#9CA3AF', badge: '🌱' },
  { level: 2, title: 'Khám Phá', xp: 100, color: '#60A5FA', badge: '🔍' },
  { level: 3, title: 'Siêng Năng', xp: 300, color: '#34D399', badge: '📚' },
  { level: 4, title: 'Thông Minh', xp: 600, color: '#FBBF24', badge: '💡' },
  { level: 5, title: 'Giỏi Giang', xp: 1000, color: '#F472B6', badge: '⭐' },
  { level: 6, title: 'Xuất Sắc', xp: 1500, color: '#A78BFA', badge: '🏅' },
  { level: 7, title: 'Thiên Tài', xp: 2100, color: '#FB923C', badge: '🧠' },
  { level: 8, title: 'Bậc Thầy', xp: 2800, color: '#F43F5E', badge: '👑' },
  { level: 9, title: 'Huyền Thoại', xp: 3600, color: '#8B5CF6', badge: '🌟' },
  { level: 10, title: 'Thần Đồng', xp: 4500, color: '#EAB308', badge: '🏆' },
]

const CHARACTERS = [
  {
    id: 'boy',
    name: 'Bin',
    desc: 'Cậu bé hiếu kỳ, thích khám phá',
    color: '#60A5FA',
    hairColor: '#4A3728',
    skinColor: '#FFD4A8',
    shirtColor: '#60A5FA',
  },
  {
    id: 'girl',
    name: 'Uyển Nhi',
    desc: 'Cô bé thông minh, yêu toán học',
    color: '#F472B6',
    hairColor: '#2C1810',
    skinColor: '#FFD4A8',
    shirtColor: '#F472B6',
  },
]

const PETS = [
  {
    id: 'cat',
    name: 'Mèo Bông',
    desc: 'Mèo con dễ thương, hay khen giỏi',
    color: '#FB923C',
    bodyColor: '#FFA94D',
    bellyColor: '#FFE0B2',
  },
  {
    id: 'corgi',
    name: 'Corgi Béo',
    desc: 'Chó Corgi vui vẻ, hay nhảy múa',
    color: '#FBBF24',
    bodyColor: '#F5A623',
    bellyColor: '#FFF3D6',
  },
  {
    id: 'elephant',
    name: 'Voi Con',
    desc: 'Voi nhỏ hiền lành, nhớ giỏi lắm',
    color: '#A78BFA',
    bodyColor: '#B8A9E8',
    bellyColor: '#E8E0FF',
  },
]

// ── SVG Components ────────────────────────────────────────────────────

function CharacterSVG({
  character,
  level,
  size = 120,
}: {
  character: (typeof CHARACTERS)[0]
  level: (typeof LEVELS)[0]
  size?: number
}) {
  const hasHat = level.level >= 3
  const hasCape = level.level >= 5
  const hasCrown = level.level >= 8
  const hasGlow = level.level >= 7
  const isGirl = character.id === 'girl'

  return (
    <svg width={size} height={size} viewBox="0 0 120 120">
      {/* Glow effect for high levels */}
      {hasGlow && (
        <>
          <defs>
            <radialGradient id={`glow-${character.id}`}>
              <stop offset="0%" stopColor={level.color} stopOpacity="0.4" />
              <stop offset="100%" stopColor={level.color} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="60" cy="60" r="55" fill={`url(#glow-${character.id})`} />
        </>
      )}

      {/* Cape */}
      {hasCape && (
        <path
          d="M35 55 L25 95 L60 85 L95 95 L85 55"
          fill={level.color}
          opacity="0.6"
        />
      )}

      {/* Body */}
      <ellipse cx="60" cy="90" rx="22" ry="25" fill={character.shirtColor} />
      <ellipse cx="60" cy="88" rx="18" ry="8" fill="white" opacity="0.2" />

      {/* Head */}
      <circle cx="60" cy="45" r="22" fill={character.skinColor} />

      {/* Hair */}
      {isGirl ? (
        <>
          <ellipse cx="60" cy="35" rx="24" ry="16" fill={character.hairColor} />
          <ellipse cx="38" cy="50" rx="6" ry="18" fill={character.hairColor} />
          <ellipse cx="82" cy="50" rx="6" ry="18" fill={character.hairColor} />
          {/* Hair clips */}
          <circle cx="38" cy="38" r="4" fill="#FF69B4" />
          <circle cx="82" cy="38" r="4" fill="#FF69B4" />
        </>
      ) : (
        <ellipse cx="60" cy="33" rx="23" ry="14" fill={character.hairColor} />
      )}

      {/* Eyes */}
      <circle cx="52" cy="45" r="4" fill="#333" />
      <circle cx="68" cy="45" r="4" fill="#333" />
      <circle cx="53" cy="44" r="1.5" fill="white" />
      <circle cx="69" cy="44" r="1.5" fill="white" />

      {/* Mouth - smile */}
      <path
        d="M54 54 Q60 60 66 54"
        fill="none"
        stroke="#E57373"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Blush */}
      <circle cx="46" cy="52" r="4" fill="#FFB6C1" opacity="0.5" />
      <circle cx="74" cy="52" r="4" fill="#FFB6C1" opacity="0.5" />

      {/* Hat or Crown */}
      {hasCrown ? (
        <g>
          <polygon
            points="42,28 48,12 54,22 60,8 66,22 72,12 78,28"
            fill="#FFD700"
          />
          <rect x="42" y="26" width="36" height="6" rx="2" fill="#FFD700" />
          <circle cx="54" cy="20" r="2" fill="#FF4444" />
          <circle cx="60" cy="14" r="2" fill="#4444FF" />
          <circle cx="66" cy="20" r="2" fill="#44FF44" />
        </g>
      ) : hasHat ? (
        <g>
          <polygon
            points="60,8 45,32 75,32"
            fill={level.color}
            opacity="0.8"
          />
          <circle cx="60" cy="8" r="3" fill="#FFD700" />
        </g>
      ) : null}

      {/* Level badge */}
      <circle cx="90" cy="25" r="14" fill={level.color} />
      <text
        x="90"
        y="30"
        textAnchor="middle"
        fill="white"
        fontSize="14"
        fontWeight="bold"
      >
        {level.level}
      </text>
    </svg>
  )
}

function PetSVG({
  pet,
  level,
  size = 80,
}: {
  pet: (typeof PETS)[0]
  level: (typeof LEVELS)[0]
  size?: number
}) {
  const hasAccessory = level.level >= 4
  const hasWings = level.level >= 9

  return (
    <svg width={size} height={size} viewBox="0 0 80 80">
      {/* Wings for high level */}
      {hasWings && (
        <>
          <ellipse cx="15" cy="35" rx="12" ry="8" fill={level.color} opacity="0.4" />
          <ellipse cx="65" cy="35" rx="12" ry="8" fill={level.color} opacity="0.4" />
        </>
      )}

      {pet.id === 'cat' && (
        <>
          {/* Cat body */}
          <ellipse cx="40" cy="50" rx="20" ry="22" fill={pet.bodyColor} />
          <ellipse cx="40" cy="55" rx="14" ry="12" fill={pet.bellyColor} />
          {/* Ears */}
          <polygon points="24,22 20,38 34,34" fill={pet.bodyColor} />
          <polygon points="56,22 60,38 46,34" fill={pet.bodyColor} />
          <polygon points="26,24 23,35 32,33" fill="#FFB6C1" />
          <polygon points="54,24 57,35 48,33" fill="#FFB6C1" />
          {/* Head */}
          <circle cx="40" cy="32" r="14" fill={pet.bodyColor} />
          {/* Eyes */}
          <ellipse cx="35" cy="31" rx="2.5" ry="3" fill="#333" />
          <ellipse cx="45" cy="31" rx="2.5" ry="3" fill="#333" />
          <circle cx="35.5" cy="30" r="1" fill="white" />
          <circle cx="45.5" cy="30" r="1" fill="white" />
          {/* Nose & mouth */}
          <ellipse cx="40" cy="36" rx="2" ry="1.5" fill="#FF9999" />
          <path d="M38 38 Q40 40 42 38" fill="none" stroke="#FF9999" strokeWidth="1" />
          {/* Whiskers */}
          <line x1="22" y1="34" x2="32" y2="35" stroke="#DDD" strokeWidth="0.8" />
          <line x1="22" y1="37" x2="32" y2="37" stroke="#DDD" strokeWidth="0.8" />
          <line x1="48" y1="35" x2="58" y2="34" stroke="#DDD" strokeWidth="0.8" />
          <line x1="48" y1="37" x2="58" y2="37" stroke="#DDD" strokeWidth="0.8" />
          {/* Tail */}
          <path
            d="M58 50 Q68 40 62 30"
            fill="none"
            stroke={pet.bodyColor}
            strokeWidth="4"
            strokeLinecap="round"
          />
        </>
      )}

      {pet.id === 'corgi' && (
        <>
          {/* Corgi body */}
          <ellipse cx="40" cy="52" rx="22" ry="18" fill={pet.bodyColor} />
          <ellipse cx="40" cy="56" rx="16" ry="10" fill={pet.bellyColor} />
          {/* Head */}
          <circle cx="40" cy="30" r="16" fill={pet.bodyColor} />
          {/* Ears */}
          <ellipse cx="26" cy="18" rx="6" ry="10" fill={pet.bodyColor} />
          <ellipse cx="54" cy="18" rx="6" ry="10" fill={pet.bodyColor} />
          <ellipse cx="26" cy="18" rx="4" ry="7" fill="#FFB6C1" />
          <ellipse cx="54" cy="18" rx="4" ry="7" fill="#FFB6C1" />
          {/* Face mask */}
          <ellipse cx="40" cy="34" rx="10" ry="8" fill={pet.bellyColor} />
          {/* Eyes */}
          <circle cx="35" cy="29" r="2.5" fill="#333" />
          <circle cx="45" cy="29" r="2.5" fill="#333" />
          <circle cx="35.5" cy="28" r="1" fill="white" />
          <circle cx="45.5" cy="28" r="1" fill="white" />
          {/* Nose */}
          <ellipse cx="40" cy="34" rx="3" ry="2" fill="#333" />
          {/* Tongue */}
          <ellipse cx="40" cy="39" rx="3" ry="4" fill="#FF7B7B" />
          {/* Short legs */}
          <rect x="28" y="66" width="6" height="8" rx="3" fill={pet.bodyColor} />
          <rect x="46" y="66" width="6" height="8" rx="3" fill={pet.bodyColor} />
          {/* Butt */}
          <circle cx="60" cy="50" r="5" fill={pet.bodyColor} />
        </>
      )}

      {pet.id === 'elephant' && (
        <>
          {/* Elephant body */}
          <ellipse cx="40" cy="50" rx="22" ry="20" fill={pet.bodyColor} />
          <ellipse cx="40" cy="54" rx="16" ry="12" fill={pet.bellyColor} />
          {/* Head */}
          <circle cx="40" cy="30" r="18" fill={pet.bodyColor} />
          {/* Ears */}
          <ellipse cx="20" cy="28" rx="10" ry="14" fill={pet.bodyColor} />
          <ellipse cx="60" cy="28" rx="10" ry="14" fill={pet.bodyColor} />
          <ellipse cx="20" cy="28" rx="7" ry="10" fill={pet.bellyColor} />
          <ellipse cx="60" cy="28" rx="7" ry="10" fill={pet.bellyColor} />
          {/* Trunk */}
          <path
            d="M40 40 Q40 55 35 60 Q33 62 36 62"
            fill="none"
            stroke={pet.bodyColor}
            strokeWidth="5"
            strokeLinecap="round"
          />
          {/* Eyes */}
          <circle cx="34" cy="27" r="3" fill="#333" />
          <circle cx="46" cy="27" r="3" fill="#333" />
          <circle cx="34.5" cy="26" r="1.2" fill="white" />
          <circle cx="46.5" cy="26" r="1.2" fill="white" />
          {/* Blush */}
          <circle cx="28" cy="34" r="4" fill="#FFB6C1" opacity="0.5" />
          <circle cx="52" cy="34" r="4" fill="#FFB6C1" opacity="0.5" />
          {/* Legs */}
          <rect x="28" y="66" width="8" height="10" rx="4" fill={pet.bodyColor} />
          <rect x="44" y="66" width="8" height="10" rx="4" fill={pet.bodyColor} />
        </>
      )}

      {/* Accessory (bow/hat) */}
      {hasAccessory && (
        <g>
          <circle cx="40" cy="14" r="5" fill={level.color} />
          <polygon points="35,14 40,8 45,14" fill={level.color} />
        </g>
      )}
    </svg>
  )
}

// ── XP Sources ────────────────────────────────────────────────────────

const XP_SOURCES = [
  { action: 'Trả lời đúng', xp: 10, icon: '✅', desc: 'Mỗi câu trả lời đúng' },
  { action: 'Combo 3 câu', xp: 15, icon: '🔥', desc: 'Đúng 3 câu liên tiếp' },
  { action: 'Combo 5 câu', xp: 30, icon: '💥', desc: 'Đúng 5 câu liên tiếp' },
  { action: 'Combo 10 câu', xp: 60, icon: '⚡', desc: 'Đúng 10 câu liên tiếp' },
  { action: 'Hoàn thành bài', xp: 50, icon: '📝', desc: 'Làm xong 1 bài học' },
  { action: 'Điểm 100%', xp: 100, icon: '💯', desc: 'Đạt điểm tuyệt đối' },
  { action: 'Học mỗi ngày', xp: 20, icon: '📅', desc: 'Streak bonus hàng ngày' },
  { action: 'Streak 7 ngày', xp: 100, icon: '🎯', desc: 'Học liên tục 7 ngày' },
]

// ── Shared Sub-component ──────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        fontSize: 18,
        fontWeight: 700,
        marginBottom: 16,
        color: '#E2E8F0',
        borderBottom: '2px solid rgba(255,255,255,0.1)',
        paddingBottom: 8,
      }}
    >
      {children}
    </h3>
  )
}

// ── Tab: Selection ────────────────────────────────────────────────────

function SelectionTab() {
  const [selectedChar, setSelectedChar] = useState(CHARACTERS[1])
  const [selectedPet, setSelectedPet] = useState(PETS[1])

  return (
    <div>
      <SectionTitle>Chon Nhan Vat</SectionTitle>
      <div style={{ display: 'flex', gap: 16, marginBottom: 32 }}>
        {CHARACTERS.map((c) => (
          <div
            key={c.id}
            onClick={() => setSelectedChar(c)}
            style={{
              flex: 1,
              padding: 20,
              borderRadius: 16,
              background:
                selectedChar.id === c.id
                  ? `linear-gradient(135deg, ${c.color}33, ${c.color}11)`
                  : 'rgba(255,255,255,0.05)',
              border: `2px solid ${selectedChar.id === c.id ? c.color : 'rgba(255,255,255,0.1)'}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s',
            }}
          >
            <CharacterSVG character={c} level={LEVELS[0]} size={100} />
            <div style={{ fontWeight: 700, fontSize: 16, marginTop: 8 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: '#94A3B8', marginTop: 4 }}>{c.desc}</div>
          </div>
        ))}
      </div>

      <SectionTitle>Chon Thu Cung</SectionTitle>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {PETS.map((p) => (
          <div
            key={p.id}
            onClick={() => setSelectedPet(p)}
            style={{
              flex: 1,
              padding: 16,
              borderRadius: 16,
              background:
                selectedPet.id === p.id
                  ? `linear-gradient(135deg, ${p.color}33, ${p.color}11)`
                  : 'rgba(255,255,255,0.05)',
              border: `2px solid ${selectedPet.id === p.id ? p.color : 'rgba(255,255,255,0.1)'}`,
              cursor: 'pointer',
              textAlign: 'center',
              transition: 'all 0.2s',
            }}
          >
            <PetSVG pet={p} level={LEVELS[0]} size={70} />
            <div style={{ fontWeight: 700, fontSize: 14, marginTop: 4 }}>{p.name}</div>
            <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 2 }}>{p.desc}</div>
          </div>
        ))}
      </div>

      {/* Preview */}
      <div
        style={{
          padding: 24,
          borderRadius: 20,
          background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(168,85,247,0.1))',
          border: '1px solid rgba(255,255,255,0.1)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 13, color: '#94A3B8', marginBottom: 12 }}>
          Preview Combo
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', gap: 8 }}>
          <CharacterSVG character={selectedChar} level={LEVELS[0]} size={110} />
          <PetSVG pet={selectedPet} level={LEVELS[0]} size={70} />
        </div>
        <div style={{ marginTop: 12, fontWeight: 700 }}>
          {selectedChar.name} & {selectedPet.name}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Evolution ────────────────────────────────────────────────────

function EvolutionTab() {
  const char = CHARACTERS[1] // Uyen Nhi
  const pet = PETS[1] // Corgi

  return (
    <div>
      <SectionTitle>Tien Hoa Nhan Vat (10 Cap)</SectionTitle>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
          marginBottom: 32,
        }}
      >
        {LEVELS.map((lv) => (
          <div
            key={lv.level}
            style={{
              padding: 12,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${lv.color}44`,
              textAlign: 'center',
            }}
          >
            <CharacterSVG character={char} level={lv} size={70} />
            <div style={{ fontSize: 11, fontWeight: 700, color: lv.color, marginTop: 4 }}>
              Lv.{lv.level}
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>{lv.title}</div>
            <div style={{ fontSize: 9, color: '#64748B' }}>{lv.xp} XP</div>
          </div>
        ))}
      </div>

      <SectionTitle>Tien Hoa Thu Cung</SectionTitle>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 12,
        }}
      >
        {LEVELS.slice(0, 5).map((lv) => (
          <div
            key={lv.level}
            style={{
              padding: 12,
              borderRadius: 14,
              background: 'rgba(255,255,255,0.05)',
              border: `1px solid ${lv.color}44`,
              textAlign: 'center',
            }}
          >
            <PetSVG pet={pet} level={lv} size={60} />
            <div style={{ fontSize: 11, fontWeight: 700, color: lv.color, marginTop: 4 }}>
              Lv.{lv.level}
            </div>
            <div style={{ fontSize: 10, color: '#94A3B8' }}>{lv.title}</div>
          </div>
        ))}
      </div>

      <div
        style={{
          marginTop: 16,
          padding: 12,
          borderRadius: 12,
          background: 'rgba(251,191,36,0.1)',
          border: '1px solid rgba(251,191,36,0.2)',
          fontSize: 12,
          color: '#FBBF24',
        }}
      >
        Nhan vat va thu cung se thay doi ngoai hinh khi len cap: them mu (Lv3), ao choang (Lv5),
        phat sang (Lv7), vuong mien (Lv8), canh (Lv9)
      </div>
    </div>
  )
}

// ── Tab: XP System ────────────────────────────────────────────────────

function XPSystemTab() {
  const [demoXP, setDemoXP] = useState(650)
  const currentLevel = [...LEVELS].reverse().find((l) => demoXP >= l.xp) || LEVELS[0]
  const nextLevel = LEVELS[currentLevel.level] // next level (or undefined at max)
  const progress = nextLevel
    ? ((demoXP - currentLevel.xp) / (nextLevel.xp - currentLevel.xp)) * 100
    : 100

  return (
    <div>
      <SectionTitle>Cach Kiem XP</SectionTitle>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 10,
          marginBottom: 24,
        }}
      >
        {XP_SOURCES.map((src) => (
          <div
            key={src.action}
            style={{
              padding: 12,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.08)',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <div style={{ fontSize: 24 }}>{src.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>{src.action}</div>
              <div style={{ fontSize: 11, color: '#94A3B8' }}>{src.desc}</div>
              <div style={{ fontSize: 12, color: '#34D399', fontWeight: 700 }}>+{src.xp} XP</div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Demo XP Bar</SectionTitle>
      <div
        style={{
          padding: 20,
          borderRadius: 16,
          background: 'rgba(255,255,255,0.05)',
          border: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ fontWeight: 700, color: currentLevel.color }}>
            {currentLevel.badge} Lv.{currentLevel.level} {currentLevel.title}
          </span>
          <span style={{ fontSize: 13, color: '#94A3B8' }}>
            {demoXP} / {nextLevel ? nextLevel.xp : 'MAX'} XP
          </span>
        </div>
        <div
          style={{
            height: 16,
            borderRadius: 8,
            background: 'rgba(255,255,255,0.1)',
            overflow: 'hidden',
            marginBottom: 12,
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress}%`,
              borderRadius: 8,
              background: `linear-gradient(90deg, ${currentLevel.color}, ${currentLevel.color}AA)`,
              transition: 'width 0.5s',
            }}
          />
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          {[10, 50, 100, -50].map((val) => (
            <button
              key={val}
              onClick={() => setDemoXP(Math.max(0, Math.min(4500, demoXP + val)))}
              style={{
                flex: 1,
                padding: '8px 0',
                borderRadius: 8,
                border: 'none',
                background: val > 0 ? 'rgba(52,211,153,0.2)' : 'rgba(244,63,94,0.2)',
                color: val > 0 ? '#34D399' : '#F43F5E',
                fontWeight: 700,
                fontSize: 13,
                cursor: 'pointer',
              }}
            >
              {val > 0 ? '+' : ''}
              {val}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Tab: Pipeline ─────────────────────────────────────────────────────

function PipelineTab() {
  const flow = [
    { step: '1. Chon', desc: 'User chon nhan vat + thu cung', color: '#60A5FA' },
    { step: '2. Luu', desc: 'Save vao localStorage player_profile', color: '#34D399' },
    { step: '3. Hien thi', desc: 'Render SVG dua tren profile + level', color: '#FBBF24' },
    { step: '4. XP', desc: 'Kiem XP tu hoc tap, cong vao profile', color: '#F472B6' },
    { step: '5. Level Up', desc: 'Check XP >= threshold, tang level', color: '#A78BFA' },
    { step: '6. Evolution', desc: 'SVG thay doi theo level moi', color: '#FB923C' },
  ]

  return (
    <div>
      <SectionTitle>Pipeline Xu Ly</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 24 }}>
        {flow.map((f, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: 14,
              borderRadius: 12,
              background: 'rgba(255,255,255,0.05)',
              borderLeft: `4px solid ${f.color}`,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                background: `${f.color}22`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: 800,
                fontSize: 14,
                color: f.color,
              }}
            >
              {i + 1}
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14, color: f.color }}>{f.step}</div>
              <div style={{ fontSize: 12, color: '#94A3B8' }}>{f.desc}</div>
            </div>
          </div>
        ))}
      </div>

      <SectionTitle>Data Schema</SectionTitle>
      <pre
        style={{
          padding: 16,
          borderRadius: 12,
          background: 'rgba(0,0,0,0.3)',
          fontSize: 12,
          lineHeight: 1.6,
          color: '#94A3B8',
          overflow: 'auto',
        }}
      >
        {`// localStorage: player_profile
{
  name: "Be",
  gender: "boy" | "girl",
  avatar: "bin" | "uyennhi",
  pet: "cat" | "corgi" | "elephant",
  xp: 650,
  level: 4,
  streak: 5,
  lastGrade: "lop3"
}`}
      </pre>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────────────────

const TABS = [
  { id: 'select', label: 'Chon NV', icon: '👤' },
  { id: 'evolution', label: 'Tien Hoa', icon: '⬆️' },
  { id: 'xp', label: 'XP System', icon: '⭐' },
  { id: 'pipeline', label: 'Pipeline', icon: '⚙️' },
]

export default function CharacterSystemDesign() {
  const [activeTab, setActiveTab] = useState('select')

  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(170deg, #0F172A 0%, #1E1B4B 50%, #0F172A 100%)',
        color: '#E2E8F0',
        fontFamily: "'Nunito', sans-serif",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: '24px 20px 16px',
          textAlign: 'center',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <h1
          style={{
            fontSize: 24,
            fontWeight: 800,
            background: 'linear-gradient(135deg, #60A5FA, #A78BFA, #F472B6)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Character & Pet System
        </h1>
        <p style={{ fontSize: 13, color: '#64748B', marginTop: 4 }}>
          Design System cho nhan vat & thu cung
        </p>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 4,
          padding: '12px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          overflowX: 'auto',
        }}
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: 10,
              border: 'none',
              background: activeTab === tab.id ? 'rgba(99,102,241,0.2)' : 'transparent',
              color: activeTab === tab.id ? '#818CF8' : '#64748B',
              fontWeight: 700,
              fontSize: 13,
              cursor: 'pointer',
              transition: 'all 0.2s',
              whiteSpace: 'nowrap',
            }}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{ padding: '20px 16px', maxWidth: 600, margin: '0 auto' }}>
        {activeTab === 'select' && <SelectionTab />}
        {activeTab === 'evolution' && <EvolutionTab />}
        {activeTab === 'xp' && <XPSystemTab />}
        {activeTab === 'pipeline' && <PipelineTab />}
      </div>
    </div>
  )
}
