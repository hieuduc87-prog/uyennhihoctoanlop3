#!/usr/bin/env python3
"""
Voice Generator for Vương Quốc Học Giỏi
Generates all voice lines using edge-tts (Vietnamese TTS)
Characters: boy (NamMinh), girl (HoaiMy)
"""
import asyncio
import json
import os
import time
import edge_tts

BASE_DIR = os.path.join(os.path.dirname(__file__), "public", "voice")

# ═══════════════════════════════════════════════════
# TTS VOICES
# ═══════════════════════════════════════════════════
VOICES = {
    "boy": "vi-VN-NamMinhNeural",
    "girl": "vi-VN-HoaiMyNeural",
}

# ═══════════════════════════════════════════════════
# ALL SKILLS (id → Vietnamese name) across grades 1-5
# ═══════════════════════════════════════════════════
SKILLS = {
    # Lớp 1
    "m1_add": "Phép cộng", "m1_sub": "Phép trừ", "m1_mix": "Cộng trừ hỗn hợp",
    "m1_cmp": "So sánh số", "m1_miss": "Tìm số thiếu", "m1_word": "Toán có lời văn",
    "m1_seq": "Dãy số", "m1_shp": "Hình học", "m1_time": "Giờ và đo lường",
    "v1_am": "Âm và vần", "v1_doc": "Ghép từ", "v1_ct": "Chính tả",
    "v1_tv": "Từ vựng", "v1_dien": "Điền từ", "v1_cau": "Câu đơn giản",
    "e1_abc": "Bảng chữ cái tiếng Anh", "e1_num": "Số đếm tiếng Anh",
    "e1_color": "Màu sắc tiếng Anh", "e1_animal": "Động vật tiếng Anh",
    "e1_greet": "Chào hỏi tiếng Anh", "e1_family": "Gia đình tiếng Anh",
    "tn1_gd": "Gia đình", "tn1_truong": "Trường học",
    "tn1_caycon": "Cây cối và động vật", "tn1_thoitiet": "Thời tiết",
    "tn1_cothe": "Cơ thể em",
    "dd1_yeu": "Yêu thương", "dd1_lephep": "Lễ phép",
    "dd1_trungthuc": "Trung thực", "dd1_vesinh": "Giữ vệ sinh",
    # Lớp 2
    "m2_add": "Cộng có nhớ", "m2_sub": "Trừ có nhớ",
    "m2_mul": "Phép nhân", "m2_div": "Phép chia",
    "m2_cmp": "So sánh số lớn", "m2_miss": "Tìm số thiếu",
    "m2_word": "Toán đố", "m2_geo": "Hình học", "m2_meas": "Đo lường và tiền",
    "v2_ct": "Chính tả lớp 2", "v2_tuloai": "Từ loại",
    "v2_cau": "Kiểu câu", "v2_tv": "Từ vựng mở rộng",
    "v2_dien": "Điền từ", "v2_dauca": "Dấu câu", "v2_sapxep": "Sắp xếp câu",
    "e2_family": "Gia đình tiếng Anh", "e2_feel": "Cảm xúc tiếng Anh",
    "e2_clothes": "Quần áo tiếng Anh", "e2_prepos": "Giới từ tiếng Anh",
    "e2_rooms": "Phòng trong nhà", "e2_transport": "Phương tiện giao thông",
    "tn2_cothe": "Cơ thể người", "tn2_thucvat": "Thực vật và động vật",
    "tn2_traidat": "Trái Đất", "tn2_suckhoe": "Sức khỏe",
    "dd2_bieton": "Biết ơn", "dd2_chiase": "Chia sẻ",
    "dd2_moitruong": "Bảo vệ môi trường", "dd2_giaothong": "An toàn giao thông",
    # Lớp 3
    "m_add": "Phép cộng", "m_sub": "Phép trừ",
    "m_mul": "Phép nhân", "m_div": "Phép chia",
    "m_tbl": "Bảng cửu chương", "m_expr": "Biểu thức",
    "m_word": "Toán đố", "m_geo": "Hình học",
    "m_meas": "Đo lường", "m_frac": "Phân số",
    "v_chinh": "Chính tả", "v_tuloai": "Từ loại",
    "v_cautruc": "Câu và dấu câu", "v_tuvung": "Từ vựng",
    "v_bienphat": "Biện pháp tu từ", "v_dien": "Điền từ",
    "v_thanhphan": "Thành phần câu", "v_sapxep": "Sắp xếp câu",
    "e_vocab": "Từ vựng tiếng Anh", "e_colors": "Màu sắc và số đếm",
    "e_greet": "Chào hỏi tiếng Anh", "e_animals": "Động vật tiếng Anh",
    "e_family": "Gia đình tiếng Anh", "e_grammar": "Ngữ pháp tiếng Anh",
    "e_prepos": "Giới từ tiếng Anh", "e_translate": "Dịch câu",
    "tn3_chat": "Chất và năng lượng", "tn3_thucvat": "Thực vật và động vật",
    "tn3_nam": "Nấm và vi khuẩn", "tn3_suckhoe": "Sức khỏe",
    "tn3_traidat": "Trái Đất",
    "dd3_tuchu": "Tự chủ", "dd3_trachnhiem": "Trách nhiệm",
    "dd3_quehuong": "Yêu quê hương", "dd3_hoptac": "Hợp tác",
    "th3_maytinh": "Máy tính", "th3_thongtin": "Thông tin",
    "th3_daoduc": "Văn hóa số", "th3_ungdung": "Ứng dụng",
    # Lớp 4
    "m4_calc": "Cộng trừ số lớn", "m4_mul": "Nhân nhiều chữ số",
    "m4_div": "Chia nhiều chữ số", "m4_frac": "Phân số",
    "m4_divis": "Chia hết", "m4_avg": "Trung bình cộng",
    "m4_sumdf": "Tổng hiệu", "m4_geo": "Hình học",
    "m4_meas": "Đo lường", "m4_expr": "Biểu thức",
    "v4_ct": "Chính tả nâng cao", "v4_tuloai": "Từ ghép và từ láy",
    "v4_cau": "Kiểu câu nâng cao", "v4_tp": "Thành phần câu",
    "v4_tv": "Thành ngữ", "v4_bptt": "Biện pháp tu từ",
    "v4_dien": "Điền từ", "v4_sapxep": "Sắp xếp câu",
    "e4_vocab": "Từ vựng tiếng Anh", "e4_present": "Thì hiện tại đơn",
    "e4_contin": "Thì hiện tại tiếp diễn", "e4_there": "There is và are",
    "e4_can": "Can và can't", "e4_time": "Thời gian và ngày",
    "e4_prepos": "Giới từ nâng cao", "e4_translate": "Dịch câu",
    "kh4_chat": "Chất", "kh4_nangl": "Năng lượng",
    "kh4_sinhhoc": "Sinh học", "kh4_namvi": "Nấm và vi khuẩn",
    "kh4_suckhoe": "Sức khỏe",
    "sd4_diaphuong": "Lịch sử địa phương", "sd4_vungmien": "Vùng miền Việt Nam",
    "sd4_trieudai": "Triều đại", "sd4_thiennhien": "Thiên nhiên Việt Nam",
    "dd4_trungthuc": "Trung thực và dũng cảm", "dd4_tontrong": "Tôn trọng",
    "dd4_thiennhien": "Bảo vệ thiên nhiên", "dd4_quyentrem": "Quyền trẻ em",
    "th4_mang": "Mạng và Internet", "th4_vanban": "Soạn văn bản",
    "th4_laptrinh": "Scratch", "th4_antoan": "An toàn thông tin",
    # Lớp 5
    "m5_dec": "Số thập phân", "m5_pct": "Phần trăm",
    "m5_frac": "Phân số nâng cao", "m5_vol": "Thể tích",
    "m5_speed": "Vận tốc", "m5_circle": "Hình tròn",
    "m5_area": "Diện tích", "m5_conv": "Đổi đơn vị",
    "m5_expr": "Biểu thức nâng cao", "m5_word": "Toán đố nâng cao",
    "v5_ct": "Chính tả nâng cao", "v5_caugh": "Câu ghép",
    "v5_qht": "Quan hệ từ", "v5_dongam": "Từ đồng âm",
    "v5_bptt": "Biện pháp tu từ", "v5_lk": "Liên kết câu",
    "v5_tv": "Từ vựng nâng cao", "v5_sapxep": "Sắp xếp câu",
    "e5_vocab": "Từ vựng tiếng Anh", "e5_past": "Thì quá khứ đơn",
    "e5_future": "Thì tương lai", "e5_modal": "Should và Must",
    "e5_compare": "So sánh tiếng Anh", "e5_tenses": "Chia thì",
    "e5_reading": "Đọc hiểu tiếng Anh", "e5_translate": "Dịch câu nâng cao",
    "kh5_biendoi": "Sự biến đổi", "kh5_nangl": "Năng lượng",
    "kh5_sinhhoc": "Sinh vật và môi trường", "kh5_suckhoe": "Sức khỏe",
    "kh5_traidat": "Trái Đất và vũ trụ",
    "sd5_lichsu": "Lịch sử Việt Nam cận đại", "sd5_dialy": "Địa lí Việt Nam",
    "sd5_chaua": "Châu Á", "sd5_thegioi": "Thế giới",
    "dd5_congdan": "Công dân toàn cầu", "dd5_doankiet": "Đoàn kết",
    "dd5_hoabinh": "Hòa bình", "dd5_trachnhiem": "Trách nhiệm xã hội",
    "th5_media": "Đa phương tiện", "th5_laptrinh": "Scratch nâng cao",
    "th5_slide": "Trình bày slide", "th5_duan": "Dự án tin học",
}

# ═══════════════════════════════════════════════════
# VOICE LINES
# ═══════════════════════════════════════════════════

PRAISE = [
    "Giỏi lắm!", "Tuyệt vời!", "Xuất sắc!", "Đúng rồi!", "Hay quá!",
    "Siêu giỏi!", "Chính xác!", "Thông minh quá!", "Cừ lắm!", "Đỉnh của chóp!",
]

ENCOURAGE = [
    "Cố lên nào!", "Gần đúng rồi!", "Thử lại nhé!",
    "Không sao đâu!", "Suy nghĩ thêm nha!", "Bạn làm được mà!",
    "Đừng vội nha!", "Từ từ suy nghĩ!",
]

STREAK = [
    ("streak_3", "Wow! Ba câu đúng liên tiếp! Giỏi quá!"),
    ("streak_5", "Tuyệt vời! Năm câu đúng liên tiếp! Siêu ghê!"),
    ("streak_10", "Không thể tin được! Mười câu đúng liên tiếp! Bạn là thiên tài!"),
]

LEVEL_UP = [
    ("level_1", "Chúc mừng! Bạn đã lên cấp!"),
    ("level_2", "Tuyệt vời! Bạn tiến bộ rất nhanh!"),
    ("level_3", "Siêu đỉnh! Bạn ngày càng giỏi hơn!"),
    ("level_4", "Wow! Bạn đã lên cấp mới! Tiếp tục phát huy nhé!"),
    ("level_5", "Xuất sắc! Bạn đạt đến đỉnh cao rồi! Tự hào lắm!"),
]

IDLE = [
    ("idle_1", "Bạn ơi! Mình đang chờ bạn nè!"),
    ("idle_2", "Hế lô! Bạn còn ở đây không?"),
    ("idle_3", "Bạn ơi, chơi tiếp đi nào!"),
]

GOODBYE = [("goodbye", "Hẹn gặp lại nhé! Hôm nay bạn đã làm rất tốt!")]

PET_EVOLVE = [
    ("pet_corgi", "Nhìn kìa! Cún Corgi đã tiến hóa! Dễ thương quá!"),
    ("pet_cat", "Wow! Mèo Ragdoll đã tiến hóa! Xinh đẹp quá!"),
    ("pet_trex", "Tuyệt! Ti-Rex đã tiến hóa! Mạnh mẽ quá!"),
    ("pet_dragon", "Siêu! Rồng đã tiến hóa! Oai phong quá!"),
]

REWARD = [
    ("reward_1", "Chúc mừng! Bạn nhận được phần thưởng!"),
    ("reward_2", "Yay! Bạn có quà rồi nè!"),
    ("reward_3", "Tuyệt vời! Phần thưởng dành cho bạn!"),
]

ROUND_END = [
    ("round_3star", "Tuyệt vời! Ba sao! Bạn là siêu sao!"),
    ("round_2star", "Giỏi lắm! Hai sao! Lần sau ba sao nhé!"),
    ("round_1star", "Tốt lắm! Cố gắng thêm nhé!"),
    ("round_0star", "Không sao đâu! Lần sau sẽ giỏi hơn!"),
]


def build_voice_lines():
    """Build the complete list of voice lines to generate."""
    lines = []

    for char in ["boy", "girl"]:
        # Praise lines
        for i, text in enumerate(PRAISE):
            lines.append({
                "id": f"{char}_praise_{i+1:02d}",
                "file": f"{char}/global/praise_{i+1:02d}.mp3",
                "event": "correct",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Encourage lines
        for i, text in enumerate(ENCOURAGE):
            lines.append({
                "id": f"{char}_encourage_{i+1:02d}",
                "file": f"{char}/global/encourage_{i+1:02d}.mp3",
                "event": "wrong",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Streak lines
        for fid, text in STREAK:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "streak",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Level up lines
        for fid, text in LEVEL_UP:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "level_up",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Idle reminders
        for fid, text in IDLE:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "idle",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Goodbye
        for fid, text in GOODBYE:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "goodbye",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Pet evolve
        for fid, text in PET_EVOLVE:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "pet_evolve",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Reward
        for fid, text in REWARD:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "reward",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Round end
        for fid, text in ROUND_END:
            lines.append({
                "id": f"{char}_{fid}",
                "file": f"{char}/global/{fid}.mp3",
                "event": "round_end",
                "topic": None,
                "character": char,
                "text": text,
            })

        # Per-skill intro lines
        for skill_id, skill_name in SKILLS.items():
            text = f"Chào bạn! Hôm nay chúng mình học về {skill_name} nhé!"
            lines.append({
                "id": f"{char}_intro_{skill_id}",
                "file": f"{char}/intro/{skill_id}.mp3",
                "event": "intro",
                "topic": skill_id,
                "character": char,
                "text": text,
            })

    return lines


async def generate_audio(line, semaphore):
    """Generate a single audio file using edge-tts."""
    async with semaphore:
        filepath = os.path.join(BASE_DIR, line["file"])
        os.makedirs(os.path.dirname(filepath), exist_ok=True)

        if os.path.exists(filepath):
            return f"SKIP {line['file']}"

        voice = VOICES[line["character"]]
        try:
            communicate = edge_tts.Communicate(line["text"], voice, rate="-5%")
            await communicate.save(filepath)
            return f"  OK {line['file']}"
        except Exception as e:
            return f"FAIL {line['file']}: {e}"


async def main():
    lines = build_voice_lines()
    print(f"Total voice lines to generate: {len(lines)}")
    print(f"Characters: boy (NamMinh), girl (HoaiMy)")
    print(f"Output: {BASE_DIR}")
    print()

    # Concurrency limit to avoid rate limiting
    semaphore = asyncio.Semaphore(5)

    start = time.time()
    tasks = [generate_audio(line, semaphore) for line in lines]
    results = await asyncio.gather(*tasks)

    ok = sum(1 for r in results if r.startswith("  OK"))
    skip = sum(1 for r in results if r.startswith("SKIP"))
    fail = sum(1 for r in results if r.startswith("FAIL"))

    # Print failures
    for r in results:
        if r.startswith("FAIL"):
            print(r)

    elapsed = time.time() - start
    print(f"\nDone in {elapsed:.1f}s — OK: {ok}, Skipped: {skip}, Failed: {fail}")

    # Generate manifest
    manifest = {
        "version": "1.0",
        "generated_at": time.strftime("%Y-%m-%dT%H:%M:%SZ"),
        "characters": ["boy", "girl"],
        "total_files": len(lines),
        "entries": lines,
    }
    manifest_path = os.path.join(BASE_DIR, "voice_manifest.json")
    with open(manifest_path, "w", encoding="utf-8") as f:
        json.dump(manifest, f, ensure_ascii=False, indent=2)
    print(f"Manifest: {manifest_path}")


if __name__ == "__main__":
    asyncio.run(main())
