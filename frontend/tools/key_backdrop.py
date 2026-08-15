"""Key the white/gray studio backdrop of the yellow bottle frames to the
page cream so the sequence blends seamlessly with the site.

For every frame we detect the dominant backdrop color from the border ring
(white for the first frames, uniform gray afterwards) and replace pixels
close to it with cream, blending near the tolerance boundary to avoid hard
edges / halos around the bottle elements.

The target cream comes from the KEY_TARGET env var (default #f7f5f0).
"""
from PIL import Image
import glob
import os

SRC = "asset/yellow"
OUT = "public/yellow-sequence"
CREAM_HEX = os.environ.get("KEY_TARGET", "#f7f5f0").lstrip("#")
CREAM = (int(CREAM_HEX[0:2], 16), int(CREAM_HEX[2:4], 16), int(CREAM_HEX[4:6], 16))
# Near-white backdrops (pure white has almost no JPEG noise) get a tighter
# tolerance so the bottle's warm-white cap/highlights survive; the gray studio
# backdrop carries more noise and needs a looser one.
KEY_TOL_GRAY = 24     # full key within this distance (RGB euclidean)
BLEND_TOL_GRAY = 36   # blend zone between KEY_TOL and BLEND_TOL
KEY_TOL_WHITE = 10
BLEND_TOL_WHITE = 18


def detect_backdrop(img):
    """Dominant border-ring color, quantized to ~8-unit buckets."""
    w, h = img.size
    px = img.load()
    from collections import Counter

    counts = Counter()
    for y in range(h):
        for x in (0, w - 1):
            r, g, b = px[x, y]
            counts[(r // 8 * 8, g // 8 * 8, b // 8 * 8)] += 1
    for x in range(w):
        for y in (0, h - 1):
            r, g, b = px[x, y]
            counts[(r // 8 * 8, g // 8 * 8, b // 8 * 8)] += 1
    (br, bg, bb), _ = counts.most_common(1)[0]
    return (br + 4, bg + 4, bb + 4)


def dist(a, b):
    return ((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2 + (a[2] - b[2]) ** 2) ** 0.5


def key_frame(src_path, dst_path):
    img = Image.open(src_path).convert("RGB")
    backdrop = detect_backdrop(img)
    is_white = backdrop[0] > 240 and backdrop[1] > 240 and backdrop[2] > 240
    key_tol = KEY_TOL_WHITE if is_white else KEY_TOL_GRAY
    blend_tol = BLEND_TOL_WHITE if is_white else BLEND_TOL_GRAY
    px = img.load()
    w, h = img.size
    out = Image.new("RGB", (w, h))
    op = out.load()

    for y in range(h):
        for x in range(w):
            p = px[x, y]
            d = dist(p, backdrop)
            if d <= key_tol:
                op[x, y] = CREAM
            elif d < blend_tol:
                t = (d - key_tol) / (blend_tol - key_tol)
                op[x, y] = tuple(
                    round(CREAM[i] * (1 - t) + p[i] * t) for i in range(3)
                )
            else:
                op[x, y] = p

    out.save(dst_path, "JPEG", quality=92)
    return backdrop


os.makedirs(OUT, exist_ok=True)
files = sorted(glob.glob(os.path.join(SRC, "ezgif-frame-*.jpg")))
for i, src in enumerate(files, start=1):
    dst = os.path.join(OUT, "ezgif-frame-%03d.jpg" % i)
    backdrop = key_frame(src, dst)
    if i in (1, 3, 6, 60, 120, 241):
        print("frame %03d: backdrop=%s" % (i, "#%02X%02X%02X" % backdrop))
print("wrote %d frames to %s" % (len(files), OUT))
