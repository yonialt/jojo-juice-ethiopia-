"""Swap the hero scroll sequence with a newly generated animation.

One command turns the AI-generated hero video into the 241 JPEG frames the
site scrubs on scroll (CanvasSequence.tsx hard-codes FRAME_COUNT = 241 and
loads /yellow-sequence/ezgif-frame-NNN.jpg):

    python tools/extract_frames.py path/to/hero.mp4

Pipeline:
  1. ffmpeg extracts every frame at native resolution into asset/yellow/
     as ezgif-frame-NNN.jpg (high-quality JPEG, frame index preserved).
  2. The count is forced to exactly 241. An 8s @ 30fps clip yields 240
     frames; since the animation starts and ends identical (bottle alone),
     the final frame is duplicated to fill slot 241. Longer clips are
     evenly downsampled to 241 (first and last always kept).
  3. tools/key_backdrop.py keys the backdrop to the page cream (#f7f5f0)
     and writes over public/yellow-sequence/. Pass --no-key if the video
     was generated with a perfect flat cream background already.

The old frames in public/yellow-sequence/ are replaced; nothing else in the
repo is touched. Paths resolve relative to this file, so it runs from any
directory. Quality is far above Ezgif's re-encode: ffmpeg frame extraction
(q:v 2) plus PIL quality-92 output from key_backdrop.py.
"""
from __future__ import annotations

import argparse
import glob
import os
import shutil
import subprocess
import sys
from pathlib import Path

FRONTEND = Path(__file__).resolve().parents[1]
SRC = FRONTEND / "asset" / "yellow"
OUT = FRONTEND / "public" / "yellow-sequence"
KEY_BACKDROP = FRONTEND / "tools" / "key_backdrop.py"

# Must match FRAME_COUNT in src/components/CanvasSequence.tsx
FRAME_COUNT = 241
# ffmpeg mjpeg quality: 2 is visually lossless
FFMPEG_JPEG_Q = "2"


def sh(*args: str, cwd: Path | None = None) -> None:
    print("$", " ".join(str(a) for a in args))
    proc = subprocess.run([str(a) for a in args], cwd=cwd, capture_output=True, text=True)
    if proc.returncode != 0:
        sys.stderr.write(proc.stderr[-4000:])
        raise SystemExit("command failed (see stderr above): " + " ".join(str(a) for a in args))


def extract(video: Path) -> list[Path]:
    """Dump every video frame to SRC as ezgif-frame-NNN.jpg; return sorted paths."""
    if SRC.exists():
        shutil.rmtree(SRC)  # full regeneration each run
    SRC.mkdir(parents=True)
    sh(
        "ffmpeg", "-y", "-loglevel", "warning",
        "-i", str(video),
        "-fps_mode", "passthrough",  # one output per input frame, no dup/drop
        "-q:v", FFMPEG_JPEG_Q,
        "-start_number", "1",
        str(SRC / "ezgif-frame-%03d.jpg"),
    )
    return sorted(Path(f) for f in glob.glob(str(SRC / "ezgif-frame-*.jpg")))


def fit_count(frames: list[Path]) -> list[Path]:
    """Return exactly FRAME_COUNT frames: duplicate the last if short,
    subsample evenly (keeping first + last) if long."""
    n = len(frames)
    if n == FRAME_COUNT:
        return frames

    if n < FRAME_COUNT:
        extra = FRAME_COUNT - n
        last = frames[-1]
        for i in range(1, extra + 1):
            dup = SRC / f"ezgif-frame-{n + i:03d}.jpg"
            shutil.copy2(last, dup)
            frames.append(dup)
        print(
            f"note: clip had {n} frames; duplicated the final frame {extra}x to reach "
            f"{FRAME_COUNT} (seamless because the loop starts and ends identical)"
        )
        return frames

    # n > FRAME_COUNT: pick FRAME_COUNT evenly spaced indices, keeping both ends
    idxs = sorted({round(i * (n - 1) / (FRAME_COUNT - 1)) for i in range(FRAME_COUNT)})
    keep = [frames[i] for i in idxs]
    tmp = SRC.parent / (SRC.name + "_tmp")
    if tmp.exists():
        shutil.rmtree(tmp)
    tmp.mkdir()
    for i, src in enumerate(keep, start=1):
        shutil.move(str(src), str(tmp / f"ezgif-frame-{i:03d}.jpg"))
    shutil.rmtree(SRC)
    tmp.rename(SRC)
    print(f"note: clip had {n} frames; downsampled evenly to {FRAME_COUNT} (first + last kept)")
    return sorted(Path(f) for f in glob.glob(str(SRC / "ezgif-frame-*.jpg")))


def clear_out() -> None:
    if OUT.exists():
        for f in glob.glob(str(OUT / "ezgif-frame-*.jpg")):
            os.remove(f)


def write_out(no_key: bool) -> None:
    clear_out()
    if no_key:
        for src in sorted(glob.glob(str(SRC / "ezgif-frame-*.jpg"))):
            shutil.copy2(src, OUT / os.path.basename(src))
        print(f"copied {FRAME_COUNT} frames to {OUT.relative_to(FRONTEND)} (no keying)")
    else:
        sh(sys.executable, str(KEY_BACKDROP), cwd=str(FRONTEND))


def stage_to(dest: Path) -> None:
    """Copy raw extracted frames somewhere else; never touches the live sequence."""
    dest.mkdir(parents=True, exist_ok=True)
    for src in sorted(glob.glob(str(SRC / "ezgif-frame-*.jpg"))):
        shutil.copy2(src, dest / os.path.basename(src))
    print(f"staged {FRAME_COUNT} extracted frames to {dest} (not keyed; live sequence untouched)")


def main() -> None:
    parser = argparse.ArgumentParser(
        description="Extract a generated hero video into the 241-frame yellow sequence."
    )
    parser.add_argument("video", help="path to the generated animation (mp4/mov/webm)")
    parser.add_argument(
        "--no-key",
        action="store_true",
        help="copy extracted frames straight into public/yellow-sequence/ "
        "(use when the video already has a perfect flat cream background)",
    )
    parser.add_argument(
        "--staging",
        metavar="DIR",
        help="write raw extracted frames to DIR for preview instead of replacing "
        "public/yellow-sequence/ (no keying applied)",
    )
    args = parser.parse_args()

    video = Path(args.video)
    if not video.exists():
        raise SystemExit(f"video not found: {video}")

    frames = extract(video)
    print(f"extracted {len(frames)} frames from {video.name}")

    frames = fit_count(frames)
    assert len(frames) == FRAME_COUNT, f"expected {FRAME_COUNT} frames, got {len(frames)}"

    if args.staging:
        stage_to(Path(args.staging))
        return

    write_out(no_key=args.no_key)
    print(
        f"done — public/yellow-sequence/ now has {FRAME_COUNT} frames. "
        "Verify with `npm run dev` and scroll the hero."
    )


if __name__ == "__main__":
    main()
