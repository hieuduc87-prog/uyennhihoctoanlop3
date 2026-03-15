// ============ LOP 2 — SKILLS + GRADE CONFIG ============
// This file loads BEFORE engine.js

// ============ MATH SKILLS ============
var MATH_SKILLS=[
  {id:'m2_add',name:'Cộng có nhớ',emoji:'➕',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=3){var a=R(10,49),b=R(10,49);return MQ(a+' + '+b+' = ?',a+b,'Cộng có nhớ')}
    if(l<=5){var a=R(50,99),b=R(10,99);return MQ(a+' + '+b+' = ?',a+b)}
    if(l<=7){var a=R(100,499),b=R(100,499);return MQ(a+' + '+b+' = ?',a+b,'Cộng 3 chữ số')}
    var a=R(200,500),b=R(100,400),c=R(10,99);return MQ(a+' + '+b+' + '+c+' = ?',a+b+c,'Cộng 3 số')}},
  {id:'m2_sub',name:'Trừ có nhớ',emoji:'➖',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=3){var a=R(20,60),b=R(5,a-5);return MQ(a+' − '+b+' = ?',a-b,'Trừ có nhớ')}
    if(l<=5){var a=R(50,99),b=R(10,a-1);return MQ(a+' − '+b+' = ?',a-b)}
    if(l<=7){var a=R(200,999),b=R(100,a-1);return MQ(a+' − '+b+' = ?',a-b,'Trừ 3 chữ số')}
    var a=R(500,999),b=R(100,300),c=R(10,99);return MQ(a+' − '+b+' − '+c+' = ?',a-b-c,'Trừ liên tiếp')}},
  {id:'m2_mul',name:'Phép Nhân',emoji:'✖️',color:'rgba(255,107,157,.2)',gen:function(l){
    var ts=[2,3,4,5];var t=ts[R(0,l<=3?1:3)];var n=R(1,10);
    if(l<=5) return MQ(t+' × '+n+' = ?',t*n,'Bảng nhân '+t);
    var a=R(2,5),b=R(2,5);return MQ(a+' × '+b+' = ?',a*b)}},
  {id:'m2_div',name:'Phép Chia',emoji:'➗',color:'rgba(192,132,252,.2)',gen:function(l){
    var ts=[2,3,4,5];var t=ts[R(0,l<=3?1:3)];var a=R(1,10);
    return MQ((t*a)+' : '+t+' = ?',a,'Bảng chia '+t)}},
  {id:'m2_cmp',name:'So sánh',emoji:'⚖️',color:'rgba(251,191,36,.2)',gen:function(l){
    if(l<=3){var a=R(10,99),b=R(10,99);var ans=a>b?'>':a<b?'<':'=';return TQ(a+' ◻️ '+b,ans,['<','>','='].filter(function(x){return x!==ans}))}
    if(l<=6){var a=R(100,500),b=R(100,500);var ans=a>b?'>':a<b?'<':'=';return TQ(a+' ◻️ '+b,ans,['<','>','='].filter(function(x){return x!==ans}))}
    var a=R(10,50),b=R(10,50),c=R(2,5),d=R(2,5);var L=a*c,Rv=b*d;var ans=L>Rv?'>':L<Rv?'<':'=';return TQ(a+'×'+c+' ◻️ '+b+'×'+d,ans,['<','>','='].filter(function(x){return x!==ans}))}},
  {id:'m2_miss',name:'Số thiếu',emoji:'❓',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=3){var a=R(5,30),b=R(5,30);var s=a+b;return Math.random()>.5?MQ(a+' + ? = '+s,b,'Tìm số thiếu'):MQ(s+' − ? = '+a,b)}
    if(l<=6){var t=R(2,5),n=R(2,10);return Math.random()>.5?MQ(t+' × ? = '+(t*n),n,'Tìm thừa số'):MQ((t*n)+' : ? = '+n,t,'Tìm số chia')}
    var a=R(50,200),b=R(50,200);var s=a+b;return MQ('? + '+b+' = '+s,a)}},
  {id:'m2_word',name:'Toán đố',emoji:'📝',color:'rgba(56,189,248,.2)',gen:function(l){
    var tps=[
      function(){var a=R(20,50),b=R(10,30);return MQ('Lan có '+a+' viên kẹo.\nMẹ cho thêm '+b+' viên.\nLan có tất cả ? viên kẹo',a+b)},
      function(){var a=R(30,80),b=R(10,a-5);return MQ('Có '+a+' quả cam.\nBán đi '+b+' quả.\nCòn lại ? quả',a-b)},
      function(){var n=R(3,5),e=R(2,5);return MQ(n+' bạn, mỗi bạn '+e+' quyển vở\nTổng = ? quyển vở',n*e,'Nhân')},
      function(){var t=R(10,30),n=R(2,5);return MQ('Có '+t+' cái kẹo\nChia đều cho '+n+' bạn\nMỗi bạn ? cái',(t-(t%n))/n,'Chia đều')},
      function(){var a=R(100,300),b=R(50,200);return MQ('Thùng A: '+a+' lít\nThùng B: '+b+' lít\nCả hai: ? lít',a+b)},
      function(){var a=R(20,50),b=R(5,15);return MQ('Minh có '+a+' bi.\nMinh nhiều hơn Nam '+b+' bi.\nNam có ? bi',a-b,'Nhiều hơn → trừ')},
    ];return tps[R(0,l<=3?2:tps.length-1)]()}},
  {id:'m2_geo',name:'Hình học',emoji:'📐',color:'rgba(192,132,252,.2)',gen:function(l){
    if(l<=4){var a=R(3,10),b=R(3,10),c=R(3,10);return MQ('Đường gấp khúc gồm\n'+a+'cm, '+b+'cm, '+c+'cm\nĐộ dài = ? cm',a+b+c,'Cộng các đoạn')}
    if(l<=6){var a=R(3,15),b=R(3,15),c=R(3,15);return MQ('Tam giác có 3 cạnh:\n'+a+'cm, '+b+'cm, '+c+'cm\nChu vi = ? cm',a+b+c)}
    var a=R(5,20),b=R(3,15);return MQ('Hình chữ nhật dài '+a+'cm, rộng '+b+'cm\nChu vi = ? cm',(a+b)*2,'(dài+rộng)×2')}},
  {id:'m2_meas',name:'Đo & Tiền',emoji:'📏',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    MQ('1 m = ? cm',100),MQ('1 km = ? m',1000),MQ('1 dm = ? cm',10),
    TQ('1 kg = ? g','1000 g',['100 g','10 g','10000 g']),
    TQ('Thước kẻ đo gì?','Độ dài',['Cân nặng','Thời gian','Nhiệt độ']),
    MQ('2000đ + 5000đ = ? đ',7000),
    MQ('10000đ − 3000đ = ? đ',7000),
    TQ('Tờ tiền nào nhỏ nhất?','1000đ',['2000đ','5000đ','500đ']),
  ];return qs[R(0,l<=4?4:qs.length-1)]}},
];

// ============ VIETNAMESE SKILLS ============
var VIET_SKILLS=[
  {id:'v2_ct',name:'Chính tả',emoji:'✍️',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('Viết đúng: con ___ó bay cao','ch',['tr','s','x'],'ch hay tr'),
    TQ('Viết đúng: cây ___e phủ bóng mát','tr',['ch','s','x'],'tr hay ch'),
    TQ('Viết đúng: ___ ông trăng tròn','tr',['ch','s','x']),
    TQ('Viết đúng: bà con ___ óm','ch',['tr','gi','d']),
    TQ('Viết đúng: ___ inh sao trên trời','x',['s','ch','tr'],'s hay x'),
    TQ('Viết đúng: quyển ___ ách','s',['x','tr','ch']),
    TQ('Viết đúng: ___ a mẹ đi chợ','gi',['d','r','v'],'gi hay d'),
    TQ('Viết đúng: ___ ặt trời mọc','m',['n','l','d']),
    TQ('Viết đúng: buổi ___ áng đi học','s',['x','ch','tr']),
    TQ('Viết đúng: con ___ ùa biết bơi','r',['d','gi','v'],'r hay d'),
    TQ('"Trường" hay "Chường"?','Trường',['Chường','Xường','Sường']),
    TQ('"Chăm chỉ" hay "Trăm trỉ"?','Chăm chỉ',['Trăm trỉ','Chăm trỉ','Trăm chỉ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_tuloai',name:'Từ loại',emoji:'🏷️',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('Từ nào chỉ SỰ VẬT?','cái bàn',['chạy nhảy','rất đẹp','nhanh chóng'],'Danh từ = sự vật'),
    TQ('Từ nào chỉ HOẠT ĐỘNG?','đọc sách',['ngôi nhà','xinh đẹp','to lớn'],'Động từ'),
    TQ('Từ nào chỉ ĐẶC ĐIỂM?','xinh đẹp',['con mèo','đi học','ăn cơm'],'Tính từ'),
    TQ('Từ nào chỉ SỰ VẬT?','bông hoa',['chạy','cao','nhanh']),
    TQ('Từ nào chỉ HOẠT ĐỘNG?','viết bài',['cái ghế','rất to','xanh']),
    TQ('Từ nào chỉ ĐẶC ĐIỂM?','nhỏ bé',['quyển vở','nhảy dây','uống nước']),
    TQ('"Cô giáo" là từ chỉ gì?','Sự vật (người)',['Hoạt động','Đặc điểm','Số lượng']),
    TQ('"Chăm chỉ" là từ chỉ gì?','Đặc điểm',['Sự vật','Hoạt động','Số lượng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_cau',name:'Kiểu câu',emoji:'💬',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('"Bạn Lan là học sinh"\nKiểu câu gì?','Ai là gì?',['Ai làm gì?','Ai thế nào?','Câu hỏi']),
    TQ('"Mẹ nấu cơm"\nKiểu câu gì?','Ai làm gì?',['Ai là gì?','Ai thế nào?','Câu hỏi']),
    TQ('"Bông hoa rất đẹp"\nKiểu câu gì?','Ai thế nào?',['Ai là gì?','Ai làm gì?','Câu hỏi']),
    TQ('"Bố em là bác sĩ"\nKiểu câu gì?','Ai là gì?',['Ai làm gì?','Ai thế nào?','Câu hỏi']),
    TQ('"Con mèo ngủ trên ghế"\nKiểu câu gì?','Ai làm gì?',['Ai là gì?','Ai thế nào?','Câu hỏi']),
    TQ('"Trời hôm nay rất nóng"\nKiểu câu gì?','Ai thế nào?',['Ai là gì?','Ai làm gì?','Câu hỏi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_tv',name:'Từ vựng',emoji:'📚',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('Trái nghĩa "to"?','nhỏ',['lớn','cao','dài']),
    TQ('Trái nghĩa "nhanh"?','chậm',['mạnh','yếu','khỏe']),
    TQ('Trái nghĩa "đẹp"?','xấu',['xinh','tốt','giỏi']),
    TQ('Đồng nghĩa "vui"?','vui vẻ',['buồn','giận','sợ']),
    TQ('Đồng nghĩa "giỏi"?','tài giỏi',['dở','kém','lười']),
    TQ('Trái nghĩa "sáng"?','tối',['đêm','trưa','chiều']),
    TQ('Từ nào cùng nhóm:\nchó, mèo, gà, ___?','thỏ',['bàn','cây','sách']),
    TQ('Trái nghĩa "khỏe"?','yếu',['mạnh','to','béo']),
    TQ('Đồng nghĩa "chăm chỉ"?','siêng năng',['lười biếng','nhanh nhẹn','thông minh']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_dien',name:'Điền từ',emoji:'✏️',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('Con mèo ____ trên mái nhà','ngồi',['bay','bơi','lặn']),
    TQ('Mặt trời ____ rực rỡ','chiếu',['mưa','gió','tối']),
    TQ('Em bé ____ sữa rất ngon','uống',['viết','đọc','vẽ']),
    TQ('Chim ____ trên bầu trời','bay',['bơi','chạy','bò']),
    TQ('Hoa hồng ____ rất thơm','nở',['hát','khóc','cười']),
    TQ('Cá ____ dưới ao','bơi',['bay','chạy','nhảy']),
    TQ('Mùa xuân ____ ấm áp','trời',['đất','nước','lửa']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_dauca',name:'Dấu câu',emoji:'❗',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"Em đi học___"\nĐiền dấu?','dấu chấm (.)',['dấu hỏi (?)','dấu phẩy (,)','dấu than (!)']),
    TQ('"Bạn tên là gì___"\nĐiền dấu?','dấu hỏi (?)',['dấu chấm (.)','dấu phẩy (,)','dấu than (!)']),
    TQ('"Ôi, đẹp quá___"\nĐiền dấu?','dấu than (!)',['dấu chấm (.)','dấu hỏi (?)','dấu phẩy (,)']),
    TQ('Cuối câu kể dùng dấu gì?','Dấu chấm (.)',['Dấu hỏi (?)','Dấu than (!)','Dấu phẩy (,)']),
    TQ('Cuối câu hỏi dùng dấu gì?','Dấu hỏi (?)',['Dấu chấm (.)','Dấu than (!)','Dấu hai chấm (:)']),
    TQ('"Mẹ mua táo___ cam___ nho"\nĐiền dấu?','dấu phẩy (,)',['dấu chấm (.)','dấu hỏi (?)','dấu than (!)']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v2_sapxep',name:'Sắp câu',emoji:'🔀',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('Sắp xếp:\n"học / Em / chăm chỉ"','Em học chăm chỉ',['Học Em chăm chỉ','Chăm chỉ Em học','Học chăm chỉ Em']),
    TQ('Sắp xếp:\n"nấu / Mẹ / ngon / cơm / rất"','Mẹ nấu cơm rất ngon',['Nấu cơm Mẹ rất ngon','Rất ngon Mẹ nấu cơm','Cơm nấu Mẹ rất ngon']),
    TQ('Sắp xếp:\n"đẹp / Hoa / rất / hồng"','Hoa hồng rất đẹp',['Rất đẹp hoa hồng','Đẹp rất hoa hồng','Hồng hoa rất đẹp']),
    TQ('Sắp xếp:\n"ăn / Con / cỏ / bò"','Con bò ăn cỏ',['Cỏ ăn con bò','Ăn cỏ con bò','Bò con ăn cỏ']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENGLISH SKILLS ============
var ENG_SKILLS=[
  {id:'e2_family',name:'Family',emoji:'👨‍👩‍👧',color:'rgba(167,139,250,.2)',gen:function(l){var qs=[
    TQ('"Mẹ" in English?','mom',['dad','sister','brother']),
    TQ('"Bố" in English?','dad',['mom','uncle','grandpa']),
    TQ('"Bà" in English?','grandma',['grandpa','mom','aunt']),
    TQ('"Ông" in English?','grandpa',['grandma','dad','uncle']),
    TQ('"Anh/em trai" in English?','brother',['sister','friend','father']),
    TQ('"Chị/em gái" in English?','sister',['brother','mother','aunt']),
    TQ('Is this your mom?\n→ Yes, ___','it is',['she is','he is','I am']),
    TQ('This is my ___.\n(bố)','dad',['mom','sister','baby']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e2_feel',name:'Feelings',emoji:'😊',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('😊 = ?','happy',['sad','angry','tired']),
    TQ('😢 = ?','sad',['happy','hungry','tired']),
    TQ('😴 = ?','tired',['happy','sad','hungry']),
    TQ('🤤 = ?','hungry',['thirsty','happy','angry']),
    TQ('😡 = ?','angry',['happy','sad','tired']),
    TQ('"He\'s ___" (buồn)','sad',['happy','tired','hungry']),
    TQ('"She\'s ___" (vui)','happy',['sad','angry','tired']),
    TQ('"Khát nước" in English?','thirsty',['hungry','tired','angry']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e2_clothes',name:'Clothes',emoji:'👗',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('👟 = ?','shoes',['hat','shirt','pants']),
    TQ('👒 = ?','hat',['shoes','dress','shirt']),
    TQ('👗 = ?','dress',['shirt','pants','hat']),
    TQ('👕 = ?','T-shirt',['dress','shoes','hat']),
    TQ('👖 = ?','pants',['shirt','dress','shoes']),
    TQ('🧦 = ?','socks',['shoes','hat','shirt']),
    TQ('"Are these his ___?"\n(quần)','pants',['shoes','socks','hats']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e2_prepos',name:'In/On/Under',emoji:'📍',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('The ball is ___ the box\n(bên trong)','in',['on','under','next to']),
    TQ('The book is ___ the table\n(trên)','on',['in','under','behind']),
    TQ('The cat is ___ the bed\n(dưới)','under',['on','in','next to']),
    TQ('"Where\'s the ball?"\n"It\'s ___ the table" (trên)','on',['in','under','behind']),
    TQ('"Where\'s the doll?"\n"It\'s ___ the box" (trong)','in',['on','under','behind']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e2_rooms',name:'My House',emoji:'🏠',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('"Phòng bếp" in English?','kitchen',['bedroom','bathroom','garden']),
    TQ('"Phòng ngủ" in English?','bedroom',['kitchen','bathroom','garden']),
    TQ('"Phòng tắm" in English?','bathroom',['kitchen','bedroom','garden']),
    TQ('"Phòng khách" in English?','living room',['bedroom','kitchen','garden']),
    TQ('"Vườn" in English?','garden',['kitchen','bedroom','bathroom']),
    TQ('Where\'s Grandma?\nShe\'s in the ___ (bếp)','kitchen',['bedroom','garden','bathroom']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e2_transport',name:'Transport',emoji:'🚌',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('🚌 = ?','bus',['car','bike','train']),
    TQ('🚗 = ?','car',['bus','bike','boat']),
    TQ('🚲 = ?','bike',['car','bus','train']),
    TQ('🚂 = ?','train',['bus','car','boat']),
    TQ('⛵ = ?','boat',['car','bus','train']),
    TQ('"I go to school by ___"\n(xe buýt)','bus',['car','bike','boat']),
    TQ('"Đi bộ" in English?','walk',['run','drive','fly']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ TU NHIEN & XA HOI SKILLS ============
var TNXH_SKILLS=[
  {id:'tn2_cothe',name:'Cơ thể người',emoji:'🧒',color:'rgba(239,154,154,.2)',gen:function(l){var qs=[
    TQ('Bộ phận nào giúp ta thở?','Phổi',['Tim','Dạ dày','Gan']),
    TQ('Tim nằm ở đâu?','Trong lồng ngực',['Trong bụng','Trên đầu','Ở tay']),
    TQ('Xương giúp cơ thể?','Nâng đỡ, bảo vệ',['Tiêu hóa','Thở','Nghe']),
    TQ('Cơ quan nào tiêu hóa?','Dạ dày, ruột',['Phổi','Tim','Não']),
    TQ('Não nằm ở đâu?','Trong hộp sọ',['Trong bụng','Ở ngực','Ở tay']),
    TQ('Máu được bơm bởi?','Tim',['Phổi','Gan','Thận']),
    TQ('Người có bao nhiêu răng sữa?','20 răng',['32 răng','10 răng','50 răng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn2_thucvat',name:'Thực vật & ĐV',emoji:'🌱',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Cây xanh tạo ra gì?','Ôxy (khí thở)',['Nước','Lửa','Đất']),
    TQ('Động vật ăn cỏ gọi là?','Động vật ăn cỏ',['Động vật ăn thịt','Động vật bay','Động vật bơi']),
    TQ('Con nào là động vật ăn thịt?','Hổ',['Bò','Dê','Thỏ']),
    TQ('Cây lấy nước qua đâu?','Rễ',['Lá','Hoa','Thân']),
    TQ('Quang hợp cần gì?','Ánh sáng + nước',['Tối + khô','Gió + mưa','Lửa + đất']),
    TQ('Con nào đẻ trứng?','Gà',['Chó','Mèo','Bò']),
    TQ('Con nào là côn trùng?','Bướm',['Cá','Ếch','Chim']),
    TQ('Hạt nảy mầm cần gì?','Nước, đất, ánh sáng',['Kẹo','Sữa','Cơm']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn2_traidat',name:'Trái Đất',emoji:'🌍',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Trái Đất có hình gì?','Hình cầu (tròn)',['Hình vuông','Hình tam giác','Phẳng']),
    TQ('Mặt Trời là gì?','Ngôi sao',['Hành tinh','Mặt Trăng','Đám mây']),
    TQ('Ngày và đêm do đâu?','Trái Đất quay',['Mặt Trăng','Gió thổi','Mây che']),
    TQ('Bề mặt Trái Đất có gì?','Đất liền và đại dương',['Chỉ nước','Chỉ đất','Chỉ cát']),
    TQ('Mặt Trăng quay quanh?','Trái Đất',['Mặt Trời','Sao Hỏa','Sao Kim']),
    TQ('Một năm có mấy mùa?','4 mùa',['2 mùa','3 mùa','12 mùa']),
    TQ('Nước biển có vị gì?','Mặn',['Ngọt','Chua','Đắng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'tn2_suckhoe',name:'Sức khỏe',emoji:'💪',color:'rgba(255,138,101,.2)',gen:function(l){var qs=[
    TQ('Để khỏe mạnh cần?','Ăn đủ chất, tập TD',['Ăn kẹo nhiều','Ngủ cả ngày','Chơi game']),
    TQ('Thực phẩm nào tốt cho sức khỏe?','Rau, trái cây',['Kẹo, bánh ngọt','Nước ngọt','Mì tôm']),
    TQ('Ngủ đủ giấc giúp?','Khỏe mạnh, thông minh',['Béo lên','Lười hơn','Chậm hơn']),
    TQ('Khi bị ốm em nên?','Nói bố mẹ, đi khám',['Giấu đi','Tự uống thuốc','Không nói ai']),
    TQ('Nên uống gì mỗi ngày?','Nước lọc',['Nước ngọt','Trà sữa','Coca']),
    TQ('Tập thể dục giúp?','Khỏe mạnh',['Ốm hơn','Mệt mãi','Lười hơn']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ DAO DUC SKILLS ============
var DAODUC_SKILLS=[
  {id:'dd2_bieton',name:'Biết ơn',emoji:'🙏',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Em biết ơn ai nhất?','Bố mẹ, thầy cô',['Siêu nhân','Robot','Máy tính']),
    TQ('Ngày Nhà giáo VN là?','20 tháng 11',['1 tháng 6','8 tháng 3','2 tháng 9']),
    TQ('Biết ơn thầy cô bằng cách?','Học giỏi, lễ phép',['Nghỉ học','Không nghe lời','Nói xấu']),
    TQ('"Ăn quả nhớ kẻ trồng cây" là?','Biết ơn',['Trồng cây','Ăn quả','Quên ơn']),
    TQ('Biết ơn bố mẹ bằng cách?','Nghe lời, giúp việc nhà',['Đòi mua đồ','Không học','La hét']),
    TQ('Ai nuôi em lớn?','Bố mẹ',['Thầy cô','Bạn bè','Hàng xóm']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd2_chiase',name:'Chia sẻ',emoji:'🤝',color:'rgba(129,212,250,.2)',gen:function(l){var qs=[
    TQ('Bạn không có bút, em nên?','Cho bạn mượn',['Mặc kệ','Giấu bút đi','Trêu bạn']),
    TQ('Chia sẻ là gì?','Cho bạn cùng dùng',['Giữ hết cho mình','Giấu đồ','Không cho ai']),
    TQ('Khi có nhiều kẹo, em?','Chia cho bạn',['Ăn hết','Giấu đi','Khoe bạn']),
    TQ('Bạn buồn, em nên?','An ủi, chia sẻ',['Trêu bạn','Bỏ đi','Cười bạn']),
    TQ('Chia sẻ giúp em?','Có nhiều bạn tốt',['Mất đồ','Bị ghét','Buồn hơn']),
    TQ('Khi bạn ngã, em nên?','Đỡ bạn dậy',['Cười','Bỏ đi','Trêu bạn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd2_moitruong',name:'Bảo vệ MT',emoji:'🌍',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Rác thải bỏ ở đâu?','Thùng rác',['Sông suối','Bãi cỏ','Đường đi']),
    TQ('Trồng cây giúp gì?','Không khí sạch',['Nóng hơn','Bẩn hơn','Ồn hơn']),
    TQ('Tiết kiệm nước bằng cách?','Tắt vòi khi không dùng',['Mở vòi cả ngày','Đổ nước đi','Tắm lâu']),
    TQ('Ô nhiễm là gì?','Nước, không khí bẩn',['Trời đẹp','Nước sạch','Không khí trong']),
    TQ('Giấy có thể tái chế không?','Có',['Không','Không biết','Cũng được']),
    TQ('Nên đi bằng gì để bảo vệ MT?','Xe đạp, đi bộ',['Ô tô','Máy bay','Xe máy']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd2_giaothong',name:'An toàn GT',emoji:'🚦',color:'rgba(239,83,80,.2)',gen:function(l){var qs=[
    TQ('Đèn đỏ nghĩa là?','Dừng lại',['Đi tiếp','Chạy nhanh','Đi chậm']),
    TQ('Đèn xanh nghĩa là?','Được đi',['Dừng lại','Đi chậm','Quay lại']),
    TQ('Đèn vàng nghĩa là?','Chuẩn bị dừng',['Chạy nhanh','Đi tiếp','Quay lại']),
    TQ('Qua đường phải đi ở đâu?','Vạch kẻ đường',['Giữa đường','Đâu cũng được','Chạy qua']),
    TQ('Ngồi xe máy phải đội?','Mũ bảo hiểm',['Mũ lưỡi trai','Nón lá','Không cần']),
    TQ('Đi bộ phải đi ở?','Vỉa hè',['Giữa đường','Lòng đường','Đâu cũng được']),
    TQ('Khi qua đường em phải?','Nhìn trái, nhìn phải',['Nhắm mắt chạy','Không cần nhìn','Chạy thật nhanh']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENCOURAGEMENT MESSAGES ============
var CORGI_TAP=['Cáo yêu bé!','Hoan hô!','🦊','Giỏi!','💕','Wow!','🌟','Chơi tiếp!','Tuyệt!','👏'];
var C_MSGS=[{t:'Giỏi quá!',s:'Bé siêu đỉnh! 🌟'},{t:'Đúng rồi!',s:'Cáo mừng lắm! 🦊'},{t:'Tuyệt vời!',s:'Combo lên nào! 🔥'},{t:'Wow!',s:'Thiên tài nhí! 🧠'},{t:'Perfect!',s:'Cáo tự hào! 🦊'},{t:'Amazing!',s:'Keep going! 💪'},{t:'Siêu sao!',s:'Ngôi sao sáng! ⭐'}];
var W_MSGS=[{t:'Oops!',s:'Thử lại nha! 💕'},{t:'Hmm...',s:'Cáo tin bé! 🦊'},{t:'Gần đúng!',s:'Cố lên! 💪'}];

// ============ GRADE CONFIG ============
window.GRADE_CONFIG={
  id:'lop2',
  gradeName:'Lớp 2',
  saveKey:'vuongquoc_lop2',
  oldSaveKey:null,
  xpPerLevel:90,
  passThreshold:65,
  maxSkillLevel:8,
  hasLives:true,
  livesCount:3,
  gatingMode:'per_subject',
  questionsPerRound:10,
  timePerQuestion:30,
  levelRewardRate:35,
  speeches:[
    ['Toán lớp 2 dễ lắm!','Nhân chia hôm nay nhé!','Cáo thích toán!'],
    ['Tiếng Việt hay lắm!','Chính tả giỏi nè!','Đọc chữ cùng Cáo!'],
    ['English is fun!','Let\'s learn together!','Fox says Hello!'],
    ['Thiên nhiên thú vị!','Cơ thể kỳ diệu!','Cáo biết nhiều lắm!'],
    ['Bé ngoan lắm!','An toàn giao thông nhé!','Cáo yêu bé ngoan!'],
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#22d3ee'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#f472b6'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#a78bfa'},
    {id:'tnxh',name:'TN & XH',emoji:'🌿',skills:TNXH_SKILLS,color:'#66bb6a'},
    {id:'daoduc',name:'Đạo Đức',emoji:'💝',skills:DAODUC_SKILLS,color:'#ec407a'},
  ],
};
