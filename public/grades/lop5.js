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
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#f59e0b'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#ec4899'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#8b5cf6'},
  ],
};
