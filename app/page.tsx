'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { GRADE_REGISTRY } from '@/lib/grade-registry'

const GRADES = [...GRADE_REGISTRY].sort((a, b) => a.order - b.order)

export default function Landing() {
  const router = useRouter()
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const pp = JSON.parse(localStorage.getItem('player_profile') || '{}')
      if (pp.lastGrade) {
        router.replace('/' + pp.lastGrade)
        return
      }
    } catch { /* no profile */ }
    setReady(true)
  }, [router])

  function selectGrade(gradeId: string) {
    try {
      const raw = localStorage.getItem('player_profile')
      const pp = raw ? JSON.parse(raw) : { name: 'Bé', gender: 'girl', avatar: 'uyennhi', pet: 'corgi' }
      pp.lastGrade = gradeId
      localStorage.setItem('player_profile', JSON.stringify(pp))
    } catch { /* ignore */ }
    router.push('/' + gradeId)
  }

  if (!ready) return null

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: landingCSS }} />
      <div className="landing">
        <div className="sparkle-bg" />
        <div className="landing-content">
          <div className="landing-title">🏰 Vương Quốc Học Giỏi</div>
          <div className="landing-sub">Chọn lớp để bắt đầu hành trình!</div>

          <div className="grade-cards">
            {GRADES.map(g => (
              <div
                key={g.id}
                className="grade-card"
                style={{ '--gc': g.color } as React.CSSProperties}
                onClick={() => selectGrade(g.id)}
              >
                <div className="grade-mascot">
                  <img src={g.mascot} alt={g.name} width={100} height={100} style={{ objectFit: 'contain' }} />
                </div>
                <div className="grade-emoji">{g.emoji}</div>
                <div className="grade-name">{g.name}</div>
                <div className="grade-desc">{g.desc}</div>
                <div className="grade-btn">Chơi ngay!</div>
              </div>
            ))}
          </div>

          <div className="landing-footer">
            Toán · Tiếng Việt · English cùng thú cưng dễ thương!
          </div>
        </div>
      </div>
    </>
  )
}

const landingCSS = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}
:root{
  --bg1:#1b0a3c;--bg2:#2d1463;
  --pink:#ff5a9e;--purple:#b44dff;--gold:#ffc233;--mint:#2ddba6;
  --text:#fff;--dim:rgba(255,255,255,0.5);
}
html,body{height:100%;font-family:'Nunito',sans-serif;background:var(--bg1);color:var(--text);-webkit-font-smoothing:antialiased}
.landing{min-height:100vh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  background:linear-gradient(170deg,#1b0a3c 0%,#2d1463 35%,#3a1878 60%,#2a1260 100%);
  position:relative;overflow:hidden}
.sparkle-bg{position:fixed;inset:0;
  background:
    radial-gradient(ellipse 120% 80% at 20% 100%,rgba(176,77,255,.3),transparent),
    radial-gradient(ellipse 100% 60% at 80% 0%,rgba(255,90,158,.2),transparent);
  pointer-events:none}
.landing-content{position:relative;z-index:1;text-align:center;padding:30px 20px;max-width:500px;width:100%}
.landing-title{font-family:'Baloo 2',cursive;font-size:38px;font-weight:800;
  background:linear-gradient(135deg,#ff5a9e,#ffc233,#b44dff,#3dc2ff);background-size:300% 300%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:gradShift 4s ease infinite;
  filter:drop-shadow(0 3px 8px rgba(255,90,158,.4))}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.landing-sub{font-size:16px;color:var(--dim);margin:8px 0 32px;letter-spacing:.5px}
.grade-cards{display:flex;gap:20px;justify-content:center;flex-wrap:wrap}
.grade-card{
  background:rgba(255,255,255,.08);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);
  border:2px solid rgba(255,255,255,.12);border-radius:24px;
  padding:28px 24px 20px;text-align:center;cursor:pointer;width:200px;
  transition:all .2s cubic-bezier(.34,1.56,.64,1);position:relative;overflow:hidden;
  box-shadow:0 6px 0 rgba(0,0,0,.25),0 12px 40px rgba(0,0,0,.2),inset 0 2px 0 rgba(255,255,255,.15)}
.grade-card::before{content:'';position:absolute;inset:0;
  background:linear-gradient(160deg,var(--gc,rgba(255,107,157,.2)),transparent 70%);opacity:.5;border-radius:24px}
.grade-card:hover{transform:translateY(-6px) scale(1.03);
  box-shadow:0 12px 0 rgba(0,0,0,.2),0 20px 60px rgba(0,0,0,.3),0 0 30px var(--gc)}
.grade-card:active{transform:translateY(2px);box-shadow:0 2px 0 rgba(0,0,0,.25)}
.grade-mascot{position:relative;z-index:1;margin-bottom:8px;
  filter:drop-shadow(0 6px 12px rgba(0,0,0,.35));animation:float 3s ease-in-out infinite}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
.grade-emoji{font-size:28px;position:relative;z-index:1}
.grade-name{font-family:'Baloo 2',cursive;font-size:26px;font-weight:800;position:relative;z-index:1;
  text-shadow:0 2px 8px rgba(0,0,0,.3);margin-top:4px}
.grade-desc{font-size:12px;color:var(--dim);position:relative;z-index:1;margin-top:4px}
.grade-btn{
  margin-top:14px;position:relative;z-index:1;
  background:linear-gradient(135deg,var(--gc,#ff5a9e),rgba(255,255,255,.2));
  border-radius:30px;padding:10px 20px;font-weight:800;font-size:14px;
  box-shadow:0 4px 0 rgba(0,0,0,.25),inset 0 2px 0 rgba(255,255,255,.2);
  letter-spacing:.3px}
.landing-footer{margin-top:40px;font-size:13px;color:var(--dim);letter-spacing:.3px}
/* Desktop */
@media(min-width:768px){
  .landing-content{max-width:700px;padding:40px 30px}
  .landing-title{font-size:48px}
  .landing-sub{font-size:18px;margin:12px 0 40px}
  .grade-cards{gap:30px}
  .grade-card{width:260px;padding:36px 32px 28px;border-radius:28px}
  .grade-mascot img{width:130px!important;height:130px!important}
  .grade-emoji{font-size:34px}
  .grade-name{font-size:30px}
  .grade-desc{font-size:14px}
  .grade-btn{padding:12px 28px;font-size:16px}
  .landing-footer{margin-top:50px;font-size:15px}
}
/* Mobile landscape */
@media(max-height:500px) and (orientation:landscape){
  .landing{min-height:100vh;padding:10px}
  .landing-content{max-width:100%;padding:10px 20px}
  .landing-title{font-size:26px}
  .landing-sub{font-size:13px;margin:4px 0 12px}
  .grade-cards{gap:16px;flex-wrap:nowrap}
  .grade-card{width:180px;padding:14px 16px 12px;border-radius:18px}
  .grade-mascot img{width:60px!important;height:60px!important}
  .grade-mascot{margin-bottom:4px}
  .grade-emoji{font-size:20px}
  .grade-name{font-size:20px}
  .grade-desc{font-size:10px}
  .grade-btn{margin-top:8px;padding:7px 16px;font-size:12px}
  .landing-footer{margin-top:12px;font-size:11px}
}
`
