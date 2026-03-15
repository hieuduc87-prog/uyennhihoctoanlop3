// ============ LOP 4 — SKILLS + GRADE CONFIG ============
// This file loads BEFORE engine.js

// ============ MATH SKILLS ============
var MATH_SKILLS=[
  {id:'m4_calc',name:'Cộng Trừ Lớn',emoji:'🔢',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=2){var a=R(1000,9999),b=R(1000,9999);return Math.random()>.5?MQ(a+' + '+b+' = ?',a+b):MQ(Math.max(a,b)+' − '+Math.min(a,b)+' = ?',Math.abs(a-b))}
    if(l<=4){var a=R(10000,99999),b=R(10000,99999);return Math.random()>.5?MQ(a+' + '+b+' = ?',a+b):MQ(Math.max(a,b)+' − '+Math.min(a,b)+' = ?',Math.abs(a-b))}
    var a=R(100000,999999),b=R(100000,999999);return Math.random()>.5?MQ(a+' + '+b+' = ?',a+b):MQ(Math.max(a,b)+' − '+Math.min(a,b)+' = ?',Math.abs(a-b))}},
  {id:'m4_mul',name:'Nhân Nhiều CS',emoji:'✖️',color:'rgba(255,107,157,.2)',gen:function(l){
    if(l<=2){var a=R(11,99),b=R(2,9);return MQ(a+' × '+b+' = ?',a*b)}
    if(l<=4){var a=R(10,99),b=R(10,99);return MQ(a+' × '+b+' = ?',a*b,'Nhân 2 chữ số')}
    var a=R(100,999),b=R(2,9);return MQ(a+' × '+b+' = ?',a*b,'Nhân 3 chữ số')}},
  {id:'m4_div',name:'Chia Nhiều CS',emoji:'➗',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=2){var b=R(2,9),a=R(10,99);return MQ((b*a)+' : '+b+' = ?',a)}
    if(l<=4){var b=R(11,30),a=R(10,50);return MQ((b*a)+' : '+b+' = ?',a,'Chia cho 2 chữ số')}
    var b=R(100,200),a=R(2,9);return MQ((b*a)+' : '+b+' = ?',a,'Chia cho 3 chữ số')}},
  {id:'m4_frac',name:'Phân Số',emoji:'🍕',color:'rgba(192,132,252,.2)',gen:function(l){
    if(l<=2){var d=R(2,9),n=R(1,d-1);var d2=R(2,9),n2=R(1,d2-1);return TQ(n+'/'+d+' ◻️ '+n2+'/'+d,n>n2?'>':n<n2?'<':'=',['<','>','='].filter(function(x){return x!==(n>n2?'>':n<n2?'<':'=')}),'Cùng mẫu → so tử')}
    if(l<=4){var d=R(2,8),n1=R(1,d-1),n2=R(1,d-1);return MQ(n1+'/'+d+' + '+n2+'/'+d+' = ?/'+ d,n1+n2,'Cùng mẫu → cộng tử')}
    var d=R(2,9),t=d*R(2,9);return MQ('1/'+d+' của '+t+' = ?',t/d,'Lấy số chia mẫu')}},
  {id:'m4_divis',name:'Chia Hết',emoji:'🔍',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('Số nào chia hết cho 2?','46',['35','71','53'],'Chữ số cuối chẵn'),
    TQ('Số nào chia hết cho 5?','125',['132','143','157'],'Cuối là 0 hoặc 5'),
    TQ('Số nào chia hết cho 9?','36',['35','37','38'],'Tổng chữ số ⫶ 9'),
    TQ('Số nào chia hết cho 3?','27',['28','29','31'],'Tổng chữ số ⫶ 3'),
    TQ('48 chia hết cho?','2 và 3',['5 và 9','chỉ 5','chỉ 7']),
    TQ('Số nào chia hết cho cả 2 và 5?','30',['32','35','22'],'Cuối = 0'),
    TQ('100 chia hết cho?','2, 5',['3, 7','9, 7','3, 9']),
    TQ('Dấu hiệu chia hết cho 2?','Cuối chẵn',['Cuối lẻ','Tổng CS ⫶2','Cuối = 5']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'m4_avg',name:'Trung Bình Cộng',emoji:'📊',color:'rgba(52,211,153,.2)',gen:function(l){
    if(l<=3){var a=R(5,20),b=R(5,20);return MQ('Trung bình cộng của '+a+' và '+b+' = ?',(a+b)/2,'(a+b):2')}
    var a=R(10,30),b=R(10,30),c=R(10,30);var s=a+b+c;if(s%3!==0){c=c+(3-s%3)}
    return MQ('Trung bình cộng của '+a+', '+b+', '+c+' = ?',(a+b+c)/3,'(a+b+c):3')}},
  {id:'m4_sumdf',name:'Tổng Hiệu',emoji:'🧩',color:'rgba(255,107,157,.2)',gen:function(l){
    var s=R(20,100),d=R(2,20);if((s+d)%2!==0){s++}
    var big=(s+d)/2,small=(s-d)/2;
    return Math.random()>.5?MQ('Tổng 2 số = '+s+'\nHiệu 2 số = '+d+'\nSố lớn = ?',big,'(Tổng+Hiệu):2'):MQ('Tổng 2 số = '+s+'\nHiệu 2 số = '+d+'\nSố bé = ?',small,'(Tổng−Hiệu):2')}},
  {id:'m4_geo',name:'Hình Học',emoji:'📐',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=2){var a=R(3,15);return Math.random()>.5?MQ('Hình vuông cạnh '+a+'cm\nChu vi = ?',a*4,'Chu vi = a×4'):MQ('Hình vuông cạnh '+a+'cm\nDiện tích = ?',a*a,'Diện tích = a×a')}
    if(l<=4){var d=R(5,20),r=R(3,12);return Math.random()>.5?MQ('Hình chữ nhật '+d+'×'+r+'cm\nChu vi = ?',(d+r)*2):MQ('Hình chữ nhật '+d+'×'+r+'cm\nDiện tích = ?',d*r)}
    var a=R(5,15),h=R(3,10);return MQ('Hình bình hành\nđáy '+a+'cm, cao '+h+'cm\nDiện tích = ?',a*h,'Diện tích = đáy × cao')}},
  {id:'m4_meas',name:'Đo Lường',emoji:'📏',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    MQ('5 m = ? cm',500),MQ('3 km = ? m',3000),
    MQ('2 kg = ? g',2000),MQ('4000 g = ? kg',4),
    MQ('7 m = ? dm',70),MQ('300 cm = ? m',3),
    TQ('1 tấn = ? kg','1000 kg',['100 kg','10 kg','10000 kg']),
    TQ('1 yến = ? kg','10 kg',['100 kg','1 kg','1000 kg']),
  ];return qs[R(0,l<=3?3:qs.length-1)]}},
  {id:'m4_expr',name:'Biểu Thức',emoji:'🧮',color:'rgba(251,191,36,.2)',gen:function(l){
    if(l<=2){var a=R(2,9),b=R(2,9),c=R(1,20);return MQ(c+' + '+a+' × '+b+' = ?',c+a*b,'Nhân trước, cộng sau')}
    if(l<=4){var a=R(2,10),b=R(2,10),c=R(2,5);return MQ('('+a+' + '+b+') × '+c+' = ?',(a+b)*c,'Ngoặc trước')}
    var a=R(10,50),b=R(2,9),c=R(2,9);return MQ(a+' − '+b+' × '+c+' = ?',a-b*c,'Nhân trước, trừ sau')}},
];

// ============ VIETNAMESE SKILLS ============
var VIET_SKILLS=[
  {id:'v4_ct',name:'Chính Tả',emoji:'✍️',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('Viết đúng: ___ iếng chim hót','t',['ch','tr','x'],'t hay ch'),
    TQ('"Sáng sủa" hay "Xáng xủa"?','Sáng sủa',['Xáng xủa','Sáng xủa','Xáng sủa']),
    TQ('"Trung thực" hay "Chung thực"?','Trung thực',['Chung thực','Trung chực','Chung chực']),
    TQ('Viết đúng: quả ___ưa hấu','d',['gi','r','v'],'d hay gi'),
    TQ('"Giản dị" hay "Dản gị"?','Giản dị',['Dản gị','Giản gị','Dản dị']),
    TQ('Viết đúng: ___ ung quanh trường','x',['s','ch','tr']),
    TQ('"Nồng nàn" hay "Lồng làn"?','Nồng nàn',['Lồng làn','Nồng làn','Lồng nàn'],'l/n'),
    TQ('Viết đúng: chim ___áo hót vang','s',['x','tr','ch']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_tuloai',name:'Từ Ghép & Láy',emoji:'🏷️',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('"Học tập" là từ gì?','Từ ghép',['Từ láy','Từ đơn','Từ mượn'],'2 tiếng có nghĩa'),
    TQ('"Lung linh" là từ gì?','Từ láy',['Từ ghép','Từ đơn','Từ mượn'],'Lặp âm đầu'),
    TQ('"Long lanh" là từ gì?','Từ láy',['Từ ghép','Từ đơn','Từ mượn']),
    TQ('"Xe đạp" là từ gì?','Từ ghép',['Từ láy','Từ đơn','Từ mượn']),
    TQ('"Lao xao" là từ gì?','Từ láy',['Từ ghép','Từ đơn','Từ mượn'],'Lặp vần'),
    TQ('"Anh em" là từ gì?','Từ ghép',['Từ láy','Từ đơn','Từ mượn']),
    TQ('Từ nào là từ láy?','mênh mông',['trường học','hoa hồng','bàn ghế']),
    TQ('Từ nào là từ ghép?','bàn ghế',['lung linh','lao xao','lấp lánh']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_cau',name:'Kiểu Câu',emoji:'💬',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('"Bạn ở đâu?" là câu gì?','Câu hỏi',['Câu kể','Câu cảm','Câu khiến']),
    TQ('"Em hãy đọc bài!" là câu?','Câu khiến',['Câu kể','Câu hỏi','Câu cảm']),
    TQ('"Ôi, đẹp quá!" là câu?','Câu cảm',['Câu kể','Câu hỏi','Câu khiến']),
    TQ('"Mẹ em là giáo viên" là?','Câu kể',['Câu hỏi','Câu cảm','Câu khiến']),
    TQ('Câu khiến thường dùng từ?','hãy, đừng, chớ',['ai, gì, nào','ôi, chao, trời','và, nhưng, vì']),
    TQ('Câu cảm thường kết thúc?','Dấu chấm than (!)',['Dấu chấm (.)','Dấu hỏi (?)','Dấu phẩy (,)']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_tp',name:'Thành Phần Câu',emoji:'🔍',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('"Bạn Lan chạy rất nhanh"\nChủ ngữ?','Bạn Lan',['chạy','rất nhanh','nhanh']),
    TQ('"Con mèo ngủ trên ghế"\nVị ngữ?','ngủ trên ghế',['con mèo','trên ghế','con']),
    TQ('"Sáng nay, em đi học"\n"Sáng nay" là gì?','Trạng ngữ',['Chủ ngữ','Vị ngữ','Bổ ngữ'],'Chỉ thời gian'),
    TQ('"Trên cánh đồng, lúa chín"\n"Trên cánh đồng" là?','Trạng ngữ',['Chủ ngữ','Vị ngữ','Bổ ngữ'],'Chỉ nơi chốn'),
    TQ('Chủ ngữ trả lời câu hỏi?','Ai? Cái gì?',['Làm gì?','Ở đâu?','Khi nào?']),
    TQ('Trạng ngữ bổ sung gì?','Thời gian, nơi chốn',['Tên người','Hành động','Đặc điểm']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_tv',name:'Thành Ngữ',emoji:'📚',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('"Ăn quả nhớ kẻ trồng cây"\nnghĩa là?','Biết ơn',['Trồng cây','Ăn quả','Nhớ bạn']),
    TQ('"Uống nước nhớ nguồn"\nnghĩa là?','Biết ơn nguồn gốc',['Uống nước','Nhớ sông','Đi xa']),
    TQ('"Có công mài sắt\ncó ngày nên kim"?','Kiên trì sẽ thành công',['Mài dao','Làm kim','Rèn sắt']),
    TQ('"Gần mực thì đen\ngần đèn thì sáng"?','Ảnh hưởng bạn bè',['Sợ tối','Thích sáng','Mua đèn']),
    TQ('"Đi một ngày đàng\nhọc một sàng khôn"?','Đi nhiều biết nhiều',['Học 1 ngày','Đi chợ','Sàng gạo']),
    TQ('"Một cây làm chẳng nên non"?','Đoàn kết',['Trồng cây','Leo núi','Một mình']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_bptt',name:'Biện Pháp Tu Từ',emoji:'🎨',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"Mặt trời đỏ như quả bóng"\nBiện pháp?','So sánh',['Nhân hóa','Ẩn dụ','Điệp từ'],'Có từ "như"'),
    TQ('"Ông mặt trời thức dậy"\nBiện pháp?','Nhân hóa',['So sánh','Ẩn dụ','Điệp từ'],'Vật làm người'),
    TQ('"Trẻ em như búp trên cành"\nBiện pháp?','So sánh',['Nhân hóa','Ẩn dụ','Hoán dụ']),
    TQ('"Dòng sông uốn mình"\nBiện pháp?','Nhân hóa',['So sánh','Ẩn dụ','Điệp từ']),
    TQ('"Học, học nữa, học mãi"\nBiện pháp?','Điệp từ',['So sánh','Nhân hóa','Ẩn dụ'],'Lặp từ "học"'),
    TQ('So sánh thường dùng từ?','như, giống như',['và, với','nhưng, mà','vì, nên']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_dien',name:'Điền Từ',emoji:'✏️',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('Bầu trời ____ trong xanh','cao',['sâu','dày','nặng']),
    TQ('Dòng sông ____ hiền hòa','chảy',['bay','nhảy','chạy']),
    TQ('Cánh đồng ____ thẳng cánh cò bay','rộng',['hẹp','cao','sâu']),
    TQ('Mùa xuân ____ nở rực rỡ','hoa',['lá','gió','mưa']),
    TQ('Cô giáo ____ bài rất hay','giảng',['ăn','chơi','ngủ']),
    TQ('Con chim ____ líu lo','hót',['sủa','kêu','gầm']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'v4_sapxep',name:'Sắp Xếp Câu',emoji:'🔀',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('Sắp xếp:\n"giỏi / Lan / rất / học"','Lan học rất giỏi',['Giỏi rất Lan học','Học giỏi rất Lan','Rất giỏi Lan học']),
    TQ('Sắp xếp:\n"trên / Chim / trời / bay"','Chim bay trên trời',['Bay chim trên trời','Trời trên chim bay','Trên trời bay chim']),
    TQ('Sắp xếp:\n"nấu / Mẹ / cho / em / cơm"','Mẹ nấu cơm cho em',['Cơm nấu Mẹ cho em','Em cho Mẹ nấu cơm','Nấu cơm Mẹ cho em']),
    TQ('Sắp xếp:\n"sáng / Hôm nay / trời / đẹp / rất"','Hôm nay trời rất đẹp',['Rất đẹp hôm nay trời','Trời hôm nay rất sáng','Đẹp rất trời hôm nay']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENGLISH SKILLS ============
var ENG_SKILLS=[
  {id:'e4_vocab',name:'Vocabulary',emoji:'🔤',color:'rgba(167,139,250,.2)',gen:function(l){var qs=[
    TQ('👨‍⚕️ = ?','doctor',['teacher','farmer','pilot']),
    TQ('👩‍🏫 = ?','teacher',['doctor','nurse','farmer']),
    TQ('👨‍🚒 = ?','firefighter',['police','doctor','pilot']),
    TQ('👨‍✈️ = ?','pilot',['driver','farmer','doctor']),
    TQ('☀️ weather?','sunny',['rainy','cloudy','snowy']),
    TQ('🌧️ weather?','rainy',['sunny','windy','hot']),
    TQ('💨 weather?','windy',['sunny','rainy','cloudy']),
    TQ('🏥 = ?','hospital',['school','park','shop']),
    TQ('🏫 = ?','school',['hospital','museum','cinema']),
    TQ('🏛️ = ?','museum',['school','hospital','park']),
    TQ('"Nông dân" in English?','farmer',['teacher','doctor','driver']),
    TQ('"Y tá" in English?','nurse',['doctor','teacher','farmer']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_present',name:'Present Simple',emoji:'⏰',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('"She ___ to school"','goes',['go','going','gone']),
    TQ('"He ___ up at 6"','gets',['get','getting','got']),
    TQ('"I ___ English"','like',['likes','liking','liked']),
    TQ('"They ___ football"','play',['plays','playing','played']),
    TQ('"She ___ TV every day"','watches',['watch','watching','watched']),
    TQ('"He ___ breakfast at 7"','has',['have','having','had']),
    TQ('"___ you like milk?"','Do',['Does','Is','Are']),
    TQ('"___ she speak English?"','Does',['Do','Is','Are']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_contin',name:'V-ing',emoji:'🏃',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('"She is ___ a book"','reading',['read','reads','readed']),
    TQ('"They are ___ soccer"','playing',['play','plays','played']),
    TQ('"He is ___ now"','studying',['study','studies','studied']),
    TQ('"I am ___ lunch"','having',['have','has','had']),
    TQ('"What ___ you doing?"','are',['is','do','does']),
    TQ('"She ___ singing now"','is',['are','am','do']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_there',name:'There is/are',emoji:'🏠',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
    TQ('"___ is a park near my house"','There',['It','This','That']),
    TQ('"There ___ three cats"','are',['is','am','was']),
    TQ('"There ___ a book on the table"','is',['are','am','were']),
    TQ('"___ there a library?"','Is',['Are','Do','Does']),
    TQ('"There are ___ bedrooms"','three',['a','an','the']),
    TQ('"There isn\'t ___ milk"','any',['some','a','the']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_can',name:'Can/Can\'t',emoji:'💪',color:'rgba(192,132,252,.2)',gen:function(l){var qs=[
    TQ('"I ___ swim" (biết bơi)','can',['can\'t','do','am']),
    TQ('"She ___ play piano" (k biết)','can\'t',['can','does','is']),
    TQ('"___ he ride a bike?"','Can',['Does','Is','Do']),
    TQ('"Can you sing?"\n→ "Yes, ___"','I can',['I do','I am','I will']),
    TQ('"I can ___ English"','speak',['speaks','speaking','spoke']),
    TQ('"She can\'t ___ a horse"','ride',['rides','riding','rode']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_time',name:'Time & Days',emoji:'🕐',color:'rgba(251,191,36,.2)',gen:function(l){var qs=[
    TQ('"What ___ is it?"','time',['day','color','name']),
    TQ('After Monday?','Tuesday',['Wednesday','Sunday','Friday']),
    TQ('After Friday?','Saturday',['Sunday','Thursday','Monday']),
    TQ('"Thứ Tư" in English?','Wednesday',['Thursday','Tuesday','Monday']),
    TQ('How many days in a week?','7',['5','6','10']),
    TQ('"I get up ___ 6 o\'clock"','at',['in','on','to']),
    TQ('"I go to school ___ Monday"','on',['in','at','to']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_prepos',name:'Prepositions',emoji:'📍',color:'rgba(52,211,153,.2)',gen:function(l){var qs=[
    TQ('The shop is ___ the school\n(cạnh)','next to',['in','on','under']),
    TQ('The park is ___ the hospital\n(đối diện)','opposite',['next to','behind','in']),
    TQ('The cat is ___ the two boxes\n(giữa)','between',['behind','next to','in front of']),
    TQ('The tree is ___ the house\n(phía sau)','behind',['in front of','next to','between']),
    TQ('The dog is ___ the table\n(gần)','near',['on','in','under']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'e4_translate',name:'Dịch Câu',emoji:'🌐',color:'rgba(255,107,157,.2)',gen:function(l){var qs=[
    TQ('"I go to school by bus"\nnghĩa là?','Em đi học bằng xe buýt',['Em đi chơi','Em thích xe buýt','Em ở nhà']),
    TQ('Dịch: "Cô ấy là bác sĩ"','She is a doctor',['He is a doctor','She is a teacher','She is a nurse']),
    TQ('"There are 4 seasons"?','Có 4 mùa',['Có 4 ngày','Có 4 năm','Có 4 giờ']),
    TQ('Dịch: "Em thích học Toán"','I like Maths',['I like English','I go to school','I play Maths']),
    TQ('"What\'s the weather like?"','Thời tiết thế nào?',['Bạn thích gì?','Bạn ở đâu?','Mấy giờ rồi?']),
    TQ('"Can you swim?"','Bạn biết bơi không?',['Bạn thích bơi?','Bạn đang bơi?','Bạn sẽ bơi?']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ KHOA HOC SKILLS ============
var KHOAHOC_SKILLS=[
  {id:'kh4_chat',name:'Chất',emoji:'🧪',color:'rgba(38,198,218,.2)',gen:function(l){var qs=[
    TQ('Nước sôi ở bao nhiêu °C?','100°C',['50°C','200°C','0°C']),
    TQ('Nước đóng băng ở?','0°C',['100°C','50°C','-50°C']),
    TQ('Không khí gồm chủ yếu?','Nitơ và Ôxy',['Chỉ Ôxy','Chỉ CO₂','Chỉ Hydro']),
    TQ('Kim loại nào nhẹ nhất?','Nhôm (trong thường gặp)',['Sắt','Đồng','Chì']),
    TQ('Chất nào dẫn điện?','Kim loại (đồng, sắt)',['Gỗ','Nhựa','Cao su']),
    TQ('Muối ăn là hợp chất của?','Natri và Clo (NaCl)',['Sắt','Đồng','Vàng']),
    TQ('Chất nào không tan trong nước?','Dầu ăn',['Đường','Muối','Phèn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh4_nangl',name:'Năng lượng',emoji:'⚡',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Nguồn năng lượng tái tạo?','Mặt Trời, gió, nước',['Than đá','Xăng dầu','Khí gas']),
    TQ('Ánh sáng truyền theo?','Đường thẳng',['Đường cong','Đường gấp','Ngẫu nhiên']),
    TQ('Âm thanh cần gì để truyền?','Môi trường vật chất',['Chân không','Không cần gì','Ánh sáng']),
    TQ('Nhiệt truyền từ đâu?','Nóng → Lạnh',['Lạnh → Nóng','Không truyền','Ngẫu nhiên']),
    TQ('Pin cung cấp năng lượng?','Điện năng',['Nhiệt năng','Ánh sáng','Âm thanh']),
    TQ('Tiết kiệm điện bằng cách?','Tắt khi không dùng',['Bật cả ngày','Dùng nhiều','Không quan tâm']),
    TQ('Năng lượng gió dùng để?','Phát điện',['Nấu cơm','Rửa xe','Giặt đồ']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh4_sinhhoc',name:'Sinh học',emoji:'🌱',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Quang hợp tạo ra?','Ôxy + chất dinh dưỡng',['CO₂','Nước','Đất']),
    TQ('Chuỗi thức ăn bắt đầu từ?','Thực vật (cây xanh)',['Động vật ăn thịt','Con người','Vi khuẩn']),
    TQ('Thú có đặc điểm gì?','Có lông, đẻ con, nuôi sữa',['Có vảy','Đẻ trứng','Có cánh']),
    TQ('Chim có đặc điểm gì?','Có lông vũ, đẻ trứng',['Có vảy','Đẻ con','Có vây']),
    TQ('Động vật lưỡng cư là?','Sống cả nước lẫn cạn',['Chỉ ở nước','Chỉ ở cạn','Chỉ bay']),
    TQ('Ếch là động vật gì?','Lưỡng cư',['Bò sát','Côn trùng','Cá']),
    TQ('Thụ phấn giúp cây?','Tạo quả và hạt',['Hấp thụ nước','Quang hợp','Hô hấp']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh4_namvi',name:'Nấm & VK',emoji:'🔬',color:'rgba(171,71,188,.2)',gen:function(l){var qs=[
    TQ('Vi khuẩn có lợi dùng để?','Làm sữa chua, muối dưa',['Gây bệnh','Phá đồ','Ăn thức ăn']),
    TQ('Virus gây bệnh gì?','Cúm, COVID, sởi',['Sâu răng','Gãy xương','Cận thị']),
    TQ('Vaccine giúp?','Phòng bệnh do virus',['Chữa gãy xương','Tăng chiều cao','Giảm cân']),
    TQ('Nấm men dùng làm?','Bánh mì, bia',['Thuốc','Xà phòng','Giấy']),
    TQ('Vi khuẩn sinh sản bằng?','Phân đôi',['Đẻ trứng','Đẻ con','Nảy mầm']),
    TQ('Kháng sinh dùng diệt?','Vi khuẩn',['Virus','Nấm','Ký sinh trùng']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'kh4_suckhoe',name:'Sức khỏe',emoji:'🏥',color:'rgba(239,154,154,.2)',gen:function(l){var qs=[
    TQ('Bữa ăn cân bằng cần?','Đạm, đường, béo, vitamin',['Chỉ thịt','Chỉ rau','Chỉ cơm']),
    TQ('Thiếu vitamin A gây?','Bệnh mắt (quáng gà)',['Gãy xương','Đau bụng','Đau đầu']),
    TQ('Thiếu vitamin D gây?','Còi xương',['Cận thị','Đau răng','Sốt']),
    TQ('Tập thể dục giúp?','Tim khỏe, cơ bắp phát triển',['Lười hơn','Ốm hơn','Béo hơn']),
    TQ('Nên uống bao nhiêu nước/ngày?','6-8 cốc (1.5-2 lít)',['1 cốc','Không cần','10 lít']),
    TQ('Hút thuốc lá gây hại?','Phổi, tim, ung thư',['Không hại gì','Tốt cho sức khỏe','Giúp khỏe']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ SU & DIA SKILLS ============
var SUDIA_SKILLS=[
  {id:'sd4_diaphuong',name:'LS Địa phương',emoji:'🏛️',color:'rgba(141,110,99,.2)',gen:function(l){var qs=[
    TQ('Thăng Long là tên cũ của?','Hà Nội',['TP.HCM','Đà Nẵng','Huế']),
    TQ('Ai dời đô ra Thăng Long?','Lý Thái Tổ',['Trần Hưng Đạo','Lê Lợi','Quang Trung']),
    TQ('Năm nào dời đô ra TL?','1010',['1945','1975','1802']),
    TQ('Sài Gòn đổi tên thành?','TP Hồ Chí Minh (1976)',['Hà Nội','Đà Nẵng','Huế']),
    TQ('Huế từng là kinh đô triều?','Nguyễn',['Trần','Lý','Lê']),
    TQ('Cố đô Hoa Lư ở tỉnh?','Ninh Bình',['Hà Nội','Thanh Hóa','Nghệ An']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd4_vungmien',name:'Vùng miền VN',emoji:'🗺️',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('VN có mấy vùng miền?','3: Bắc, Trung, Nam',['2 vùng','4 vùng','5 vùng']),
    TQ('Đồng bằng lớn nhất VN?','ĐB sông Cửu Long',['ĐB sông Hồng','ĐB Thanh Hóa','ĐB Nghệ An']),
    TQ('Dãy núi dài nhất VN?','Trường Sơn',['Hoàng Liên Sơn','Tam Đảo','Ba Vì']),
    TQ('Đỉnh núi cao nhất VN?','Fansipan (3143m)',['Bà Đen','Ngọc Linh','Bạch Mã']),
    TQ('Sông dài nhất VN?','Sông Mê Kông',['Sông Hồng','Sông Đà','Sông Hương']),
    TQ('VN giáp biển nào?','Biển Đông',['Biển Tây','Thái Bình Dương','Ấn Độ Dương']),
    TQ('Thủ đô VN là?','Hà Nội',['TP.HCM','Đà Nẵng','Huế']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd4_trieudai',name:'Triều đại',emoji:'👑',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Hai Bà Trưng khởi nghĩa năm?','40 sau CN',['938','1010','1428']),
    TQ('Ngô Quyền đánh thắng quân?','Nam Hán (938)',['Mông Cổ','Minh','Thanh']),
    TQ('Trận Bạch Đằng (938) dùng?','Cọc nhọn dưới sông',['Voi chiến','Pháo','Thuyền lớn']),
    TQ('Nhà Lý kéo dài bao lâu?','Hơn 200 năm (1009-1225)',['50 năm','500 năm','1000 năm']),
    TQ('Trần Hưng Đạo đánh thắng?','Quân Nguyên - Mông',['Quân Minh','Quân Thanh','Quân Hán']),
    TQ('Lê Lợi khởi nghĩa Lam Sơn chống?','Quân Minh',['Quân Nguyên','Quân Thanh','Quân Hán']),
    TQ('Quang Trung đại phá quân?','Thanh (1789)',['Minh','Nguyên','Pháp']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'sd4_thiennhien',name:'Thiên nhiên VN',emoji:'🌴',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Khí hậu VN thuộc?','Nhiệt đới gió mùa',['Ôn đới','Hàn đới','Sa mạc']),
    TQ('VN có bao nhiêu tỉnh TP?','63',['50','30','100']),
    TQ('Vịnh Hạ Long ở tỉnh?','Quảng Ninh',['Hà Nội','Đà Nẵng','Nha Trang']),
    TQ('Phong Nha - Kẻ Bàng ở?','Quảng Bình',['Quảng Nam','Quảng Trị','Quảng Ninh']),
    TQ('Hồ lớn nhất VN?','Hồ Ba Bể',['Hồ Hoàn Kiếm','Hồ Tây','Hồ Xuân Hương']),
    TQ('VN có bao nhiêu km bờ biển?','Hơn 3000 km',['1000 km','500 km','5000 km']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ DAO DUC SKILLS ============
var DAODUC_SKILLS=[
  {id:'dd4_trungthuc',name:'Trung thực',emoji:'⭐',color:'rgba(236,64,122,.2)',gen:function(l){var qs=[
    TQ('Trung thực và dũng cảm là?','Nói thật, dám nhận lỗi',['Nói dối giỏi','Đổ lỗi','Sợ hãi']),
    TQ('Thấy bạn quay cóp, em?','Nhắc bạn không nên',['Cùng quay','Mặc kệ','Mách cô ngay']),
    TQ('Dũng cảm là?','Dám làm điều đúng',['Liều lĩnh','Đánh nhau','Không sợ gì']),
    TQ('Khi chứng kiến bắt nạt, em?','Can ngăn hoặc báo người lớn',['Quay phim','Cười','Bỏ đi']),
    TQ('Nhận lỗi khi sai là?','Dũng cảm, trung thực',['Ngu ngốc','Yếu đuối','Xấu hổ']),
    TQ('Người trung thực được?','Mọi người tin tưởng',['Bị phạt','Bị ghét','Mất bạn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd4_tontrong',name:'Tôn trọng',emoji:'🤝',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Tôn trọng sự khác biệt là?','Chấp nhận mọi người',['Chê bai','Phân biệt','Kỳ thị']),
    TQ('Bạn khuyết tật, em nên?','Giúp đỡ, tôn trọng',['Trêu chọc','Xa lánh','Cười']),
    TQ('Bạn đến từ vùng khác, em?','Kết bạn, tìm hiểu',['Xa lánh','Chê bai','Không chơi']),
    TQ('Mỗi người có quyền?','Được tôn trọng',['Bị chê','Bị bắt nạt','Bị phân biệt']),
    TQ('Bạn có ý kiến khác em, em?','Lắng nghe, trao đổi',['Cãi nhau','Bỏ đi','Giận bạn']),
    TQ('Tôn trọng người khác giúp?','Sống hòa thuận',['Mệt mỏi','Buồn chán','Cô đơn']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd4_thiennhien',name:'Bảo vệ TN',emoji:'🌍',color:'rgba(76,175,80,.2)',gen:function(l){var qs=[
    TQ('Rừng bị phá gây ra?','Lũ lụt, xói mòn',['Mát hơn','Đẹp hơn','Nhiều cây hơn']),
    TQ('Trồng cây giúp?','Chống biến đổi khí hậu',['Nóng hơn','Ô nhiễm hơn','Khô hơn']),
    TQ('Động vật quý hiếm cần?','Bảo vệ, không săn bắt',['Săn bắt','Nuôi nhốt','Bán đi']),
    TQ('Rác nhựa phân hủy mất?','Hàng trăm năm',['1 ngày','1 tuần','1 tháng']),
    TQ('Giảm ô nhiễm bằng cách?','3R: Giảm, Tái sử dụng, Tái chế',['Xả rác','Đốt rác','Vứt sông']),
    TQ('Nước sạch là tài nguyên?','Hữu hạn, cần tiết kiệm',['Vô hạn','Không cần tiết kiệm','Rất nhiều']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'dd4_quyentrem',name:'Quyền trẻ em',emoji:'👧',color:'rgba(171,71,188,.2)',gen:function(l){var qs=[
    TQ('Trẻ em có quyền gì?','Được học, chơi, bảo vệ',['Không có quyền','Chỉ lao động','Chỉ nghe lời']),
    TQ('Trẻ em được quyền?','Có ý kiến riêng',['Chỉ nghe lời','Không được nói','Phải im lặng']),
    TQ('Ngày Quốc tế Thiếu nhi?','1 tháng 6',['20/11','8/3','2/9']),
    TQ('Khi bị bắt nạt, em?','Nói người lớn tin cậy',['Im lặng','Đánh lại','Bỏ học']),
    TQ('Trẻ em dưới 15 tuổi?','Không được lao động',['Phải đi làm','Phải kiếm tiền','Không được học']),
    TQ('Mọi trẻ em đều có quyền?','Đi học miễn phí',['Chỉ con nhà giàu','Chỉ con trai','Chỉ TP lớn']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ TIN HOC SKILLS ============
var TINHOC_SKILLS=[
  {id:'th4_mang',name:'Mạng & Internet',emoji:'🌐',color:'rgba(92,107,192,.2)',gen:function(l){var qs=[
    TQ('Internet là gì?','Mạng kết nối toàn cầu',['Một máy tính','Một phần mềm','Một trò chơi']),
    TQ('WWW viết tắt của?','World Wide Web',['Wireless Web','Window Web','World Work']),
    TQ('Email dùng để?','Gửi thư điện tử',['Chơi game','Vẽ tranh','Tính toán']),
    TQ('Trình duyệt web phổ biến?','Chrome, Firefox, Edge',['Word, Excel','Paint, Calculator','Notepad']),
    TQ('URL là gì?','Địa chỉ trang web',['Tên máy tính','Mật khẩu','Email']),
    TQ('Wifi giúp?','Kết nối Internet không dây',['Sạc pin','Gọi điện','Nghe nhạc']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th4_vanban',name:'Soạn văn bản',emoji:'📝',color:'rgba(66,165,245,.2)',gen:function(l){var qs=[
    TQ('Phần mềm soạn văn bản?','Microsoft Word',['Paint','Calculator','Minecraft']),
    TQ('Ctrl+C dùng để?','Sao chép (Copy)',['Dán','Cắt','Lưu']),
    TQ('Ctrl+V dùng để?','Dán (Paste)',['Sao chép','Cắt','In']),
    TQ('Ctrl+S dùng để?','Lưu (Save)',['Sao chép','Dán','Xóa']),
    TQ('Ctrl+Z dùng để?','Hoàn tác (Undo)',['Lưu','Sao chép','In']),
    TQ('Font chữ thường dùng?','Times New Roman, Arial',['Paint, Calculator','Game, Music','Camera, Photo']),
    TQ('Để in đậm chữ dùng?','Ctrl+B (Bold)',['Ctrl+I','Ctrl+U','Ctrl+S']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th4_laptrinh',name:'Scratch',emoji:'🐱',color:'rgba(255,183,77,.2)',gen:function(l){var qs=[
    TQ('Scratch dùng để?','Lập trình bằng kéo thả',['Vẽ tranh','Soạn văn','Tính toán']),
    TQ('Nhân vật trong Scratch gọi là?','Sprite',['Pixel','Robot','Avatar']),
    TQ('Khối "lặp lại" dùng để?','Làm lại nhiều lần',['Dừng','Xóa','Lưu']),
    TQ('Sân khấu Scratch gọi là?','Stage',['Screen','Board','Field']),
    TQ('Khối "nếu...thì" là?','Điều kiện',['Vòng lặp','Biến','Hàm']),
    TQ('Để sprite di chuyển dùng?','Khối "di chuyển"',['Khối "nói"','Khối "đợi"','Khối "dừng"']),
    TQ('Scratch do ai phát triển?','MIT (Mỹ)',['Google','Apple','Microsoft']),
  ];return qs[R(0,qs.length-1)]}},
  {id:'th4_antoan',name:'An toàn TT',emoji:'🔒',color:'rgba(239,83,80,.2)',gen:function(l){var qs=[
    TQ('Mật khẩu mạnh cần có?','Chữ + số + ký tự đặc biệt',['Chỉ số','Chỉ chữ','Tên mình']),
    TQ('Không nên chia sẻ gì online?','Mật khẩu, địa chỉ, SĐT',['Bài hát','Hình phong cảnh','Bài học']),
    TQ('Phishing là gì?','Lừa đảo lấy thông tin',['Trò chơi','Phần mềm','Trang web']),
    TQ('Gặp nội dung xấu trên mạng?','Tắt, nói người lớn',['Xem tiếp','Chia sẻ','Tải về']),
    TQ('Virus máy tính là?','Chương trình gây hại',['Con virus thật','Trò chơi','Phần mềm hay']),
    TQ('Nên cập nhật phần mềm để?','Vá lỗi bảo mật',['Chơi game tốt hơn','Đẹp hơn','Nặng máy']),
  ];return qs[R(0,qs.length-1)]}},
];

// ============ ENCOURAGEMENT MESSAGES ============
var CORGI_TAP=['Meo!','Giỏi lắm!','🐱','Siêu!','💕','Wow!','🌟','Tiếp tục!','Tuyệt!','👏'];
var C_MSGS=[{t:'Giỏi quá!',s:'Siêu đỉnh luôn! 🌟'},{t:'Đúng rồi!',s:'Mèo mừng lắm! 🐱'},{t:'Tuyệt vời!',s:'Combo lên nào! 🔥'},{t:'Wow!',s:'Thiên tài nhí! 🧠'},{t:'Perfect!',s:'Mèo tự hào! 🐱'},{t:'Amazing!',s:'Keep going! 💪'},{t:'Siêu sao!',s:'Ngôi sao sáng! ⭐'}];
var W_MSGS=[{t:'Oops!',s:'Thử lại nha! 💕'},{t:'Hmm...',s:'Mèo tin bạn! 🐱'},{t:'Gần đúng!',s:'Cố lên! 💪'}];

// ============ GRADE CONFIG ============
window.GRADE_CONFIG={
  id:'lop4',
  gradeName:'Lớp 4',
  saveKey:'vuongquoc_lop4',
  oldSaveKey:null,
  xpPerLevel:100,
  passThreshold:75,
  maxSkillLevel:6,
  hasLives:false,
  gatingMode:'cross_subject',
  questionsPerRound:10,
  timePerQuestion:30,
  levelRewardRate:45,
  speeches:[
    ['Toán lớp 4 thú vị lắm!','Phân số hôm nay nhé!','Mèo thích tính toán!'],
    ['Tiếng Việt hay lắm!','Từ ghép từ láy giỏi nè!','Đọc văn cùng Mèo!'],
    ['English is great!','Let\'s practice!','Cat loves English!'],
    ['Khoa học thú vị!','Khám phá thế giới!','Mèo thích thí nghiệm!'],
    ['Lịch sử hấp dẫn!','Tìm hiểu Việt Nam!','Mèo biết nhiều lắm!'],
    ['Bé ngoan giỏi ghê!','Bảo vệ thiên nhiên nhé!','Mèo yêu bé ngoan!'],
    ['Tin học vui lắm!','Lập trình cùng Scratch!','Mèo giỏi máy tính!'],
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#fb7185'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#38bdf8'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#a78bfa'},
    {id:'khoahoc',name:'Khoa Học',emoji:'🔬',skills:KHOAHOC_SKILLS,color:'#26c6da'},
    {id:'sudia',name:'Sử & Địa',emoji:'🗺️',skills:SUDIA_SKILLS,color:'#8d6e63'},
    {id:'daoduc',name:'Đạo Đức',emoji:'💝',skills:DAODUC_SKILLS,color:'#ec407a'},
    {id:'tinhoc',name:'Tin Học',emoji:'💻',skills:TINHOC_SKILLS,color:'#5c6bc0'},
  ],
};
