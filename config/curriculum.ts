// ================================================================
// HOC GIOI — FULL CURRICULUM CONFIG
// Chuong trinh GDPT 2018 · Lop 1-5 · Day du mon hoc
// ================================================================

// ============================================================
// 1. TYPES
// ============================================================

export type GradeLevel = 1 | 2 | 3 | 4 | 5

export type SubjectCategory = "core" | "arts" | "development"

export interface SubjectDef {
  id: string
  name: string
  shortName: string
  emoji: string
  color: string
  accent: string
  gradeLevels: GradeLevel[]
  optionalGrades?: GradeLevel[]
  hasExam: boolean
  weeklyPeriods: Partial<Record<GradeLevel, number>>
  category: SubjectCategory
  iconDesc: string
  topics: Partial<Record<GradeLevel, string[]>>
}

export interface CurriculumGrade {
  required: string[]
  optional: string[]
  totalPeriodsPerWeek: number
}

export interface SubjectIconEntry {
  id: string
  name: string
  emoji: string
  color: string
  accent: string
  category: string
  desc: string
}

export interface SubjectCategoryDef {
  label: string
  desc: string
  subjects: string[]
}

export interface IconGenPrompt {
  id: string
  name: string
  prompt: string
}

// ============================================================
// 2. TAT CA MON HOC (SUBJECTS)
// ============================================================

export const SUBJECTS: Record<string, SubjectDef> = {
  // -- MON CHINH (co kiem tra dinh ky) --

  math: {
    id: "math",
    name: "Toán",
    shortName: "Toán",
    emoji: "🔢",
    color: "#4A90D9",
    accent: "#2B6CB0",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: true,
    weeklyPeriods: { 1: 5, 2: 5, 3: 5, 4: 5, 5: 5 },
    category: "core",
    iconDesc: "Sách toán 3D mở, các con số 1+2=3 bay ra nổi lên, ánh sáng xanh dương, bọc hào quang toán học, thước kẻ + compa nhỏ bên cạnh",
    topics: {
      1: ["Số đến 100", "Phép cộng trừ đến 20", "Hình học cơ bản", "Đo lường đơn giản"],
      2: ["Số đến 1000", "Phép cộng trừ có nhớ", "Bảng nhân 2,3,4,5", "Hình học phẳng"],
      3: ["Số đến 100.000", "Nhân chia trong bảng", "Chu vi hình chữ nhật", "Bài toán có lời văn"],
      4: ["Số đến hàng triệu", "Phân số", "Tỉ số", "Diện tích hình", "Biểu đồ"],
      5: ["Số thập phân", "Tỉ lệ phần trăm", "Hình học không gian", "Thể tích", "Thống kê"],
    },
  },

  vietnamese: {
    id: "vietnamese",
    name: "Tiếng Việt",
    shortName: "T.Việt",
    emoji: "📖",
    color: "#E8734A",
    accent: "#C24D2C",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: true,
    weeklyPeriods: { 1: 10, 2: 9, 3: 7, 4: 7, 5: 7 },
    category: "core",
    iconDesc: "Cuốn sách mở 3D, chữ cái A Ă Â bay ra đầy màu sắc, bút mực ngòi cổ điển bên cạnh, ánh sáng cam ấm, trang sách lật nhẹ",
    topics: {
      1: ["Học chữ cái", "Đánh vần", "Tập đọc", "Tập viết", "Kể chuyện"],
      2: ["Tập đọc", "Chính tả", "Luyện từ và câu", "Tập viết", "Kể chuyện"],
      3: ["Đọc hiểu", "Chính tả (tr/ch, s/x, d/gi)", "Luyện từ và câu", "Tập làm văn", "Từ đồng nghĩa/trái nghĩa"],
      4: ["Đọc hiểu văn bản", "Luyện từ và câu nâng cao", "Tập làm văn", "Chính tả nâng cao", "Ngữ pháp"],
      5: ["Đọc hiểu nâng cao", "Tập làm văn nghị luận", "Ôn tập ngữ pháp", "Từ Hán Việt", "Viết sáng tạo"],
    },
  },

  english: {
    id: "english",
    name: "Tiếng Anh",
    shortName: "T.Anh",
    emoji: "🌍",
    color: "#48BB78",
    accent: "#2F855A",
    gradeLevels: [3, 4, 5],
    optionalGrades: [1, 2],
    hasExam: true,
    weeklyPeriods: { 1: 4, 2: 4, 3: 4, 4: 4, 5: 4 },
    category: "core",
    iconDesc: "Quả địa cầu 3D xoay nhẹ, chữ ABC bay quanh, cờ Anh + Mỹ nhỏ trang trí, ánh xanh lá tươi mát, speech bubble Hello!",
    topics: {
      3: ["Greetings", "Numbers", "Colors", "Family", "Animals", "School things", "Daily activities"],
      4: ["Time", "Weather", "Food & Drinks", "Hobbies", "Places", "Directions", "Jobs"],
      5: ["Past tense", "Comparisons", "Countries", "Environment", "Technology", "Reading comprehension"],
    },
  },

  nature_society: {
    id: "nature_society",
    name: "Tự nhiên & Xã hội",
    shortName: "TN&XH",
    emoji: "🌿",
    color: "#66BB6A",
    accent: "#43A047",
    gradeLevels: [1, 2, 3],
    hasExam: false,
    weeklyPeriods: { 1: 2, 2: 2, 3: 2 },
    category: "core",
    iconDesc: "Cây xanh 3D nhỏ mọc trên quả đất mini, bướm bay quanh, mặt trời cười phía trên, ánh xanh lá tự nhiên, hoa nhỏ nở",
    topics: {
      1: ["Gia đình", "Trường học", "Cộng đồng", "Cây cối & động vật", "Thời tiết"],
      2: ["Cơ thể người", "Thực vật & động vật", "Trái Đất & bầu trời", "Con người & sức khỏe"],
      3: ["Chất & năng lượng", "Thực vật & động vật", "Nấm & vi khuẩn", "Con người & sức khỏe", "Trái Đất"],
    },
  },

  history_geography: {
    id: "history_geography",
    name: "Lịch sử & Địa lí",
    shortName: "Sử&Địa",
    emoji: "🗺️",
    color: "#8D6E63",
    accent: "#6D4C41",
    gradeLevels: [4, 5],
    hasExam: true,
    weeklyPeriods: { 4: 2, 5: 2 },
    category: "core",
    iconDesc: "Bản đồ Việt Nam 3D cuộn giấy cổ, la bàn vàng bên cạnh, thanh kiếm lịch sử nhỏ, ánh nâu ấm, ngôi sao đánh dấu địa danh",
    topics: {
      4: ["Lịch sử địa phương", "Thiên nhiên & con người VN", "Vùng miền VN", "Các triều đại lịch sử"],
      5: ["Lịch sử VN cận đại", "Địa lí VN", "Châu Á", "Thế giới đại cương", "Bảo vệ di sản"],
    },
  },

  science: {
    id: "science",
    name: "Khoa học",
    shortName: "K.Học",
    emoji: "🔬",
    color: "#26C6DA",
    accent: "#0097A7",
    gradeLevels: [4, 5],
    hasExam: true,
    weeklyPeriods: { 4: 2, 5: 2 },
    category: "core",
    iconDesc: "Kính hiển vi 3D sáng bóng, ống nghiệm bọt xanh bên cạnh, nguyên tử mini bay quanh, ánh xanh cyan khoa học, tia sáng phát hiện",
    topics: {
      4: ["Chất", "Năng lượng", "Thực vật & động vật", "Nấm, vi khuẩn, virus", "Con người & sức khỏe"],
      5: ["Chất và sự biến đổi", "Năng lượng", "Sinh vật & môi trường", "Con người & sức khỏe", "Trái Đất & bầu trời"],
    },
  },

  informatics: {
    id: "informatics",
    name: "Tin học & Công nghệ",
    shortName: "Tin&CN",
    emoji: "💻",
    color: "#5C6BC0",
    accent: "#3949AB",
    gradeLevels: [3, 4, 5],
    hasExam: true,
    weeklyPeriods: { 3: 2, 4: 2, 5: 2 },
    category: "core",
    iconDesc: "Laptop 3D dễ thương mở, màn hình hiện code đơn giản, robot nhỏ đứng bên cạnh vẫy tay, bánh răng + mạch điện mini, ánh tím xanh",
    topics: {
      3: ["Máy tính là bạn", "Thông tin & dữ liệu", "Đạo đức & văn hóa số", "Ứng dụng tin học", "Thủ công kỹ thuật"],
      4: ["Mạng máy tính & Internet", "Xử lí văn bản", "Lập trình đơn giản (Scratch)", "An toàn thông tin", "Kỹ thuật"],
      5: ["Multimedia", "Lập trình nâng cao (Scratch)", "Trình bày slide", "Dự án tin học", "Thiết kế kỹ thuật"],
    },
  },

  // -- MON DANH GIA NHAN XET (khong kiem tra viet) --

  ethics: {
    id: "ethics",
    name: "Đạo đức",
    shortName: "Đ.Đức",
    emoji: "💝",
    color: "#EC407A",
    accent: "#C2185B",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: false,
    weeklyPeriods: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    category: "development",
    iconDesc: "Trái tim 3D hồng phát sáng, đôi bàn tay nhỏ nâng niu, ngôi sao nhân ái bay quanh, ánh hồng ấm áp, cầu vồng mini phía sau",
    topics: {
      1: ["Yêu thương gia đình", "Lễ phép", "Trung thực", "Giữ gìn vệ sinh"],
      2: ["Biết ơn", "Chia sẻ", "Bảo vệ môi trường", "An toàn giao thông"],
      3: ["Tự chủ", "Trách nhiệm", "Yêu quê hương", "Hợp tác", "Tiết kiệm"],
      4: ["Trung thực & dũng cảm", "Tôn trọng sự khác biệt", "Bảo vệ thiên nhiên", "Quyền trẻ em"],
      5: ["Công dân toàn cầu", "Đoàn kết", "Bảo vệ hòa bình", "Trách nhiệm xã hội"],
    },
  },

  physical_education: {
    id: "physical_education",
    name: "Giáo dục thể chất",
    shortName: "GDTC",
    emoji: "🏃",
    color: "#FF7043",
    accent: "#E64A19",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: false,
    weeklyPeriods: { 1: 2, 2: 2, 3: 2, 4: 2, 5: 2 },
    category: "development",
    iconDesc: "Giày thể thao 3D đang chạy, vạch tốc độ phía sau, quả bóng đá + nhảy dây nhỏ, ánh cam năng động, huy chương thể thao",
    topics: {
      1: ["Đội hình đội ngũ", "Bài thể dục phát triển chung", "Trò chơi vận động"],
      2: ["Bài thể dục phát triển chung", "Đi, chạy, nhảy", "Trò chơi vận động"],
      3: ["Chạy cự li ngắn", "Nhảy xa", "Ném bóng", "Bơi (nếu có)", "Trò chơi vận động"],
      4: ["Chạy ngắn & bền", "Nhảy cao", "Ném bóng", "Đá cầu", "Thể dục nhịp điệu"],
      5: ["Điền kinh cơ bản", "Thể dục nhịp điệu", "Bơi lội", "Đá cầu", "Cầu lông"],
    },
  },

  music: {
    id: "music",
    name: "Âm nhạc",
    shortName: "Nhạc",
    emoji: "🎵",
    color: "#F39C12",
    accent: "#D68910",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: false,
    weeklyPeriods: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    category: "arts",
    iconDesc: "Nốt nhạc 3D đôi nốt bay lên, đàn piano mini bên dưới, sóng âm thanh cầu vồng, ánh vàng cam ấm áp, micro nhỏ lấp lánh",
    topics: {
      1: ["Hát theo chủ đề", "Nghe nhạc", "Vận động theo nhạc", "Nhạc cụ gõ đơn giản"],
      2: ["Hát", "Nghe nhạc", "Đọc nhạc cơ bản", "Nhạc cụ gõ"],
      3: ["Hát", "Đọc nhạc (nốt nhạc)", "Nhạc cụ", "Thường thức âm nhạc"],
      4: ["Hát đa giọng", "Đọc nhạc", "Sáng tạo âm nhạc", "Nhạc cụ", "Lý thuyết âm nhạc cơ bản"],
      5: ["Hát hợp xướng", "Nhạc lí nâng cao", "Sáng tạo âm nhạc", "Thưởng thức âm nhạc VN & quốc tế"],
    },
  },

  fine_art: {
    id: "fine_art",
    name: "Mĩ thuật",
    shortName: "M.Thuật",
    emoji: "🎨",
    color: "#E056A0",
    accent: "#B83D7E",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: false,
    weeklyPeriods: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    category: "arts",
    iconDesc: "Palette vẽ 3D tròn đầy màu sắc, cọ vẽ dính sơn cầu vồng, giọt sơn bay ra, ánh hồng sáng tạo, khung tranh nhỏ phía sau",
    topics: {
      1: ["Vẽ theo mẫu", "Vẽ tự do", "Nặn, xé dán", "Trang trí đơn giản"],
      2: ["Vẽ tranh đề tài", "Vẽ trang trí", "Nặn tạo hình", "Cắt dán"],
      3: ["Vẽ tranh", "Trang trí", "Thủ công mĩ thuật", "Thường thức mĩ thuật"],
      4: ["Hội họa", "Điêu khắc", "Thiết kế", "Mĩ thuật ứng dụng", "Thưởng thức mĩ thuật"],
      5: ["Hội họa nâng cao", "Thiết kế đồ họa cơ bản", "Nghệ thuật tạo hình", "Lịch sử mĩ thuật VN"],
    },
  },

  experience_activity: {
    id: "experience_activity",
    name: "Hoạt động trải nghiệm",
    shortName: "HĐTN",
    emoji: "🏕️",
    color: "#26A69A",
    accent: "#00897B",
    gradeLevels: [1, 2, 3, 4, 5],
    hasExam: false,
    weeklyPeriods: { 1: 1, 2: 1, 3: 1, 4: 1, 5: 1 },
    category: "development",
    iconDesc: "Lều trại 3D nhỏ dễ thương, cờ đuôi nheo trên đỉnh, cây xanh + lửa trại mini bên cạnh, ánh xanh ngọc phiêu lưu, ba lô nhỏ",
    topics: {
      1: ["Tự phục vụ bản thân", "Sinh hoạt tập thể", "Hoạt động xã hội cộng đồng"],
      2: ["Kĩ năng giao tiếp", "Hợp tác nhóm", "Khám phá bản thân", "Hoạt động cộng đồng"],
      3: ["Hoạt động hướng nội", "Hoạt động hướng ngoại", "Hoạt động xã hội & phục vụ cộng đồng", "Kĩ năng sống"],
      4: ["Phát triển cá nhân", "Hoạt động lao động", "Hoạt động xã hội", "Hướng nghiệp sơ khởi"],
      5: ["Phát triển bản thân", "Hoạt động cộng đồng", "Lao động công ích", "Định hướng nghề nghiệp"],
    },
  },
}

// ============================================================
// 3. CURRICULUM MAP (mon nao day o lop nao)
// ============================================================

export const CURRICULUM_MAP: Record<GradeLevel, CurriculumGrade> = {
  1: {
    required: ["math", "vietnamese", "ethics", "nature_society", "physical_education", "music", "fine_art", "experience_activity"],
    optional: ["english"],
    totalPeriodsPerWeek: 25,
  },
  2: {
    required: ["math", "vietnamese", "ethics", "nature_society", "physical_education", "music", "fine_art", "experience_activity"],
    optional: ["english"],
    totalPeriodsPerWeek: 25,
  },
  3: {
    required: ["math", "vietnamese", "ethics", "english", "nature_society", "informatics", "physical_education", "music", "fine_art", "experience_activity"],
    optional: [],
    totalPeriodsPerWeek: 28,
  },
  4: {
    required: ["math", "vietnamese", "ethics", "english", "history_geography", "science", "informatics", "physical_education", "music", "fine_art", "experience_activity"],
    optional: [],
    totalPeriodsPerWeek: 30,
  },
  5: {
    required: ["math", "vietnamese", "ethics", "english", "history_geography", "science", "informatics", "physical_education", "music", "fine_art", "experience_activity"],
    optional: [],
    totalPeriodsPerWeek: 30,
  },
}

// ============================================================
// 4. EXAM CONFIG (mon nao kiem tra dinh ky)
// ============================================================

export const EXAM_SUBJECTS: Record<GradeLevel, string[]> = {
  1: ["math", "vietnamese"],
  2: ["math", "vietnamese"],
  3: ["math", "vietnamese", "english", "informatics"],
  4: ["math", "vietnamese", "english", "history_geography", "science", "informatics"],
  5: ["math", "vietnamese", "english", "history_geography", "science", "informatics"],
}

// ============================================================
// 5. ICON REGISTRY (cho icon system + asset pipeline)
// ============================================================

export const SUBJECT_ICONS: Record<string, SubjectIconEntry> = Object.fromEntries(
  Object.values(SUBJECTS).map((s) => [
    s.id,
    {
      id: s.id,
      name: s.name,
      emoji: s.emoji,
      color: s.color,
      accent: s.accent,
      category: "subjects",
      desc: s.iconDesc,
    },
  ])
)

// ============================================================
// 6. CATEGORY GROUPING (cho UI menu)
// ============================================================

export const SUBJECT_CATEGORIES: Record<string, SubjectCategoryDef> = {
  core: {
    label: "Môn Chính",
    desc: "Có kiểm tra định kỳ",
    subjects: ["math", "vietnamese", "english", "nature_society", "history_geography", "science", "informatics"],
  },
  arts: {
    label: "Nghệ Thuật",
    desc: "Âm nhạc & Mĩ thuật",
    subjects: ["music", "fine_art"],
  },
  development: {
    label: "Phát Triển",
    desc: "Rèn luyện phẩm chất & thể chất",
    subjects: ["ethics", "physical_education", "experience_activity"],
  },
}

// ============================================================
// 7. GEMINI IMAGEN PROMPTS (cho asset pipeline)
// ============================================================

export const ICON_GEN_PROMPTS: IconGenPrompt[] = Object.values(SUBJECTS).map((s) => ({
  id: s.id,
  name: s.name,
  prompt: `3D Pixar Art style game icon for children's educational app.
Subject: "${s.name}" (${s.shortName}).
Visual: ${s.iconDesc}.
Style: Glossy rounded 3D, soft specular highlights, top-left key light, contact shadow underneath.
Background: Pure white / transparent.
Canvas: 512x512 PNG, icon fills 80% of frame.
Target audience: Vietnamese children age 6-11.
Color palette: Primary ${s.color}, Accent ${s.accent}.
Must feel: Cute, inviting, fun, safe for kids.`,
}))

// ============================================================
// 8. HELPER FUNCTIONS
// ============================================================

/** Lay danh sach mon theo lop */
export function getSubjectsForGrade(grade: GradeLevel): SubjectDef[] {
  const map = CURRICULUM_MAP[grade]
  if (!map) return []
  return [...map.required, ...map.optional].map((id) => SUBJECTS[id]).filter(Boolean)
}

/** Lay danh sach mon co thi theo lop */
export function getExamSubjectsForGrade(grade: GradeLevel): SubjectDef[] {
  const ids = EXAM_SUBJECTS[grade] || []
  return ids.map((id) => SUBJECTS[id]).filter(Boolean)
}

/** Lay topics cua 1 mon theo lop */
export function getTopics(subjectId: string, grade: GradeLevel): string[] {
  return SUBJECTS[subjectId]?.topics?.[grade] || []
}

/** Kiem tra mon co day o lop X khong */
export function isSubjectInGrade(subjectId: string, grade: GradeLevel): boolean {
  const map = CURRICULUM_MAP[grade]
  if (!map) return false
  return map.required.includes(subjectId) || map.optional.includes(subjectId)
}

/** Lay so tiet/tuan cua 1 mon theo lop */
export function getWeeklyPeriods(subjectId: string, grade: GradeLevel): number {
  return SUBJECTS[subjectId]?.weeklyPeriods?.[grade] || 0
}
