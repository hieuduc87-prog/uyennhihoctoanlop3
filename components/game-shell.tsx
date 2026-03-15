'use client'

import { useEffect, useRef } from 'react'

interface GameShellProps {
  gradeScript: string
  saveKey: string
}

export default function GameShell({ gradeScript, saveKey }: GameShellProps) {
  const SAVE_KEY = saveKey
  const init = useRef(false)

  useEffect(() => {
    if (init.current) return
    init.current = true

    // Load grade config first, then engine
    const gs = document.createElement('script')
    gs.src = gradeScript + '?v=1'
    document.body.appendChild(gs)
    gs.onload = () => {
      const es = document.createElement('script')
      es.src = '/engine.js?v=1'
      document.body.appendChild(es)
    }

    // Cloud sync in background
    loadCloudData(SAVE_KEY)

    // Save handler
    let saveTimer: ReturnType<typeof setTimeout>
    const handleSave = () => {
      clearTimeout(saveTimer)
      saveTimer = setTimeout(() => saveToCloud(SAVE_KEY), 2000)
    }
    window.addEventListener('game-save', handleSave)

    return () => {
      window.removeEventListener('game-save', handleSave)
      clearTimeout(saveTimer)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      if (w.__gameTimerInt) clearInterval(w.__gameTimerInt)
    }
  }, [])

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gameCSS }} />
      <div dangerouslySetInnerHTML={{ __html: gameHTML }} />
    </>
  )
}

function migrateOldFormat(old: Record<string, unknown>): Record<string, unknown> {
  if (old.sp) return old
  return {
    level: old.level || 1, xp: old.xp || 0, stars: old.stars || 0, gems: old.gems || 0,
    streak: old.streak || 0, lastPlay: old.last_play_date || old.lastPlay || null,
    sp: old.skill_progress || {}, ach: old.achievements || {},
    daily: old.daily || { date: null, m: [] },
    tc: old.total_correct || 0, tp: old.total_played || 0,
    combo: 0, mc: old.max_combo || 0, ct: old.corgi_taps || 0,
  }
}

function getPlayerId(): string {
  try { return localStorage.getItem('voicon_user') || 'guest' }
  catch { return 'guest' }
}

async function loadCloudData(sk: string) {
  try {
    const pid = getPlayerId()
    if (pid === 'guest') return
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 3000)
    const res = await fetch(`/api/progress?player=${encodeURIComponent(pid)}&grade=${encodeURIComponent(sk)}`, { signal: controller.signal })
    clearTimeout(timeout)
    if (!res.ok) return
    const { data } = await res.json()
    if (data && data.level) {
      const migrated = migrateOldFormat(data)
      const localRaw = localStorage.getItem(sk)
      if (localRaw) {
        const local = JSON.parse(localRaw)
        const cloudScore = ((migrated.tp as number) || 0) + ((migrated.level as number) || 0) * 1000
        const localScore = (local.tp || 0) + (local.level || 0) * 1000
        if (cloudScore >= localScore) {
          localStorage.setItem(sk, JSON.stringify(migrated))
        }
      } else {
        localStorage.setItem(sk, JSON.stringify(migrated))
      }
    }
  } catch {
    // fallback to localStorage
  }
}

async function saveToCloud(sk: string) {
  try {
    const raw = localStorage.getItem(sk)
    if (!raw) return
    await fetch('/api/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ player_id: getPlayerId(), grade: sk, data: JSON.parse(raw) })
    })
  } catch { /* silent */ }
}

const gameCSS = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}
:root{
  --bg1:#1b0a3c;--bg2:#2d1463;--bg3:#4a1d8a;
  --pink:#ff5a9e;--magenta:#e040a0;--purple:#b44dff;--violet:#8b5cf6;
  --gold:#ffc233;--amber:#ffab00;--mint:#2ddba6;--teal:#14cca0;
  --sky:#3dc2ff;--blue:#4d8dff;--coral:#ff6b7a;--rose:#ff8fa3;
  --peach:#ffb5a7;--cream:#fff1e6;
  --card:rgba(255,255,255,0.1);--card-border:rgba(255,255,255,0.12);
  --text:#fff;--dim:rgba(255,255,255,0.5);
  --shadow-3d:0 6px 0 rgba(0,0,0,0.25);
  --shadow-soft:0 8px 32px rgba(0,0,0,0.3);
  --shine:inset 0 2px 0 rgba(255,255,255,0.25);
  --radius:20px;--radius-lg:28px;
}
html,body{height:100%;overflow:hidden;font-family:'Nunito',sans-serif;background:var(--bg1);color:var(--text);touch-action:manipulation;-webkit-font-smoothing:antialiased}
body::before{content:'';position:fixed;inset:0;z-index:0;background:
  radial-gradient(ellipse 120% 80% at 20% 100%,rgba(176,77,255,.35),transparent),
  radial-gradient(ellipse 100% 60% at 80% 0%,rgba(255,90,158,.25),transparent),
  radial-gradient(ellipse 80% 80% at 50% 50%,rgba(61,194,255,.1),transparent),
  linear-gradient(170deg,#1b0a3c 0%,#2d1463 35%,#3a1878 60%,#2a1260 100%)}
body::after{content:'';position:fixed;inset:0;z-index:0;background:
  radial-gradient(circle 200px at 15% 85%,rgba(255,194,51,.12),transparent),
  radial-gradient(circle 150px at 85% 15%,rgba(45,219,166,.1),transparent),
  radial-gradient(circle 100px at 50% 50%,rgba(180,77,255,.08),transparent);
  pointer-events:none}
.sparkles{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.sparkle{position:absolute;width:5px;height:5px;border-radius:50%;opacity:0;animation:twinkle3d var(--dur,4s) var(--delay,0s) infinite;filter:blur(0.5px)}
@keyframes twinkle3d{0%,100%{opacity:0;transform:scale(0) translateY(0)}40%{opacity:1;transform:scale(1.2) translateY(-5px)}60%{opacity:.8;transform:scale(1) translateY(-3px)}100%{opacity:0;transform:scale(0) translateY(0)}}
.fstar{position:absolute;font-size:22px;animation:floatStar var(--dur,5s) var(--del,0s) infinite ease-in-out;filter:drop-shadow(0 0 6px rgba(255,194,51,.5))}
@keyframes floatStar{0%,100%{transform:translateY(0) scale(1);opacity:.3}50%{transform:translateY(-25px) scale(1.15);opacity:1}}
.screen{position:fixed;inset:0;z-index:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
.screen.active{display:flex}
.corgi-bounce{animation:cBounce .6s cubic-bezier(.34,1.56,.64,1)}
@keyframes cBounce{0%{transform:translateY(0)}40%{transform:translateY(-24px) rotate(-5deg) scale(1.1)}70%{transform:translateY(-6px) rotate(3deg)}100%{transform:translateY(0) scale(1)}}
.corgi-happy{animation:cHappy .8s cubic-bezier(.34,1.56,.64,1)}
@keyframes cHappy{0%{transform:rotate(0)}25%{transform:rotate(-12deg) scale(1.15)}50%{transform:rotate(12deg) scale(1.15)}75%{transform:rotate(-5deg)}100%{transform:rotate(0) scale(1)}}
.corgi-sad{animation:cSad .6s ease}
@keyframes cSad{0%{transform:translateY(0)}50%{transform:translateY(6px) scale(.92)}100%{transform:translateY(0)}}
.corgi-spin{animation:cSpin .8s cubic-bezier(.34,1.56,.64,1)}
@keyframes cSpin{0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.25)}100%{transform:rotate(360deg) scale(1)}}
.corgi-run{animation:cRun .5s ease infinite alternate}
@keyframes cRun{0%{transform:translateX(0) scaleX(1)}100%{transform:translateX(10px) scaleX(.94)}}
.speech-bubble{position:relative;background:rgba(255,255,255,.15);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1.5px solid rgba(255,255,255,.2);border-radius:22px;padding:10px 18px;font-size:14px;font-weight:800;max-width:280px;text-align:center;animation:bubPop .5s cubic-bezier(.34,1.56,.64,1);margin:0 auto;box-shadow:0 4px 0 rgba(0,0,0,.15),0 8px 24px rgba(0,0,0,.15),var(--shine)}
.speech-bubble::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border:10px solid transparent;border-top-color:rgba(255,255,255,.15);border-bottom:0}
@keyframes bubPop{0%{opacity:0;transform:scale(.4) translateY(15px)}60%{transform:scale(1.08) translateY(-3px)}100%{opacity:1;transform:scale(1) translateY(0)}}
#splash{justify-content:center;align-items:center;text-align:center;padding:24px;gap:8px;background:
  radial-gradient(ellipse at 50% 60%,rgba(180,77,255,.3),transparent 60%),
  radial-gradient(ellipse at 30% 80%,rgba(255,90,158,.2),transparent 50%),
  linear-gradient(170deg,#1b0a3c,#2d1463 40%,#3a1878)}
.splash-title{font-family:'Baloo 2',cursive;font-size:36px;font-weight:800;
  background:linear-gradient(135deg,#ff5a9e,#ffc233,#b44dff,#3dc2ff);background-size:300% 300%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:gradShift 4s ease infinite;
  filter:drop-shadow(0 3px 8px rgba(255,90,158,.4))}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.splash-name{font-family:'Baloo 2',cursive;font-size:22px;color:var(--peach);text-shadow:0 2px 10px rgba(255,181,167,.4)}
.splash-sub{font-size:14px;color:var(--dim);margin:4px 0 24px;letter-spacing:.5px}
.btn-play{
  background:linear-gradient(135deg,#ff5a9e,#e040a0,#b44dff);border:none;border-radius:60px;
  padding:18px 56px;font-size:22px;font-weight:800;color:#fff;cursor:pointer;font-family:'Baloo 2',cursive;
  box-shadow:0 7px 0 rgba(140,20,80,.6),0 12px 40px rgba(255,90,158,.35),var(--shine);
  position:relative;overflow:hidden;transition:all .1s;letter-spacing:.5px}
.btn-play:active{transform:translateY(5px);box-shadow:0 2px 0 rgba(140,20,80,.6),0 4px 12px rgba(255,90,158,.3)}
.btn-play::before{content:'';position:absolute;top:0;left:-50%;width:50%;height:100%;background:linear-gradient(90deg,transparent,rgba(255,255,255,.2),transparent);animation:btnShine 3s infinite}
@keyframes btnShine{0%{left:-50%}100%{left:150%}}
.top-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;
  background:rgba(0,0,0,.35);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-bottom:1px solid rgba(255,255,255,.08);flex-shrink:0;z-index:10}
.stat-pill{display:flex;align-items:center;gap:5px;
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);
  border-radius:30px;padding:5px 12px;font-weight:800;font-size:13px;
  box-shadow:0 3px 0 rgba(0,0,0,.2),var(--shine);letter-spacing:.3px}
.stat-pill .ic{font-size:15px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.3))}
.player-row{display:flex;align-items:center;gap:8px}
.avatar-mini{width:36px;height:36px;border-radius:50%;
  background:linear-gradient(135deg,var(--pink),var(--purple));
  display:flex;align-items:center;justify-content:center;font-size:18px;
  box-shadow:0 3px 0 rgba(0,0,0,.25),0 0 16px rgba(255,90,158,.35);
  border:2px solid rgba(255,255,255,.2)}
.lv-badge{font-size:11px;font-weight:900;color:var(--gold);
  background:rgba(255,194,51,.15);border:1px solid rgba(255,194,51,.2);
  border-radius:10px;padding:2px 8px;letter-spacing:.3px;
  text-shadow:0 1px 4px rgba(255,194,51,.4)}
.xp-mini{width:64px;height:5px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-top:3px;border:1px solid rgba(255,255,255,.05)}
.xp-mini .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width .5s;box-shadow:0 0 8px rgba(255,90,158,.4)}
.back-btn{background:rgba(255,255,255,.12);border:1px solid rgba(255,255,255,.15);border-radius:14px;
  padding:8px 14px;color:#fff;font-size:13px;font-weight:800;cursor:pointer;font-family:'Nunito',sans-serif;
  box-shadow:0 3px 0 rgba(0,0,0,.2),var(--shine);transition:all .1s}
.back-btn:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.2)}
.subject-tabs{display:flex;gap:0;flex-shrink:0;background:rgba(0,0,0,.2);border-bottom:1px solid rgba(255,255,255,.06);padding:6px 6px 8px}
.subject-tab{flex:1;text-align:center;padding:8px 4px 6px;font-weight:800;cursor:pointer;opacity:.4;
  transition:all .25s cubic-bezier(.34,1.56,.64,1);border-radius:16px;margin:0 3px;position:relative}
.subject-tab.active{opacity:1;background:rgba(255,255,255,.1);
  box-shadow:0 4px 0 rgba(0,0,0,.2),0 0 20px var(--tab-color,rgba(255,90,158,.3)),var(--shine);
  transform:translateY(-2px)}
.subject-tab .tab-icon{font-size:22px;display:block;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}
.subject-tab .tab-label{font-size:10px;margin-top:2px;letter-spacing:.5px}
#map{padding-bottom:85px}
.map-header{text-align:center;padding:14px 16px 4px;flex-shrink:0}
.map-header h2{font-family:'Baloo 2',cursive;font-size:22px;color:var(--peach);
  text-shadow:0 2px 10px rgba(255,181,167,.3);letter-spacing:.3px}
.corgi-map{text-align:center;padding:4px 0}
.skill-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:10px 16px}
.skill-card{
  background:rgba(255,255,255,.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:1.5px solid rgba(255,255,255,.12);border-radius:var(--radius);
  padding:16px 12px 14px;text-align:center;cursor:pointer;
  transition:all .15s;position:relative;overflow:hidden;
  box-shadow:0 5px 0 rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.15),var(--shine)}
.skill-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(160deg,var(--cc,rgba(255,107,157,.2)),transparent 70%);opacity:.7;
  border-radius:var(--radius)}
.skill-card::after{content:'';position:absolute;top:0;left:0;right:0;height:40%;
  background:linear-gradient(180deg,rgba(255,255,255,.06),transparent);border-radius:var(--radius) var(--radius) 0 0}
.skill-card:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.2),0 2px 8px rgba(0,0,0,.15)}
.skill-card .em{font-size:38px;position:relative;z-index:1;filter:drop-shadow(0 3px 6px rgba(0,0,0,.25))}
.skill-card .nm{font-family:'Baloo 2',cursive;font-size:14px;font-weight:800;margin-top:6px;position:relative;z-index:1;
  text-shadow:0 1px 4px rgba(0,0,0,.3)}
.skill-card .prog{font-size:10px;font-weight:900;color:var(--gold);position:relative;z-index:1;margin-top:2px;
  text-shadow:0 1px 4px rgba(255,194,51,.4);letter-spacing:.3px}
.skill-card .pbar{width:85%;height:4px;background:rgba(255,255,255,.1);border-radius:3px;margin:6px auto 0;overflow:hidden;position:relative;z-index:1;border:1px solid rgba(255,255,255,.05)}
.skill-card .pbar .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width .5s;box-shadow:0 0 6px rgba(255,90,158,.4)}
.skill-card.mastered{border-color:var(--gold);box-shadow:0 5px 0 rgba(180,120,0,.4),0 0 24px rgba(255,194,51,.25),var(--shine)}
.skill-card.mastered::after{content:'\\2b50';position:absolute;top:8px;right:8px;font-size:16px;z-index:2;
  filter:drop-shadow(0 2px 4px rgba(255,194,51,.5));background:none;height:auto;width:auto;border-radius:0}
.skill-card.locked{pointer-events:none}
#game{align-items:center}
.game-area{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:12px;width:100%;max-width:560px;position:relative}
.g-stat{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.1);border-radius:14px;
  padding:6px 14px;text-align:center;box-shadow:0 3px 0 rgba(0,0,0,.15),var(--shine)}
.g-stat .lb{font-size:9px;color:var(--dim);font-weight:700;letter-spacing:.5px;text-transform:uppercase}
.g-stat .vl{font-size:18px;font-weight:900;text-shadow:0 1px 4px rgba(0,0,0,.3)}
.corgi-game{position:fixed;bottom:18px;right:16px;z-index:50;cursor:pointer;
  filter:drop-shadow(0 4px 8px rgba(0,0,0,.3));transition:transform .1s}
.corgi-game:active{transform:scale(1.2)}
.timer-bar{width:100%;height:8px;background:rgba(255,255,255,.08);border-radius:4px;margin-bottom:12px;overflow:hidden;
  border:1px solid rgba(255,255,255,.06);box-shadow:inset 0 2px 4px rgba(0,0,0,.2)}
.timer-bar .fill{height:100%;border-radius:4px;
  background:linear-gradient(90deg,var(--mint),var(--gold),var(--coral));
  transition:width .1s linear;box-shadow:0 0 10px rgba(45,219,166,.3)}
.question-card{
  background:rgba(255,255,255,.08);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);
  border:1.5px solid rgba(255,255,255,.12);border-radius:var(--radius-lg);
  padding:22px 20px;text-align:center;width:100%;
  animation:cardIn .5s cubic-bezier(.34,1.56,.64,1);
  box-shadow:0 6px 0 rgba(0,0,0,.2),0 12px 40px rgba(0,0,0,.2),var(--shine);
  position:relative;overflow:hidden}
.question-card::before{content:'';position:absolute;top:0;left:0;right:0;height:35%;
  background:linear-gradient(180deg,rgba(255,255,255,.06),transparent);border-radius:var(--radius-lg) var(--radius-lg) 0 0}
@keyframes cardIn{0%{opacity:0;transform:translateY(40px) scale(.9) rotateX(5deg)}60%{transform:translateY(-5px) scale(1.02)}100%{opacity:1;transform:translateY(0) scale(1) rotateX(0)}}
.q-text{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800;margin-bottom:6px;color:#fff;
  text-shadow:0 2px 12px rgba(255,90,158,.25);position:relative;z-index:1}
.q-hint{font-size:12px;color:var(--dim);margin-bottom:16px;font-weight:700;position:relative;z-index:1}
.answers-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%;position:relative;z-index:1}
.answers-grid.single-col{grid-template-columns:1fr}
.ans-btn{
  background:rgba(255,255,255,.1);
  border:2px solid rgba(255,255,255,.12);border-radius:18px;
  padding:16px 10px;font-size:18px;font-weight:800;color:#fff;font-family:'Nunito',sans-serif;
  cursor:pointer;transition:all .1s;text-align:center;word-break:break-word;line-height:1.3;
  box-shadow:0 5px 0 rgba(0,0,0,.25),0 6px 16px rgba(0,0,0,.15),var(--shine);
  position:relative;overflow:hidden;min-height:52px}
.ans-btn::before{content:'';position:absolute;top:0;left:0;right:0;height:45%;
  background:linear-gradient(180deg,rgba(255,255,255,.08),transparent);border-radius:16px 16px 0 0}
.ans-btn:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(0,0,0,.25),0 2px 6px rgba(0,0,0,.15)}
.ans-btn.correct{
  background:rgba(45,219,166,.3)!important;border-color:var(--mint)!important;
  box-shadow:0 5px 0 rgba(10,130,80,.5),0 0 24px rgba(45,219,166,.3),var(--shine)!important;
  animation:correctPop3d .5s cubic-bezier(.34,1.56,.64,1)}
.ans-btn.wrong{
  background:rgba(255,107,122,.3)!important;border-color:var(--coral)!important;
  box-shadow:0 5px 0 rgba(180,40,50,.5),0 0 16px rgba(255,107,122,.2)!important;
  animation:shake3d .4s ease}
@keyframes correctPop3d{0%{transform:scale(1)}40%{transform:scale(1.08) translateY(-3px)}100%{transform:scale(1)}}
@keyframes shake3d{0%,100%{transform:translateX(0)}20%{transform:translateX(-8px) rotate(-1deg)}40%{transform:translateX(8px) rotate(1deg)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}}
.encourage-overlay{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:200;pointer-events:none;animation:encFade 1.6s ease forwards}
@keyframes encFade{0%{opacity:0}10%{opacity:1}70%{opacity:1}100%{opacity:0}}
.enc-text{font-family:'Baloo 2',cursive;font-size:42px;font-weight:800;
  background:linear-gradient(135deg,var(--gold),var(--pink),var(--purple));background-size:200% 200%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:encBounce .5s cubic-bezier(.34,1.56,.64,1);
  filter:drop-shadow(0 3px 8px rgba(255,90,158,.5))}
.enc-sub{font-size:17px;color:var(--peach);margin-top:4px;font-weight:800;
  animation:encBounce .5s .1s cubic-bezier(.34,1.56,.64,1) both;
  text-shadow:0 2px 8px rgba(255,181,167,.4)}
@keyframes encBounce{0%{transform:scale(0) rotate(-10deg)}50%{transform:scale(1.25) rotate(5deg)}100%{transform:scale(1)}}
.combo-display{position:fixed;top:68px;left:50%;transform:translateX(-50%);z-index:100;
  font-family:'Baloo 2',cursive;font-size:20px;font-weight:900;color:var(--gold);
  text-shadow:0 0 20px rgba(255,194,51,.6),0 2px 4px rgba(0,0,0,.3);
  opacity:0;transition:all .3s;pointer-events:none;
  background:rgba(255,194,51,.1);padding:4px 16px;border-radius:20px;
  border:1px solid rgba(255,194,51,.2);backdrop-filter:blur(8px)}
.combo-display.show{opacity:1;animation:comboShake3d .4s cubic-bezier(.34,1.56,.64,1)}
@keyframes comboShake3d{0%{transform:translateX(-50%) scale(.8)}50%{transform:translateX(-50%) scale(1.3)}100%{transform:translateX(-50%) scale(1)}}
#result{justify-content:center;align-items:center;text-align:center;padding:24px;overflow-y:auto}
.result-title{font-family:'Baloo 2',cursive;font-size:30px;font-weight:800;
  background:linear-gradient(135deg,var(--pink),var(--gold),var(--purple));background-size:200%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:gradShift 3s ease infinite;
  filter:drop-shadow(0 2px 6px rgba(255,90,158,.3))}
.result-stars{font-size:44px;margin:8px 0;filter:drop-shadow(0 3px 8px rgba(255,194,51,.4));letter-spacing:4px}
.result-stats{display:flex;gap:10px;margin:14px 0;justify-content:center;flex-wrap:wrap}
.r-stat{background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.1);
  border-radius:18px;padding:12px 18px;text-align:center;
  box-shadow:0 4px 0 rgba(0,0,0,.2),var(--shine);min-width:72px}
.r-stat .num{font-size:24px;font-weight:900;color:var(--gold);text-shadow:0 1px 6px rgba(255,194,51,.3)}
.r-stat .lbl{font-size:10px;color:var(--dim);font-weight:700;letter-spacing:.3px;margin-top:2px}
.btn-group{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:14px}
.btn-sec{background:rgba(255,255,255,.1);border:1.5px solid rgba(255,255,255,.15);border-radius:18px;
  padding:12px 24px;font-size:15px;font-weight:800;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer;
  box-shadow:0 4px 0 rgba(0,0,0,.2),var(--shine);transition:all .1s}
.btn-sec:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.2)}
.btn-pri{background:linear-gradient(135deg,var(--pink),var(--purple));border:none;border-radius:18px;
  padding:12px 24px;font-size:15px;font-weight:900;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer;
  box-shadow:0 5px 0 rgba(140,20,80,.5),0 8px 24px rgba(255,90,158,.3),var(--shine);transition:all .1s;
  letter-spacing:.3px;position:relative;overflow:hidden}
.btn-pri::before{content:'';position:absolute;top:0;left:0;right:0;height:50%;background:linear-gradient(180deg,rgba(255,255,255,.12),transparent);border-radius:18px 18px 0 0}
.btn-pri:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(140,20,80,.5),0 3px 8px rgba(255,90,158,.2)}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;
  background:rgba(0,0,0,.45);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border-top:1px solid rgba(255,255,255,.06);padding:6px 0 max(6px,env(safe-area-inset-bottom));z-index:100}
.nav-item{display:flex;flex-direction:column;align-items:center;padding:6px 16px;cursor:pointer;opacity:.35;
  transition:all .25s cubic-bezier(.34,1.56,.64,1);border-radius:16px}
.nav-item.active{opacity:1;background:rgba(255,255,255,.08);
  box-shadow:0 0 16px rgba(180,77,255,.2);transform:translateY(-2px)}
.nav-item .ic{font-size:22px;filter:drop-shadow(0 1px 3px rgba(0,0,0,.3))}
.nav-item .lb{font-size:9px;font-weight:800;margin-top:2px;letter-spacing:.3px}
#daily,#profile{padding:0 14px 100px}
.daily-hero{text-align:center;padding:18px 0;flex-shrink:0}
.daily-hero h2{font-family:'Baloo 2',cursive;font-size:22px;color:var(--coral);
  text-shadow:0 2px 10px rgba(255,107,122,.3)}
.mission-card{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.1);
  border-radius:18px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:10px;
  box-shadow:0 4px 0 rgba(0,0,0,.15),var(--shine);position:relative;overflow:hidden}
.mission-card::before{content:'';position:absolute;top:0;left:0;right:0;height:40%;
  background:linear-gradient(180deg,rgba(255,255,255,.04),transparent);border-radius:18px 18px 0 0}
.mission-card .em{font-size:32px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));position:relative;z-index:1}
.mission-card .info{flex:1;position:relative;z-index:1}
.mission-card .tt{font-weight:800;font-size:14px;letter-spacing:.2px}
.mission-card .ds{font-size:10px;color:var(--dim);font-weight:600}
.mission-card .rw{background:rgba(255,194,51,.15);border:1px solid rgba(255,194,51,.2);
  border-radius:12px;padding:4px 10px;font-size:11px;font-weight:900;color:var(--gold);
  position:relative;z-index:1;text-shadow:0 1px 3px rgba(255,194,51,.3)}
.m-prog{width:100%;height:5px;background:rgba(255,255,255,.1);border-radius:3px;margin-top:5px;overflow:hidden;
  border:1px solid rgba(255,255,255,.05)}
.m-prog .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--mint),var(--gold));
  box-shadow:0 0 6px rgba(45,219,166,.3)}
.mission-card.done{border-color:var(--mint);background:rgba(45,219,166,.08);
  box-shadow:0 4px 0 rgba(10,130,80,.3),0 0 16px rgba(45,219,166,.1),var(--shine)}
.mission-card.done .tt::after{content:' \\2705'}
.profile-hero{text-align:center;padding:22px 0 14px;flex-shrink:0}
.profile-name{font-family:'Baloo 2',cursive;font-size:24px;color:var(--peach);
  text-shadow:0 2px 10px rgba(255,181,167,.3)}
.profile-lv{color:var(--gold);font-weight:800;font-size:13px;letter-spacing:.3px;
  text-shadow:0 1px 4px rgba(255,194,51,.3)}
.xp-bar-full{width:100%;max-width:280px;height:8px;background:rgba(255,255,255,.1);border-radius:4px;
  overflow:hidden;margin:8px auto 0;border:1px solid rgba(255,255,255,.06);
  box-shadow:inset 0 2px 4px rgba(0,0,0,.2)}
.xp-bar-full .fill{height:100%;border-radius:4px;
  background:linear-gradient(90deg,var(--pink),var(--gold));
  transition:width .5s;box-shadow:0 0 10px rgba(255,90,158,.3)}
.streak-card{background:linear-gradient(135deg,rgba(255,90,158,.15),rgba(255,194,51,.1));
  border:1.5px solid rgba(255,90,158,.25);border-radius:var(--radius);
  padding:18px;text-align:center;margin-top:14px;
  box-shadow:0 5px 0 rgba(0,0,0,.15),0 0 24px rgba(255,90,158,.1),var(--shine)}
.streak-num{font-size:44px;font-weight:900;color:var(--coral);
  text-shadow:0 3px 12px rgba(255,107,122,.4);font-family:'Baloo 2',cursive}
.streak-lbl{font-size:12px;color:var(--dim);font-weight:700}
.ach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:14px}
.ach{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.08);
  border-radius:16px;padding:10px 6px;text-align:center;font-size:26px;
  box-shadow:0 3px 0 rgba(0,0,0,.15),var(--shine);position:relative;overflow:hidden}
.ach::before{content:'';position:absolute;top:0;left:0;right:0;height:40%;background:linear-gradient(180deg,rgba(255,255,255,.04),transparent)}
.ach.locked{opacity:.2;filter:grayscale(1)}
.ach .anm{font-size:8px;font-weight:800;margin-top:3px;letter-spacing:.3px}
.gem-stats-card{background:linear-gradient(135deg,rgba(180,77,255,.12),rgba(61,194,255,.08));
  border:1.5px solid rgba(180,77,255,.25);border-radius:var(--radius);
  padding:14px;margin-top:14px;text-align:center;
  box-shadow:0 5px 0 rgba(0,0,0,.15),var(--shine)}
.gem-stats-card h3{font-family:'Baloo 2',cursive;font-size:17px;color:var(--purple);
  text-shadow:0 2px 8px rgba(180,77,255,.3);margin-bottom:8px}
.gem-stats-row{display:flex;justify-content:space-around;gap:8px}
.gem-stat{flex:1;background:rgba(255,255,255,.06);border-radius:14px;padding:10px 6px;
  border:1px solid rgba(255,255,255,.08)}
.gem-stat-num{font-family:'Baloo 2',cursive;font-size:22px;font-weight:800;color:var(--gold);
  text-shadow:0 2px 6px rgba(255,194,51,.3)}
.gem-stat-lbl{font-size:10px;font-weight:700;color:var(--dim);margin-top:2px}
.gem-exchange-card{background:linear-gradient(135deg,rgba(255,194,51,.12),rgba(255,90,158,.08));
  border:1.5px solid rgba(255,194,51,.25);border-radius:var(--radius);
  padding:16px;margin-top:14px;text-align:center;
  box-shadow:0 5px 0 rgba(0,0,0,.15),0 0 24px rgba(255,194,51,.1),var(--shine)}
.gem-exchange-card h3{font-family:'Baloo 2',cursive;font-size:17px;color:var(--gold);
  text-shadow:0 2px 8px rgba(255,194,51,.3);margin-bottom:4px}
.gem-rate{font-size:13px;font-weight:800;color:var(--peach);margin-bottom:8px}
.gem-balance{font-size:13px;font-weight:700;color:var(--dim);margin-bottom:8px}
.gem-val{color:var(--purple);font-weight:900;font-size:16px}
.gem-vnd{color:var(--mint);font-weight:900;font-size:16px}
.gem-progress{margin-bottom:10px}
.gem-prog-bar{width:100%;height:8px;background:rgba(255,255,255,.1);border-radius:4px;
  overflow:hidden;border:1px solid rgba(255,255,255,.06);
  box-shadow:inset 0 2px 4px rgba(0,0,0,.2)}
.gem-prog-bar .fill{height:100%;border-radius:4px;
  background:linear-gradient(90deg,var(--purple),var(--gold));
  transition:width .5s;box-shadow:0 0 10px rgba(180,77,255,.3)}
.gem-prog-text{font-size:10px;color:var(--dim);font-weight:700;margin-top:4px}
.btn-exchange{background:linear-gradient(135deg,var(--mint),#14cca0);border:none;border-radius:18px;
  padding:12px 28px;font-size:15px;font-weight:800;color:#1b0a3c;cursor:pointer;
  font-family:'Baloo 2',cursive;
  box-shadow:0 5px 0 rgba(10,130,80,.4),0 8px 24px rgba(45,219,166,.3),var(--shine);
  transition:all .1s;position:relative;overflow:hidden}
.btn-exchange:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(10,130,80,.4)}
.btn-exchange:disabled{opacity:.4;cursor:not-allowed;box-shadow:0 3px 0 rgba(0,0,0,.15)}
.exchange-msg{font-size:12px;font-weight:700;margin-top:6px;min-height:18px}
.exchange-history{margin-top:8px;text-align:left}
.exchange-history h4{font-size:12px;font-weight:800;color:var(--dim);margin-bottom:4px}
.ex-item{display:flex;align-items:center;gap:6px;padding:6px 10px;
  background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.06);
  border-radius:10px;margin-bottom:4px;font-size:11px;font-weight:700}
.ex-item .ex-amt{flex:1;color:var(--mint)}
.ex-item .ex-st{color:var(--gold)}
.ex-item .ex-dt{color:var(--dim);font-size:9px}
/* ========== SETTINGS ========== */
.set-group{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);
  border-radius:18px;padding:16px;margin-bottom:12px;
  box-shadow:0 4px 0 rgba(0,0,0,.12),var(--shine)}
.set-title{font-family:'Baloo 2',cursive;font-size:15px;color:var(--peach);
  margin-bottom:12px;text-shadow:0 1px 4px rgba(0,0,0,.2)}
.set-row{display:flex;align-items:center;justify-content:space-between;gap:10px;
  padding:10px 0;border-bottom:1px solid rgba(255,255,255,.05)}
.set-row:last-child{border-bottom:none}
.set-lbl{font-size:13px;font-weight:700;color:var(--text)}
.set-toggle{padding:6px 16px;border-radius:20px;border:none;font-size:12px;font-weight:800;
  font-family:'Nunito',sans-serif;cursor:pointer;transition:all .2s;
  background:rgba(255,255,255,.1);color:var(--dim)}
.set-toggle.on{background:linear-gradient(135deg,var(--mint),#14cca0);color:#1b0a3c;
  box-shadow:0 3px 0 rgba(10,130,80,.4)}
.set-pills{display:flex;gap:6px}
.set-pill{padding:5px 12px;border-radius:14px;border:1.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.05);color:var(--dim);font-size:12px;font-weight:700;
  font-family:'Nunito',sans-serif;cursor:pointer;transition:all .2s}
.set-pill.active{background:linear-gradient(135deg,var(--purple),#9b3dff);color:#fff;
  border-color:var(--purple);box-shadow:0 3px 0 rgba(130,50,200,.4)}
.set-input{width:100px;padding:6px 10px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.06);color:var(--text);font-size:13px;font-weight:700;
  font-family:'Nunito',sans-serif;outline:none}
.set-input:focus{border-color:var(--purple)}
.set-input-full{width:100%;padding:10px 12px;border-radius:12px;border:1.5px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.06);color:var(--text);font-size:13px;font-weight:700;
  font-family:'Nunito',sans-serif;outline:none;margin-top:6px}
.set-input-full:focus{border-color:var(--purple)}
.set-btn{padding:6px 14px;border-radius:14px;border:none;font-size:12px;font-weight:800;
  font-family:'Nunito',sans-serif;cursor:pointer;
  background:rgba(255,255,255,.1);color:var(--text);transition:all .2s}
.set-btn:active{transform:translateY(2px)}
.set-btn.pri{background:linear-gradient(135deg,var(--mint),#14cca0);color:#1b0a3c;
  box-shadow:0 3px 0 rgba(10,130,80,.4)}
.set-field{margin-bottom:10px}
.set-field label{font-size:12px;font-weight:700;color:var(--dim)}
.set-msg{font-size:12px;font-weight:700;min-height:16px;margin-top:8px}
.set-logout{display:block;width:100%;padding:14px;border:none;border-radius:18px;
  background:linear-gradient(135deg,rgba(239,68,68,.2),rgba(239,68,68,.1));
  border:1.5px solid rgba(239,68,68,.3);color:#ef4444;font-size:15px;font-weight:800;
  font-family:'Baloo 2',cursive;cursor:pointer;margin-top:16px;
  box-shadow:0 4px 0 rgba(0,0,0,.12);transition:all .2s}
.set-logout:active{transform:translateY(3px);box-shadow:0 1px 0 rgba(0,0,0,.12)}
.set-ver{text-align:center;font-size:11px;color:var(--dim);margin-top:14px;font-weight:600}
/* ========== LEARNING REPORT ========== */
.report-section{margin-top:18px}
.report-section h3{font-family:'Baloo 2',cursive;font-size:17px;text-shadow:0 1px 4px rgba(0,0,0,.2);margin-bottom:10px}
.report-overview{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin-bottom:14px}
.report-ov-card{background:rgba(255,255,255,.07);border:1.5px solid rgba(255,255,255,.08);
  border-radius:16px;padding:12px 8px;text-align:center;
  box-shadow:0 3px 0 rgba(0,0,0,.15),var(--shine)}
.report-ov-icon{font-size:20px;margin-bottom:2px}
.report-ov-num{font-family:'Baloo 2',cursive;font-size:22px;font-weight:800;
  text-shadow:0 2px 6px rgba(0,0,0,.2)}
.report-ov-lbl{font-size:10px;font-weight:700;color:var(--dim);margin-top:2px}
.report-chart-card{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);
  border-radius:18px;padding:14px;margin-bottom:14px;
  box-shadow:0 4px 0 rgba(0,0,0,.12),var(--shine)}
.report-chart-title{font-family:'Baloo 2',cursive;font-size:14px;color:var(--peach);
  margin-bottom:8px;text-shadow:0 1px 4px rgba(0,0,0,.2)}
.report-sub-title{font-family:'Baloo 2',cursive;font-size:14px;color:var(--peach);
  margin-bottom:8px;text-shadow:0 1px 4px rgba(0,0,0,.2)}
.report-sub-card{background:rgba(255,255,255,.05);border:1.5px solid rgba(255,255,255,.08);
  border-radius:18px;padding:14px;margin-bottom:10px;
  box-shadow:0 4px 0 rgba(0,0,0,.12),var(--shine);cursor:pointer;transition:all .2s}
.report-sub-card.open{background:rgba(255,255,255,.08)}
.report-sub-header{display:flex;align-items:center;gap:10px}
.report-sub-emoji{font-size:28px}
.report-sub-info{flex:1}
.report-sub-name{font-family:'Baloo 2',cursive;font-size:16px;font-weight:800;color:var(--text)}
.report-sub-meta{display:flex;gap:12px;font-size:11px;font-weight:700;color:var(--dim);margin-top:2px}
.report-sub-arrow{font-size:14px;color:var(--dim);transition:transform .2s}
.report-sub-card.open .report-sub-arrow{transform:rotate(180deg)}
.report-sub-acc{font-family:'Baloo 2',cursive;font-size:18px;font-weight:800;margin-left:auto;min-width:48px;text-align:right}
.report-skills-list{margin-top:10px;display:none}
.report-sub-card.open .report-skills-list{display:block}
.report-sk-row{display:flex;align-items:center;gap:8px;padding:8px 10px;
  background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.06);
  border-radius:12px;margin-bottom:6px}
.report-sk-em{font-size:18px;flex-shrink:0}
.report-sk-info{flex:1;min-width:0}
.report-sk-nm{font-size:12px;font-weight:700;color:var(--text);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.report-sk-bar{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;margin-top:3px;
  border:1px solid rgba(255,255,255,.04)}
.report-sk-bar .fill{height:100%;border-radius:3px;transition:width .4s}
.report-sk-stats{font-size:10px;font-weight:700;color:var(--dim);text-align:right;min-width:60px;flex-shrink:0}
.report-sk-lv{font-size:9px;font-weight:800;color:var(--gold);background:rgba(255,194,51,.15);
  padding:2px 6px;border-radius:8px;display:inline-block;margin-top:2px}
/* ========== QUEST/STREAK ENHANCEMENTS ========== */
.streak-info-card{background:linear-gradient(135deg,rgba(255,90,158,.12),rgba(255,194,51,.08));
  border:1.5px solid rgba(255,90,158,.2);border-radius:18px;padding:14px;margin-bottom:14px;
  box-shadow:0 4px 0 rgba(0,0,0,.12),var(--shine)}
.streak-info-row{display:flex;align-items:center;gap:14px}
.streak-info-num{font-family:'Baloo 2',cursive;font-size:42px;font-weight:800;color:var(--coral);
  text-shadow:0 3px 10px rgba(255,107,122,.4);min-width:52px;text-align:center}
.streak-info-meta{flex:1}
.streak-info-lbl{font-size:14px;font-weight:800;color:var(--text)}
.streak-info-mult{font-size:12px;font-weight:700;color:var(--gold);margin-top:2px}
.streak-freeze{font-size:12px;font-weight:700;color:var(--sky);margin-top:8px;
  padding:6px 10px;background:rgba(61,194,255,.1);border-radius:10px;text-align:center}
.quest-section-title{font-family:'Baloo 2',cursive;font-size:15px;color:var(--peach);
  margin-bottom:8px;text-shadow:0 1px 4px rgba(0,0,0,.2)}
.ach-tier{font-size:12px;margin-top:2px}
.ach-prog{height:3px;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden;margin-top:3px;width:80%;margin-left:auto;margin-right:auto}
.ach-prog .fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--gold),var(--mint));transition:width .4s}
.ach.maxed{border-color:var(--gold);background:rgba(255,194,51,.1);
  box-shadow:0 3px 0 rgba(180,120,0,.3),0 0 12px rgba(255,194,51,.15),var(--shine)}
/* ========== DIFFICULTY BADGE ========== */
.diff-badge{display:inline-block;padding:3px 12px;border-radius:20px;font-size:11px;font-weight:800;
  letter-spacing:.3px;margin-bottom:8px;border:1.5px solid;
  box-shadow:0 2px 0 rgba(0,0,0,.1);text-align:center}
/* ========== CHARACTER & PET EVOLUTION ========== */
.char-pet-card{margin-top:14px}
.cp-row{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.cp-item{background:rgba(255,255,255,.06);border:1.5px solid rgba(255,255,255,.08);
  border-radius:16px;padding:12px;display:flex;gap:10px;align-items:center;
  box-shadow:0 3px 0 rgba(0,0,0,.12),var(--shine)}
.cp-badge{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;
  justify-content:center;font-size:18px;flex-shrink:0;
  box-shadow:0 2px 8px rgba(0,0,0,.2)}
.cp-info{flex:1;min-width:0}
.cp-name{font-family:'Baloo 2',cursive;font-size:14px;font-weight:800;color:var(--text);
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.cp-level{font-size:11px;font-weight:800;letter-spacing:.3px}
.cp-xp-bar{height:6px;background:rgba(255,255,255,.1);border-radius:3px;overflow:hidden;
  margin-top:4px;border:1px solid rgba(255,255,255,.04)}
.cp-xp-bar .fill{height:100%;border-radius:3px;transition:width .5s}
.cp-xp-text{font-size:9px;color:var(--dim);font-weight:700;margin-top:2px}
.cp-ability{display:flex;align-items:center;gap:8px;margin-top:8px;padding:8px 12px;
  background:linear-gradient(135deg,rgba(180,77,255,.1),rgba(61,194,255,.08));
  border:1px solid rgba(180,77,255,.15);border-radius:12px;font-size:12px;font-weight:700;color:var(--dim)}
.cp-ability-icon{font-size:16px}
.cp-ability-label{color:var(--text);font-weight:800}
/* Char glow/crown/hat overlays */
.char-glow{position:absolute;width:100px;height:100px;border-radius:50%;
  background:radial-gradient(circle,var(--glow-color,#b44dff) 0%,transparent 70%);
  opacity:.3;top:-5px;left:50%;transform:translateX(-70%);pointer-events:none;
  animation:charGlowPulse 2s ease-in-out infinite}
@keyframes charGlowPulse{0%,100%{opacity:.2;transform:translateX(-70%) scale(1)}50%{opacity:.4;transform:translateX(-70%) scale(1.1)}}
.char-crown{position:absolute;top:-12px;left:50%;transform:translateX(-70%);font-size:24px;
  filter:drop-shadow(0 2px 6px rgba(255,215,0,.5));animation:crownFloat 2s ease-in-out infinite}
.char-hat{position:absolute;top:-8px;left:50%;transform:translateX(-70%);font-size:20px;
  filter:drop-shadow(0 2px 4px rgba(0,0,0,.3));animation:crownFloat 3s ease-in-out infinite}
@keyframes crownFloat{0%,100%{transform:translateX(-70%) translateY(0)}50%{transform:translateX(-70%) translateY(-4px)}}
.pet-wings{position:absolute;bottom:20px;right:0;font-size:18px;opacity:.6;
  animation:wingFlap 1s ease-in-out infinite}
@keyframes wingFlap{0%,100%{transform:scaleX(1)}50%{transform:scaleX(-1)}}
/* Evolution celebration overlay */
.evolution-overlay{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;
  justify-content:center;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);
  animation:evoFadeIn .3s ease}
@keyframes evoFadeIn{0%{opacity:0}100%{opacity:1}}
.evo-content{text-align:center;animation:evoBounce .8s cubic-bezier(.34,1.56,.64,1)}
@keyframes evoBounce{0%{transform:scale(.3);opacity:0}100%{transform:scale(1);opacity:1}}
.evo-sparkles{font-size:28px;letter-spacing:8px;animation:evoSparkle 1s ease infinite;margin-bottom:8px}
@keyframes evoSparkle{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.1)}}
.evo-icon{font-size:64px;margin:8px 0}
.evo-title{font-family:'Baloo 2',cursive;font-size:32px;font-weight:800;
  background:linear-gradient(135deg,#ffc233,#ff5a9e,#b44dff);
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  filter:drop-shadow(0 2px 8px rgba(255,194,51,.4))}
.evo-detail{font-size:16px;font-weight:700;color:var(--text);margin-top:4px}
.evo-subtitle{font-family:'Baloo 2',cursive;font-size:22px;font-weight:800;margin-top:4px}
.evo-bonus{font-size:14px;font-weight:800;color:var(--gold);margin-top:8px;
  background:rgba(255,194,51,.15);padding:6px 16px;border-radius:20px;display:inline-block}
.confetti-box{position:fixed;inset:0;pointer-events:none;z-index:9999}
.conf{position:absolute;animation:confFall var(--dur,3s) var(--del,0s) linear forwards}
@keyframes confFall{0%{transform:translateY(-10vh) rotate(0) scale(1);opacity:1}50%{opacity:1}100%{transform:translateY(110vh) rotate(720deg) scale(.6);opacity:0}}
.corgi-tap-effect{position:fixed;pointer-events:none;z-index:300;font-size:20px;animation:tapFloat3d 1.1s cubic-bezier(.34,1.56,.64,1) forwards}
@keyframes tapFloat3d{0%{opacity:1;transform:translateY(0) scale(.5)}30%{transform:translateY(-20px) scale(1.3)}100%{opacity:0;transform:translateY(-60px) scale(1)}}
.paw-trail{position:fixed;pointer-events:none;z-index:0;font-size:12px;opacity:0;animation:pawFade 2s ease forwards}
@keyframes pawFade{0%{opacity:.5;transform:scale(.5)}100%{opacity:0;transform:scale(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-14px)}}
#wheel{padding:0 14px 80px;text-align:center}
.exchange-box{display:flex;align-items:center;justify-content:center;gap:10px;padding:8px 14px;margin:6px 16px;
  background:rgba(255,255,255,.08);border:1.5px solid rgba(255,255,255,.1);border-radius:16px;
  box-shadow:0 3px 0 rgba(0,0,0,.15),var(--shine)}
.exchange-info{font-size:13px;font-weight:800;color:var(--peach)}
.exchange-info #exStars{color:var(--gold);font-size:16px}
.exchange-btn{background:linear-gradient(135deg,var(--gold),#ffab00);border:none;border-radius:14px;
  padding:8px 16px;font-size:13px;font-weight:800;color:#1b0a3c;cursor:pointer;
  font-family:'Nunito',sans-serif;box-shadow:0 3px 0 rgba(180,120,0,.4),var(--shine);
  transition:all .1s;white-space:nowrap}
.exchange-btn:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(180,120,0,.4)}
.exchange-btn:disabled{opacity:.35;cursor:not-allowed}
.wh-wrap{position:relative;width:min(220px,55vw);height:min(220px,55vw);margin:4px auto 8px}
.wh-pointer{position:absolute;top:-12px;left:50%;transform:translateX(-50%);font-size:28px;z-index:2;
  filter:drop-shadow(0 3px 8px rgba(0,0,0,.3));animation:pointerBob 1s ease-in-out infinite}
@keyframes pointerBob{0%,100%{transform:translateX(-50%) translateY(0)}50%{transform:translateX(-50%) translateY(4px)}}
.wh-canvas{width:100%;height:100%;border-radius:50%;
  border:4px solid var(--gold);
  box-shadow:0 4px 0 rgba(0,0,0,.25),0 0 20px rgba(255,194,51,.25),inset 0 0 15px rgba(0,0,0,.1)}
.btn-spin{display:block;margin:0 auto;
  background:linear-gradient(135deg,var(--gold),#ffab00);border:none;border-radius:50px;
  padding:10px 28px;font-size:15px;font-weight:800;color:#1b0a3c;cursor:pointer;
  font-family:'Baloo 2',cursive;letter-spacing:.3px;
  box-shadow:0 4px 0 rgba(180,120,0,.5),0 6px 16px rgba(255,194,51,.3),var(--shine);
  transition:all .1s;position:relative;overflow:hidden;text-shadow:0 1px 0 rgba(255,255,255,.3)}
.btn-spin:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(180,120,0,.5)}
.btn-spin:disabled{opacity:.35;cursor:not-allowed;box-shadow:none}
.btn-spin::before{content:'';position:absolute;top:0;left:-50%;width:50%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.25),transparent);animation:btnShine 3s infinite}
.spin-result{font-family:'Baloo 2',cursive;font-size:20px;color:var(--gold);margin:6px 0;
  text-shadow:0 2px 8px rgba(255,194,51,.4);min-height:26px}
.rw-section{margin:8px 0;padding-bottom:10px;text-align:left}
.rw-title{font-family:'Baloo 2',cursive;font-size:14px;color:var(--peach);margin-bottom:4px;
  text-shadow:0 1px 4px rgba(0,0,0,.2)}
.rw-list{display:flex;flex-direction:column;gap:4px;max-height:150px;overflow-y:auto;-webkit-overflow-scrolling:touch}
.rw-item{display:flex;align-items:center;gap:8px;padding:8px 12px;
  background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.06);
  border-radius:12px;box-shadow:0 2px 0 rgba(0,0,0,.1);font-size:13px;font-weight:800}
.rw-nm{flex:1;color:var(--text)}
.rw-dt{font-size:10px;color:var(--dim);font-weight:600}
.rw-empty{text-align:center;padding:16px;color:var(--dim);font-size:12px;font-weight:700}
/* ========== DESKTOP (min-width:768px) ========== */
@media(min-width:768px){
  .screen{max-width:600px;margin:0 auto;left:0;right:0}
  #splash{padding:40px}
  .splash-title{font-size:44px}
  .splash-name{font-size:26px}
  .btn-play{padding:20px 64px;font-size:24px}
  .speech-bubble{max-width:360px;font-size:16px;padding:14px 24px}
  .top-bar{padding:12px 20px}
  .stat-pill{padding:6px 16px;font-size:14px}
  .subject-tabs{padding:8px 12px 10px}
  .subject-tab .tab-icon{font-size:26px}
  .subject-tab .tab-label{font-size:12px}
  .map-header h2{font-size:26px}
  .skill-grid{grid-template-columns:1fr 1fr 1fr;gap:16px;padding:14px 20px;max-width:580px;margin:0 auto}
  .skill-card{padding:20px 16px 18px}
  .skill-card .em{font-size:44px}
  .skill-card .nm{font-size:16px}
  .game-area{max-width:560px;padding:20px}
  .question-card{padding:28px 24px}
  .q-text{font-size:32px}
  .ans-btn{padding:18px 14px;font-size:20px;min-height:60px;border-radius:20px}
  .answers-grid{gap:14px}
  #result{padding:32px}
  .result-title{font-size:36px}
  .result-stars{font-size:52px}
  .r-stat{padding:16px 24px;border-radius:20px}
  .r-stat .num{font-size:28px}
  .btn-group .btn-pri,.btn-group .btn-sec{padding:14px 32px;font-size:17px;border-radius:20px}
  #daily,#profile{padding:0 20px 100px;max-width:600px;margin:0 auto}
  .daily-hero h2{font-size:26px}
  .mission-card{padding:16px 20px;border-radius:20px}
  .mission-card .em{font-size:38px}
  .mission-card .tt{font-size:16px}
  .profile-hero{padding:28px 0 18px}
  .profile-name{font-size:28px}
  .streak-card{padding:24px;border-radius:24px}
  .streak-num{font-size:52px}
  .char-pet-card{margin-top:18px}
  .cp-item{padding:16px;border-radius:20px}
  .cp-badge{width:42px;height:42px;font-size:22px}
  .cp-name{font-size:16px}
  .cp-level{font-size:12px}
  .gem-stats-card,.gem-exchange-card{padding:20px;border-radius:24px}
  .gem-stat-num{font-size:26px}
  .ach-grid{grid-template-columns:repeat(5,1fr);gap:12px}
  .ach{padding:14px 8px;font-size:30px;border-radius:18px}
  .report-overview{gap:12px}
  .report-ov-card{padding:18px 14px;border-radius:20px}
  .report-ov-icon{font-size:24px}
  .report-ov-num{font-size:26px}
  .report-ov-lbl{font-size:12px}
  .report-chart-card{padding:20px;border-radius:22px}
  .report-chart-card canvas{height:160px!important}
  .report-chart-title{font-size:16px}
  .report-sub-card{padding:18px;border-radius:22px}
  .report-sub-emoji{font-size:34px}
  .report-sub-name{font-size:18px}
  .report-sub-meta{font-size:12px;gap:16px}
  .report-sub-acc{font-size:22px}
  .report-sk-row{padding:10px 14px;border-radius:14px}
  .report-sk-nm{font-size:13px}
  .report-sk-stats{font-size:11px;min-width:72px}
  #wheel{padding:0 20px 100px}
  .wh-wrap{width:260px!important;height:260px!important;margin:8px auto 12px!important}
  .btn-spin{padding:14px 36px;font-size:18px}
  .spin-result{font-size:24px;margin:10px 0}
  .exchange-box{padding:10px 20px;margin:8px auto;max-width:360px;border-radius:20px}
  .exchange-info{font-size:15px}
  .exchange-btn{padding:10px 20px;font-size:14px}
  .rw-section{max-width:400px;margin:12px auto}
  .rw-list{max-height:200px}
  .rw-item{padding:10px 16px;font-size:14px;border-radius:14px}
  .bottom-nav{max-width:600px;left:50%;transform:translateX(-50%);border-radius:20px 20px 0 0;
    box-shadow:0 -4px 24px rgba(0,0,0,.3)}
  .nav-item{padding:8px 24px}
  .nav-item .ic{font-size:26px}
  .nav-item .lb{font-size:11px}
  .corgi-game{bottom:24px;right:24px}
  .enc-text{font-size:52px}
  .enc-sub{font-size:20px}
}

/* ========== MOBILE PORTRAIT (narrow, tall) ========== */
@media(max-width:767px) and (orientation:portrait){
  .skill-grid{max-width:420px;margin:0 auto}
  .game-area{max-width:440px}
}
@media(max-width:380px) and (orientation:portrait){
  .splash-title{font-size:28px}
  .splash-name{font-size:18px}
  .btn-play{padding:16px 44px;font-size:20px}
  .skill-grid{gap:10px;padding:8px 12px}
  .skill-card{padding:14px 10px 12px}
  .skill-card .em{font-size:32px}
  .skill-card .nm{font-size:12px}
  .q-text{font-size:24px!important}
  .ans-btn{padding:14px 8px;font-size:16px;min-height:48px}
  .result-title{font-size:24px}
  .r-stat{padding:10px 14px}
  .r-stat .num{font-size:20px}
  .wh-wrap{width:min(180px,48vw)!important;height:min(180px,48vw)!important}
}
@media(max-height:700px) and (orientation:portrait){
  #splash{gap:6px;padding:20px}
  .splash-title{font-size:30px}
  .btn-play{padding:14px 44px;font-size:20px}
  .wh-wrap{width:min(200px,50vw)!important;height:min(200px,50vw)!important;margin:2px auto 6px!important}
  .btn-spin{padding:8px 24px;font-size:14px}
  .spin-result{font-size:18px;margin:4px 0;min-height:22px}
  .exchange-box{padding:6px 12px;margin:4px 12px}
  .rw-section{margin:4px 0}
  .rw-list{max-height:100px}
  .daily-hero{padding:10px 0}
  .daily-hero h2{font-size:18px}
  .mission-card{padding:10px 12px}
  .profile-hero{padding:14px 0 10px}
  .char-pet-card{margin-top:8px}
  .cp-item{padding:10px}
  .cp-badge{width:32px;height:32px;font-size:16px}
  .cp-name{font-size:13px}
  .cp-level{font-size:10px}
  .cp-ability{padding:6px 10px;font-size:11px;margin-top:6px}
  .streak-card{padding:12px;margin-top:10px}
  .streak-num{font-size:36px}
  .gem-stats-card{padding:10px;margin-top:10px}
  .gem-exchange-card{padding:12px;margin-top:10px}
  #daily,#profile{padding:0 12px 85px}
  .report-ov-num{font-size:18px}
  .report-chart-card canvas{height:110px!important}
  .report-sub-card{padding:10px 12px;margin-bottom:8px}
}

/* ========== MOBILE LANDSCAPE (wide, short) ========== */
@media(max-height:500px) and (orientation:landscape){
  html,body{overflow:auto}
  .screen{overflow-y:auto;-webkit-overflow-scrolling:touch}
  /* Splash — horizontal layout */
  #splash{flex-direction:row;padding:12px 24px;gap:20px}
  #splash #splashScene{margin:0;flex-shrink:0}
  .splash-title{font-size:24px}
  .splash-name{font-size:16px}
  .splash-sub{margin:4px 0 10px;font-size:12px}
  .btn-play{padding:12px 36px;font-size:18px}
  /* Top bar compact */
  .top-bar{padding:4px 12px}
  .stat-pill{padding:3px 8px;font-size:11px;border-radius:20px}
  .stat-pill .ic{font-size:12px}
  .avatar-mini{width:28px;height:28px;font-size:14px}
  .lv-badge{font-size:9px;padding:1px 6px}
  .xp-mini{width:48px;height:3px}
  /* Subject tabs compact */
  .subject-tabs{padding:2px 4px 4px}
  .subject-tab{padding:4px 2px}
  .subject-tab .tab-icon{font-size:16px}
  .subject-tab .tab-label{font-size:8px;margin-top:0}
  /* Map */
  .map-header{padding:6px 12px 2px}
  .map-header h2{font-size:17px}
  .corgi-map{padding:2px 0}
  #map{padding-bottom:55px}
  .skill-grid{grid-template-columns:repeat(3,1fr);gap:8px;padding:4px 10px;max-width:100%}
  .skill-card{padding:8px 6px 6px}
  .skill-card .em{font-size:24px}
  .skill-card .nm{font-size:10px;margin-top:2px}
  .skill-card .prog{font-size:8px}
  .skill-card .pbar{margin:3px auto 0;width:80%}
  /* Game / Questions */
  .game-area{padding:6px 12px;max-width:100%}
  .timer-bar{height:5px;margin-bottom:6px}
  .question-card{padding:10px 14px;border-radius:16px}
  .q-text{font-size:20px!important;margin-bottom:4px}
  .q-hint{font-size:10px;margin-bottom:8px}
  .answers-grid{gap:6px}
  .ans-btn{padding:8px 6px;font-size:14px;min-height:36px;border-radius:12px;
    box-shadow:0 3px 0 rgba(0,0,0,.25),var(--shine)}
  .g-stat{padding:4px 8px;border-radius:10px}
  .g-stat .lb{font-size:8px}
  .g-stat .vl{font-size:14px}
  .corgi-game{bottom:8px;right:8px}
  /* Result */
  #result{padding:10px 20px;flex-direction:column}
  .result-title{font-size:22px}
  .result-stars{font-size:30px;margin:4px 0}
  .result-stats{margin:6px 0;gap:6px}
  .r-stat{padding:6px 10px;border-radius:12px;min-width:56px}
  .r-stat .num{font-size:18px}
  .r-stat .lbl{font-size:8px}
  .btn-group{margin-top:8px;gap:6px}
  .btn-group .btn-pri,.btn-group .btn-sec{padding:8px 18px;font-size:13px;border-radius:14px}
  /* Daily */
  .daily-hero{padding:6px 0}
  .daily-hero h2{font-size:16px}
  #daily{padding:0 10px 55px}
  .mission-card{padding:8px 10px;margin-bottom:6px;border-radius:14px}
  .mission-card .em{font-size:24px}
  .mission-card .tt{font-size:12px}
  .mission-card .ds{font-size:9px}
  .mission-card .rw{padding:3px 8px;font-size:9px}
  /* Wheel — side-by-side layout */
  #wheel{padding:0 10px 55px;display:flex;flex-wrap:wrap;align-items:flex-start;justify-content:center;gap:8px}
  #wheel>.top-bar{width:100%;flex-shrink:0}
  #wheel>div:nth-child(2){width:100%}
  .wh-wrap{width:min(160px,35vh)!important;height:min(160px,35vh)!important;margin:2px auto 4px!important}
  .wh-pointer{font-size:20px;top:-8px}
  .btn-spin{padding:6px 18px;font-size:12px;border-radius:30px}
  .spin-result{font-size:14px;margin:2px 0;min-height:18px}
  .exchange-box{padding:4px 8px;margin:2px 8px;border-radius:12px}
  .exchange-info{font-size:11px}
  .exchange-btn{padding:5px 10px;font-size:11px;border-radius:10px}
  .rw-section{margin:2px 0;padding-bottom:4px}
  .rw-title{font-size:12px}
  .rw-list{max-height:60px}
  .rw-item{padding:4px 8px;font-size:11px;border-radius:8px}
  #spinMascot{display:none}
  /* Profile */
  #profile{padding:0 10px 55px}
  .profile-hero{padding:8px 0 6px}
  .profile-name{font-size:18px}
  .profile-lv{font-size:11px}
  .xp-bar-full{height:5px;max-width:200px}
  .char-pet-card{margin-top:6px}
  .cp-row{gap:6px}
  .cp-item{padding:8px;border-radius:12px}
  .cp-badge{width:28px;height:28px;font-size:14px}
  .cp-name{font-size:12px}
  .cp-level{font-size:9px}
  .cp-xp-bar{height:4px}
  .cp-ability{padding:4px 8px;font-size:10px;margin-top:4px}
  .streak-card{padding:8px;margin-top:6px;border-radius:16px}
  .streak-num{font-size:28px}
  .streak-lbl{font-size:10px}
  .gem-stats-card{padding:8px;margin-top:6px;border-radius:16px}
  .gem-stats-card h3{font-size:14px;margin-bottom:4px}
  .gem-stat-num{font-size:16px}
  .gem-stat-lbl{font-size:8px}
  .gem-exchange-card{padding:8px;margin-top:6px;border-radius:16px}
  .gem-exchange-card h3{font-size:14px}
  .gem-rate{font-size:11px}
  .gem-balance{font-size:11px}
  .gem-val,.gem-vnd{font-size:13px}
  .gem-prog-bar{height:5px}
  .btn-exchange{padding:8px 20px;font-size:12px;border-radius:14px}
  .ach-grid{grid-template-columns:repeat(6,1fr);gap:6px;margin-top:8px}
  .ach{padding:6px 4px;font-size:20px;border-radius:12px}
  .ach .anm{font-size:7px}
  .report-section h3{font-size:14px;margin-bottom:6px}
  .report-overview{gap:6px;margin-bottom:8px}
  .report-ov-card{padding:8px 6px;border-radius:12px}
  .report-ov-icon{font-size:14px;margin-bottom:0}
  .report-ov-num{font-size:16px}
  .report-ov-lbl{font-size:8px}
  .report-chart-card{padding:8px 10px;margin-bottom:8px;border-radius:14px}
  .report-chart-card canvas{height:100px!important}
  .report-chart-title{font-size:12px;margin-bottom:4px}
  .report-sub-card{padding:8px 10px;margin-bottom:6px;border-radius:14px}
  .report-sub-emoji{font-size:22px}
  .report-sub-name{font-size:13px}
  .report-sub-meta{font-size:9px;gap:8px}
  .report-sub-acc{font-size:16px}
  .report-sk-row{padding:5px 8px;margin-bottom:4px;border-radius:10px}
  .report-sk-em{font-size:14px}
  .report-sk-nm{font-size:10px}
  .report-sk-stats{font-size:9px;min-width:50px}
  .report-sk-lv{font-size:8px;padding:1px 4px}
  /* Bottom nav compact */
  .bottom-nav{padding:2px 0 max(2px,env(safe-area-inset-bottom))}
  .nav-item{padding:3px 12px}
  .nav-item .ic{font-size:18px}
  .nav-item .lb{font-size:7px;margin-top:0}
  /* Overlays */
  .enc-text{font-size:30px}
  .enc-sub{font-size:14px}
  .speech-bubble{padding:6px 12px;font-size:12px;max-width:220px;border-radius:16px}
  .combo-display{top:44px;font-size:16px;padding:2px 10px}
}
`

const gameHTML = `
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<div class="sparkles" id="sparkles"></div>
<div class="combo-display" id="comboDisplay"></div>
<div id="splash" class="screen active">
  <div style="position:absolute;inset:0;pointer-events:none" id="floatingStars"></div>
  <div id="splashScene" style="margin-bottom:10px"></div>
  <div class="splash-title">Vương Quốc Học Giỏi</div>
  <div class="splash-name" id="splashName">Em Học Toán Vui</div>
  <div class="splash-sub" id="splashGradeName">Toán  ·  Tiếng Việt  ·  English</div>
  <button class="btn-play" onclick="startGame()">Chơi nào!</button>
</div>
<div id="map" class="screen">
  <div class="top-bar">
    <div class="player-row">
      <div class="avatar-mini">🐾</div>
      <div>
        <div class="lv-badge" id="lvB">Lv.1</div>
        <div class="xp-mini"><div class="fill" id="xpM" style="width:0%"></div></div>
      </div>
    </div>
    <div style="display:flex;gap:6px">
      <div class="stat-pill"><span class="ic">⭐</span><span id="stC">0</span></div>
      <div class="stat-pill"><span class="ic">💎</span><span id="gmC">0</span></div>
      <div class="stat-pill"><span class="ic">🔥</span><span id="skC">0</span></div>
    </div>
  </div>
  <div class="subject-tabs" id="subjectTabs">
    <div class="subject-tab active" style="--tab-color:#ff5a9e" onclick="switchSubject(0)"><span class="tab-icon">🔢</span><span class="tab-label">Toán</span></div>
    <div class="subject-tab" style="--tab-color:#3dc2ff" onclick="switchSubject(1)"><span class="tab-icon">📖</span><span class="tab-label">Tiếng Việt</span></div>
    <div class="subject-tab" style="--tab-color:#b44dff" onclick="switchSubject(2)"><span class="tab-icon">🌍</span><span class="tab-label">English</span></div>
  </div>
  <div class="map-header"><h2 id="mapTitle">🗺️ Toán Học</h2></div>
  <div class="corgi-map" id="corgiMap"></div>
  <div class="skill-grid" id="skillGrid"></div>
</div>
<div id="game" class="screen">
  <div class="top-bar">
    <button class="back-btn" onclick="exitGame()">← Về</button>
    <div class="stat-pill"><span class="ic">✅</span><span id="cC">0</span>/<span id="tQ">10</span></div>
  </div>
  <div class="game-area" id="gameArea"></div>
  <div class="corgi-game" id="corgiG" onclick="tapCorgi()" style="display:none"></div>
</div>
<div id="result" class="screen">
  <div id="resultScene" style="margin-bottom:10px"></div>
  <div class="result-title" id="rTitle">Giỏi lắm!</div>
  <div class="result-stars" id="rStars">⭐⭐⭐</div>
  <div id="rSpeech"></div>
  <div class="result-stats">
    <div class="r-stat"><div class="num" id="rCor">0</div><div class="lbl">Đúng</div></div>
    <div class="r-stat"><div class="num" id="rAcc">0%</div><div class="lbl">Chính xác</div></div>
    <div class="r-stat"><div class="num" id="rXP">+0</div><div class="lbl">XP</div></div>
    <div class="r-stat"><div class="num" id="rGem">+0</div><div class="lbl">💎</div></div>
  </div>
  <div class="btn-group">
    <button class="btn-sec" onclick="showScreen('map')">🗺️ Bản đồ</button>
    <button class="btn-pri" onclick="replaySkill()">🔄 Chơi lại</button>
  </div>
</div>
<div id="daily" class="screen">
  <div class="top-bar">
    <div class="player-row"><div class="avatar-mini">🐾</div><div><div class="lv-badge" id="lvB2">Lv.1</div></div></div>
    <div style="display:flex;gap:6px"><div class="stat-pill"><span class="ic">⭐</span><span id="stC2">0</span></div><div class="stat-pill"><span class="ic">💎</span><span id="gmC2">0</span></div></div>
  </div>
  <div class="daily-hero">
    <h2>🎯 Nhiệm Vụ Hôm Nay</h2>
    <p style="color:var(--dim);font-size:12px;margin-top:4px;font-weight:600" id="dailyGreet">Hoàn thành để nhận quà!</p>
  </div>
  <div id="dailyMissions"></div>
</div>
<div id="wheel" class="screen">
  <div class="top-bar">
    <div class="player-row"><div class="avatar-mini">🐾</div><div><div class="lv-badge" id="lvB3">Lv.1</div></div></div>
    <div style="display:flex;gap:6px">
      <div class="stat-pill"><span class="ic">⭐</span><span id="stC3">0</span></div>
      <div class="stat-pill"><span class="ic">🎟️</span><span id="tkC">0</span></div>
      <div class="stat-pill"><span class="ic">💎</span><span id="gmC3">0</span></div>
    </div>
  </div>
  <div style="text-align:center;padding:4px 0 0">
    <h2 style="font-family:'Baloo 2',cursive;font-size:18px;color:var(--gold);text-shadow:0 2px 10px rgba(255,194,51,.3)">🎡 Vòng Quay May Mắn</h2>
  </div>
  <div class="wh-wrap">
    <div class="wh-pointer">📍</div>
    <canvas id="wheelCanvas" class="wh-canvas" width="220" height="220"></canvas>
  </div>
  <button class="btn-spin" id="spinBtn" onclick="spinWheel()">🎰 QUAY!</button>
  <div class="spin-result" id="spinResult"></div>
  <div class="exchange-box">
    <div class="exchange-info">⭐ <span id="exStars">0</span> sao</div>
    <button class="exchange-btn" id="exBtn" onclick="exchangeStars()">Đổi 3⭐ → 1🎟️</button>
  </div>
  <div id="spinMascot" style="margin-top:2px;text-align:center"></div>
  <div class="rw-section">
    <div class="rw-title">🎁 Phần thưởng đã nhận</div>
    <div class="rw-list" id="rewardList"></div>
  </div>
</div>
<div id="profile" class="screen">
  <div class="top-bar"><span style="font-weight:800;font-size:15px" id="profTopName">👤 Bé</span><div style="display:flex;gap:8px"><button class="back-btn" onclick="showScreen('settings')">⚙️</button><button class="back-btn" onclick="resetProgress()">🔄</button></div></div>
  <div class="profile-hero">
    <div id="profAv" style="margin:0 auto 10px"></div>
    <div class="profile-name" id="profName">Bé</div>
    <div class="profile-lv" id="profLv">Level 1</div>
    <div class="xp-bar-full"><div class="fill" id="xpF" style="width:0%"></div></div>
    <div style="font-size:10px;color:var(--dim);margin-top:4px;font-weight:700"><span id="xpC">0</span>/<span id="xpN">100</span> XP</div>
  </div>
  <div id="charPetCard" class="char-pet-card"></div>
  <div class="streak-card"><div class="streak-num" id="profSk">0</div><div class="streak-lbl">ngày chơi liên tục 🔥</div></div>
  <div class="gem-stats-card">
    <h3>💎 Kim Cương</h3>
    <div class="gem-stats-row">
      <div class="gem-stat"><div class="gem-stat-num" id="gemCurrent">0</div><div class="gem-stat-lbl">Hiện có</div></div>
      <div class="gem-stat"><div class="gem-stat-num" id="gemExchanged">0</div><div class="gem-stat-lbl">Đã đổi</div></div>
      <div class="gem-stat"><div class="gem-stat-num" id="gemTotal">0</div><div class="gem-stat-lbl">Tổng kiếm</div></div>
    </div>
  </div>
  <div class="gem-exchange-card">
    <h3>💰 Đổi Kim Cương → Tiền Mặt</h3>
    <p class="gem-rate">10 💎 = 1.000 VNĐ</p>
    <div class="gem-balance">Bạn có: <span id="gemBal" class="gem-val">0</span> 💎 = <span id="gemVnd" class="gem-vnd">0</span> VNĐ</div>
    <div class="gem-progress">
      <div class="gem-prog-bar"><div class="fill" id="gemProgFill" style="width:0%"></div></div>
      <div class="gem-prog-text"><span id="gemProgNum">0</span>/1000 💎 để đổi tiền</div>
    </div>
    <button class="btn-exchange" id="btnExchange" onclick="requestExchange()" disabled>
      🏦 Yêu cầu đổi tiền
    </button>
    <div id="exchangeMsg" class="exchange-msg"></div>
    <div id="exchangeHistory" class="exchange-history"></div>
  </div>
  <div class="report-section">
    <h3>📊 Báo Cáo Học Tập</h3>
    <div class="report-overview" id="reportOverview"></div>
    <div class="report-chart-card">
      <div class="report-chart-title">📈 Hoạt động 7 ngày qua</div>
      <canvas id="chart7day" style="width:100%;height:140px"></canvas>
    </div>
    <div class="report-sub-title">📚 Tiến độ theo môn</div>
    <div id="reportSubjects"></div>
  </div>
  <h3 style="margin-top:18px;font-family:'Baloo 2',cursive;font-size:17px;text-shadow:0 1px 4px rgba(0,0,0,.2)">🏆 Thành Tựu</h3>
  <div class="ach-grid" id="achGrid"></div>
</div>
<div id="settings" class="screen">
  <div class="top-bar"><span style="font-weight:800;font-size:15px">⚙️ Cài Đặt</span><button class="back-btn" onclick="showScreen('profile')">← Quay lại</button></div>
  <div id="settingsContent" style="padding:0 14px 100px"></div>
</div>
<div class="bottom-nav" id="bottomNav" style="display:none">
  <div class="nav-item active" onclick="switchTab('map')"><span class="ic">🗺️</span><span class="lb">Học</span></div>
  <div class="nav-item" onclick="switchTab('daily')"><span class="ic">🎯</span><span class="lb">Nhiệm vụ</span></div>
  <div class="nav-item" onclick="switchTab('wheel')"><span class="ic">🎰</span><span class="lb">Quay</span></div>
  <div class="nav-item" onclick="switchTab('profile')"><span class="ic">👤</span><span class="lb">Hồ sơ</span></div>
</div>
<div class="confetti-box" id="confetti"></div>
`
