#!/usr/bin/env python3
"""
Generate voice MP3 for all fixed question texts.
Reads question_texts.json and generates MP3 files using edge-tts.
Only uses male voice (NamMinh for Vietnamese, GuyNeural for English).
"""
import asyncio
import json
import os
import hashlib
import re
import time
import edge_tts

BASE_DIR = os.path.join(os.path.dirname(__file__), "public", "voice", "questions")
VOICE_VI = "vi-VN-NamMinhNeural"
VOICE_EN = "en-US-GuyNeural"
SEMAPHORE = asyncio.Semaphore(8)

# Load question pool to know which skills are English
POOL_PATH = os.path.join(os.path.dirname(__file__), "public", "questions_pool.json")
TEXTS_PATH = os.path.join(os.path.dirname(__file__), "question_texts.json")

def text_to_id(text):
    """Create a short unique ID from question text."""
    return hashlib.md5(text.encode()).hexdigest()[:12]

def clean_for_tts(text, is_english=False):
    """Clean text for TTS reading."""
    # Remove emojis
    clean = re.sub(r'[^\w\s\+\-×÷=><≥≤≠\?:,\.;!\'"()/²³°%\n]', '', text, flags=re.UNICODE)
    if not is_english:
        # Replace math symbols with Vietnamese words
        clean = clean.replace('+', ' cộng ')
        clean = clean.replace('-', ' trừ ')
        clean = clean.replace('×', ' nhân ')
        clean = re.sub(r'(\d)\s*x\s*(\d)', r'\1 nhân \2', clean, flags=re.IGNORECASE)
        clean = clean.replace('÷', ' chia ')
        clean = clean.replace(':', ' chia ')
        clean = clean.replace('=', ' bằng ')
        clean = clean.replace('>', ' lớn hơn ')
        clean = clean.replace('<', ' nhỏ hơn ')
        clean = clean.replace('?', ' bao nhiêu ')
        clean = clean.replace('²', ' bình phương ')
        clean = clean.replace('³', ' lập phương ')
        clean = clean.replace('%', ' phần trăm ')
    clean = re.sub(r'\n', '. ', clean)
    clean = re.sub(r'\s+', ' ', clean).strip()
    return clean

async def gen_one(text, filepath, voice):
    """Generate one MP3 file."""
    async with SEMAPHORE:
        if os.path.exists(filepath):
            return "skip"
        try:
            tts = edge_tts.Communicate(text, voice, rate="-5%")
            await tts.save(filepath)
            return "ok"
        except Exception as e:
            print(f"  FAIL: {e}")
            return "fail"

async def main():
    os.makedirs(BASE_DIR, exist_ok=True)

    # Load question texts
    with open(TEXTS_PATH, 'r') as f:
        all_texts = json.load(f)

    # Load pool to determine which texts belong to English skills
    with open(POOL_PATH, 'r') as f:
        pool = json.load(f)

    # Build set of English question texts
    eng_texts = set()
    for skill_id, levels in pool.items():
        if re.match(r'^e[_\d]', skill_id):
            for level, questions in levels.items():
                for q in questions:
                    eng_texts.add(q['t'])

    print(f"Total texts: {len(all_texts)}")
    print(f"English texts: {len(eng_texts)}")
    print(f"Vietnamese texts: {len(all_texts) - len(eng_texts)}")
    print(f"Output: {BASE_DIR}")
    print()

    # Build manifest mapping: text_hash -> filename
    manifest = {}
    tasks = []

    for text in all_texts:
        tid = text_to_id(text)
        is_eng = text in eng_texts
        voice = VOICE_EN if is_eng else VOICE_VI
        filename = f"{tid}.mp3"
        filepath = os.path.join(BASE_DIR, filename)
        clean = clean_for_tts(text, is_eng)
        if not clean:
            continue
        manifest[tid] = {"file": f"questions/{filename}", "text": text, "lang": "en" if is_eng else "vi"}
        tasks.append((clean, filepath, voice))

    t0 = time.time()
    results = await asyncio.gather(*[gen_one(t, fp, v) for t, fp, v in tasks])

    ok = results.count("ok")
    skip = results.count("skip")
    fail = results.count("fail")
    dt = time.time() - t0

    print(f"\nDone in {dt:.1f}s — OK: {ok}, Skipped: {skip}, Failed: {fail}")

    # Write question voice manifest
    manifest_path = os.path.join(os.path.dirname(__file__), "public", "voice", "question_manifest.json")
    with open(manifest_path, 'w') as f:
        json.dump(manifest, f, ensure_ascii=False)
    print(f"Manifest: {manifest_path} ({len(manifest)} entries)")

if __name__ == "__main__":
    asyncio.run(main())
