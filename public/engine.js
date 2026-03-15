// ============ SOUND SYSTEM (Web Audio API) ============
var _aCtx=null;
function aCtx(){
  if(!_aCtx)try{_aCtx=new(window.AudioContext||window.webkitAudioContext)()}catch(e){}
  if(_aCtx&&_aCtx.state==='suspended')_aCtx.resume();
  return _aCtx;
}
function sndEnabled(){try{var p=JSON.parse(localStorage.getItem('player_profile'));return p&&p.soundEnabled===false?false:true}catch(e){return true}}
function tone(freq,dur,type,vol,delay){
  if(!sndEnabled())return;
  try{var c=aCtx();if(!c)return;var t=c.currentTime+(delay||0);
  var o=c.createOscillator(),g=c.createGain();
  o.type=type||'sine';o.frequency.setValueAtTime(freq,t);
  g.gain.setValueAtTime(vol||.2,t);g.gain.exponentialRampToValueAtTime(.001,t+dur);
  o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+dur)}catch(e){}
}
function sndTap(){tone(880,.06,'sine',.12);tone(1320,.04,'sine',.08,.03)}
function sndCorrect(){tone(523,.1,'sine',.25);tone(659,.1,'sine',.25,.08);tone(784,.15,'sine',.3,.16)}
function sndWrong(){tone(311,.15,'square',.15);tone(233,.25,'square',.12,.12)}
function sndCombo(n){var f=[523,659,784,1047,1319];for(var i=0;i<Math.min(n,5);i++)tone(f[i],.08,'sine',.2,i*.06);tone(f[Math.min(n,5)-1],.2,'sine',.3,Math.min(n,5)*.06)}
function sndStar(){var n=[523,659,784,1047,1319,1568];for(var i=0;i<n.length;i++)tone(n[i],.12,'triangle',.25,i*.09)}
function sndLevelUp(){var n=[392,494,587,659,784,988,1047];for(var i=0;i<n.length;i++)tone(n[i],.15,'triangle',.28,i*.1)}
function sndStart(){tone(523,.12,'sine',.2);tone(659,.12,'sine',.2,.1);tone(784,.12,'sine',.25,.2);tone(1047,.25,'triangle',.3,.3)}
function sndWhoosh(){if(!sndEnabled())return;try{var c=aCtx();if(!c)return;var t=c.currentTime;var o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.setValueAtTime(800,t);o.frequency.exponentialRampToValueAtTime(200,t+.15);g.gain.setValueAtTime(.08,t);g.gain.exponentialRampToValueAtTime(.001,t+.15);o.connect(g);g.connect(c.destination);o.start(t);o.stop(t+.2)}catch(e){}}
function sndFail(){tone(392,.2,'triangle',.15);tone(330,.3,'triangle',.12,.15)}

// ============ QUESTION POOL ============
var _qPool=null;
(function(){
  fetch('/questions_pool.json').then(function(r){return r.json()}).then(function(data){
    _qPool=data;
    console.log('[Pool] Loaded question pools: '+Object.keys(data).length+' skills');
  }).catch(function(e){console.log('[Pool] No pool found, using gen()')});
})();
function poolGet(skillId,level){
  if(!_qPool||!_qPool[skillId])return null;
  var qs=_qPool[skillId][level]||_qPool[skillId][String(level)];
  if(!qs||!qs.length)return null;
  var q=qs[R(0,qs.length-1)];
  // Rebuild full question object with options
  if(q.x){
    return{text:q.t,answer:q.a,hint:q.h||'',options:SH([q.a].concat(qs.filter(function(o){return o.a!==q.a}).map(function(o){return o.a}).slice(0,3))),isText:true};
  }
  var ans=parseInt(q.a);
  var opts=[ans];var _s=0;
  while(opts.length<4&&_s<200){_s++;var d=R(1,Math.max(3,Math.abs(Math.round(ans*.3))||3));if(Math.random()>.5)d=-d;var v=ans+d;if(v>=0&&v!==ans&&opts.indexOf(v)===-1)opts.push(v)}
  while(opts.length<4)opts.push(ans+opts.length*7);
  return{text:q.t,answer:ans,hint:q.h||'',options:SH(opts),isText:false};
}

// ============ VOICE SYSTEM ============
var _voiceManifest=null;
var _voiceAudio=new Audio();
var _voiceEnabled=true;
var _voiceLoaded=false;
var _idleTimer=null;
var _speechSynth=window.speechSynthesis||null;

var _qVoiceManifest=null;
// Load voice manifests
(function(){
  fetch('/voice/voice_manifest.json').then(function(r){return r.json()}).then(function(data){
    _voiceManifest=data;_voiceLoaded=true;
    console.log('[Voice] Loaded manifest: '+data.total_files+' entries');
  }).catch(function(e){console.log('[Voice] No manifest found, voice disabled')});
  fetch('/voice/question_manifest.json').then(function(r){return r.json()}).then(function(data){
    _qVoiceManifest=data;
    console.log('[Voice] Loaded question voice: '+Object.keys(data).length+' entries');
  }).catch(function(e){console.log('[Voice] No question manifest')});
})();

function voiceEnabled(){
  if(!_voiceEnabled||!sndEnabled())return false;
  try{var p=JSON.parse(localStorage.getItem('player_profile'));if(p&&p.voiceEnabled===false)return false}catch(e){}
  return true;
}
function voiceReadEnabled(){
  try{var p=JSON.parse(localStorage.getItem('player_profile'));if(p&&p.voiceReadEnabled===false)return false}catch(e){}
  return true;
}
function getVoiceChar(){return 'boy'}

// Play a pre-recorded voice line
function voicePlay(event,topicId){
  if(!voiceEnabled()||!_voiceManifest)return;
  var char=getVoiceChar();
  var entries=_voiceManifest.entries.filter(function(e){
    return e.event===event&&e.character===char&&(!topicId||e.topic===topicId);
  });
  if(!entries.length&&topicId){
    // Fallback: try without topic
    entries=_voiceManifest.entries.filter(function(e){return e.event===event&&e.character===char&&!e.topic});
  }
  if(!entries.length)return;
  var pick=entries[Math.floor(Math.random()*entries.length)];
  try{
    _voiceAudio.pause();_voiceAudio.currentTime=0;
    _voiceAudio.src='/voice/'+pick.file;
    _voiceAudio.volume=0.8;
    _voiceAudio.play().catch(function(){});
  }catch(e){}
}

// Read question text aloud using pre-generated MP3 file
function voiceReadQuestion(text){
  if(!voiceEnabled()||!voiceReadEnabled())return;
  if(!_qVoiceManifest)return;
  try{
    // MD5 hash to find the right audio file
    var hash=_md5(text);
    var entry=_qVoiceManifest[hash];
    if(!entry)return;
    // Use a separate Audio for question reading so it doesn't conflict with voicePlay
    if(!window._qAudio)window._qAudio=new Audio();
    window._qAudio.pause();window._qAudio.currentTime=0;
    window._qAudio.src='/voice/'+entry.file;
    window._qAudio.volume=0.8;
    window._qAudio.play().catch(function(){});
  }catch(e){}
}
// Simple MD5 for text→hash lookup (matches Python hashlib.md5)
function _md5(s){var d,r,f,i,o,e,c;d=function(a,b){return(a+b)&0xFFFFFFFF};r=function(a,b){return(a<<b)|(a>>>(32-b))};f=[function(b,c2,dd){return(b&c2)|((~b)&dd)},function(b,c2,dd){return(b&dd)|(c2&(~dd))},function(b,c2,dd){return b^c2^dd},function(b,c2,dd){return c2^(b|(~dd))}];i=[7,12,17,22,7,12,17,22,7,12,17,22,7,12,17,22,5,9,14,20,5,9,14,20,5,9,14,20,5,9,14,20,4,11,16,23,4,11,16,23,4,11,16,23,4,11,16,23,6,10,15,21,6,10,15,21,6,10,15,21,6,10,15,21];o=[0xd76aa478,0xe8c7b756,0x242070db,0xc1bdceee,0xf57c0faf,0x4787c62a,0xa8304613,0xfd469501,0x698098d8,0x8b44f7af,0xffff5bb1,0x895cd7be,0x6b901122,0xfd987193,0xa679438e,0x49b40821,0xf61e2562,0xc040b340,0x265e5a51,0xe9b6c7aa,0xd62f105d,0x02441453,0xd8a1e681,0xe7d3fbc8,0x21e1cde6,0xc33707d6,0xf4d50d87,0x455a14ed,0xa9e3e905,0xfcefa3f8,0x676f02d9,0x8d2a4c8a,0xfffa3942,0x8771f681,0x6d9d6122,0xfde5380c,0xa4beea44,0x4bdecfa9,0xf6bb4b60,0xbebfbc70,0x289b7ec6,0xeaa127fa,0xd4ef3085,0x04881d05,0xd9d4d039,0xe6db99e5,0x1fa27cf8,0xc4ac5665,0xf4292244,0x432aff97,0xab9423a7,0xfc93a039,0x655b59c3,0x8f0ccc92,0xffeff47d,0x85845dd1,0x6fa87e4f,0xfe2ce6e0,0xa3014314,0x4e0811a1,0xf7537e82,0xbd3af235,0x2ad7d2bb,0xeb86d391];e=function(str){var a=[],b=str.length*8;for(var k=0;k<str.length;k++){a[k>>2]|=str.charCodeAt(k)<<((k%4)*8)}a[str.length>>2]|=0x80<<((str.length%4)*8);var l=((str.length+8)>>>6)+1;while(a.length<l*16)a.push(0);a[l*16-2]=b&0xFFFFFFFF;a[l*16-1]=(b/0x100000000)>>>0;return a};c=function(h){var hex='';for(var j=0;j<4;j++){for(var k2=0;k2<4;k2++){hex+=(('0'+((h[j]>>(k2*8))&0xFF).toString(16)).slice(-2))}}return hex};var bytes=e(unescape(encodeURIComponent(s)));var h0=0x67452301,h1=0xefcdab89,h2=0x98badcfe,h3=0x10325476;for(var idx=0;idx<bytes.length;idx+=16){var a=h0,b=h1,c2=h2,dd=h3;for(var j=0;j<64;j++){var g,F;if(j<16){F=f[0](b,c2,dd);g=j}else if(j<32){F=f[1](b,c2,dd);g=(5*j+1)%16}else if(j<48){F=f[2](b,c2,dd);g=(3*j+5)%16}else{F=f[3](b,c2,dd);g=(7*j)%16}var tmp=dd;dd=c2;c2=b;b=d(b,r(d(d(a,F),d(o[j],bytes[idx+g]||0)),i[j]));a=tmp}h0=d(h0,a);h1=d(h1,b);h2=d(h2,c2);h3=d(h3,dd)}return c([h0,h1,h2,h3]).substring(0,12)}

// Start idle timer (reminder if no interaction for 30s)
function voiceStartIdle(){
  voiceStopIdle();
  _idleTimer=setTimeout(function(){
    voicePlay('idle');
    // Repeat every 60s
    _idleTimer=setTimeout(arguments.callee,60000);
  },30000);
}
function voiceStopIdle(){if(_idleTimer){clearTimeout(_idleTimer);_idleTimer=null}}

// ============ PLAYER PROFILE ============
var PP=(function(){try{var p=JSON.parse(localStorage.getItem('player_profile'));if(p&&p.name)return p}catch(e){}return{name:'Bé',gender:'girl',avatar:'nhinhi',pet:'corgi'}})();
var ART_MILESTONES=[1,2,3,4,5];
function getArtLevel(lv){for(var i=ART_MILESTONES.length-1;i>=0;i--){if(lv>=ART_MILESTONES[i])return ART_MILESTONES[i]}return 1}
function getAvatarSrc(){
  var charId=PP.gender==='boy'?'boy':'girl';
  var lv=D&&D.charLevel?getArtLevel(D.charLevel):1;
  return'/characters/'+charId+'_level_'+lv+'.png';
}
function getPetSrc(){
  var petId=PP.pet||'corgi';
  var lv=D&&D.petLevel?getArtLevel(D.petLevel):1;
  return'/pets/'+petId+'_level_'+lv+'.png';
}
function getPetName(){return PP.pet==='cat'?'Mèo Bông':PP.pet==='trex'?'Khủng Long':PP.pet==='dragon'?'Rồng Con':'Corgi Béo'}
function getCharName(){return getPlayerName()}
function getPlayerName(){return PP.name||'Bé'}
function escHtml(s){var d=document.createElement('div');d.textContent=s;return d.innerHTML}

// ============ CHARACTER & PET EVOLUTION ============
var CHAR_LEVELS=[0,100,300,600,1000,1500,2100,2800,3600,4500];
var CHAR_TITLES=['Tập Sự','Khám Phá','Siêng Năng','Thông Minh','Giỏi Giang','Xuất Sắc','Thiên Tài','Bậc Thầy','Huyền Thoại','Thần Đồng'];
var CHAR_BADGES=['🌱','🔍','📚','💡','⭐','🏅','🧠','👑','🌟','🏆'];
var CHAR_COLORS=['#9CA3AF','#60A5FA','#34D399','#FBBF24','#F472B6','#A78BFA','#FB923C','#F43F5E','#8B5CF6','#EAB308'];
function getCharLevel(xp){for(var i=CHAR_LEVELS.length-1;i>=0;i--){if(xp>=CHAR_LEVELS[i])return i+1}return 1}
function getCharStage(lv){return{level:lv,title:CHAR_TITLES[lv-1]||'Tập Sự',badge:CHAR_BADGES[lv-1]||'🌱',color:CHAR_COLORS[lv-1]||'#9CA3AF',hasHat:lv>=3,hasCape:lv>=5,hasGlow:lv>=7,hasCrown:lv>=8,hasWings:lv>=9}}
function awardCharXP(xpAmount){
  if(!D.charXP)D.charXP=0;if(!D.charLevel)D.charLevel=1;
  if(!D.petXP)D.petXP=0;if(!D.petLevel)D.petLevel=1;
  var oldCharLv=D.charLevel;var oldPetLv=D.petLevel;
  // Pet ability: Power+ (trex gives +5% XP)
  if(PP.pet==='trex')xpAmount=Math.round(xpAmount*1.05);
  D.charXP+=xpAmount;D.petXP+=Math.round(xpAmount*0.7);
  D.charLevel=getCharLevel(D.charXP);D.petLevel=getCharLevel(D.petXP);
  var evolved=false;
  if(D.charLevel>oldCharLv){evolved=true;showEvolution('character',D.charLevel);_ga('pet_evolution',{type:'character',new_level:D.charLevel})}
  if(D.petLevel>oldPetLv){evolved=true;if(!(D.charLevel>oldCharLv))showEvolution('pet',D.petLevel);_ga('pet_evolution',{type:'pet',pet:PP.pet,new_level:D.petLevel})}
  return evolved;
}
function showEvolution(type,newLevel){
  var stage=getCharStage(newLevel);
  var ov=document.createElement('div');ov.className='evolution-overlay';
  ov.innerHTML='<div class="evo-content">'+
    '<div class="evo-sparkles">✨🌟⭐✨🌟⭐</div>'+
    '<div class="evo-icon" style="color:'+stage.color+'">'+stage.badge+'</div>'+
    '<div class="evo-title">TIẾN HÓA!</div>'+
    '<div class="evo-detail">'+(type==='character'?escHtml(getPlayerName()):'Thú cưng')+' đạt Level '+newLevel+'</div>'+
    '<div class="evo-subtitle" style="color:'+stage.color+'">'+stage.title+'</div>'+
    (stage.hasCrown?'<div class="evo-bonus">👑 Vương miện!</div>':stage.hasGlow?'<div class="evo-bonus">✨ Phát sáng!</div>':stage.hasCape?'<div class="evo-bonus">🧥 Áo choàng!</div>':stage.hasHat?'<div class="evo-bonus">🎩 Nón phép!</div>':'')+
    '</div>';
  document.body.appendChild(ov);levelFlash();sndLevelUp();spawnConfetti();
  // Sparkle burst at center
  setTimeout(function(){spawnSparkleBurst(window.innerWidth/2,window.innerHeight/2,18)},300);
  // Voice: level up or pet evolve
  if(type==='pet')voicePlay('pet_evolve');
  else voicePlay('level_up');
  setTimeout(function(){ov.remove()},3000);
}
// Pet abilities
function getPetBonus(){
  var pet=PP.pet||'corgi';
  if(pet==='cat')return{type:'memory',label:'Gợi ý lâu hơn',hintMult:1.5};
  if(pet==='trex')return{type:'power',label:'+5% XP',xpMult:1.05};
  if(pet==='dragon')return{type:'combo',label:'+2 Combo',comboAdd:2};
  return{type:'speed',label:'+2s Timer',timerAdd:2};
}

// ============ ADAPTIVE DIFFICULTY ============
var DIFF_NAMES=['⭐ Dễ','⭐⭐ Trung Bình','⭐⭐⭐ Khó','🔥 Siêu Khó','🏆 Thách Đấu'];
var DIFF_COLORS=['#34D399','#60A5FA','#FBBF24','#F43F5E','#8B5CF6'];
var DIFF_XP_MULT=[0.8,1.0,1.3,1.6,2.0];
function getDifficulty(){if(!D.difficulty)D.difficulty=1;return Math.max(1,Math.min(5,D.difficulty))}
function getEffectiveLevel(skillLevel){
  var diff=getDifficulty();
  // Difficulty shifts the effective level: diff 1=same, diff 3=+1, diff 5=+2
  var bonus=Math.floor((diff-1)/2);
  return Math.min(skillLevel+bonus,GC.maxSkillLevel||5);
}
function checkDifficultyAdjust(){
  if(!D.diffHistory)D.diffHistory=[];
  if(D.settings&&D.settings.diffMode==='manual')return;
  if(D.diffHistory.length<10)return;
  var recent=D.diffHistory.slice(-20);
  var correctPct=recent.filter(function(x){return x===1}).length/recent.length*100;
  if(correctPct>=85&&D.difficulty<5){D.difficulty++;save()}
  else if(correctPct<50&&D.difficulty>1){D.difficulty--;save()}
}
function getDiffBadgeHtml(){
  var d=getDifficulty();
  return '<div class="diff-badge" style="background:'+DIFF_COLORS[d-1]+'22;color:'+DIFF_COLORS[d-1]+';border-color:'+DIFF_COLORS[d-1]+'44">'+DIFF_NAMES[d-1]+'</div>';
}

// ============ ART (dynamic from profile) ============
function CSvg(sz){
  if(!sz)sz=100;
  return '<img src="'+getPetSrc()+'" width="'+sz+'" height="'+sz+'" style="object-fit:contain;filter:drop-shadow(0 4px 8px rgba(0,0,0,.25))" alt="Pet">';
}
function UNhi(sz){
  if(!sz)sz=100;
  return '<img src="'+getAvatarSrc()+'" width="'+Math.round(sz*0.75)+'" height="'+sz+'" style="object-fit:contain;filter:drop-shadow(0 4px 8px rgba(0,0,0,.25))" alt="'+escHtml(getPlayerName())+'">';
}
// Mini pet face for avatar
function CMini(sz){
  if(!sz)sz=32;
  return '<img src="'+getPetSrc()+'" width="'+sz+'" height="'+sz+'" style="object-fit:contain;border-radius:50%" alt="Pet">';
}

// ============ GRADE CONFIG ============
var GC=window.GRADE_CONFIG||{};
var SUBJECTS=GC.subjects||[];

// ============ DATA ============
var SK=GC.saveKey||'uynhi3sub_v1';
var OLD_SK=GC.oldSaveKey||'';
var D=load();
// Analytics helper: dispatch to React shell
function _ga(evt,params){try{window.dispatchEvent(new CustomEvent('game-analytics',{detail:Object.assign({event:evt},params||{})}))}catch(e){}}
function def(){return{level:1,xp:0,stars:0,gems:0,streak:0,lastPlay:null,sp:{},ach:{},daily:{d:null,m:[]},tc:0,tp:0,combo:0,mc:0,ct:0,tickets:0,rewardHistory:[],exchanges:[],x2xp:false,studyTime:0,dailyLog:{},settings:{diffMode:'auto',qPerRound:10,timerOn:true},charXP:0,charLevel:1,petXP:0,petLevel:1,difficulty:1,diffHistory:[],weekly:{w:null,m:[]},streakFreeze:0,lastStreakFreeze:null,coins:0,inventory:[],equipped:{frame:null,title:null}}}
function _loadSave(key){
  try{var d=JSON.parse(localStorage.getItem(key));if(d&&d.level){var df=def();for(var k in df){if(!d.hasOwnProperty(k))d[k]=df[k]};if(!d.daily||!d.daily.m)d.daily={d:null,m:[]};
  if(d.ach)for(var ak in d.ach){if(d.ach[ak]===true)d.ach[ak]=1}
  return d}}catch(e){}return null;
}
function load(){
  var d=_loadSave(SK);
  if(!d)d=_loadSave(SK+'_bak');
  if(d)return d;
  // Migrate from old math-only save
  try{
    var old=JSON.parse(localStorage.getItem(OLD_SK));
    if(old&&old.level){
      var n=def();
      n.level=old.level||1;n.xp=old.xp||0;n.stars=old.stars||0;n.gems=old.gems||0;
      n.streak=old.streak||0;n.lastPlay=old.last_play_date||old.lastPlay||null;
      n.tc=old.total_correct||old.tc||0;n.tp=old.total_played||old.tp||0;
      n.mc=old.max_combo||old.mc||0;n.ct=old.corgi_taps||old.ct||0;
      var osp=old.skill_progress||old.sp||{};
      for(var k in osp){if(osp.hasOwnProperty(k))n.sp[k]=osp[k]}
      var oach=old.achievements||old.ach||{};
      for(var k2 in oach){if(oach.hasOwnProperty(k2))n.ach[k2]=oach[k2]}
      try{localStorage.setItem(SK,JSON.stringify(n))}catch(e){}
      return n;
    }
  }catch(e){}
  return def();
}
function save(){
  try{var json=JSON.stringify(D);localStorage.setItem(SK,json);localStorage.setItem(SK+'_bak',json)}catch(e){}
  try{window.dispatchEvent(new CustomEvent('game-save'))}catch(e){}
}
// Auto-save every 30s to prevent data loss
setInterval(function(){try{save()}catch(e){}},30000);
// Protect against cloud overwrite: reload D if localStorage changed externally (other tab)
window.addEventListener('storage',function(e){
  if(e.key===SK&&e.newValue){
    try{var nd=JSON.parse(e.newValue);
      if(nd&&nd.level&&(nd.gems+nd.stars)>=(D.gems+D.stars)){
        for(var k in nd){if(nd.hasOwnProperty(k))D[k]=nd[k]}
        updateUI();
      }else{save()}
    }catch(e2){}
  }
});
// Cloud sync event from same tab (game-shell.tsx loadCloudData)
window.addEventListener('cloud-sync',function(){
  var nd=_loadSave(SK);
  if(nd&&nd.level&&(nd.gems+nd.stars)>=(D.gems+D.stars)){
    for(var k in nd){if(nd.hasOwnProperty(k))D[k]=nd[k]}
    try{updateUI()}catch(e){}
  }
});
function resetProgress(){if(confirm('X\u00f3a to\u00e0n b\u1ed9?')){D=def();save();updateUI();renderGrid()}}

function R(a,b){return Math.floor(Math.random()*(b-a+1))+a}
function SH(a){for(var i=a.length-1;i>0;i--){var j=R(0,i);var t=a[i];a[i]=a[j];a[j]=t}return a}

// ============ QUESTION MAKERS ============
function MQ(text,ans,hint,opts){
  if(typeof ans==='number'){
    ans=parseInt(ans);if(isNaN(ans))ans=0;
    if(!opts){
      var s=[ans];var _safe=0;
      while(s.length<4&&_safe<200){_safe++;var d=R(1,Math.max(3,Math.abs(Math.round(ans*.3))||3));if(Math.random()>.5)d=-d;var v=ans+d;if(v>=0&&v!==ans&&s.indexOf(v)===-1)s.push(v)}
      while(s.length<4)s.push(ans+s.length*7);
      opts=SH(s);
    }
    return{text:text,answer:ans,hint:hint||'',options:opts,isText:false}
  }
  return{text:text,answer:ans,hint:hint||'',options:opts||[ans],isText:true}
}
function TQ(text,correctStr,wrongStrs,hint){
  var opts=SH([correctStr].concat(wrongStrs).slice(0,4));
  return{text:text,answer:correctStr,hint:hint||'',options:opts,isText:true}
}

var curSubject=0;

// ============ GATING FUNCTIONS ============
function getGlobalMinLevel(){
  var minLv=999;
  for(var si=0;si<SUBJECTS.length;si++){var sub=SUBJECTS[si];
    for(var i=0;i<sub.skills.length;i++){var pr=D.sp[sub.skills[i].id];var lv=pr?pr.level:1;if(lv<minLv)minLv=lv}}
  return minLv;
}
function getSubjectMinLevel(subIdx){
  var sub=SUBJECTS[subIdx];var minLv=999;
  for(var i=0;i<sub.skills.length;i++){var pr=D.sp[sub.skills[i].id];var lv=pr?pr.level:1;if(lv<minLv)minLv=lv}
  return minLv;
}
function allSubjectsPassedLevel(targetLv){
  for(var si=0;si<SUBJECTS.length;si++){var sub=SUBJECTS[si];
    for(var i=0;i<sub.skills.length;i++){var pr=D.sp[sub.skills[i].id];if(!pr||pr.level<=targetLv)return false}}
  return true;
}
function allSkillsPassedLevel(subIdx,targetLv){
  var sub=SUBJECTS[subIdx];
  for(var i=0;i<sub.skills.length;i++){var pr=D.sp[sub.skills[i].id];if(!pr||pr.level<=targetLv)return false}
  return true;
}
function checkLevelReward(){
  if(!D.levelRewards)D.levelRewards={};
  var maxLv=GC.maxSkillLevel||5;var rate=GC.levelRewardRate||50;
  for(var lv=1;lv<=maxLv;lv++){
    var key='global_'+lv;if(D.levelRewards[key])continue;
    if(allSubjectsPassedLevel(lv)){
      D.levelRewards[key]=true;
      var reward=lv===maxLv?500:lv*rate;
      D.gems+=reward;save();
      return{subIdx:-1,level:lv,reward:reward,isGlobal:true};
    }
  }
  return null;
}

// ============ RENDER GRID (unified, reads GC.gatingMode) ============
function renderGrid(){
  var sub=SUBJECTS[curSubject];
  var titles=SUBJECTS.map(function(s){return s.emoji+' '+s.name});
  document.getElementById('mapTitle').innerHTML=titles[curSubject]+' '+getDiffBadgeHtml();
  var grid=document.getElementById('skillGrid');
  var maxLv=GC.maxSkillLevel||5;
  var pass=GC.passThreshold||80;
  var lockLv=GC.gatingMode==='cross_subject'?getGlobalMinLevel():getSubjectMinLevel(curSubject);
  grid.innerHTML=sub.skills.map(function(sk,idx){
    var pr=D.sp[sk.id]||{level:1,correct:0,total:0};
    var pct=pr.total>0?Math.round(pr.correct/Math.max(pr.total,1)*100):0;
    var mst=pr.level>=maxLv&&pct>=pass;
    var locked=pr.level>lockLv+1;
    var lockMsg='';
    if(locked){
      lockMsg=GC.gatingMode==='cross_subject'
        ?'<div style="font-size:9px;color:var(--coral);margin-top:2px">\ud83d\udd12 Ho\u00e0n th\u00e0nh Lv.'+lockLv+' c\u1ea3 3 m\u00f4n \u0111\u00e3!</div>'
        :'<div style="font-size:9px;color:var(--coral);margin-top:2px">\ud83d\udd12 Ho\u00e0n th\u00e0nh Lv.'+lockLv+' t\u1ea5t c\u1ea3 k\u1ef9 n\u0103ng '+sub.name+' \u0111\u00e3!</div>';
    }
    return '<div class="skill-card '+(mst?'mastered':'')+(locked?' locked':'')+'" style="--cc:'+(sk.color||'rgba(255,255,255,.1)')+';'+(locked?'opacity:.5;':'')+'" onclick="'+(locked?'':'sndTap();startSkill(\''+sk.id+'\','+curSubject+')')+'">'
      +'<div class="em" style="--d:'+(idx*.15)+'s">'+sk.emoji+'</div><div class="nm">'+sk.name+'</div>'
      +'<div class="prog">Lv.'+pr.level+' \u00b7 '+pct+'%</div>'
      +lockMsg
      +'<div class="pbar"><div class="fill" style="width:'+Math.min(100,pr.level/maxLv*100)+'%"></div></div></div>';
  }).join('');
  var speeches=GC.speeches||[['Ch\u01a1i \u0111i!']];
  var sp=speeches[curSubject]||speeches[0];
  var cm=document.getElementById('corgiMap');
  cm.innerHTML='<div class="speech-bubble" style="margin-bottom:-4px">'+sp[R(0,sp.length-1)]+'</div>'
    +'<div onclick="tapCorgiMap(this)" style="cursor:pointer;display:flex;align-items:flex-end;justify-content:center;gap:4px">'+UNhi(90)+CSvg(70)+'</div>';
  updateUI();
}

// ============ GAME STATE ============
var curSkill=null,curLv=1,questions=[],qIdx=0,correct=0,combo=0,timerInt=null,timeLeft=0;
var TIME_Q=(GC.timePerQuestion||30)+(getPetBonus().timerAdd||0),Q_CT=GC.questionsPerRound||10;
var _answered=false;
var _lives=0;
window.__gameTimerInt=null;

// ============ SCREEN TRANSITIONS ============
var _transitionBusy=false;
var _transitionTypes=['iris','curtain'];
var _lastTransType=0;
function getNextTransType(){_lastTransType=(_lastTransType+1)%_transitionTypes.length;return _transitionTypes[_lastTransType]}
function irisTransition(cb){
  if(_transitionBusy)return cb&&cb();
  _transitionBusy=true;sndWhoosh();
  var ov=document.createElement('div');ov.className='iris-transition iris-close';
  var colors=['#1b0a3c','#2d1463','#3a1878','#1a0535'];
  ov.style.setProperty('--iris-bg',colors[R(0,colors.length-1)]);
  ov.innerHTML='<div class="iris-circle"></div>';
  document.body.appendChild(ov);
  setTimeout(function(){
    if(cb)cb();
    ov.classList.remove('iris-close');ov.classList.add('iris-open');
    setTimeout(function(){ov.remove();_transitionBusy=false},450);
  },420);
}
function curtainTransition(cb){
  if(_transitionBusy)return cb&&cb();
  _transitionBusy=true;sndWhoosh();
  var ov=document.createElement('div');ov.className='curtain-transition curtain-close';
  ov.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>';
  document.body.appendChild(ov);
  setTimeout(function(){
    if(cb)cb();
    ov.classList.remove('curtain-close');ov.classList.add('curtain-open');
    setTimeout(function(){ov.remove();_transitionBusy=false},400);
  },370);
}
function screenTransition(cb){
  var t=getNextTransType();
  if(t==='curtain')curtainTransition(cb);
  else irisTransition(cb);
}

// ============ SCREENS ============
function _doShowScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  document.getElementById(id).classList.add('active');
  var nav=document.getElementById('bottomNav');
  nav.style.display=['map','daily','wheel','profile'].indexOf(id)>=0?'flex':'none';
  var cg=document.getElementById('corgiG');
  if(cg)cg.style.display=id==='game'?'block':'none';
  if(id==='map')renderGrid();if(id==='daily')renderDaily();if(id==='wheel')renderWheel();if(id==='profile')renderProfile();if(id==='settings')renderSettings();if(id==='shop')renderShop();
}
// Major transitions get iris/curtain effect
var _majorScreens={game:1,result:1,map:1};
var _currentScreen='splash';
function showScreen(id){
  if(_majorScreens[id]&&_currentScreen!==id&&_currentScreen!=='splash'){
    var _id=id;_currentScreen=id;
    screenTransition(function(){_doShowScreen(_id)});
  } else {
    _currentScreen=id;_doShowScreen(id);
  }
}
function switchTab(id){
  sndTap();showScreen(id);
  var tabs=['map','daily','wheel','profile'];
  document.querySelectorAll('.nav-item').forEach(function(n,i){n.classList.toggle('active',tabs[i]===id)});
}
function switchSubject(idx){
  sndTap();curSubject=idx;
  document.querySelectorAll('.subject-tab').forEach(function(t,i){t.classList.toggle('active',i===idx)});
  renderGrid();
}
function startGame(){sndStart();checkStreak();showScreen('map');document.getElementById('bottomNav').style.display='flex';renderGrid();updateUI()}
function exitGame(){clearInterval(timerInt);voiceStopIdle();voicePlay('goodbye');if(_speechSynth)_speechSynth.cancel();showScreen('map')}

// ============ STREAK ============
function checkStreak(){var t=new Date().toDateString();if(D.lastPlay===t)return;var y=new Date(Date.now()-864e5).toDateString();D.lastPlay===y?D.streak++:D.streak=1;D.lastPlay=t;save();_ga('streak_count',{streak_count:D.streak})}

// ============ UPDATE UI ============
function updateUI(){
  var xpF=D.level*(GC.xpPerLevel||100),p=Math.min(100,D.xp/xpF*100);
  ['','2','3'].forEach(function(s){
    var g=function(id){return document.getElementById(id+s)};
    if(g('lvB'))g('lvB').textContent='Lv.'+D.level;
    if(g('stC'))g('stC').textContent=D.stars;
    if(g('gmC'))g('gmC').textContent=D.gems;
  });
  var tk=document.getElementById('tkC');if(tk)tk.textContent=D.tickets||0;
  var cn=document.getElementById('coinC');if(cn)cn.textContent=D.coins||0;
  var sk=document.getElementById('skC');if(sk)sk.textContent=D.streak;
  var xm=document.getElementById('xpM');if(xm)xm.style.width=p+'%';
  // Update avatars with mini corgi
  document.querySelectorAll('.avatar-mini').forEach(function(el){el.innerHTML=CMini(28)});
  // Sync gem exchange card if visible
  updateGemExchange();
}


// ============ START SKILL ============
function startSkill(id,subIdx){
  var sub=SUBJECTS[subIdx];
  var sk=sub.skills.find(function(s){return s.id===id});if(!sk)return;
  curSkill=sk;_ga('subject_selected',{subject:sk.id,subject_name:sk.name||sk.id});
  if(D.settings&&D.settings.qPerRound)Q_CT=D.settings.qPerRound;
  var pr=D.sp[id]||{level:1,correct:0,total:0};curLv=pr.level;
  var effLv=getEffectiveLevel(curLv);
  questions=[];for(var i=0;i<Q_CT;i++){var pq=poolGet(sk.id,effLv);questions.push(pq||sk.gen(effLv))}
  qIdx=0;correct=0;combo=0;_lives=GC.hasLives?(GC.livesCount||3):999;
  window._roundStart=Date.now();
  showScreen('game');
  document.getElementById('cC').textContent=0;
  document.getElementById('tQ').textContent=Q_CT;
  document.getElementById('corgiG').innerHTML=CSvg(55);
  document.getElementById('corgiG').style.display='block';
  // Voice: play skill intro, then show first question after intro finishes
  voicePlay('intro',sk.id);
  voiceStartIdle();
  // Wait for intro voice to finish before showing question (avoid overlap)
  if(_voiceAudio&&_voiceAudio.src&&voiceEnabled()){
    var _introStarted=false;
    _voiceAudio.addEventListener('playing',function _ip(){_introStarted=true;_voiceAudio.removeEventListener('playing',_ip)});
    _voiceAudio.addEventListener('ended',function _ie(){_voiceAudio.removeEventListener('ended',_ie);showQ()});
    _voiceAudio.addEventListener('error',function _ir(){_voiceAudio.removeEventListener('error',_ir);showQ()});
    // Fallback: if voice didn't start in 500ms (no audio file), show question anyway
    setTimeout(function(){if(!_introStarted)showQ()},500);
  } else {
    showQ();
  }
}
function replaySkill(){if(curSkill){sndTap();startSkill(curSkill.id,curSubject)}}

// ============ SHOW QUESTION ============
function showQ(){
  if(qIdx>=Q_CT){endRound();return}
  _answered=false;voiceStopIdle();voiceStartIdle();
  var q=questions[qIdx];var area=document.getElementById('gameArea');timeLeft=TIME_Q;
  // Voice: read question text (browser TTS)
  setTimeout(function(){voiceReadQuestion(q.text)},300);
  var fs=q.text.length>60?'16px':q.text.length>35?'22px':'28px';
  var singleCol=q.isText&&q.options.some(function(o){return o.length>12});
  area.innerHTML='<div class="timer-bar"><div class="fill" id="tF" style="width:100%"></div></div>'
    +getDiffBadgeHtml()
    +'<div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;justify-content:center">'
    +'<div class="g-stat"><div class="lb">C\u00e2u</div><div class="vl" style="color:var(--gold)">'+(qIdx+1)+'/'+Q_CT+'</div></div>'
    +'<div class="g-stat"><div class="lb">Combo</div><div class="vl" style="color:var(--mint)">'+combo+'\ud83d\udd25</div></div>'
    +(GC.hasLives?'<div class="g-stat"><div class="lb">M\u1ea1ng</div><div class="vl">'+'\u2764\ufe0f'.repeat(Math.max(0,_lives))+'\ud83e\udd0d'.repeat(Math.max(0,(GC.livesCount||3)-_lives))+'</div></div>':'')
    +'</div>'
    +'<div class="question-card">'
    +'<div class="q-text" style="font-size:'+fs+';white-space:pre-line">'+q.text+'</div>'
    +'<div class="q-hint">'+q.hint+'</div>'
    +'<div class="answers-grid '+(singleCol?'single-col':'')+'">'
    +q.options.map(function(o){
      var display=q.isText?o:o.toLocaleString();
      return '<button class="ans-btn" data-val="'+encodeURIComponent(String(o))+'" onclick="checkA(this)">'+display+'</button>';
    }).join('')
    +'</div></div>';
  clearInterval(timerInt);
  var _timerOn=D.settings&&D.settings.timerOn===false?false:true;
  var tBar=document.getElementById('tF');
  if(!_timerOn&&tBar)tBar.parentElement.style.display='none';
  if(_timerOn){
    timerInt=setInterval(function(){
      timeLeft-=0.1;
      var f=document.getElementById('tF');
      if(f)f.style.width=Math.max(0,timeLeft/TIME_Q*100)+'%';
      if(timeLeft<=0&&!_answered){
        _answered=true;clearInterval(timerInt);
        document.querySelectorAll('.ans-btn').forEach(function(b){b.style.pointerEvents='none'});
        var q2=questions[qIdx];var ans2=String(q2.answer);
        document.querySelectorAll('.ans-btn').forEach(function(b){if(decodeURIComponent(b.dataset.val)===ans2)b.classList.add('correct')});
        handleW();if(GC.hasLives&&_lives<=0)setTimeout(function(){endRound()},1500);else setTimeout(nextQ,1500);
      }
    },100);
    window.__gameTimerInt=timerInt;
  }
}

// ============ CHECK ANSWER ============
function checkA(btn){
  if(_answered)return;_answered=true;
  clearInterval(timerInt);
  document.querySelectorAll('.ans-btn').forEach(function(b){b.style.pointerEvents='none'});
  var q=questions[qIdx];
  var val=decodeURIComponent(btn.dataset.val);
  var ans=String(q.answer);
  if(val===ans){btn.classList.add('correct');handleC()}
  else{btn.classList.add('wrong');document.querySelectorAll('.ans-btn').forEach(function(b){if(decodeURIComponent(b.dataset.val)===ans)b.classList.add('correct')});handleW()}
  setTimeout(nextQ,1300);
}

// ============ CORRECT / WRONG ============

function handleC(){
  correct++;combo++;if(combo>D.mc)D.mc=combo;D.tc++;
  _ga('question_answered',{subject:curSkill?curSkill.id:'unknown',correct:true,combo:combo});
  if(!D.diffHistory)D.diffHistory=[];D.diffHistory.push(1);if(D.diffHistory.length>20)D.diffHistory=D.diffHistory.slice(-20);
  document.getElementById('cC').textContent=correct;
  var cg=document.getElementById('corgiG');
  cg.innerHTML=CSvg(55);
  cg.classList.add(combo>=3?'corgi-spin':'corgi-bounce');
  setTimeout(function(){cg.classList.remove('corgi-spin','corgi-bounce')},800);
  if(combo>=3)sndCombo(combo);else sndCorrect();
  showEnc(true);
  // Voice: praise or streak
  if(combo===10)voicePlay('streak');
  else if(combo===5)voicePlay('streak');
  else if(combo===3)voicePlay('streak');
  else voicePlay('correct');
  if(combo>=2){var cd=document.getElementById('comboDisplay');cd.textContent=combo+'x COMBO \ud83d\udd25';cd.classList.remove('show');requestAnimationFrame(function(){cd.classList.add('show')});setTimeout(function(){cd.classList.remove('show')},1500)}
  spawnFloat('\ud83d\udc95',2);
  // Floating score popup
  showScoreFloat('+XP','xp',R(35,65),R(25,45));
  if(combo>=3){showScoreFloat(combo+'x!','coin',R(55,75),R(35,55));spawnComboFire(combo)}
  // Star fly to XP bar on correct
  var cx=window.innerWidth/2,cy=window.innerHeight/2;
  spawnStarFly(cx+R(-40,40),cy+R(-20,20),'#stC','\u2b50');
  // Sparkle burst at answer button
  try{var bRect=document.querySelector('.ans-btn.correct').getBoundingClientRect();spawnSparkleBurst(bRect.left+bRect.width/2,bRect.top+bRect.height/2,8)}catch(e){}
}
function handleW(){
  combo=0;sndWrong();_ga('question_answered',{subject:curSkill?curSkill.id:'unknown',correct:false});
  if(!D.diffHistory)D.diffHistory=[];D.diffHistory.push(0);if(D.diffHistory.length>20)D.diffHistory=D.diffHistory.slice(-20);
  if(GC.hasLives)_lives--;
  var cg=document.getElementById('corgiG');
  cg.innerHTML=CSvg(55);
  cg.classList.add('corgi-sad');
  setTimeout(function(){cg.classList.remove('corgi-sad')},600);
  showEnc(false);spawnFloat('\ud83d\udcaa',1);
  screenShake();
  // Voice: encouragement
  voicePlay('wrong');
}
function nextQ(){qIdx++;if(GC.hasLives&&_lives<=0){endRound();return}showQ()}

function showEnc(ok){var ms=ok?C_MSGS:W_MSGS;var m=ms[R(0,ms.length-1)];var ov=document.createElement('div');ov.className='encourage-overlay';ov.innerHTML='<div class="enc-text">'+m.t+'</div><div class="enc-sub">'+m.s+'</div>';document.body.appendChild(ov);setTimeout(function(){ov.remove()},1600)}
function spawnFloat(e,n){for(var i=0;i<n;i++){(function(){var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=e;el.style.left=R(20,80)+'%';el.style.top=R(30,70)+'%';document.body.appendChild(el);setTimeout(function(){el.remove()},1100)})()}}
// ============ FLOATING SCORE POPUP ============
function showScoreFloat(text,type,x,y){
  var el=document.createElement('div');el.className='score-float '+(type||'xp');
  el.textContent=text;
  el.style.left=(x||50)+'%';el.style.top=(y||40)+'%';
  document.body.appendChild(el);setTimeout(function(){el.remove()},1300);
}
// Count-up animation for result numbers
function countUp(el,target,prefix,suffix,dur){
  if(!el)return;prefix=prefix||'';suffix=suffix||'';dur=dur||600;
  var start=0;var step=Math.max(1,Math.ceil(target/30));var t0=Date.now();
  function tick(){var elapsed=Date.now()-t0;var pct=Math.min(1,elapsed/dur);
    var val=Math.round(target*pct);el.textContent=prefix+val+suffix;
    if(pct<1)requestAnimationFrame(tick);else{el.textContent=prefix+target+suffix;el.classList.add('count-up')}}
  tick();
}
function tapCorgi(){sndTap();D.ct++;var cg=document.getElementById('corgiG');cg.innerHTML=CSvg(55);cg.classList.add('corgi-bounce');setTimeout(function(){cg.classList.remove('corgi-bounce')},600);var w=CORGI_TAP[R(0,CORGI_TAP.length-1)];var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=w;el.style.right='14px';el.style.bottom='80px';document.body.appendChild(el);setTimeout(function(){el.remove()},1000);save()}
function tapCorgiMap(el){sndTap();el.classList.remove('corgi-happy');requestAnimationFrame(function(){el.classList.add('corgi-happy')});setTimeout(function(){el.classList.remove('corgi-happy')},800)}

// ============ END ROUND ============
function endRound(){
  clearInterval(timerInt);
  try{document.getElementById('corgiG').style.display='none'}catch(e){}
  var acc=Math.round(correct/Q_CT*100);
  var stars=acc>=90?3:acc>=70?2:acc>=50?1:0;
  var diffMult=DIFF_XP_MULT[getDifficulty()-1]||1;
  var streakM=getStreakMult();
  var xpE=Math.round((correct*10+stars*15)*diffMult*streakM);if(D.x2xp){xpE*=2;D.x2xp=false}var gemE=stars>=2?R(3,8):stars>=1?R(1,3):0;
  gemE=Math.round(gemE*diffMult);
  // Coin earning: 1-3 per correct, bonus for combo/stars/difficulty
  if(!D.coins)D.coins=0;
  var coinBase=correct*R(1,3);
  var coinBonus=stars>=3?10:stars>=2?5:0;
  coinBonus+=Math.floor((getDifficulty()-1)*2);
  var coinE=coinBase+coinBonus;
  D.coins+=coinE;
  D.xp+=xpE;D.stars+=stars;D.gems+=gemE;D.tp+=Q_CT;
  // Track study time
  if(!D.studyTime)D.studyTime=0;
  var elapsed=window._roundStart?Math.round((Date.now()-window._roundStart)/1000):0;
  D.studyTime+=elapsed;window._roundStart=null;
  // Track daily log
  if(!D.dailyLog)D.dailyLog={};
  var today=new Date().toISOString().slice(0,10);
  if(!D.dailyLog[today])D.dailyLog[today]={q:0,c:0,t:0};
  D.dailyLog[today].q+=Q_CT;D.dailyLog[today].c+=correct;D.dailyLog[today].t+=elapsed;
  var _safe=0;while(D.xp>=D.level*(GC.xpPerLevel||100)&&_safe<100){_safe++;D.xp-=D.level*(GC.xpPerLevel||100);D.level++}
  if(curSkill){var p=D.sp[curSkill.id]||{level:1,correct:0,total:0};p.correct+=correct;p.total+=Q_CT;if(acc>=(GC.passThreshold||80)&&p.level<(GC.maxSkillLevel||5))p.level++;D.sp[curSkill.id]=p}
  // Award character & pet XP
  var charXpEarned=Math.round((correct*10+(acc>=90?50:acc>=70?20:0)+(combo>=5?30:combo>=3?15:0))*diffMult);
  awardCharXP(charXpEarned);
  // Adaptive difficulty check
  var oldDiff=getDifficulty();
  checkDifficultyAdjust();
  var newDiff=getDifficulty();
  try{updateDaily(correct)}catch(e){}
  var lvReward=checkLevelReward();
  _ga('level_completed',{level:D.level,stars_earned:stars,gems_earned:gemE,correct:correct,total:Q_CT,difficulty:getDifficulty()});
  save();showScreen('result');
  voiceStopIdle();
  if(stars>=3){sndStar();levelFlash();setTimeout(function(){spawnSparkleBurst(window.innerWidth/2,window.innerHeight*0.35,20)},200)}
  else if(stars>=1)sndCorrect();else sndFail();
  // Voice: round end feedback
  setTimeout(function(){voicePlay('round_end')},500);
  // Star fly to results
  if(stars>=2){for(var si=0;si<stars;si++){(function(idx){setTimeout(function(){spawnStarFly(window.innerWidth/2+R(-60,60),window.innerHeight/2+R(-30,30),'#rStars','\u2b50')},400+idx*200)})(si)}}
  var mood=stars>=3?'love':stars>=2?'excited':stars>=1?'happy':'sad';
  document.getElementById('resultScene').innerHTML='<div class="bounce-in '+(stars>=2?'corgi-happy':'')+'" style="display:flex;align-items:flex-end;justify-content:center;gap:6px">'+UNhi(stars>=2?120:100)+CSvg(stars>=2?90:75)+'</div>';
  var _pn=getPlayerName();
  document.getElementById('rTitle').textContent=stars>=3?'TUY\u1ec6T V\u1edcI, '+_pn+'! \ud83c\udfc6':stars>=2?'Gi\u1ecfi l\u1eafm! \ud83c\udf89':stars>=1?'C\u1ed1 th\u00eam nh\u00e9! \ud83d\udcaa':'L\u1ea7n sau s\u1ebd gi\u1ecfi h\u01a1n! \ud83e\udd17';
  document.getElementById('rStars').textContent='\u2b50'.repeat(stars)+'\u2606'.repeat(3-stars);
  var sp3=['Nhi gi\u1ecfi qu\u00e1! Corgi t\u1ef1 h\u00e0o!','Si\u00eau \u0111\u1ec9nh!','Thi\u00ean t\u00e0i!'];
  var sp2=['T\u1ed1t l\u1eafm! L\u1ea7n sau 3 sao nh\u00e9!','G\u1ea7n ho\u00e0n h\u1ea3o r\u1ed3i!'];
  var sp1=['Kh\u00f4ng sao! Corgi \u1edf b\u00ean Nhi!','M\u1ed7i l\u1ea7n ch\u01a1i l\u00e0 gi\u1ecfi h\u01a1n!'];
  var sp=stars>=3?sp3:stars>=2?sp2:sp1;
  document.getElementById('rSpeech').innerHTML='<div class="speech-bubble" style="margin:8px auto">'+sp[R(0,sp.length-1)]+'</div>';
  // Count-up animated result stats
  countUp(document.getElementById('rCor'),correct,'','/'+Q_CT,500);
  countUp(document.getElementById('rAcc'),acc,'','%',600);
  countUp(document.getElementById('rXP'),xpE,'+',(diffMult>1?' (x'+diffMult+')':''),700);
  countUp(document.getElementById('rGem'),gemE,'+','',400);
  var rCoin=document.getElementById('rCoin');if(rCoin)countUp(rCoin,coinE,'+','',500);
  if(stars>=2)spawnConfetti();
  // Show difficulty change
  if(newDiff!==oldDiff){
    var diffEl=document.createElement('div');
    diffEl.style.cssText='margin-top:12px;padding:12px 16px;border-radius:16px;text-align:center;animation:encBounce .6s ease;border:2px solid '+DIFF_COLORS[newDiff-1]+'66;background:'+DIFF_COLORS[newDiff-1]+'15';
    diffEl.innerHTML='<div style="font-size:22px">'+(newDiff>oldDiff?'⬆️':'⬇️')+'</div>'+
      '<div style="font-family:Baloo 2,cursive;font-size:15px;color:'+DIFF_COLORS[newDiff-1]+'">Độ khó: '+DIFF_NAMES[newDiff-1]+'</div>'+
      '<div style="font-size:11px;color:var(--dim);margin-top:2px">'+(newDiff>oldDiff?'Giỏi quá! Tăng độ khó':'Giảm để luyện thêm')+'</div>';
    document.getElementById('result').appendChild(diffEl);
  }
  if(lvReward){
    sndLevelUp();
    var rb=document.createElement('div');
    var isSpecial=lvReward.level===5&&lvReward.isGlobal;
    rb.style.cssText='margin-top:12px;background:linear-gradient(135deg,'+(isSpecial?'rgba(255,194,51,.3),rgba(255,90,158,.2)':'rgba(251,191,36,.2),rgba(255,107,157,.2)')+');border:2px solid var(--gold);border-radius:16px;padding:16px;text-align:center;animation:encBounce .6s ease';
    if(lvReward.isGlobal){
      var lvTitle=lvReward.level===5?'\ud83c\udf1f\ud83c\udfc6 V\u00d4 \u0110\u1ecaCH! \ud83c\udfc6\ud83c\udf1f':'\ud83c\udf89\ud83c\udfc6\ud83c\udf89';
      rb.innerHTML='<div style="font-size:32px">'+lvTitle+'</div>'
        +'<div style="font-family:Baloo 2,cursive;font-size:18px;color:var(--gold);margin:4px 0">Ho\u00e0n th\u00e0nh Level '+lvReward.level+' c\u1ea3 3 m\u00f4n!</div>'
        +'<div style="font-size:15px;color:var(--mint)">Th\u01b0\u1edfng \u0111\u1eb7c bi\u1ec7t: +'+lvReward.reward+' \ud83d\udc8e'+(isSpecial?' (50K!)':'')+'</div>';
    }else{
      rb.innerHTML='<div style="font-size:32px">\ud83c\udf89\ud83c\udfc6\ud83c\udf89</div>'
        +'<div style="font-family:Baloo 2,cursive;font-size:18px;color:var(--gold);margin:4px 0">Level Up!</div>'
        +'<div style="font-size:15px;color:var(--mint)">Th\u01b0\u1edfng: +'+lvReward.reward+' \ud83d\udc8e</div>';
    }
    document.getElementById('result').appendChild(rb);
    spawnConfetti();if(isSpecial)spawnConfetti();
  }
  updateUI();
}

// ============ DAILY QUEST POOL ============
var QUEST_POOL=[
  {i:'p3',n:'Chơi 3 lượt',d:'3 lượt bất kỳ',t:3,r:5,e:'🎮',cat:'play'},
  {i:'p5',n:'Chơi 5 lượt',d:'5 lượt bất kỳ',t:5,r:8,e:'🎮',cat:'play'},
  {i:'c10',n:'Đúng 10 câu',d:'10 câu đúng',t:10,r:5,e:'✅',cat:'correct'},
  {i:'c20',n:'Đúng 20 câu',d:'20 câu đúng',t:20,r:10,e:'✅',cat:'correct'},
  {i:'c30',n:'Đúng 30 câu',d:'30 câu đúng',t:30,r:15,e:'🎯',cat:'correct'},
  {i:'pf',n:'3 sao!',d:'1 lượt 3 sao',t:1,r:10,e:'⭐',cat:'perfect'},
  {i:'pf2',n:'2 lần 3 sao',d:'2 lượt đạt 3 sao',t:2,r:15,e:'🌟',cat:'perfect'},
  {i:'cb5',n:'Combo 5',d:'Combo 5 câu liên tiếp',t:1,r:8,e:'🔥',cat:'combo'},
  {i:'cb10',n:'Combo 10',d:'Combo 10 câu liên tiếp',t:1,r:15,e:'💥',cat:'combo'},
  {i:'sp',n:'Quay 1 lần',d:'Dùng vòng quay',t:1,r:5,e:'🎡',cat:'spin'},
  {i:'sub2',n:'Học 2 môn',d:'Chơi ít nhất 2 môn',t:2,r:10,e:'📚',cat:'multi'},
  {i:'t15',n:'Học 15 phút',d:'Học tổng 15 phút',t:900,r:12,e:'⏱️',cat:'time'},
];
function getDaily(){
  var t=new Date().toDateString();
  if(D.daily.d!==t){
    // Seed random from date for consistent daily quests
    var seed=0;for(var i=0;i<t.length;i++)seed=(seed*31+t.charCodeAt(i))&0x7fffffff;
    var pool=QUEST_POOL.slice();
    // Shuffle with seed
    for(var j=pool.length-1;j>0;j--){seed=(seed*1103515245+12345)&0x7fffffff;var k=seed%(j+1);var tmp=pool[j];pool[j]=pool[k];pool[k]=tmp}
    // Pick 4 ensuring variety of categories
    var picked=[],cats={};
    for(var p2=0;p2<pool.length&&picked.length<4;p2++){
      if(!cats[pool[p2].cat]||Object.keys(cats).length>=3){
        picked.push({i:pool[p2].i,n:pool[p2].n,d:pool[p2].d,t:pool[p2].t,p:0,r:pool[p2].r,e:pool[p2].e});
        cats[pool[p2].cat]=true;
      }
    }
    D.daily={d:t,m:picked};save()
  }
  return D.daily.m
}
// ============ WEEKLY QUESTS ============
function getWeeklyId(){var d=new Date();var day=d.getDay()||7;var mon=new Date(d.getTime()-(day-1)*864e5);return mon.toISOString().slice(0,10)}
function getWeekly(){
  if(!D.weekly)D.weekly={w:null,m:[]};
  var wid=getWeeklyId();
  if(D.weekly.w!==wid){
    D.weekly={w:wid,m:[
      {i:'wc50',n:'50 câu đúng/tuần',d:'Trả lời đúng 50 câu',t:50,p:0,r:20,e:'🏅'},
      {i:'wp10',n:'10 lượt/tuần',d:'Chơi 10 lượt trong tuần',t:10,p:0,r:15,e:'🎮'},
      {i:'ws3',n:'3 ngày liên tiếp',d:'Học 3 ngày liên tiếp trong tuần',t:3,p:0,r:25,e:'🔥'},
    ]};save()
  }
  return D.weekly.m;
}
// ============ STREAK MULTIPLIER ============
function getStreakMult(){
  var s=D.streak||0;
  if(s>=30)return 2.5;if(s>=14)return 2.0;if(s>=7)return 1.5;if(s>=3)return 1.2;return 1.0;
}
function getStreakMultLabel(){var m=getStreakMult();return m>1?'x'+m+' 🔥':'x1.0'}
function useStreakFreeze(){
  if(!D.streakFreeze||D.streakFreeze<=0)return false;
  D.streakFreeze--;D.lastStreakFreeze=new Date().toDateString();save();return true;
}
// ============ UPDATE DAILY ============
function updateDaily(c){
  var ms=getDaily();var wk=getWeekly();
  // Track subjects played this session
  if(!window._dailySubjects)window._dailySubjects={};
  if(curSkill)window._dailySubjects[curSubject]=true;
  ms.forEach(function(m){if(m.p>=m.t)return;
    if(m.i==='p3'||m.i==='p5')m.p++;
    if(m.i.charAt(0)==='c')m.p=Math.min(m.t,m.p+c);
    if((m.i==='pf'||m.i==='pf2')&&c>=Q_CT)m.p++;
    if(m.i==='cb5'&&D.mc>=5)m.p=1;
    if(m.i==='cb10'&&D.mc>=10)m.p=1;
    if(m.i==='sub2')m.p=Object.keys(window._dailySubjects||{}).length;
    if(m.i==='t15'){var today=new Date().toISOString().slice(0,10);var dl=D.dailyLog&&D.dailyLog[today];m.p=dl?dl.t:0}
  });
  ms.forEach(function(m){if(m.p>=m.t&&!m.cl){m.cl=true;D.gems+=m.r;sndCorrect()}});
  // Update weekly
  wk.forEach(function(w){if(w.p>=w.t)return;
    if(w.i==='wc50')w.p=Math.min(w.t,w.p+c);
    if(w.i==='wp10')w.p++;
    if(w.i==='ws3')w.p=Math.min(w.t,D.streak||0);
  });
  wk.forEach(function(w){if(w.p>=w.t&&!w.cl){w.cl=true;D.gems+=w.r;sndCorrect()}});
  save()
}
// ============ ACHIEVEMENT TIERS ============
var ACH_TIERS=['🥉','🥈','🥇','💎','👑'];
var ACH_TIER_NAMES=['Bronze','Silver','Gold','Platinum','Diamond'];
var ACH_DEFS=[
  {id:'f',em:'🎮',nm:'Bắt đầu',ck:function(t){return[1,10,30,100,500][t]},val:function(){return D.tp}},
  {id:'c',em:'✅',nm:'Câu đúng',ck:function(t){return[50,200,500,1500,5000][t]},val:function(){return D.tc}},
  {id:'s',em:'🔥',nm:'Streak',ck:function(t){return[3,7,14,30,60][t]},val:function(){return D.streak}},
  {id:'l',em:'⭐',nm:'Level',ck:function(t){return[5,10,15,25,50][t]},val:function(){return D.level}},
  {id:'sk',em:'🏆',nm:'Skills',ck:function(t){return[5,10,15,25,40][t]},val:function(){return Object.keys(D.sp).length}},
  {id:'m',em:'🎓',nm:'Master',ck:function(t){return[1,3,5,10,20][t]},val:function(){return Object.values(D.sp).filter(function(p){return p.level>=(GC.maxSkillLevel||5)}).length}},
  {id:'g',em:'💰',nm:'Gems',ck:function(t){return[50,200,500,2000,10000][t]},val:function(){return D.gems}},
  {id:'cb',em:'⚡',nm:'Combo',ck:function(t){return[5,10,15,25,50][t]},val:function(){return D.mc}},
];
function getAchTier(id){
  if(!D.ach)D.ach={};
  return typeof D.ach[id]==='number'?D.ach[id]:(D.ach[id]===true?1:0);
}
function checkAchievements(){
  ACH_DEFS.forEach(function(a){
    var cur=getAchTier(a.id);
    if(cur>=5)return;
    var val=a.val();
    for(var t=cur;t<5;t++){
      if(val>=a.ck(t)){D.ach[a.id]=t+1;if(t===cur)sndCorrect()}
      else break;
    }
  });
}
// ============ RENDER DAILY ============
function renderDaily(){
  var ms=getDaily();var wk=getWeekly();
  var smult=getStreakMult();
  var html='';
  // Streak info
  html+='<div class="streak-info-card">'+
    '<div class="streak-info-row">'+
      '<div class="streak-info-num">'+(D.streak||0)+'</div>'+
      '<div class="streak-info-meta"><div class="streak-info-lbl">ngày liên tiếp 🔥</div>'+
        '<div class="streak-info-mult">Bonus: '+getStreakMultLabel()+'</div></div>'+
    '</div>'+
    (D.streakFreeze>0?'<div class="streak-freeze">🧊 Streak Freeze: '+D.streakFreeze+' lần</div>':'')+
  '</div>';
  // Daily missions
  html+='<div class="quest-section-title">📋 Nhiệm vụ ngày</div>';
  html+=ms.map(function(m){
    var dn=m.p>=m.t;
    return '<div class="mission-card '+(dn?'done':'')+'"><div class="em">'+m.e+'</div><div class="info"><div class="tt">'+m.n+'</div><div class="ds">'+m.d+'</div><div class="m-prog"><div class="fill" style="width:'+Math.min(100,m.p/m.t*100)+'%"></div></div><div style="font-size:9px;color:var(--dim);margin-top:2px">'+m.p+'/'+m.t+'</div></div><div class="rw">+'+m.r+'💎</div></div>';
  }).join('');
  // Weekly missions
  html+='<div class="quest-section-title" style="margin-top:14px">📅 Nhiệm vụ tuần</div>';
  html+=wk.map(function(w){
    var dn=w.p>=w.t;
    return '<div class="mission-card '+(dn?'done':'')+'"><div class="em">'+w.e+'</div><div class="info"><div class="tt">'+w.n+'</div><div class="ds">'+w.d+'</div><div class="m-prog"><div class="fill" style="width:'+Math.min(100,w.p/w.t*100)+'%"></div></div><div style="font-size:9px;color:var(--dim);margin-top:2px">'+w.p+'/'+w.t+'</div></div><div class="rw">+'+w.r+'💎</div></div>';
  }).join('');
  document.getElementById('dailyMissions').innerHTML=html;
  updateUI()
}

// ============ PROFILE ============
function renderProfile(){
  var xpF=D.level*(GC.xpPerLevel||100),p=Math.min(100,D.xp/xpF*100);
  var titles=['T\u00e2n binh','H\u1ecdc tr\u00f2','Chi\u1ebfn binh','Hi\u1ec7p s\u0129','Ph\u00e1p s\u01b0','B\u1eadc th\u1ea7y','Huy\u1ec1n tho\u1ea1i','Th\u1ea7n \u0111\u1ed3ng'];
  document.getElementById('profLv').textContent='Level '+D.level+' \u2014 '+titles[Math.min(Math.floor(D.level/3),7)];
  document.getElementById('xpF').style.width=p+'%';document.getElementById('xpC').textContent=D.xp;document.getElementById('xpN').textContent=xpF;
  document.getElementById('profSk').textContent=D.streak;
  // Character evolution avatar with glow/effects
  if(!D.charLevel)D.charLevel=1;if(!D.petLevel)D.petLevel=1;if(!D.charXP)D.charXP=0;if(!D.petXP)D.petXP=0;
  var cStage=getCharStage(D.charLevel);var pStage=getCharStage(D.petLevel);
  var avHtml='<div style="display:flex;align-items:flex-end;justify-content:center;gap:4px;position:relative">';
  if(cStage.hasGlow)avHtml+='<div class="char-glow" style="--glow-color:'+cStage.color+'"></div>';
  avHtml+=UNhi(90);
  if(cStage.hasCrown)avHtml+='<div class="char-crown">👑</div>';
  else if(cStage.hasHat)avHtml+='<div class="char-hat">🎩</div>';
  avHtml+=CSvg(70);
  if(pStage.hasWings)avHtml+='<div class="pet-wings">🪽</div>';
  avHtml+='</div>';
  document.getElementById('profAv').innerHTML=avHtml;
  // Render char/pet evolution card
  renderCharCard(cStage,pStage);
  // Tiered achievements
  checkAchievements();
  document.getElementById('achGrid').innerHTML=ACH_DEFS.map(function(a){
    var tier=getAchTier(a.id);var maxed=tier>=5;
    var val=a.val();var nextReq=tier<5?a.ck(tier):a.ck(4);
    var prog=tier<5?Math.min(100,Math.round(val/Math.max(nextReq,1)*100)):100;
    var tierIcon=tier>0?ACH_TIERS[tier-1]:'🔒';
    return '<div class="ach '+(tier>0?'':'locked')+(maxed?' maxed':'')+'" title="'+a.nm+(tier>0?' '+ACH_TIER_NAMES[tier-1]:'')+'">'+
      a.em+'<div class="anm">'+a.nm+'</div>'+
      '<div class="ach-tier">'+tierIcon+'</div>'+
      (tier>0&&!maxed?'<div class="ach-prog"><div class="fill" style="width:'+prog+'%"></div></div>':'')+
    '</div>'
  }).join('');
  updateGemExchange();
  renderReport();
  save();updateUI()
}

// ============ LEARNING REPORT ============
function fmtTime(sec){
  if(!sec||sec<0)sec=0;
  if(sec<60)return sec+'s';
  if(sec<3600)return Math.floor(sec/60)+'p '+sec%60+'s';
  return Math.floor(sec/3600)+'h '+Math.floor((sec%3600)/60)+'p';
}
function renderReport(){
  var maxLv=GC.maxSkillLevel||5;var pass=GC.passThreshold||80;
  if(!D.studyTime)D.studyTime=0;if(!D.dailyLog)D.dailyLog={};
  var totQ=0,totC=0,totMastered=0,totSkills=0;
  var subColors=[
    {bg:'rgba(255,90,158,.12)',border:'rgba(255,90,158,.3)',accent:'#ff5a9e',bar:'linear-gradient(90deg,#ff5a9e,#ff8ec4)'},
    {bg:'rgba(45,219,166,.12)',border:'rgba(45,219,166,.3)',accent:'#2ddba6',bar:'linear-gradient(90deg,#2ddba6,#6ff0cc)'},
    {bg:'rgba(61,194,255,.12)',border:'rgba(61,194,255,.3)',accent:'#3dc2ff',bar:'linear-gradient(90deg,#3dc2ff,#7dd8ff)'}
  ];
  // Collect per-subject data
  var subData=SUBJECTS.map(function(sub,si){
    var sc=subColors[si%subColors.length];
    var skills=sub.skills;var sQ=0,sC=0,sMast=0;
    var skRows=skills.map(function(sk){
      var pr=D.sp[sk.id]||{level:1,correct:0,total:0};
      sQ+=pr.total;sC+=pr.correct;
      var pct=pr.total>0?Math.round(pr.correct/Math.max(pr.total,1)*100):0;
      var mst=pr.level>=maxLv&&pct>=pass;
      if(mst)sMast++;
      var lvPct=Math.round(((pr.level-1)/Math.max(maxLv-1,1))*100);
      return '<div class="report-sk-row"><div class="report-sk-em">'+sk.emoji+'</div>'+
        '<div class="report-sk-info"><div class="report-sk-nm">'+sk.name+'</div>'+
        '<div class="report-sk-bar"><div class="fill" style="width:'+lvPct+'%;background:'+sc.bar+'"></div></div>'+
        '<div class="report-sk-lv">Lv.'+pr.level+'/'+maxLv+(mst?' ✅':'')+'</div></div>'+
        '<div class="report-sk-stats">'+(pr.total>0?pct+'% ('+pr.correct+'/'+pr.total+')':'Chưa học')+'</div></div>';
    }).join('');
    totQ+=sQ;totC+=sC;totMastered+=sMast;totSkills+=skills.length;
    var sAcc=sQ>0?Math.round(sC/Math.max(sQ,1)*100):0;
    var accColor=sAcc>=80?'var(--mint)':sAcc>=60?'var(--gold)':sAcc>0?'var(--coral)':'var(--dim)';
    return '<div class="report-sub-card" onclick="this.classList.toggle(\'open\')" style="border-color:'+sc.border+';background:'+sc.bg+'">'+
      '<div class="report-sub-header">'+
      '<div class="report-sub-emoji">'+sub.emoji+'</div>'+
      '<div class="report-sub-info"><div class="report-sub-name">'+sub.name+'</div>'+
      '<div class="report-sub-meta"><span>🎯 '+sMast+'/'+skills.length+' master</span><span>📝 '+sQ+' câu</span></div></div>'+
      '<div class="report-sub-acc" style="color:'+accColor+'">'+(sQ>0?sAcc+'%':'—')+'</div>'+
      '<div class="report-sub-arrow">▼</div></div>'+
      '<div class="report-skills-list">'+skRows+'</div></div>';
  });
  // Quick Stats (4 cards — spec Section 2)
  var totAcc=totQ>0?Math.round(totC/Math.max(totQ,1)*100):0;
  var ov=document.getElementById('reportOverview');
  if(ov)ov.innerHTML=
    '<div class="report-ov-card"><div class="report-ov-icon">📚</div><div class="report-ov-num" style="color:var(--purple)">'+D.tp+'</div><div class="report-ov-lbl">Tổng bài làm</div></div>'+
    '<div class="report-ov-card"><div class="report-ov-icon">🎯</div><div class="report-ov-num" style="color:'+(totAcc>=80?'var(--mint)':totAcc>=60?'var(--gold)':'var(--coral)')+'">'+totAcc+'%</div><div class="report-ov-lbl">Độ chính xác</div></div>'+
    '<div class="report-ov-card"><div class="report-ov-icon">🔥</div><div class="report-ov-num" style="color:var(--coral)">'+D.streak+'</div><div class="report-ov-lbl">Streak</div></div>'+
    '<div class="report-ov-card"><div class="report-ov-icon">⏱️</div><div class="report-ov-num" style="color:var(--gold)">'+fmtTime(D.studyTime)+'</div><div class="report-ov-lbl">Thời gian học</div></div>';
  // 7-day bar chart
  draw7DayChart();
  // Radar chart
  setTimeout(drawRadarChart,100);
  // Calendar heatmap
  setTimeout(drawHeatmap,150);
  // Subject accuracy bars
  var rs=document.getElementById('reportSubjects');
  if(rs)rs.innerHTML=subData.join('');
  // Badge cabinet
  renderBadgeCabinet();
}
function draw7DayChart(){
  var c=document.getElementById('chart7day');if(!c)return;
  var dpr=window.devicePixelRatio||1;
  var rect=c.getBoundingClientRect();
  var w=rect.width||300,h=rect.height||140;
  c.width=w*dpr;c.height=h*dpr;
  var ctx=c.getContext('2d');ctx.scale(dpr,dpr);
  if(!D.dailyLog)D.dailyLog={};
  // Get last 7 days
  var days=[],labels=[],dayNames=['CN','T2','T3','T4','T5','T6','T7'];
  for(var i=6;i>=0;i--){
    var d=new Date(Date.now()-i*864e5);
    var key=d.toISOString().slice(0,10);
    var log=D.dailyLog[key]||{q:0,c:0,t:0};
    days.push(log);
    labels.push(dayNames[d.getDay()]+'\n'+d.getDate()+'/'+(d.getMonth()+1));
  }
  var maxQ=Math.max.apply(null,days.map(function(d){return d.q}))||10;
  var pad={t:14,b:38,l:8,r:8};
  var barW=(w-pad.l-pad.r)/7;
  var chartH=h-pad.t-pad.b;
  // Grid lines
  ctx.strokeStyle='rgba(255,255,255,.06)';ctx.lineWidth=1;
  for(var g=0;g<=4;g++){
    var gy=pad.t+chartH*(1-g/4);
    ctx.beginPath();ctx.moveTo(pad.l,gy);ctx.lineTo(w-pad.r,gy);ctx.stroke();
  }
  // Bars
  for(var i=0;i<7;i++){
    var x=pad.l+i*barW;var bw=barW*.6;var bx=x+(barW-bw)/2;
    var qH=days[i].q>0?(days[i].q/maxQ)*chartH:0;
    var cH=days[i].c>0?(days[i].c/maxQ)*chartH:0;
    // Total questions bar (dim)
    if(qH>0){
      var grad=ctx.createLinearGradient(0,pad.t+chartH-qH,0,pad.t+chartH);
      grad.addColorStop(0,'rgba(180,77,255,.4)');grad.addColorStop(1,'rgba(180,77,255,.15)');
      ctx.fillStyle=grad;
      roundRect(ctx,bx,pad.t+chartH-qH,bw,qH,4);ctx.fill();
    }
    // Correct answers bar (bright)
    if(cH>0){
      var grad2=ctx.createLinearGradient(0,pad.t+chartH-cH,0,pad.t+chartH);
      grad2.addColorStop(0,'rgba(45,219,166,.9)');grad2.addColorStop(1,'rgba(45,219,166,.5)');
      ctx.fillStyle=grad2;
      roundRect(ctx,bx+2,pad.t+chartH-cH,bw-4,cH,3);ctx.fill();
    }
    // Count on top
    if(days[i].q>0){
      ctx.fillStyle='rgba(255,255,255,.7)';ctx.font='bold 10px Nunito';ctx.textAlign='center';
      ctx.fillText(days[i].q,bx+bw/2,pad.t+chartH-qH-4);
    }
    // Day label
    var parts=labels[i].split('\n');
    ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='bold 10px Nunito';ctx.textAlign='center';
    ctx.fillText(parts[0],bx+bw/2,h-pad.b+14);
    ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='9px Nunito';
    ctx.fillText(parts[1],bx+bw/2,h-pad.b+26);
    // Highlight today
    if(i===6&&days[i].q>0){
      ctx.strokeStyle='rgba(45,219,166,.4)';ctx.lineWidth=1.5;
      roundRect(ctx,bx-1,pad.t+chartH-qH-1,bw+2,qH+2,5);ctx.stroke();
    }
  }
  // Legend
  ctx.fillStyle='rgba(45,219,166,.8)';ctx.fillRect(w-90,4,8,8);
  ctx.fillStyle='rgba(255,255,255,.5)';ctx.font='9px Nunito';ctx.textAlign='left';
  ctx.fillText('Đúng',w-78,12);
  ctx.fillStyle='rgba(180,77,255,.5)';ctx.fillRect(w-45,4,8,8);
  ctx.fillText('Tổng',w-33,12);
}
// ============ CHARACTER/PET EVOLUTION CARD ============
function renderCharCard(cStage,pStage){
  var el=document.getElementById('charPetCard');if(!el)return;
  var cNextXP=D.charLevel<10?CHAR_LEVELS[D.charLevel]:CHAR_LEVELS[9];
  var cCurrXP=CHAR_LEVELS[D.charLevel-1];
  var cProg=D.charLevel>=10?100:Math.round(((D.charXP-cCurrXP)/Math.max(cNextXP-cCurrXP,1))*100);
  var pNextXP=D.petLevel<10?CHAR_LEVELS[D.petLevel]:CHAR_LEVELS[9];
  var pCurrXP=CHAR_LEVELS[D.petLevel-1];
  var pProg=D.petLevel>=10?100:Math.round(((D.petXP-pCurrXP)/Math.max(pNextXP-pCurrXP,1))*100);
  var petBonus=getPetBonus();
  el.innerHTML=
    '<div class="cp-row">'+
      '<div class="cp-item" style="--cp-color:'+cStage.color+'">'+
        '<div class="cp-badge" style="background:'+cStage.color+'">'+cStage.badge+'</div>'+
        '<div class="cp-info">'+
          '<div class="cp-name">'+(PP.gender==='boy'?'Bin':'Uyển Nhi')+'</div>'+
          '<div class="cp-level" style="color:'+cStage.color+'">Lv.'+D.charLevel+' '+cStage.title+'</div>'+
          '<div class="cp-xp-bar"><div class="fill" style="width:'+cProg+'%;background:'+cStage.color+'"></div></div>'+
          '<div class="cp-xp-text">'+D.charXP+(D.charLevel<10?' / '+cNextXP:'')+' XP</div>'+
        '</div>'+
      '</div>'+
      '<div class="cp-item" style="--cp-color:'+pStage.color+'">'+
        '<div class="cp-badge" style="background:'+pStage.color+'">'+
          (PP.pet==='cat'?'🐱':PP.pet==='trex'?'🦖':PP.pet==='dragon'?'🐉':'🐕')+'</div>'+
        '<div class="cp-info">'+
          '<div class="cp-name">'+getPetName()+'</div>'+
          '<div class="cp-level" style="color:'+pStage.color+'">Lv.'+D.petLevel+' '+pStage.title+'</div>'+
          '<div class="cp-xp-bar"><div class="fill" style="width:'+pProg+'%;background:'+pStage.color+'"></div></div>'+
          '<div class="cp-xp-text">'+D.petXP+(D.petLevel<10?' / '+pNextXP:'')+' XP</div>'+
        '</div>'+
      '</div>'+
    '</div>'+
    '<div class="cp-ability">'+
      '<span class="cp-ability-icon">'+(PP.pet==='cat'?'🐱':PP.pet==='trex'?'🦖':PP.pet==='dragon'?'🐉':'🐕')+'</span>'+
      '<span class="cp-ability-label">Năng lực: '+petBonus.label+'</span>'+
    '</div>'+
    '<div class="cp-roadmap-btns">'+
      '<button class="cp-roadmap-btn" onclick="showEvolutionRoadmap(\'character\')" style="--btn-c:'+cStage.color+'">🗺️ Hành trình '+(PP.gender==='boy'?'Bin':'Uyển Nhi')+'</button>'+
      '<button class="cp-roadmap-btn" onclick="showEvolutionRoadmap(\'pet\')" style="--btn-c:'+pStage.color+'">🗺️ Hành trình '+getPetName()+'</button>'+
    '</div>';
}

// ============ EVOLUTION ROADMAP ============
function showEvolutionRoadmap(type){
  // type: 'character' or 'pet'
  var isPet=type==='pet';
  var currentLv=isPet?(D.petLevel||1):(D.charLevel||1);
  var currentXP=isPet?(D.petXP||0):(D.charXP||0);
  var name=isPet?getPetName():(PP.gender==='boy'?'Bin':'Uyển Nhi');
  var id=isPet?(PP.pet||'corgi'):(PP.gender==='boy'?'boy':'girl');
  var folder=isPet?'pets':'characters';

  var ov=document.createElement('div');ov.className='evo-roadmap-overlay';
  var html='<div class="evo-roadmap">';
  html+='<div class="evo-rm-header">';
  html+='<div class="evo-rm-title">Hành Trình Tiến Hóa</div>';
  html+='<div class="evo-rm-sub">'+escHtml(name)+'</div>';
  html+='<button class="evo-rm-close" onclick="this.closest(\'.evo-roadmap-overlay\').remove()">✕</button>';
  html+='</div>';

  html+='<div class="evo-rm-path">';
  for(var i=0;i<10;i++){
    var lv=i+1;
    var stage=getCharStage(lv);
    var xpNeeded=CHAR_LEVELS[i];
    var artLv=getArtLevel(lv);
    var reached=currentLv>=lv;
    var isCurrent=currentLv===lv;
    var isNext=currentLv===lv-1;

    // Unlock text
    var unlock='';
    if(lv===3) unlock='🎩 Nón phép thuật';
    else if(lv===5) unlock='🧥 Áo choàng phép';
    else if(lv===7) unlock='✨ Phát sáng';
    else if(lv===8) unlock='👑 Vương miện';
    else if(lv===9) unlock='🪽 Đôi cánh';
    else if(lv===10) unlock='🏆 Thần Đồng tối thượng';

    var cls='evo-rm-node';
    if(reached) cls+=' reached';
    if(isCurrent) cls+=' current';
    if(isNext) cls+=' next';

    html+='<div class="'+cls+'" style="--node-color:'+stage.color+'">';

    // Connector line (not for first)
    if(i>0) html+='<div class="evo-rm-line'+(reached?' reached':'')+'"></div>';

    // Art image (show for art milestone levels: 1,2,3,4,5)
    var showArt=(lv<=5);
    html+='<div class="evo-rm-circle'+(showArt?' has-art':'')+'">';
    if(showArt){
      html+='<img src="/'+folder+'/'+id+'_level_'+lv+'.png" class="evo-rm-img'+(reached?'':' locked')+'" />';
    } else {
      html+='<div class="evo-rm-badge" style="background:'+stage.color+'">'+stage.badge+'</div>';
    }
    html+='</div>';

    // Info
    html+='<div class="evo-rm-info">';
    html+='<div class="evo-rm-lv" style="color:'+stage.color+'">Lv.'+lv+'</div>';
    html+='<div class="evo-rm-name">'+stage.badge+' '+stage.title+'</div>';
    html+='<div class="evo-rm-xp">'+(lv===1?'Bắt đầu':xpNeeded+' XP')+'</div>';
    if(unlock) html+='<div class="evo-rm-unlock">'+unlock+'</div>';
    if(isCurrent){
      var nextXP=lv<10?CHAR_LEVELS[lv]:0;
      var prog=lv>=10?100:Math.round(((currentXP-xpNeeded)/Math.max(nextXP-xpNeeded,1))*100);
      html+='<div class="evo-rm-progress"><div class="fill" style="width:'+prog+'%;background:'+stage.color+'"></div></div>';
      html+='<div class="evo-rm-xp-detail">'+currentXP+(lv<10?' / '+nextXP:'')+' XP</div>';
    }
    html+='</div>';
    html+='</div>';
  }
  html+='</div>';
  html+='</div>';
  ov.innerHTML=html;
  ov.addEventListener('click',function(e){if(e.target===ov)ov.remove()});
  document.body.appendChild(ov);
  // Scroll to current level
  setTimeout(function(){
    var cur=ov.querySelector('.evo-rm-node.current');
    if(cur) cur.scrollIntoView({behavior:'smooth',block:'center'});
  },100);
}

// Add CSS for evolution roadmap
(function(){
  var s=document.createElement('style');
  s.textContent='\
.evo-roadmap-overlay{position:fixed;inset:0;z-index:9999;background:rgba(0,0,0,.7);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center;padding:16px;animation:fadeIn .2s}\
.evo-roadmap{background:linear-gradient(170deg,#1b0a3c,#2d1463 40%,#3a1878 70%,#2a1260);border-radius:28px;border:2px solid rgba(255,255,255,.12);max-width:420px;width:100%;max-height:85vh;overflow-y:auto;padding:0;box-shadow:0 8px 0 rgba(0,0,0,.25),0 20px 60px rgba(0,0,0,.5)}\
.evo-rm-header{position:sticky;top:0;z-index:2;background:linear-gradient(180deg,#2d1463,#2d1463ee,transparent);padding:24px 20px 16px;text-align:center}\
.evo-rm-title{font-family:"Baloo 2",cursive;font-size:22px;font-weight:800;background:linear-gradient(135deg,#ff5a9e,#ffc233,#b44dff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-size:300% 300%;animation:gradShift 4s ease infinite}\
.evo-rm-sub{font-size:13px;color:rgba(255,255,255,.5);font-weight:700;margin-top:2px}\
.evo-rm-close{position:absolute;top:16px;right:16px;width:32px;height:32px;border-radius:50%;border:1.5px solid rgba(255,255,255,.15);background:rgba(255,255,255,.06);color:rgba(255,255,255,.6);font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center}\
.evo-rm-close:active{transform:scale(.9)}\
.evo-rm-path{padding:0 20px 28px;display:flex;flex-direction:column;gap:0}\
.evo-rm-node{display:flex;align-items:center;gap:14px;padding:12px 0;position:relative;opacity:.5;transition:all .3s}\
.evo-rm-node.reached{opacity:.75}\
.evo-rm-node.current{opacity:1;transform:scale(1.02)}\
.evo-rm-node.next{opacity:.85}\
.evo-rm-line{position:absolute;left:30px;top:-8px;width:3px;height:16px;background:rgba(255,255,255,.1);border-radius:2px}\
.evo-rm-line.reached{background:var(--node-color,#b44dff);box-shadow:0 0 8px var(--node-color,#b44dff)}\
.evo-rm-circle{width:60px;height:60px;min-width:60px;border-radius:50%;background:rgba(255,255,255,.06);border:2.5px solid rgba(255,255,255,.1);display:flex;align-items:center;justify-content:center;overflow:hidden;flex-shrink:0;position:relative}\
.evo-rm-node.reached .evo-rm-circle{border-color:var(--node-color,#b44dff);box-shadow:0 0 12px rgba(180,77,255,.2)}\
.evo-rm-node.current .evo-rm-circle{border-color:var(--node-color);box-shadow:0 0 20px var(--node-color),0 0 40px rgba(180,77,255,.15);animation:pulse 2s ease-in-out infinite}\
@keyframes pulse{0%,100%{box-shadow:0 0 20px var(--node-color,#b44dff),0 0 40px rgba(180,77,255,.15)}50%{box-shadow:0 0 30px var(--node-color,#b44dff),0 0 60px rgba(180,77,255,.3)}}\
.evo-rm-circle.has-art{border-radius:16px;width:64px;height:64px;min-width:64px}\
.evo-rm-img{width:56px;height:56px;object-fit:contain;filter:drop-shadow(0 2px 4px rgba(0,0,0,.3))}\
.evo-rm-img.locked{filter:brightness(.3) grayscale(1);opacity:.5}\
.evo-rm-badge{width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:20px}\
.evo-rm-info{flex:1;min-width:0}\
.evo-rm-lv{font-size:11px;font-weight:800;text-transform:uppercase;letter-spacing:1px}\
.evo-rm-name{font-size:15px;font-weight:800;color:#fff}\
.evo-rm-xp{font-size:11px;color:rgba(255,255,255,.4);font-weight:700}\
.evo-rm-unlock{font-size:12px;font-weight:800;color:#ffc233;margin-top:2px;text-shadow:0 0 8px rgba(255,194,51,.4)}\
.evo-rm-progress{height:6px;background:rgba(255,255,255,.08);border-radius:3px;margin-top:4px;overflow:hidden}\
.evo-rm-progress .fill{height:100%;border-radius:3px;transition:width .5s}\
.evo-rm-xp-detail{font-size:10px;color:rgba(255,255,255,.35);font-weight:700;margin-top:2px}\
.evo-rm-node.current .evo-rm-name{text-shadow:0 0 12px var(--node-color,#b44dff)}\
.evo-rm-node.next .evo-rm-circle{border-style:dashed;border-color:var(--node-color);animation:nextPulse 3s ease-in-out infinite}\
@keyframes nextPulse{0%,100%{opacity:.6}50%{opacity:1}}\
@media(min-width:768px){.evo-roadmap{max-width:480px;border-radius:32px}.evo-rm-header{padding:28px 24px 20px}.evo-rm-title{font-size:26px}.evo-rm-circle{width:72px;height:72px;min-width:72px}.evo-rm-circle.has-art{width:76px;height:76px;min-width:76px}.evo-rm-img{width:66px;height:66px}.evo-rm-name{font-size:17px}.evo-rm-path{padding:0 24px 32px}}\
.cp-roadmap-btns{display:flex;gap:8px;margin-top:8px;flex-wrap:wrap;justify-content:center}\
.cp-roadmap-btn{padding:7px 14px;border-radius:20px;border:1.5px solid rgba(255,255,255,.1);background:rgba(255,255,255,.05);color:rgba(255,255,255,.7);font-size:12px;font-weight:800;font-family:"Nunito",sans-serif;cursor:pointer;transition:all .15s;box-shadow:0 2px 0 rgba(0,0,0,.15)}\
.cp-roadmap-btn:hover{background:rgba(255,255,255,.1);color:#fff;border-color:var(--btn-c,#b44dff);box-shadow:0 0 12px var(--btn-c,rgba(180,77,255,.3))}\
.cp-roadmap-btn:active{transform:translateY(2px);box-shadow:none}\
';
  document.head.appendChild(s);
})();

// ============ RADAR CHART ============
function drawRadarChart(){
  var c=document.getElementById('chartRadar');if(!c)return;
  var dpr=window.devicePixelRatio||1;
  var sz=Math.min(c.getBoundingClientRect().width,200)||200;
  c.width=sz*dpr;c.height=sz*dpr;c.style.width=sz+'px';c.style.height=sz+'px';
  var ctx=c.getContext('2d');ctx.scale(dpr,dpr);
  var cx=sz/2,cy=sz/2,maxR=sz/2-20;
  var maxLv=GC.maxSkillLevel||5;
  // Calculate per-subject mastery
  var vals=SUBJECTS.map(function(sub){
    var total=0,sum=0;
    sub.skills.forEach(function(sk){
      total++;
      var pr=D.sp[sk.id];
      sum+=pr?Math.min(pr.level/maxLv,1):0;
    });
    return total>0?sum/total:0;
  });
  var n=vals.length;if(n<3)return;
  var colors=['#ff5a9e','#2ddba6','#3dc2ff','#ffc233','#b44dff'];
  // Draw grid
  for(var ring=1;ring<=4;ring++){
    ctx.beginPath();
    for(var i=0;i<=n;i++){
      var angle=(-Math.PI/2)+(i%n)*(2*Math.PI/n);
      var r=maxR*(ring/4);
      var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
      if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
    }
    ctx.closePath();ctx.strokeStyle='rgba(255,255,255,'+(ring===4?'.12':'.06')+')';ctx.stroke();
  }
  // Axes
  for(var i=0;i<n;i++){
    var angle=(-Math.PI/2)+i*(2*Math.PI/n);
    ctx.beginPath();ctx.moveTo(cx,cy);
    ctx.lineTo(cx+Math.cos(angle)*maxR,cy+Math.sin(angle)*maxR);
    ctx.strokeStyle='rgba(255,255,255,.08)';ctx.stroke();
  }
  // Data polygon
  ctx.beginPath();
  for(var i=0;i<=n;i++){
    var angle=(-Math.PI/2)+(i%n)*(2*Math.PI/n);
    var r=maxR*Math.max(vals[i%n],0.05);
    var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
    if(i===0)ctx.moveTo(x,y);else ctx.lineTo(x,y);
  }
  ctx.closePath();ctx.fillStyle='rgba(180,77,255,.2)';ctx.fill();
  ctx.strokeStyle='rgba(180,77,255,.8)';ctx.lineWidth=2;ctx.stroke();
  // Data points + labels
  for(var i=0;i<n;i++){
    var angle=(-Math.PI/2)+i*(2*Math.PI/n);
    var r=maxR*Math.max(vals[i],0.05);
    var x=cx+Math.cos(angle)*r,y=cy+Math.sin(angle)*r;
    ctx.beginPath();ctx.arc(x,y,4,0,Math.PI*2);ctx.fillStyle=colors[i%colors.length];ctx.fill();
    // Label
    var lx=cx+Math.cos(angle)*(maxR+14),ly=cy+Math.sin(angle)*(maxR+14);
    ctx.fillStyle='rgba(255,255,255,.6)';ctx.font='bold 10px Nunito';ctx.textAlign='center';ctx.textBaseline='middle';
    ctx.fillText(SUBJECTS[i].emoji,lx,ly);
  }
}
// ============ CALENDAR HEATMAP ============
function drawHeatmap(){
  var c=document.getElementById('chartHeatmap');if(!c)return;
  var dpr=window.devicePixelRatio||1;
  var w=c.getBoundingClientRect().width||300,h=100;
  c.width=w*dpr;c.height=h*dpr;c.style.height=h+'px';
  var ctx=c.getContext('2d');ctx.scale(dpr,dpr);
  if(!D.dailyLog)D.dailyLog={};
  var days=90;var cellSz=Math.floor((w-30)/Math.ceil(days/7))-1;
  if(cellSz<6)cellSz=6;if(cellSz>12)cellSz=12;
  var gap=1;var cols=Math.ceil(days/7);
  // Find max questions for color scale
  var maxQ=1;
  for(var i=0;i<days;i++){
    var d=new Date(Date.now()-(days-1-i)*864e5);
    var key=d.toISOString().slice(0,10);
    var log=D.dailyLog[key];
    if(log&&log.q>maxQ)maxQ=log.q;
  }
  // Draw cells
  for(var i=0;i<days;i++){
    var d=new Date(Date.now()-(days-1-i)*864e5);
    var key=d.toISOString().slice(0,10);
    var log=D.dailyLog[key];
    var q=log?log.q:0;
    var col=Math.floor(i/7);var row=i%7;
    var x=col*(cellSz+gap)+16;var y=row*(cellSz+gap)+14;
    var intensity=q>0?0.2+0.8*(q/maxQ):0;
    ctx.fillStyle=q>0?'rgba(45,219,166,'+intensity+')':'rgba(255,255,255,.04)';
    roundRect(ctx,x,y,cellSz,cellSz,2);ctx.fill();
  }
  // Month labels
  ctx.fillStyle='rgba(255,255,255,.3)';ctx.font='8px Nunito';ctx.textAlign='left';
  var months=['T1','T2','T3','T4','T5','T6','T7','T8','T9','T10','T11','T12'];
  var lastMonth=-1;
  for(var i=0;i<days;i+=7){
    var d=new Date(Date.now()-(days-1-i)*864e5);
    var m=d.getMonth();
    if(m!==lastMonth){lastMonth=m;
      var col=Math.floor(i/7);
      ctx.fillText(months[m],col*(cellSz+gap)+16,10);
    }
  }
}
// ============ BADGE CABINET ============
function renderBadgeCabinet(){
  var el=document.getElementById('badgeCabinet');if(!el)return;
  var html='<div class="badge-tabs">';
  var tiers=['Tất cả','🥉','🥈','🥇','💎','👑'];
  tiers.forEach(function(t,i){
    html+='<button class="badge-tab'+(i===0?' active':'')+'" onclick="filterBadges('+i+',this)">'+t+'</button>';
  });
  html+='</div><div class="badge-list" id="badgeList">';
  html+=ACH_DEFS.map(function(a){
    var tier=getAchTier(a.id);
    var val=a.val();var nextReq=tier<5?a.ck(tier):a.ck(4);
    var prog=tier<5?Math.min(100,Math.round(val/Math.max(nextReq,1)*100)):100;
    return '<div class="badge-card" data-tier="'+tier+'">'+
      '<div class="badge-icon">'+a.em+'</div>'+
      '<div class="badge-info">'+
        '<div class="badge-name">'+a.nm+'</div>'+
        '<div class="badge-tier-row">'+(tier>0?ACH_TIERS.slice(0,tier).join(''):'🔒 Chưa mở')+'</div>'+
        (tier<5?'<div class="badge-next">Tiếp: '+a.ck(tier)+' (đang: '+val+')</div>':
          '<div class="badge-next" style="color:var(--gold)">✅ Hoàn thành!</div>')+
        '<div class="badge-prog"><div class="fill" style="width:'+prog+'%"></div></div>'+
      '</div>'+
    '</div>';
  }).join('');
  html+='</div>';
  el.innerHTML=html;
}
function filterBadges(tier,btn){
  btn.parentElement.querySelectorAll('.badge-tab').forEach(function(b){b.classList.remove('active')});
  btn.classList.add('active');
  document.querySelectorAll('.badge-card').forEach(function(c){
    if(tier===0)c.style.display='';
    else c.style.display=parseInt(c.dataset.tier)>=tier?'':'none';
  });
}

// ============ SHOP ============
var SHOP_ITEMS=[
  {id:'freeze',name:'Streak Freeze',desc:'Bảo vệ streak 1 ngày',price:100,gem:10,cat:'consumable',emoji:'🧊',max:5},
  {id:'hint',name:'Hint Token',desc:'Hiện đáp án 3 giây',price:50,gem:5,cat:'consumable',emoji:'💡',max:10},
  {id:'x2xp',name:'2x XP (1h)',desc:'Nhân đôi XP 1 giờ',price:200,gem:20,cat:'consumable',emoji:'⚡',max:3},
  {id:'frame_star',name:'Khung Ngôi Sao',desc:'Khung avatar lấp lánh',price:0,gem:100,cat:'frame',emoji:'⭐',max:1},
  {id:'frame_fire',name:'Khung Lửa',desc:'Khung avatar rực lửa',price:0,gem:200,cat:'frame',emoji:'🔥',max:1},
  {id:'frame_rain',name:'Khung Cầu Vồng',desc:'Khung avatar cầu vồng',price:0,gem:500,cat:'frame',emoji:'🌈',max:1},
  {id:'title_smart',name:'Danh Hiệu: Thông Minh',desc:'Hiện dưới tên',price:200,gem:0,cat:'title',emoji:'🧠',max:1},
  {id:'title_fire',name:'Danh Hiệu: Lửa Chiến',desc:'Hiện dưới tên',price:300,gem:0,cat:'title',emoji:'🔥',max:1},
  {id:'title_king',name:'Danh Hiệu: Vua Học Giỏi',desc:'Hiện dưới tên',price:0,gem:300,cat:'title',emoji:'👑',max:1},
];
function getOwnedCount(id){if(!D.inventory)D.inventory=[];return D.inventory.filter(function(x){return x===id}).length}
function buyItem(id,useGem){
  var item=SHOP_ITEMS.find(function(x){return x.id===id});if(!item)return;
  if(!D.inventory)D.inventory=[];if(!D.coins)D.coins=0;
  var owned=getOwnedCount(id);
  if(owned>=item.max){renderShop();return}
  if(useGem){
    if(!item.gem||D.gems<item.gem)return;
    D.gems-=item.gem;
  }else{
    if(!item.price||D.coins<item.price)return;
    D.coins-=item.price;
  }
  D.inventory.push(id);
  // Apply consumables immediately
  if(id==='freeze'){if(!D.streakFreeze)D.streakFreeze=0;D.streakFreeze++}
  if(id==='x2xp')D.x2xp=true;
  sndCorrect();save();updateUI();renderShop();
}
function equipItem(id){
  if(!D.equipped)D.equipped={frame:null,title:null};
  var item=SHOP_ITEMS.find(function(x){return x.id===id});if(!item)return;
  if(item.cat==='frame')D.equipped.frame=D.equipped.frame===id?null:id;
  if(item.cat==='title')D.equipped.title=D.equipped.title===id?null:id;
  sndTap();save();renderShop();
}
function renderShop(){
  var el=document.getElementById('shopContent');if(!el)return;
  if(!D.coins)D.coins=0;if(!D.inventory)D.inventory=[];if(!D.equipped)D.equipped={frame:null,title:null};
  var html='<div class="shop-balance">'+
    '<div class="shop-bal-item"><span>🪙</span><span class="shop-bal-num" style="color:var(--gold)">'+D.coins+'</span></div>'+
    '<div class="shop-bal-item"><span>💎</span><span class="shop-bal-num" style="color:var(--purple)">'+D.gems+'</span></div>'+
  '</div>';
  var cats=[{id:'consumable',name:'🧪 Vật phẩm'},{id:'frame',name:'🖼️ Khung Avatar'},{id:'title',name:'🏷️ Danh Hiệu'}];
  cats.forEach(function(cat){
    var items=SHOP_ITEMS.filter(function(x){return x.cat===cat.id});
    if(items.length===0)return;
    html+='<div class="shop-cat-title">'+cat.name+'</div>';
    html+=items.map(function(item){
      var owned=getOwnedCount(item.id);
      var maxed=owned>=item.max;
      var isEquipped=D.equipped.frame===item.id||D.equipped.title===item.id;
      var canCoin=item.price>0&&D.coins>=item.price&&!maxed;
      var canGem=item.gem>0&&D.gems>=item.gem&&!maxed;
      return '<div class="shop-item'+(maxed?' owned':'')+(isEquipped?' equipped':'')+'">'+
        '<div class="shop-item-icon">'+item.emoji+'</div>'+
        '<div class="shop-item-info">'+
          '<div class="shop-item-name">'+item.name+'</div>'+
          '<div class="shop-item-desc">'+item.desc+'</div>'+
        '</div>'+
        '<div class="shop-item-actions">'+
          (maxed?(item.cat==='frame'||item.cat==='title'?
            '<button class="shop-equip-btn'+(isEquipped?' active':'')+'" onclick="equipItem(\''+item.id+'\')">'+(isEquipped?'✅':'Đeo')+'</button>':
            '<span class="shop-owned">✅</span>'):
            (item.price>0?'<button class="shop-buy-btn'+(canCoin?'':' disabled')+'" onclick="buyItem(\''+item.id+'\',false)">🪙'+item.price+'</button>':'')+
            (item.gem>0?'<button class="shop-buy-btn gem'+(canGem?'':' disabled')+'" onclick="buyItem(\''+item.id+'\',true)">💎'+item.gem+'</button>':''))+
        '</div></div>';
    }).join('');
  });
  el.innerHTML=html;
}

// ============ SETTINGS ============
function renderSettings(){
  if(!D.settings)D.settings={diffMode:'auto',qPerRound:10,timerOn:true};
  var s=D.settings;
  var sndOn=sndEnabled();
  var el=document.getElementById('settingsContent');if(!el)return;
  el.innerHTML=
    '<div class="set-group"><div class="set-title">🎮 Cài đặt Học tập</div>'+
    '<div class="set-row"><span class="set-lbl">🔊 Âm thanh</span><button class="set-toggle '+(sndOn?'on':'')+'" onclick="toggleSound(this)">'+(sndOn?'BẬT':'TẮT')+'</button></div>'+
    '<div class="set-row"><span class="set-lbl">🎙️ Giọng nói</span><button class="set-toggle '+(voiceEnabled()?'on':'')+'" onclick="toggleVoice(this)">'+(voiceEnabled()?'BẬT':'TẮT')+'</button></div>'+
    '<div class="set-row"><span class="set-lbl">📖 Đọc đề bài</span><button class="set-toggle '+(voiceReadEnabled()?'on':'')+'" onclick="toggleVoiceRead(this)">'+(voiceReadEnabled()?'BẬT':'TẮT')+'</button></div>'+
    '<div class="set-row"><span class="set-lbl">⏱️ Đồng hồ</span><button class="set-toggle '+(s.timerOn!==false?'on':'')+'" onclick="toggleTimer(this)">'+(s.timerOn!==false?'BẬT':'TẮT')+'</button></div>'+
    '<div class="set-row"><span class="set-lbl">📝 Số câu/lượt</span><div class="set-pills">'+
      [5,10,15,20].map(function(n){return '<button class="set-pill '+(s.qPerRound===n?'active':'')+'" onclick="setQPerRound('+n+',this)">'+n+'</button>'}).join('')+
    '</div></div>'+
    '<div class="set-row"><span class="set-lbl">🎯 Độ khó</span><div class="set-pills">'+
      '<button class="set-pill '+(s.diffMode==='auto'?'active':'')+'" onclick="setDiffMode(\'auto\',this)">Tự động</button>'+
      '<button class="set-pill '+(s.diffMode==='manual'?'active':'')+'" onclick="setDiffMode(\'manual\',this)">Thủ công</button>'+
    '</div></div>'+
    (s.diffMode==='manual'?'<div class="set-row"><span class="set-lbl">📊 Mức '+DIFF_NAMES[getDifficulty()-1]+'</span><div class="set-pills">'+
      [1,2,3,4,5].map(function(n){return '<button class="set-pill '+(getDifficulty()===n?'active':'')+'" style="'+(getDifficulty()===n?'background:'+DIFF_COLORS[n-1]+';border-color:'+DIFF_COLORS[n-1]:'')+'" onclick="setDiffLevel('+n+',this)">'+n+'</button>'}).join('')+
    '</div></div>':'')+
    '</div>'+
    '<div class="set-group"><div class="set-title">👤 Tài khoản</div>'+
    '<div class="set-row"><span class="set-lbl">📛 Tên</span><div style="display:flex;gap:6px;flex:1;justify-content:flex-end">'+
      '<input id="setName" class="set-input" value="'+getPlayerName()+'" maxlength="20">'+
      '<button class="set-btn" onclick="saveName()">Lưu</button></div></div>'+
    '<div class="set-row"><span class="set-lbl">🔑 Mật khẩu</span><button class="set-btn" onclick="showChangePass()">Đổi</button></div>'+
    '</div>'+
    '<div class="set-group"><div class="set-title">👨‍👩‍👧 Phụ huynh</div>'+
    '<div class="set-row"><span class="set-lbl">📊 Xem báo cáo</span><button class="set-btn" onclick="switchTab(\'profile\')">Hồ sơ</button></div>'+
    '</div>'+
    '<button class="set-logout" onclick="doLogout()">🚪 Đăng xuất</button>'+
    '<div class="set-ver">Học Bảo v2.0</div>';
}
function toggleSound(btn){
  try{var p=JSON.parse(localStorage.getItem('player_profile'))||{};p.soundEnabled=!sndEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}catch(e){}
  btn.classList.toggle('on');btn.textContent=sndEnabled()?'BẬT':'TẮT';
  if(sndEnabled())sndTap();
}
function toggleVoice(btn){
  try{var p=JSON.parse(localStorage.getItem('player_profile'))||{};p.voiceEnabled=!voiceEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}catch(e){}
  btn.classList.toggle('on');btn.textContent=voiceEnabled()?'BẬT':'TẮT';sndTap();
}
// ============ SOUND FAB (floating corner toggle) ============
var _sfmOpen=false;
function toggleSoundFab(){
  _sfmOpen=!_sfmOpen;
  var menu=document.getElementById('soundFabMenu');
  if(_sfmOpen){
    menu.style.display='block';updateSoundFabStates();
    // Close on outside click
    setTimeout(function(){document.addEventListener('click',_closeSfm,true)},10);
  } else {
    menu.style.display='none';
    document.removeEventListener('click',_closeSfm,true);
  }
}
function _closeSfm(e){
  var fab=document.getElementById('soundFab');
  var menu=document.getElementById('soundFabMenu');
  if(fab&&!fab.contains(e.target)&&menu&&!menu.contains(e.target)){
    _sfmOpen=false;menu.style.display='none';
    document.removeEventListener('click',_closeSfm,true);
  }
}
function toggleSoundFabItem(type){
  try{var p=JSON.parse(localStorage.getItem('player_profile'))||{};
    if(type==='sound'){p.soundEnabled=!sndEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}
    else if(type==='voice'){p.voiceEnabled=!voiceEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}
    else if(type==='read'){p.voiceReadEnabled=!voiceReadEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}
  }catch(e){}
  updateSoundFabStates();
  if(sndEnabled())sndTap();
}
function updateSoundFabStates(){
  var sOn=sndEnabled(),vOn=voiceEnabled(),rOn=voiceReadEnabled();
  var ss=document.getElementById('sfmSound');if(ss){ss.textContent=sOn?'BẬT':'TẮT';ss.className='sfm-state '+(sOn?'on':'off')}
  var sv=document.getElementById('sfmVoice');if(sv){sv.textContent=vOn?'BẬT':'TẮT';sv.className='sfm-state '+(vOn?'on':'off')}
  var sr=document.getElementById('sfmRead');if(sr){sr.textContent=rOn?'BẬT':'TẮT';sr.className='sfm-state '+(rOn?'on':'off')}
  // Update FAB icon
  var fab=document.getElementById('soundFab');
  var icon=document.getElementById('soundFabIcon');
  if(fab&&icon){
    var allOff=!sOn;
    icon.textContent=allOff?'🔇':'🔊';
    fab.classList.toggle('muted',allOff);
  }
}
// Init FAB states on load
setTimeout(function(){try{updateSoundFabStates()}catch(e){}},100);

function toggleVoiceRead(btn){
  try{var p=JSON.parse(localStorage.getItem('player_profile'))||{};p.voiceReadEnabled=!voiceReadEnabled();localStorage.setItem('player_profile',JSON.stringify(p))}catch(e){}
  btn.classList.toggle('on');btn.textContent=voiceReadEnabled()?'BẬT':'TẮT';sndTap();
}
function toggleTimer(btn){
  if(!D.settings)D.settings={};D.settings.timerOn=!D.settings.timerOn;save();
  btn.classList.toggle('on');btn.textContent=D.settings.timerOn?'BẬT':'TẮT';sndTap();
}
function setQPerRound(n,btn){
  if(!D.settings)D.settings={};D.settings.qPerRound=n;Q_CT=n;save();sndTap();
  btn.parentElement.querySelectorAll('.set-pill').forEach(function(p){p.classList.remove('active')});
  btn.classList.add('active');
}
function setDiffMode(mode,btn){
  if(!D.settings)D.settings={};D.settings.diffMode=mode;save();sndTap();
  renderSettings();
}
function setDiffLevel(n,btn){
  D.difficulty=n;save();sndTap();
  renderSettings();
}
function saveName(){
  var n=document.getElementById('setName').value.trim();if(!n)return;
  try{var p=JSON.parse(localStorage.getItem('player_profile'))||{};p.name=n;PP.name=n;localStorage.setItem('player_profile',JSON.stringify(p))}catch(e){}
  sndCorrect();updateUI();
}
function showChangePass(){
  var el=document.getElementById('settingsContent');if(!el)return;
  el.innerHTML=
    '<div class="set-group"><div class="set-title">🔑 Đổi Mật Khẩu</div>'+
    '<div class="set-field"><label>Mật khẩu hiện tại</label><input type="password" id="cpOld" class="set-input-full"></div>'+
    '<div class="set-field"><label>Mật khẩu mới</label><input type="password" id="cpNew" class="set-input-full"></div>'+
    '<div class="set-field"><label>Xác nhận</label><input type="password" id="cpCfm" class="set-input-full"></div>'+
    '<div id="cpMsg" class="set-msg"></div>'+
    '<div style="display:flex;gap:8px;margin-top:12px">'+
    '<button class="set-btn" onclick="renderSettings()">← Quay lại</button>'+
    '<button class="set-btn pri" onclick="doChangePass()">Đổi mật khẩu</button></div></div>';
}
function doChangePass(){
  var old=document.getElementById('cpOld').value;
  var nw=document.getElementById('cpNew').value;
  var cfm=document.getElementById('cpCfm').value;
  var msg=document.getElementById('cpMsg');
  if(!old||!nw){msg.textContent='Nhập đầy đủ!';msg.style.color='var(--coral)';return}
  if(nw.length<6){msg.textContent='Mật khẩu mới tối thiểu 6 ký tự';msg.style.color='var(--coral)';return}
  if(nw!==cfm){msg.textContent='Xác nhận không khớp!';msg.style.color='var(--coral)';return}
  var user=localStorage.getItem('voicon_user');
  if(!user){msg.textContent='Cần đăng nhập để đổi!';msg.style.color='var(--coral)';return}
  msg.textContent='Đang xử lý...';msg.style.color='var(--gold)';
  fetch('/api/auth',{
    method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({action:'change-password',username:user,password:old,new_password:nw})
  }).then(function(r){return r.json().then(function(d){return{ok:r.ok,data:d}})}).then(function(res){
    if(!res.ok){msg.textContent=res.data.error||'Lỗi!';msg.style.color='var(--coral)';return}
    msg.textContent='✅ Đổi thành công!';msg.style.color='var(--mint)';sndCorrect();
  }).catch(function(e){msg.textContent='Lỗi: '+e.message;msg.style.color='var(--coral)'});
}
function doLogout(){
  if(!confirm('Đăng xuất? Dữ liệu đã lưu trên cloud sẽ được giữ lại.'))return;
  try{localStorage.removeItem('player_profile');localStorage.removeItem('voicon_user');
    document.cookie='logged_in=;expires=Thu,01 Jan 1970 00:00:00 GMT;path=/';
    document.cookie='guest_mode=;expires=Thu,01 Jan 1970 00:00:00 GMT;path=/';}catch(e){}
  window.location.href='/login';
}

function roundRect(ctx,x,y,w,h,r){
  if(h<=0)return;if(r>h/2)r=h/2;
  ctx.beginPath();ctx.moveTo(x+r,y);ctx.lineTo(x+w-r,y);ctx.quadraticCurveTo(x+w,y,x+w,y+r);
  ctx.lineTo(x+w,y+h-r);ctx.quadraticCurveTo(x+w,y+h,x+w-r,y+h);
  ctx.lineTo(x+r,y+h);ctx.quadraticCurveTo(x,y+h,x,y+h-r);
  ctx.lineTo(x,y+r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.closePath();
}

// ============ SPIN WHEEL (Canvas-based, ticket system) ============
var PRIZES=['\ud83d\udc8e\u00d75','\u2b50\u00d73','\ud83d\udc8e\u00d710','\ud83c\udf9f\ufe0f\u00d71','\ud83d\udc8e\u00d72','\u2b50\u00d75','\ud83d\udc8e\u00d720','\ud83c\udf40 May m\u1eafn'];
var PRIZE_COLORS=['#b44dff','#ff5a9e','#3dc2ff','#ffc233','#8b5cf6','#2ddba6','#ff6b7a','#e040a0'];
var _spinning=false;
function sndSpin(){for(var i=0;i<8;i++)tone(400+i*80,.05,'sine',.1,i*.08)}
function sndJackpot(){var n=[523,659,784,1047,1319,1568,1760,2093];for(var i=0;i<n.length;i++)tone(n[i],.15,'triangle',.3,i*.1)}

function exchangeStars(){
  if(D.stars<3||_spinning)return;
  D.stars-=3;if(!D.tickets)D.tickets=0;D.tickets++;sndCorrect();save();updateUI();drawWheel();
}

function drawWheel(){
  var c=document.getElementById('wheelCanvas');if(!c)return;
  var sz=Math.round(c.getBoundingClientRect().width)||220;
  if(c.width!==sz){c.width=sz;c.height=sz}
  var ctx=c.getContext('2d');
  var cx=sz/2,cy=sz/2,r=sz/2-5,n=PRIZES.length;
  ctx.clearRect(0,0,sz,sz);
  for(var i=0;i<n;i++){
    var a1=(i/n)*Math.PI*2-Math.PI/2,a2=((i+1)/n)*Math.PI*2-Math.PI/2;
    ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,a1,a2);ctx.closePath();
    ctx.fillStyle=PRIZE_COLORS[i];ctx.fill();
    ctx.strokeStyle='rgba(255,255,255,.2)';ctx.lineWidth=2;ctx.stroke();
    ctx.save();ctx.translate(cx,cy);ctx.rotate((a1+a2)/2);
    ctx.textAlign='center';ctx.fillStyle='#fff';
    var fs=Math.max(9,Math.round(sz/17));ctx.font='bold '+fs+'px Nunito';
    ctx.shadowColor='rgba(0,0,0,.3)';ctx.shadowBlur=3;
    ctx.fillText(PRIZES[i],r*.55,3);ctx.restore();
  }
  // Center circle
  var cr=Math.max(10,Math.round(sz/15));
  ctx.beginPath();ctx.arc(cx,cy,cr,0,Math.PI*2);
  ctx.fillStyle='#fff';ctx.fill();
  ctx.strokeStyle='rgba(255,255,255,.8)';ctx.lineWidth=3;ctx.stroke();
  ctx.fillStyle='#ffc233';ctx.font='bold '+Math.round(cr*.9)+'px Baloo 2';ctx.textAlign='center';
  ctx.fillText('\ud83c\udf1f',cx,cy+4);

  var btn=document.getElementById('spinBtn');
  if(btn){btn.disabled=!D.tickets||D.tickets<=0;btn.textContent=D.tickets>0?'\ud83c\udfb0 QUAY! ('+D.tickets+' v\u00e9)':'\ud83c\udf9f\ufe0f H\u1ebft v\u00e9 - \u0110\u1ed5i sao!'}
  var exSt=document.getElementById('exStars');if(exSt)exSt.textContent=D.stars;
  var exBtn=document.getElementById('exBtn');if(exBtn)exBtn.disabled=D.stars<3||_spinning;
  // Render mascot
  var sm=document.getElementById('spinMascot');
  if(sm)sm.innerHTML='<div style="display:flex;align-items:flex-end;justify-content:center;gap:4px">'+UNhi(60)+CSvg(50)+'</div>';
  // Render reward history
  if(!D.rewardHistory)D.rewardHistory=[];
  var rl=document.getElementById('rewardList');
  if(rl){
    if(D.rewardHistory.length===0)rl.innerHTML='<div class="rw-empty">Ch\u01b0a c\u00f3 ph\u1ea7n th\u01b0\u1edfng. Quay th\u1eed nh\u00e9! \ud83c\udfa1</div>';
    else rl.innerHTML=D.rewardHistory.slice(-20).reverse().map(function(rr){
      var d=new Date(rr.date);var ds=d.getDate()+'/'+(d.getMonth()+1)+' '+d.getHours()+':'+('0'+d.getMinutes()).slice(-2);
      return '<div class="rw-item"><span class="rw-nm">'+rr.prize+'</span><span class="rw-dt">'+ds+'</span></div>';
    }).join('');
  }
  updateUI();
}

function renderWheel(){drawWheel()}

function spinWheel(){
  if(_spinning||!D.tickets||D.tickets<=0)return;
  _spinning=true;if(!D.tickets)D.tickets=0;D.tickets--;save();sndSpin();sndTap();
  var btn=document.getElementById('spinBtn');btn.disabled=true;btn.textContent='\ud83c\udf00 \u0110ang quay...';
  var res=document.getElementById('spinResult');if(res)res.textContent='';
  var c=document.getElementById('wheelCanvas');
  var prize=R(0,PRIZES.length-1);
  var segAngle=360/PRIZES.length;
  var targetAngle=360*5+(360-prize*segAngle)-R(5,Math.floor(segAngle)-5);
  var currentAngle=0,duration=3000,start=Date.now();
  function animate(){
    var elapsed=Date.now()-start;var progress=Math.min(elapsed/duration,1);
    var eased=1-Math.pow(1-progress,3);
    currentAngle=targetAngle*eased;
    c.style.transform='rotate('+currentAngle+'deg)';
    if(progress<1)requestAnimationFrame(animate);
    else{
      _spinning=false;
      var p=PRIZES[prize];var msg='';
      if(p.indexOf('\ud83d\udc8e')>=0){var nn=parseInt(p.match(/\d+/)[0]);D.gems+=nn;msg='+'+nn+' \ud83d\udc8e Gems!'}
      else if(p.indexOf('\u2b50')>=0){var nn2=parseInt(p.match(/\d+/)[0]);D.stars+=nn2;msg='+'+nn2+' \u2b50 Sao!'}
      else if(p.indexOf('\ud83c\udf9f')>=0){D.tickets++;msg='+1 \ud83c\udf9f\ufe0f V\u00e9 quay!'}
      else{D.gems+=3;msg='\ud83c\udf40 +3 \ud83d\udc8e May m\u1eafn!'}
      _ga('spin_wheel',{prize:msg});
      if(!D.rewardHistory)D.rewardHistory=[];
      D.rewardHistory.push({prize:msg,date:new Date().toISOString()});
      if(D.rewardHistory.length>50)D.rewardHistory=D.rewardHistory.slice(-50);
      save();updateUI();
      if(res)res.textContent=msg;
      // Mascot reaction
      var sm=document.getElementById('spinMascot');
      if(sm)sm.innerHTML='<div class="corgi-happy" style="display:flex;align-items:flex-end;justify-content:center;gap:4px">'+UNhi(60)+CSvg(50)+'</div>';
      sndJackpot();spawnConfetti();
      // Update daily mission for spin
      try{var ms=getDaily();ms.forEach(function(m){if(m.i==='sp'&&m.p<m.t)m.p++});ms.forEach(function(m){if(m.p>=m.t&&!m.cl){m.cl=true;D.gems+=m.r;sndCorrect()}});save()}catch(e){}
      setTimeout(function(){btn.disabled=!D.tickets||D.tickets<=0;drawWheel()},2000);
    }
  }
  animate();
}

// ============ GEM EXCHANGE (10💎 = 1000 VNĐ, min 1000💎 to request) ============
var GEM_RATE=GC.gemRate||100;
var GEM_MIN=GC.gemMinExchange||1000;

function updateGemExchange(){
  var bal=document.getElementById('gemBal');if(!bal)return;
  bal.textContent=D.gems;
  var vnd=D.gems*GEM_RATE;
  document.getElementById('gemVnd').textContent=vnd.toLocaleString('vi-VN');
  var prog=Math.min(100,D.gems/GEM_MIN*100);
  document.getElementById('gemProgFill').style.width=prog+'%';
  document.getElementById('gemProgNum').textContent=D.gems;
  // Update gem stats card
  var exchanged=0;
  if(D.exchanges)D.exchanges.forEach(function(ex){if(ex.status!=='rejected')exchanged+=ex.gems});
  var total=D.gems+exchanged;
  var gc=document.getElementById('gemCurrent');if(gc)gc.textContent=D.gems;
  var ge=document.getElementById('gemExchanged');if(ge)ge.textContent=exchanged;
  var gt=document.getElementById('gemTotal');if(gt)gt.textContent=total;
  var btn=document.getElementById('btnExchange');
  btn.disabled=D.gems<GEM_MIN;
  btn.textContent=D.gems>=GEM_MIN?'\ud83c\udfe6 \u0110\u1ed5i '+D.gems+'\ud83d\udc8e = '+(D.gems*GEM_RATE).toLocaleString('vi-VN')+' VN\u0110':'\ud83d\udc8e C\u1ea7n '+GEM_MIN+' \ud83d\udc8e \u0111\u1ec3 \u0111\u1ed5i ti\u1ec1n';
  // Render exchange history
  if(!D.exchanges)D.exchanges=[];
  var eh=document.getElementById('exchangeHistory');
  if(eh&&D.exchanges.length>0){
    eh.innerHTML='<h4>\ud83d\udcdc L\u1ecbch s\u1eed \u0111\u1ed5i ti\u1ec1n</h4>'+D.exchanges.slice(-10).reverse().map(function(ex){
      var d=new Date(ex.date);var ds=d.getDate()+'/'+(d.getMonth()+1)+'/'+d.getFullYear();
      var stColor=ex.status==='pending'?'var(--gold)':ex.status==='done'?'var(--mint)':'var(--coral)';
      var stText=ex.status==='pending'?'\u23f3 Ch\u1edd duy\u1ec7t':ex.status==='done'?'\u2705 \u0110\u00e3 nh\u1eadn':'\u274c T\u1eeb ch\u1ed1i';
      return '<div class="ex-item"><span class="ex-amt">'+ex.gems+'\ud83d\udc8e = '+ex.vnd.toLocaleString('vi-VN')+'VN\u0110</span><span class="ex-st" style="color:'+stColor+'">'+stText+'</span><span class="ex-dt">'+ds+'</span></div>';
    }).join('');
  }
}

function requestExchange(){
  if(D.gems<GEM_MIN)return;
  sndStar();
  var gems=D.gems;
  var vnd=gems*GEM_RATE;
  if(!D.exchanges)D.exchanges=[];
  D.exchanges.push({
    id:Date.now(),
    gems:gems,
    vnd:vnd,
    date:new Date().toISOString(),
    status:'pending'
  });
  D.gems=0;
  save();
  var msg=document.getElementById('exchangeMsg');
  msg.innerHTML='<span style="color:var(--mint)">\u2705 Y\u00eau c\u1ea7u \u0111\u1ed5i '+gems+'\ud83d\udc8e = '+vnd.toLocaleString('vi-VN')+' VN\u0110 th\u00e0nh c\u00f4ng! Ch\u1edd ba m\u1eb9 duy\u1ec7t nh\u00e9!</span>';
  spawnConfetti();
  updateUI();updateGemExchange();
  // Also save to cloud
  try{window.dispatchEvent(new CustomEvent('game-save'))}catch(e){}
}

// ============ CONFETTI ============
function spawnConfetti(){var c=document.getElementById('confetti');c.innerHTML='';var cols=['#fbbf24','#ff6b9d','#c084fc','#38bdf8','#34d399','#fb7185'];for(var i=0;i<40;i++){var p=document.createElement('div');p.className='conf';p.style.left=R(0,100)+'%';p.style.background=cols[R(0,5)];p.style.setProperty('--del',(R(0,20)/10)+'s');p.style.setProperty('--dur',(R(20,40)/10)+'s');p.style.width=R(6,10)+'px';p.style.height=R(6,10)+'px';p.style.borderRadius=Math.random()>.5?'50%':'2px';c.appendChild(p)}setTimeout(function(){c.innerHTML=''},4000)}

// ============ SPARKLE BURST ============
function spawnSparkleBurst(x,y,count){
  var wrap=document.createElement('div');wrap.className='sparkle-burst';
  wrap.style.left=x+'px';wrap.style.top=y+'px';
  var cols=['#ffc233','#ff5a9e','#b44dff','#3dc2ff','#2ddba6'];
  count=count||12;
  for(var i=0;i<count;i++){
    var p=document.createElement('div');p.className='sb-particle';
    var angle=(Math.PI*2/count)*i+Math.random()*.5;
    var dist=R(30,70);
    p.style.setProperty('--sb-x',Math.round(Math.cos(angle)*dist)+'px');
    p.style.setProperty('--sb-y',Math.round(Math.sin(angle)*dist)+'px');
    p.style.background=cols[R(0,cols.length-1)];
    p.style.animationDelay=(i*20)+'ms';
    var sz=R(4,10);p.style.width=sz+'px';p.style.height=sz+'px';
    wrap.appendChild(p);
  }
  document.body.appendChild(wrap);
  setTimeout(function(){wrap.remove()},1000);
}

// ============ STAR FLY TO TARGET ============
function spawnStarFly(fromX,fromY,targetSelector,emoji){
  emoji=emoji||'\u2b50';
  var el=document.createElement('div');el.className='star-fly';el.textContent=emoji;
  el.style.left=fromX+'px';el.style.top=fromY+'px';
  // Find target position
  var tgt=document.querySelector(targetSelector);
  var tx=window.innerWidth/2,ty=50;
  if(tgt){var r=tgt.getBoundingClientRect();tx=r.left+r.width/2;ty=r.top+r.height/2}
  var dx=tx-fromX,dy=ty-fromY;
  el.style.setProperty('--fly-x',Math.round(dx)+'px');
  el.style.setProperty('--fly-y',Math.round(dy)+'px');
  el.style.setProperty('--fly-dur',(.5+Math.random()*.3)+'s');
  document.body.appendChild(el);
  setTimeout(function(){el.remove()},1200);
}

// ============ COMBO FIRE ============
function spawnComboFire(n){
  var wrap=document.createElement('div');wrap.className='combo-fire';
  wrap.style.left='50%';wrap.style.bottom='100px';
  var cols=['#ff6b00','#ff3d00','#ffab00','#ff5722','#ffc107'];
  var count=Math.min(n*3,20);
  for(var i=0;i<count;i++){
    var p=document.createElement('div');p.className='fire-particle';
    var sz=R(4,12);p.style.width=sz+'px';p.style.height=sz+'px';
    p.style.background=cols[R(0,cols.length-1)];
    p.style.left=R(-40,40)+'px';
    p.style.bottom='0';
    p.style.setProperty('--fire-y','-'+R(30,80)+'px');
    p.style.setProperty('--fire-dur',(.3+Math.random()*.4)+'s');
    p.style.animationDelay=(i*30)+'ms';
    wrap.appendChild(p);
  }
  document.body.appendChild(wrap);
  setTimeout(function(){wrap.remove()},1200);
}

// ============ SCREEN SHAKE ============
function screenShake(){
  var ga=document.querySelector('.game-area');
  if(!ga)return;
  ga.classList.remove('screen-shake');
  requestAnimationFrame(function(){ga.classList.add('screen-shake')});
  setTimeout(function(){ga.classList.remove('screen-shake')},350);
}

// ============ LEVEL COMPLETE FLASH ============
function levelFlash(){
  var f=document.createElement('div');f.className='level-flash';
  document.body.appendChild(f);
  setTimeout(function(){f.remove()},600);
}

// ============ INIT ============
(function(){
  try{
  var se=document.getElementById('sparkles');
  if(se)for(var i=0;i<15;i++){var s=document.createElement('div');s.className='sparkle';s.style.left=R(0,100)+'%';s.style.top=R(0,100)+'%';s.style.setProperty('--dur',R(30,60)/10+'s');s.style.setProperty('--delay',R(0,40)/10+'s');s.style.background=['#fbbf24','#ff6b9d','#c084fc','#38bdf8'][R(0,3)];se.appendChild(s)}
  var fs=document.getElementById('floatingStars');
  var emojis=['\u2b50','\u2728','\ud83c\udf1f','\ud83d\udcab','\u2b50','\u2728','\ud83c\udf1f','\ud83d\udcab'];
  if(fs)for(var j=0;j<emojis.length;j++){var st=document.createElement('div');st.className='fstar';st.textContent=emojis[j];st.style.left=R(5,95)+'%';st.style.top=R(5,85)+'%';st.style.setProperty('--dur',R(30,60)/10+'s');st.style.setProperty('--del',R(0,30)/10+'s');fs.appendChild(st)}
  var ss=document.getElementById('splashScene');
  if(ss)ss.innerHTML='<div style="display:flex;align-items:flex-end;justify-content:center;gap:8px"><div class="bounce-in" style="animation-delay:.2s;animation:bounceIn .8s .2s cubic-bezier(.34,1.56,.64,1) both,float 3s 1s ease-in-out infinite">'+UNhi(130)+'</div><div class="bounce-in" style="animation:bounceIn .8s .4s cubic-bezier(.34,1.56,.64,1) both,float 3s 1.3s ease-in-out infinite">'+CSvg(100)+'</div></div>';
  // Set dynamic grade name on splash
  var sgn=document.getElementById('splashGradeName');if(sgn&&GC.gradeName)sgn.textContent=GC.gradeName+' \u2014 To\u00e1n \u00b7 Ti\u1ebfng Vi\u1ec7t \u00b7 English';
  // Set dynamic player name
  var pn=getPlayerName();
  var sn=document.getElementById('splashName');if(sn)sn.textContent=pn+' & '+PP.pet.charAt(0).toUpperCase()+PP.pet.slice(1);
  // Letter pop animation for splash title
  var splashTitle=document.querySelector('.splash-title');
  if(splashTitle){
    var txt=splashTitle.textContent||'';
    splashTitle.innerHTML='';splashTitle.classList.add('letter-pop');
    for(var li=0;li<txt.length;li++){
      var sp=document.createElement('span');
      sp.textContent=txt[li]===' '?'\u00a0':txt[li];
      sp.style.animationDelay=(li*0.04)+'s';
      splashTitle.appendChild(sp);
    }
  }
  // Sparkle burst on splash after characters land
  setTimeout(function(){
    try{spawnSparkleBurst(window.innerWidth/2,window.innerHeight*0.4,16)}catch(e){}
  },900);
  var dg=document.getElementById('dailyGreet');if(dg)dg.textContent='Hoàn thành để nhận quà, '+pn+'!';
  var pt=document.getElementById('profTopName');if(pt)pt.textContent='\ud83d\udc64 '+pn;
  var pnm=document.getElementById('profName');if(pnm)pnm.textContent=pn;
  checkStreak();updateUI();
  }catch(e){}
})();
