#!/usr/bin/env python3
"""
Generate character & pet art for Vuong Quoc Hoc Gioi
Pipeline: Gemini Imagen API → rembg (transparent) → vtracer (SVG) → save
"""

import os
import sys
import time
import json
from pathlib import Path
from io import BytesIO

from google import genai
from google.genai import types
from PIL import Image
from rembg import remove
import vtracer

# ── Config ─────────────────────────────────────────────────────────────
API_KEY = "REDACTED"
PROJECT_ROOT = Path(__file__).parent.parent
CHAR_DIR = PROJECT_ROOT / "public" / "characters"
PET_DIR = PROJECT_ROOT / "public" / "pets"

# Evolution milestones: levels 1, 3, 5, 7, 10
MILESTONES = [1, 3, 5, 7, 10]

# ── Prompt Templates ──────────────────────────────────────────────────

STYLE_BASE = (
    "3D Pixar-style character illustration, chibi proportions (big head, small body), "
    "cute and adorable, vibrant colors, smooth render, soft lighting, "
    "clean white background, full body front view, centered, "
    "high quality, 4K, children's educational game character"
)

CHARACTER_PROMPTS = {
    "boy": {
        1: f"A cute Vietnamese boy student, age 7, short dark brown hair, wearing a simple blue t-shirt and shorts, "
           f"carrying a small green backpack, cheerful smile, rosy cheeks, {STYLE_BASE}",
        3: f"A cute Vietnamese boy student, age 7, short dark brown hair, wearing a blue t-shirt with a golden star badge, "
           f"green pointy wizard hat with a star on top, carrying a backpack with pins, confident smile, {STYLE_BASE}",
        5: f"A cute Vietnamese boy student hero, age 7, short dark brown hair, wearing a blue superhero outfit "
           f"with a golden cape flowing behind, star emblem on chest, holding a magic pencil wand, "
           f"determined expression, sparkles around, {STYLE_BASE}",
        7: f"A cute Vietnamese boy genius, age 7, short dark brown hair, wearing an elaborate blue and gold scholar robe, "
           f"glowing golden aura around body, floating math symbols nearby, magic book in hand, "
           f"crown-like headband with gems, powerful pose, {STYLE_BASE}",
        10: f"A cute Vietnamese boy legend, age 7, short dark brown hair, wearing a majestic blue and gold royal outfit, "
            f"golden crown with jewels, magnificent cape with stars pattern, floating on a magic platform, "
            f"surrounded by sparkles and light rays, trophy and medals, ultimate scholar king, {STYLE_BASE}",
    },
    "girl": {
        1: f"A cute Vietnamese girl student, age 7, long dark hair with pink hair clips, wearing a pink dress with white collar, "
           f"small backpack with bunny keychain, sweet smile, rosy cheeks, {STYLE_BASE}",
        3: f"A cute Vietnamese girl student, age 7, long dark hair with a sparkly pink headband, wearing a pink dress "
           f"with star patterns, a cute pointy pink hat with a heart on top, holding a star wand, happy expression, {STYLE_BASE}",
        5: f"A cute Vietnamese girl student hero, age 7, long dark hair with flower crown, wearing a pink and purple "
           f"magical girl outfit with a flowing sparkling cape, heart-shaped gem on chest, "
           f"holding a glowing magic pencil, confident pose, {STYLE_BASE}",
        7: f"A cute Vietnamese girl genius, age 7, long dark hair with golden tiara, wearing an elegant pink and gold "
           f"scholar gown, glowing pink aura, floating hearts and stars around, "
           f"magic spell book in hand, wise expression, {STYLE_BASE}",
        10: f"A cute Vietnamese girl legend, age 7, long dark hair with magnificent golden crown with pink gems, "
            f"wearing a royal pink and gold princess scholar outfit, magnificent sparkling cape, "
            f"floating on clouds, surrounded by rainbows and sparkles, scepter with star, "
            f"ultimate queen of knowledge, {STYLE_BASE}",
    },
}

PET_PROMPTS = {
    "cat": {
        1: f"A cute baby orange tabby kitten, sitting, big round eyes, tiny pink nose, fluffy fur, "
           f"small and chubby, curious expression, {STYLE_BASE}",
        3: f"A cute orange tabby cat, slightly bigger, wearing a tiny green wizard hat with a star, "
           f"playful pose, fluffy tail, sparkly eyes, {STYLE_BASE}",
        5: f"A cute orange tabby cat, medium size, wearing a small purple cape, "
           f"a book badge on collar, confident pose, magical sparkles, {STYLE_BASE}",
        7: f"A majestic orange tabby cat, wearing a golden scholar hat and blue cape, "
           f"glowing golden aura, floating mini books around, wise expression, "
           f"gem-studded collar, {STYLE_BASE}",
        10: f"An epic legendary orange tabby cat, wearing a golden crown and royal purple cape with stars, "
            f"angel wings made of light, floating on a magic cloud, "
            f"surrounded by sparkles and rainbow, magical familiar, {STYLE_BASE}",
    },
    "corgi": {
        1: f"A cute baby Corgi puppy, sitting, big round eyes, floppy ears, stubby legs, "
           f"tongue out, happy face, fluffy butt, {STYLE_BASE}",
        3: f"A cute Corgi puppy, slightly bigger, wearing a tiny red bandana with a star, "
           f"wagging tail, playful jumping pose, sparkly eyes, {STYLE_BASE}",
        5: f"A cute Corgi dog, medium size, wearing a blue superhero cape, "
           f"golden medal on collar, heroic pose, one paw raised, sparkles, {STYLE_BASE}",
        7: f"A majestic Corgi dog, wearing a golden knight helmet and green cape, "
           f"glowing aura, floating bones and stars around, "
           f"gem collar, proud expression, {STYLE_BASE}",
        10: f"An epic legendary Corgi dog, wearing a golden crown and magnificent royal cape, "
            f"angel wings, sitting on a golden throne-like cushion, "
            f"surrounded by sparkles and light rays, legendary companion, {STYLE_BASE}",
    },
    "elephant": {
        1: f"A cute baby elephant, sitting, big floppy ears, short trunk curled up, big round eyes, "
           f"chubby body, light purple-gray color, sweet smile, {STYLE_BASE}",
        3: f"A cute baby elephant, slightly bigger, wearing a tiny colorful party hat, "
           f"trunk holding a small flower, sparkly eyes, happy dance pose, {STYLE_BASE}",
        5: f"A cute elephant, medium size, wearing a purple cape with stars, "
           f"golden anklets, trunk holding a magic wand, confident pose, sparkles, {STYLE_BASE}",
        7: f"A majestic young elephant, wearing a golden headdress with gems and purple robe, "
           f"glowing purple aura, trunk raised triumphantly, "
           f"floating crystals around, wise expression, {STYLE_BASE}",
        10: f"An epic legendary elephant, wearing a magnificent golden crown and royal purple cape, "
            f"sacred markings glowing on forehead, angel wings made of light, "
            f"standing on a magic platform, surrounded by sparkles and cosmic energy, {STYLE_BASE}",
    },
}

# ── Functions ──────────────────────────────────────────────────────────

def generate_image(client, prompt, retries=3):
    """Generate image using Gemini 3.1 Flash Image Preview"""
    for attempt in range(retries):
        try:
            response = client.models.generate_content(
                model="gemini-3.1-flash-image-preview",
                contents=prompt,
                config=types.GenerateContentConfig(
                    response_modalities=["IMAGE", "TEXT"],
                ),
            )
            # Extract image from response parts
            if response.candidates and response.candidates[0].content.parts:
                for part in response.candidates[0].content.parts:
                    if part.inline_data and part.inline_data.mime_type.startswith("image/"):
                        img_bytes = part.inline_data.data
                        return Image.open(BytesIO(img_bytes))
            print(f"  [!] No image in response, attempt {attempt + 1}/{retries}")
            time.sleep(2)
        except Exception as e:
            print(f"  [!] Error attempt {attempt + 1}/{retries}: {e}")
            time.sleep(5)
    return None


def remove_background(img):
    """Remove background using rembg"""
    buf = BytesIO()
    img.save(buf, format="PNG")
    buf.seek(0)
    out = remove(buf.read())
    return Image.open(BytesIO(out))


def image_to_svg(img_path, svg_path):
    """Convert PNG to SVG using vtracer"""
    vtracer.convert_image_to_svg_py(
        str(img_path),
        str(svg_path),
        colormode="color",
        hierarchical="stacked",
        mode="spline",
        filter_speckle=4,
        color_precision=6,
        layer_difference=16,
        corner_threshold=60,
        length_threshold=4.0,
        max_iterations=10,
        splice_threshold=45,
        path_precision=3,
    )


def process_one(client, category, entity_id, level, output_dir):
    """Generate, process, save one character/pet image"""
    prompts = CHARACTER_PROMPTS if category == "characters" else PET_PROMPTS
    prompt = prompts[entity_id][level]

    png_name = f"{entity_id}_level_{level}.png"
    svg_name = f"{entity_id}_level_{level}.svg"
    png_path = output_dir / png_name
    svg_path = output_dir / svg_name

    # Skip if SVG already exists
    if svg_path.exists():
        print(f"  [skip] {svg_path.name} already exists")
        return True

    print(f"  [1/3] Generating image...")
    img = generate_image(client, prompt)
    if img is None:
        print(f"  [FAIL] Could not generate image for {entity_id} level {level}")
        return False

    print(f"  [2/3] Removing background...")
    img_nobg = remove_background(img)

    # Save transparent PNG (1024px)
    img_nobg = img_nobg.resize((1024, 1024), Image.LANCZOS)
    img_nobg.save(str(png_path), "PNG")

    # Also save 512px version
    img_512 = img_nobg.resize((512, 512), Image.LANCZOS)
    png_512_path = output_dir / f"{entity_id}_level_{level}_512.png"
    img_512.save(str(png_512_path), "PNG")

    print(f"  [3/3] Converting to SVG...")
    image_to_svg(png_path, svg_path)

    print(f"  [OK] {svg_name} ({svg_path.stat().st_size // 1024}KB)")
    return True


def main():
    # Parse args
    only = None
    if len(sys.argv) > 1:
        only = sys.argv[1]  # e.g. "boy", "girl", "cat", "corgi", "elephant"

    # Setup
    CHAR_DIR.mkdir(parents=True, exist_ok=True)
    PET_DIR.mkdir(parents=True, exist_ok=True)

    client = genai.Client(api_key=API_KEY)

    total = 0
    success = 0
    failed = []

    # Characters
    for char_id in CHARACTER_PROMPTS:
        if only and only != char_id:
            continue
        for level in MILESTONES:
            total += 1
            print(f"\n{'='*50}")
            print(f"CHARACTER: {char_id} | Level {level}")
            print(f"{'='*50}")
            ok = process_one(client, "characters", char_id, level, CHAR_DIR)
            if ok:
                success += 1
            else:
                failed.append(f"{char_id}_level_{level}")
            time.sleep(2)  # Rate limit

    # Pets
    for pet_id in PET_PROMPTS:
        if only and only != pet_id:
            continue
        for level in MILESTONES:
            total += 1
            print(f"\n{'='*50}")
            print(f"PET: {pet_id} | Level {level}")
            print(f"{'='*50}")
            ok = process_one(client, "pets", pet_id, level, PET_DIR)
            if ok:
                success += 1
            else:
                failed.append(f"{pet_id}_level_{level}")
            time.sleep(2)  # Rate limit

    # Summary
    print(f"\n{'='*50}")
    print(f"DONE: {success}/{total} images generated")
    if failed:
        print(f"FAILED: {', '.join(failed)}")
    print(f"Characters: {CHAR_DIR}")
    print(f"Pets: {PET_DIR}")


if __name__ == "__main__":
    main()
