// Vườn Cổ Tích — Bé 4 Tuổi
// Mascot: Thỏ Bông | Theme: Khu vườn thần tiên

// === MÔN 1: LÀM QUEN VỚI TOÁN ===
var MATH_SKILLS = [
  {id:'m1_count5', name:'Đếm 1-5', emoji:'🌸', color:'rgba(74,144,217,.18)', gen:function(lv){
    var n = R(1,5);
    var items = ['bông hoa','con bướm','quả táo','ngôi sao','con ong'];
    var item = items[R(0,items.length-1)];
    return MQ('Đếm xem có bao nhiêu '+item+'?\n'+('⭐'.repeat(n)), n, 'Đếm từng cái nhé!')
  }},
  {id:'m1_count10', name:'Đếm 6-10', emoji:'🔢', color:'rgba(74,144,217,.18)', gen:function(lv){
    var n = R(6,10);
    return MQ(n+' ngón tay là số mấy?', n, 'Đếm ngón tay nào!')
  }},
  {id:'m1_recognize', name:'Nhận biết số', emoji:'👀', color:'rgba(74,144,217,.18)', gen:function(lv){
    var n = R(1,10);
    var a = n, w1 = n+R(1,3), w2 = Math.max(1,n-R(1,3)), w3 = n+R(2,5);
    return TQ('Số '+n+' có mấy đồ vật?', ''+a, [''+w1,''+w2,''+w3], 'Đếm lại nhé!')
  }},
  {id:'m1_compare', name:'So sánh', emoji:'⚖️', color:'rgba(74,144,217,.18)', gen:function(lv){
    var a = R(1,8), b = R(1,8);
    while(a===b) b = R(1,8);
    var bigger = Math.max(a,b);
    return TQ(a+' và '+b+', số nào lớn hơn?', ''+bigger, [''+(a+b),''+Math.min(a,b),''+R(1,10)], 'Số nào nhiều hơn?')
  }},
  {id:'m1_shapes', name:'Hình dạng', emoji:'🔵', color:'rgba(74,144,217,.18)', gen:function(lv){
    var shapes = [
      {name:'hình tròn', ex:'quả bóng, đồng hồ'},
      {name:'hình vuông', ex:'cửa sổ, TV'},
      {name:'hình tam giác', ex:'mái nhà, biển báo'},
      {name:'hình chữ nhật', ex:'cửa, cuốn sách'}
    ];
    var s = shapes[R(0,shapes.length-1)];
    var wrongs = shapes.filter(function(x){return x.name!==s.name}).map(function(x){return x.name});
    return TQ(s.ex+' là '+s.name+' phải không?', 'Đúng rồi!', ['Sai rồi!'], 'Nhìn kỹ hình dạng nhé!')
  }},
  {id:'m1_add5', name:'Cộng sơ khởi', emoji:'➕', color:'rgba(74,144,217,.18)', gen:function(lv){
    var a = R(1,3), b = R(1,5-a);
    return MQ('🌸'.repeat(a)+' thêm '+'🌸'.repeat(b)+' = mấy bông hoa?', a+b, 'Đếm tất cả hoa nhé!')
  }},
  {id:'m1_sub5', name:'Trừ sơ khởi', emoji:'➖', color:'rgba(74,144,217,.18)', gen:function(lv){
    var a = R(3,5), b = R(1,a-1);
    return MQ('Có '+a+' con vịt, '+b+' con bơi đi. Còn mấy con?', a-b, 'Đếm số còn lại nhé!')
  }},
  {id:'m1_sort', name:'Phân loại', emoji:'📦', color:'rgba(74,144,217,.18)', gen:function(lv){
    var groups = [
      {q:'Quả cam, quả táo, con mèo. Cái nào khác?', a:'Con mèo', w:['Quả cam','Quả táo','Tất cả giống nhau']},
      {q:'Hình tròn, hình vuông, quả chuối. Cái nào khác?', a:'Quả chuối', w:['Hình tròn','Hình vuông','Không cái nào']},
      {q:'Bút đỏ, bút xanh, quả bóng. Cái nào khác?', a:'Quả bóng', w:['Bút đỏ','Bút xanh','Tất cả khác']},
    ];
    var g = groups[R(0,groups.length-1)];
    return TQ(g.q, g.a, g.w, 'Tìm cái không cùng nhóm!')
  }},
];

// === MÔN 2: LÀM QUEN CHỮ CÁI TIẾNG VIỆT ===
var VIET_SKILLS = [
  {id:'v1_chu', name:'Chữ cái A-H', emoji:'📖', color:'rgba(232,115,74,.18)', gen:function(lv){
    var letters = ['A','Ă','Â','B','C','D','Đ','E','Ê','G','H'];
    var words = ['Ababơ','Ăn','Ấm','Bóng','Cá','Dưa','Đèn','Em','Ếch','Gà','Hoa'];
    var i = R(0,letters.length-1);
    var wrongs = [];
    while(wrongs.length<3){var w=letters[R(0,letters.length-1)]; if(w!==letters[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Từ "'+words[i]+'" bắt đầu bằng chữ gì?', letters[i], wrongs, 'Nghe kỹ âm đầu nhé!')
  }},
  {id:'v1_chu2', name:'Chữ cái I-R', emoji:'📖', color:'rgba(232,115,74,.18)', gen:function(lv){
    var letters = ['I','K','L','M','N','O','Ô','Ơ','P','Q','R'];
    var words = ['Ích','Kẹo','Lá','Mẹ','Nước','Ong','Ổi','Ơi','Pin','Quạt','Rùa'];
    var i = R(0,letters.length-1);
    var wrongs = [];
    while(wrongs.length<3){var w=letters[R(0,letters.length-1)]; if(w!==letters[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Từ "'+words[i]+'" bắt đầu bằng chữ gì?', letters[i], wrongs, 'Nghe kỹ âm đầu nhé!')
  }},
  {id:'v1_chu3', name:'Chữ cái S-Y', emoji:'📖', color:'rgba(232,115,74,.18)', gen:function(lv){
    var letters = ['S','T','U','Ư','V','X','Y'];
    var words = ['Sóc','Thỏ','Ủng','Ước','Voi','Xe','Yêu'];
    var i = R(0,letters.length-1);
    var wrongs = [];
    while(wrongs.length<3){var w=letters[R(0,letters.length-1)]; if(w!==letters[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Từ "'+words[i]+'" bắt đầu bằng chữ gì?', letters[i], wrongs, 'Nghe kỹ âm đầu nhé!')
  }},
  {id:'v1_thanh', name:'6 thanh dấu', emoji:'🎵', color:'rgba(232,115,74,.18)', gen:function(lv){
    var pairs = [
      {word:'ba', thanh:'Không dấu (thanh ngang)'},
      {word:'bà', thanh:'Dấu huyền ( ` )'},
      {word:'bá', thanh:'Dấu sắc ( ´ )'},
      {word:'bả', thanh:'Dấu hỏi ( ? )'},
      {word:'bã', thanh:'Dấu ngã ( ~ )'},
      {word:'bạ', thanh:'Dấu nặng ( . )'},
    ];
    var p = pairs[R(0,pairs.length-1)];
    var wrongs = pairs.filter(function(x){return x.word!==p.word}).map(function(x){return x.thanh});
    wrongs = wrongs.sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('Từ "'+p.word+'" mang thanh dấu gì?', p.thanh, wrongs, 'Nghe giọng đọc nhé!')
  }},
  {id:'v1_van', name:'Ghép vần', emoji:'🧩', color:'rgba(232,115,74,.18)', gen:function(lv){
    var combos = [
      {am:'B', van:'A', tu:'BA'}, {am:'M', van:'E', tu:'ME'}, {am:'C', van:'A', tu:'CA'},
      {am:'L', van:'A', tu:'LA'}, {am:'H', van:'OA', tu:'HOA'}, {am:'B', van:'Ô', tu:'BÔ'},
    ];
    var c = combos[R(0,combos.length-1)];
    var wrongs = combos.filter(function(x){return x.tu!==c.tu}).map(function(x){return x.tu}).slice(0,3);
    return TQ('Ghép '+c.am+' + '+c.van+' thành từ gì?', c.tu, wrongs, 'Đọc to lên nhé!')
  }},
];

// === MÔN 3: LÀM QUEN TIẾNG ANH ===
var ENG_SKILLS = [
  {id:'e1_colors', name:'Colors', emoji:'🌈', color:'rgba(52,152,219,.18)', gen:function(lv){
    var colors = ['Red','Blue','Yellow','Green','Orange','Purple','Pink','White','Black','Brown'];
    var vn = ['Đỏ','Xanh dương','Vàng','Xanh lá','Cam','Tím','Hồng','Trắng','Đen','Nâu'];
    var i = R(0,colors.length-1);
    var wrongs = [];
    while(wrongs.length<3){var w=colors[R(0,colors.length-1)]; if(w!==colors[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Màu "'+vn[i]+'" tiếng Anh là gì?', colors[i], wrongs, 'Nhớ lại nhé!')
  }},
  {id:'e1_numbers', name:'Numbers 1-10', emoji:'🔢', color:'rgba(52,152,219,.18)', gen:function(lv){
    var nums = ['One','Two','Three','Four','Five','Six','Seven','Eight','Nine','Ten'];
    var i = R(0,9);
    var wrongs = [];
    while(wrongs.length<3){var w=nums[R(0,9)]; if(w!==nums[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Số '+(i+1)+' tiếng Anh là gì?', nums[i], wrongs, 'Let\'s count!')
  }},
  {id:'e1_animals', name:'Animals', emoji:'🐕', color:'rgba(52,152,219,.18)', gen:function(lv){
    var animals = [
      {en:'Dog', vn:'Con chó'}, {en:'Cat', vn:'Con mèo'}, {en:'Bird', vn:'Con chim'},
      {en:'Fish', vn:'Con cá'}, {en:'Duck', vn:'Con vịt'}, {en:'Rabbit', vn:'Con thỏ'},
      {en:'Elephant', vn:'Con voi'}, {en:'Lion', vn:'Con sư tử'}, {en:'Monkey', vn:'Con khỉ'},
    ];
    var a = animals[R(0,animals.length-1)];
    var wrongs = animals.filter(function(x){return x.en!==a.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ(a.vn+' tiếng Anh là gì?', a.en, wrongs, 'Think about it!')
  }},
  {id:'e1_family', name:'Family', emoji:'👨‍👩‍👧', color:'rgba(52,152,219,.18)', gen:function(lv){
    var fam = [
      {en:'Mom', vn:'Mẹ'}, {en:'Dad', vn:'Bố'}, {en:'Brother', vn:'Anh/Em trai'},
      {en:'Sister', vn:'Chị/Em gái'}, {en:'Grandma', vn:'Bà'}, {en:'Grandpa', vn:'Ông'},
    ];
    var f = fam[R(0,fam.length-1)];
    var wrongs = fam.filter(function(x){return x.en!==f.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ(f.vn+' tiếng Anh là gì?', f.en, wrongs, 'Family time!')
  }},
  {id:'e1_fruits', name:'Fruits & Food', emoji:'🍎', color:'rgba(52,152,219,.18)', gen:function(lv){
    var items = [
      {en:'Apple', vn:'Quả táo'}, {en:'Banana', vn:'Quả chuối'}, {en:'Orange', vn:'Quả cam'},
      {en:'Milk', vn:'Sữa'}, {en:'Water', vn:'Nước'}, {en:'Rice', vn:'Cơm'},
    ];
    var item = items[R(0,items.length-1)];
    var wrongs = items.filter(function(x){return x.en!==item.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ(item.vn+' tiếng Anh là gì?', item.en, wrongs, 'Yummy!')
  }},
  {id:'e1_abc', name:'ABCs', emoji:'🔤', color:'rgba(52,152,219,.18)', gen:function(lv){
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var words = ['Apple','Ball','Cat','Dog','Egg','Fish','Girl','Hat','Ice','Jam','Kite','Lion','Moon','Nest','Orange','Pen','Queen','Rain','Sun','Tree','Umbrella','Van','Water','X-ray','Yo-yo','Zebra'];
    var i = R(0,25);
    var wrongs = [];
    while(wrongs.length<3){var w=abc[R(0,25)]; if(w!==abc[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('"'+words[i]+'" starts with which letter?', abc[i], wrongs, 'Listen to the first sound!')
  }},
];

// === MÔN 4: KHÁM PHÁ THẾ GIỚI ===
var TNXH_SKILLS = [
  {id:'t1_body', name:'Cơ thể bé', emoji:'🧒', color:'rgba(92,184,92,.18)', gen:function(lv){
    var parts = [
      {name:'Mắt', func:'nhìn'}, {name:'Tai', func:'nghe'}, {name:'Mũi', func:'ngửi'},
      {name:'Lưỡi', func:'nếm'}, {name:'Tay', func:'chạm/cầm'},
    ];
    var p = parts[R(0,parts.length-1)];
    var wrongs = parts.filter(function(x){return x.name!==p.name}).map(function(x){return x.name}).slice(0,3);
    return TQ('Bộ phận nào dùng để '+p.func+'?', p.name, wrongs, 'Nghĩ về 5 giác quan nhé!')
  }},
  {id:'t1_family', name:'Gia đình', emoji:'👪', color:'rgba(92,184,92,.18)', gen:function(lv){
    var qs = [
      {q:'Ai là mẹ của mẹ?', a:'Bà ngoại', w:['Bà nội','Dì','Cô']},
      {q:'Ai là bố của bố?', a:'Ông nội', w:['Ông ngoại','Chú','Bác']},
      {q:'Con gái của bố mẹ là?', a:'Chị/Em gái', w:['Anh','Bà','Cô']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Nghĩ về gia đình nhé!')
  }},
  {id:'t1_animals', name:'Động vật', emoji:'🐾', color:'rgba(92,184,92,.18)', gen:function(lv){
    var qs = [
      {q:'Con gà sống ở đâu?', a:'Chuồng gà', w:['Dưới biển','Trên cây','Trong hang']},
      {q:'Con cá sống ở đâu?', a:'Dưới nước', w:['Trên cây','Trong nhà','Trên trời']},
      {q:'Con thỏ thích ăn gì?', a:'Cà rốt', w:['Cá','Thịt','Cơm']},
      {q:'Con bướm trước đó là gì?', a:'Con sâu', w:['Con kiến','Con ong','Con cá']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Quan sát thiên nhiên nhé!')
  }},
  {id:'t1_weather', name:'Thời tiết', emoji:'🌤️', color:'rgba(92,184,92,.18)', gen:function(lv){
    var qs = [
      {q:'Trời mưa nên mang theo gì?', a:'Ô (dù)', w:['Kính mát','Kem chống nắng','Quạt']},
      {q:'Trời nắng nên đội gì?', a:'Mũ/Nón', w:['Áo mưa','Khăn quàng','Ủng']},
      {q:'Mùa nào hoa nở nhiều nhất?', a:'Mùa xuân', w:['Mùa đông','Mùa hè','Mùa thu']},
      {q:'Ban đêm trên trời có gì?', a:'Mặt trăng và sao', w:['Mặt trời','Cầu vồng','Mây đen']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Nhìn ra ngoài trời nhé!')
  }},
];

// === MÔN 5: TƯ DUY & SÁNG TẠO ===
var LOGIC_SKILLS = [
  {id:'l1_odd', name:'Khác biệt', emoji:'🔍', color:'rgba(155,89,182,.18)', gen:function(lv){
    var qs = [
      {q:'🍎 🍌 🐱 🍊 — Cái nào khác?', a:'🐱 (con mèo)', w:['🍎 (táo)','🍌 (chuối)','🍊 (cam)']},
      {q:'🔴 🔵 🔴 🌳 — Cái nào khác?', a:'🌳 (cây)', w:['🔴 (đỏ)','🔵 (xanh)','Không cái nào']},
      {q:'🐕 🐱 🚗 🐟 — Cái nào khác?', a:'🚗 (xe)', w:['🐕 (chó)','🐱 (mèo)','🐟 (cá)']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Tìm cái không cùng nhóm!')
  }},
  {id:'l1_pattern', name:'Quy luật', emoji:'🔄', color:'rgba(155,89,182,.18)', gen:function(lv){
    var patterns = [
      {q:'🔴🔵🔴🔵🔴❓ Tiếp theo là?', a:'🔵', w:['🔴','🟢','🟡']},
      {q:'⭐🌙⭐🌙⭐❓ Tiếp theo là?', a:'🌙', w:['⭐','☀️','🌈']},
      {q:'1, 2, 3, 4, ❓ Tiếp theo là?', a:'5', w:['6','3','1']},
    ];
    var p = patterns[R(0,patterns.length-1)];
    return TQ(p.q, p.a, p.w, 'Tìm quy luật lặp lại nhé!')
  }},
  {id:'l1_sequence', name:'Thứ tự', emoji:'📋', color:'rgba(155,89,182,.18)', gen:function(lv){
    var qs = [
      {q:'Trứng → ❓ → Gà lớn. Thiếu gì?', a:'Gà con', w:['Con vịt','Quả trứng','Con bướm']},
      {q:'Hạt giống → ❓ → Cây to. Thiếu gì?', a:'Cây con', w:['Quả','Hoa','Lá']},
      {q:'Sáng → ❓ → Tối. Thiếu gì?', a:'Trưa/Chiều', w:['Đêm','Sáng','Mai']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Nghĩ theo thứ tự nhé!')
  }},
  {id:'l1_memory', name:'Trí nhớ', emoji:'🧠', color:'rgba(155,89,182,.18)', gen:function(lv){
    var items = ['🍎','🌸','⭐','🐱','🎵','🔵','🌈','❤️'];
    var shown = [];
    for(var i=0;i<3;i++) shown.push(items[R(0,items.length-1)]);
    var hidden = shown[R(0,2)];
    var remaining = shown.filter(function(x,idx){return idx !== shown.indexOf(hidden)});
    var wrongs = items.filter(function(x){return x!==hidden}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('Có '+shown.join(' ')+'. Ẩn đi 1 cái. Còn '+remaining.join(' ')+'. Cái gì mất?', hidden, wrongs, 'Nhớ lại nhé!')
  }},
];

// === Mascot messages ===
var CORGI_TAP = [
  'Thỏ Bông tin bé giỏi lắm! 🌸',
  'Cùng chơi nào bé yêu! 🦋',
  'Bé làm đúng rồi, tuyệt vời! ⭐',
  'Thử lại nào, Thỏ Bông ở đây! 🐰',
  'Bé siêu giỏi luôn! 🌈',
  'Wow, bé giỏi quá! 🎉',
];
var C_MSGS = [
  {t:'Giỏi quá!', s:'Bé làm đúng rồi! Thỏ Bông vui lắm! 🌸'},
  {t:'Tuyệt vời!', s:'Bé thông minh quá! ⭐'},
  {t:'Xuất sắc!', s:'Đúng rồi bé ơi! Tiếp tục nào! 🌈'},
  {t:'Wow!', s:'Bé giỏi ghê! Thỏ Bông nhảy múa nè! 🐰'},
];
var W_MSGS = [
  {t:'Ối!', s:'Chưa đúng rồi bé ơi. Thử lại nào! 🌸'},
  {t:'Hmm...', s:'Gần đúng lắm! Cố lên bé nhé! 💪'},
  {t:'Thử nữa!', s:'Không sao đâu! Thỏ Bông cổ vũ bé! 🐰'},
];

// === Grade config ===
window.GRADE_CONFIG = {
  id: 'pre_4',
  gradeName: 'Bé 4 Tuổi',
  saveKey: 'vuongquoc_pre_4',
  xpPerLevel: 60,
  passThreshold: 70,
  maxSkillLevel: 3,
  hasLives: false,
  gatingMode: 'per_subject',
  questionsPerRound: 5,
  timePerQuestion: 0,
  levelRewardRate: 50,
  speeches: [
    ['Thỏ Bông chào bé! Mình học Toán nhé! 🔢','Đếm cùng Thỏ Bông nào! 🌸'],
    ['Bé ơi, học chữ cái nào! 📖','A, B, C... Thỏ Bông đọc cùng bé! 🐰'],
    ['Hello bé! Let\'s learn English! 🌍','Colors, numbers, animals — fun! 🌈'],
    ['Khám phá thế giới xung quanh nào! 🌿','Thỏ Bông dẫn bé đi khám phá! 🦋'],
    ['Tư duy nào bé ơi! Suy nghĩ thật giỏi! 🧩','Thỏ Bông thích câu đố lắm! 🔍'],
  ],
  subjects: [
    {id:'math', name:'Làm quen Toán', emoji:'🔢', skills:MATH_SKILLS, color:'#4A90D9'},
    {id:'vietnamese', name:'Chữ cái TV', emoji:'📖', skills:VIET_SKILLS, color:'#E8734A'},
    {id:'english', name:'Tiếng Anh', emoji:'🌍', skills:ENG_SKILLS, color:'#3498DB'},
    {id:'tnxh', name:'Khám phá', emoji:'🌿', skills:TNXH_SKILLS, color:'#5CB85C'},
    {id:'logic', name:'Tư duy', emoji:'🧩', skills:LOGIC_SKILLS, color:'#9B59B6'},
  ]
};
