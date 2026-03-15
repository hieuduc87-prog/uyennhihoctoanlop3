'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense, useState } from 'react'
import { GRADE_REGISTRY } from '@/lib/grade-registry'

function LoginContent() {
  const router = useRouter()
  const params = useSearchParams()
  const urlError = params.get('error')
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [childName, setChildName] = useState('')
  const [gender, setGender] = useState<'girl' | 'boy'>('girl')
  const [pet, setPet] = useState<'corgi' | 'cat' | 'trex' | 'dragon'>('corgi')
  const [grade, setGrade] = useState('lop1')
  const [error, setError] = useState(urlError ? 'Đăng nhập thất bại. Thử lại nhé!' : '')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!username.trim() || !password) { setError('Nhập đầy đủ tên đăng nhập và mật khẩu nhé!'); return }
    setLoading(true); setError(''); setSuccess('')
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'login', username: username.trim().toLowerCase(), password })
      })
      const data = await r.json()
      if (!r.ok) {
        setError(data.error || 'Sai tên đăng nhập hoặc mật khẩu!')
        setLoading(false)
        return
      }
      const user = data.user
      if (!user || !user.username) {
        setError('Lỗi đăng nhập. Thử lại nhé!')
        setLoading(false)
        return
      }
      // Restore profile + lastGrade from user data
      const existingProfile = (() => { try { return JSON.parse(localStorage.getItem('player_profile') || '{}') } catch { return {} } })()
      // grade can be string ID (pre_4, lop1) or legacy number (1-5)
      const gradeId = user.grade
        ? (typeof user.grade === 'number' ? 'lop' + user.grade : user.grade)
        : existingProfile.lastGrade
      const profile = { name: user.display_name, gender: user.gender, avatar: user.gender === 'girl' ? 'nhinhi' : 'anan', pet: user.pet, lastGrade: gradeId || existingProfile.lastGrade }
      localStorage.setItem('player_profile', JSON.stringify(profile))
      localStorage.setItem('voicon_user', user.username)
      document.cookie = 'guest_mode=0; path=/; max-age=0'
      document.cookie = 'logged_in=1; path=/; max-age=31536000'
      router.push(gradeId ? '/' + gradeId : '/')
    } catch {
      setError('Lỗi kết nối. Thử lại nhé!')
      setLoading(false)
    }
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!childName.trim()) { setError('Nhập tên bé nhé!'); return }
    if (!username.trim()) { setError('Nhập tên đăng nhập nhé!'); return }
    if (username.trim().length < 3) { setError('Tên đăng nhập cần ít nhất 3 ký tự!'); return }
    if (/[^a-zA-Z0-9_]/.test(username.trim())) { setError('Tên đăng nhập chỉ gồm chữ, số và dấu _'); return }
    if (!password || password.length < 6) { setError('Mật khẩu cần ít nhất 6 ký tự!'); return }
    setLoading(true); setError(''); setSuccess('')
    try {
      const r = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'register',
          username: username.trim().toLowerCase(),
          password,
          display_name: childName.trim(),
          gender,
          pet,
          grade,
          email: email.trim() || undefined
        })
      })
      const data = await r.json()
      if (!r.ok) {
        setError(data.error || 'Lỗi đăng ký. Thử lại nhé!')
        setLoading(false)
        return
      }
      const user = data.user
      if (!user || !user.username) {
        setError('Lỗi tạo tài khoản. Thử lại nhé!')
        setLoading(false)
        return
      }
      // grade is now a string ID (pre_4, pre_5, lop1-5)
      const userGrade = user.grade || grade || 'lop1'
      const gradeId = typeof userGrade === 'number' ? 'lop' + userGrade : userGrade
      const profile = { name: user.display_name || childName.trim(), gender: user.gender || gender, avatar: (user.gender || gender) === 'girl' ? 'nhinhi' : 'anan', pet: user.pet || pet, lastGrade: gradeId }
      localStorage.setItem('player_profile', JSON.stringify(profile))
      localStorage.setItem('voicon_user', user.username)
      document.cookie = 'guest_mode=0; path=/; max-age=0'
      document.cookie = 'logged_in=1; path=/; max-age=31536000'
      setSuccess('Đăng ký thành công! Đang vào game...')
      router.push('/' + gradeId)
    } catch {
      setError('Lỗi kết nối. Thử lại nhé!')
      setLoading(false)
    }
  }

  const handleGuest = () => {
    document.cookie = 'logged_in=0; path=/; max-age=0'
    document.cookie = 'guest_mode=1; path=/; max-age=31536000'
    router.push('/')
  }

  const avatarSrc = gender === 'girl' ? '/characters/girl_level_1.svg' : '/characters/boy_level_1.svg'
  const petSrc = `/pets/${pet}_level_1.svg`

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: loginCSS }} />
      <div className="login-page">
        <div className="login-bg"></div>
        <div className="login-sparkles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="login-sparkle" style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              '--dur': `${2 + Math.random() * 3}s`,
              '--delay': `${Math.random() * 3}s`,
              background: ['#ff5a9e','#ffc233','#b44dff','#3dc2ff','#2ddba6'][i % 5],
            } as React.CSSProperties} />
          ))}
        </div>
        <div className="login-card">
          <div className="login-art">
            <img src={avatarSrc} width={75} height={100} alt="Avatar" style={{ objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.25))' }} />
            <img src={petSrc} width={70} height={70} alt="Pet" style={{ objectFit: 'contain', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,.25))' }} />
          </div>
          <h1 className="login-title">Vương Quốc Học Giỏi</h1>
          <p className="login-sub">Toán · Tiếng Việt · English</p>

          <div className="mode-tabs">
            <button className={`mode-tab ${mode === 'login' ? 'active' : ''}`} onClick={() => { setMode('login'); setError(''); setSuccess('') }}>
              🔑 Đăng nhập
            </button>
            <button className={`mode-tab ${mode === 'register' ? 'active' : ''}`} onClick={() => { setMode('register'); setError(''); setSuccess('') }}>
              ✨ Đăng ký
            </button>
          </div>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="login-form">
            {mode === 'register' && (
              <>
                <div className="input-wrap">
                  <span className="input-icon">🌟</span>
                  <input
                    type="text"
                    placeholder="Tên bé (VD: Bảo Ngọc)"
                    value={childName}
                    onChange={e => setChildName(e.target.value)}
                    className="login-input"
                    autoComplete="off"
                  />
                </div>
                <div className="pick-section">
                  <p className="pick-label">Chọn nhân vật:</p>
                  <div className="pick-row">
                    <button type="button" className={`pick-card ${gender === 'girl' ? 'selected' : ''}`} onClick={() => setGender('girl')}>
                      <img src="/characters/girl_level_1.svg" width={50} height={60} alt="Bé gái" style={{ objectFit: 'contain' }} />
                      <span>Uyển Nhi</span>
                    </button>
                    <button type="button" className={`pick-card ${gender === 'boy' ? 'selected' : ''}`} onClick={() => setGender('boy')}>
                      <img src="/characters/boy_level_1.svg" width={50} height={60} alt="Bé trai" style={{ objectFit: 'contain' }} />
                      <span>Bin</span>
                    </button>
                  </div>
                </div>
                <div className="pick-section">
                  <p className="pick-label">Chọn thú cưng:</p>
                  <div className="pick-row pet-row">
                    {([['corgi','Corgi Béo'],['cat','Mèo Bông'],['trex','Khủng Long'],['dragon','Rồng Con']] as const).map(([id, name]) => (
                      <button key={id} type="button" className={`pick-card ${pet === id ? 'selected' : ''}`} onClick={() => setPet(id as 'corgi'|'cat'|'trex'|'dragon')}>
                        <img src={`/pets/${id}_level_1.svg`} width={50} height={50} alt={name} style={{ objectFit: 'contain' }} />
                        <span>{name}</span>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="pick-section">
                  <p className="pick-label">Chọn lớp / độ tuổi:</p>
                  <div className="pick-row grade-row">
                    {[...GRADE_REGISTRY].sort((a, b) => a.order - b.order).map(g => (
                      <button key={g.id} type="button" className={`pick-card grade-pick ${grade === g.id ? 'selected' : ''}`} onClick={() => setGrade(g.id)} style={{ '--gc': g.color } as React.CSSProperties}>
                        <span className="grade-num">{g.emoji}</span>
                        <span>{g.name}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
            <div className="input-wrap">
              <span className="input-icon">👤</span>
              <input
                type="text"
                placeholder="Tên đăng nhập"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="login-input"
                autoComplete="username"
                autoCapitalize="off"
              />
            </div>
            <div className="input-wrap">
              <span className="input-icon">🔑</span>
              <input
                type="password"
                placeholder={mode === 'register' ? 'Mật khẩu (ít nhất 6 ký tự)' : 'Mật khẩu'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="login-input"
                autoComplete={mode === 'register' ? 'new-password' : 'current-password'}
              />
            </div>
            {mode === 'register' && (
              <div className="email-opt">
                <p className="email-label">📧 Email (không bắt buộc - dùng khi quên mật khẩu)</p>
                <div className="input-wrap">
                  <span className="input-icon">📧</span>
                  <input
                    type="email"
                    placeholder="Email khôi phục mật khẩu"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="login-input"
                    autoComplete="email"
                  />
                </div>
              </div>
            )}
            <button type="submit" className="btn-login" disabled={loading}>
              {loading
                ? '⏳ Đang xử lý...'
                : mode === 'login' ? '🚀 Đăng nhập' : '🎉 Tạo tài khoản'}
            </button>
          </form>

          <button onClick={handleGuest} className="btn-guest">
            🎮 Chơi không đăng nhập
          </button>
          <p className="login-hint">(Chơi khách: tiến trình chỉ lưu trên thiết bị)</p>
        </div>
        {/* Animated characters running across screen */}
        <div className="running-chars">
          <div className="run-char run-girl">
            <img src="/characters/girl_level_5.svg" width={60} height={80} alt="" />
          </div>
          <div className="run-char run-cat">
            <img src="/pets/cat_level_3.svg" width={50} height={50} alt="" />
          </div>
          <div className="run-char run-boy">
            <img src="/characters/boy_level_5.svg" width={60} height={80} alt="" />
          </div>
          <div className="run-char run-corgi">
            <img src="/pets/corgi_level_3.svg" width={50} height={50} alt="" />
          </div>
        </div>
        <div className="login-footer">
          <span className="login-star" style={{ '--d': '0s' } as React.CSSProperties}>⭐</span>
          <span className="login-star" style={{ '--d': '0.5s' } as React.CSSProperties}>🌟</span>
          <span className="login-star" style={{ '--d': '1s' } as React.CSSProperties}>✨</span>
        </div>
      </div>
    </>
  )
}

export default function LoginPage() {
  return (
    <Suspense>
      <LoginContent />
    </Suspense>
  )
}

const loginCSS = `
*{margin:0;padding:0;box-sizing:border-box;-webkit-tap-highlight-color:transparent}
@import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700;800&family=Nunito:wght@400;600;700;800;900&display=swap');
.login-page{
  min-height:100vh;min-height:100dvh;display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:24px;font-family:'Nunito',sans-serif;color:#fff;position:relative;overflow:hidden;
  background:#1b0a3c}
.login-bg{position:fixed;inset:0;z-index:0;
  background:
    radial-gradient(ellipse 120% 80% at 20% 100%,rgba(176,77,255,.35),transparent),
    radial-gradient(ellipse 100% 60% at 80% 0%,rgba(255,90,158,.25),transparent),
    radial-gradient(ellipse 80% 80% at 50% 50%,rgba(61,194,255,.1),transparent),
    linear-gradient(170deg,#1b0a3c 0%,#2d1463 35%,#3a1878 60%,#2a1260 100%)}
.login-sparkles{position:fixed;inset:0;pointer-events:none;z-index:1;overflow:hidden}
.login-sparkle{position:absolute;width:5px;height:5px;border-radius:50%;opacity:0;
  animation:lSparkle var(--dur,4s) var(--delay,0s) infinite}
@keyframes lSparkle{0%,100%{opacity:0;transform:scale(0)}40%{opacity:1;transform:scale(1.2)}60%{opacity:.8;transform:scale(1)}100%{opacity:0;transform:scale(0)}}
.login-card{
  position:relative;z-index:2;text-align:center;
  background:rgba(255,255,255,.08);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px);
  border:1.5px solid rgba(255,255,255,.12);border-radius:32px;
  padding:28px 24px 24px;max-width:420px;width:100%;max-height:90vh;overflow-y:auto;
  box-shadow:0 8px 0 rgba(0,0,0,.2),0 16px 48px rgba(0,0,0,.3),inset 0 2px 0 rgba(255,255,255,.2);
  animation:cardUp .6s cubic-bezier(.34,1.56,.64,1)}
.login-card::before{content:'';position:absolute;top:0;left:0;right:0;height:40%;
  background:linear-gradient(180deg,rgba(255,255,255,.06),transparent);border-radius:32px 32px 0 0;pointer-events:none}
@keyframes cardUp{0%{opacity:0;transform:translateY(40px) scale(.9)}100%{opacity:1;transform:translateY(0) scale(1)}}
.login-art{display:flex;align-items:flex-end;justify-content:center;gap:6px;margin-bottom:6px;
  animation:corgiFloat 3s ease-in-out infinite}
@keyframes corgiFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
.login-title{
  font-family:'Baloo 2',cursive;font-size:24px;font-weight:800;line-height:1.1;
  background:linear-gradient(135deg,#ff5a9e,#ffc233,#b44dff,#3dc2ff);background-size:300% 300%;
  -webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:gradShift 4s ease infinite;
  filter:drop-shadow(0 3px 8px rgba(255,90,158,.4))}
@keyframes gradShift{0%,100%{background-position:0% 50%}50%{background-position:100% 50%}}
.login-sub{font-size:12px;color:rgba(255,255,255,.4);margin:4px 0 12px;letter-spacing:.5px;font-weight:700}
.mode-tabs{display:flex;gap:0;margin-bottom:12px;background:rgba(0,0,0,.2);border-radius:16px;padding:3px;
  border:1px solid rgba(255,255,255,.06)}
.mode-tab{flex:1;padding:8px 12px;border:none;border-radius:14px;font-size:13px;font-weight:800;
  color:rgba(255,255,255,.4);cursor:pointer;font-family:'Nunito',sans-serif;
  background:transparent;transition:all .25s}
.mode-tab.active{color:#fff;background:rgba(255,255,255,.12);
  box-shadow:0 3px 0 rgba(0,0,0,.2),inset 0 1px 0 rgba(255,255,255,.15)}
.mode-tab:active{transform:scale(.97)}
.login-error{
  background:rgba(255,107,122,.15);border:1px solid rgba(255,107,122,.3);
  border-radius:14px;padding:8px 16px;margin-bottom:10px;font-size:13px;font-weight:700;
  color:#ff8fa3;box-shadow:0 3px 0 rgba(0,0,0,.1)}
.login-success{
  background:rgba(45,219,166,.15);border:1px solid rgba(45,219,166,.3);
  border-radius:14px;padding:8px 16px;margin-bottom:10px;font-size:13px;font-weight:700;
  color:#2ddba6;box-shadow:0 3px 0 rgba(0,0,0,.1)}
.login-form{display:flex;flex-direction:column;gap:10px;width:100%;margin-bottom:10px}
.input-wrap{position:relative;display:flex;align-items:center}
.input-icon{position:absolute;left:14px;font-size:16px;z-index:1}
.login-input{
  width:100%;padding:12px 14px 12px 42px;border-radius:16px;border:1.5px solid rgba(255,255,255,.15);
  background:rgba(255,255,255,.08);color:#fff;font-size:15px;font-weight:700;
  font-family:'Nunito',sans-serif;outline:none;
  box-shadow:inset 0 2px 4px rgba(0,0,0,.15);transition:border-color .2s}
.login-input:focus{border-color:rgba(255,90,158,.5);background:rgba(255,255,255,.12)}
.login-input::placeholder{color:rgba(255,255,255,.3);font-weight:600}
.pick-section{margin:2px 0}
.pick-label{font-size:12px;font-weight:800;color:rgba(255,255,255,.5);margin-bottom:6px;text-align:left}
.pick-row{display:flex;gap:10px;justify-content:center}
.pick-card{display:flex;flex-direction:column;align-items:center;gap:4px;
  background:rgba(255,255,255,.06);border:2px solid rgba(255,255,255,.1);border-radius:18px;
  padding:10px 18px;cursor:pointer;transition:all .2s;color:rgba(255,255,255,.5);
  font-size:12px;font-weight:800;font-family:'Nunito',sans-serif}
.pick-card:hover{background:rgba(255,255,255,.1)}
.pick-card.selected{border-color:var(--gc,#ff5a9e);background:rgba(255,90,158,.15);color:#fff;
  box-shadow:0 0 16px rgba(255,90,158,.25)}
.pick-card img{filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}
.pet-row{flex-wrap:wrap;gap:8px}
.grade-row{flex-wrap:wrap;gap:8px}
.grade-pick{min-width:auto;padding:8px 12px}
.grade-num{font-size:18px}
.email-opt{margin-top:2px}
.email-label{font-size:11px;color:rgba(255,255,255,.35);font-weight:700;margin-bottom:6px;text-align:left}
.btn-login{
  background:linear-gradient(135deg,#ff5a9e,#e040a0,#b44dff);border:none;border-radius:50px;
  padding:14px 32px;font-size:16px;font-weight:800;color:#fff;cursor:pointer;
  font-family:'Baloo 2',cursive;letter-spacing:.3px;
  box-shadow:0 5px 0 rgba(140,20,80,.5),0 8px 24px rgba(255,90,158,.3),inset 0 2px 0 rgba(255,255,255,.2);
  transition:all .1s;position:relative;overflow:hidden}
.btn-login:active{transform:translateY(4px);box-shadow:0 1px 0 rgba(140,20,80,.5),0 3px 8px rgba(255,90,158,.2)}
.btn-login:disabled{opacity:.7;cursor:not-allowed}
.btn-login::before{content:'';position:absolute;top:0;left:-50%;width:50%;height:100%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.15),transparent);animation:btnShine 3s infinite}
@keyframes btnShine{0%{left:-50%}100%{left:150%}}
.btn-guest{
  background:linear-gradient(135deg,rgba(255,90,158,.15),rgba(180,77,255,.15));
  border:1.5px solid rgba(255,255,255,.12);border-radius:50px;padding:10px 24px;
  font-size:13px;font-weight:800;color:rgba(255,255,255,.7);cursor:pointer;margin:0 auto;
  font-family:'Nunito',sans-serif;display:block;
  box-shadow:0 3px 0 rgba(0,0,0,.15);transition:all .1s}
.btn-guest:active{transform:translateY(2px);box-shadow:0 1px 0 rgba(0,0,0,.15)}
.login-hint{color:rgba(255,255,255,.25);font-size:10px;margin-top:6px;font-weight:600}
.login-footer{display:flex;gap:16px;margin-top:20px;position:relative;z-index:2}
.login-star{font-size:24px;animation:starBob 2s var(--d,0s) ease-in-out infinite;
  filter:drop-shadow(0 2px 6px rgba(255,194,51,.5))}
@keyframes starBob{0%,100%{transform:translateY(0) scale(1)}50%{transform:translateY(-8px) scale(1.15)}}
/* Running characters */
.running-chars{position:fixed;bottom:0;left:0;right:0;height:120px;pointer-events:none;z-index:1;overflow:hidden}
.run-char{position:absolute;bottom:8px;animation-timing-function:linear;animation-iteration-count:infinite}
.run-char img{object-fit:contain;filter:drop-shadow(0 4px 8px rgba(0,0,0,.35))}

.run-girl{animation:runRight 12s 0s linear infinite}
.run-girl img{animation:charBounce .4s ease-in-out infinite}

.run-cat{animation:runRight 9s 3s linear infinite;bottom:12px}
.run-cat img{animation:charBounce .3s ease-in-out infinite}

.run-boy{animation:runLeft 14s 1.5s linear infinite}
.run-boy img{transform:scaleX(-1);animation:charBounce .45s ease-in-out infinite}

.run-corgi{animation:runLeft 10s 5s linear infinite;bottom:10px}
.run-corgi img{transform:scaleX(-1);animation:charBounce .35s ease-in-out infinite}

@keyframes runRight{
  0%{left:-80px;opacity:0}
  3%{opacity:1}
  92%{opacity:1}
  100%{left:calc(100% + 80px);opacity:0}
}
@keyframes runLeft{
  0%{right:-80px;left:auto;opacity:0}
  3%{opacity:1}
  92%{opacity:1}
  100%{right:calc(100% + 80px);left:auto;opacity:0}
}
@keyframes charBounce{
  0%,100%{transform:translateY(0)}
  50%{transform:translateY(-12px)}
}
.run-boy img{animation:charBounceMirror .45s ease-in-out infinite}
.run-corgi img{animation:charBounceMirror .35s ease-in-out infinite}
@keyframes charBounceMirror{
  0%,100%{transform:scaleX(-1) translateY(0)}
  50%{transform:scaleX(-1) translateY(-12px)}
}

@media(max-width:380px){
  .login-card{padding:22px 18px 20px;border-radius:24px}
  .login-title{font-size:20px}
  .login-art img{width:50px!important;height:auto!important}
  .btn-login{padding:12px 24px;font-size:15px}
  .login-input{padding:10px 12px 10px 38px;font-size:14px}
  .mode-tab{font-size:12px;padding:7px 8px}
  .pick-card{padding:8px 14px}
  .pick-card img{width:40px!important;height:auto!important}
}
/* ========== TABLET (iPad portrait 768px+) ========== */
@media(min-width:768px){
  .login-card{max-width:480px;padding:36px 32px 32px;border-radius:36px}
  .login-title{font-size:30px}
  .login-sub{font-size:14px;margin:6px 0 16px}
  .login-art img{width:90px!important;height:auto!important}
  .login-input{padding:14px 16px 14px 46px;font-size:16px;border-radius:18px}
  .input-icon{font-size:18px;left:16px}
  .mode-tab{font-size:15px;padding:10px 16px}
  .mode-tabs{border-radius:18px;padding:4px;margin-bottom:16px}
  .btn-login{padding:16px 40px;font-size:18px;border-radius:56px}
  .btn-guest{padding:12px 28px;font-size:14px}
  .pick-card{padding:14px 22px;border-radius:20px}
  .pick-card img{width:60px!important;height:auto!important}
  .pick-card span{font-size:13px}
  .pick-label{font-size:13px}
  .login-hint{font-size:12px}
  .login-footer{margin-top:28px}
  .login-star{font-size:30px}
  .running-chars{height:140px}
  .run-char img{width:auto!important}
  .run-girl img,.run-boy img{height:100px!important}
  .run-cat img,.run-corgi img{height:65px!important}
}
/* ========== DESKTOP (1024px+) ========== */
@media(min-width:1024px){
  .login-card{max-width:520px;padding:40px 36px 36px;border-radius:40px}
  .login-title{font-size:34px}
  .login-sub{font-size:15px}
  .login-art img{width:100px!important}
  .login-input{padding:16px 18px 16px 50px;font-size:17px}
  .btn-login{padding:18px 48px;font-size:19px}
  .running-chars{height:160px}
  .run-girl img,.run-boy img{height:120px!important}
  .run-cat img,.run-corgi img{height:80px!important}
}
/* ========== PHONE LANDSCAPE ========== */
@media(max-height:500px) and (orientation:landscape){
  .login-page{padding:12px;justify-content:flex-start;overflow-y:auto}
  .login-card{max-width:480px;padding:16px 20px 16px;border-radius:22px;max-height:none;
    box-shadow:0 4px 0 rgba(0,0,0,.2),0 8px 24px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.2)}
  .login-art{margin-bottom:2px}
  .login-art img{width:40px!important;height:55px!important}
  .login-title{font-size:18px}
  .login-sub{font-size:10px;margin:2px 0 6px}
  .mode-tabs{margin-bottom:6px}
  .mode-tab{padding:6px 8px;font-size:11px}
  .login-form{gap:6px;margin-bottom:6px}
  .login-input{padding:8px 10px 8px 36px;font-size:13px;border-radius:12px}
  .input-icon{font-size:14px;left:12px}
  .btn-login{padding:10px 24px;font-size:14px;border-radius:40px}
  .btn-guest{padding:6px 16px;font-size:11px}
  .pick-section{margin:0}
  .pick-label{font-size:10px;margin-bottom:3px}
  .pick-row{gap:6px}
  .pick-card{padding:6px 10px;border-radius:12px}
  .pick-card img{width:30px!important;height:35px!important}
  .pick-card span{font-size:10px}
  .email-opt{margin-top:0}
  .email-label{font-size:9px;margin-bottom:3px}
  .grade-row{gap:4px}
  .grade-pick{padding:5px 8px}
  .grade-num{font-size:14px}
  .grade-pick span:last-child{font-size:9px}
  .login-hint{font-size:9px;margin-top:3px}
  .login-footer{margin-top:8px}
  .login-star{font-size:18px}
  .running-chars{display:none}
}
/* ========== TABLET LANDSCAPE (iPad ngang) ========== */
@media(min-width:768px) and (orientation:landscape){
  .login-page{overflow-y:auto}
  .login-card{max-width:500px;max-height:none}
  .running-chars{height:100px}
  .run-girl img,.run-boy img{height:80px!important}
  .run-cat img,.run-corgi img{height:55px!important}
}
/* ========== REDUCED MOTION ========== */
@media(prefers-reduced-motion:reduce){
  *,*::before,*::after{animation-duration:0.01ms!important;animation-iteration-count:1!important;transition-duration:0.01ms!important}
  .login-sparkle,.run-char{display:none!important}
}
`
