'use client'

import { useEffect, useRef, useState } from 'react'
import { createClient, isSupabaseConfigured } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import AuthButton from './auth-button'
import { loadCloud, saveCloud, type PlayerProgress } from '@/lib/game-data'

export default function Game() {
  const [loaded, setLoaded] = useState(false)
  const userRef = useRef<User | null>(null)

  useEffect(() => {
    if (loaded) return
    setLoaded(true)

    if (isSupabaseConfigured()) {
      const supabase = createClient()
      supabase.auth.getUser().then(async ({ data }) => {
        userRef.current = data.user
        if (data.user) {
          const cloudData = await loadCloud(data.user.id)
          if (cloudData) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const w = window as any
            if (typeof w.__setGameData === 'function') {
              w.__setGameData(cloudData)
            } else {
              w.__cloudData = cloudData
            }
          }
        }
      })
    }

    // Inject game script
    const script = document.createElement('script')
    script.textContent = getGameScript()
    document.body.appendChild(script)

    // Listen for save events from game
    const handleSave = ((e: CustomEvent) => {
      const progress = e.detail as PlayerProgress
      if (userRef.current) {
        saveCloud(userRef.current.id, progress)
      }
    }) as EventListener

    window.addEventListener('game-save', handleSave)

    return () => {
      window.removeEventListener('game-save', handleSave)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const w = window as any
      if (w.__gameTimerInt) clearInterval(w.__gameTimerInt)
    }
  }, [loaded])

  return (
    <div id="auth-button-container" style={{
      position: 'fixed',
      top: 10,
      right: 10,
      zIndex: 1000,
    }}>
      <AuthButton />
    </div>
  )
}

function getGameScript(): string {
  return `
// ========================================================
// UYỂN NHI & CORGI — GAME ENGINE (React-integrated)
// ========================================================

function corgiSVG(size, mood, showTail) {
  if (size === undefined) size = 120;
  if (mood === undefined) mood = 'happy';
  if (showTail === undefined) showTail = true;
  var w = size, h = size;
  var eyes = {
    happy: '<ellipse cx="'+w*0.38+'" cy="'+w*0.38+'" rx="'+w*0.045+'" ry="'+w*0.055+'" fill="#2d1b69"/><ellipse cx="'+w*0.62+'" cy="'+w*0.38+'" rx="'+w*0.045+'" ry="'+w*0.055+'" fill="#2d1b69"/><circle cx="'+w*0.39+'" cy="'+w*0.37+'" r="'+w*0.015+'" fill="#fff"/><circle cx="'+w*0.63+'" cy="'+w*0.37+'" r="'+w*0.015+'" fill="#fff"/>',
    excited: '<ellipse cx="'+w*0.38+'" cy="'+w*0.38+'" rx="'+w*0.05+'" ry="'+w*0.06+'" fill="#2d1b69"/><ellipse cx="'+w*0.62+'" cy="'+w*0.38+'" rx="'+w*0.05+'" ry="'+w*0.06+'" fill="#2d1b69"/><circle cx="'+w*0.395+'" cy="'+w*0.365+'" r="'+w*0.02+'" fill="#fff"/><circle cx="'+w*0.635+'" cy="'+w*0.365+'" r="'+w*0.02+'" fill="#fff"/><path d="M'+w*0.35+' '+w*0.33+' Q'+w*0.38+' '+w*0.3+' '+w*0.41+' '+w*0.33+'" stroke="#2d1b69" stroke-width="1.5" fill="none"/><path d="M'+w*0.59+' '+w*0.33+' Q'+w*0.62+' '+w*0.3+' '+w*0.65+' '+w*0.33+'" stroke="#2d1b69" stroke-width="1.5" fill="none"/>',
    sad: '<path d="M'+w*0.35+' '+w*0.4+' Q'+w*0.38+' '+w*0.35+' '+w*0.41+' '+w*0.4+'" stroke="#2d1b69" stroke-width="'+w*0.02+'" fill="none" stroke-linecap="round"/><path d="M'+w*0.59+' '+w*0.4+' Q'+w*0.62+' '+w*0.35+' '+w*0.65+' '+w*0.4+'" stroke="#2d1b69" stroke-width="'+w*0.02+'" fill="none" stroke-linecap="round"/>',
    sleep: '<path d="M'+w*0.35+' '+w*0.39+' H'+w*0.42+'" stroke="#2d1b69" stroke-width="'+w*0.018+'" stroke-linecap="round"/><path d="M'+w*0.58+' '+w*0.39+' H'+w*0.65+'" stroke="#2d1b69" stroke-width="'+w*0.018+'" stroke-linecap="round"/>',
    love: '<text x="'+w*0.35+'" y="'+w*0.41+'" font-size="'+w*0.1+'" text-anchor="middle">\\u2665</text><text x="'+w*0.65+'" y="'+w*0.41+'" font-size="'+w*0.1+'" text-anchor="middle">\\u2665</text>',
  };
  var mouths = {
    happy: '<path d="M'+w*0.42+' '+w*0.48+' Q'+w*0.5+' '+w*0.56+' '+w*0.58+' '+w*0.48+'" stroke="#2d1b69" stroke-width="'+w*0.015+'" fill="none" stroke-linecap="round"/>',
    excited: '<ellipse cx="'+w*0.5+'" cy="'+w*0.5+'" rx="'+w*0.06+'" ry="'+w*0.045+'" fill="#2d1b69"/><ellipse cx="'+w*0.5+'" cy="'+w*0.49+'" rx="'+w*0.04+'" ry="'+w*0.025+'" fill="#ff6b9d"/>',
    sad: '<path d="M'+w*0.43+' '+w*0.52+' Q'+w*0.5+' '+w*0.47+' '+w*0.57+' '+w*0.52+'" stroke="#2d1b69" stroke-width="'+w*0.015+'" fill="none" stroke-linecap="round"/>',
    sleep: '<path d="M'+w*0.45+' '+w*0.5+' Q'+w*0.5+' '+w*0.52+' '+w*0.55+' '+w*0.5+'" stroke="#2d1b69" stroke-width="'+w*0.012+'" fill="none" stroke-linecap="round"/>',
    love: '<path d="M'+w*0.42+' '+w*0.48+' Q'+w*0.5+' '+w*0.57+' '+w*0.58+' '+w*0.48+'" stroke="#2d1b69" stroke-width="'+w*0.015+'" fill="#fda4af" stroke-linecap="round"/>',
  };
  var m = mood in eyes ? mood : 'happy';
  var tail = showTail ? '<ellipse cx="'+w*0.82+'" cy="'+w*0.55+'" rx="'+w*0.08+'" ry="'+w*0.04+'" fill="#f59e0b" transform="rotate(-30 '+w*0.82+' '+w*0.55+')"><animateTransform attributeName="transform" type="rotate" values="-30 '+w*0.82+' '+w*0.55+';-10 '+w*0.82+' '+w*0.55+';-30 '+w*0.82+' '+w*0.55+'" dur="0.4s" repeatCount="indefinite"/></ellipse>' : '';
  var blush = (m==='happy'||m==='excited'||m==='love') ? '<ellipse cx="'+w*0.3+'" cy="'+w*0.46+'" rx="'+w*0.045+'" ry="'+w*0.025+'" fill="#fda4af" opacity="0.6"/><ellipse cx="'+w*0.7+'" cy="'+w*0.46+'" rx="'+w*0.045+'" ry="'+w*0.025+'" fill="#fda4af" opacity="0.6"/>' : '';
  var sleepZ = m==='sleep' ? '<text x="'+w*0.72+'" y="'+w*0.28+'" font-size="'+w*0.1+'" fill="#c084fc" font-weight="800" opacity="0.7">z</text><text x="'+w*0.8+'" y="'+w*0.18+'" font-size="'+w*0.13+'" fill="#c084fc" font-weight="800" opacity="0.5">z</text><text x="'+w*0.87+'" y="'+w*0.1+'" font-size="'+w*0.08+'" fill="#c084fc" font-weight="800" opacity="0.3">z</text>' : '';
  return '<svg viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'" xmlns="http://www.w3.org/2000/svg"><ellipse cx="'+w*0.28+'" cy="'+w*0.25+'" rx="'+w*0.1+'" ry="'+w*0.13+'" fill="#d97706" transform="rotate(-15 '+w*0.28+' '+w*0.25+')"/><ellipse cx="'+w*0.28+'" cy="'+w*0.25+'" rx="'+w*0.065+'" ry="'+w*0.09+'" fill="#fbbf24" transform="rotate(-15 '+w*0.28+' '+w*0.25+')"/><ellipse cx="'+w*0.72+'" cy="'+w*0.25+'" rx="'+w*0.1+'" ry="'+w*0.13+'" fill="#d97706" transform="rotate(15 '+w*0.72+' '+w*0.25+')"/><ellipse cx="'+w*0.72+'" cy="'+w*0.25+'" rx="'+w*0.065+'" ry="'+w*0.09+'" fill="#fbbf24" transform="rotate(15 '+w*0.72+' '+w*0.25+')"/><ellipse cx="'+w*0.5+'" cy="'+w*0.65+'" rx="'+w*0.35+'" ry="'+w*0.25+'" fill="#f59e0b"/><ellipse cx="'+w*0.5+'" cy="'+w*0.68+'" rx="'+w*0.28+'" ry="'+w*0.18+'" fill="#fde68a"/><ellipse cx="'+w*0.3+'" cy="'+w*0.85+'" rx="'+w*0.07+'" ry="'+w*0.06+'" fill="#d97706"/><ellipse cx="'+w*0.7+'" cy="'+w*0.85+'" rx="'+w*0.07+'" ry="'+w*0.06+'" fill="#d97706"/><ellipse cx="'+w*0.38+'" cy="'+w*0.87+'" rx="'+w*0.06+'" ry="'+w*0.05+'" fill="#d97706"/><ellipse cx="'+w*0.62+'" cy="'+w*0.87+'" rx="'+w*0.06+'" ry="'+w*0.05+'" fill="#d97706"/>'+tail+'<ellipse cx="'+w*0.5+'" cy="'+w*0.4+'" rx="'+w*0.26+'" ry="'+w*0.22+'" fill="#f59e0b"/><path d="M'+w*0.35+' '+w*0.38+' Q'+w*0.5+' '+w*0.3+' '+w*0.65+' '+w*0.38+' Q'+w*0.65+' '+w*0.55+' '+w*0.5+' '+w*0.58+' Q'+w*0.35+' '+w*0.55+' '+w*0.35+' '+w*0.38+'Z" fill="#fff"/><ellipse cx="'+w*0.5+'" cy="'+w*0.44+'" rx="'+w*0.035+'" ry="'+w*0.025+'" fill="#2d1b69"/>'+eyes[m]+mouths[m]+blush+sleepZ+'</svg>';
}

function chibiSVG(size) {
  if (size === undefined) size = 100;
  var w=size;
  return '<svg viewBox="0 0 '+w+' '+w+'" width="'+w+'" height="'+w+'" xmlns="http://www.w3.org/2000/svg"><ellipse cx="'+w*0.5+'" cy="'+w*0.35+'" rx="'+w*0.28+'" ry="'+w*0.28+'" fill="#2d1b69"/><ellipse cx="'+w*0.3+'" cy="'+w*0.5+'" rx="'+w*0.1+'" ry="'+w*0.18+'" fill="#2d1b69"/><ellipse cx="'+w*0.7+'" cy="'+w*0.5+'" rx="'+w*0.1+'" ry="'+w*0.18+'" fill="#2d1b69"/><ellipse cx="'+w*0.5+'" cy="'+w*0.4+'" rx="'+w*0.2+'" ry="'+w*0.2+'" fill="#fde68a"/><ellipse cx="'+w*0.43+'" cy="'+w*0.38+'" rx="'+w*0.035+'" ry="'+w*0.045+'" fill="#2d1b69"/><ellipse cx="'+w*0.57+'" cy="'+w*0.38+'" rx="'+w*0.035+'" ry="'+w*0.045+'" fill="#2d1b69"/><circle cx="'+w*0.44+'" cy="'+w*0.37+'" r="'+w*0.012+'" fill="#fff"/><circle cx="'+w*0.58+'" cy="'+w*0.37+'" r="'+w*0.012+'" fill="#fff"/><ellipse cx="'+w*0.37+'" cy="'+w*0.43+'" rx="'+w*0.03+'" ry="'+w*0.015+'" fill="#fda4af" opacity="0.7"/><ellipse cx="'+w*0.63+'" cy="'+w*0.43+'" rx="'+w*0.03+'" ry="'+w*0.015+'" fill="#fda4af" opacity="0.7"/><path d="M'+w*0.46+' '+w*0.46+' Q'+w*0.5+' '+w*0.5+' '+w*0.54+' '+w*0.46+'" stroke="#2d1b69" stroke-width="1.5" fill="none" stroke-linecap="round"/><circle cx="'+w*0.32+'" cy="'+w*0.28+'" r="'+w*0.035+'" fill="#ff6b9d"/><circle cx="'+w*0.68+'" cy="'+w*0.28+'" r="'+w*0.035+'" fill="#c084fc"/><rect x="'+w*0.38+'" y="'+w*0.58+'" width="'+w*0.24+'" height="'+w*0.2+'" rx="'+w*0.05+'" fill="#ff6b9d"/><path d="M'+w*0.35+' '+w*0.72+' Q'+w*0.5+' '+w*0.8+' '+w*0.65+' '+w*0.72+'" fill="#c084fc"/><rect x="'+w*0.42+'" y="'+w*0.78+'" width="'+w*0.05+'" height="'+w*0.12+'" rx="'+w*0.02+'" fill="#fde68a"/><rect x="'+w*0.53+'" y="'+w*0.78+'" width="'+w*0.05+'" height="'+w*0.12+'" rx="'+w*0.02+'" fill="#fde68a"/><ellipse cx="'+w*0.445+'" cy="'+w*0.92+'" rx="'+w*0.04+'" ry="'+w*0.025+'" fill="#ff6b9d"/><ellipse cx="'+w*0.555+'" cy="'+w*0.92+'" rx="'+w*0.04+'" ry="'+w*0.025+'" fill="#ff6b9d"/><line x1="'+w*0.7+'" y1="'+w*0.5+'" x2="'+w*0.8+'" y2="'+w*0.35+'" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/><text x="'+w*0.81+'" y="'+w*0.34+'" font-size="'+w*0.08+'">\\u2B50</text></svg>';
}

var CORRECT_MESSAGES = [
  {text:'Gi\\u1ecfi qu\\u00e1!', sub:'Uy\\u1ec3n Nhi si\\u00eau \\u0111\\u1ec9nh! \\ud83c\\udf1f'},
  {text:'\\u0110\\u00fang r\\u1ed3i!', sub:'Corgi m\\u1eebng qu\\u00e1! \\ud83d\\udc3e'},
  {text:'Xu\\u1ea5t s\\u1eafc!', sub:'Con gi\\u1ecfi l\\u1eafm! \\u2728'},
  {text:'Tuy\\u1ec7t v\\u1eddi!', sub:'Corgi nh\\u1ea3y m\\u00faa n\\u00e8! \\ud83d\\udc83'},
  {text:'COMBO!', sub:'Kh\\u00f4ng ai c\\u1ea3n \\u0111\\u01b0\\u1ee3c! \\ud83d\\udd25'},
  {text:'Wow!', sub:'Thi\\u00ean t\\u00e0i nh\\u00ed! \\ud83e\\udde0'},
  {text:'Perfect!', sub:'Corgi t\\u1ef1 h\\u00e0o v\\u1ec1 Nhi! \\ud83d\\udc15'},
  {text:'Hay qu\\u00e1!', sub:'Ti\\u1ebfp t\\u1ee5c n\\u00e0o! \\ud83d\\udcaa'},
  {text:'Amazing!', sub:'Ph\\u00f9 thu\\u1ef7 to\\u00e1n h\\u1ecdc! \\ud83e\\uddd9\\u200d\\u2640\\ufe0f'},
  {text:'Si\\u00eau sao!', sub:'Ng\\u00f4i sao s\\u00e1ng nh\\u1ea5t! \\u2b50'},
];
var WRONG_MESSAGES = [
  {text:'Oops!', sub:'Kh\\u00f4ng sao, th\\u1eed l\\u1ea1i nha! \\ud83d\\udc95'},
  {text:'Hmm...', sub:'Corgi tin Nhi l\\u00e0m \\u0111\\u01b0\\u1ee3c! \\ud83d\\udc3e'},
  {text:'G\\u1ea7n \\u0111\\u00fang!', sub:'C\\u1ed1 l\\u00ean Uy\\u1ec3n Nhi! \\ud83d\\udcaa'},
  {text:'\\u1ed0i!', sub:'Corgi \\u00f4m Nhi n\\u00e8! \\ud83e\\udd17'},
];
var CORGI_SPEECHES_MAP = [
  'Ch\\u1ecdn v\\u00f9ng n\\u00e0o \\u0111i Nhi \\u01a1i! \\ud83d\\udc3e',
  'H\\u00f4m nay m\\u00ecnh h\\u1ecdc g\\u00ec n\\u00e8? \\u2728',
  'Corgi \\u0111\\u00f3i b\\u1ee5ng qu\\u00e1... cho \\u0103n \\u0111i! \\ud83c\\udf56',
  'Nhi ch\\u01a1i gi\\u1ecfi l\\u1eafm h\\u00f4m qua! \\ud83c\\udf1f',
  'G\\u00e2u g\\u00e2u! M\\u00ecnh \\u0111i th\\u00f4i! \\ud83d\\udc15',
];
var CORGI_TAP_WORDS = ['G\\u00e2u!','Y\\u00eau Nhi!','\\ud83d\\udc3e','Hehe!','\\ud83d\\udc95','Woof!','\\ud83c\\udf1f','Ch\\u01a1i \\u0111i!','\\ud83d\\ude0d','Iu~'];

var SAVE_KEY = 'uynhi_corgi_math_v3';
var PD = loadData();

function defaultData(){return{level:1,xp:0,stars:0,gems:0,streak:0,lastPlayDate:null,sp:{},ach:{},daily:{date:null,missions:[]},totalCorrect:0,totalPlayed:0,combo:0,maxCombo:0,corgiMood:'happy',corgiTaps:0}}
function loadData(){
  if(window.__cloudData){var d=window.__cloudData;delete window.__cloudData;var pd=defaultData();pd.level=d.level;pd.xp=d.xp;pd.stars=d.stars;pd.gems=d.gems;pd.streak=d.streak;pd.lastPlayDate=d.last_play_date;pd.sp=d.skill_progress||{};pd.ach=d.achievements||{};pd.daily=d.daily||{date:null,missions:[]};pd.totalCorrect=d.total_correct;pd.totalPlayed=d.total_played;pd.maxCombo=d.max_combo;pd.corgiTaps=d.corgi_taps;return pd}
  try{var d=JSON.parse(localStorage.getItem(SAVE_KEY));if(d&&d.level)return d}catch(e){}return defaultData()
}
function saveData(){
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(PD))}catch(e){}
  try{window.dispatchEvent(new CustomEvent('game-save',{detail:{
    level:PD.level,xp:PD.xp,stars:PD.stars,gems:PD.gems,streak:PD.streak,
    last_play_date:PD.lastPlayDate,skill_progress:PD.sp,achievements:PD.ach,
    daily:PD.daily,total_correct:PD.totalCorrect,total_played:PD.totalPlayed,
    max_combo:PD.maxCombo,corgi_taps:PD.corgiTaps
  }}))}catch(e){}
}
window.__setGameData = function(d){
  PD.level=d.level;PD.xp=d.xp;PD.stars=d.stars;PD.gems=d.gems;PD.streak=d.streak;
  PD.lastPlayDate=d.last_play_date;PD.sp=d.skill_progress||{};PD.ach=d.achievements||{};
  PD.daily=d.daily||{date:null,missions:[]};PD.totalCorrect=d.total_correct;
  PD.totalPlayed=d.total_played;PD.maxCombo=d.max_combo;PD.corgiTaps=d.corgi_taps;
  try{localStorage.setItem(SAVE_KEY,JSON.stringify(PD))}catch(e){}
  updateUI();renderSkillGrid();
};
function resetProgress(){if(confirm('Xo\\u00e1 to\\u00e0n b\\u1ed9 ti\\u1ebfn tr\\u00ecnh?')){PD=defaultData();saveData();updateUI();renderSkillGrid()}}

var SKILLS=[
  {id:'addition',name:'Ph\\u00e9p C\\u1ed9ng',emoji:'\\u2795',color:'rgba(52,211,153,0.2)',gen:function(l){return genArith('+',l)}},
  {id:'subtraction',name:'Ph\\u00e9p Tr\\u1eeb',emoji:'\\u2796',color:'rgba(56,189,248,0.2)',gen:function(l){return genArith('-',l)}},
  {id:'multiply',name:'Ph\\u00e9p Nh\\u00e2n',emoji:'\\u2716\\ufe0f',color:'rgba(255,107,157,0.2)',gen:function(l){return genMult(l)}},
  {id:'divide',name:'Ph\\u00e9p Chia',emoji:'\\u2797',color:'rgba(192,132,252,0.2)',gen:function(l){return genDiv(l)}},
  {id:'mult_table',name:'B\\u1ea3ng C\\u1eedu Ch\\u01b0\\u01a1ng',emoji:'\\ud83d\\udcca',color:'rgba(251,191,36,0.2)',gen:function(l){return genMultT(l)}},
  {id:'expressions',name:'Bi\\u1ec3u Th\\u1ee9c',emoji:'\\ud83e\\uddee',color:'rgba(251,113,133,0.2)',gen:function(l){return genExpr(l)}},
  {id:'compare',name:'So S\\u00e1nh',emoji:'\\u2696\\ufe0f',color:'rgba(56,189,248,0.2)',gen:function(l){return genComp(l)}},
  {id:'word_problems',name:'To\\u00e1n \\u0110\\u1ed1',emoji:'\\ud83d\\udcdd',color:'rgba(251,191,36,0.2)',gen:function(l){return genWord(l)}},
  {id:'geometry',name:'H\\u00ecnh H\\u1ecdc',emoji:'\\ud83d\\udcd0',color:'rgba(52,211,153,0.2)',gen:function(l){return genGeo(l)}},
  {id:'measurement',name:'\\u0110o L\\u01b0\\u1eddng',emoji:'\\ud83d\\udccf',color:'rgba(192,132,252,0.2)',gen:function(l){return genMeasure(l)}},
  {id:'time',name:'Th\\u1eddi Gian',emoji:'\\u23f0',color:'rgba(251,191,36,0.2)',gen:function(l){return genTime(l)}},
  {id:'fractions',name:'Ph\\u00e2n S\\u1ed1',emoji:'\\ud83c\\udf55',color:'rgba(255,107,157,0.2)',gen:function(l){return genFrac(l)}},
];

function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function SH(a){for(var i=a.length-1;i>0;i--){var j=R(0,i);var t=a[i];a[i]=a[j];a[j]=t}return a}
function MQ(text,ans,hint,opts){
  ans=parseInt(ans);
  if(!opts){var s=[ans];while(s.length<4){var d=R(1,Math.max(5,Math.abs(Math.round(ans*0.3))));if(Math.random()>0.5)d=-d;var v=ans+d;if(v>=0&&v!==ans&&s.indexOf(v)===-1)s.push(v)}opts=SH(s)}
  return{text:text,answer:ans,hint:hint||'',options:opts}
}
function genArith(op,l){
  var rg=[[10,99],[50,499],[100,999],[500,4999],[1000,9999]];
  var pair=rg[Math.min(l-1,4)];var mn=pair[0],mx=pair[1];
  var a=R(mn,mx),b=R(mn,mx);
  if(op==='+')return MQ(a+' + '+b+' = ?',a+b,'T\\u00ednh t\\u1ed5ng');
  if(a<b){var t=a;a=b;b=t}return MQ(a+' \\u2212 '+b+' = ?',a-b,'T\\u00ednh hi\\u1ec7u')
}
function genMult(l){
  if(l<=2){var a=R(2,9),b=R(2,9);return MQ(a+' \\u00d7 '+b+' = ?',a*b,'B\\u1ea3ng nh\\u00e2n '+a)}
  if(l===3){var a=R(11,99),b=R(2,9);return MQ(a+' \\u00d7 '+b+' = ?',a*b,'Nh\\u00e2n 2 ch\\u1eef s\\u1ed1')}
  var a=R(100,999),b=R(2,9);return MQ(a+' \\u00d7 '+b+' = ?',a*b,'Nh\\u00e2n 3 ch\\u1eef s\\u1ed1')
}
function genDiv(l){
  if(l<=2){var b=R(2,9),a=R(2,9);return MQ((b*a)+' : '+b+' = ?',a,'Chia h\\u1ebft')}
  if(l===3){var b=R(2,9),a=R(10,99);return MQ((b*a)+' : '+b+' = ?',a,'Chia 2-3 ch\\u1eef s\\u1ed1')}
  var b=R(2,9),q=R(10,99),r=R(1,b-1);return MQ((b*q+r)+' : '+b+' = ? d\\u01b0 '+r,q,'T\\u00ecm th\\u01b0\\u01a1ng')
}
function genMultT(l){
  var ts=l<=2?[2,3,4,5]:l<=3?[2,3,4,5,6,7]:[2,3,4,5,6,7,8,9];
  var t=ts[R(0,ts.length-1)],n=R(1,10);
  return Math.random()>0.5?MQ(t+' \\u00d7 '+n+' = ?',t*n,'B\\u1ea3ng nh\\u00e2n '+t):MQ((t*n)+' : '+t+' = ?',n,'B\\u1ea3ng chia '+t)
}
function genExpr(l){
  if(l<=2){
    if(Math.random()>0.5){var b=R(2,5),c=R(2,5),a=R(1,20);return MQ(a+' + '+b+' \\u00d7 '+c+' = ?',a+b*c,'Nh\\u00e2n tr\\u01b0\\u1edbc, c\\u1ed9ng sau')}
    var a=R(2,5),b=R(2,5),c=R(1,a*b);return MQ(a+' \\u00d7 '+b+' \\u2212 '+c+' = ?',a*b-c,'Nh\\u00e2n tr\\u01b0\\u1edbc, tr\\u1eeb sau')
  }
  var a=R(2,10),b=R(2,10),c=R(2,5);
  return Math.random()>0.5?MQ('('+a+' + '+b+') \\u00d7 '+c+' = ?',(a+b)*c,'Ngo\\u1eb7c tr\\u01b0\\u1edbc'):MQ(a+' \\u00d7 '+c+' + '+b+' = ?',a*c+b,'Nh\\u00e2n tr\\u01b0\\u1edbc')
}
function genComp(l){
  var t=R(1,2);
  if(t===1){var s=R(2,9),times=R(2,5);return MQ((s*times)+' g\\u1ea5p m\\u1ea5y l\\u1ea7n '+s+'?',times,'Chia s\\u1ed1 l\\u1edbn cho s\\u1ed1 b\\u00e9')}
  var n=R(2,9),big=n*R(3,9);return MQ(big+' g\\u1ea5p '+n+' l\\u1ea7n s\\u1ed1 n\\u00e0o?',big/n,'L\\u1ea5y s\\u1ed1 l\\u1edbn chia s\\u1ed1 l\\u1ea7n')
}
function genWord(l){
  var tpl=[
    function(){var a=R(50,200),b=R(10,a-1);return MQ('Nhi c\\u00f3 '+a+' vi\\u00ean k\\u1eb9o \\ud83c\\udf6c\\nCho b\\u1ea1n '+b+' vi\\u00ean.\\nNhi c\\u00f2n bao nhi\\u00eau vi\\u00ean?',a-b,'Ph\\u00e9p tr\\u1eeb')},
    function(){var e=R(2,9),n=R(3,9);return MQ('M\\u1ed7i h\\u1ed9p c\\u00f3 '+e+' c\\u00e1i b\\u00e1nh \\ud83e\\uddc1\\n'+n+' h\\u1ed9p c\\u00f3 bao nhi\\u00eau c\\u00e1i?',e*n,'Ph\\u00e9p nh\\u00e2n')},
    function(){var g=R(2,6),t=g*R(3,9);return MQ('C\\u00f3 '+t+' quy\\u1ec3n v\\u1edf \\ud83d\\udcda\\nChia \\u0111\\u1ec1u cho '+g+' b\\u1ea1n.\\nM\\u1ed7i b\\u1ea1n \\u0111\\u01b0\\u1ee3c m\\u1ea5y quy\\u1ec3n?',t/g,'Ph\\u00e9p chia')},
    function(){var a=R(100,500),b=R(100,500);return MQ('Th\\u00f9ng 1: '+a+' kg g\\u1ea1o \\ud83c\\udf3e\\nTh\\u00f9ng 2: '+b+' kg g\\u1ea1o\\nC\\u1ea3 hai th\\u00f9ng c\\u00f3 bao nhi\\u00eau kg?',a+b,'Ph\\u00e9p c\\u1ed9ng')},
    function(){var age=R(5,10),x=R(2,5);return MQ('Nhi '+age+' tu\\u1ed5i \\ud83d\\udc67\\nTu\\u1ed5i m\\u1eb9 g\\u1ea5p '+x+' l\\u1ea7n tu\\u1ed5i Nhi.\\nM\\u1eb9 bao nhi\\u00eau tu\\u1ed5i?',age*x,'G\\u1ea5p m\\u1ea5y l\\u1ea7n')},
    function(){var w=R(3,12),l=R(3,12);return MQ('HCN d\\u00e0i '+l+'cm, r\\u1ed9ng '+w+'cm \\ud83d\\udcd0\\nChu vi = ? cm',(l+w)*2,'(d\\u00e0i+r\\u1ed9ng)\\u00d72')},
  ];
  return tpl[R(0,Math.min(l+1,tpl.length-1))]()
}
function genGeo(l){
  if(l<=2){
    if(Math.random()>0.5){var a=R(3,15);return MQ('H\\u00ecnh vu\\u00f4ng c\\u1ea1nh '+a+'cm\\nChu vi = ? cm',a*4,'C\\u1ea1nh \\u00d7 4')}
    var d=R(3,15),r=R(3,12);return MQ('HCN d\\u00e0i '+d+'cm, r\\u1ed9ng '+r+'cm\\nChu vi = ? cm',(d+r)*2,'(d\\u00e0i+r\\u1ed9ng)\\u00d72')
  }
  if(Math.random()>0.5){var a=R(2,12);return MQ('H\\u00ecnh vu\\u00f4ng c\\u1ea1nh '+a+'cm\\nDi\\u1ec7n t\\u00edch = ? cm\\u00b2',a*a,'C\\u1ea1nh \\u00d7 c\\u1ea1nh')}
  var d=R(3,12),r=R(2,10);return MQ('HCN d\\u00e0i '+d+'cm, r\\u1ed9ng '+r+'cm\\nDi\\u1ec7n t\\u00edch = ? cm\\u00b2',d*r,'D\\u00e0i \\u00d7 r\\u1ed9ng')
}
function genMeasure(l){
  var ts=[
    function(){var m=R(1,9);return MQ(m+' m = ? cm',m*100,'1m = 100cm')},
    function(){var k=R(1,5);return MQ(k+' km = ? m',k*1000,'1km = 1000m')},
    function(){var k=R(1,9);return MQ(k+' kg = ? g',k*1000,'1kg = 1000g')},
    function(){var l=R(1,9);return MQ(l+' l\\u00edt = ? ml',l*1000,'1l = 1000ml')},
    function(){var ns=[1000,2000,5000,10000,20000];var a=ns[R(0,4)],b=ns[R(0,4)];return MQ(a.toLocaleString()+'\\u0111 + '+b.toLocaleString()+'\\u0111 = ? \\u0111',a+b,'C\\u1ed9ng ti\\u1ec1n \\ud83d\\udcb0')},
  ];
  return ts[R(0,Math.min(l,ts.length-1))]()
}
function genTime(l){
  var h=R(1,12),m=R(0,11)*5;
  var addM=R(1,6)*5;
  var nh=h,nm=m+addM;if(nm>=60){nh=nh%12+1;nm-=60}
  return MQ(h+' gi\\u1edd '+(m<10?'0'+m:m)+' ph\\u00fat \\u23f0\\nTh\\u00eam '+addM+' ph\\u00fat = ? ph\\u00fat\\n(gi\\u1edd\\u00d760+ph\\u00fat)',nh*60+nm,'C\\u1ed9ng th\\u1eddi gian')
}
function genFrac(l){var d=R(2,9),t=d*R(2,9);return MQ('1/'+d+' c\\u1ee7a '+t+' = ?',t/d,t+' \\u00f7 '+d)}

var curSkill=null,curLv=1,questions=[],qIdx=0,lives=3,correct=0,combo=0,timerInt=null,timeLeft=0;
var TIME_Q=30,Q_COUNT=10;
window.__gameTimerInt = null;

function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  document.getElementById(id).classList.add('active');
  var nav=document.getElementById('bottomNav');
  nav.style.display=['map','daily','profile'].indexOf(id)>=0?'flex':'none';
  document.getElementById('corgiGame').style.display=id==='game'?'block':'none';
  if(id==='map')renderSkillGrid();
  if(id==='daily')renderDaily();
  if(id==='profile')renderProfile();
}
function switchTab(id){
  showScreen(id);
  var tabs=['map','daily','profile'];
  document.querySelectorAll('.nav-item').forEach(function(n,i){n.classList.toggle('active',tabs[i]===id)});
}
function startGame(){checkStreak();showScreen('map');document.getElementById('bottomNav').style.display='flex';renderSkillGrid();updateUI()}
function exitGame(){clearInterval(timerInt);showScreen('map')}

function checkStreak(){
  var today=new Date().toDateString();
  if(PD.lastPlayDate===today)return;
  var yday=new Date(Date.now()-86400000).toDateString();
  if(PD.lastPlayDate===yday)PD.streak++;
  else if(PD.lastPlayDate!==today)PD.streak=1;
  PD.lastPlayDate=today;saveData()
}

function updateUI(){
  var xpFor=PD.level*100,pct=Math.min(100,(PD.xp/xpFor)*100);
  ['','2'].forEach(function(s){
    var g=function(id){return document.getElementById(id+s)};
    if(g('lvBadge'))g('lvBadge').textContent='Lv.'+PD.level;
    if(g('starC'))g('starC').textContent=PD.stars;
    if(g('gemC'))g('gemC').textContent=PD.gems;
  });
  var sc=document.getElementById('streakC');if(sc)sc.textContent=PD.streak;
  var xm=document.getElementById('xpMini');if(xm)xm.style.width=pct+'%';
  ['avatarMini','avatarMini2'].forEach(function(id){
    var el=document.getElementById(id);if(el)el.innerHTML=corgiSVG(28,'happy',false);
  });
}

function renderSkillGrid(){
  var grid=document.getElementById('skillGrid');if(!grid)return;
  grid.innerHTML=SKILLS.map(function(sk){
    var p=PD.sp[sk.id]||{level:1,correct:0,total:0};
    var pct=p.total>0?Math.round(p.correct/Math.max(p.total,1)*100):0;
    var mst=p.level>=5&&pct>=80;
    var barW=Math.min(100,p.level/5*100);
    return '<div class="skill-card '+(mst?'mastered':'')+'" style="--cc:'+sk.color+'" onclick="startSkill(\\''+sk.id+'\\')"><div class="em">'+sk.emoji+'</div><div class="nm">'+sk.name+'</div><div class="prog">Lv.'+p.level+' \\u00b7 '+pct+'%</div><div class="pbar"><div class="fill" style="width:'+barW+'%"></div></div></div>';
  }).join('');
  var cm=document.getElementById('corgiMap');
  if(cm){var speech=CORGI_SPEECHES_MAP[R(0,CORGI_SPEECHES_MAP.length-1)];
  cm.innerHTML='<div class="speech-bubble" style="margin-bottom:-6px">'+speech+'</div><div class="corgi-wrap corgi-run" onclick="tapCorgiMap(this)" style="cursor:pointer">'+corgiSVG(90,'happy')+'</div>';}
  updateUI();
}

function startSkill(id){
  var sk=SKILLS.find(function(s){return s.id===id});if(!sk)return;
  curSkill=sk;
  var p=PD.sp[id]||{level:1,correct:0,total:0};curLv=p.level;
  questions=[];for(var i=0;i<Q_COUNT;i++)questions.push(sk.gen(curLv));
  qIdx=0;lives=3;correct=0;combo=0;
  showScreen('game');renderHearts();
  document.getElementById('correctC').textContent=0;
  document.getElementById('totalQ').textContent=Q_COUNT;
  document.getElementById('corgiGame').innerHTML=corgiSVG(60,'happy');
  document.getElementById('corgiGame').style.display='block';
  showQ();
}
function replaySkill(){if(curSkill)startSkill(curSkill.id)}
function renderHearts(){
  var h=document.getElementById('heartsDisplay');h.innerHTML='';
  for(var i=0;i<3;i++){var s=document.createElement('span');s.className='heart'+(i>=lives?' lost':'');s.textContent='\\u2764\\ufe0f';h.appendChild(s)}
}

function showQ(){
  if(qIdx>=Q_COUNT||lives<=0){endRound();return}
  var q=questions[qIdx];var area=document.getElementById('gameArea');
  timeLeft=TIME_Q;
  var fontSize=q.text.length>60?'18px':q.text.length>35?'24px':'32px';
  area.innerHTML='<div class="timer-bar"><div class="fill" id="timerF" style="width:100%"></div></div><div class="game-info"><div class="g-stat"><div class="lb">C\\u00e2u</div><div class="vl" style="color:var(--gold)">'+(qIdx+1)+'/'+Q_COUNT+'</div></div><div class="g-stat"><div class="lb">Level</div><div class="vl" style="color:var(--coral)">Lv.'+curLv+'</div></div><div class="g-stat"><div class="lb">Combo</div><div class="vl" style="color:var(--mint)">'+combo+'\\ud83d\\udd25</div></div></div><div class="question-card"><div class="q-text" style="font-size:'+fontSize+';white-space:pre-line">'+q.text+'</div><div class="q-hint">'+q.hint+'</div><div class="answers-grid">'+q.options.map(function(o){return '<button class="ans-btn" onclick="checkAns('+o+','+q.answer+',this)">'+o.toLocaleString()+'</button>'}).join('')+'</div></div>';
  clearInterval(timerInt);
  timerInt=setInterval(function(){timeLeft-=0.1;var f=document.getElementById('timerF');if(f)f.style.width=Math.max(0,(timeLeft/TIME_Q)*100)+'%';if(timeLeft<=0){clearInterval(timerInt);handleWrong();setTimeout(nextQ,1500)}},100);
  window.__gameTimerInt=timerInt;
}

function checkAns(sel,cor,btn){
  clearInterval(timerInt);
  document.querySelectorAll('.ans-btn').forEach(function(b){b.style.pointerEvents='none'});
  if(sel===cor){btn.classList.add('correct');handleCorrect()}
  else{btn.classList.add('wrong');document.querySelectorAll('.ans-btn').forEach(function(b){if(parseInt(b.textContent.replace(/,/g,''))===cor)b.classList.add('correct')});handleWrong()}
  setTimeout(nextQ,1400);
}

function handleCorrect(){
  correct++;combo++;if(combo>PD.maxCombo)PD.maxCombo=combo;PD.totalCorrect++;
  document.getElementById('correctC').textContent=correct;
  var cg=document.getElementById('corgiGame');
  cg.innerHTML=corgiSVG(60,combo>=3?'love':'excited');
  var svg=cg.querySelector('svg');
  if(svg){svg.style.animation='none';requestAnimationFrame(function(){svg.style.animation='';cg.classList.add(combo>=3?'corgi-spin':'corgi-bounce')})}
  setTimeout(function(){cg.classList.remove('corgi-spin','corgi-bounce')},800);
  showEncourage(true);
  if(combo>=2){var cd=document.getElementById('comboDisplay');cd.textContent=combo+'x COMBO \\ud83d\\udd25';cd.classList.remove('show');requestAnimationFrame(function(){cd.classList.add('show')});setTimeout(function(){cd.classList.remove('show')},1500)}
  spawnFloating('\\ud83d\\udc95',3);
}
function handleWrong(){
  lives--;combo=0;renderHearts();
  var cg=document.getElementById('corgiGame');cg.innerHTML=corgiSVG(60,'sad');
  cg.classList.add('corgi-sad');setTimeout(function(){cg.classList.remove('corgi-sad')},600);
  showEncourage(false);spawnFloating('\\ud83d\\udcaa',2);
}
function nextQ(){qIdx++;showQ()}

function showEncourage(isCorrect){
  var msgs=isCorrect?CORRECT_MESSAGES:WRONG_MESSAGES;var m=msgs[R(0,msgs.length-1)];
  var ov=document.createElement('div');ov.className='encourage-overlay';
  ov.innerHTML='<div class="encourage-text">'+m.text+'</div><div class="encourage-sub">'+m.sub+'</div>';
  document.body.appendChild(ov);setTimeout(function(){ov.remove()},1800);
}
function spawnFloating(emoji,count){
  for(var i=0;i<count;i++){(function(idx){var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=emoji;el.style.left=R(20,80)+'%';el.style.top=R(30,70)+'%';el.style.animationDelay=(idx*0.15)+'s';document.body.appendChild(el);setTimeout(function(){el.remove()},1200)})(i)}
}

function tapCorgi(){
  PD.corgiTaps++;var cg=document.getElementById('corgiGame');
  var moods=['excited','love','happy'];cg.innerHTML=corgiSVG(60,moods[R(0,2)]);
  cg.classList.add('corgi-bounce');setTimeout(function(){cg.classList.remove('corgi-bounce')},600);
  var w=CORGI_TAP_WORDS[R(0,CORGI_TAP_WORDS.length-1)];
  var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=w;el.style.right='20px';el.style.bottom='140px';document.body.appendChild(el);setTimeout(function(){el.remove()},1000);
  spawnPaw();saveData();
}
function tapCorgiMap(el){
  el.classList.remove('corgi-happy');requestAnimationFrame(function(){el.classList.add('corgi-happy')});
  setTimeout(function(){el.classList.remove('corgi-happy')},800);
  var w=CORGI_TAP_WORDS[R(0,CORGI_TAP_WORDS.length-1)];
  var f=document.createElement('div');f.className='corgi-tap-effect';f.textContent=w;f.style.left='50%';f.style.top='30%';f.style.transform='translateX(-50%)';document.body.appendChild(f);setTimeout(function(){f.remove()},1000);
}
function spawnPaw(){for(var i=0;i<3;i++){(function(idx){var p=document.createElement('div');p.className='paw-trail';p.textContent='\\ud83d\\udc3e';p.style.left=R(10,90)+'%';p.style.top=R(40,80)+'%';p.style.setProperty('--rot',R(-30,30)+'deg');p.style.animationDelay=(idx*0.2)+'s';document.body.appendChild(p);setTimeout(function(){p.remove()},2200)})(i)}}

function endRound(){
  clearInterval(timerInt);document.getElementById('corgiGame').style.display='none';
  var acc=Math.round(correct/Q_COUNT*100);
  var stars=acc>=90?3:acc>=70?2:acc>=50?1:0;
  var xpE=correct*10+stars*15;var gemE=stars>=2?R(3,8):stars>=1?R(1,3):0;
  PD.xp+=xpE;PD.stars+=stars;PD.gems+=gemE;PD.totalPlayed+=Q_COUNT;
  while(PD.xp>=PD.level*100){PD.xp-=PD.level*100;PD.level++}
  if(curSkill){var p=PD.sp[curSkill.id]||{level:1,correct:0,total:0};p.correct+=correct;p.total+=Q_COUNT;if(acc>=80&&p.level<5)p.level++;PD.sp[curSkill.id]=p}
  updateDailyProg(correct);saveData();showScreen('result');
  var mood=stars>=3?'love':stars>=2?'excited':stars>=1?'happy':'sad';
  var anim=stars>=2?'corgi-happy':'';
  document.getElementById('resultScene').innerHTML='<div class="corgi-wrap '+anim+'">'+corgiSVG(stars>=2?130:110,mood)+'</div>';
  document.getElementById('resultTitle').textContent=stars>=3?'TUY\\u1ec6T V\\u1edcI, Uy\\u1ec3n Nhi! \\ud83c\\udfc6':stars>=2?'Gi\\u1ecfi l\\u1eafm Nhi \\u01a1i! \\ud83c\\udf89':stars>=1?'C\\u1ed1 th\\u00eam ch\\u00fat n\\u1eefa nh\\u00e9! \\ud83d\\udcaa':'Corgi \\u00f4m Nhi, l\\u1ea7n sau c\\u1ed1 l\\u00ean! \\ud83e\\udd17';
  document.getElementById('resultStars').textContent='\\u2b50'.repeat(stars)+'\\u2606'.repeat(3-stars);
  var speeches3=['Nhi gi\\u1ecfi qu\\u00e1! Corgi t\\u1ef1 h\\u00e0o l\\u1eafm! \\ud83d\\udc3e\\ud83d\\udc95','Si\\u00eau \\u0111\\u1ec9nh! Cho Corgi \\u0103n th\\u01b0\\u1edfng \\u0111i! \\ud83c\\udf56\\u2728','Nhi l\\u00e0 thi\\u00ean t\\u00e0i to\\u00e1n h\\u1ecdc! \\ud83e\\udde0\\ud83c\\udf1f'];
  var speeches2=['T\\u1ed1t l\\u1eafm Nhi! L\\u1ea7n sau 3 sao nh\\u00e9! \\ud83c\\udf1f','Corgi vui qu\\u00e1! C\\u00f9ng luy\\u1ec7n th\\u00eam n\\u00e0o! \\ud83d\\udc15','G\\u1ea7n ho\\u00e0n h\\u1ea3o r\\u1ed3i! Fighting! \\ud83d\\udcaa'];
  var speeches1=['Kh\\u00f4ng sao \\u0111\\u00e2u! Corgi lu\\u00f4n \\u1edf b\\u00ean Nhi! \\ud83d\\udc95','M\\u1ed7i l\\u1ea7n ch\\u01a1i l\\u00e0 m\\u1ed7i l\\u1ea7n gi\\u1ecfi h\\u01a1n! \\ud83c\\udf31','Corgi tin Nhi s\\u1ebd l\\u00e0m \\u0111\\u01b0\\u1ee3c! Ch\\u01a1i l\\u1ea1i nha! \\ud83d\\udc3e'];
  var sp=stars>=3?speeches3:stars>=2?speeches2:speeches1;
  document.getElementById('resultSpeech').innerHTML='<div class="speech-bubble" style="margin:12px auto">'+sp[R(0,sp.length-1)]+'</div>';
  document.getElementById('rCorrect').textContent=correct+'/'+Q_COUNT;
  document.getElementById('rAcc').textContent=acc+'%';
  document.getElementById('rXP').textContent='+'+xpE;
  document.getElementById('rGem').textContent='+'+gemE;
  if(stars>=2)spawnConfetti();updateUI();
}

function getDailyM(){
  var today=new Date().toDateString();
  if(PD.daily.date!==today){PD.daily={date:today,missions:[
    {id:'play3',name:'Ch\\u01a1i 3 l\\u01b0\\u1ee3t',desc:'Ho\\u00e0n th\\u00e0nh 3 l\\u01b0\\u1ee3t ch\\u01a1i',target:3,progress:0,reward:5,emoji:'\\ud83c\\udfae'},
    {id:'correct20',name:'\\u0110\\u00fang 20 c\\u00e2u',desc:'Tr\\u1ea3 l\\u1eddi \\u0111\\u00fang 20 c\\u00e2u',target:20,progress:0,reward:10,emoji:'\\u2705'},
    {id:'perfect1',name:'3 sao!',desc:'\\u0110\\u1ea1t 3 sao trong 1 l\\u01b0\\u1ee3t',target:1,progress:0,reward:15,emoji:'\\u2b50'},
    {id:'combo5',name:'Combo 5',desc:'\\u0110\\u1ea1t combo 5 c\\u00e2u \\u0111\\u00fang li\\u00ean ti\\u1ebfp',target:1,progress:0,reward:8,emoji:'\\ud83d\\udd25'},
  ]};saveData()}
  return PD.daily.missions;
}
function updateDailyProg(c){
  var ms=getDailyM();
  ms.forEach(function(m){if(m.progress>=m.target)return;if(m.id==='play3')m.progress++;if(m.id==='correct20')m.progress=Math.min(m.target,m.progress+c);if(m.id==='perfect1'&&c>=Q_COUNT)m.progress=1;if(m.id==='combo5'&&PD.maxCombo>=5)m.progress=1});
  ms.forEach(function(m){if(m.progress>=m.target&&!m.claimed){m.claimed=true;PD.gems+=m.reward}});saveData()
}
function renderDaily(){
  var ms=getDailyM();
  document.getElementById('dailyMissions').innerHTML=ms.map(function(m){
    var done=m.progress>=m.target;
    return '<div class="mission-card '+(done?'done':'')+'"><div class="em">'+m.emoji+'</div><div class="info"><div class="tt">'+m.name+'</div><div class="ds">'+m.desc+'</div><div class="m-prog"><div class="fill" style="width:'+Math.min(100,m.progress/m.target*100)+'%"></div></div><div style="font-size:10px;color:var(--dim);margin-top:3px">'+m.progress+'/'+m.target+'</div></div><div class="rw">+'+m.reward+'\\ud83d\\udc8e</div></div>';
  }).join('');updateUI()
}

function renderProfile(){
  var xpFor=PD.level*100,pct=Math.min(100,PD.xp/xpFor*100);
  var titles=['T\\u00e2n binh','H\\u1ecdc tr\\u00f2','Chi\\u1ebfn binh','Hi\\u1ec7p s\\u0129','Ph\\u00e1p s\\u01b0','B\\u1eadc th\\u1ea7y','Huy\\u1ec1n tho\\u1ea1i','Th\\u1ea7n \\u0111\\u1ed3ng'];
  var ti=Math.min(Math.floor(PD.level/3),titles.length-1);
  document.getElementById('profileLv').textContent='Level '+PD.level+' \\u2014 '+titles[ti];
  document.getElementById('xpFull').style.width=pct+'%';
  document.getElementById('xpCur').textContent=PD.xp;
  document.getElementById('xpNeed').textContent=xpFor;
  document.getElementById('profStreak').textContent=PD.streak;
  document.getElementById('profileAvatar').innerHTML='<div style="display:flex;align-items:end;justify-content:center;gap:-10px">'+chibiSVG(70)+'<div style="margin-left:-15px;margin-bottom:-5px">'+corgiSVG(50,'happy')+'</div></div>';
  var ads=[
    {id:'first',em:'\\ud83c\\udfae',nm:'B\\u1eaft \\u0111\\u1ea7u',ck:function(){return PD.totalPlayed>0}},
    {id:'c50',em:'\\u2705',nm:'50 \\u0111\\u00fang',ck:function(){return PD.totalCorrect>=50}},
    {id:'c200',em:'\\ud83c\\udfc5',nm:'200 \\u0111\\u00fang',ck:function(){return PD.totalCorrect>=200}},
    {id:'c500',em:'\\ud83d\\udc51',nm:'500 \\u0111\\u00fang',ck:function(){return PD.totalCorrect>=500}},
    {id:'s3',em:'\\ud83d\\udd25',nm:'3 ng\\u00e0y streak',ck:function(){return PD.streak>=3}},
    {id:'s7',em:'\\ud83d\\udca5',nm:'7 ng\\u00e0y streak',ck:function(){return PD.streak>=7}},
    {id:'l5',em:'\\u2b50',nm:'Level 5',ck:function(){return PD.level>=5}},
    {id:'l10',em:'\\ud83c\\udf1f',nm:'Level 10',ck:function(){return PD.level>=10}},
    {id:'all',em:'\\ud83c\\udfc6',nm:'12 skills',ck:function(){return Object.keys(PD.sp).length>=12}},
    {id:'m1',em:'\\ud83d\\udc8e',nm:'Master 1',ck:function(){return Object.values(PD.sp).some(function(p){return p.level>=5})}},
    {id:'g50',em:'\\ud83d\\udcb0',nm:'50 gems',ck:function(){return PD.gems>=50}},
    {id:'cb10',em:'\\u26a1',nm:'Combo 10',ck:function(){return PD.maxCombo>=10}},
  ];
  document.getElementById('achGrid').innerHTML=ads.map(function(a){
    var u=a.ck();if(u)PD.ach[a.id]=true;
    return '<div class="ach '+(u?'':'locked')+'">'+a.em+'<div class="anm">'+a.nm+'</div></div>';
  }).join('');saveData();updateUI()
}

function spawnConfetti(){
  var c=document.getElementById('confetti');c.innerHTML='';
  var cols=['#fbbf24','#ff6b9d','#c084fc','#38bdf8','#34d399','#fb7185'];
  for(var i=0;i<50;i++){var p=document.createElement('div');p.className='conf';p.style.left=R(0,100)+'%';p.style.background=cols[R(0,5)];p.style.setProperty('--del',(R(0,20)/10)+'s');p.style.setProperty('--dur',(R(20,40)/10)+'s');p.style.width=R(6,12)+'px';p.style.height=R(6,12)+'px';p.style.borderRadius=Math.random()>0.5?'50%':'2px';c.appendChild(p)}
  setTimeout(function(){c.innerHTML=''},4000)
}

function initSparkles(){
  var el=document.getElementById('sparkles');if(!el)return;
  for(var i=0;i<20;i++){var s=document.createElement('div');s.className='sparkle';s.style.left=R(0,100)+'%';s.style.top=R(0,100)+'%';s.style.setProperty('--dur',R(30,60)/10+'s');s.style.setProperty('--delay',R(0,40)/10+'s');s.style.background=['#fbbf24','#ff6b9d','#c084fc','#38bdf8'][R(0,3)];el.appendChild(s)}
}

function initSplash(){
  var fs=document.getElementById('floatingStars');if(!fs)return;
  var starEmoji=['\\u2b50','\\u2728','\\ud83c\\udf1f','\\ud83d\\udcab'];
  for(var i=0;i<8;i++){var s=document.createElement('div');s.className='fstar';s.textContent=starEmoji[R(0,3)];s.style.left=R(5,95)+'%';s.style.top=R(5,85)+'%';s.style.setProperty('--dur',R(30,60)/10+'s');s.style.setProperty('--del',R(0,30)/10+'s');fs.appendChild(s)}
  var scene=document.getElementById('splashScene');
  if(scene)scene.innerHTML='<div style="display:flex;align-items:end;justify-content:center;gap:0"><div style="animation:float 3s ease-in-out infinite">'+chibiSVG(120)+'</div><div style="margin-left:-20px;animation:float 3s 0.3s ease-in-out infinite">'+corgiSVG(100,'excited')+'</div></div>';
}

initSparkles();initSplash();checkStreak();updateUI();
`
}
