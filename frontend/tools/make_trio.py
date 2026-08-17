"""Composite the three JoJo bottle renders into one trio product photo.

The flavors section animates three separate transparent PNGs in CSS; this
renders the same product art into a single static lineup on the page cream
(#f7f5f0) — a clean trio "product photo" for social cards, OG images, or a
static poster. It follows the fixed trio prompt's layout exactly:

    left    — Green Citrus   (green liquid, label, cap)
    center  — Yellow Mango   (yellow; the hero, largest)
    right   — Red Strawberry (red liquid, label, cap)

Bottles stand on a shared baseline with even cream gaps between them and a
soft blurred shadow beneath each, so the lineup reads as one photo. Output:
public/images/trio.png
"""
from __future__ import annotations

import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

FRONTEND = Path(__file__).resolve().parents[1]
IMAGES = FRONTEND / "public" / "images"
OUT = IMAGES / "trio.png"

CREAM = (247, 245, 240)  # #f7f5f0 — the page background
SCALE = 2.5              # upscale from source art so the hero reads large
GAP = 128                # cream gap between bottles (they must not touch)
MARGIN_X = 128
MARGIN_BOTTOM = 96       # below the shadow
SHADOW_ALPHA = 60
SHADOW_BLUR = 14

# (source, height fraction relative to the yellow hero)
BOTTLES = [
    ("green-bottle.png", 0.72),
    ("yellow-bottle.png", 1.0),
    ("red-bottle.png", 0.72),
]


def crop_to_alpha(img: Image.Image) -> Image.Image:
    """Trim transparent padding so bottles align exactly on their art box."""
    bbox = img.convert("RGBA").getbbox()
    return img.crop(bbox) if bbox else img


def load(name: str) -> Image.Image:
    return crop_to_alpha(Image.open(IMAGES / name).convert("RGBA"))


def scale_to_height(img: Image.Image, height: int) -> Image.Image:
    w = max(1, round(img.width * height / img.height))
    return img.resize((w, height), Image.LANCZOS)


def make_shadow(mask: Image.Image, height: int) -> Image.Image:
    """Soft elliptical-ish shadow from the bottle's silhouette."""
    shadow = Image.new("RGBA", mask.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).bitmap((0, 0), mask, fill=(60, 50, 30, SHADOW_ALPHA))
    shadow = shadow.filter(ImageFilter.GaussianBlur(SHADOW_BLUR))
    return shadow


def main() -> None:
    hero_h = round(248 * SCALE)  # yellow hero reference height
    scaled = []
    for name, frac in BOTTLES:
        img = scale_to_height(load(name), round(hero_h * frac))
        scaled.append((name, img))

    # Canvas: sum of bottle widths + even gaps + margins
    widths = [img.width for _, img in scaled]
    canvas_w = sum(widths) + 2 * GAP + 2 * MARGIN_X
    canvas_h = hero_h + MARGIN_BOTTOM + round(SHADOW_BLUR * 2.2)

    canvas = Image.new("RGBA", (canvas_w, canvas_h), CREAM + (255,))

    # Baseline: all bottle feet share one y; shadows hang below them.
    baseline = canvas_h - MARGIN_BOTTOM + round(SHADOW_BLUR * 0.6)
    placements: list[tuple[str, Image.Image, int, int]] = []
    x = MARGIN_X
    for name, img in scaled:
        y = baseline - img.height
        shadow = make_shadow(img, img.height)
        canvas.alpha_composite(shadow, (x, y + 6))
        canvas.alpha_composite(img, (x, y))
        placements.append((name, img, x, y))
        print(f"{name}: {img.width}x{img.height} at x={x}, y={y}")
        x += img.width + GAP

    OUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUT, "PNG")
    print(f"wrote {OUT.relative_to(FRONTEND)} ({canvas_w}x{canvas_h})")

    # Sanity: the gap columns must be pure cream (separation check).
    mid = canvas_h // 2
    px = canvas.convert("RGB")
    for i in range(len(placements) - 1):
        name, img, x0, _ = placements[i]
        gap_cx = x0 + img.width + GAP // 2
        c = px.getpixel((gap_cx, mid))
        ok = c == CREAM
        print(f"  gap after {name} at x={gap_cx}: {c} {'OK' if ok else 'WARN'}")

    # Count opaque columns per bottle region (rough overlap sanity).
    for name, img, x0, _ in placements:
        opaque_cols = sum(
            1 for cx in range(x0, x0 + img.width)
            if any(px.getpixel((cx, yy)) != CREAM for yy in range(0, canvas_h, 7))
        )
        print(f"  {name}: {opaque_cols}/{img.width} opaque columns")


if __name__ == "__main__":
    main()
