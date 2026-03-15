// ============ LOP 1 — SKILLS + GRADE CONFIG ============
// This file loads BEFORE engine.js

// ============ MATH SKILLS ============
var MATH_SKILLS=[
  {id:'m1_add',name:'C\u1ed9ng',emoji:'\u2795',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=3){var a=R(1,9),b=R(1,9);return MQ(a+' + '+b+' = ?',a+b)}
    if(l<=5){var a=R(5,15),b=R(5,15);return MQ(a+' + '+b+' = ?',a+b)}
    if(l<=7){var a=R(10,45),b=R(10,45);return MQ(a+' + '+b+' = ?',a+b)}
    var a=R(20,60),b=R(20,40),c=R(1,9);return MQ(a+' + '+b+' + '+c+' = ?',a+b+c,'C\u1ed9ng 3 s\u1ed1')}},
  {id:'m1_sub',name:'Tr\u1eeb',emoji:'\u2796',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=3){var a=R(5,15),b=R(1,a-1);return MQ(a+' \u2212 '+b+' = ?',a-b)}
    if(l<=5){var a=R(15,30),b=R(1,a-1);return MQ(a+' \u2212 '+b+' = ?',a-b)}
    if(l<=7){var a=R(30,80),b=R(10,a-1);return MQ(a+' \u2212 '+b+' = ?',a-b)}
    var a=R(50,99),b=R(10,30),c=R(1,10);return MQ(a+' \u2212 '+b+' \u2212 '+c+' = ?',a-b-c,'Tr\u1eeb li\u00ean ti\u1ebfp')}},
  {id:'m1_mix',name:'C\u1ed9ng Tr\u1eeb',emoji:'\ud83d\udd00',color:'rgba(251,113,133,.2)',gen:function(l){
    if(l<=4){var a=R(5,15),b=R(1,5),c=R(1,5);return Math.random()>.5?MQ(a+' + '+b+' \u2212 '+c+' = ?',a+b-c):MQ(a+' \u2212 '+b+' + '+c+' = ?',a-b+c)}
    if(l<=7){var a=R(20,50),b=R(5,20),c=R(1,15);return Math.random()>.5?MQ(a+' + '+b+' \u2212 '+c+' = ?',a+b-c):MQ(a+' \u2212 '+b+' + '+c+' = ?',a-b+c)}
    var a=R(30,70),b=R(10,25),c=R(5,20);return MQ(a+' + '+b+' \u2212 '+c+' = ?',a+b-c,'T\u00ednh t\u1eeb tr\u00e1i qua ph\u1ea3i')}},
  {id:'m1_cmp',name:'So s\u00e1nh',emoji:'\u2696\ufe0f',color:'rgba(192,132,252,.2)',gen:function(l){
    if(l<=3){var a=R(1,20),b=R(1,20);var ans=a>b?'>':a<b?'<':'=';return TQ(a+' \u25fb\ufe0f '+b,ans,['<','>','='].filter(function(x){return x!==ans}))}
    if(l<=6){var a=R(1,10),b=R(1,10),c=R(1,10),d=R(1,10);var L=a+b,Rv=c+d;var ans=L>Rv?'>':L<Rv?'<':'=';return TQ(a+'+'+b+' \u25fb\ufe0f '+c+'+'+d,ans,['<','>','='].filter(function(x){return x!==ans}))}
    var a=R(10,50),b=R(5,30),c=R(10,50),d=R(5,30);var L=a+b,Rv=c+d;var ans=L>Rv?'>':L<Rv?'<':'=';return TQ(a+'+'+b+' \u25fb\ufe0f '+c+'+'+d,ans,['<','>','='].filter(function(x){return x!==ans}))}},
  {id:'m1_miss',name:'S\u1ed1 thi\u1ebfu',emoji:'\u2753',color:'rgba(251,191,36,.2)',gen:function(l){
    if(l<=3){var a=R(1,9),b=R(1,9);var s=a+b;return MQ(a+' + ? = '+s,b,'T\u00ecm s\u1ed1 thi\u1ebfu')}
    if(l<=6){var a=R(5,20),b=R(5,20);var s=a+b;return Math.random()>.5?MQ('? + '+b+' = '+s,a,'T\u00ecm s\u1ed1 thi\u1ebfu'):MQ(s+' \u2212 ? = '+a,b,'T\u00ecm s\u1ed1 thi\u1ebfu')}
    var a=R(10,40),b=R(10,40);var s=a+b;return Math.random()>.5?MQ('? + '+b+' = '+s,a):MQ(s+' \u2212 ? = '+b)}},
  {id:'m1_word',name:'To\u00e1n \u0111\u1ed1',emoji:'\ud83d\udcdd',color:'rgba(251,191,36,.2)',gen:function(l){
    var tps=[
      function(){var a=R(2,8),b=R(1,5);return MQ('Lan c\u00f3 '+a+' b\u00fat.\nM\u1eb9 cho th\u00eam '+b+' b\u00fat.\nLan c\u00f3 t\u1ea5t c\u1ea3 ? b\u00fat',a+b,'C\u1ed9ng')},
      function(){var a=R(5,15),b=R(1,a-1);return MQ('C\u00f3 '+a+' qu\u1ea3 cam.\n\u0102n m\u1ea5t '+b+' qu\u1ea3.\nC\u00f2n l\u1ea1i ? qu\u1ea3',a-b,'Tr\u1eeb')},
      function(){var a=R(3,12),b=R(3,12);return MQ('L\u1edbp c\u00f3 '+a+' b\u1ea1n trai\nv\u00e0 '+b+' b\u1ea1n g\u00e1i.\nL\u1edbp c\u00f3 t\u1ea5t c\u1ea3 ? b\u1ea1n',a+b)},
      function(){var a=R(10,25),b=R(1,a-3);return MQ('H\u00f9ng c\u00f3 '+a+' vi\u00ean bi.\nCho b\u1ea1n '+b+' vi\u00ean.\nH\u00f9ng c\u00f2n ? vi\u00ean bi',a-b)},
      function(){var a=R(5,15),b=R(3,10),c=R(1,5);return MQ('C\u00f3 '+a+' con g\u00e0,\nth\u00eam '+b+' con v\u1ecbt\nv\u00e0 '+c+' con chim.\nT\u1ea5t c\u1ea3 ? con',a+b+c,'C\u1ed9ng 3 s\u1ed1')},
      function(){var t=R(15,30),a=R(5,t-5);return MQ('R\u1ed5 c\u00f3 '+t+' qu\u1ea3.\nL\u1ea5y ra '+a+' qu\u1ea3.\nC\u00f2n ? qu\u1ea3',t-a)},
      function(){var a=R(6,20),b=R(2,8);return MQ('Minh c\u00f3 '+a+' quy\u1ec3n v\u1edf.\nNam nhi\u1ec1u h\u01a1n Minh '+b+' quy\u1ec3n.\nNam c\u00f3 ? quy\u1ec3n',a+b,'Nhi\u1ec1u h\u01a1n = c\u1ed9ng')},
      function(){var a=R(10,25),b=R(2,8);return MQ('Mai c\u00f3 '+a+' k\u1eb9o.\nMai \u00edt h\u01a1n Hoa '+b+' k\u1eb9o.\nHoa c\u00f3 ? k\u1eb9o',a+b,'\u00cdt h\u01a1n \u2192 ng\u01b0\u1eddi kia nhi\u1ec1u h\u01a1n')},
    ];return tps[R(0,l<=3?3:l<=6?5:tps.length-1)]()}},
  {id:'m1_seq',name:'D\u00e3y s\u1ed1',emoji:'\ud83d\udd22',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=4){var s=R(1,5),d=R(1,3);var seq=[s,s+d,s+2*d,s+3*d];return MQ(seq[0]+', '+seq[1]+', '+seq[2]+', ?',seq[3],'T\u00ecm quy lu\u1eadt')}
    if(l<=7){var s=R(2,10),d=R(2,5);var seq=[s,s+d,s+2*d,s+3*d,s+4*d];return MQ(seq[0]+', '+seq[1]+', '+seq[2]+', '+seq[3]+', ?',seq[4],'C\u1ed9ng \u0111\u1ec1u')}
    var s=R(30,50),d=R(2,6);var seq=[s,s-d,s-2*d,s-3*d,s-4*d];return MQ(seq[0]+', '+seq[1]+', '+seq[2]+', '+seq[3]+', ?',seq[4],'Tr\u1eeb \u0111\u1ec1u')}},
  {id:'m1_shp',name:'H\u00ecnh h\u1ecdc',emoji:'\ud83d\udd37',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('H\u00ecnh c\u00f3 3 c\u1ea1nh?','Tam gi\u00e1c',['Vu\u00f4ng','Tr\u00f2n','Ch\u1eef nh\u1eadt']),
    TQ('H\u00ecnh tr\u00f2n c\u00f3 m\u1ea5y c\u1ea1nh?','0 c\u1ea1nh',['1 c\u1ea1nh','3 c\u1ea1nh','4 c\u1ea1nh']),
    TQ('H\u00ecnh vu\u00f4ng c\u00f3 m\u1ea5y c\u1ea1nh?','4 c\u1ea1nh',['3 c\u1ea1nh','5 c\u1ea1nh','2 c\u1ea1nh']),
    TQ('H\u00ecnh ch\u1eef nh\u1eadt c\u00f3 m\u1ea5y g\u00f3c vu\u00f4ng?','4',['2','3','1']),
    TQ('Gh\u00e9p 2 tam gi\u00e1c = ?','H\u00ecnh vu\u00f4ng',['H\u00ecnh tr\u00f2n','Tam gi\u00e1c','H\u00ecnh thoi']),
    TQ('H\u00ecnh n\u00e0o l\u0103n \u0111\u01b0\u1ee3c?','H\u00ecnh tr\u00f2n',['H\u00ecnh vu\u00f4ng','Tam gi\u00e1c','Ch\u1eef nh\u1eadt']),
    TQ('\u0110\u1ed3ng h\u1ed3 c\u00f3 d\u1ea1ng h\u00ecnh?','H\u00ecnh tr\u00f2n',['Tam gi\u00e1c','Vu\u00f4ng','Ch\u1eef nh\u1eadt']),
    TQ('C\u1eeda s\u1ed5 th\u01b0\u1eddng h\u00ecnh?','Ch\u1eef nh\u1eadt',['Tam gi\u00e1c','Tr\u00f2n','Thoi']),
  ];return qs[R(0,l<=4?3:qs.length-1)]}},
  {id:'m1_time',name:'Gi\u1edd & \u0110o',emoji:'\ud83d\udd50',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('1 gi\u1edd = ? ph\u00fat','60 ph\u00fat',['30 ph\u00fat','100 ph\u00fat','24 ph\u00fat']),
    TQ('Kim ng\u1eafn ch\u1ec9 3 = ?','3 gi\u1edd',['3 ph\u00fat','30 ph\u00fat','12 gi\u1edd']),
    TQ('1 ng\u00e0y = ? gi\u1edd','24 gi\u1edd',['12 gi\u1edd','60 gi\u1edd','10 gi\u1edd']),
    TQ('1 tu\u1ea7n = ? ng\u00e0y','7 ng\u00e0y',['5 ng\u00e0y','10 ng\u00e0y','30 ng\u00e0y']),
    TQ('Th\u01b0\u1edbc k\u1ebb \u0111o g\u00ec?','\u0110\u1ed9 d\u00e0i',['C\u00e2n n\u1eb7ng','Th\u1eddi gian','Nhi\u1ec7t \u0111\u1ed9']),
    TQ('1 m\u00e9t = ? cm','100 cm',['10 cm','50 cm','1000 cm']),
    TQ('Bu\u1ed5i s\u00e1ng b\u1eaft \u0111\u1ea7u l\u00fac?','6 gi\u1edd s\u00e1ng',['12 gi\u1edd tr\u01b0a','9 gi\u1edd t\u1ed1i','3 gi\u1edd chi\u1ec1u']),
    TQ('Sau 12 gi\u1edd tr\u01b0a l\u00e0?','Bu\u1ed5i chi\u1ec1u',['Bu\u1ed5i s\u00e1ng','Bu\u1ed5i t\u1ed1i','N\u1eeda \u0111\u00eam']),
  ];return qs[R(0,l<=4?3:qs.length-1)]}},
];

// ============ VIETNAMESE SKILLS ============
var VIET_SKILLS=[
  {id:'v1_am',name:'\u00c2m & V\u1ea7n',emoji:'\ud83d\udd24',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[TQ('Ch\u1eef c\u00e1i \u0111\u1ea7u c\u1ee7a "m\u1eb9"?','m',['n','b','d']),TQ('Ch\u1eef c\u00e1i \u0111\u1ea7u c\u1ee7a "b\u1ed1"?','b',['d','p','m']),TQ('"ca" c\u00f3 v\u1ea7n g\u00ec?','a',['o','e','i']),TQ('"hoa" c\u00f3 v\u1ea7n g\u00ec?','oa',['ao','ua','ia']),TQ('\u00c2m n\u00e0o \u0111\u1ecdc l\u00e0 "b\u1edd"?','b',['d','p','q']),TQ('V\u1ea7n "an" c\u00f3 trong t\u1eeb n\u00e0o?','b\u00e0n',['b\u00fan','b\u1ed3n','b\u00ean']),TQ('"ong" c\u00f3 trong t\u1eeb n\u00e0o?','b\u00f4ng',['b\u00e0ng','b\u1ea7u','b\u01b0u']),TQ('Ch\u1eef c\u00e1i \u0111\u1ea7u "\u0111i"?','\u0111',['d','g','t'])];return qs[R(0,qs.length-1)]}},
  {id:'v1_doc',name:'Gh\u00e9p t\u1eeb',emoji:'\ud83d\udcdd',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[TQ('Gh\u00e9p: "m" + "e" = ?','me',['ma','mo','mu']),TQ('Gh\u00e9p: "b" + "a" = ?','ba',['bo','be','b\u00e0']),TQ('Gh\u00e9p: "c" + "\u00e1" = ?','c\u00e1',['c\u00f3','c\u00f2','c\u00e0']),TQ('Gh\u00e9p: "l" + "\u00e0" = ?','l\u00e0',['lo','la','l\u00e1']),TQ('Gh\u00e9p: "t" + "\u00f4" = ?','t\u00f4',['ta','to','tu']),TQ('Gh\u00e9p: "\u0111" + "i" = ?','\u0111i',['\u0111o','\u0111a','\u0111e'])];return qs[R(0,qs.length-1)]}},
  {id:'v1_ct',name:'Ch\u00ednh t\u1ea3',emoji:'\u270d\ufe0f',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[TQ('Vi\u1ebft \u0111\u00fang l\u00e0?','con m\u00e8o',['con m\u00e0o','con m\u1eb9o','con meo']),TQ('Vi\u1ebft \u0111\u00fang l\u00e0?','b\u00e0 ngo\u1ea1i',['ba ngo\u1ea1i','b\u00e0 ngoai','b\u00e0 ngo\u1ea1i']),TQ('Vi\u1ebft \u0111\u00fang?','\u0111i h\u1ecdc',['\u0111i hoc','di h\u1ecdc','\u0111i h\u1ecdk']),TQ('Vi\u1ebft \u0111\u00fang?','hoa h\u1ed3ng',['hoa h\u1ed3n','hoa h\u00f2ng','hua h\u1ed3ng']),TQ('Ch\u1eef n\u00e0o \u0111\u00fang?','qu\u1ea3 t\u00e1o',['q\u1ee7a t\u00e1o','qu\u1ea3 tao','qu\u00e3 t\u00e1o'])];return qs[R(0,qs.length-1)]}},
  {id:'v1_tv',name:'T\u1eeb v\u1ef1ng',emoji:'\ud83d\udcda',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[TQ('\ud83d\udc31 l\u00e0 con g\u00ec?','con m\u00e8o',['con ch\u00f3','con g\u00e0','con c\u00e1']),TQ('\ud83c\udf38 l\u00e0 g\u00ec?','b\u00f4ng hoa',['c\u00e1i l\u00e1','c\u00e1i c\u00e2y','qu\u1ea3 cam']),TQ('\ud83c\udfe0 l\u00e0 g\u00ec?','ng\u00f4i nh\u00e0',['c\u00e1i xe','c\u00e1i b\u00e0n','c\u00e1i gh\u1ebf']),TQ('\ud83d\udc69 l\u00e0 ai?','m\u1eb9',['b\u1ed1','ch\u1ecb','anh']),TQ('\u2600\ufe0f l\u00e0 g\u00ec?','m\u1eb7t tr\u1eddi',['m\u1eb7t tr\u0103ng','ng\u00f4i sao','\u0111\u00e1m m\u00e2y']),TQ('\ud83d\udc15 l\u00e0 con g\u00ec?','con ch\u00f3',['con m\u00e8o','con voi','con g\u00e0'])];return qs[R(0,qs.length-1)]}},
  {id:'v1_dien',name:'\u0110i\u1ec1n t\u1eeb',emoji:'\u270f\ufe0f',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[TQ('Con ____ k\u00eau meo meo','m\u00e8o',['ch\u00f3','g\u00e0','v\u1ecbt']),TQ('Em ____ \u0111i h\u1ecdc','b\u00e9',['to','c\u0169','xa']),TQ('M\u1eb9 ____ c\u01a1m cho em','n\u1ea5u',['\u0111\u1ecdc','vi\u1ebft','v\u1ebd']),TQ('B\u1ea7u tr\u1eddi m\u00e0u ____','xanh',['\u0111\u1ecf','\u0111en','tr\u1eafng']),TQ('____ tr\u00f2n tr\u00f2n tr\u00ean tr\u1eddi','M\u1eb7t tr\u0103ng',['C\u00e1i b\u00e0n','Con c\u00e1','B\u00f4ng hoa'])];return qs[R(0,qs.length-1)]}},
  {id:'v1_cau',name:'C\u00e2u \u0111\u01a1n',emoji:'\ud83d\udcac',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[TQ('C\u00e2u n\u00e0o \u0111\u00fang?','Em \u0111i h\u1ecdc.',['\u0111i Em h\u1ecdc.','Em h\u1ecdc \u0111i','\u0111i h\u1ecdc Em']),TQ('C\u00e2u n\u00e0o \u0111\u00fang?','M\u1eb9 n\u1ea5u c\u01a1m.',['C\u01a1m n\u1ea5u m\u1eb9.','N\u1ea5u c\u01a1m m\u1eb9','m\u1eb9 n\u1ea5u c\u01a1m']),TQ('\u0110i\u1ec1n d\u1ea5u: "Em \u0103n c\u01a1m___"','d\u1ea5u ch\u1ea5m (.)',['d\u1ea5u h\u1ecfi (?)','d\u1ea5u ph\u1ea9y (,)','d\u1ea5u than (!)'])];return qs[R(0,qs.length-1)]}},
];

// ============ ENGLISH SKILLS ============
var ENG_SKILLS=[
  {id:'e1_abc',name:'ABC',emoji:'\ud83d\udd21',color:'rgba(167,139,250,.2)',gen:function(l){var qs=[TQ('What letter? \ud83c\udf4e = A for...','Apple',['Banana','Cat','Dog']),TQ('B is for...?','Bear',['Cat','Ant','Dog']),TQ('C is for...?','Cat',['Ball','Ant','Dog']),TQ('What comes after A?','B',['C','D','E']),TQ('What comes after D?','E',['F','C','B']),TQ('How many letters in ABC?','3',['2','4','5'])];return qs[R(0,qs.length-1)]}},
  {id:'e1_num',name:'Numbers',emoji:'\ud83d\udd22',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[TQ('1 in English?','one',['two','three','four']),TQ('\ud83d\udd90\ufe0f = ?','five',['four','six','three']),TQ('How many? \ud83c\udf4e\ud83c\udf4e\ud83c\udf4e','three',['two','four','one']),TQ('What comes after "two"?','three',['four','one','five']),TQ('10 in English?','ten',['nine','eight','seven']),TQ('How many? \ud83d\udc31\ud83d\udc31','two',['one','three','four'])];return qs[R(0,qs.length-1)]}},
  {id:'e1_color',name:'Colors',emoji:'\ud83c\udfa8',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[TQ('\ud83d\udd34 = ?','red',['blue','green','yellow']),TQ('\ud83d\udd35 = ?','blue',['red','green','pink']),TQ('\ud83d\udc9b = ?','yellow',['orange','green','red']),TQ('\ud83d\udc9a = ?','green',['blue','yellow','red']),TQ('Sky is what color?','blue',['red','green','pink']),TQ('Banana is ___','yellow',['red','blue','green'])];return qs[R(0,qs.length-1)]}},
  {id:'e1_animal',name:'Animals',emoji:'\ud83d\udc3e',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[TQ('\ud83d\udc31 = ?','cat',['dog','bird','fish']),TQ('\ud83d\udc15 = ?','dog',['cat','duck','pig']),TQ('\ud83d\udc1f = ?','fish',['bird','cat','frog']),TQ('\ud83d\udc18 = ?','elephant',['cat','dog','bird']),TQ('Which can fly?','bird',['fish','dog','cat']),TQ('\ud83d\udc38 = ?','frog',['fish','cat','bird'])];return qs[R(0,qs.length-1)]}},
  {id:'e1_greet',name:'Hello!',emoji:'\ud83d\udc4b',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[TQ('"Xin ch\u00e0o" = ?','Hello',['Goodbye','Sorry','Thanks']),TQ('"T\u1ea1m bi\u1ec7t" = ?','Goodbye',['Hello','Thanks','Sorry']),TQ('"C\u1ea3m \u01a1n" = ?','Thank you',['Sorry','Hello','Goodbye']),TQ('Morning greeting?','Good morning',['Good night','Goodbye','Sorry']),TQ('"What is your name?" = ?','B\u1ea1n t\u00ean g\u00ec?',['B\u1ea1n \u1edf \u0111\u00e2u?','B\u1ea1n kho\u1ebb kh\u00f4ng?','B\u1ea1n m\u1ea5y tu\u1ed5i?'])];return qs[R(0,qs.length-1)]}},
  {id:'e1_family',name:'Family',emoji:'\ud83d\udc68\u200d\ud83d\udc69\u200d\ud83d\udc67',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[TQ('M\u1eb9 = ?','mother',['father','sister','brother']),TQ('B\u1ed1 = ?','father',['mother','brother','uncle']),TQ('Em g\u00e1i = ?','sister',['brother','mother','friend']),TQ('\u00d4ng = ?','grandfather',['grandmother','father','uncle'])];return qs[R(0,qs.length-1)]}},
];

// ============ TU NHIEN & XA HOI SKILLS ============
var TNXH_SKILLS=[
  {id:'tn1_gd',name:'Gia đình',emoji:'👨‍👩‍👧',color:'rgba(102,187,106,.2)',gen:function(l){var qs=[
    TQ('Ai sinh ra em?','Bố mẹ',['Ông bà','Cô chú','Thầy cô']),
    TQ('Gia đình gồm những ai?','Bố, mẹ, con cái',['Bạn bè','Cô giáo','Hàng xóm']),
    TQ('Ai là chị/em của bố?','Cô/Chú',['Ông/Bà','Bố/Mẹ','Anh/Chị']),
    TQ('Ai là bố/mẹ của bố?','Ông bà nội',['Ông bà ngoại','Cô chú','Bác']),
    TQ('Ai là bố/mẹ của mẹ?','Ông bà ngoại',['Ông bà nội','Cô chú','Dì']),
    TQ('Em yêu ai nhất?','Bố mẹ',['Siêu nhân','Robot','Máy tính'],'Gia đình'),
    TQ('Gia đình em sống ở đâu?','Trong ngôi nhà',['Trên mây','Dưới biển','Trên cây']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn1_truong',name:'Trường học',emoji:'🏫',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Ai dạy em ở trường?','Thầy/Cô giáo',['Bố mẹ','Bạn bè','Ông bà']),
    TQ('Em đến trường để làm gì?','Học tập',['Ngủ','Ăn','Chơi game']),
    TQ('Bạn bè ở trường cần?','Yêu thương, giúp đỡ',['Đánh nhau','Không chơi','Trêu chọc']),
    TQ('Giờ ra chơi em làm gì?','Chơi với bạn',['Về nhà','Ngủ','Đánh nhau']),
    TQ('Đồ dùng học tập gồm?','Sách, vở, bút',['Đồ ăn','Đồ chơi','Quần áo']),
    TQ('Khi vào lớp em phải?','Chào thầy cô',['Chạy nhảy','La hét','Ngủ']),
    TQ('Giữ gìn trường lớp bằng cách?','Không xả rác',['Vẽ lên tường','Ném giấy','Bẻ cây']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn1_caycon',name:'Cây cối & Động vật',emoji:'🌳',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Cây cần gì để sống?','Nước, ánh sáng',['Kẹo','Sữa','Cơm']),
    TQ('Con gì biết bay?','Chim',['Cá','Mèo','Rùa']),
    TQ('Con gì sống dưới nước?','Cá',['Gà','Mèo','Chó']),
    TQ('Cây có những bộ phận nào?','Rễ, thân, lá, hoa',['Tay, chân','Đầu, mình','Mắt, mũi']),
    TQ('Con gì cho ta trứng?','Gà',['Chó','Mèo','Cá']),
    TQ('Con gì cho ta sữa?','Bò',['Gà','Cá','Chim']),
    TQ('Hoa dùng để làm gì?','Trang trí, ngắm',['Ăn cơm','Viết bài','Chạy nhảy']),
    TQ('Con gì kêu "meo meo"?','Mèo',['Chó','Gà','Vịt']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn1_thoitiet',name:'Thời tiết',emoji:'🌤️',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Trời mưa cần mang gì?','Ô (dù)',['Kính râm','Quạt','Kem chống nắng']),
    TQ('Mùa nào trời nóng nhất?','Mùa hè',['Mùa đông','Mùa xuân','Mùa thu']),
    TQ('Mùa nào trời lạnh nhất?','Mùa đông',['Mùa hè','Mùa xuân','Mùa thu']),
    TQ('Khi trời nắng ta thấy?','Nóng, sáng',['Lạnh, tối','Mưa, gió','Tuyết rơi']),
    TQ('Mặt trời mọc hướng nào?','Hướng Đông',['Hướng Tây','Hướng Nam','Hướng Bắc']),
    TQ('Cầu vồng xuất hiện khi?','Sau cơn mưa',['Buổi tối','Mùa đông','Khi tuyết rơi']),
    TQ('Mây tạo thành từ gì?','Hơi nước',['Bông','Khói','Bụi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn1_cothe',name:'Cơ thể em',emoji:'🧒',color:'rgba(239,154,154,.2)',gen:function(l){var qs=[
    TQ('Mắt dùng để làm gì?','Nhìn',['Nghe','Ngửi','Nếm']),
    TQ('Tai dùng để làm gì?','Nghe',['Nhìn','Ngửi','Sờ']),
    TQ('Mũi dùng để làm gì?','Ngửi, thở',['Nhìn','Nghe','Nếm']),
    TQ('Người có mấy giác quan?','5 giác quan',['3 giác quan','2 giác quan','10 giác quan']),
    TQ('Để khỏe mạnh cần?','Ăn uống, tập thể dục',['Ngủ cả ngày','Ăn kẹo','Chơi game']),
    TQ('Trước khi ăn phải?','Rửa tay',['Chạy nhảy','Ngủ','Hát']),
    TQ('Lưỡi dùng để?','Nếm',['Nhìn','Nghe','Ngửi']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ DAO DUC SKILLS ============
var DAODUC_SKILLS=[
  {id:'dd1_yeu',name:'Yêu thương',emoji:'💕',color:'rgba(236,64,122,.2)',gen:function(l){var qs=[
    TQ('Khi mẹ mệt, em nên?','Giúp mẹ, hỏi thăm',['Đòi mua đồ','La hét','Không quan tâm']),
    TQ('Yêu thương gia đình là?','Quan tâm, giúp đỡ',['Đánh nhau','Không nghe lời','Hay khóc']),
    TQ('Em thể hiện yêu thương bằng?','Ôm, nói lời yêu',['Đánh bạn','Không chào','Nói dối']),
    TQ('Khi bố đi làm về, em?','Chào bố, lấy nước',['Không chào','Đòi quà','Khóc']),
    TQ('Bạn bè cần?','Yêu thương nhau',['Ghét nhau','Đánh nhau','Không chơi']),
    TQ('Khi em trai khóc, em nên?','Dỗ dành, an ủi',['Trêu thêm','Bỏ đi','La mắng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd1_lephep',name:'Lễ phép',emoji:'🙏',color:'rgba(171,71,188,.2)',gen:function(l){var qs=[
    TQ('Gặp thầy cô, em phải?','Chào ạ',['Bỏ đi','Không nói gì','Chạy trốn']),
    TQ('Khi nhận quà, em nói?','Con cảm ơn ạ',['Không nói gì','Đòi thêm','Chê xấu']),
    TQ('Khi làm sai, em nói?','Con xin lỗi ạ',['Đổ lỗi bạn','Không nói gì','Cười']),
    TQ('Lễ phép là gì?','Biết chào hỏi, cảm ơn',['Nói to','Chạy nhảy','Nghịch phá']),
    TQ('Khi người lớn nói, em?','Lắng nghe',['Nói chen vào','Bỏ đi','Nghịch điện thoại']),
    TQ('Muốn hỏi ai điều gì, em nói?','Cho em hỏi ạ',['Nói luôn','Hét to','Không hỏi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd1_trungthuc',name:'Trung thực',emoji:'⭐',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Trung thực nghĩa là?','Nói thật, không gian dối',['Nói dối','Giấu lỗi','Đổ lỗi']),
    TQ('Nhặt được tiền, em nên?','Trả lại người mất',['Giữ lấy','Giấu đi','Tiêu luôn']),
    TQ('Khi mắc lỗi, em nên?','Nhận lỗi, xin lỗi',['Đổ lỗi bạn','Giấu đi','Nói dối']),
    TQ('Bạn nói dối, em nên?','Khuyên bạn nói thật',['Nói dối theo','Mặc kệ','Trêu bạn']),
    TQ('Không làm bài tập, em nên?','Nói thật với cô',['Chép bài bạn','Nói dối','Giấu đi']),
    TQ('Em bé trung thực được?','Mọi người yêu quý',['Bị phạt','Bị ghét','Không ai chơi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd1_vesinh',name:'Giữ vệ sinh',emoji:'🧼',color:'rgba(129,212,250,.2)',gen:function(l){var qs=[
    TQ('Trước khi ăn phải?','Rửa tay bằng xà phòng',['Chơi tiếp','Không cần rửa','Lau vào áo']),
    TQ('Rác bỏ ở đâu?','Thùng rác',['Dưới đất','Ngoài cửa','Dưới bàn']),
    TQ('Đánh răng mỗi ngày mấy lần?','Ít nhất 2 lần',['Không cần','1 tuần 1 lần','1 tháng 1 lần']),
    TQ('Giữ lớp sạch sẽ bằng cách?','Không xả rác',['Vứt rác xuống sàn','Vẽ lên bàn','Nhổ nước bọt']),
    TQ('Sau khi đi vệ sinh phải?','Rửa tay sạch',['Chạy đi chơi','Không cần rửa','Lau vào quần']),
    TQ('Quần áo cần?','Giặt sạch sẽ',['Mặc bẩn','Không thay','Vứt đi']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENCOURAGEMENT MESSAGES ============
var CORGI_TAP=['Paoo!','Y\u00eau b\u00e9!','\ud83d\udc3e','Hehe!','\ud83d\udc95','\ud83d\udc18','Woof!','\ud83c\udf1f','Ch\u01a1i \u0111i!','Gi\u1ecfi!'];
var C_MSGS=[{t:'Gi\u1ecfi qu\u00e1!',s:'B\u00e9 si\u00eau \u0111\u1ec9nh! \ud83c\udf1f'},{t:'\u0110\u00fang r\u1ed3i!',s:'Voi m\u1eebng l\u1eafm! \ud83d\udc18'},{t:'Tuy\u1ec7t v\u1eddi!',s:'Combo l\u00ean n\u00e0o! \ud83d\udd25'},{t:'Wow!',s:'Thi\u00ean t\u00e0i nh\u00ed! \ud83e\udde0'},{t:'Perfect!',s:'Voi t\u1ef1 h\u00e0o! \ud83d\udc18'},{t:'Amazing!',s:'Keep going! \ud83d\udcaa'},{t:'Si\u00eau sao!',s:'Ng\u00f4i sao s\u00e1ng! \u2b50'}];
var W_MSGS=[{t:'Oops!',s:'Th\u1eed l\u1ea1i nha! \ud83d\udc95'},{t:'Hmm...',s:'Voi tin b\u00e9! \ud83d\udc18'},{t:'G\u1ea7n \u0111\u00fang!',s:'C\u1ed1 l\u00ean! \ud83d\udcaa'}];

// ============ GRADE CONFIG ============
window.GRADE_CONFIG={
  id:'lop1',
  gradeName:'L\u1edbp 1',
  saveKey:'vuongquoc_lop1',
  oldSaveKey:'voicon_lop1_v1',
  xpPerLevel:80,
  passThreshold:60,
  maxSkillLevel:10,
  hasLives:true,
  livesCount:3,
  gatingMode:'per_subject',
  questionsPerRound:10,
  timePerQuestion:30,
  levelRewardRate:30,
  speeches:[
    ['To\u00e1n d\u1ec5 l\u1eafm, ch\u01a1i \u0111i!','C\u1ed9ng tr\u1eeb h\u00f4m nay nh\u00e9!','Voi th\u00edch to\u00e1n!'],
    ['Ti\u1ebfng Vi\u1ec7t hay l\u1eafm!','Gh\u00e9p t\u1eeb gi\u1ecfi n\u00e8!','\u0110\u1ecdc ch\u1eef c\u00f9ng Voi!'],
    ['English is fun!','Let\'s learn ABC!','Elephant says Hello!'],
    ['Thi\u00ean nhi\u00ean k\u1ef3 th\u00fa!','Kh\u00e1m ph\u00e1 th\u1ebf gi\u1edbi n\u00e0o!','Voi bi\u1ebft nhi\u1ec1u l\u1eafm!'],
    ['B\u00e9 ngoan n\u00e0o!','L\u1ec5 ph\u00e9p gi\u1ecfi gh\u00ea!','Voi y\u00eau b\u00e9 ngoan!'],
  ],
  subjects:[
    {id:'math',name:'To\u00e1n',emoji:'\ud83d\udd22',skills:MATH_SKILLS,color:'#22d3ee'},
    {id:'viet',name:'Ti\u1ebfng Vi\u1ec7t',emoji:'\ud83d\udcd6',skills:VIET_SKILLS,color:'#f472b6'},
    {id:'eng',name:'English',emoji:'\ud83c\udf0d',skills:ENG_SKILLS,color:'#a78bfa'},
    {id:'tnxh',name:'TN & XH',emoji:'\ud83c\udf3f',skills:TNXH_SKILLS,color:'#66bb6a'},
    {id:'daoduc',name:'\u0110\u1ea1o \u0110\u1ee9c',emoji:'\ud83d\udc9d',skills:DAODUC_SKILLS,color:'#ec407a'},
  ],
};
