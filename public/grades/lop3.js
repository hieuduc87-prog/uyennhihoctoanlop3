// ============ LOP 3 — SKILLS + GRADE CONFIG ============
// This file loads BEFORE engine.js

// ============ SKILLS ============
var MATH_SKILLS=[
  {id:'m_add',name:'Ph\u00e9p C\u1ed9ng',emoji:'\u2795',color:'rgba(52,211,153,.2)',gen:function(l){var rg=[[10,99],[50,499],[100,999],[500,4999],[1000,9999]];var p=rg[Math.min(l-1,4)];var a=R(p[0],p[1]),b=R(p[0],p[1]);return MQ(a+' + '+b+' = ?',a+b,'T\u00ednh t\u1ed5ng')}},
  {id:'m_sub',name:'Ph\u00e9p Tr\u1eeb',emoji:'\u2796',color:'rgba(56,189,248,.2)',gen:function(l){var rg=[[10,99],[50,499],[100,999],[500,4999],[1000,9999]];var p=rg[Math.min(l-1,4)];var a=R(p[0],p[1]),b=R(p[0],p[1]);if(a<b){var t=a;a=b;b=t}return MQ(a+' \u2212 '+b+' = ?',a-b,'T\u00ednh hi\u1ec7u')}},
  {id:'m_mul',name:'Ph\u00e9p Nh\u00e2n',emoji:'\u2716\ufe0f',color:'rgba(255,107,157,.2)',gen:function(l){if(l<=2){var a=R(2,9),b=R(2,9);return MQ(a+' \u00d7 '+b+' = ?',a*b)}if(l<=3){var a2=R(11,99),b2=R(2,9);return MQ(a2+' \u00d7 '+b2+' = ?',a2*b2)}var a3=R(100,999),b3=R(2,9);return MQ(a3+' \u00d7 '+b3+' = ?',a3*b3)}},
  {id:'m_div',name:'Ph\u00e9p Chia',emoji:'\u2797',color:'rgba(192,132,252,.2)',gen:function(l){if(l<=2){var b=R(2,9),a=R(2,9);return MQ((b*a)+' : '+b+' = ?',a)}var b2=R(2,9),a2=R(10,99);return MQ((b2*a2)+' : '+b2+' = ?',a2)}},
  {id:'m_tbl',name:'B\u1ea3ng C\u1eedu Ch\u01b0\u01a1ng',emoji:'\ud83d\udcca',color:'rgba(251,191,36,.2)',gen:function(l){var ts=l<=2?[2,3,4,5]:[2,3,4,5,6,7,8,9];var t=ts[R(0,ts.length-1)],n=R(1,10);return Math.random()>.5?MQ(t+' \u00d7 '+n+' = ?',t*n):MQ((t*n)+' : '+t+' = ?',n)}},
  {id:'m_expr',name:'Bi\u1ec3u Th\u1ee9c',emoji:'\ud83e\uddee',color:'rgba(251,113,133,.2)',gen:function(l){if(l<=2){var b=R(2,5),c=R(2,5),a=R(1,20);return MQ(a+' + '+b+' \u00d7 '+c+' = ?',a+b*c,'Nh\u00e2n tr\u01b0\u1edbc')}var a2=R(2,10),b2=R(2,10),c2=R(2,5);return MQ('('+a2+' + '+b2+') \u00d7 '+c2+' = ?',(a2+b2)*c2,'Ngo\u1eb7c tr\u01b0\u1edbc')}},
  {id:'m_word',name:'To\u00e1n \u0110\u1ed1',emoji:'\ud83d\udcdd',color:'rgba(251,191,36,.2)',gen:function(l){var tpl=[function(){var a=R(50,200),b=R(10,a-1);return MQ('Nhi c\u00f3 '+a+' vi\u00ean k\u1eb9o \ud83c\udf6c\nCho b\u1ea1n '+b+' vi\u00ean\nC\u00f2n l\u1ea1i?',a-b)},function(){var e=R(2,9),n=R(3,9);return MQ(n+' h\u1ed9p, m\u1ed7i h\u1ed9p '+e+' b\u00e1nh \ud83e\uddc1\nT\u1ed5ng = ?',e*n)},function(){var w2=R(3,12),h=R(3,12);return MQ('H\u00ecnh ch\u1eef nh\u1eadt d\u00e0i '+h+'cm r\u1ed9ng '+w2+'cm\nChu vi = ?',(h+w2)*2,'(d\u00e0i+r\u1ed9ng)\u00d72')}];return tpl[R(0,tpl.length-1)]()}},
  {id:'m_geo',name:'H\u00ecnh H\u1ecdc',emoji:'\ud83d\udcd0',color:'rgba(52,211,153,.2)',gen:function(l){if(l<=2){var a=R(3,15);return Math.random()>.5?MQ('H\u00ecnh vu\u00f4ng c\u1ea1nh '+a+'cm\nChu vi = ?',a*4):MQ('H\u00ecnh vu\u00f4ng c\u1ea1nh '+a+'cm\nDi\u1ec7n t\u00edch = ?',a*a)}var d=R(3,12),r=R(2,10);return MQ('H\u00ecnh ch\u1eef nh\u1eadt '+d+'\u00d7'+r+'cm\nDi\u1ec7n t\u00edch = ?',d*r)}},
  {id:'m_meas',name:'\u0110o L\u01b0\u1eddng',emoji:'\ud83d\udccf',color:'rgba(192,132,252,.2)',gen:function(l){var ts=[function(){var m=R(1,9);return MQ(m+' m = ? cm',m*100)},function(){var k=R(1,9);return MQ(k+' kg = ? g',k*1000)},function(){var ar=[1000,2000,5000,10000,20000];var x=ar[R(0,4)],y=ar[R(0,4)];return MQ(x.toLocaleString()+'\u0111 + '+y.toLocaleString()+'\u0111 = ?',x+y)}];return ts[R(0,ts.length-1)]()}},
  {id:'m_frac',name:'Ph\u00e2n S\u1ed1',emoji:'\ud83c\udf55',color:'rgba(255,107,157,.2)',gen:function(l){var d=R(2,9),t=d*R(2,9);return MQ('1/'+d+' c\u1ee7a '+t+' = ?',t/d)}},
];
var VIET_SKILLS=[
  {id:'v_chinh',name:'Ch\u00ednh T\u1ea3',emoji:'\u270d\ufe0f',color:'rgba(56,189,248,.2)',gen:function(l){
    var pairs=[
      ['H\u00e0 N\u1ed9i l\u00e0 ____ \u0111\u00f4 c\u1ee7a Vi\u1ec7t Nam','th\u1ee7',['th\u0169','th\u00fa','th\u1ee5'],'Vi\u1ebft \u0111\u00fang ch\u00ednh t\u1ea3'],
      ['Em \u0111i ____ b\u1eb1ng xe \u0111\u1ea1p','h\u1ecdc',['hoc','h\u1ecdk','h\u1ed9c'],'D\u1ea5u thanh \u0111\u00fang'],
      ['M\u1eb9 ____ c\u01a1m r\u1ea5t ngon','n\u1ea5u',['n\u1ea5o','n\u1ea9u','n\u00e2u'],'Ph\u00e2n bi\u1ec7t u/o'],
      ['Con ____ bay tr\u00ean tr\u1eddi','chim',['trim','jim','ch\u00ecm'],'ch hay tr'],
      ['Nhi ____ s\u00e1ng \u0111i h\u1ecdc','bu\u1ed5i',['bu\u1ed1i','b\u01b0\u1ed5i','bu\u00f4i'],'D\u1ea5u thanh'],
      ['Tr\u1eddi ____ m\u01b0a to qu\u00e1','\u0111ang',['\u0111\u0103ng','\u0111\u00e0ng','dang'],'d hay \u0111'],
      ['Con ____ r\u1ea5t th\u00f4ng minh','m\u00e8o',['m\u00e8a','m\u00e0o','m\u1eb9o'],'Nguy\u00ean \u00e2m \u0111\u00fang'],
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
  {id:'v_bienphat',name:'Bi\u1ec7n Ph\u00e1p Tu T\u1eeb',emoji:'\ud83c\udfa8',color:'rgba(52,211,153,.2)',gen:function(l){
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

// ============ TU NHIEN & XA HOI SKILLS ============
var TNXH_SKILLS=[
  {id:'tn3_chat',name:'Chất & NL',emoji:'⚡',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Nước tồn tại ở mấy thể?','3 thể (rắn, lỏng, khí)',['1 thể','2 thể','4 thể']),
    TQ('Nước đá là thể gì?','Thể rắn',['Thể lỏng','Thể khí','Thể plasma']),
    TQ('Hơi nước là thể gì?','Thể khí',['Thể rắn','Thể lỏng','Thể đặc']),
    TQ('Nguồn năng lượng lớn nhất?','Mặt Trời',['Mặt Trăng','Gió','Nước']),
    TQ('Âm thanh truyền qua gì?','Không khí, nước, chất rắn',['Chỉ không khí','Chỉ nước','Không truyền']),
    TQ('Ánh sáng đi theo đường?','Đường thẳng',['Đường cong','Đường gấp','Đường tròn']),
    TQ('Nam châm hút vật liệu?','Sắt, thép',['Gỗ','Nhựa','Giấy']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn3_thucvat',name:'TV & ĐV',emoji:'🌿',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Cây xanh quang hợp cần?','CO₂ + ánh sáng + nước',['Chỉ nước','Chỉ đất','Chỉ gió']),
    TQ('Cây hô hấp tạo ra?','CO₂',['O₂','H₂O','Đất']),
    TQ('Côn trùng có mấy chân?','6 chân',['4 chân','8 chân','2 chân']),
    TQ('Nhện có mấy chân?','8 chân',['6 chân','4 chân','10 chân']),
    TQ('Động vật có xương sống?','Cá, chim, thú',['Sâu, giun','Ốc, sên','Bướm, ong']),
    TQ('Thú nuôi con bằng gì?','Sữa mẹ',['Trứng','Hạt','Lá cây']),
    TQ('Cá thở bằng gì?','Mang',['Phổi','Da','Mũi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn3_nam',name:'Nấm & VK',emoji:'🍄',color:'rgba(171,71,188,.2)',gen:function(l){var qs=[
    TQ('Vi khuẩn có thể nhìn bằng mắt?','Không, rất nhỏ',['Có','Rất to','Bình thường']),
    TQ('Nấm mốc thường mọc ở?','Thức ăn ôi thiu',['Trên trời','Dưới nước','Trong lửa']),
    TQ('Vi khuẩn có lợi giúp?','Làm sữa chua, phô mai',['Gây bệnh','Phá đồ','Ăn thức ăn']),
    TQ('Rửa tay giúp diệt?','Vi khuẩn gây bệnh',['Côn trùng','Động vật','Cây cối']),
    TQ('Nấm thuộc giới nào?','Giới nấm (không phải TV)',['Thực vật','Động vật','Vi khuẩn']),
    TQ('Vi khuẩn ở khắp nơi trừ?','Nơi rất nóng (>100°C)',['Trong nước','Trên da','Trong đất']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn3_suckhoe',name:'Sức khỏe',emoji:'💪',color:'rgba(239,154,154,.2)',gen:function(l){var qs=[
    TQ('Thức ăn chia thành mấy nhóm?','4 nhóm chính',['1 nhóm','2 nhóm','10 nhóm']),
    TQ('Vitamin C có nhiều trong?','Cam, chanh',['Thịt bò','Cơm','Sữa']),
    TQ('Protein (đạm) có trong?','Thịt, cá, trứng',['Cơm','Rau','Kẹo']),
    TQ('Canxi tốt cho?','Xương và răng',['Tóc','Mắt','Tai']),
    TQ('Bệnh cận thị do?','Xem gần nhiều',['Ăn nhiều','Ngủ nhiều','Chạy nhiều']),
    TQ('Phòng bệnh tốt nhất bằng?','Vệ sinh, tiêm phòng',['Uống thuốc','Không ăn','Ngủ nhiều']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn3_traidat',name:'Trái Đất',emoji:'🌏',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Trái Đất quay quanh?','Mặt Trời',['Mặt Trăng','Sao Hỏa','Sao Kim']),
    TQ('1 ngày Trái Đất quay mấy vòng?','1 vòng quanh trục',['2 vòng','Không quay','10 vòng']),
    TQ('Lớp ngoài Trái Đất gọi là?','Vỏ Trái Đất',['Nhân','Lõi','Mây']),
    TQ('Đại dương nào lớn nhất?','Thái Bình Dương',['Đại Tây Dương','Ấn Độ Dương','Bắc Băng Dương']),
    TQ('Núi lửa phun ra gì?','Dung nham (magma)',['Nước','Gió','Đất']),
    TQ('Nước chiếm bao nhiêu % bề mặt?','Khoảng 70%',['30%','50%','90%']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ DAO DUC SKILLS ============
var DAODUC_SKILLS=[
  {id:'dd3_tuchu',name:'Tự chủ',emoji:'🎯',color:'rgba(236,64,122,.2)',gen:function(l){var qs=[
    TQ('Tự chủ nghĩa là?','Kiểm soát bản thân',['Làm bừa','Theo bạn','Không nghe ai']),
    TQ('Khi tức giận em nên?','Hít thở sâu, bình tĩnh',['Đánh bạn','La hét','Đập đồ']),
    TQ('Bạn rủ nghỉ học đi chơi?','Từ chối, đi học',['Đi chơi luôn','Phân vân','Rủ thêm bạn']),
    TQ('Tự giác làm bài tập là?','Tự chủ tốt',['Lười biếng','Bắt buộc','Không cần']),
    TQ('Khi gặp khó khăn em nên?','Cố gắng, không bỏ cuộc',['Bỏ cuộc','Khóc','Đổ lỗi']),
    TQ('Em tự dọn phòng không cần ai nhắc là?','Tự giác, tự chủ',['Bị bắt','Lười biếng','Sợ mẹ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd3_trachnhiem',name:'Trách nhiệm',emoji:'✅',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Trách nhiệm của HS là?','Học tập tốt',['Chơi game','Ngủ','Xem TV']),
    TQ('Khi nhận nhiệm vụ trực nhật?','Làm đầy đủ',['Trốn về','Nhờ bạn','Quên luôn']),
    TQ('Làm hỏng đồ của bạn, em?','Xin lỗi và đền',['Giấu đi','Đổ lỗi','Bỏ chạy']),
    TQ('Có trách nhiệm nghĩa là?','Hoàn thành việc được giao',['Chơi cả ngày','Đổ lỗi','Quên hết']),
    TQ('Em phải chịu trách nhiệm về?','Hành động của mình',['Hành động của bạn','Thời tiết','Điểm của bạn']),
    TQ('Quên làm BT, em nên?','Nhận lỗi, làm bù',['Nói dối','Chép bài bạn','Khóc']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd3_quehuong',name:'Yêu quê hương',emoji:'🏡',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Thủ đô Việt Nam là?','Hà Nội',['TP.HCM','Đà Nẵng','Huế']),
    TQ('Quốc kỳ VN màu gì?','Đỏ, sao vàng',['Xanh trắng','Đỏ trắng','Vàng xanh']),
    TQ('Quốc ca VN tên gì?','Tiến Quân Ca',['Đoàn Ca','Hát Mãi','Quốc Ca']),
    TQ('Ngày Quốc khánh VN là?','2 tháng 9',['1 tháng 1','30 tháng 4','20 tháng 11']),
    TQ('Yêu quê hương bằng cách?','Giữ gìn, xây dựng',['Phá hoại','Xả rác','Bỏ đi']),
    TQ('Di sản nổi tiếng VN?','Vịnh Hạ Long',['Tháp Eiffel','Kim tự tháp','Vạn lý trường thành']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd3_hoptac',name:'Hợp tác',emoji:'🤝',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Hợp tác nghĩa là?','Cùng nhau làm việc',['Làm một mình','Không giúp ai','Tranh giành']),
    TQ('Khi làm nhóm, em nên?','Chia công việc, cùng làm',['Để bạn làm hết','Chơi','Không tham gia']),
    TQ('"Một cây làm chẳng nên non"\nNghĩa là?','Cần hợp tác',['Trồng cây','Leo núi','Một mình']),
    TQ('Bạn trong nhóm chưa hiểu, em?','Giải thích giúp bạn',['Mặc kệ','Chê bạn','Bỏ nhóm']),
    TQ('Kết quả nhóm tốt khi?','Mọi người cùng cố gắng',['Một người làm','Không ai làm','Tranh cãi']),
    TQ('Hợp tác giúp em?','Hoàn thành tốt hơn',['Mệt hơn','Chậm hơn','Khó hơn']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ TIN HOC SKILLS ============
var TINHOC_SKILLS=[
  {id:'th3_maytinh',name:'Máy tính',emoji:'💻',color:'rgba(92,107,192,.2)',gen:function(l){var qs=[
    TQ('Bộ phận nào hiển thị hình ảnh?','Màn hình',['Chuột','Bàn phím','Loa']),
    TQ('Bàn phím dùng để?','Gõ chữ, nhập dữ liệu',['Xem hình','Nghe nhạc','In giấy']),
    TQ('Chuột dùng để?','Di chuyển, nhấp chọn',['Gõ chữ','Nghe nhạc','Chụp ảnh']),
    TQ('CPU là gì?','Bộ xử lý trung tâm',['Màn hình','Bàn phím','Loa']),
    TQ('Máy tính lưu dữ liệu ở?','Ổ cứng / Bộ nhớ',['Màn hình','Chuột','Loa']),
    TQ('USB dùng để?','Lưu trữ, chuyển dữ liệu',['Nghe nhạc','Gõ chữ','Xem phim']),
    TQ('Máy in dùng để?','In tài liệu ra giấy',['Gõ chữ','Lướt web','Nghe nhạc']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th3_thongtin',name:'Thông tin',emoji:'📊',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Thông tin có thể là?','Chữ, số, hình, âm thanh',['Chỉ chữ','Chỉ số','Chỉ hình']),
    TQ('File ảnh thường có đuôi?','.jpg, .png',['doc','mp3','pdf']),
    TQ('File nhạc thường có đuôi?','.mp3',['jpg','doc','png']),
    TQ('Folder (thư mục) dùng để?','Chứa nhiều file',['Xóa file','In file','Gửi mail']),
    TQ('Để tìm file trên máy tính?','Dùng tính năng Search',['Tắt máy','Khởi động lại','Rút USB']),
    TQ('Dữ liệu số là gì?','Thông tin lưu trên máy tính',['Sách giấy','Bảng đen','Vở ghi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th3_daoduc',name:'Văn hóa số',emoji:'🛡️',color:'rgba(236,64,122,.2)',gen:function(l){var qs=[
    TQ('Không nên chia sẻ gì trên mạng?','Mật khẩu, địa chỉ nhà',['Bài hát','Hình phong cảnh','Bài học']),
    TQ('Ngồi máy tính lâu gây?','Mỏi mắt, đau lưng',['Cao hơn','Khỏe hơn','Đẹp hơn']),
    TQ('Nên dùng máy tính bao lâu?','30 phút rồi nghỉ',['Cả ngày','Không giới hạn','12 tiếng']),
    TQ('Gặp người lạ trên mạng, em?','Không trả lời, nói bố mẹ',['Kết bạn ngay','Cho số ĐT','Cho địa chỉ']),
    TQ('Chơi game quá nhiều gây?','Nghiện, học kém',['Thông minh','Khỏe mạnh','Giỏi hơn']),
    TQ('Tin giả (fake news) là?','Tin không đúng sự thật',['Tin hay','Tin vui','Tin buồn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th3_ungdung',name:'Ứng dụng',emoji:'🖥️',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Phần mềm vẽ tranh là?','Paint',['Word','Excel','PowerPoint']),
    TQ('Phần mềm soạn văn bản?','Word',['Paint','Calculator','Camera']),
    TQ('Để tính toán dùng phần mềm?','Calculator (Máy tính)',['Paint','Word','Camera']),
    TQ('Trình duyệt web dùng để?','Lướt Internet',['Vẽ tranh','Tính toán','Soạn nhạc']),
    TQ('Google dùng để?','Tìm kiếm thông tin',['Vẽ tranh','Chơi game','Tính toán']),
    TQ('Email dùng để?','Gửi thư điện tử',['Vẽ tranh','Xem phim','Chơi game']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENCOURAGEMENT MESSAGES ============
var CORGI_TAP=['G\u00e2u!','Y\u00eau Nhi!','\ud83d\udc3e','Hehe!','\ud83d\udc95','Woof!','\ud83c\udf1f','Ch\u01a1i \u0111i!','Good job!','Gi\u1ecfi!'];
var C_MSGS=[{t:'Gi\u1ecfi qu\u00e1!',s:'Nhi si\u00eau \u0111\u1ec9nh! \ud83c\udf1f'},{t:'\u0110\u00fang r\u1ed3i!',s:'Corgi m\u1eebng l\u1eafm! \ud83d\udc3e'},{t:'Tuy\u1ec7t v\u1eddi!',s:'Combo l\u00ean n\u00e0o! \ud83d\udd25'},{t:'Wow!',s:'Thi\u00ean t\u00e0i nh\u00ed! \ud83e\udde0'},{t:'Perfect!',s:'Corgi t\u1ef1 h\u00e0o! \ud83d\udc15'},{t:'Amazing!',s:'Keep going! \ud83d\udcaa'},{t:'Si\u00eau sao!',s:'Ng\u00f4i sao s\u00e1ng! \u2b50'}];
var W_MSGS=[{t:'Oops!',s:'Th\u1eed l\u1ea1i nha! \ud83d\udc95'},{t:'Hmm...',s:'Corgi tin Nhi! \ud83d\udc3e'},{t:'G\u1ea7n \u0111\u00fang!',s:'C\u1ed1 l\u00ean! \ud83d\udcaa'}];

// ============ GRADE CONFIG ============
window.GRADE_CONFIG={
  id:'lop3',
  gradeName:'L\u1edbp 3',
  saveKey:'vuongquoc_lop3',
  oldSaveKey:'uynhi3sub_v1',
  xpPerLevel:100,
  passThreshold:80,
  maxSkillLevel:5,
  hasLives:false,
  gatingMode:'cross_subject',
  questionsPerRound:10,
  timePerQuestion:30,
  levelRewardRate:50,
  speeches:[
    ['Toán dễ lắm, chơi đi Nhi!','Bảng cửu chương hôm nay nhé!','Corgi thích phép nhân!'],
    ['Tiếng Việt hay lắm!','Nhi viết chính tả giỏi nè!','Đọc truyện cùng Corgi!'],
    ['English is fun!','Let\'s learn English!','Corgi speaks English too!'],
    ['Thiên nhiên kỳ thú!','Khám phá thế giới nào!','Corgi biết nhiều lắm!'],
    ['Bé ngoan giỏi ghê!','Yêu quê hương nhé!','Corgi yêu bé ngoan!'],
    ['Tin học vui lắm!','Máy tính thú vị!','Corgi giỏi tin học!'],
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#fb7185'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#38bdf8'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#a78bfa'},
    {id:'tnxh',name:'TN & XH',emoji:'🌿',skills:TNXH_SKILLS,color:'#66bb6a'},
    {id:'daoduc',name:'Đạo Đức',emoji:'💝',skills:DAODUC_SKILLS,color:'#ec407a'},
    {id:'tinhoc',name:'Tin Học',emoji:'💻',skills:TINHOC_SKILLS,color:'#5c6bc0'},
  ],
};
