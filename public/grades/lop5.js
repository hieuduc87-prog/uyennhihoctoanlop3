// ============ LOP 5 — SKILLS + GRADE CONFIG ============
// This file loads BEFORE engine.js

// ============ MATH SKILLS ============
var MATH_SKILLS=[
  {id:'m5_dec',name:'Số Thập Phân',emoji:'🔢',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=2){var a=(R(10,99)/10),b=(R(10,99)/10);a=Math.round(a*10)/10;b=Math.round(b*10)/10;return MQ(a+' + '+b+' = ?',Math.round((a+b)*10)/10,'Cộng số thập phân')}
    if(l<=3){var a=(R(100,999)/10),b=(R(100,999)/10);a=Math.round(a*10)/10;b=Math.round(b*10)/10;if(a<b){var t=a;a=b;b=t}return MQ(a+' − '+b+' = ?',Math.round((a-b)*10)/10,'Trừ số thập phân')}
    if(l<=4){var a=(R(10,50)/10),b=R(2,9);a=Math.round(a*10)/10;return MQ(a+' × '+b+' = ?',Math.round(a*b*10)/10,'Nhân số thập phân')}
    var a=R(2,9)*R(2,9),b=R(2,9);return MQ(a+' : '+b+' = ?',Math.round(a/b*10)/10,'Chia → số thập phân')}},
  {id:'m5_pct',name:'Phần Trăm',emoji:'%',color:'rgba(255,107,157,.2)',gen:function(l){
    if(l<=2){var pcts=[10,20,25,50];var p=pcts[R(0,3)];var n=R(2,20)*100/p;return MQ(p+'% của '+n+' = ?',n*p/100,'Lấy số × % : 100')}
    if(l<=3){var a=R(10,50),b=R(50,200);return MQ(a+' là bao nhiêu % của '+b+'?',a*100/b,'(a:b)×100')}
    var p=R(5,30),v=p*R(2,10);return MQ('Biết '+p+'% của số A = '+v+'\nSố A = ?',v*100/p,'A = giá trị : % × 100')}},
  {id:'m5_frac',name:'Phân Số NC',emoji:'🍕',color:'rgba(192,132,252,.2)',gen:function(l){
    if(l<=2){var d=R(2,9),n1=R(1,5),n2=R(1,5);return MQ(n1+'/'+d+' + '+n2+'/'+d+' = ?/'+d,n1+n2,'Cùng mẫu → cộng tử')}
    if(l<=3){var d=R(2,9),n1=R(1,d-1),n2=R(1,n1);return MQ(n1+'/'+d+' − '+n2+'/'+d+' = ?/'+d,n1-n2)}
    if(l<=4){var n1=R(1,5),d1=R(2,6),n2=R(1,5),d2=R(2,6);return MQ(n1+'/'+d1+' × '+n2+'/'+d2+' = ?/'+(d1*d2),n1*n2,'Tử×tử, mẫu×mẫu')}
    var n=R(1,5),d=R(2,9),t=d*R(2,8);return MQ(n+'/'+d+' của '+t+' = ?',Math.round(t*n/d))}},
  {id:'m5_vol',name:'Thể Tích',emoji:'📦',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=2){var a=R(2,10);return Math.random()>.5?MQ('Hình lập phương cạnh '+a+'cm\nThể tích = ? cm³',a*a*a,'V = a×a×a'):MQ('Hình lập phương cạnh '+a+'cm\nDiện tích toàn phần = ? cm²',a*a*6,'Diện tích toàn phần = a×a×6')}
    if(l<=4){var a=R(3,10),b=R(2,8),c=R(2,6);return Math.random()>.5?MQ('Hình hộp chữ nhật '+a+'×'+b+'×'+c+'cm\nThể tích = ? cm³',a*b*c,'V = d×r×c'):MQ('Hình hộp chữ nhật '+a+'×'+b+'×'+c+'cm\nDiện tích xung quanh = ?',(a+b)*2*c,'Diện tích xung quanh = (d+r)×2×c')}
    var a=R(3,8),b=R(2,6),c=R(2,5);return MQ('Hình hộp chữ nhật '+a+'×'+b+'×'+c+'cm\nDiện tích toàn phần = ?',(a+b)*2*c+2*a*b,'Diện tích toàn phần = Diện tích xung quanh + 2×đáy')}},
  {id:'m5_speed',name:'Vận Tốc',emoji:'🚗',color:'rgba(251,191,36,.2)',gen:function(l){
    if(l<=2){var v=R(30,80),t=R(2,5);return MQ('Vận tốc '+v+'km/h\nThời gian '+t+' giờ\nQuãng đường = ? km',v*t,'S = v × t')}
    if(l<=3){var s=R(50,200),t=R(2,5);while(s%t!==0){s++}return MQ('Quãng đường '+s+'km\nThời gian '+t+' giờ\nVận tốc = ? km/h',s/t,'v = S : t')}
    var v=R(30,80),s=R(100,400);while(s%v!==0){s++}return MQ('Vận tốc '+v+'km/h\nQuãng đường '+s+'km\nThời gian = ? giờ',s/v,'t = S : v')}},
  {id:'m5_circle',name:'Hình Tròn',emoji:'⭕',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=2){var r=R(2,10);return MQ('Hình tròn bán kính '+r+'cm\nĐường kính = ? cm',r*2,'d = r × 2')}
    if(l<=3){var r=R(2,10);return MQ('Hình tròn bán kính '+r+'cm\nChu vi = ? cm',Math.round(2*r*3.14*100)/100,'C = 2 × r × 3,14')}
    var r=R(2,8);return MQ('Hình tròn bán kính '+r+'cm\nDiện tích = ? cm²',Math.round(r*r*3.14*100)/100,'S = r × r × 3,14')}},
  {id:'m5_area',name:'Diện Tích',emoji:'📐',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=2){var a=R(3,15),h=R(3,10);return MQ('Tam giác đáy '+a+'cm\ncao '+h+'cm\nDiện tích = ? cm²',a*h/2,'S = đáy × cao : 2')}
    if(l<=3){var a=R(5,15),b=R(3,10),h=R(3,8);return MQ('Hình thang\nđáy '+a+'cm, '+b+'cm\ncao '+h+'cm\nDiện tích = ?',(a+b)*h/2,'S = (a+b)×h:2')}
    var a=R(3,12),h=R(3,10);return MQ('Hình bình hành\nđáy '+a+'cm, cao '+h+'cm\nDiện tích = ?',a*h)}},
  {id:'m5_conv',name:'Đổi Đơn Vị',emoji:'📏',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    MQ('2,5 km = ? m',2500),MQ('3500 m = ? km',3.5),
    MQ('1,5 tấn = ? kg',1500),MQ('2500 g = ? kg',2.5),
    MQ('3 m² = ? dm²',300),MQ('5000 cm² = ? dm²',50),
    MQ('2 dm³ = ? cm³',2000),MQ('4000 ml = ? lít',4),
    TQ('1 m³ = ? dm³','1000',['100','10','10000']),
    TQ('1 m² = ? dm²','100',['10','1000','10000']),
  ];return qs[R(0,l<=3?5:qs.length-1)]}},
  {id:'m5_expr',name:'Biểu Thức',emoji:'🧮',color:'rgba(251,191,36,.2)',gen:function(l){
    if(l<=2){var a=R(10,50),b=R(2,9),c=R(2,9);return MQ(a+' + '+b+' × '+c+' = ?',a+b*c,'Nhân trước')}
    if(l<=3){var a=R(10,50),b=R(2,9),c=R(2,9);return MQ(a+' − '+b+' × '+c+' = ?',a-b*c)}
    var a=R(2,10),b=R(2,10),c=R(2,5),d=R(1,10);return MQ('('+a+' + '+b+') × '+c+' − '+d+' = ?',(a+b)*c-d)}},
  {id:'m5_word',name:'Toán Đố',emoji:'📝',color:'rgba(255,107,157,.2)',gen:function(l){var tps=[
    function(){var p=R(10,40),n=R(100,500);return MQ(p+'% của '+n+' = ?',n*p/100,'Phần trăm')},
    function(){var v=R(30,60),t=R(2,4);return MQ('Xe chạy '+v+'km/h\nĐi trong '+t+' giờ\nQuãng đường = ?',v*t,'S = v × t')},
    function(){var a=R(3,8),b=R(2,5),c=R(2,4);return MQ('Hộp dài '+a+' rộng '+b+' cao '+c+'cm\nV = ?',a*b*c)},
    function(){var a=R(10,30),b=R(10,30),c=R(10,30);var s=a+b+c;if(s%3!==0){c=c+(3-s%3)}return MQ('Trung bình cộng của '+a+', '+b+', '+c+' = ?',(a+b+c)/3)},
  ];return tps[R(0,tps.length-1)]()}},
];

// ============ VIETNAMESE SKILLS ============
var VIET_SKILLS=[
  {id:'v5_ct',name:'Chính Tả',emoji:'✍️',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"Xứ sở" hay "Sứ xở"?','Xứ sở',['Sứ xở','Xứ xở','Sứ sở']),
    TQ('"Giữ gìn" hay "Dữ dìn"?','Giữ gìn',['Dữ dìn','Giữ dìn','Dữ gìn']),
    TQ('"Trưởng thành" hay "Chưởng thành"?','Trưởng thành',['Chưởng thành','Trưởng chành','Chưởng chành']),
    TQ('"Sản xuất" hay "Xản suất"?','Sản xuất',['Xản suất','Sản suất','Xản xuất']),
    TQ('"Rực rỡ" hay "Dực dỡ"?','Rực rỡ',['Dực dỡ','Rực dỡ','Dực rỡ']),
    TQ('"Nổi tiếng" hay "Lổi tiếng"?','Nổi tiếng',['Lổi tiếng','Nổi tiến','Lổi tiến'],'n/l'),
    TQ('"Giáo dục" hay "Dáo dục"?','Giáo dục',['Dáo dục','Giáo giục','Dáo giục']),
    TQ('"Chuyên cần" hay "Truyên cần"?','Chuyên cần',['Truyên cần','Chuyên cằn','Truyên cằn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_caugh',name:'Câu Ghép',emoji:'🔗',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('"Vì trời mưa nên em ở nhà"\nQuan hệ gì?','Nguyên nhân - Kết quả',['Tương phản','Điều kiện','Tăng tiến']),
    TQ('"Nếu chăm học thì sẽ giỏi"\nQuan hệ gì?','Điều kiện - Kết quả',['Nguyên nhân','Tương phản','Tăng tiến']),
    TQ('"Tuy mệt nhưng em vẫn học"\nQuan hệ gì?','Tương phản',['Nguyên nhân','Điều kiện','Tăng tiến']),
    TQ('"Không những giỏi mà còn ngoan"\nQuan hệ gì?','Tăng tiến',['Tương phản','Nguyên nhân','Điều kiện']),
    TQ('Cặp quan hệ từnguyên nhân?','vì...nên',['tuy...nhưng','nếu...thì','không những...mà còn']),
    TQ('Cặp quan hệ từtương phản?','tuy...nhưng',['vì...nên','nếu...thì','không những...mà còn']),
    TQ('Cặp quan hệ từđiều kiện?','nếu...thì',['vì...nên','tuy...nhưng','không những...mà còn']),
    TQ('"Do trời nắng nên rất nóng"\nQuan hệ?','Nguyên nhân - Kết quả',['Điều kiện','Tương phản','Tăng tiến']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_qht',name:'Quan Hệ Từ',emoji:'🔀',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('Điền: "___ trời mưa ___ em ở nhà"','Vì...nên',['Tuy...nhưng','Nếu...thì','Mặc dù...nhưng']),
    TQ('Điền: "___ chăm chỉ ___ sẽ giỏi"','Nếu...thì',['Vì...nên','Tuy...nhưng','Do...nên']),
    TQ('Điền: "___ mệt ___ em vẫn học"','Tuy...nhưng',['Vì...nên','Nếu...thì','Do...nên']),
    TQ('"và, nhưng, vì, nên" là?','Quan hệ từ',['Danh từ','Động từ','Tính từ']),
    TQ('Từ nào là quan hệ từ?','nhưng',['chạy','đẹp','ngôi nhà']),
    TQ('Quan hệ từ dùng để?','Nối các vế câu',['Gọi tên sự vật','Chỉ hành động','Chỉ đặc điểm']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_dongam',name:'Từ Đồng Âm',emoji:'🔤',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('"Đường" trong "đường đi"\nvà "đường ăn" là?','Từ đồng âm',['Từ đồng nghĩa','Từ trái nghĩa','Từ láy'],'Giống âm, khác nghĩa'),
    TQ('"Lá" trong "lá cây"\nvà "lá thư" là?','Từ nhiều nghĩa',['Từ đồng âm','Từ trái nghĩa','Từ láy'],'Cùng gốc, mở rộng nghĩa'),
    TQ('"Chín" trong "quả chín"\nvà "số chín" là?','Từ đồng âm',['Từ nhiều nghĩa','Từ đồng nghĩa','Từ láy']),
    TQ('Từ đồng âm là?','Giống âm, khác nghĩa',['Giống nghĩa','Trái nghĩa','Giống vần']),
    TQ('Từ nhiều nghĩa là?','1 từ, nhiều nghĩa liên quan',['Giống âm, khác nghĩa','Trái nghĩa','Giống vần']),
    TQ('"Ăn cơm" và "ăn Tết"\n"ăn" là?','Từ nhiều nghĩa',['Từ đồng âm','Từ trái nghĩa','Từ láy']),
    TQ('"Bay" (chim bay)\nvà "bay" (màu bay) là?','Từ đồng âm',['Từ nhiều nghĩa','Từ đồng nghĩa','Từ láy']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_bptt',name:'Biện Pháp Tu Từ',emoji:'🎨',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('"Trẻ em như búp trên cành"?\nBiện pháp?','So sánh',['Nhân hóa','Ẩn dụ','Hoán dụ']),
    TQ('"Ông mặt trời tươi cười"?\nBiện pháp?','Nhân hóa',['So sánh','Ẩn dụ','Hoán dụ']),
    TQ('"Thuyền về có nhớ bến chăng"?\n(thuyền=người đi)','Ẩn dụ',['So sánh','Nhân hóa','Hoán dụ'],'Gọi A bằng B'),
    TQ('"Áo xanh chào áo trắng"?\n(áo=người mặc áo)','Hoán dụ',['Ẩn dụ','So sánh','Nhân hóa'],'Lấy đặc điểm gọi người'),
    TQ('"Học, học nữa, học mãi"?\nBiện pháp?','Điệp ngữ',['So sánh','Nhân hóa','Ẩn dụ']),
    TQ('Ẩn dụ khác hoán dụ ở?','Ẩn dụ: tương đồng\nHoán dụ: gần gũi',['Giống nhau','Ẩn dụ = so sánh','Hoán dụ = nhân hóa']),
    TQ('"Mặt trời đỏ như lửa"\nBiện pháp?','So sánh',['Nhân hóa','Ẩn dụ','Hoán dụ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_lk',name:'Liên Kết Câu',emoji:'🔗',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"Lan rất ngoan. Bạn ấy học giỏi"\nPhép liên kết?','Phép thế',['Phép lặp','Phép nối','Phép liệt kê'],'Dùng "bạn ấy" thay "Lan"'),
    TQ('"Em yêu trường. Trường có nhiều hoa"\nPhép liên kết?','Phép lặp',['Phép thế','Phép nối','Phép liệt kê'],'Lặp từ "trường"'),
    TQ('"Trời mưa. Vì vậy, em ở nhà"\nPhép liên kết?','Phép nối',['Phép lặp','Phép thế','Phép liệt kê'],'Dùng "vì vậy"'),
    TQ('Từ nào dùng để nối câu?','vì vậy, do đó',['và, với','ôi, chao','ai, gì']),
    TQ('Phép thế là?','Dùng từ khác thay thế',['Lặp lại từ','Dùng từ nối','Bỏ từ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_tv',name:'Từ Vựng NC',emoji:'📚',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('Trái nghĩa "hòa bình"?','chiến tranh',['yên bình','thanh bình','bình yên']),
    TQ('Đồng nghĩa "dũng cảm"?','can đảm',['nhát gan','yếu đuối','sợ hãi']),
    TQ('Trái nghĩa "đoàn kết"?','chia rẽ',['hợp nhất','gắn bó','thân thiết']),
    TQ('Đồng nghĩa "cần cù"?','chăm chỉ',['lười biếng','nhanh nhẹn','thông minh']),
    TQ('"Ăn quả nhớ kẻ trồng cây"\nnghĩa là?','Biết ơn',['Trồng cây','Ăn quả','Nhớ bạn']),
    TQ('Trái nghĩa "giàu có"?','nghèo khó',['sung sướng','đầy đủ','no ấm']),
    TQ('Đồng nghĩa "xinh đẹp"?','mỹ lệ',['xấu xí','bình thường','cao lớn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v5_sapxep',name:'Sắp Xếp Câu',emoji:'🔀',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('Sắp xếp:\n"đã / Nhờ / chăm chỉ / nên / Lan / đạt / giải"','Nhờ chăm chỉ nên Lan đã đạt giải',['Lan đã chăm chỉ nhờ nên đạt giải','Đạt giải nhờ Lan đã chăm chỉ nên','Nên Lan đã nhờ chăm chỉ đạt giải']),
    TQ('Sắp xếp:\n"là / Hà Nội / thủ đô / Việt Nam / của"','Hà Nội là thủ đô của Việt Nam',['Thủ đô Hà Nội là của Việt Nam','Việt Nam là thủ đô của Hà Nội','Của Việt Nam là Hà Nội thủ đô']),
    TQ('Sắp xếp:\n"Mặc dù / mưa / nhưng / trời / em / vẫn / đi học"','Mặc dù trời mưa nhưng em vẫn đi học',['Trời mưa mặc dù nhưng em vẫn đi học','Em vẫn đi học mặc dù nhưng trời mưa','Nhưng em vẫn mặc dù trời mưa đi học']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENGLISH SKILLS ============
var ENG_SKILLS=[
  {id:'e5_vocab',name:'Vocabulary',emoji:'🔤',color:'rgba(167,139,250,.2)',gen:function(l){var qs=[
    TQ('"Địa chỉ" in English?','address',['name','school','house']),
    TQ('"Kỳ nghỉ" in English?','holiday',['school','weekend','birthday']),
    TQ('"Mùa xuân" in English?','spring',['summer','autumn','winter']),
    TQ('"Mùa thu" in English?','autumn',['spring','summer','winter']),
    TQ('"Tương lai" in English?','future',['past','present','today']),
    TQ('"Bác sĩ thú y" in English?','vet',['doctor','nurse','farmer']),
    TQ('"Kỹ sư" in English?','engineer',['teacher','doctor','pilot']),
    TQ('"Giao thông" in English?','traffic',['travel','transport','street']),
    TQ('"Lâu đài" in English?','castle',['house','school','church']),
    TQ('"Truyện cổ tích" in English?','fairy tale',['story','novel','poem']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_past',name:'Past Simple',emoji:'⏪',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('"I ___ to school yesterday"','went',['go','goes','going']),
    TQ('"She ___ a book last night"','read',['reads','reading','read to']),
    TQ('"They ___ football yesterday"','played',['play','plays','playing']),
    TQ('"He ___ happy yesterday"','was',['is','are','were']),
    TQ('"We ___ at home last weekend"','were',['was','are','is']),
    TQ('"___ you go to the park?"','Did',['Do','Does','Are']),
    TQ('"She didn\'t ___ breakfast"','have',['has','had','having']),
    TQ('"I ___ my homework yesterday"','did',['do','does','doing']),
    TQ('"He ___ to Ha Noi last year"','visited',['visit','visits','visiting']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_future',name:'Future Simple',emoji:'⏩',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('"I ___ be a doctor"','will',['am','was','do']),
    TQ('"She ___ visit Da Nang"','will',['does','did','is']),
    TQ('"They ___ going to travel"','are',['is','am','will']),
    TQ('"I won\'t ___ late"','be',['am','is','was']),
    TQ('"___ you come tomorrow?"','Will',['Do','Did','Are']),
    TQ('"What do you want to ___\nin the future?"','be',['is','was','been']),
    TQ('"We are ___ to have a party"','going',['go','went','gone']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_modal',name:'Should/Must',emoji:'⚠️',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"You ___ eat more vegetables"','should',['shouldn\'t','mustn\'t','can\'t']),
    TQ('"You ___ stay up late"','shouldn\'t',['should','must','can']),
    TQ('"You ___ wear a helmet"','must',['mustn\'t','shouldn\'t','can\'t']),
    TQ('"You ___ cross the red light"','mustn\'t',['must','should','can']),
    TQ('"___ I go to the toilet?"','May',['Must','Should','Will']),
    TQ('"What should I do?"\n→ "You should ___"','see a doctor',['seeing a doctor','saw a doctor','sees a doctor']),
    TQ('"You ___ help your parents"','should',['shouldn\'t','mustn\'t','can\'t']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_compare',name:'So sánh',emoji:'📊',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('"An elephant is ___ than a cat"','bigger',['big','biggest','more big']),
    TQ('"She is ___ than her sister"','taller',['tall','tallest','more tall']),
    TQ('"This is the ___ city"','biggest',['bigger','big','more big']),
    TQ('"English is ___ than Maths"','more interesting',['interestinger','most interesting','interesting']),
    TQ('"Ha Noi is ___ than Da Nang"','bigger',['big','biggest','more big']),
    TQ('"This book is ___ than that one"','more expensive',['expensiver','most expensive','expensive']),
    TQ('Short adjective + "er" or "est"?\n"big → ___"','bigger',['more big','biger','most big']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_tenses',name:'Chia Thì',emoji:'⏰',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('"She ___ English every day"\n(hiện tại đơn)','studies',['study','studying','studied']),
    TQ('"They ___ now"\n(hiện tại tiếp diễn)','are playing',['play','played','plays']),
    TQ('"I ___ Da Lat last summer"\n(quá khứ đơn)','visited',['visit','will visit','am visiting']),
    TQ('"We ___ go camping tomorrow"\n(tương lai đơn)','will',['did','are','do']),
    TQ('"yesterday" dùng thì?','Past Simple',['Present Simple','Future Simple','Present Continuous']),
    TQ('"every day" dùng thì?','Present Simple',['Past Simple','Future Simple','Present Continuous']),
    TQ('"tomorrow" dùng thì?','Future Simple',['Past Simple','Present Simple','Present Continuous']),
    TQ('"right now" dùng thì?','Present Continuous',['Present Simple','Past Simple','Future Simple']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_reading',name:'Reading',emoji:'📖',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('"I have a headache"\nnghĩa là?','Em bị đau đầu',['Em bị đau bụng','Em bị sốt','Em bị ho']),
    TQ('"What\'s the matter?"\nnghĩa là?','Bạn bị sao?',['Bạn ở đâu?','Bạn tên gì?','Bạn thích gì?']),
    TQ('"I want to be a pilot"\nnghĩa là?','Em muốn làm phi công',['Em là phi công','Em thích bay','Em đi máy bay']),
    TQ('"It was great!"\nnghĩa là?','Tuyệt vời!',['Rất tệ!','Bình thường!','Rất buồn!']),
    TQ('"How was your holiday?"','Kỳ nghỉ thế nào?',['Bạn đi đâu?','Bạn làm gì?','Bạn ở đâu?']),
    TQ('"She is friendly and helpful"','Cô ấy thân thiện và hay giúp đỡ',['Cô ấy xinh đẹp','Cô ấy cao','Cô ấy giỏi']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e5_translate',name:'Dịch Câu',emoji:'🌐',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('Dịch: "Em đã đi Đà Nẵng"','I visited Da Nang',['I visit Da Nang','I will visit Da Nang','I am visiting Da Nang']),
    TQ('Dịch: "Cô ấy sẽ là bác sĩ"','She will be a doctor',['She is a doctor','She was a doctor','She can be a doctor']),
    TQ('Dịch: "Bạn nên uống nhiều nước"','You should drink more water',['You must drink water','You can drink water','You will drink water']),
    TQ('"I went to school by bike\nyesterday" nghĩa là?','Hôm qua em đi học bằng xe đạp',['Em đi học bằng xe đạp','Em sẽ đi xe đạp','Em đang đi xe đạp']),
    TQ('Dịch: "HN lớn hơn ĐN"','Ha Noi is bigger than Da Nang',['Ha Noi is big Da Nang','Ha Noi is biggest','Ha Noi bigger Da Nang']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ KHOA HOC SKILLS ============
var KHOAHOC_SKILLS=[
  {id:'kh5_biendoi',name:'Sự biến đổi',emoji:'🧪',color:'rgba(38,198,218,.2)',gen:function(l){var qs=[
    TQ('Sự biến đổi hóa học là?','Chất này thành chất khác',['Thay đổi hình dạng','Thay đổi kích thước','Tan trong nước']),
    TQ('Sắt bị gỉ là biến đổi?','Hóa học',['Vật lí','Sinh học','Không biến đổi']),
    TQ('Đá tan thành nước là?','Biến đổi vật lí',['Hóa học','Sinh học','Không biến đổi']),
    TQ('Đốt giấy là biến đổi?','Hóa học (tạo tro, khói)',['Vật lí','Sinh học','Không biến đổi']),
    TQ('Hòa tan đường vào nước?','Biến đổi vật lí',['Hóa học','Sinh học','Không biến đổi']),
    TQ('Sữa lên men thành sữa chua?','Biến đổi hóa học + sinh học',['Vật lí','Không biến đổi','Chỉ vật lí']),
    TQ('Nước bay hơi là?','Biến đổi vật lí',['Hóa học','Sinh học','Phản ứng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh5_nangl',name:'Năng lượng',emoji:'⚡',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Năng lượng Mặt Trời là?','Năng lượng tái tạo',['Không tái tạo','Hóa thạch','Nhân tạo']),
    TQ('Than đá, dầu mỏ là?','Nhiên liệu hóa thạch',['Tái tạo','Sạch','Vô hạn']),
    TQ('Nhà máy thủy điện dùng?','Sức nước',['Sức gió','Ánh sáng','Than đá']),
    TQ('Pin Mặt Trời chuyển đổi?','Quang năng → Điện năng',['Nhiệt → Điện','Gió → Điện','Nước → Điện']),
    TQ('Hiệu ứng nhà kính gây?','Trái Đất nóng lên',['Mát hơn','Mưa nhiều','Không ảnh hưởng']),
    TQ('CO₂ gây hiệu ứng nhà kính từ?','Đốt nhiên liệu, khí thải',['Trồng cây','Uống nước','Tập thể dục']),
    TQ('Năng lượng gió ở VN nhiều ở?','Bình Thuận, Ninh Thuận',['Hà Nội','TP.HCM','Đà Lạt']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh5_sinhhoc',name:'Sinh vật & MT',emoji:'🌿',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Hệ sinh thái gồm?','Sinh vật + MT sống',['Chỉ động vật','Chỉ thực vật','Chỉ nước']),
    TQ('Chuỗi thức ăn bắt đầu từ?','Sinh vật sản xuất (cây)',['Động vật ăn thịt','Con người','Vi khuẩn']),
    TQ('Rừng Amazon được gọi là?','Lá phổi xanh Trái Đất',['Sa mạc','Đại dương','Bắc cực']),
    TQ('Động vật có nguy cơ tuyệt chủng ở VN?','Sao la, voi, hổ',['Gà, vịt','Chó, mèo','Cá rô, cá trê']),
    TQ('Ô nhiễm nước gây?','Cá chết, bệnh tật',['Nước sạch','Cá nhiều hơn','Không ảnh hưởng']),
    TQ('Đa dạng sinh học nghĩa là?','Nhiều loài sinh vật',['Chỉ 1 loài','Không có sinh vật','Chỉ cây xanh']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh5_suckhoe',name:'Sức khỏe',emoji:'🏥',color:'rgba(239,154,154,.2)',gen:function(l){var qs=[
    TQ('Dậy thì bắt đầu ở tuổi?','10-14 tuổi',['5 tuổi','20 tuổi','3 tuổi']),
    TQ('Chất gây nghiện gồm?','Rượu, thuốc lá, ma túy',['Sữa','Nước','Cơm']),
    TQ('Phòng bệnh sốt xuất huyết?','Diệt muỗi, lăng quăng',['Uống thuốc','Ăn nhiều','Ngủ nhiều']),
    TQ('HIV lây qua đường nào?','Máu, mẹ sang con',['Nắm tay','Ăn chung','Ngồi gần']),
    TQ('Sơ cứu khi bị bỏng?','Xả nước lạnh ngay',['Bôi kem đánh răng','Chà đá','Bôi dầu']),
    TQ('Sức khỏe tâm thần là?','Tinh thần vui, lạc quan',['Chỉ thể chất','Chỉ ăn uống','Chỉ ngủ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh5_traidat',name:'Trái Đất',emoji:'🌏',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Hệ Mặt Trời có mấy hành tinh?','8 hành tinh',['9','7','12']),
    TQ('Hành tinh gần Mặt Trời nhất?','Sao Thủy',['Sao Kim','Trái Đất','Sao Hỏa']),
    TQ('Hành tinh lớn nhất?','Sao Mộc',['Sao Thổ','Trái Đất','Sao Hải Vương']),
    TQ('Trái Đất quay quanh MT mất?','365 ngày (1 năm)',['30 ngày','7 ngày','100 ngày']),
    TQ('Mặt Trăng quay quanh TĐ mất?','Khoảng 29 ngày',['365 ngày','7 ngày','1 ngày']),
    TQ('Thủy triều do đâu?','Lực hấp dẫn Mặt Trăng',['Gió','Mưa','Sông']),
    TQ('Động đất xảy ra do?','Mảng kiến tạo dịch chuyển',['Gió mạnh','Mưa to','Nắng nóng']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ SU & DIA SKILLS ============
var SUDIA_SKILLS=[
  {id:'sd5_lichsu',name:'LS VN cận đại',emoji:'📜',color:'rgba(141,110,99,.2)',gen:function(l){var qs=[
    TQ('Bác Hồ đọc Tuyên ngôn ĐL ngày?','2/9/1945',['30/4/1975','1/1/1946','19/8/1945']),
    TQ('Chiến thắng Điện Biên Phủ năm?','1954',['1945','1975','1968']),
    TQ('Ngày thống nhất đất nước?','30/4/1975',['2/9/1945','7/5/1954','1/1/1976']),
    TQ('Hồ Chí Minh sinh năm?','1890',['1900','1880','1945']),
    TQ('Cách mạng tháng 8 năm nào?','1945',['1954','1975','1930']),
    TQ('Chiến dịch HCM giải phóng?','Sài Gòn (30/4/1975)',['Hà Nội','Huế','Đà Nẵng']),
    TQ('Hiệp định Genève ký năm?','1954',['1945','1975','1968']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd5_dialy',name:'Địa lí VN',emoji:'🗺️',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Diện tích VN khoảng?','331.000 km²',['100.000 km²','500.000 km²','1 triệu km²']),
    TQ('VN nằm ở khu vực?','Đông Nam Á',['Đông Á','Nam Á','Trung Á']),
    TQ('VN giáp nước nào phía Bắc?','Trung Quốc',['Lào','Campuchia','Thái Lan']),
    TQ('VN giáp nước nào phía Tây?','Lào, Campuchia',['Trung Quốc','Thái Lan','Myanmar']),
    TQ('TP lớn nhất VN?','TP Hồ Chí Minh',['Hà Nội','Đà Nẵng','Hải Phòng']),
    TQ('Sông Hồng chảy qua?','Hà Nội',['TP.HCM','Đà Nẵng','Huế']),
    TQ('Dân số VN khoảng?','Gần 100 triệu người',['50 triệu','200 triệu','500 triệu']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd5_chaua',name:'Châu Á',emoji:'🌏',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Châu Á là châu lục?','Lớn nhất thế giới',['Nhỏ nhất','Thứ 2','Thứ 3']),
    TQ('Nước đông dân nhất TG?','Trung Quốc / Ấn Độ',['Mỹ','Nhật Bản','Nga']),
    TQ('Nhật Bản nổi tiếng về?','Công nghệ, hoa anh đào',['Sa mạc','Rừng nhiệt đới','Kim cương']),
    TQ('Vạn Lý Trường Thành ở?','Trung Quốc',['Nhật Bản','Hàn Quốc','Ấn Độ']),
    TQ('Taj Mahal ở nước nào?','Ấn Độ',['Trung Quốc','Nhật Bản','Thái Lan']),
    TQ('ASEAN gồm mấy nước?','10 nước',['5 nước','15 nước','20 nước']),
    TQ('Núi Everest cao nhất TG ở?','Nepal (biên giới Trung Quốc)',['Nhật Bản','Ấn Độ','Việt Nam']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd5_thegioi',name:'Thế giới',emoji:'🌐',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Thế giới có mấy châu lục?','7 châu lục',['5 châu','3 châu','10 châu']),
    TQ('Đại dương lớn nhất?','Thái Bình Dương',['Đại Tây Dương','Ấn Độ Dương','Bắc Băng Dương']),
    TQ('Sa mạc lớn nhất?','Sahara (Châu Phi)',['Gobi','Kalahari','Atacama']),
    TQ('Sông dài nhất thế giới?','Sông Nile',['Amazon','Mê Kông','Hằng']),
    TQ('LHQ (Liên Hợp Quốc) ra đời?','1945',['1900','1975','2000']),
    TQ('Trụ sở LHQ ở đâu?','New York (Mỹ)',['Paris','London','Tokyo']),
    TQ('Dân số thế giới khoảng?','Hơn 8 tỷ người',['1 tỷ','50 tỷ','100 triệu']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ DAO DUC SKILLS ============
var DAODUC_SKILLS=[
  {id:'dd5_congdan',name:'Công dân TG',emoji:'🌍',color:'rgba(236,64,122,.2)',gen:function(l){var qs=[
    TQ('Công dân toàn cầu là?','Biết quan tâm thế giới',['Chỉ lo bản thân','Không quan tâm','Chỉ lo đất nước']),
    TQ('Biến đổi khí hậu ảnh hưởng?','Toàn thế giới',['Chỉ VN','Chỉ Mỹ','Không ảnh hưởng']),
    TQ('Giảm rác thải nhựa bằng?','Dùng túi vải, chai tái sử dụng',['Dùng nhiều nhựa','Vứt ra biển','Đốt rác']),
    TQ('Tôn trọng văn hóa khác là?','Công dân toàn cầu',['Kỳ thị','Chê bai','Xa lánh']),
    TQ('SDGs (Mục tiêu PTBV) có?','17 mục tiêu',['5','10','100']),
    TQ('Em có thể giúp thế giới bằng?','Bảo vệ MT, học giỏi',['Không làm gì','Chơi game','Ngủ nhiều']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd5_doankiet',name:'Đoàn kết',emoji:'🤝',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('"Đoàn kết là sức mạnh" nghĩa?','Cùng nhau sẽ mạnh hơn',['Một mình tốt hơn','Không cần ai','Tranh giành']),
    TQ('VN có bao nhiêu dân tộc?','54 dân tộc',['10','100','25']),
    TQ('Dân tộc đông nhất VN?','Kinh',['Tày','Thái','Mường']),
    TQ('Các dân tộc VN cần?','Đoàn kết, tôn trọng',['Chia rẽ','Kỳ thị','Tranh giành']),
    TQ('Ngày Đại đoàn kết dân tộc?','18 tháng 11',['2/9','1/6','20/11']),
    TQ('Đoàn kết trong lớp học là?','Giúp nhau, không bắt nạt',['Chia phe','Tranh giành','Bỏ bạn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd5_hoabinh',name:'Hòa bình',emoji:'🕊️',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Hòa bình nghĩa là?','Không có chiến tranh',['Có chiến tranh','Đánh nhau','Tranh giành']),
    TQ('Biểu tượng hòa bình?','Chim bồ câu trắng',['Sư tử','Rắn','Diều hâu']),
    TQ('VN trải qua bao nhiêu năm CT?','Hàng chục năm',['Không có CT','1 năm','100 năm']),
    TQ('Để giữ hòa bình cần?','Đối thoại, tôn trọng',['Đánh nhau','Tranh giành','Bỏ mặc']),
    TQ('Ngày Quốc tế Hòa bình?','21 tháng 9',['1/1','25/12','14/2']),
    TQ('Trẻ em trong chiến tranh?','Bị ảnh hưởng nặng nề',['Không ảnh hưởng','Vui hơn','Khỏe hơn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd5_trachnhiem',name:'Trách nhiệm XH',emoji:'✊',color:'rgba(171,71,188,.2)',gen:function(l){var qs=[
    TQ('Trách nhiệm xã hội là?','Quan tâm cộng đồng',['Chỉ lo bản thân','Không quan tâm ai','Kiếm tiền nhiều']),
    TQ('Tình nguyện giúp đỡ là?','Trách nhiệm xã hội',['Bắt buộc','Lãng phí','Không cần']),
    TQ('Thấy người già qua đường, em?','Giúp đỡ',['Bỏ đi','Cười','Không quan tâm']),
    TQ('Bảo vệ di tích lịch sử là?','Trách nhiệm mọi người',['Chỉ nhà nước','Không ai','Chỉ người già']),
    TQ('Em có thể giúp cộng đồng?','Giữ sạch MT, giúp người khó',['Không làm gì','Chỉ lo học','Chỉ chơi']),
    TQ('Quyên góp giúp bạn khó khăn?','Chia sẻ yêu thương',['Mất tiền','Lãng phí','Không cần']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ TIN HOC SKILLS ============
var TINHOC_SKILLS=[
  {id:'th5_media',name:'Multimedia',emoji:'🎬',color:'rgba(92,107,192,.2)',gen:function(l){var qs=[
    TQ('Multimedia là gì?','Đa phương tiện (chữ, ảnh, video, âm thanh)',['Chỉ chữ','Chỉ ảnh','Chỉ video']),
    TQ('File video thường có đuôi?','.mp4, .avi',['doc','jpg','txt']),
    TQ('File ảnh thường có đuôi?','.jpg, .png',['mp4','doc','mp3']),
    TQ('Phần mềm chỉnh ảnh miễn phí?','GIMP, Paint',['Word','Excel','Notepad']),
    TQ('Pixel (điểm ảnh) càng nhiều?','Ảnh càng sắc nét',['Ảnh càng mờ','Ảnh nhỏ hơn','Không ảnh hưởng']),
    TQ('Resolution (độ phân giải) là?','Số pixel của ảnh/màn hình',['Kích thước file','Màu sắc','Độ sáng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th5_laptrinh',name:'Scratch NC',emoji:'🐱',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Biến (Variable) dùng để?','Lưu trữ giá trị',['Vẽ hình','Phát nhạc','Xóa sprite']),
    TQ('Vòng lặp "lặp lại N lần"?','Thực hiện N lần rồi dừng',['Lặp mãi mãi','Chỉ 1 lần','Không lặp']),
    TQ('Câu lệnh "nếu...thì...nếu không"?','Rẽ nhánh (điều kiện)',['Vòng lặp','Biến','Hàm']),
    TQ('Để sprite nói dùng khối?','"nói ... trong ... giây"',['di chuyển','xoay','ẩn']),
    TQ('Tọa độ (x,y) xác định?','Vị trí sprite trên Stage',['Màu sắc','Kích thước','Âm thanh']),
    TQ('Khối "phát thanh" dùng để?','Gửi tin nhắn giữa sprite',['Phát nhạc','Nói chuyện','Xóa']),
    TQ('Debug (gỡ lỗi) nghĩa là?','Tìm và sửa lỗi',['Tạo lỗi','Xóa chương trình','Tắt máy']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th5_slide',name:'Trình bày slide',emoji:'📊',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Phần mềm trình chiếu phổ biến?','PowerPoint, Google Slides',['Word','Paint','Notepad']),
    TQ('Slide tốt nên có?','Ít chữ, nhiều hình ảnh',['Nhiều chữ','Không hình','Chỉ số']),
    TQ('Hiệu ứng chuyển slide gọi?','Transition',['Animation','Font','Color']),
    TQ('Animation trong slide là?','Hiệu ứng cho từng đối tượng',['Chuyển slide','Đổi font','Đổi màu']),
    TQ('Font chữ trình bày nên?','Rõ ràng, dễ đọc',['Nhỏ xíu','Loằng ngoằng','Nhiều kiểu']),
    TQ('Slide đầu tiên thường là?','Tiêu đề + Tên tác giả',['Kết luận','Cảm ơn','Nội dung']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th5_duan',name:'Dự án TH',emoji:'🚀',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Bước đầu làm dự án?','Lên ý tưởng, lập kế hoạch',['Làm luôn','Nộp bài','Bỏ cuộc']),
    TQ('Làm dự án nhóm cần?','Phân công, hợp tác',['Một người làm hết','Tranh cãi','Không ai làm']),
    TQ('Thuật toán là gì?','Các bước giải quyết vấn đề',['Một phần mềm','Một trò chơi','Một bài hát']),
    TQ('AI (Trí tuệ nhân tạo) là?','Máy tính thông minh',['Robot sống','Người máy','Game']),
    TQ('Internet of Things (IoT)?','Đồ vật kết nối Internet',['Mạng xã hội','Trò chơi','Email']),
    TQ('Coding (lập trình) giúp?','Tạo ứng dụng, web, game',['Chỉ chơi game','Chỉ xem phim','Không giúp gì']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENCOURAGEMENT MESSAGES ============
var CORGI_TAP=['Roar!','Giỏi lắm!','🦁','Siêu!','💕','Wow!','🌟','Tiếp tục!','Xuất sắc!','👏'];
var C_MSGS=[{t:'Giỏi quá!',s:'Siêu đỉnh luôn! 🌟'},{t:'Đúng rồi!',s:'Sư tử gầm vang! 🦁'},{t:'Tuyệt vời!',s:'Combo lên nào! 🔥'},{t:'Wow!',s:'Thiên tài! 🧠'},{t:'Perfect!',s:'Sư tử tự hào! 🦁'},{t:'Amazing!',s:'Keep going! 💪'},{t:'Xuất sắc!',s:'Ngôi sao sáng! ⭐'}];
var W_MSGS=[{t:'Oops!',s:'Thử lại nha! 💕'},{t:'Hmm...',s:'Sư tử tin bạn! 🦁'},{t:'Gần đúng!',s:'Cố lên! 💪'}];

// ============ GRADE CONFIG ============
window.GRADE_CONFIG={
  id:'lop5',
  gradeName:'Lớp 5',
  saveKey:'vuongquoc_lop5',
  oldSaveKey:null,
  xpPerLevel:120,
  passThreshold:80,
  maxSkillLevel:5,
  hasLives:false,
  gatingMode:'cross_subject',
  questionsPerRound:10,
  timePerQuestion:35,
  levelRewardRate:55,
  speeches:[
    ['Toán lớp 5 thử thách đây!','Phần trăm hôm nay nhé!','Sư tử thích giải toán!'],
    ['Tiếng Việt nâng cao!','Câu ghép giỏi nè!','Đọc văn cùng Sư tử!'],
    ['English level up!','Let\'s master English!','Lion loves learning!'],
    ['Khoa học thú vị!','Khám phá vũ trụ!','Sư tử thích khoa học!'],
    ['Lịch sử hấp dẫn!','Tìm hiểu thế giới!','Sư tử biết nhiều lắm!'],
    ['Bé ngoan xuất sắc!','Công dân toàn cầu!','Sư tử tự hào!'],
    ['Tin học nâng cao!','Lập trình thú vị!','Sư tử giỏi code!'],
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#f59e0b'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#ec4899'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#8b5cf6'},
    {id:'khoahoc',name:'Khoa Học',emoji:'🔬',skills:KHOAHOC_SKILLS,color:'#26c6da'},
    {id:'sudia',name:'Sử & Địa',emoji:'🗺️',skills:SUDIA_SKILLS,color:'#8d6e63'},
    {id:'daoduc',name:'Đạo Đức',emoji:'💝',skills:DAODUC_SKILLS,color:'#ec407a'},
    {id:'tinhoc',name:'Tin Học',emoji:'💻',skills:TINHOC_SKILLS,color:'#5c6bc0'},
  ],
};
