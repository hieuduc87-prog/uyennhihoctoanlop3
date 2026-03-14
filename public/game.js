// ============ CORGI SVG ============
function CSvg(sz,mood,tail){
  if(!sz)sz=100;if(!mood)mood='happy';if(tail===undefined)tail=true;
  var w=sz;
  var eyeMap={
    happy:'<ellipse cx="'+w*.38+'" cy="'+w*.38+'" rx="'+w*.045+'" ry="'+w*.055+'" fill="#2d1b69"/><ellipse cx="'+w*.62+'" cy="'+w*.38+'" rx="'+w*.045+'" ry="'+w*.055+'" fill="#2d1b69"/><circle cx="'+w*.39+'" cy="'+w*.37+'" r="'+w*.015+'" fill="#fff"/><circle cx="'+w*.63+'" cy="'+w*.37+'" r="'+w*.015+'" fill="#fff"/>',
    excited:'<ellipse cx="'+w*.38+'" cy="'+w*.38+'" rx="'+w*.05+'" ry="'+w*.06+'" fill="#2d1b69"/><ellipse cx="'+w*.62+'" cy="'+w*.38+'" rx="'+w*.05+'" ry="'+w*.06+'" fill="#2d1b69"/><circle cx="'+w*.395+'" cy="'+w*.365+'" r="'+w*.02+'" fill="#fff"/><circle cx="'+w*.635+'" cy="'+w*.365+'" r="'+w*.02+'" fill="#fff"/>',
    sad:'<path d="M'+w*.35+' '+w*.4+'Q'+w*.38+' '+w*.35+' '+w*.41+' '+w*.4+'" stroke="#2d1b69" stroke-width="'+w*.02+'" fill="none" stroke-linecap="round"/><path d="M'+w*.59+' '+w*.4+'Q'+w*.62+' '+w*.35+' '+w*.65+' '+w*.4+'" stroke="#2d1b69" stroke-width="'+w*.02+'" fill="none" stroke-linecap="round"/>',
    love:'<text x="'+w*.35+'" y="'+w*.41+'" font-size="'+w*.1+'" text-anchor="middle">\u2665</text><text x="'+w*.65+'" y="'+w*.41+'" font-size="'+w*.1+'" text-anchor="middle">\u2665</text>'
  };
  var mouthMap={
    happy:'<path d="M'+w*.42+' '+w*.48+'Q'+w*.5+' '+w*.56+' '+w*.58+' '+w*.48+'" stroke="#2d1b69" stroke-width="'+w*.015+'" fill="none" stroke-linecap="round"/>',
    excited:'<ellipse cx="'+w*.5+'" cy="'+w*.5+'" rx="'+w*.06+'" ry="'+w*.04+'" fill="#2d1b69"/>',
    sad:'<path d="M'+w*.43+' '+w*.52+'Q'+w*.5+' '+w*.47+' '+w*.57+' '+w*.52+'" stroke="#2d1b69" stroke-width="'+w*.015+'" fill="none" stroke-linecap="round"/>',
    love:'<path d="M'+w*.42+' '+w*.48+'Q'+w*.5+' '+w*.57+' '+w*.58+' '+w*.48+'" stroke="#2d1b69" stroke-width="'+w*.015+'" fill="#fda4af" stroke-linecap="round"/>'
  };
  var m=eyeMap[mood]?mood:'happy';
  var tl=tail?'<ellipse cx="'+w*.82+'" cy="'+w*.55+'" rx="'+w*.08+'" ry="'+w*.04+'" fill="#f59e0b" transform="rotate(-30 '+w*.82+' '+w*.55+')"><animateTransform attributeName="transform" type="rotate" values="-30 '+w*.82+' '+w*.55+';-10 '+w*.82+' '+w*.55+';-30 '+w*.82+' '+w*.55+'" dur=".4s" repeatCount="indefinite"/></ellipse>':'';
  var bl=(m==='happy'||m==='excited'||m==='love')?'<ellipse cx="'+w*.3+'" cy="'+w*.46+'" rx="'+w*.04+'" ry="'+w*.02+'" fill="#fda4af" opacity=".6"/><ellipse cx="'+w*.7+'" cy="'+w*.46+'" rx="'+w*.04+'" ry="'+w*.02+'" fill="#fda4af" opacity=".6"/>':'';
  return '<svg viewBox="0 0 '+w+' '+w+'" width="'+w+'" height="'+w+'" xmlns="http://www.w3.org/2000/svg">'
    +'<ellipse cx="'+w*.28+'" cy="'+w*.25+'" rx="'+w*.1+'" ry="'+w*.13+'" fill="#d97706" transform="rotate(-15 '+w*.28+' '+w*.25+')"/>'
    +'<ellipse cx="'+w*.28+'" cy="'+w*.25+'" rx="'+w*.065+'" ry="'+w*.09+'" fill="#fbbf24" transform="rotate(-15 '+w*.28+' '+w*.25+')"/>'
    +'<ellipse cx="'+w*.72+'" cy="'+w*.25+'" rx="'+w*.1+'" ry="'+w*.13+'" fill="#d97706" transform="rotate(15 '+w*.72+' '+w*.25+')"/>'
    +'<ellipse cx="'+w*.72+'" cy="'+w*.25+'" rx="'+w*.065+'" ry="'+w*.09+'" fill="#fbbf24" transform="rotate(15 '+w*.72+' '+w*.25+')"/>'
    +'<ellipse cx="'+w*.5+'" cy="'+w*.65+'" rx="'+w*.35+'" ry="'+w*.25+'" fill="#f59e0b"/>'
    +'<ellipse cx="'+w*.5+'" cy="'+w*.68+'" rx="'+w*.28+'" ry="'+w*.18+'" fill="#fde68a"/>'
    +'<ellipse cx="'+w*.3+'" cy="'+w*.85+'" rx="'+w*.07+'" ry="'+w*.06+'" fill="#d97706"/>'
    +'<ellipse cx="'+w*.7+'" cy="'+w*.85+'" rx="'+w*.07+'" ry="'+w*.06+'" fill="#d97706"/>'
    +'<ellipse cx="'+w*.38+'" cy="'+w*.87+'" rx="'+w*.06+'" ry="'+w*.05+'" fill="#d97706"/>'
    +'<ellipse cx="'+w*.62+'" cy="'+w*.87+'" rx="'+w*.06+'" ry="'+w*.05+'" fill="#d97706"/>'
    +tl
    +'<ellipse cx="'+w*.5+'" cy="'+w*.4+'" rx="'+w*.26+'" ry="'+w*.22+'" fill="#f59e0b"/>'
    +'<path d="M'+w*.35+' '+w*.38+'Q'+w*.5+' '+w*.3+' '+w*.65+' '+w*.38+'Q'+w*.65+' '+w*.55+' '+w*.5+' '+w*.58+'Q'+w*.35+' '+w*.55+' '+w*.35+' '+w*.38+'Z" fill="#fff"/>'
    +'<ellipse cx="'+w*.5+'" cy="'+w*.44+'" rx="'+w*.035+'" ry="'+w*.025+'" fill="#2d1b69"/>'
    +eyeMap[m]+mouthMap[m]+bl+'</svg>';
}

// ============ DATA ============
var SK='uynhi3sub_v1';
var D=load();
function def(){return{level:1,xp:0,stars:0,gems:0,streak:0,lastPlay:null,sp:{},ach:{},daily:{date:null,m:[]},tc:0,tp:0,combo:0,mc:0,ct:0}}
function load(){try{var d=JSON.parse(localStorage.getItem(SK));if(d&&d.level)return d}catch(e){}return def()}
function save(){
  try{localStorage.setItem(SK,JSON.stringify(D))}catch(e){}
  try{window.dispatchEvent(new CustomEvent('game-save'))}catch(e){}
}
function resetProgress(){if(confirm('Xo\u00e1 to\u00e0n b\u1ed9?')){D=def();save();updateUI();renderGrid()}}

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

// ============ TOÁN SKILLS ============
var MATH_SKILLS=[
  {id:'m_add',name:'Ph\u00e9p C\u1ed9ng',emoji:'\u2795',color:'rgba(52,211,153,.2)',gen:function(l){var rg=[[10,99],[50,499],[100,999],[500,4999],[1000,9999]];var p=rg[Math.min(l-1,4)];var a=R(p[0],p[1]),b=R(p[0],p[1]);return MQ(a+' + '+b+' = ?',a+b,'T\u00ednh t\u1ed5ng')}},
  {id:'m_sub',name:'Ph\u00e9p Tr\u1eeb',emoji:'\u2796',color:'rgba(56,189,248,.2)',gen:function(l){var rg=[[10,99],[50,499],[100,999],[500,4999],[1000,9999]];var p=rg[Math.min(l-1,4)];var a=R(p[0],p[1]),b=R(p[0],p[1]);if(a<b){var t=a;a=b;b=t}return MQ(a+' \u2212 '+b+' = ?',a-b,'T\u00ednh hi\u1ec7u')}},
  {id:'m_mul',name:'Ph\u00e9p Nh\u00e2n',emoji:'\u2716\ufe0f',color:'rgba(255,107,157,.2)',gen:function(l){if(l<=2){var a=R(2,9),b=R(2,9);return MQ(a+' \u00d7 '+b+' = ?',a*b)}if(l<=3){var a=R(11,99),b=R(2,9);return MQ(a+' \u00d7 '+b+' = ?',a*b)}var a=R(100,999),b=R(2,9);return MQ(a+' \u00d7 '+b+' = ?',a*b)}},
  {id:'m_div',name:'Ph\u00e9p Chia',emoji:'\u2797',color:'rgba(192,132,252,.2)',gen:function(l){if(l<=2){var b=R(2,9),a=R(2,9);return MQ((b*a)+' : '+b+' = ?',a)}var b=R(2,9),a=R(10,99);return MQ((b*a)+' : '+b+' = ?',a)}},
  {id:'m_tbl',name:'B\u1ea3ng C\u1eedu Ch\u01b0\u01a1ng',emoji:'\ud83d\udcca',color:'rgba(251,191,36,.2)',gen:function(l){var ts=l<=2?[2,3,4,5]:[2,3,4,5,6,7,8,9];var t=ts[R(0,ts.length-1)],n=R(1,10);return Math.random()>.5?MQ(t+' \u00d7 '+n+' = ?',t*n):MQ((t*n)+' : '+t+' = ?',n)}},
  {id:'m_expr',name:'Bi\u1ec3u Th\u1ee9c',emoji:'\ud83e\uddee',color:'rgba(251,113,133,.2)',gen:function(l){if(l<=2){var b=R(2,5),c=R(2,5),a=R(1,20);return MQ(a+' + '+b+' \u00d7 '+c+' = ?',a+b*c,'Nh\u00e2n tr\u01b0\u1edbc')}var a=R(2,10),b=R(2,10),c=R(2,5);return MQ('('+a+' + '+b+') \u00d7 '+c+' = ?',(a+b)*c,'Ngo\u1eb7c tr\u01b0\u1edbc')}},
  {id:'m_word',name:'To\u00e1n \u0110\u1ed1',emoji:'\ud83d\udcdd',color:'rgba(251,191,36,.2)',gen:function(l){var tpl=[function(){var a=R(50,200),b=R(10,a-1);return MQ('Nhi c\u00f3 '+a+' vi\u00ean k\u1eb9o \ud83c\udf6c\nCho b\u1ea1n '+b+' vi\u00ean\nC\u00f2n l\u1ea1i?',a-b)},function(){var e=R(2,9),n=R(3,9);return MQ(n+' h\u1ed9p, m\u1ed7i h\u1ed9p '+e+' b\u00e1nh \ud83e\uddc1\nT\u1ed5ng = ?',e*n)},function(){var w=R(3,12),h=R(3,12);return MQ('HCN d\u00e0i '+h+'cm r\u1ed9ng '+w+'cm\nChu vi = ?',(h+w)*2,'(d\u00e0i+r\u1ed9ng)\u00d72')}];return tpl[R(0,tpl.length-1)]()}},
  {id:'m_geo',name:'H\u00ecnh H\u1ecdc',emoji:'\ud83d\udcd0',color:'rgba(52,211,153,.2)',gen:function(l){if(l<=2){var a=R(3,15);return Math.random()>.5?MQ('HV c\u1ea1nh '+a+'cm\nChu vi = ?',a*4):MQ('HV c\u1ea1nh '+a+'cm\nDi\u1ec7n t\u00edch = ?',a*a)}var d=R(3,12),r=R(2,10);return MQ('HCN '+d+'\u00d7'+r+'cm\nDi\u1ec7n t\u00edch = ?',d*r)}},
  {id:'m_meas',name:'\u0110o L\u01b0\u1eddng',emoji:'\ud83d\udccf',color:'rgba(192,132,252,.2)',gen:function(l){var ts=[function(){var m=R(1,9);return MQ(m+' m = ? cm',m*100)},function(){var k=R(1,9);return MQ(k+' kg = ? g',k*1000)},function(){var a=[1000,2000,5000,10000,20000];var x=a[R(0,4)],y=a[R(0,4)];return MQ(x.toLocaleString()+'\u0111 + '+y.toLocaleString()+'\u0111 = ?',x+y)}];return ts[R(0,ts.length-1)]()}},
  {id:'m_frac',name:'Ph\u00e2n S\u1ed1',emoji:'\ud83c\udf55',color:'rgba(255,107,157,.2)',gen:function(l){var d=R(2,9),t=d*R(2,9);return MQ('1/'+d+' c\u1ee7a '+t+' = ?',t/d)}},
];

// ============ TIẾNG VIỆT SKILLS ============
var VIET_SKILLS=[
  {id:'v_chinh',name:'Ch\u00ednh T\u1ea3',emoji:'\u270d\ufe0f',color:'rgba(56,189,248,.2)',gen:function(l){
    var pairs=[
      ['H\u00e0 N\u1ed9i l\u00e0 ____ \u0111\u00f4 c\u1ee7a Vi\u1ec7t Nam','th\u1ee7',['th\u0169','th\u00fa','th\u1ee5'],'Vi\u1ebft \u0111\u00fang ch\u00ednh t\u1ea3'],
      ['Em \u0111i ____ b\u1eb1ng xe \u0111\u1ea1p','h\u1ecdc',['hoc','h\u1ecdk','h\u1ed9c'],'D\u1ea5u thanh \u0111\u00fang'],
      ['M\u1eb9 ____ c\u01a1m r\u1ea5t ngon','n\u1ea5u',['n\u1ea5o','n\u1ea9u','n\u00e2u'],'Ph\u00e2n bi\u1ec7t u/o'],
      ['Con ____ bay tr\u00ean tr\u1eddi','chim',['trim','jim','ch\u00ecm'],'ch hay tr'],
      ['Nhi ____ s\u00e1ng \u0111i h\u1ecdc','bu\u1ed5i',['bu\u1ed1i','b\u01b0\u1ed5i','bu\u00f4i'],'D\u1ea5u thanh'],
      ['Tr\u1eddi ____ m\u01b0a to qu\u00e1','\u0111ang',['\u0111\u0103ng','\u0111\u00e0ng','dang'],'d hay \u0111'],
      ['Con ____ r\u1ea5t th\u00f4ng minh','m\u00e8o',['m\u00e8a','m\u00e0o','m\u1ebo'],'Nguy\u00ean \u00e2m \u0111\u00fang'],
      ['Hoa ____ r\u1ea5t \u0111\u1eb9p','h\u1ed3ng',['h\u1ed3n','h\u1ed3g','h\u1ed3nng'],'V\u1ea7n \u0111\u00fang'],
      ['C\u00f4 gi\u00e1o ____ b\u00e0i r\u1ea5t hay','d\u1ea1y',['gi\u1ea1y','d\u1eady','gi\u1eady'],'d/gi'],
      ['Con ____ bi\u1ebft b\u01a1i','c\u00e1',['k\u00e1','ca','c\u00e0'],'D\u1ea5u s\u1eafc'],
      ['Em b\u00e9 ng\u1ee7 r\u1ea5t ____','ngoan',['ngoang','ngan','nguan'],'V\u1ea7n oan'],
      ['M\u00f9a ____ tr\u1eddi n\u00f3ng','h\u00e8',['h\u1ebe','h\u1ec1','h\u1eb9'],'D\u1ea5u huy\u1ec1n'],
      ['Tr\u0103ng ____ r\u1ea5t s\u00e1ng','tr\u00f2n',['ch\u00f2n','tr\u00f2ng','tr\u00e0n'],'tr/ch'],
    ];
    var p=pairs[R(0,pairs.length-1)];return TQ(p[0],p[1],p[2],p[3])}},
  {id:'v_tuloai',name:'T\u1eeb Lo\u1ea1i',emoji:'\ud83c\udff7\ufe0f',color:'rgba(255,107,157,.2)',gen:function(l){
    var qs=[
      TQ('T\u1eeb n\u00e0o l\u00e0 DANH T\u1eea?','b\u00e0n gh\u1ebf',['ch\u1ea1y nh\u1ea3y','r\u1ea5t \u0111\u1eb9p','nhanh ch\u00f3ng'],'Ch\u1ec9 s\u1ef1 v\u1eadt'),
      TQ('T\u1eeb n\u00e0o l\u00e0 \u0110\u1ed8NG T\u1eea?','ch\u1ea1y',['c\u00e1i b\u00e0n','xinh \u0111\u1eb9p','nhanh'],'Ch\u1ec9 h\u00e0nh \u0111\u1ed9ng'),
      TQ('T\u1eeb n\u00e0o l\u00e0 T\u00cdNH T\u1eea?','xinh \u0111\u1eb9p',['c\u00e1i gh\u1ebf','\u0111i h\u1ecdc','\u0103n c\u01a1m'],'Ch\u1ec9 \u0111\u1eb7c \u0111i\u1ec3m'),
      TQ('"M\u1eb9 n\u1ea5u c\u01a1m"\n\u0110\u1ed9ng t\u1eeb l\u00e0 g\u00ec?','n\u1ea5u',['m\u1eb9','c\u01a1m','r\u1ea5t']),
      TQ('"Con m\u00e8o r\u1ea5t d\u1ec5 th\u01b0\u01a1ng"\nT\u00ednh t\u1eeb l\u00e0?','d\u1ec5 th\u01b0\u01a1ng',['con m\u00e8o','r\u1ea5t','l\u00e0']),
      TQ('T\u1eeb n\u00e0o ch\u1ec9 S\u1ef0 V\u1eacT?','ng\u00f4i tr\u01b0\u1eddng',['h\u1ecdc gi\u1ecfi','r\u1ea5t to','\u0111i nhanh']),
      TQ('T\u1eeb n\u00e0o l\u00e0 \u0110\u1ed8NG T\u1eea?','vi\u1ebft',['quy\u1ec3n v\u1edf','\u0111\u1eb9p','nhanh']),
      TQ('"B\u00f4ng hoa \u0111\u1ecf r\u1ef1c"\nT\u00ednh t\u1eeb l\u00e0?','\u0111\u1ecf r\u1ef1c',['b\u00f4ng hoa','l\u00e0','c\u00f3']),
      TQ('T\u1eeb n\u00e0o l\u00e0 DANH T\u1eea?','th\u1ea7y gi\u00e1o',['d\u1ea1y h\u1ecdc','gi\u1ecfi giang','lu\u00f4n lu\u00f4n']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_cautruc',name:'C\u00e2u & D\u1ea5u C\u00e2u',emoji:'\u2753',color:'rgba(192,132,252,.2)',gen:function(l){
    var qs=[
      TQ('Cu\u1ed1i c\u00e2u h\u1ecfi d\u00f9ng d\u1ea5u g\u00ec?','D\u1ea5u ch\u1ea5m h\u1ecfi (?)',['D\u1ea5u ch\u1ea5m (.)','D\u1ea5u ph\u1ea9y (,)','D\u1ea5u ch\u1ea5m than (!)'],'C\u00e2u h\u1ecfi \u2192 ?'),
      TQ('Cu\u1ed1i c\u00e2u k\u1ec3 d\u00f9ng d\u1ea5u g\u00ec?','D\u1ea5u ch\u1ea5m (.)',['D\u1ea5u h\u1ecfi (?)','D\u1ea5u ph\u1ea9y (,)','D\u1ea5u hai ch\u1ea5m (:)']),
      TQ('Cu\u1ed1i c\u00e2u c\u1ea3m th\u00e1n d\u00f9ng d\u1ea5u?','D\u1ea5u ch\u1ea5m than (!)',['D\u1ea5u ch\u1ea5m (.)','D\u1ea5u h\u1ecfi (?)','D\u1ea5u ph\u1ea9y (,)']),
      TQ('"B\u1ea1n t\u00ean l\u00e0 g\u00ec__"\n\u0110i\u1ec1n d\u1ea5u?','d\u1ea5u h\u1ecfi (?)',['d\u1ea5u ch\u1ea5m (.)','d\u1ea5u ph\u1ea9y (,)','d\u1ea5u than (!)']),
      TQ('C\u00e2u n\u00e0o \u0111\u00fang?','Em \u0111i h\u1ecdc.',['em \u0111i h\u1ecdc','Em \u0111i h\u1ecdc','em \u0110i H\u1ecdc.']),
      TQ('C\u00e2u n\u00e0o l\u00e0 c\u00e2u h\u1ecfi?','B\u1ea1n \u0111i \u0111\u00e2u?',['B\u1ea1n \u0111i h\u1ecdc.','\u0110i h\u1ecdc th\u00f4i!','M\u00ecnh \u0111i ch\u01a1i.']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_tuvung',name:'T\u1eeb V\u1ef1ng',emoji:'\ud83d\udcda',color:'rgba(251,191,36,.2)',gen:function(l){
    var qs=[
      TQ('T\u1eeb tr\u00e1i ngh\u0129a v\u1edbi "n\u00f3ng"?','l\u1ea1nh',['\u1ea5m','m\u00e1t','n\u1ef1c']),
      TQ('T\u1eeb tr\u00e1i ngh\u0129a v\u1edbi "cao"?','th\u1ea5p',['l\u00f9n','to','nh\u1ecf']),
      TQ('T\u1eeb \u0111\u1ed3ng ngh\u0129a v\u1edbi "vui"?','h\u1ea1nh ph\u00fac',['bu\u1ed3n','gi\u1eadn','s\u1ee3']),
      TQ('T\u1eeb tr\u00e1i ngh\u0129a v\u1edbi "kho\u1ebb"?','y\u1ebfu',['m\u1ea1nh','nhanh','gi\u1ecfi']),
      TQ('T\u1eeb \u0111\u1ed3ng ngh\u0129a v\u1edbi "\u0111\u1eb9p"?','xinh',['x\u1ea5u','t\u1ed1t','gi\u1ecfi']),
      TQ('T\u1eeb tr\u00e1i ngh\u0129a v\u1edbi "d\u00e0i"?','ng\u1eafn',['r\u1ed9ng','h\u1eb9p','to']),
      TQ('T\u1eeb n\u00e0o c\u00f9ng nh\u00f3m:\nm\u00e8o, ch\u00f3, g\u00e0, ___?','th\u1ecf',['b\u00e0n','c\u00e2y','s\u00e1ch']),
      TQ('T\u1eeb tr\u00e1i ngh\u0129a v\u1edbi "s\u00e1ng"?','t\u1ed1i',['\u0111\u00eam','m\u1edd','tr\u01b0a']),
      TQ('"Ch\u0103m ch\u1ec9" tr\u00e1i ngh\u0129a l\u00e0?','l\u01b0\u1eddi bi\u1ebfng',['si\u00eang n\u0103ng','c\u1ea7n c\u00f9','gi\u1ecfi giang']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_bienphat',name:'Bi\u1ec7n Ph\u00e1p TT',emoji:'\ud83c\udfa8',color:'rgba(52,211,153,.2)',gen:function(l){
    var qs=[
      TQ('"M\u1eb7t tr\u1eddi \u0111\u1ecf nh\u01b0 qu\u1ea3 b\u00f3ng"\nBi\u1ec7n ph\u00e1p g\u00ec?','So s\u00e1nh',['Nh\u00e2n ho\u00e1','\u1ea8n d\u1ee5','\u0110i\u1ec7p t\u1eeb'],'C\u00f3 t\u1eeb "nh\u01b0"'),
      TQ('"\u00d4ng m\u1eb7t tr\u1eddi th\u1ee9c d\u1eady"\nBi\u1ec7n ph\u00e1p g\u00ec?','Nh\u00e2n ho\u00e1',['So s\u00e1nh','\u1ea8n d\u1ee5','\u0110i\u1ec7p t\u1eeb'],'Cho v\u1eadt l\u00e0m ng\u01b0\u1eddi'),
      TQ('"Tr\u1ebb em nh\u01b0 b\u00fap tr\u00ean c\u00e0nh"\nBi\u1ec7n ph\u00e1p?','So s\u00e1nh',['Nh\u00e2n ho\u00e1','\u1ea8n d\u1ee5','Ho\u00e1n d\u1ee5']),
      TQ('"D\u00f2ng s\u00f4ng u\u1ed1n m\u00ecnh"\nBi\u1ec7n ph\u00e1p?','Nh\u00e2n ho\u00e1',['So s\u00e1nh','\u1ea8n d\u1ee5','\u0110i\u1ec7p t\u1eeb']),
      TQ('So s\u00e1nh th\u01b0\u1eddng d\u00f9ng t\u1eeb?','nh\u01b0, gi\u1ed1ng nh\u01b0',['v\u00e0, v\u1edbi','nh\u01b0ng, m\u00e0','v\u00ec, n\u00ean']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_dien',name:'\u0110i\u1ec1n T\u1eeb',emoji:'\u270f\ufe0f',color:'rgba(56,189,248,.2)',gen:function(l){
    var qs=[
      TQ('____ \u01a1i, cho con \u0111i h\u1ecdc!','M\u1eb9',['C\u00e2y','S\u00e1ch','B\u00e0n']),
      TQ('Con chim ____ tr\u00ean c\u00e0nh c\u00e2y','h\u00f3t',['bay','\u0103n','ng\u1ee7']),
      TQ('\u00d4ng m\u1eb7t ____ chi\u1ebfu s\u00e1ng','tr\u1eddi',['tr\u0103ng','n\u01b0\u1edbc','\u0111\u1ea5t']),
      TQ('M\u00f9a xu\u00e2n ____ n\u1edf r\u1ea5t \u0111\u1eb9p','hoa',['l\u00e1','gi\u00f3','m\u01b0a']),
      TQ('Em ____ b\u00e0i r\u1ea5t ch\u0103m ch\u1ec9','h\u1ecdc',['\u0103n','ch\u01a1i','ng\u1ee7']),
      TQ('Con m\u00e8o ____ chu\u1ed9t r\u1ea5t gi\u1ecfi','b\u1eaft',['\u0103n','u\u1ed1ng','h\u00e1t']),
      TQ('D\u00f2ng ____ ch\u1ea3y hi\u1ec1n ho\u00e0','s\u00f4ng',['su\u1ed1i','bi\u1ec3n','ao']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_thanhphan',name:'Th\u00e0nh Ph\u1ea7n C\u00e2u',emoji:'\ud83d\udd0d',color:'rgba(192,132,252,.2)',gen:function(l){
    var qs=[
      TQ('"B\u1ea1n Lan ch\u1ea1y r\u1ea5t nhanh"\nCh\u1ee7 ng\u1eef l\u00e0?','B\u1ea1n Lan',['ch\u1ea1y','r\u1ea5t nhanh','nhanh']),
      TQ('"Con m\u00e8o ng\u1ee7 tr\u00ean gh\u1ebf"\nV\u1ecb ng\u1eef l\u00e0?','ng\u1ee7 tr\u00ean gh\u1ebf',['con m\u00e8o','tr\u00ean gh\u1ebf','con']),
      TQ('"Em \u0111i h\u1ecdc"\nCh\u1ee7 ng\u1eef l\u00e0?','Em',['\u0111i','h\u1ecdc','\u0111i h\u1ecdc']),
      TQ('"M\u1eb9 n\u1ea5u c\u01a1m r\u1ea5t ngon"\nV\u1ecb ng\u1eef?','n\u1ea5u c\u01a1m r\u1ea5t ngon',['M\u1eb9','c\u01a1m','ngon']),
      TQ('Ch\u1ee7 ng\u1eef tr\u1ea3 l\u1eddi c\u00e2u h\u1ecfi?','Ai? C\u00e1i g\u00ec?',['L\u00e0m g\u00ec?','\u1ede \u0111\u00e2u?','Khi n\u00e0o?']),
    ];return qs[R(0,qs.length-1)]}},
  {id:'v_sapxep',name:'S\u1eafp X\u1ebfp C\u00e2u',emoji:'\ud83d\udd00',color:'rgba(251,191,36,.2)',gen:function(l){
    var qs=[
      TQ('S\u1eafp x\u1ebfp:\n"h\u1ecdc / Em / gi\u1ecfi / r\u1ea5t"','Em h\u1ecdc r\u1ea5t gi\u1ecfi',['H\u1ecdc Em r\u1ea5t gi\u1ecfi','Gi\u1ecfi r\u1ea5t Em h\u1ecdc','R\u1ea5t gi\u1ecfi h\u1ecdc Em']),
      TQ('S\u1eafp x\u1ebfp:\n"\u0111\u1eb9p / Hoa / r\u1ea5t / h\u1ed3ng"','Hoa h\u1ed3ng r\u1ea5t \u0111\u1eb9p',['R\u1ea5t \u0111\u1eb9p hoa h\u1ed3ng','\u0110\u1eb9p r\u1ea5t hoa h\u1ed3ng','H\u1ed3ng hoa r\u1ea5t \u0111\u1eb9p']),
      TQ('S\u1eafp x\u1ebfp:\n"\u0103n / Con / c\u1ecf / b\u00f2"','Con b\u00f2 \u0103n c\u1ecf',['C\u1ecf \u0103n con b\u00f2','\u0102n c\u1ecf con b\u00f2','B\u00f2 con \u0103n c\u1ecf']),
      TQ('S\u1eafp x\u1ebfp:\n"bay / Chim / tr\u1eddi / tr\u00ean"','Chim bay tr\u00ean tr\u1eddi',['Bay chim tr\u00ean tr\u1eddi','Tr\u1eddi tr\u00ean chim bay','Tr\u00ean tr\u1eddi bay chim']),
    ];return qs[R(0,qs.length-1)]}},
];

// ============ ENGLISH SKILLS ============
var ENG_SKILLS=[
  {id:'e_vocab',name:'Vocabulary',emoji:'\ud83d\udd24',color:'rgba(167,139,250,.2)',gen:function(l){
    var qs=[TQ('\ud83d\udc31 = ?','cat',['dog','bird','fish']),TQ('\ud83d\udc15 = ?','dog',['cat','duck','pig']),TQ('\ud83c\udf4e = ?','apple',['banana','orange','grape']),TQ('\ud83c\udf1e = ?','sun',['moon','star','cloud']),TQ('\ud83c\udfe0 = ?','house',['school','park','store']),TQ('\ud83d\udcda = ?','book',['pen','desk','chair']),TQ('\ud83d\ude97 = ?','car',['bus','bike','train']),TQ('\ud83c\udf38 = ?','flower',['tree','grass','leaf']),TQ('\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67 = ?','family',['friend','teacher','student']),TQ('\ud83c\udfeb = ?','school',['house','shop','park']),TQ('\ud83d\udc1f = ?','fish',['bird','cat','frog']),TQ('\ud83c\udf19 = ?','moon',['sun','star','cloud']),TQ('\u270f\ufe0f = ?','pencil',['book','ruler','eraser']),TQ('\ud83d\udc5f = ?','shoes',['hat','shirt','pants']),TQ('\ud83c\udf4c = ?','banana',['apple','mango','grape'])];return qs[R(0,qs.length-1)]}},
  {id:'e_colors',name:'Colors & Numbers',emoji:'\ud83c\udfa8',color:'rgba(255,107,157,.2)',gen:function(l){
    var qs=[TQ('\ud83d\udd34 What color?','red',['blue','green','yellow']),TQ('\ud83d\udd35 What color?','blue',['red','pink','green']),TQ('\ud83d\udc9a What color?','green',['blue','red','yellow']),TQ('\ud83d\udc9b What color?','yellow',['orange','red','green']),TQ('How many: \u2b50\u2b50\u2b50\u2b50\u2b50?','five',['four','six','three']),TQ('How many: \ud83c\udf4e\ud83c\udf4e\ud83c\udf4e?','three',['two','four','five']),TQ('What comes after "seven"?','eight',['six','nine','ten']),TQ('How many: \ud83d\udc31\ud83d\udc31\ud83d\udc31\ud83d\udc31?','four',['three','five','six']),TQ('\ud83d\udfe3 What color?','purple',['pink','blue','red'])];return qs[R(0,qs.length-1)]}},
  {id:'e_greet',name:'Greetings',emoji:'\ud83d\udc4b',color:'rgba(251,191,36,.2)',gen:function(l){
    var qs=[TQ('"Good morning" means?','Ch\u00e0o bu\u1ed5i s\u00e1ng',['Ch\u00e0o bu\u1ed5i t\u1ed1i','T\u1ea1m bi\u1ec7t','C\u1ea3m \u01a1n']),TQ('How to say "T\u1ea1m bi\u1ec7t"?','Goodbye',['Hello','Sorry','Thanks']),TQ('"Thank you" means?','C\u1ea3m \u01a1n',['Xin l\u1ed7i','Xin ch\u00e0o','T\u1ea1m bi\u1ec7t']),TQ('How to say "Xin l\u1ed7i"?','Sorry',['Thank you','Hello','Goodbye']),TQ('"How are you?" means?','B\u1ea1n kho\u1ebb kh\u00f4ng?',['B\u1ea1n \u1edf \u0111\u00e2u?','B\u1ea1n t\u00ean g\u00ec?','B\u1ea1n bao tu\u1ed5i?']),TQ('Reply: "How are you?"','I\'m fine',['I\'m Nhi','I\'m 8','I\'m a girl']),TQ('"Good night" means?','Ch\u00fac ng\u1ee7 ngon',['Ch\u00e0o bu\u1ed5i s\u00e1ng','C\u1ea3m \u01a1n','T\u1ea1m bi\u1ec7t'])];return qs[R(0,qs.length-1)]}},
  {id:'e_animals',name:'Animals',emoji:'\ud83d\udc3e',color:'rgba(52,211,153,.2)',gen:function(l){
    var qs=[TQ('A cat says...','Meow',['Woof','Moo','Quack']),TQ('A dog says...','Woof',['Meow','Moo','Baa']),TQ('Which animal can fly?','bird',['fish','cat','dog']),TQ('Which lives in water?','fish',['cat','bird','cow']),TQ('\ud83d\udc04 in English?','cow',['pig','horse','sheep']),TQ('\ud83d\udc37 in English?','pig',['cow','dog','duck']),TQ('\ud83d\udc34 in English?','horse',['cow','donkey','goat']),TQ('Which is biggest?','elephant',['cat','dog','rabbit']),TQ('\ud83d\udc12 in English?','monkey',['mouse','rabbit','bear']),TQ('Which has feathers?','chicken',['dog','cat','fish'])];return qs[R(0,qs.length-1)]}},
  {id:'e_family',name:'Family',emoji:'\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',color:'rgba(56,189,248,.2)',gen:function(l){
    var qs=[TQ('"M\u1eb9" in English?','mother',['father','sister','brother']),TQ('"B\u1ed1" in English?','father',['mother','uncle','grandpa']),TQ('"Anh/ch\u1ecb" in English?','brother/sister',['mother/father','uncle/aunt','friend']),TQ('"\u00d4ng" in English?','grandfather',['grandmother','father','uncle']),TQ('"B\u00e0" in English?','grandmother',['grandfather','mother','aunt']),TQ('My mom\'s mom is my...','grandmother',['mother','aunt','sister']),TQ('"B\u1ea1n" in English?','friend',['brother','family','teacher'])];return qs[R(0,qs.length-1)]}},
  {id:'e_grammar',name:'Grammar',emoji:'\ud83d\udcdd',color:'rgba(192,132,252,.2)',gen:function(l){
    var qs=[TQ('"I ___ a student"','am',['is','are','be']),TQ('"She ___ happy"','is',['am','are','be']),TQ('"They ___ playing"','are',['is','am','was']),TQ('"He ___ to school"','goes',['go','going','gone']),TQ('"I have ___ apple"','an',['a','the','some']),TQ('"This is ___ book"','a',['an','the','some']),TQ('"There ___ two cats"','are',['is','am','was']),TQ('"She ___ like fish"','doesn\'t',['don\'t','isn\'t','aren\'t']),TQ('"___ you like milk?"','Do',['Does','Is','Are'])];return qs[R(0,qs.length-1)]}},
  {id:'e_prepos',name:'Prepositions',emoji:'\ud83d\udccd',color:'rgba(251,191,36,.2)',gen:function(l){
    var qs=[TQ('The cat is ___ the box\n(b\u00ean trong)','in',['on','under','next to']),TQ('The book is ___ the table\n(tr\u00ean)','on',['in','under','behind']),TQ('The dog is ___ the bed\n(d\u01b0\u1edbi)','under',['on','in','next to']),TQ('She stands ___ the door\n(ph\u00eda tr\u01b0\u1edbc)','in front of',['behind','next to','under']),TQ('The cat is ___ the box\n(ph\u00eda sau)','behind',['in front of','in','on'])];return qs[R(0,qs.length-1)]}},
  {id:'e_translate',name:'D\u1ecbch C\u00e2u',emoji:'\ud83c\udf10',color:'rgba(255,107,157,.2)',gen:function(l){
    var qs=[TQ('"I love my family" ngh\u0129a l\u00e0?','Em y\u00eau gia \u0111\u00ecnh',['Em \u0111i h\u1ecdc','Em \u0103n c\u01a1m','Em ch\u01a1i game']),TQ('"The cat is cute" ngh\u0129a l\u00e0?','Con m\u00e8o d\u1ec5 th\u01b0\u01a1ng',['Con ch\u00f3 l\u1edbn','Con c\u00e1 b\u01a1i','Con chim bay']),TQ('D\u1ecbch: "Em \u0111i h\u1ecdc"?','I go to school',['I eat lunch','I play games','I like cats']),TQ('"What is your name?"','B\u1ea1n t\u00ean g\u00ec?',['B\u1ea1n \u1edf \u0111\u00e2u?','B\u1ea1n bao tu\u1ed5i?','B\u1ea1n kho\u1ebb kh\u00f4ng?']),TQ('D\u1ecbch: "Tr\u1eddi \u0111\u1eb9p qu\u00e1"','It\'s beautiful',['I\'m happy','Thank you','Good morning']),TQ('"I am eight years old"?','Em 8 tu\u1ed5i',['Em 8 b\u1ea1n','Em l\u1edbp 8','Em 8 gi\u1edd'])];return qs[R(0,qs.length-1)]}},
];

// ============ ALL SUBJECTS ============
var SUBJECTS=[
  {id:'math',name:'To\u00e1n',emoji:'\ud83d\udd22',skills:MATH_SKILLS,color:'#fb7185'},
  {id:'viet',name:'Ti\u1ebfng Vi\u1ec7t',emoji:'\ud83d\udcd6',skills:VIET_SKILLS,color:'#38bdf8'},
  {id:'eng',name:'English',emoji:'\ud83c\udf0d',skills:ENG_SKILLS,color:'#a78bfa'},
];
var curSubject=0;

// ============ GAME STATE ============
var curSkill=null,curLv=1,questions=[],qIdx=0,correct=0,combo=0,timerInt=null,timeLeft=0;
var TIME_Q=30,Q_CT=10;
var _answered=false;
window.__gameTimerInt=null;

// ============ SCREENS ============
function showScreen(id){
  document.querySelectorAll('.screen').forEach(function(s){s.classList.remove('active')});
  document.getElementById(id).classList.add('active');
  var nav=document.getElementById('bottomNav');
  nav.style.display=['map','daily','profile'].indexOf(id)>=0?'flex':'none';
  var cg=document.getElementById('corgiG');
  if(cg)cg.style.display=id==='game'?'block':'none';
  if(id==='map')renderGrid();if(id==='daily')renderDaily();if(id==='profile')renderProfile();
}
function switchTab(id){
  showScreen(id);
  var tabs=['map','daily','profile'];
  document.querySelectorAll('.nav-item').forEach(function(n,i){n.classList.toggle('active',tabs[i]===id)});
}
function switchSubject(idx){
  curSubject=idx;
  document.querySelectorAll('.subject-tab').forEach(function(t,i){t.classList.toggle('active',i===idx)});
  renderGrid();
}
function startGame(){checkStreak();showScreen('map');document.getElementById('bottomNav').style.display='flex';renderGrid();updateUI()}
function exitGame(){clearInterval(timerInt);showScreen('map')}

// ============ STREAK ============
function checkStreak(){var t=new Date().toDateString();if(D.lastPlay===t)return;var y=new Date(Date.now()-864e5).toDateString();D.lastPlay===y?D.streak++:D.streak=1;D.lastPlay=t;save()}

// ============ UPDATE UI ============
function updateUI(){
  var xpF=D.level*100,p=Math.min(100,D.xp/xpF*100);
  ['','2'].forEach(function(s){
    var g=function(id){return document.getElementById(id+s)};
    if(g('lvB'))g('lvB').textContent='Lv.'+D.level;
    if(g('stC'))g('stC').textContent=D.stars;
    if(g('gmC'))g('gmC').textContent=D.gems;
  });
  var sk=document.getElementById('skC');if(sk)sk.textContent=D.streak;
  var xm=document.getElementById('xpM');if(xm)xm.style.width=p+'%';
}

// ============ LEVEL GATING ============
// Check how many skills in current subject have passed a given level
function getSubjectMinLevel(subIdx){
  var sub=SUBJECTS[subIdx];
  var minLv=999;
  for(var i=0;i<sub.skills.length;i++){
    var pr=D.sp[sub.skills[i].id];
    var lv=pr?pr.level:1;
    if(lv<minLv)minLv=lv;
  }
  return minLv;
}
function allSkillsPassedLevel(subIdx,targetLv){
  var sub=SUBJECTS[subIdx];
  for(var i=0;i<sub.skills.length;i++){
    var pr=D.sp[sub.skills[i].id];
    if(!pr||pr.level<=targetLv)return false;
  }
  return true;
}
// Check & reward for completing all skills at a level
function checkLevelReward(){
  if(!D.levelRewards)D.levelRewards={};
  for(var si=0;si<SUBJECTS.length;si++){
    for(var lv=1;lv<=5;lv++){
      var key=SUBJECTS[si].id+'_'+lv;
      if(D.levelRewards[key])continue;
      if(allSkillsPassedLevel(si,lv)){
        D.levelRewards[key]=true;
        D.gems+=(lv===1?50:lv*30);
        save();
        return {subIdx:si,level:lv,reward:lv===1?50:lv*30};
      }
    }
  }
  return null;
}

// ============ RENDER GRID ============
function renderGrid(){
  var sub=SUBJECTS[curSubject];
  var titles=['\ud83d\uddfa\ufe0f To\u00e1n H\u1ecdc','\ud83d\udcd6 Ti\u1ebfng Vi\u1ec7t','\ud83c\udf0d English'];
  document.getElementById('mapTitle').innerHTML=titles[curSubject];
  var grid=document.getElementById('skillGrid');
  var subMinLv=getSubjectMinLevel(curSubject);
  grid.innerHTML=sub.skills.map(function(sk){
    var pr=D.sp[sk.id]||{level:1,correct:0,total:0};
    var pct=pr.total>0?Math.round(pr.correct/Math.max(pr.total,1)*100):0;
    var mst=pr.level>=5&&pct>=80;
    // Lock: skill can only be at max subMinLv+1 (must complete ALL skills at current level first)
    var locked=pr.level>subMinLv+1;
    var lockMsg=locked?'<div style="font-size:9px;color:var(--coral);margin-top:2px">\ud83d\udd12 Ho\u00e0n th\u00e0nh h\u1ebft Lv.'+subMinLv+' \u0111\u00e3!</div>':'';
    return '<div class="skill-card '+(mst?'mastered':'')+(locked?' locked':'')+'" style="--cc:'+sk.color+';'+(locked?'opacity:.5;':'')+ '" onclick="'+(locked?'':'startSkill(\''+sk.id+'\','+curSubject+')')+'">'
      +'<div class="em">'+sk.emoji+'</div><div class="nm">'+sk.name+'</div>'
      +'<div class="prog">Lv.'+pr.level+' \u00b7 '+pct+'%</div>'
      +lockMsg
      +'<div class="pbar"><div class="fill" style="width:'+Math.min(100,pr.level/5*100)+'%"></div></div></div>';
  }).join('');
  var cm=document.getElementById('corgiMap');
  var speeches=[
    ['To\u00e1n d\u1ec5 l\u1eafm, ch\u01a1i \u0111i Nhi! \ud83d\udc3e','B\u1ea3ng c\u1eedu ch\u01b0\u01a1ng h\u00f4m nay nh\u00e9! \u2728','Corgi th\u00edch ph\u00e9p nh\u00e2n! \ud83d\udd22'],
    ['Ti\u1ebfng Vi\u1ec7t hay l\u1eafm! \ud83d\udcd6','Nhi vi\u1ebft ch\u00ednh t\u1ea3 gi\u1ecfi n\u00e8! \u270d\ufe0f','\u0110\u1ecdc truy\u1ec7n c\u00f9ng Corgi! \ud83d\udc15'],
    ['English is fun! \ud83c\udf0d','Let\'s learn English! \ud83d\udc3e','Corgi speaks English too! \ud83d\udc15'],
  ];
  var sp=speeches[curSubject];
  cm.innerHTML='<div class="speech-bubble" style="margin-bottom:-4px">'+sp[R(0,sp.length-1)]+'</div>'
    +'<div class="corgi-run" onclick="tapCorgiMap(this)" style="cursor:pointer;display:inline-block">'+CSvg(70,'happy')+'</div>';
  updateUI();
}

// ============ START SKILL ============
function startSkill(id,subIdx){
  var sub=SUBJECTS[subIdx];
  var sk=sub.skills.find(function(s){return s.id===id});if(!sk)return;
  curSkill=sk;
  var pr=D.sp[id]||{level:1,correct:0,total:0};curLv=pr.level;
  questions=[];for(var i=0;i<Q_CT;i++)questions.push(sk.gen(curLv));
  qIdx=0;correct=0;combo=0;
  showScreen('game');
  document.getElementById('cC').textContent=0;
  document.getElementById('tQ').textContent=Q_CT;
  document.getElementById('corgiG').innerHTML=CSvg(50,'happy');
  document.getElementById('corgiG').style.display='block';
  showQ();
}
function replaySkill(){if(curSkill)startSkill(curSkill.id,curSubject)}

// ============ SHOW QUESTION ============
function showQ(){
  if(qIdx>=Q_CT){endRound();return}
  _answered=false;
  var q=questions[qIdx];var area=document.getElementById('gameArea');timeLeft=TIME_Q;
  var fs=q.text.length>60?'16px':q.text.length>35?'22px':'28px';
  var singleCol=q.isText&&q.options.some(function(o){return o.length>12});
  area.innerHTML='<div class="timer-bar"><div class="fill" id="tF" style="width:100%"></div></div>'
    +'<div style="display:flex;gap:10px;margin-bottom:10px;flex-wrap:wrap;justify-content:center">'
    +'<div class="g-stat"><div class="lb">C\u00e2u</div><div class="vl" style="color:var(--gold)">'+(qIdx+1)+'/'+Q_CT+'</div></div>'
    +'<div class="g-stat"><div class="lb">Combo</div><div class="vl" style="color:var(--mint)">'+combo+'\ud83d\udd25</div></div>'
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
  timerInt=setInterval(function(){
    timeLeft-=0.1;
    var f=document.getElementById('tF');
    if(f)f.style.width=Math.max(0,timeLeft/TIME_Q*100)+'%';
    if(timeLeft<=0&&!_answered){
      _answered=true;clearInterval(timerInt);
      document.querySelectorAll('.ans-btn').forEach(function(b){b.style.pointerEvents='none'});
      // Show correct answer
      var q2=questions[qIdx];var ans2=String(q2.answer);
      document.querySelectorAll('.ans-btn').forEach(function(b){if(decodeURIComponent(b.dataset.val)===ans2)b.classList.add('correct')});
      handleW();
      setTimeout(nextQ,1500);
    }
  },100);
  window.__gameTimerInt=timerInt;
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
var CORGI_TAP=['G\u00e2u!','Y\u00eau Nhi!','\ud83d\udc3e','Hehe!','\ud83d\udc95','Woof!','\ud83c\udf1f','Ch\u01a1i \u0111i!','Good job!','Gi\u1ecfi!'];
var C_MSGS=[{t:'Gi\u1ecfi qu\u00e1!',s:'Nhi si\u00eau \u0111\u1ec9nh! \ud83c\udf1f'},{t:'\u0110\u00fang r\u1ed3i!',s:'Corgi m\u1eebng l\u1eafm! \ud83d\udc3e'},{t:'Tuy\u1ec7t v\u1eddi!',s:'Combo l\u00ean n\u00e0o! \ud83d\udd25'},{t:'Wow!',s:'Thi\u00ean t\u00e0i nh\u00ed! \ud83e\udde0'},{t:'Perfect!',s:'Corgi t\u1ef1 h\u00e0o! \ud83d\udc15'},{t:'Amazing!',s:'Keep going! \ud83d\udcaa'},{t:'Si\u00eau sao!',s:'Ng\u00f4i sao s\u00e1ng! \u2b50'}];
var W_MSGS=[{t:'Oops!',s:'Th\u1eed l\u1ea1i nha! \ud83d\udc95'},{t:'Hmm...',s:'Corgi tin Nhi! \ud83d\udc3e'},{t:'G\u1ea7n \u0111\u00fang!',s:'C\u1ed1 l\u00ean! \ud83d\udcaa'}];

function handleC(){
  correct++;combo++;if(combo>D.mc)D.mc=combo;D.tc++;
  document.getElementById('cC').textContent=correct;
  var cg=document.getElementById('corgiG');
  cg.innerHTML=CSvg(50,combo>=3?'love':'excited');
  cg.classList.add(combo>=3?'corgi-spin':'corgi-bounce');
  setTimeout(function(){cg.classList.remove('corgi-spin','corgi-bounce')},800);
  showEnc(true);
  if(combo>=2){var cd=document.getElementById('comboDisplay');cd.textContent=combo+'x COMBO \ud83d\udd25';cd.classList.remove('show');requestAnimationFrame(function(){cd.classList.add('show')});setTimeout(function(){cd.classList.remove('show')},1500)}
  spawnFloat('\ud83d\udc95',2);
}
function handleW(){
  combo=0;
  var cg=document.getElementById('corgiG');
  cg.innerHTML=CSvg(50,'sad');
  cg.classList.add('corgi-sad');
  setTimeout(function(){cg.classList.remove('corgi-sad')},600);
  showEnc(false);spawnFloat('\ud83d\udcaa',1);
}
function nextQ(){qIdx++;showQ()}

function showEnc(ok){var ms=ok?C_MSGS:W_MSGS;var m=ms[R(0,ms.length-1)];var ov=document.createElement('div');ov.className='encourage-overlay';ov.innerHTML='<div class="enc-text">'+m.t+'</div><div class="enc-sub">'+m.s+'</div>';document.body.appendChild(ov);setTimeout(function(){ov.remove()},1600)}
function spawnFloat(e,n){for(var i=0;i<n;i++){(function(idx){var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=e;el.style.left=R(20,80)+'%';el.style.top=R(30,70)+'%';document.body.appendChild(el);setTimeout(function(){el.remove()},1100)})(i)}}
function tapCorgi(){D.ct++;var cg=document.getElementById('corgiG');cg.innerHTML=CSvg(50,['excited','love','happy'][R(0,2)]);cg.classList.add('corgi-bounce');setTimeout(function(){cg.classList.remove('corgi-bounce')},600);var w=CORGI_TAP[R(0,CORGI_TAP.length-1)];var el=document.createElement('div');el.className='corgi-tap-effect';el.textContent=w;el.style.right='14px';el.style.bottom='80px';document.body.appendChild(el);setTimeout(function(){el.remove()},1000);save()}
function tapCorgiMap(el){el.classList.remove('corgi-happy');requestAnimationFrame(function(){el.classList.add('corgi-happy')});setTimeout(function(){el.classList.remove('corgi-happy')},800)}

// ============ END ROUND ============
function endRound(){
  clearInterval(timerInt);
  try{document.getElementById('corgiG').style.display='none'}catch(e){}
  var acc=Math.round(correct/Q_CT*100);
  var stars=acc>=90?3:acc>=70?2:acc>=50?1:0;
  var xpE=correct*10+stars*15;var gemE=stars>=2?R(3,8):stars>=1?R(1,3):0;
  D.xp+=xpE;D.stars+=stars;D.gems+=gemE;D.tp+=Q_CT;
  var _safe=0;while(D.xp>=D.level*100&&_safe<100){_safe++;D.xp-=D.level*100;D.level++}
  if(curSkill){var p=D.sp[curSkill.id]||{level:1,correct:0,total:0};p.correct+=correct;p.total+=Q_CT;if(acc>=80&&p.level<5)p.level++;D.sp[curSkill.id]=p}
  try{updateDaily(correct)}catch(e){}
  var lvReward=checkLevelReward();
  save();showScreen('result');
  var mood=stars>=3?'love':stars>=2?'excited':stars>=1?'happy':'sad';
  document.getElementById('resultScene').innerHTML='<div class="'+(stars>=2?'corgi-happy':'')+'" style="display:inline-block">'+CSvg(stars>=2?110:90,mood)+'</div>';
  document.getElementById('rTitle').textContent=stars>=3?'TUY\u1ec6T V\u1edcI, Uy\u1ec3n Nhi! \ud83c\udfc6':stars>=2?'Gi\u1ecfi l\u1eafm! \ud83c\udf89':stars>=1?'C\u1ed1 th\u00eam nh\u00e9! \ud83d\udcaa':'L\u1ea7n sau s\u1ebd gi\u1ecfi h\u01a1n! \ud83e\udd17';
  document.getElementById('rStars').textContent='\u2b50'.repeat(stars)+'\u2606'.repeat(3-stars);
  var sp3=['Nhi gi\u1ecfi qu\u00e1! Corgi t\u1ef1 h\u00e0o! \ud83d\udc3e\ud83d\udc95','Si\u00eau \u0111\u1ec9nh! \ud83c\udf56\u2728','Thi\u00ean t\u00e0i! \ud83e\udde0\ud83c\udf1f'];
  var sp2=['T\u1ed1t l\u1eafm! L\u1ea7n sau 3 sao nh\u00e9! \ud83c\udf1f','G\u1ea7n ho\u00e0n h\u1ea3o r\u1ed3i! \ud83d\udcaa'];
  var sp1=['Kh\u00f4ng sao! Corgi \u1edf b\u00ean Nhi! \ud83d\udc95','M\u1ed7i l\u1ea7n ch\u01a1i l\u00e0 gi\u1ecfi h\u01a1n! \ud83c\udf31'];
  var sp=stars>=3?sp3:stars>=2?sp2:sp1;
  document.getElementById('rSpeech').innerHTML='<div class="speech-bubble" style="margin:8px auto">'+sp[R(0,sp.length-1)]+'</div>';
  document.getElementById('rCor').textContent=correct+'/'+Q_CT;
  document.getElementById('rAcc').textContent=acc+'%';
  document.getElementById('rXP').textContent='+'+xpE;
  document.getElementById('rGem').textContent='+'+gemE;
  if(stars>=2)spawnConfetti();
  // Show level completion reward
  if(lvReward){
    var rb=document.createElement('div');
    rb.style.cssText='margin-top:12px;background:linear-gradient(135deg,rgba(251,191,36,.2),rgba(255,107,157,.2));border:2px solid var(--gold);border-radius:16px;padding:16px;text-align:center;animation:encBounce .6s ease';
    rb.innerHTML='<div style="font-size:32px">\ud83c\udf89\ud83c\udfc6\ud83c\udf89</div>'
      +'<div style="font-family:Baloo 2,cursive;font-size:18px;color:var(--gold);margin:4px 0">Ho\u00e0n th\u00e0nh Level '+lvReward.level+' '+SUBJECTS[lvReward.subIdx].name+'!</div>'
      +'<div style="font-size:15px;color:var(--mint)">Th\u01b0\u1edfng: +'+lvReward.reward+' \ud83d\udc8e</div>';
    var rScreen=document.getElementById('result');
    rScreen.appendChild(rb);
    spawnConfetti();
  }
  updateUI();
}

// ============ DAILY ============
function getDaily(){
  var t=new Date().toDateString();
  if(D.daily.date!==t){D.daily={date:t,m:[
    {id:'p3',nm:'Ch\u01a1i 3 l\u01b0\u1ee3t',ds:'3 l\u01b0\u1ee3t b\u1ea5t k\u1ef3',tg:3,pg:0,rw:5,em:'\ud83c\udfae'},
    {id:'c20',nm:'\u0110\u00fang 20 c\u00e2u',ds:'Tr\u1ea3 l\u1eddi \u0111\u00fang 20 c\u00e2u',tg:20,pg:0,rw:10,em:'\u2705'},
    {id:'pf',nm:'3 sao!',ds:'\u0110\u1ea1t 3 sao 1 l\u01b0\u1ee3t',tg:1,pg:0,rw:15,em:'\u2b50'},
    {id:'cb',nm:'Combo 5',ds:'5 c\u00e2u \u0111\u00fang li\u00ean ti\u1ebfp',tg:1,pg:0,rw:8,em:'\ud83d\udd25'},
    {id:'3sub',nm:'H\u1ecdc 3 m\u00f4n',ds:'Ch\u01a1i c\u1ea3 3 m\u00f4n h\u00f4m nay',tg:3,pg:0,rw:12,em:'\ud83d\udcda'},
  ]};save()}return D.daily.m
}
function updateDaily(c){
  var ms=getDaily();
  ms.forEach(function(m){if(m.pg>=m.tg)return;if(m.id==='p3')m.pg++;if(m.id==='c20')m.pg=Math.min(m.tg,m.pg+c);if(m.id==='pf'&&c>=Q_CT)m.pg=1;if(m.id==='cb'&&D.mc>=5)m.pg=1});
  ms.forEach(function(m){if(m.pg>=m.tg&&!m.cl){m.cl=true;D.gems+=m.rw}});save()
}
function renderDaily(){
  var ms=getDaily();
  document.getElementById('dailyMissions').innerHTML=ms.map(function(m){
    var dn=m.pg>=m.tg;
    return '<div class="mission-card '+(dn?'done':'')+'"><div class="em">'+m.em+'</div><div class="info"><div class="tt">'+m.nm+'</div><div class="ds">'+m.ds+'</div><div class="m-prog"><div class="fill" style="width:'+Math.min(100,m.pg/m.tg*100)+'%"></div></div><div style="font-size:9px;color:var(--dim);margin-top:2px">'+m.pg+'/'+m.tg+'</div></div><div class="rw">+'+m.rw+'\ud83d\udc8e</div></div>';
  }).join('');updateUI()
}

// ============ PROFILE ============
function renderProfile(){
  var xpF=D.level*100,p=Math.min(100,D.xp/xpF*100);
  var titles=['T\u00e2n binh','H\u1ecdc tr\u00f2','Chi\u1ebfn binh','Hi\u1ec7p s\u0129','Ph\u00e1p s\u01b0','B\u1eadc th\u1ea7y','Huy\u1ec1n tho\u1ea1i','Th\u1ea7n \u0111\u1ed3ng'];
  document.getElementById('profLv').textContent='Level '+D.level+' \u2014 '+titles[Math.min(Math.floor(D.level/3),7)];
  document.getElementById('xpF').style.width=p+'%';document.getElementById('xpC').textContent=D.xp;document.getElementById('xpN').textContent=xpF;
  document.getElementById('profSk').textContent=D.streak;
  document.getElementById('profAv').innerHTML=CSvg(70,'happy');
  var ads=[
    {id:'f',em:'\ud83c\udfae',nm:'B\u1eaft \u0111\u1ea7u',ck:function(){return D.tp>0}},
    {id:'c50',em:'\u2705',nm:'50 \u0111\u00fang',ck:function(){return D.tc>=50}},
    {id:'c200',em:'\ud83c\udfc5',nm:'200 \u0111\u00fang',ck:function(){return D.tc>=200}},
    {id:'c500',em:'\ud83d\udc51',nm:'500 \u0111\u00fang',ck:function(){return D.tc>=500}},
    {id:'s3',em:'\ud83d\udd25',nm:'3 ng\u00e0y',ck:function(){return D.streak>=3}},
    {id:'s7',em:'\ud83d\udca5',nm:'7 ng\u00e0y',ck:function(){return D.streak>=7}},
    {id:'l5',em:'\u2b50',nm:'Level 5',ck:function(){return D.level>=5}},
    {id:'l10',em:'\ud83c\udf1f',nm:'Level 10',ck:function(){return D.level>=10}},
    {id:'sk10',em:'\ud83c\udfc6',nm:'10 skills',ck:function(){return Object.keys(D.sp).length>=10}},
    {id:'m1',em:'\ud83d\udc8e',nm:'Master 1',ck:function(){return Object.values(D.sp).some(function(p){return p.level>=5})}},
    {id:'g50',em:'\ud83d\udcb0',nm:'50 gems',ck:function(){return D.gems>=50}},
    {id:'cb10',em:'\u26a1',nm:'Combo 10',ck:function(){return D.mc>=10}},
  ];
  document.getElementById('achGrid').innerHTML=ads.map(function(a){var u=a.ck();if(u)D.ach[a.id]=true;return '<div class="ach '+(u?'':'locked')+'">'+a.em+'<div class="anm">'+a.nm+'</div></div>'}).join('');
  save();updateUI()
}

// ============ CONFETTI ============
function spawnConfetti(){var c=document.getElementById('confetti');c.innerHTML='';var cols=['#fbbf24','#ff6b9d','#c084fc','#38bdf8','#34d399','#fb7185'];for(var i=0;i<40;i++){var p=document.createElement('div');p.className='conf';p.style.left=R(0,100)+'%';p.style.background=cols[R(0,5)];p.style.setProperty('--del',(R(0,20)/10)+'s');p.style.setProperty('--dur',(R(20,40)/10)+'s');p.style.width=R(6,10)+'px';p.style.height=R(6,10)+'px';p.style.borderRadius=Math.random()>.5?'50%':'2px';c.appendChild(p)}setTimeout(function(){c.innerHTML=''},4000)}

// ============ INIT ============
(function(){
  var se=document.getElementById('sparkles');
  for(var i=0;i<15;i++){var s=document.createElement('div');s.className='sparkle';s.style.left=R(0,100)+'%';s.style.top=R(0,100)+'%';s.style.setProperty('--dur',R(30,60)/10+'s');s.style.setProperty('--delay',R(0,40)/10+'s');s.style.background=['#fbbf24','#ff6b9d','#c084fc','#38bdf8'][R(0,3)];se.appendChild(s)}
  var fs=document.getElementById('floatingStars');
  var emojis=['\u2b50','\u2728','\ud83c\udf1f','\ud83d\udcab','\u2b50','\u2728','\ud83c\udf1f','\ud83d\udcab'];
  for(var i=0;i<emojis.length;i++){var st=document.createElement('div');st.className='fstar';st.textContent=emojis[i];st.style.left=R(5,95)+'%';st.style.top=R(5,85)+'%';st.style.setProperty('--dur',R(30,60)/10+'s');st.style.setProperty('--del',R(0,30)/10+'s');fs.appendChild(st)}
  document.getElementById('splashScene').innerHTML='<div style="display:inline-block;animation:float 3s ease-in-out infinite">'+CSvg(100,'excited')+'</div>';
  checkStreak();updateUI();
})();
