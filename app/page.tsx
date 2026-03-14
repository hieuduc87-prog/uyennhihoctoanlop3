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
:root{
  --bg:#1a1040;--bg2:#2d1b69;
  --pink:#ff6b9d;--purple:#c084fc;--gold:#fbbf24;--mint:#34d399;
  --sky:#38bdf8;--coral:#fb7185;--peach:#fda4af;
  --card:rgba(255,255,255,0.07);--glass:rgba(255,255,255,0.04);
  --text:#fff;--dim:rgba(255,255,255,0.55);
}
html,body{height:100%;overflow:hidden;font-family:'Nunito',sans-serif;background:var(--bg);color:var(--text);touch-action:manipulation}
body::before{content:'';position:fixed;inset:0;z-index:0;background:radial-gradient(ellipse at 30% 90%,rgba(192,132,252,0.2) 0%,transparent 50%),radial-gradient(ellipse at 70% 10%,rgba(255,107,157,0.15) 0%,transparent 50%),radial-gradient(ellipse at 50% 50%,rgba(251,191,36,0.05) 0%,transparent 60%),linear-gradient(160deg,#1a1040 0%,#2d1b69 40%,#1e1145 100%)}

.sparkles{position:fixed;inset:0;pointer-events:none;z-index:0;overflow:hidden}
.sparkle{position:absolute;width:4px;height:4px;background:var(--gold);border-radius:50%;opacity:0;animation:twinkle var(--dur,4s) var(--delay,0s) infinite}
@keyframes twinkle{0%,100%{opacity:0;transform:scale(0)}50%{opacity:1;transform:scale(1)}}

.screen{position:fixed;inset:0;z-index:1;display:none;flex-direction:column;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
.screen.active{display:flex}

.corgi-wrap{position:relative;display:inline-block}
.corgi-wrap svg,.corgi-wrap img{filter:drop-shadow(0 5px 15px rgba(251,191,36,0.3))}
.corgi-bounce{animation:corgiBounce 0.6s ease}
@keyframes corgiBounce{0%{transform:translateY(0)}30%{transform:translateY(-20px) rotate(-5deg)}60%{transform:translateY(-5px) rotate(3deg)}100%{transform:translateY(0) rotate(0)}}
.corgi-happy{animation:corgiHappy 0.8s ease}
@keyframes corgiHappy{0%{transform:rotate(0)}20%{transform:rotate(-10deg) scale(1.1)}40%{transform:rotate(10deg) scale(1.1)}60%{transform:rotate(-5deg)}80%{transform:rotate(5deg)}100%{transform:rotate(0)}}
.corgi-sad{animation:corgiSad 0.6s ease}
@keyframes corgiSad{0%{transform:translateY(0)}50%{transform:translateY(5px) scale(0.95)}100%{transform:translateY(0) scale(1)}}
.corgi-run{animation:corgiRun 0.4s ease infinite alternate}
@keyframes corgiRun{0%{transform:translateX(0) scaleX(1)}100%{transform:translateX(8px) scaleX(0.95)}}
.corgi-sleep{animation:corgiSleep 2s ease infinite}
@keyframes corgiSleep{0%,100%{transform:scale(1)}50%{transform:scale(1.03)}}
.corgi-spin{animation:corgiSpin 0.8s ease}
@keyframes corgiSpin{0%{transform:rotate(0) scale(1)}50%{transform:rotate(180deg) scale(1.2)}100%{transform:rotate(360deg) scale(1)}}

.speech-bubble{
  position:relative;background:rgba(255,255,255,0.12);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);
  border:1px solid rgba(255,255,255,0.15);border-radius:20px;padding:12px 18px;
  font-size:15px;font-weight:700;max-width:260px;text-align:center;
  animation:bubblePop 0.4s ease;margin:0 auto;
}
.speech-bubble::after{
  content:'';position:absolute;bottom:-10px;left:50%;transform:translateX(-50%);
  border:10px solid transparent;border-top-color:rgba(255,255,255,0.12);border-bottom:0;
}
@keyframes bubblePop{0%{opacity:0;transform:scale(0.5) translateY(10px)}100%{opacity:1;transform:scale(1) translateY(0)}}

#splash{justify-content:center;align-items:center;text-align:center;padding:30px;gap:8px;background:radial-gradient(ellipse at center,#2d1b69 0%,#1a1040 100%)}
.splash-scene{position:relative;margin-bottom:10px}
.splash-title{font-family:'Baloo 2',cursive;font-size:34px;font-weight:800;background:linear-gradient(135deg,var(--pink),var(--purple),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.splash-name{font-family:'Baloo 2',cursive;font-size:22px;color:var(--peach);margin-top:-4px}
.splash-sub{font-size:15px;color:var(--dim);margin:4px 0 20px}
.btn-play{background:linear-gradient(135deg,var(--pink),var(--purple));border:none;border-radius:60px;padding:16px 50px;font-size:20px;font-weight:800;color:#fff;cursor:pointer;font-family:'Baloo 2',cursive;box-shadow:0 8px 30px rgba(255,107,157,0.4);animation:pulse 2s ease-in-out infinite;position:relative;overflow:hidden}
.btn-play::after{content:'';position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:linear-gradient(45deg,transparent 40%,rgba(255,255,255,0.2) 50%,transparent 60%);animation:shimmer 2.5s infinite}
@keyframes shimmer{0%{transform:translateX(-100%)}100%{transform:translateX(100%)}}
@keyframes pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.05)}}
.floating-stars{position:absolute;inset:0;pointer-events:none}
.fstar{position:absolute;font-size:20px;animation:floatStar var(--dur,5s) var(--del,0s) infinite ease-in-out}
@keyframes floatStar{0%,100%{transform:translateY(0) rotate(0);opacity:0.4}50%{transform:translateY(-20px) rotate(180deg);opacity:1}}
@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}

.top-bar{display:flex;align-items:center;justify-content:space-between;padding:10px 16px;background:rgba(0,0,0,0.25);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);flex-shrink:0;z-index:10}
.stat-pill{display:flex;align-items:center;gap:5px;background:rgba(255,255,255,0.08);border-radius:30px;padding:5px 12px;font-weight:700;font-size:14px}
.stat-pill .ic{font-size:16px}
.player-row{display:flex;align-items:center;gap:8px}
.avatar-mini{width:36px;height:36px;border-radius:50%;overflow:hidden;box-shadow:0 0 12px rgba(255,107,157,0.4);background:linear-gradient(135deg,var(--pink),var(--purple));display:flex;align-items:center;justify-content:center}
.avatar-mini svg{width:28px;height:28px}
.lv-badge{font-size:11px;font-weight:800;color:var(--gold);background:rgba(251,191,36,0.15);border-radius:8px;padding:2px 7px}
.xp-mini{width:70px;height:5px;background:rgba(255,255,255,0.1);border-radius:3px;overflow:hidden}
.xp-mini .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width 0.5s}

#map{padding-bottom:90px}
.map-header{text-align:center;padding:16px 20px 6px;flex-shrink:0}
.map-header h2{font-family:'Baloo 2',cursive;font-size:22px;color:var(--peach)}
.corgi-map{text-align:center;padding:4px 0}
.skill-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;padding:10px 16px}
.skill-card{background:var(--card);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1.5px solid rgba(255,255,255,0.08);border-radius:18px;padding:16px 12px;text-align:center;cursor:pointer;transition:all 0.3s;position:relative;overflow:hidden}
.skill-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,var(--cc,rgba(255,107,157,0.15)),transparent);opacity:0.6}
.skill-card:active{transform:scale(0.94)}
.skill-card .em{font-size:38px;position:relative;z-index:1}
.skill-card .nm{font-family:'Baloo 2',cursive;font-size:14px;font-weight:700;margin-top:6px;position:relative;z-index:1}
.skill-card .prog{font-size:11px;font-weight:800;color:var(--gold);position:relative;z-index:1;margin-top:2px}
.skill-card .pbar{width:80%;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;margin:6px auto 0;overflow:hidden;position:relative;z-index:1}
.skill-card .pbar .fill{height:100%;border-radius:2px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width 0.5s}
.skill-card.mastered{border-color:var(--gold);box-shadow:0 0 20px rgba(251,191,36,0.2)}
.skill-card.mastered::after{content:'⭐';position:absolute;top:8px;right:8px;font-size:16px;z-index:2}

#game{align-items:center}
.game-area{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:16px;width:100%;max-width:560px;position:relative}
.game-info{display:flex;gap:12px;margin-bottom:12px;flex-shrink:0;flex-wrap:wrap;justify-content:center}
.g-stat{background:rgba(255,255,255,0.08);border-radius:12px;padding:6px 14px;text-align:center}
.g-stat .lb{font-size:10px;color:var(--dim)}
.g-stat .vl{font-size:18px;font-weight:800}

.corgi-game{position:fixed;bottom:80px;right:16px;z-index:50;transition:all 0.3s;cursor:pointer}
.corgi-game:active{transform:scale(1.2)}

.question-card{background:rgba(255,255,255,0.06);backdrop-filter:blur(15px);-webkit-backdrop-filter:blur(15px);border:1.5px solid rgba(255,255,255,0.1);border-radius:22px;padding:24px 20px;text-align:center;width:100%;animation:slideUp 0.4s ease;position:relative}
@keyframes slideUp{from{opacity:0;transform:translateY(30px)}to{opacity:1;transform:translateY(0)}}
.q-text{font-family:'Baloo 2',cursive;font-size:32px;font-weight:800;margin-bottom:6px;color:#fff;text-shadow:0 2px 15px rgba(255,107,157,0.3)}
.q-hint{font-size:13px;color:var(--dim);margin-bottom:18px}
.answers-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;width:100%}
.ans-btn{background:rgba(255,255,255,0.07);border:2px solid rgba(255,255,255,0.1);border-radius:16px;padding:16px 10px;font-size:22px;font-weight:800;color:#fff;font-family:'Baloo 2',cursive;cursor:pointer;transition:all 0.2s;position:relative;overflow:hidden}
.ans-btn:active{transform:scale(0.94)}
.ans-btn.correct{background:rgba(52,211,153,0.25)!important;border-color:var(--mint)!important;animation:correctPop 0.5s ease}
.ans-btn.wrong{background:rgba(251,113,133,0.25)!important;border-color:var(--coral)!important;animation:shake 0.4s ease}
@keyframes correctPop{0%{transform:scale(1)}30%{transform:scale(1.1)}100%{transform:scale(1)}}
@keyframes shake{0%,100%{transform:translateX(0)}25%{transform:translateX(-8px)}75%{transform:translateX(8px)}}

.timer-bar{width:100%;height:7px;background:rgba(255,255,255,0.08);border-radius:4px;margin-bottom:12px;overflow:hidden}
.timer-bar .fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--mint),var(--gold),var(--coral));transition:width 0.1s linear}

.encourage-overlay{position:fixed;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;z-index:200;pointer-events:none;animation:encourageFade 1.8s ease forwards}
@keyframes encourageFade{0%{opacity:0}10%{opacity:1}70%{opacity:1}100%{opacity:0}}
.encourage-text{font-family:'Baloo 2',cursive;font-size:42px;font-weight:800;background:linear-gradient(135deg,var(--gold),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent;animation:encourageBounce 0.6s ease}
@keyframes encourageBounce{0%{transform:scale(0) rotate(-10deg)}50%{transform:scale(1.2) rotate(5deg)}100%{transform:scale(1) rotate(0)}}
.encourage-sub{font-size:18px;color:var(--peach);margin-top:4px;animation:encourageBounce 0.6s 0.1s ease both}

.combo-display{position:fixed;top:70px;left:50%;transform:translateX(-50%);z-index:100;font-family:'Baloo 2',cursive;font-size:20px;font-weight:800;color:var(--gold);text-shadow:0 0 20px rgba(251,191,36,0.5);opacity:0;transition:all 0.3s;pointer-events:none}
.combo-display.show{opacity:1;animation:comboShake 0.3s ease}
@keyframes comboShake{0%{transform:translateX(-50%) scale(1)}50%{transform:translateX(-50%) scale(1.3)}100%{transform:translateX(-50%) scale(1)}}

#result{justify-content:center;align-items:center;text-align:center;padding:24px}
.result-scene{margin-bottom:12px}
.result-title{font-family:'Baloo 2',cursive;font-size:32px;font-weight:800;background:linear-gradient(135deg,var(--pink),var(--gold));-webkit-background-clip:text;-webkit-text-fill-color:transparent}
.result-stars{font-size:44px;margin:8px 0}
.result-stats{display:flex;gap:16px;margin:16px 0;justify-content:center;flex-wrap:wrap}
.r-stat{background:rgba(255,255,255,0.07);border-radius:14px;padding:12px 20px;text-align:center}
.r-stat .num{font-size:28px;font-weight:800;color:var(--gold)}
.r-stat .lbl{font-size:11px;color:var(--dim);margin-top:2px}
.btn-group{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;margin-top:12px}
.btn-sec{background:rgba(255,255,255,0.1);border:1px solid rgba(255,255,255,0.15);border-radius:14px;padding:12px 24px;font-size:15px;font-weight:700;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer}
.btn-pri{background:linear-gradient(135deg,var(--pink),var(--purple));border:none;border-radius:14px;padding:12px 24px;font-size:15px;font-weight:800;color:#fff;font-family:'Nunito',sans-serif;cursor:pointer;box-shadow:0 4px 20px rgba(255,107,157,0.4)}

.bottom-nav{position:fixed;bottom:0;left:0;right:0;display:flex;justify-content:space-around;background:rgba(0,0,0,0.4);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-top:1px solid rgba(255,255,255,0.06);padding:6px 0 max(6px,env(safe-area-inset-bottom));z-index:100}
.nav-item{display:flex;flex-direction:column;align-items:center;padding:5px 14px;cursor:pointer;opacity:0.45;transition:all 0.2s}
.nav-item.active{opacity:1}
.nav-item .ic{font-size:22px}
.nav-item .lb{font-size:9px;font-weight:700;margin-top:1px}

#daily{padding:0 16px 100px}
.daily-hero{text-align:center;padding:20px 0;flex-shrink:0}
.daily-hero h2{font-family:'Baloo 2',cursive;font-size:22px;color:var(--coral)}
.mission-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:14px 16px;display:flex;align-items:center;gap:12px;margin-bottom:10px;cursor:pointer;transition:all 0.2s}
.mission-card:active{transform:scale(0.98)}
.mission-card .em{font-size:32px}
.mission-card .info{flex:1}
.mission-card .tt{font-weight:700;font-size:14px}
.mission-card .ds{font-size:11px;color:var(--dim)}
.mission-card .rw{background:rgba(251,191,36,0.15);border-radius:8px;padding:3px 8px;font-size:11px;font-weight:700;color:var(--gold)}
.m-prog{width:100%;height:5px;background:rgba(255,255,255,0.1);border-radius:3px;margin-top:6px;overflow:hidden}
.m-prog .fill{height:100%;border-radius:3px;background:linear-gradient(90deg,var(--mint),var(--gold))}
.mission-card.done{border-color:var(--mint)}
.mission-card.done .tt::after{content:' ✅'}

#profile{padding:0 16px 100px}
.profile-hero{text-align:center;padding:24px 0 16px;flex-shrink:0}
.profile-avatar-big{width:90px;height:90px;margin:0 auto 10px;position:relative}
.profile-name{font-family:'Baloo 2',cursive;font-size:24px;color:var(--peach)}
.profile-lv{color:var(--gold);font-weight:700;font-size:13px}
.xp-bar-full{width:100%;max-width:280px;height:8px;background:rgba(255,255,255,0.1);border-radius:4px;overflow:hidden;margin:8px auto 0}
.xp-bar-full .fill{height:100%;border-radius:4px;background:linear-gradient(90deg,var(--pink),var(--gold));transition:width 0.5s}
.streak-card{background:linear-gradient(135deg,rgba(255,107,157,0.2),rgba(251,191,36,0.1));border:1px solid rgba(255,107,157,0.3);border-radius:18px;padding:18px;text-align:center;margin-top:16px}
.streak-num{font-size:44px;font-weight:900;color:var(--coral)}
.streak-lbl{font-size:13px;color:var(--dim)}
.ach-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-top:16px}
.ach{background:rgba(255,255,255,0.06);border-radius:12px;padding:10px;text-align:center;font-size:28px}
.ach.locked{opacity:0.25;filter:grayscale(1)}
.ach .anm{font-size:8px;font-weight:700;margin-top:3px}
.back-btn{background:rgba(255,255,255,0.1);border:none;border-radius:10px;padding:7px 14px;color:#fff;font-size:13px;font-weight:700;cursor:pointer;font-family:'Nunito',sans-serif}

.confetti-box{position:fixed;inset:0;pointer-events:none;z-index:9999}
.conf{position:absolute;animation:confFall var(--dur,3s) var(--del,0s) linear forwards}
@keyframes confFall{0%{transform:translateY(-10vh) rotate(0);opacity:1}100%{transform:translateY(110vh) rotate(720deg);opacity:0}}

.hearts{display:flex;gap:4px}
.heart{font-size:20px;transition:all 0.3s}
.heart.lost{opacity:0.2;transform:scale(0.8);filter:grayscale(1)}

.corgi-tap-effect{position:fixed;pointer-events:none;z-index:300;font-size:20px;animation:tapFloat 1s ease forwards}
@keyframes tapFloat{0%{opacity:1;transform:translateY(0) scale(1)}100%{opacity:0;transform:translateY(-60px) scale(1.5)}}

.paw-trail{position:fixed;pointer-events:none;z-index:0;font-size:14px;opacity:0;animation:pawFade 2s ease forwards}
@keyframes pawFade{0%{opacity:0.6;transform:scale(0.5) rotate(var(--rot,0deg))}50%{opacity:0.3}100%{opacity:0;transform:scale(1) rotate(var(--rot,0deg))}}

#loginUser:focus,#loginPass:focus{border-color:var(--pink);box-shadow:0 0 15px rgba(255,107,157,0.3)}
#loginUser::placeholder,#loginPass::placeholder{color:rgba(255,255,255,0.3)}

.wheel-outer{position:relative;width:280px;height:280px;margin:0 auto}
.wheel-pointer{position:absolute;top:-16px;left:50%;transform:translateX(-50%);z-index:10;font-size:30px;color:var(--gold);filter:drop-shadow(0 2px 8px rgba(251,191,36,0.7));line-height:1}
.wheel-spin{width:100%;height:100%;border-radius:50%;position:relative;border:5px solid var(--gold);box-shadow:0 0 40px rgba(251,191,36,0.35),0 0 80px rgba(255,107,157,0.15),inset 0 0 20px rgba(0,0,0,0.2);overflow:hidden}
.wheel-center-dot{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;background:linear-gradient(135deg,var(--bg),var(--bg2));border:3px solid var(--gold);border-radius:50%;z-index:5;display:flex;align-items:center;justify-content:center;font-size:22px;box-shadow:0 0 15px rgba(251,191,36,0.5)}
.spin-glow{animation:spinGlow 2s ease-in-out infinite}
@keyframes spinGlow{0%,100%{box-shadow:0 0 40px rgba(251,191,36,0.35),0 0 80px rgba(255,107,157,0.15)}50%{box-shadow:0 0 60px rgba(251,191,36,0.5),0 0 100px rgba(255,107,157,0.25)}}
.prize-card{background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:12px;padding:10px;text-align:center;font-size:11px}
.prize-card .pem{font-size:24px}
.prize-card .pnm{font-weight:700;margin-top:2px;font-size:10px}
.prize-card .pvl{color:var(--gold);font-weight:800;font-size:10px}
.level-complete-banner{background:linear-gradient(135deg,rgba(251,191,36,0.2),rgba(255,107,157,0.2));border:2px solid var(--gold);border-radius:20px;padding:20px;text-align:center;animation:bannerPop 0.6s ease}
@keyframes bannerPop{0%{opacity:0;transform:scale(0.5)}60%{transform:scale(1.05)}100%{opacity:1;transform:scale(1)}}
`

const gameHTML = `
<!-- SPARKLE PARTICLES -->
<div class="sparkles" id="sparkles"></div>

<!-- COMBO DISPLAY -->
<div class="combo-display" id="comboDisplay"></div>

<!-- ==================== SPLASH ==================== -->
<div id="splash" class="screen active">
  <div class="floating-stars" id="floatingStars"></div>
  <div class="splash-scene" id="splashScene"></div>
  <div class="splash-title">Vương Quốc Toán Học</div>
  <div class="splash-name">✨ Uyển Nhi & Corgi ✨</div>
  <div class="splash-sub">Cùng bạn Corgi béo ú chinh phục Toán lớp 3!</div>

  <!-- Login form (shown first) -->
  <div id="loginBox" style="margin:0 auto 16px;width:100%;max-width:280px">
    <input id="loginUser" type="text" placeholder="Tên đăng nhập" autocomplete="username"
      style="width:100%;padding:12px 16px;border-radius:14px;border:1.5px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:#fff;font-size:16px;font-family:'Nunito',sans-serif;font-weight:600;text-align:center;margin-bottom:8px;outline:none" />
    <input id="loginPass" type="password" placeholder="Mật khẩu" autocomplete="current-password"
      style="width:100%;padding:12px 16px;border-radius:14px;border:1.5px solid rgba(255,255,255,0.15);background:rgba(255,255,255,0.08);color:#fff;font-size:16px;font-family:'Nunito',sans-serif;font-weight:600;text-align:center;margin-bottom:8px;outline:none"
      onkeydown="if(event.key==='Enter')doLogin()" />
    <div id="loginError" style="color:var(--coral);font-size:13px;margin-bottom:8px;display:none">Sai tên hoặc mật khẩu!</div>
    <button class="btn-play" onclick="doLogin()" style="width:100%">🔑 Đăng nhập</button>
  </div>

  <!-- Play button (shown after login) -->
  <button id="btnPlay" class="btn-play" onclick="startGame()" style="display:none">🐾 Chơi nào!</button>
  <div id="loggedInAs" style="display:none;font-size:12px;color:var(--dim);margin-top:8px"></div>
</div>

<!-- ==================== MAP ==================== -->
<div id="map" class="screen">
  <div class="top-bar">
    <div class="player-row">
      <div class="avatar-mini" id="avatarMini"></div>
      <div>
        <div class="lv-badge" id="lvBadge">Lv.1</div>
        <div class="xp-mini"><div class="fill" id="xpMini" style="width:0%"></div></div>
      </div>
    </div>
    <div style="display:flex;gap:6px">
      <div class="stat-pill"><span class="ic">⭐</span><span id="starC">0</span></div>
      <div class="stat-pill"><span class="ic">💎</span><span id="gemC">0</span></div>
      <div class="stat-pill"><span class="ic">🪙</span><span id="xuC">0</span></div>
      <div class="stat-pill"><span class="ic">🔥</span><span id="streakC">0</span></div>
    </div>
  </div>
  <div class="map-header">
    <h2>🗺️ Chọn vùng đất nào, Uyển Nhi?</h2>
  </div>
  <div class="corgi-map" id="corgiMap"></div>
  <div class="skill-grid" id="skillGrid"></div>
</div>

<!-- ==================== GAME ==================== -->
<div id="game" class="screen">
  <div class="top-bar">
    <button class="back-btn" onclick="exitGame()">← Về</button>
    <div class="hearts" id="heartsDisplay"></div>
    <div class="stat-pill"><span class="ic">✅</span><span id="correctC">0</span>/<span id="totalQ">10</span></div>
  </div>
  <div class="game-area" id="gameArea"></div>
  <div class="corgi-game" id="corgiGame" onclick="tapCorgi()"></div>
</div>

<!-- ==================== RESULT ==================== -->
<div id="result" class="screen">
  <div class="result-scene" id="resultScene"></div>
  <div class="result-title" id="resultTitle">Giỏi lắm!</div>
  <div class="result-stars" id="resultStars">⭐⭐⭐</div>
  <div id="resultSpeech"></div>
  <div class="result-stats">
    <div class="r-stat"><div class="num" id="rCorrect">0</div><div class="lbl">Đúng</div></div>
    <div class="r-stat"><div class="num" id="rAcc">0%</div><div class="lbl">Chính xác</div></div>
    <div class="r-stat"><div class="num" id="rXP">+0</div><div class="lbl">XP</div></div>
    <div class="r-stat"><div class="num" id="rGem">+0</div><div class="lbl">💎</div></div>
    <div class="r-stat"><div class="num" id="rXu" style="color:var(--mint)">+0</div><div class="lbl">🪙 Xu</div></div>
  </div>
  <div class="btn-group">
    <button class="btn-sec" onclick="backToMap()">🗺️ Bản đồ</button>
    <button class="btn-pri" onclick="replaySkill()">🔄 Chơi lại</button>
  </div>
</div>

<!-- ==================== DAILY ==================== -->
<div id="daily" class="screen">
  <div class="top-bar">
    <div class="player-row">
      <div class="avatar-mini" id="avatarMini2"></div>
      <div><div class="lv-badge" id="lvBadge2">Lv.1</div></div>
    </div>
    <div style="display:flex;gap:6px">
      <div class="stat-pill"><span class="ic">⭐</span><span id="starC2">0</span></div>
      <div class="stat-pill"><span class="ic">💎</span><span id="gemC2">0</span></div>
      <div class="stat-pill"><span class="ic">🪙</span><span id="xuC2">0</span></div>
    </div>
  </div>
  <div class="daily-hero">
    <h2>🎯 Nhiệm Vụ Hôm Nay</h2>
    <p style="color:var(--dim);font-size:13px">Hoàn thành để nhận quà nè Uyển Nhi!</p>
  </div>
  <div id="dailyMissions"></div>
</div>

<!-- ==================== PROFILE ==================== -->
<div id="profile" class="screen">
  <div class="top-bar">
    <span style="font-weight:700">👤 Uyển Nhi</span>
    <button class="back-btn" onclick="resetProgress()">🔄 Reset</button>
  </div>
  <div class="profile-hero">
    <div class="profile-avatar-big" id="profileAvatar"></div>
    <div class="profile-name">Uyển Nhi</div>
    <div class="profile-lv" id="profileLv">Level 1 — Tân binh</div>
    <div class="xp-bar-full"><div class="fill" id="xpFull" style="width:0%"></div></div>
    <div style="font-size:11px;color:var(--dim);margin-top:4px"><span id="xpCur">0</span>/<span id="xpNeed">100</span> XP</div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:16px">
    <div class="streak-card" style="margin-top:0">
      <div class="streak-num" id="profStreak">0</div>
      <div class="streak-lbl">ngày chơi liên tục 🔥</div>
    </div>
    <div class="streak-card" style="margin-top:0;background:linear-gradient(135deg,rgba(52,211,153,0.2),rgba(251,191,36,0.1));border-color:var(--mint)">
      <div class="streak-num" id="profXu" style="color:var(--mint)">0</div>
      <div class="streak-lbl">🪙 Xu tích lũy</div>
      <div id="profXuValue" style="font-size:11px;color:var(--gold);margin-top:4px"></div>
    </div>
  </div>
  <h3 style="margin-top:20px;font-family:'Baloo 2',cursive;font-size:18px">🏆 Thành Tựu</h3>
  <div class="ach-grid" id="achGrid"></div>
  <h3 style="margin-top:20px;font-family:'Baloo 2',cursive;font-size:18px">🎁 Phần Thưởng Đã Nhận</h3>
  <div id="prizeHistory" style="margin-top:8px"></div>
</div>

<!-- ==================== SPIN WHEEL ==================== -->
<div id="spinWheel" class="screen" style="justify-content:center;align-items:center;text-align:center;padding:20px;gap:8px">
  <div style="font-family:'Baloo 2',cursive;font-size:28px;background:linear-gradient(135deg,var(--gold),var(--pink));-webkit-background-clip:text;-webkit-text-fill-color:transparent">🎰 VÒNG XOAY MAY MẮN</div>
  <div style="color:var(--dim);font-size:13px;margin-bottom:8px">Hoàn thành <span id="spinLevelText" style="color:var(--gold);font-weight:800">Level 1</span> tất cả 12 môn!</div>
  <div class="wheel-outer">
    <div class="wheel-pointer">▼</div>
    <div class="wheel-spin spin-glow" id="wheelInner"></div>
    <div class="wheel-center-dot">🐾</div>
  </div>
  <div style="margin-top:14px">
    <button id="spinBtn" class="btn-play" style="font-size:20px;padding:14px 44px">🎰 QUAY THƯỞNG!</button>
  </div>
  <div id="spinResultBox" style="display:none;background:rgba(255,255,255,0.08);border:1.5px solid rgba(255,255,255,0.15);border-radius:20px;padding:20px;margin-top:10px;width:100%;max-width:320px"></div>
</div>

<!-- BOTTOM NAV -->
<div class="bottom-nav" id="bottomNav" style="display:none">
  <div class="nav-item active" onclick="switchTab('map')"><span class="ic">🗺️</span><span class="lb">Bản đồ</span></div>
  <div class="nav-item" onclick="switchTab('daily')"><span class="ic">🎯</span><span class="lb">Nhiệm vụ</span></div>
  <div class="nav-item" onclick="switchTab('profile')"><span class="ic">👤</span><span class="lb">Hồ sơ</span></div>
</div>

<!-- CONFETTI -->
<div class="confetti-box" id="confetti"></div>
`
