import Game from '@/components/game'

export default function Home() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: gameCSS }} />
      <div dangerouslySetInnerHTML={{ __html: gameHTML }} />
      <Game />
    </>
  )
}

const gameCSS = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}
:root{--bg:#1a1040;--pink:#ff6b9d;--purple:#c084fc;--gold:#fbbf24;--mint:#34d399;--sky:#38bdf8;--coral:#fb7185;--peach:#fda4af;--card:rgba(255,255,255,0.07);--text:#fff;--dim:rgba(255,255,255,0.55)}
html,body{height:100%;overflow:hidden;font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);touch-action:manipulation}
body::before{content:'';position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse at 30% 90%,rgba(192,132,252,0.2),transparent 50%),radial-gradient(ellipse at 70% 10%,rgba(255,107,157,0.15),transparent 50%),linear-gradient(160deg,#1a1040,#2d1b69 40%,#1e1145)}
.sparkles{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.sparkle{position:absolute;width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:0;animation:twinkle var(--dur,4s) var(--delay,0s) infinite}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}
.screen{position:fixed;inset:0;z-index:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
.screen.active{display:flex}
.corgi-bounce{animation:corgiBounce .6s ease}
@keyframes corgiBounce{0%{transform:translateY(0)}30%{transform:translateY(-20px) rotate(-5deg)}60%{transform:translateY(-5px) rotate(3deg)}100%{transform:translateY(0)}}
.corgi-happy{animation:corgiHappy .8s ease}
@keyframes corgiHappy{0%{transform:rotate(0)}20%{transform:rotate(-10deg) scale(1.1)}40%{transform:rotate(10deg) scale(1.1)}60%{transform:rotate(-5deg)}100%{transform:rotate(0)}}
.corgi-sad{animation:corgiSad .6s ease}
@keyframes corgiSad{0%{transform:translateY(0)}50%{transform:translateY(5px) scale(.95)}100%{transform:translateY(0)}}
.corgi-spin{animation:corgiSpin .8s ease}
@keyframes corgiSpin{0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}
.corgi-run{animation:corgiRun .4s ease infinite alternate}
@keyframes corgiRun{0%{transform:translateX(0) scaleX(1)}100%{transform:translateX(8px) scaleX(.95)}}
.speech-bubble{position:relative;background:rgba(255,255,255,.12);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,.15);border-radius:20px;padding:10px 16px;font-size:14px;font-weight:700;max-width:260px;text-align:center;animation:bubPop .4s ease;margin:0 auto}
.speech-bubble::after{content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);border:10px solid transparent;border-top-color:rgba(255,255,255,.12);border-bottom:0}
@keyframes bubPop{0%{opacity:0;transform:scale(.5) translateY(10px)}100%{opacity:1;transform:scale(1) translateY(0)}}
#splash{justify-content:center;align-items:center;text-align:center;padding:30px;gap:8px;background:radial-gradient(ellipse at center,#2d1b69,#1a1040)}
.splash-title{font-family:'Baloo 2',cursive;font-size:32px;font-weight:800;background:linear-gradient(135deg,var(--pink),var(--purple),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.splash-name{font-family:'Baloo 2',cursive;font-size:20px;color:var(--peach)}
.splash-sub{font-size:14px;color:var(--dim);margin:4px 0 20px}
.btn-play{background:linear-gradient(135deg,var(--pink),var(--purple));border:none;border-radius:60px;padding:16px 50px;font-size:20px;font-weight:800;color:#fff;cursor:pointer;font-family:'Baloo 2',cursive;box-shadow:0 8px 30px rgba(255,107,157,.4);animation:pulse 2s ease-in-out infinite;position:relative;overflow:hidden}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.fstar{position:absolute;font-size:20px;animation:floatStar var(--dur,5s) var(--del,0s) infinite ease-in-out}
@keyframes floatStar{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-20px);opacity:1}}
.top-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 14px;background:rgba(0,0,0,.25);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,.06);flex-shrink:0;z-index:10}
.stat-pill{display:flex;align-items:center;gap:4px;background:rgba(255,255,255,.08);border-radius:30px;padding:4px 10px;font-weight:700;font-size:13px}
.stat-pill .ic{font-size:14px}
.player-row{display:flex;align-items:center;gap:8px}
.avatar-mini{width:32px;height:32px;border-radius:50%;background:linear-gradient(135deg,var(--pink),var(--purple));display:flex;align-items:center;justify-content:center;font-size:18px;box-shadow:0 0 10px rgba(255,107,157,.4)}
.lv-badge{font-size:11px;font-weight:800;color:var(--gold);background:rgba(251,191,36,.15);border-radius:8px;padding:2px 7px}
.xp-mini{width:60px;height:4px;background:rgba(255,255,255,.1);border-radius:2px;overflow:hidden;margin-top:2px}
.xp-mini .fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width .5s}
.subject-tabs{display:flex;gap:0;flex-shrink:0;background:rgba(0,0,0,.15);border-bottom:1px solid rgba(255,255,255,.06)}
.subject-tab{flex:1;text-align:center;padding:10px 4px;font-size:13px;font-weight:700;cursor:pointer;opacity:.45;transition:all .2s;border-bottom:3px solid transparent;position:relative}
.subject-tab.active{opacity:1;border-bottom-color:var(--tab-color,var(--pink))}
.subject-tab .tab-icon{font-size:20px;display:block}
.subject-tab .tab-label{font-size:10px;margin-top:1px}
#map{padding-bottom:90px}
.map-header{text-align:center;padding:12px 16px 4px;flex-shrink:0}
.map-header h2{font-family:'Baloo 2',cursive;font-size:20px;color:var(--peach)}
.corgi-map{text-align:center;padding:2px 0}
.skill-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:8px 14px}
.skill-card{background:var(--card);backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,.08);border-radius:16px;padding:14px 10px;text-align:center;cursor:pointer;transition:all .3s;position:relative;overflow:hidden}
.skill-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--cc,rgba(255,107,157,.15)),transparent);opacity:.6}
.skill-card:active{transform:scale(.94)}
.skill-card .em{font-size:34px;position:relative;z-index:1}
.skill-card .nm{font-family:'Baloo 2',cursive;font-size:13px;font-weight:700;margin-top:4px;position:relative;z-index:1}
.skill-card .prog{font-size:10px;font-weight:800;color:var(--gold);position:relative;z-index:1;margin-top:1px}
.skill-card .pbar{width:80%;height:3px;background:rgba(255,255,255,.1);border-radius:2px;margin:4px auto 0;overflow:hidden;position:relative;z-index:1}
.skill-card .pbar .fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width .5s}
.skill-card.mastered{border-color:var(--gold);box-shadow:0 0 15px rgba(251,191,36,.2)}
.skill-card.mastered::after{content:'\\u2b50';position:absolute;top:6px;right:6px;font-size:14px;z-index:2}
#game{align-items:center}
.game-area{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:14px;width:100%;max-width:560px;position:relative}
.g-stat{background:rgba(255,255,255,.08);border-radius:10px;padding:5px 12px;text-align:center}
.g-stat .lb{font-size:9px;color:var(--dim)}.g-stat .vl{font-size:16px;font-weight:800}
.corgi-game{position:fixed;bottom:16px;right:14px;z-index:50;cursor:pointer}
.corgi-game:active{transform:scale(1.2)}
.timer-bar{width:100%;height:6px;background:rgba(255,255,255,.08);border-radius:3px;margin-bottom:10px;overflow:hidden}
.timer-bar .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--mint),var(--gold),var(--coral));transition:width .1s linear}
.question-card{background:rgba(255,255,255,.06);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1.5px solid rgba(255,255,255,.1);border-radius:20px;padding:20px 18px;text-align:center;width:100%;animation:slideUp .4s ease}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.q-text{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800;margin-bottom:4px;color:#fff;text-shadow:0 2px 15px rgba(255,107,157,.3)}
.q-hint{font-size:12px;color:var(--dim);margin-bottom:14px}
.answers-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;width:100%}
.answers-grid.single-col{grid-template-columns:1fr}
.ans-btn{background:rgba(255,255,255,.07);border:2px solid rgba(255,255,255,.1);border-radius:14px;padding:14px 8px;font-size:18px;font-weight:700;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer;transition:all .2s;text-align:center;word-break:break-word;line-height:1.3}
.ans-btn:active{transform:scale(.94)}
.ans-btn.correct{background:rgba(52,211,153,.25)!important;border-color:var(--mint)!important;animation:correctPop .5s ease}
.ans-btn.wrong{background:rgba(251,113,133,.25)!important;border-color:var(--coral)!important;animation:shake .4s ease}
@keyframes correctPop{0%{transform:scale(1)}30%{transform:scale(1.08)}100%{transform:scale(1)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}
.encourage-overlay{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:200;pointer-events:none;animation:encFade 1.6s ease forwards}
@keyframes encFade{0%{opacity:0}10%{opacity:1}70%{opacity:1}100%{opacity:0}}
.enc-text{font-family:'Baloo 2',cursive;font-size:38px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:encBounce .5s ease}
.enc-sub{font-size:16px;color:var(--peach);margin-top:2px;animation:encBounce .5s .1s ease both}
@keyframes encBounce{0%{transform:scale(0) rotate(-10deg)}50%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1)}}
.combo-display{position:fixed;top:65px;left:50%;transform:translateX(-50%);z-index:100;font-family:'Baloo 2',cursive;font-size:18px;font-weight:800;color:var(--gold);text-shadow:0 0 20px rgba(251,191,36,.5);opacity:0;transition:all .3s;pointer-events:none}
.combo-display.show{opacity:1;animation:comboShake .3s ease}
@keyframes comboShake{0%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.3)}100%{transform:translateX(-50%) scale(1)}}
#result{justify-content:center;align-items:center;text-align:center;padding:20px}
.result-title{font-family:'Baloo 2',cursive;font-size:28px;font-weight:800;background:linear-gradient(135deg,var(--pink),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.result-stars{font-size:40px;margin:6px 0}
.result-stats{display:flex;gap:12px;margin:12px 0;justify-content:center;flex-wrap:wrap}
.r-stat{background:rgba(255,255,255,.07);border-radius:12px;padding:10px 16px;text-align:center}
.r-stat .num{font-size:24px;font-weight:800;color:var(--gold)}.r-stat .lbl{font-size:10px;color:var(--dim)}
.btn-group{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:10px}
.btn-sec{background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.15);border-radius:14px;padding:10px 20px;font-size:14px;font-weight:700;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer}
.btn-pri{background:linear-gradient(135deg,var(--pink),var(--purple));border:none;border-radius:14px;padding:10px 20px;font-size:14px;font-weight:800;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer;box-shadow:0 4px 20px rgba(255,107,157,.4)}
.bottom-nav{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;background:rgba(0,0,0,.4);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,.06);padding:5px 0 max(5px,env(safe-area-inset-bottom));z-index:100}
.nav-item{display:flex;flex-direction:column;align-items:center;padding:4px 12px;cursor:pointer;opacity:.4;transition:all .2s}
.nav-item.active{opacity:1}.nav-item .ic{font-size:20px}.nav-item .lb{font-size:9px;font-weight:700;margin-top:1px}
#daily,#profile{padding:0 14px 100px}
.daily-hero{text-align:center;padding:16px 0;flex-shrink:0}
.daily-hero h2{font-family:'Baloo 2',cursive;font-size:20px;color:var(--coral)}
.mission-card{background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.08);border-radius:14px;padding:12px 14px;display:flex;align-items:center;gap:10px;margin-bottom:8px}
.mission-card .em{font-size:28px}.mission-card .info{flex:1}.mission-card .tt{font-weight:700;font-size:13px}.mission-card .ds{font-size:10px;color:var(--dim)}
.mission-card .rw{background:rgba(251,191,36,.15);border-radius:8px;padding:3px 8px;font-size:10px;font-weight:700;color:var(--gold)}
.m-prog{width:100%;height:4px;background:rgba(255,255,255,.1);border-radius:2px;margin-top:4px;overflow:hidden}
.m-prog .fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--mint),var(--gold))}
.mission-card.done{border-color:var(--mint)}.mission-card.done .tt::after{content:' \\u2705'}
.profile-hero{text-align:center;padding:20px 0 12px;flex-shrink:0}
.profile-name{font-family:'Baloo 2',cursive;font-size:22px;color:var(--peach)}
.profile-lv{color:var(--gold);font-weight:700;font-size:12px}
.xp-bar-full{width:100%;max-width:260px;height:7px;background:rgba(255,255,255,.1);border-radius:4px;overflow:hidden;margin:6px auto 0}
.xp-bar-full .fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width .5s}
.streak-card{background:linear-gradient(135deg,rgba(255,107,157,.2),rgba(251,191,36,.1));border:1px solid rgba(255,107,157,.3);border-radius:16px;padding:16px;text-align:center;margin-top:12px}
.streak-num{font-size:40px;font-weight:900;color:var(--coral)}.streak-lbl{font-size:12px;color:var(--dim)}
.ach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:12px}
.ach{background:rgba(255,255,255,.06);border-radius:10px;padding:8px;text-align:center;font-size:24px}
.ach.locked{opacity:.25;filter:grayscale(1)}.ach .anm{font-size:8px;font-weight:700;margin-top:2px}
.back-btn{background:rgba(255,255,255,.1);border:none;border-radius:10px;padding:6px 12px;color:#fff;font-size:12px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}
.confetti-box{position:fixed;inset:0;pointer-events:none;z-index:9999}
.conf{position:absolute;animation:confFall var(--dur,3s) var(--del,0s) linear forwards}
@keyframes confFall{0%{transform:translateY(-10vh) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}
.corgi-tap-effect{position:fixed;pointer-events:none;z-index:300;font-size:18px;animation:tapFloat 1s ease forwards}
@keyframes tapFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-50px) scale(1.4)}}
.paw-trail{position:fixed;pointer-events:none;z-index:0;font-size:12px;opacity:0;animation:pawFade 2s ease forwards}
@keyframes pawFade{0%{opacity:.5;transform:scale(.5)}100%{opacity:0;transform:scale(1)}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
`

const gameHTML = `
<link href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">
<div class="sparkles" id="sparkles"></div>
<div class="combo-display" id="comboDisplay"></div>

<!-- SPLASH -->
<div id="splash" class="screen active">
  <div style="position:absolute;inset:0;pointer-events:none" id="floatingStars"></div>
  <div id="splashScene" style="margin-bottom:8px"></div>
  <div class="splash-title">Học Giỏi Lớp 3</div>
  <div class="splash-name">✨ Uyển Nhi & Corgi ✨</div>
  <div class="splash-sub">Toán · Tiếng Việt · Tiếng Anh</div>
  <button class="btn-play" onclick="startGame()">🐾 Chơi nào!</button>
</div>

<!-- MAP -->
<div id="map" class="screen">
  <div class="top-bar">
    <div class="player-row">
      <div class="avatar-mini">🐾</div>
      <div><div class="lv-badge" id="lvB">Lv.1</div><div class="xp-mini"><div class="fill" id="xpM" style="width:0%"></div></div></div>
    </div>
    <div style="display:flex;gap:5px">
      <div class="stat-pill"><span class="ic">⭐</span><span id="stC">0</span></div>
      <div class="stat-pill"><span class="ic">💎</span><span id="gmC">0</span></div>
      <div class="stat-pill"><span class="ic">🔥</span><span id="skC">0</span></div>
    </div>
  </div>
  <div class="subject-tabs" id="subjectTabs">
    <div class="subject-tab active" style="--tab-color:#fb7185" onclick="switchSubject(0)"><span class="tab-icon">🔢</span><span class="tab-label">Toán</span></div>
    <div class="subject-tab" style="--tab-color:#38bdf8" onclick="switchSubject(1)"><span class="tab-icon">📖</span><span class="tab-label">Tiếng Việt</span></div>
    <div class="subject-tab" style="--tab-color:#a78bfa" onclick="switchSubject(2)"><span class="tab-icon">🌍</span><span class="tab-label">English</span></div>
  </div>
  <div class="map-header"><h2 id="mapTitle">🗺️ Toán Học</h2></div>
  <div class="corgi-map" id="corgiMap"></div>
  <div class="skill-grid" id="skillGrid"></div>
</div>

<!-- GAME (no timer, no hearts) -->
<div id="game" class="screen">
  <div class="top-bar">
    <button class="back-btn" onclick="exitGame()">← Về</button>
    <div class="stat-pill"><span class="ic">✅</span><span id="cC">0</span>/<span id="tQ">10</span></div>
  </div>
  <div class="game-area" id="gameArea"></div>
  <div class="corgi-game" id="corgiG" onclick="tapCorgi()" style="display:none"></div>
</div>

<!-- RESULT -->
<div id="result" class="screen">
  <div id="resultScene" style="margin-bottom:8px"></div>
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

<!-- DAILY -->
<div id="daily" class="screen">
  <div class="top-bar"><div class="player-row"><div class="avatar-mini">🐾</div><div><div class="lv-badge" id="lvB2">Lv.1</div></div></div><div style="display:flex;gap:5px"><div class="stat-pill"><span class="ic">⭐</span><span id="stC2">0</span></div><div class="stat-pill"><span class="ic">💎</span><span id="gmC2">0</span></div></div></div>
  <div class="daily-hero"><h2>🎯 Nhiệm Vụ Hôm Nay</h2><p style="color:var(--dim);font-size:12px">Hoàn thành để nhận quà, Uyển Nhi!</p></div>
  <div id="dailyMissions"></div>
</div>

<!-- PROFILE -->
<div id="profile" class="screen">
  <div class="top-bar"><span style="font-weight:700">👤 Uyển Nhi</span><button class="back-btn" onclick="resetProgress()">🔄 Reset</button></div>
  <div class="profile-hero">
    <div id="profAv" style="margin:0 auto 8px"></div>
    <div class="profile-name">Uyển Nhi</div>
    <div class="profile-lv" id="profLv">Level 1</div>
    <div class="xp-bar-full"><div class="fill" id="xpF" style="width:0%"></div></div>
    <div style="font-size:10px;color:var(--dim);margin-top:3px"><span id="xpC">0</span>/<span id="xpN">100</span> XP</div>
  </div>
  <div class="streak-card"><div class="streak-num" id="profSk">0</div><div class="streak-lbl">ngày chơi liên tục 🔥</div></div>
  <h3 style="margin-top:16px;font-family:'Baloo 2',cursive;font-size:16px">🏆 Thành Tựu</h3>
  <div class="ach-grid" id="achGrid"></div>
</div>

<div class="bottom-nav" id="bottomNav" style="display:none">
  <div class="nav-item active" onclick="switchTab('map')"><span class="ic">🗺️</span><span class="lb">Học</span></div>
  <div class="nav-item" onclick="switchTab('daily')"><span class="ic">🎯</span><span class="lb">Nhiệm vụ</span></div>
  <div class="nav-item" onclick="switchTab('profile')"><span class="ic">👤</span><span class="lb">Hồ sơ</span></div>
</div>
<div class="confetti-box" id="confetti"></div>
`
