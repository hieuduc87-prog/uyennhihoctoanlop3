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
    if(l<=3){var a=R(5,20),b=R(5,20);return MQ('TBC của '+a+' và '+b+' = ?',(a+b)/2,'(a+b):2')}
    var a=R(10,30),b=R(10,30),c=R(10,30);var s=a+b+c;if(s%3!==0){c=c+(3-s%3)}
    return MQ('TBC của '+a+', '+b+', '+c+' = ?',(a+b+c)/3,'(a+b+c):3')}},
  {id:'m4_sumdf',name:'Tổng Hiệu',emoji:'🧩',color:'rgba(255,107,157,.2)',gen:function(l){
    var s=R(20,100),d=R(2,20);if((s+d)%2!==0){s++}
    var big=(s+d)/2,small=(s-d)/2;
    return Math.random()>.5?MQ('Tổng 2 số = '+s+'\nHiệu 2 số = '+d+'\nSố lớn = ?',big,'(Tổng+Hiệu):2'):MQ('Tổng 2 số = '+s+'\nHiệu 2 số = '+d+'\nSố bé = ?',small,'(Tổng−Hiệu):2')}},
  {id:'m4_geo',name:'Hình Học',emoji:'📐',color:'rgba(56,189,248,.2)',gen:function(l){
    if(l<=2){var a=R(3,15);return Math.random()>.5?MQ('HV cạnh '+a+'cm\nChu vi = ?',a*4,'CV = a×4'):MQ('HV cạnh '+a+'cm\nDiện tích = ?',a*a,'DT = a×a')}
    if(l<=4){var d=R(5,20),r=R(3,12);return Math.random()>.5?MQ('HCN '+d+'×'+r+'cm\nChu vi = ?',(d+r)*2):MQ('HCN '+d+'×'+r+'cm\nDiện tích = ?',d*r)}
    var a=R(5,15),h=R(3,10);return MQ('Hình bình hành\nđáy '+a+'cm, cao '+h+'cm\nDT = ?',a*h,'DT = đáy × cao')}},
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
  {id:'v4_bptt',name:'Biện Pháp TT',emoji:'🎨',color:'rgba(56,189,248,.2)',gen:function(l){var qs=[
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
  ],
  subjects:[
    {id:'math',name:'Toán',emoji:'🔢',skills:MATH_SKILLS,color:'#fb7185'},
    {id:'viet',name:'Tiếng Việt',emoji:'📖',skills:VIET_SKILLS,color:'#38bdf8'},
    {id:'eng',name:'English',emoji:'🌍',skills:ENG_SKILLS,color:'#a78bfa'},
  ],
};
