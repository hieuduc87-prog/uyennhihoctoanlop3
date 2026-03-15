// Lâu Đài Ánh Sao — Bé 5 Tuổi
// Mascot: Gấu Mật | Theme: Lâu đài trên mây, ngôi sao, mặt trăng

// === MÔN 1: TOÁN TIỀN TIỂU HỌC ===
var MATH_SKILLS = [
  {id:'m1_count20', name:'Đếm 1-20', emoji:'🔢', color:'rgba(41,128,185,.18)', gen:function(lv){
    var n = lv<3 ? R(11,15) : R(11,20);
    return MQ('Đếm: số liền sau '+n+' là số mấy?', n+1, 'Đếm tiếp nhé!')
  }},
  {id:'m1_order', name:'Sắp xếp số', emoji:'📊', color:'rgba(41,128,185,.18)', gen:function(lv){
    var a = R(1,15), b = R(a+1,18), c = R(b+1,20);
    var arr = [a,b,c].sort(function(){return Math.random()-0.5});
    var sorted = [a,b,c].join(', ');
    return TQ('Sắp xếp '+arr.join(', ')+' từ bé đến lớn:', sorted,
      [c+', '+b+', '+a, b+', '+a+', '+c, a+', '+c+', '+b], 'Tìm số bé nhất trước!')
  }},
  {id:'m1_skip2', name:'Đếm nhảy 2', emoji:'🦘', color:'rgba(41,128,185,.18)', gen:function(lv){
    var start = R(0,1)*2;
    var seq = [start, start+2, start+4, start+6];
    return MQ(seq.join(', ')+', ❓ Tiếp theo là?', start+8, 'Cộng thêm 2!')
  }},
  {id:'m1_add10', name:'Cộng (PV 10)', emoji:'➕', color:'rgba(41,128,185,.18)', gen:function(lv){
    var a = R(1, lv<3?5:8), b = R(1, 10-a);
    return MQ(a+' + '+b+' = ?', a+b, 'Đếm thêm '+b+' từ '+a+'!')
  }},
  {id:'m1_sub10', name:'Trừ (PV 10)', emoji:'➖', color:'rgba(41,128,185,.18)', gen:function(lv){
    var a = R(3, 10), b = R(1, a-1);
    return MQ(a+' - '+b+' = ?', a-b, 'Đếm lùi '+b+' từ '+a+'!')
  }},
  {id:'m1_mixed', name:'Cộng hay Trừ?', emoji:'🤔', color:'rgba(41,128,185,.18)', gen:function(lv){
    if(R(0,1)){
      var a=R(1,7), b=R(1,10-a);
      return MQ(a+' + '+b+' = ?', a+b)
    } else {
      var a=R(3,10), b=R(1,a-1);
      return MQ(a+' - '+b+' = ?', a-b)
    }
  }},
  {id:'m1_word', name:'Bài toán lời văn', emoji:'📝', color:'rgba(41,128,185,.18)', gen:function(lv){
    var problems = [
      function(){var a=R(2,5),b=R(1,5); return {q:'Bé có '+a+' kẹo, mẹ cho thêm '+b+' kẹo. Bé có tất cả bao nhiêu kẹo?', ans:a+b}},
      function(){var a=R(5,10),b=R(1,a-1); return {q:'Có '+a+' quả bóng, bay đi '+b+' quả. Còn lại bao nhiêu quả?', ans:a-b}},
      function(){var a=R(3,7),b=R(1,4); return {q:'Trong rổ có '+a+' quả cam, bé bỏ thêm '+b+' quả nữa. Rổ có bao nhiêu quả?', ans:a+b}},
    ];
    var p = problems[R(0,problems.length-1)]();
    return MQ(p.q, p.ans, 'Đọc kỹ đề nhé!')
  }},
  {id:'m1_shapes3d', name:'Hình khối 3D', emoji:'📦', color:'rgba(41,128,185,.18)', gen:function(lv){
    var shapes = [
      {name:'Hình cầu', ex:'Quả bóng, quả cam'},
      {name:'Hình hộp', ex:'Hộp quà, tủ lạnh'},
      {name:'Hình trụ', ex:'Lon nước, cây nến'},
      {name:'Hình nón', ex:'Nón kem, mũ phù thủy'},
    ];
    var s = shapes[R(0,shapes.length-1)];
    var wrongs = shapes.filter(function(x){return x.name!==s.name}).map(function(x){return x.name});
    return TQ(s.ex+' giống hình gì?', s.name, wrongs, 'Nhìn kỹ hình dạng nhé!')
  }},
  {id:'m1_clock', name:'Đồng hồ', emoji:'🕐', color:'rgba(41,128,185,.18)', gen:function(lv){
    var h = R(1,12);
    var clocks = {'1':'🕐','2':'🕑','3':'🕒','4':'🕓','5':'🕔','6':'🕕','7':'🕖','8':'🕗','9':'🕘','10':'🕙','11':'🕚','12':'🕛'};
    var emoji = clocks[h] || '🕐';
    return MQ(emoji+' Đồng hồ chỉ mấy giờ?', h, 'Nhìn kim ngắn nhé!')
  }},
  {id:'m1_pair10', name:'Đôi bạn thân (=10)', emoji:'🤝', color:'rgba(41,128,185,.18)', gen:function(lv){
    var a = R(1,9);
    return MQ(a+' + ❓ = 10. Số ❓ là?', 10-a, 'Cần thêm mấy để được 10?')
  }},
];

// === MÔN 2: TIẾNG VIỆT TIỀN LỚP 1 ===
var VIET_SKILLS = [
  {id:'v1_abc', name:'29 chữ cái', emoji:'📖', color:'rgba(231,76,60,.18)', gen:function(lv){
    var letters = 'A Ă Â B C D Đ E Ê G H I K L M N O Ô Ơ P Q R S T U Ư V X Y'.split(' ');
    var i = R(0,letters.length-1);
    var next = i<letters.length-1 ? letters[i+1] : letters[0];
    var wrongs = [];
    while(wrongs.length<3){var w=letters[R(0,letters.length-1)]; if(w!==next&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('Sau chữ '+letters[i]+' là chữ gì?', next, wrongs, 'Nhớ bảng chữ cái nhé!')
  }},
  {id:'v1_upper_lower', name:'In hoa / thường', emoji:'🔤', color:'rgba(231,76,60,.18)', gen:function(lv){
    var pairs = [['A','a'],['B','b'],['C','c'],['D','d'],['E','e'],['G','g'],['H','h'],['K','k'],['L','l'],['M','m'],['N','n']];
    var p = pairs[R(0,pairs.length-1)];
    var wrongs = pairs.filter(function(x){return x[0]!==p[0]}).map(function(x){return x[1]}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('Chữ '+p[0]+' in hoa, viết thường là gì?', p[1], wrongs, 'Nhớ cặp in hoa - in thường!')
  }},
  {id:'v1_confuse', name:'Chữ dễ lẫn', emoji:'🔍', color:'rgba(231,76,60,.18)', gen:function(lv){
    var qs = [
      {q:'Từ "trường" bắt đầu bằng?', a:'tr', w:['ch','t','r']},
      {q:'Từ "chó" bắt đầu bằng?', a:'ch', w:['tr','c','s']},
      {q:'Từ "sách" bắt đầu bằng?', a:'s', w:['x','ch','t']},
      {q:'Từ "xe" bắt đầu bằng?', a:'x', w:['s','ch','k']},
      {q:'Từ "giáo" bắt đầu bằng?', a:'gi', w:['d','g','r']},
      {q:'Từ "nón" bắt đầu bằng?', a:'n', w:['l','m','nh']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Nghe kỹ âm đầu nhé!')
  }},
  {id:'v1_van', name:'Ghép vần', emoji:'🧩', color:'rgba(231,76,60,.18)', gen:function(lv){
    var vans = [
      {am:'B', van:'AN', tu:'BAN'}, {am:'T', van:'AN', tu:'TAN'}, {am:'M', van:'AN', tu:'MAN'},
      {am:'B', van:'AT', tu:'BAT'}, {am:'C', van:'ON', tu:'CON'}, {am:'S', van:'ON', tu:'SON'},
      {am:'H', van:'OA', tu:'HOA'}, {am:'L', van:'OA', tu:'LOA'},
    ];
    var v = vans[R(0,vans.length-1)];
    var wrongs = vans.filter(function(x){return x.tu!==v.tu}).map(function(x){return x.tu}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('Ghép '+v.am+' + '+v.van+' = ?', v.tu, wrongs, 'Đọc to lên nhé!')
  }},
  {id:'v1_spell', name:'Đánh vần', emoji:'🗣️', color:'rgba(231,76,60,.18)', gen:function(lv){
    var words = [
      {tu:'BÀN', spell:'Bờ-AN-BAN-huyền-BÀN'},
      {tu:'MẸ', spell:'Mờ-E-ME-nặng-MẸ'},
      {tu:'BÚT', spell:'Bờ-UT-BUT-sắc-BÚT'},
      {tu:'CÁ', spell:'Cờ-A-CA-sắc-CÁ'},
    ];
    var w = words[R(0,words.length-1)];
    var wrongs = words.filter(function(x){return x.tu!==w.tu}).map(function(x){return x.spell}).slice(0,3);
    return TQ('Đánh vần từ "'+w.tu+'":', w.spell, wrongs, 'Chia thành: âm đầu + vần + thanh!')
  }},
  {id:'v1_read', name:'Đọc từ', emoji:'📚', color:'rgba(231,76,60,.18)', gen:function(lv){
    var pairs = [
      {word:'con mèo', meaning:'Con vật kêu meo meo'},
      {word:'quả cam', meaning:'Trái cây màu cam'},
      {word:'cái bàn', meaning:'Đồ để đặt sách vở'},
      {word:'bông hoa', meaning:'Mọc trong vườn, nhiều màu'},
      {word:'con chó', meaning:'Con vật trung thành nhất'},
    ];
    var p = pairs[R(0,pairs.length-1)];
    var wrongs = pairs.filter(function(x){return x.word!==p.word}).map(function(x){return x.word}).slice(0,3);
    return TQ(p.meaning+' là từ gì?', p.word, wrongs, 'Đọc thật kỹ nhé!')
  }},
  {id:'v1_sentence', name:'Sắp xếp câu', emoji:'📝', color:'rgba(231,76,60,.18)', gen:function(lv){
    var sentences = [
      {jumbled:'học / đi / Bé', correct:'Bé đi học'},
      {jumbled:'chơi / Bé / bóng', correct:'Bé chơi bóng'},
      {jumbled:'yêu / Bé / mẹ', correct:'Bé yêu mẹ'},
      {jumbled:'đẹp / Hoa / rất', correct:'Hoa rất đẹp'},
    ];
    var s = sentences[R(0,sentences.length-1)];
    var wrongs = sentences.filter(function(x){return x.correct!==s.correct}).map(function(x){return x.correct}).slice(0,3);
    return TQ('Sắp xếp thành câu đúng:\n'+s.jumbled, s.correct, wrongs, 'Câu bắt đầu bằng chữ hoa!')
  }},
  {id:'v1_fill', name:'Điền vần', emoji:'✏️', color:'rgba(231,76,60,.18)', gen:function(lv){
    var fills = [
      {q:'B_N (nơi ngồi học)', a:'À', w:['Ă','Â','O'], full:'BÀN'},
      {q:'M_ (người sinh ra bé)', a:'Ẹ', w:['A','Ơ','Ê'], full:'MẸ'},
      {q:'C_ (con vật bơi dưới nước)', a:'Á', w:['Ô','Ơ','Ă'], full:'CÁ'},
      {q:'H_A (mọc trong vườn)', a:'O', w:['A','Ơ','Ô'], full:'HOA'},
    ];
    var f = fills[R(0,fills.length-1)];
    return TQ('Điền vào chỗ trống: '+f.q, f.a+' (→ '+f.full+')', f.w.map(function(x){return x}), 'Nghĩ xem từ gì nhé!')
  }},
];

// === MÔN 3: TIẾNG ANH NÂNG CAO ===
var ENG_SKILLS = [
  {id:'e1_greet', name:'Greetings', emoji:'👋', color:'rgba(26,188,156,.18)', gen:function(lv){
    var qs = [
      {q:'Gặp bạn chào gì?', a:'Hello / Hi', w:['Goodbye','Sorry','Thank you']},
      {q:'Chia tay nói gì?', a:'Goodbye / Bye', w:['Hello','Please','Sorry']},
      {q:'Cảm ơn nói gì?', a:'Thank you', w:['Sorry','Hello','Goodbye']},
      {q:'Xin lỗi nói gì?', a:'Sorry', w:['Thank you','Please','Hello']},
      {q:'"How are you?" trả lời sao?', a:'I\'m fine', w:['I\'m 5','My name is...','Goodbye']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Think about it!')
  }},
  {id:'e1_body', name:'Body Parts', emoji:'🧒', color:'rgba(26,188,156,.18)', gen:function(lv){
    var parts = [
      {en:'Head', vn:'Đầu'}, {en:'Eyes', vn:'Mắt'}, {en:'Nose', vn:'Mũi'},
      {en:'Mouth', vn:'Miệng'}, {en:'Ears', vn:'Tai'}, {en:'Hands', vn:'Tay'},
      {en:'Feet', vn:'Chân'}, {en:'Legs', vn:'Chân (cẳng)'},
    ];
    var p = parts[R(0,parts.length-1)];
    var wrongs = parts.filter(function(x){return x.en!==p.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('"'+p.vn+'" tiếng Anh là gì?', p.en, wrongs, 'Touch your '+p.en.toLowerCase()+'!')
  }},
  {id:'e1_school', name:'School', emoji:'🏫', color:'rgba(26,188,156,.18)', gen:function(lv){
    var items = [
      {en:'Pen', vn:'Bút mực'}, {en:'Pencil', vn:'Bút chì'}, {en:'Book', vn:'Sách'},
      {en:'Bag', vn:'Cặp sách'}, {en:'Ruler', vn:'Thước kẻ'}, {en:'Eraser', vn:'Cục tẩy'},
    ];
    var item = items[R(0,items.length-1)];
    var wrongs = items.filter(function(x){return x.en!==item.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ(item.vn+' = ?', item.en, wrongs, 'What is this?')
  }},
  {id:'e1_actions', name:'Actions', emoji:'🏃', color:'rgba(26,188,156,.18)', gen:function(lv){
    var actions = [
      {en:'Stand up', vn:'Đứng lên'}, {en:'Sit down', vn:'Ngồi xuống'},
      {en:'Walk', vn:'Đi bộ'}, {en:'Run', vn:'Chạy'}, {en:'Jump', vn:'Nhảy'},
      {en:'Eat', vn:'Ăn'}, {en:'Drink', vn:'Uống'}, {en:'Sleep', vn:'Ngủ'},
      {en:'Clap', vn:'Vỗ tay'}, {en:'Open', vn:'Mở'},
    ];
    var a = actions[R(0,actions.length-1)];
    var wrongs = actions.filter(function(x){return x.en!==a.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ('"'+a.vn+'" tiếng Anh là gì?', a.en, wrongs, 'Let\'s move!')
  }},
  {id:'e1_shapes', name:'Shapes & Sizes', emoji:'🔷', color:'rgba(26,188,156,.18)', gen:function(lv){
    var shapes = [
      {en:'Circle', vn:'Hình tròn'}, {en:'Square', vn:'Hình vuông'},
      {en:'Triangle', vn:'Hình tam giác'}, {en:'Star', vn:'Ngôi sao'},
      {en:'Heart', vn:'Hình trái tim'}, {en:'Diamond', vn:'Hình thoi'},
    ];
    var s = shapes[R(0,shapes.length-1)];
    var wrongs = shapes.filter(function(x){return x.en!==s.en}).map(function(x){return x.en}).sort(function(){return Math.random()-0.5}).slice(0,3);
    return TQ(s.vn+' = ?', s.en, wrongs, 'What shape is it?')
  }},
  {id:'e1_phonics', name:'Phonics A-Z', emoji:'🔊', color:'rgba(26,188,156,.18)', gen:function(lv){
    var abc = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var words = ['Apple','Ball','Cat','Dog','Egg','Fish','Girl','Hat','Ice','Jam','Kite','Lion','Moon','Nest','Orange','Pen','Queen','Rain','Sun','Tree','Umbrella','Van','Water','X-ray','Yo-yo','Zebra'];
    var i = R(0,25);
    var wrongs = [];
    while(wrongs.length<3){var w=abc[R(0,25)]; if(w!==abc[i]&&wrongs.indexOf(w)<0)wrongs.push(w)}
    return TQ('"'+words[i]+'" starts with?', abc[i], wrongs, 'Listen: /'+words[i][0].toLowerCase()+'/')
  }},
  {id:'e1_cvc', name:'CVC Words', emoji:'📖', color:'rgba(26,188,156,.18)', gen:function(lv){
    var cvcs = [
      {word:'CAT', sounds:'C-A-T'}, {word:'DOG', sounds:'D-O-G'},
      {word:'PEN', sounds:'P-E-N'}, {word:'BUS', sounds:'B-U-S'},
      {word:'HAT', sounds:'H-A-T'}, {word:'MAP', sounds:'M-A-P'},
    ];
    var c = cvcs[R(0,cvcs.length-1)];
    var wrongs = cvcs.filter(function(x){return x.word!==c.word}).map(function(x){return x.word}).slice(0,3);
    return TQ('Blend: '+c.sounds+' = ?', c.word, wrongs, 'Put the sounds together!')
  }},
  {id:'e1_rhyme', name:'Rhyming', emoji:'🎵', color:'rgba(26,188,156,.18)', gen:function(lv){
    var rhymes = [
      {word:'Cat', match:'Hat', wrong:['Dog','Pen','Sun']},
      {word:'Dog', match:'Log', wrong:['Cat','Sun','Map']},
      {word:'Man', match:'Van', wrong:['Dog','Pen','Bus']},
      {word:'Sun', match:'Fun', wrong:['Cat','Map','Log']},
    ];
    var r = rhymes[R(0,rhymes.length-1)];
    return TQ('What rhymes with "'+r.word+'"?', r.match, r.wrong, 'Same ending sound!')
  }},
];

// === MÔN 4: KHÁM PHÁ THẾ GIỚI NÂNG CAO ===
var TNXH_SKILLS = [
  {id:'t1_traffic', name:'Giao thông', emoji:'🚦', color:'rgba(39,174,96,.18)', gen:function(lv){
    var qs = [
      {q:'Đèn đỏ nghĩa là gì?', a:'Dừng lại', w:['Đi tiếp','Đi nhanh','Quay lại']},
      {q:'Đèn xanh nghĩa là gì?', a:'Được đi', w:['Dừng lại','Đi chậm','Quay lại']},
      {q:'Sang đường phải đi ở đâu?', a:'Vạch kẻ đường', w:['Giữa đường','Bất kỳ đâu','Đường ray']},
      {q:'Ngồi xe máy phải đội gì?', a:'Mũ bảo hiểm', w:['Mũ rơm','Nón lá','Không cần']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'An toàn giao thông nhé!')
  }},
  {id:'t1_environment', name:'Môi trường', emoji:'🌍', color:'rgba(39,174,96,.18)', gen:function(lv){
    var qs = [
      {q:'Vỏ hộp sữa bỏ vào thùng rác nào?', a:'Tái chế', w:['Hữu cơ','Thông thường','Không bỏ']},
      {q:'Khi đánh răng nên?', a:'Tắt vòi nước', w:['Mở to nước','Không cần nước','Dùng nước nóng']},
      {q:'Cây xanh giúp gì?', a:'Cho không khí sạch', w:['Làm nóng','Tạo rác','Gây bẩn']},
      {q:'Thấy chim bị thương thì sao?', a:'Gọi người lớn', w:['Bắt về','Bỏ đi','Đá nó']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Bảo vệ môi trường nhé!')
  }},
  {id:'t1_health', name:'Sức khỏe', emoji:'💪', color:'rgba(39,174,96,.18)', gen:function(lv){
    var qs = [
      {q:'Thực phẩm nào tốt cho sức khỏe?', a:'Rau xanh & trái cây', w:['Kẹo & nước ngọt','Bim bim','Bánh kem']},
      {q:'Trước khi ngủ nên?', a:'Đánh răng', w:['Ăn kẹo','Xem điện thoại','Chạy nhảy']},
      {q:'Rửa tay đúng cách cần bao lâu?', a:'20 giây', w:['2 giây','1 phút','Không cần']},
      {q:'Khi bé ốm nên làm gì?', a:'Nghỉ ngơi & uống thuốc', w:['Đi chơi','Ăn kem','Chạy nhảy']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Khỏe mạnh là số 1!')
  }},
  {id:'t1_transport', name:'Phương tiện', emoji:'🚗', color:'rgba(39,174,96,.18)', gen:function(lv){
    var qs = [
      {q:'Máy bay đi trên?', a:'Đường hàng không (trời)', w:['Đường bộ','Đường thủy','Đường ray']},
      {q:'Tàu thuyền đi trên?', a:'Đường thủy (nước)', w:['Đường bộ','Đường hàng không','Đường ray']},
      {q:'Ô tô đi trên?', a:'Đường bộ', w:['Đường thủy','Đường hàng không','Đường ray']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Phương tiện nào đi ở đâu?')
  }},
];

// === MÔN 5: TƯ DUY LOGIC NÂNG CAO ===
var LOGIC_SKILLS = [
  {id:'l1_pattern', name:'Pattern', emoji:'🔄', color:'rgba(142,68,173,.18)', gen:function(lv){
    var patterns = [
      {q:'🔴🔵🔴🔵🔴❓', a:'🔵', w:['🔴','🟢','🟡']},
      {q:'⭐🔺⬜⭐🔺❓', a:'⬜', w:['⭐','🔺','🔵']},
      {q:'🔴🔴🔵🔵🔴🔴❓', a:'🔵', w:['🔴','🟢','🟡']},
      {q:'1, 2, 3, 1, 2, ❓', a:'3', w:['1','4','2']},
    ];
    var p = patterns[R(0,patterns.length-1)];
    return TQ('Tiếp theo: '+p.q, p.a, p.w, 'Tìm quy luật lặp lại!')
  }},
  {id:'l1_fixpattern', name:'Tìm lỗi pattern', emoji:'🔧', color:'rgba(142,68,173,.18)', gen:function(lv){
    var qs = [
      {q:'🔴🔵🔴🔵🔴🔴 — Chỗ nào sai?', a:'Vị trí cuối (phải là 🔵)', w:['Vị trí 1','Vị trí 3','Không sai']},
      {q:'1,2,3,1,2,1 — Chỗ nào sai?', a:'Vị trí cuối (phải là 3)', w:['Vị trí 1','Vị trí 4','Không sai']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Tìm chỗ phá vỡ quy luật!')
  }},
  {id:'l1_sudoku', name:'Sudoku hình', emoji:'🧩', color:'rgba(142,68,173,.18)', gen:function(lv){
    var shapes = ['⭐','🔵','🔺','❤️'];
    var i = R(0,1);
    var row = [shapes[i], '❓'];
    var answer = shapes[1-i];
    var wrongs = shapes.filter(function(x){return x!==answer && x!==shapes[i]}).slice(0,3);
    if(wrongs.length<3) wrongs.push(shapes[R(2,3)]);
    return TQ('Hàng: '+row.join(' ')+' (mỗi hàng không trùng). ❓ = ?', answer, wrongs, 'Không được lặp lại hình!')
  }},
  {id:'l1_coding', name:'Coding tư duy', emoji:'🤖', color:'rgba(142,68,173,.18)', gen:function(lv){
    var qs = [
      {q:'Robot muốn đi thẳng 3 ô. Cần mấy lệnh ⬆️?', a:'3', w:['1','2','4']},
      {q:'Robot: ⬆️⬆️➡️⬆️. Đi mấy bước thẳng?', a:'3', w:['2','4','1']},
      {q:'"Đi thẳng 2 lần" nghĩa là?', a:'⬆️⬆️', w:['⬆️','⬆️⬆️⬆️','➡️➡️']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Suy nghĩ từng bước nhé!')
  }},
  {id:'l1_spot', name:'Tìm điểm khác', emoji:'🔍', color:'rgba(142,68,173,.18)', gen:function(lv){
    var qs = [
      {q:'🐕🐕🐕🐈🐕 — Con nào khác?', a:'Con mèo (vị trí 4)', w:['Con chó đầu','Con chó cuối','Không con nào']},
      {q:'🔴🔴🔵🔴🔴 — Cái nào khác?', a:'🔵 (vị trí 3)', w:['🔴 đầu','🔴 cuối','Không cái nào']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Nhìn thật kỹ!')
  }},
  {id:'l1_mirror', name:'Đối xứng', emoji:'🪞', color:'rgba(142,68,173,.18)', gen:function(lv){
    var qs = [
      {q:'Nửa trái: ⬜🔵 | Nửa phải đối xứng là?', a:'🔵⬜', w:['⬜🔵','🔵🔵','⬜⬜']},
      {q:'Nửa trái: ⭐🌙 | Nửa phải đối xứng là?', a:'🌙⭐', w:['⭐🌙','⭐⭐','🌙🌙']},
    ];
    var q = qs[R(0,qs.length-1)];
    return TQ(q.q, q.a, q.w, 'Như soi gương!')
  }},
];

// === Mascot messages ===
var CORGI_TAP = [
  'Gấu Mật tin bé rất giỏi! 🌟',
  'Cùng khám phá nào! 🚀',
  'Bé làm đúng rồi, xuất sắc! ⭐',
  'Thử cách khác xem! Gấu Mật cổ vũ! 🐻',
  'Bé thông minh quá! 💡',
  'Tuyệt vời, lên lâu đài thôi! 🏰',
];
var C_MSGS = [
  {t:'Giỏi quá!', s:'Đúng rồi! Gấu Mật rất tự hào! 🌟'},
  {t:'Tuyệt vời!', s:'Bé thông minh lắm! ⭐'},
  {t:'Xuất sắc!', s:'Chính xác! Tiếp tục nào! 🚀'},
  {t:'Wow!', s:'Bé giỏi ghê! Pháo hoa nè! 🎆'},
];
var W_MSGS = [
  {t:'Ối!', s:'Chưa đúng rồi. Thử cách khác xem! 💡'},
  {t:'Hmm...', s:'Gần đúng lắm! Gấu Mật gợi ý nhé! 🐻'},
  {t:'Thử nữa!', s:'Không sao! Suy nghĩ thật kỹ nào! 🧠'},
];

// === Grade config ===
window.GRADE_CONFIG = {
  id: 'pre_5',
  gradeName: 'Bé 5 Tuổi',
  saveKey: 'vuongquoc_pre_5',
  xpPerLevel: 80,
  passThreshold: 75,
  maxSkillLevel: 4,
  hasLives: false,
  gatingMode: 'per_subject',
  questionsPerRound: 7,
  timePerQuestion: 0,
  levelRewardRate: 50,
  speeches: [
    ['Gấu Mật chào bé! Toán tiền tiểu học nè! 🔢','Cộng trừ thật giỏi nào! ⭐'],
    ['Bé ơi, tiếng Việt tiền lớp 1! 📖','Đánh vần, ghép vần cùng Gấu Mật! 🐻'],
    ['English time! Let\'s go! 🌍','Phonics, greetings, body parts! 🌟'],
    ['Khám phá thế giới nâng cao! 🌿','An toàn, sức khỏe, môi trường! 🌍'],
    ['Tư duy logic siêu cấp! 🧩','Pattern, Sudoku, Coding tư duy! 🤖'],
  ],
  subjects: [
    {id:'math', name:'Toán tiền tiểu học', emoji:'🔢', skills:MATH_SKILLS, color:'#2980B9'},
    {id:'vietnamese', name:'Tiếng Việt tiền lớp 1', emoji:'📖', skills:VIET_SKILLS, color:'#E74C3C'},
    {id:'english', name:'Tiếng Anh nâng cao', emoji:'🌍', skills:ENG_SKILLS, color:'#1ABC9C'},
    {id:'tnxh', name:'Khám phá nâng cao', emoji:'🌿', skills:TNXH_SKILLS, color:'#27AE60'},
    {id:'logic', name:'Tư duy Logic', emoji:'🧩', skills:LOGIC_SKILLS, color:'#8E44AD'},
  ]
};
