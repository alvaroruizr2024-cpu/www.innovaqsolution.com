#!/usr/bin/env python3
"""
Genera movimiento cinematográfico a partir de stills fotorealistas, sin APIs:

  1. loop.webm + loop.mp4 por producto (8 s, 1280x720, zoom "respiración" sin corte)
     para cada public/products/<CODE>/ que tenga still y no tenga loop.
  2. Reels de sección en public/motion/ (1920x1080, Ken Burns + fundidos):
       hero-orbit      ← los 11 stills de producto   (1600x900, ~1 MB/10 s)
       sectors-reel    ← renders de faena en ../assets/hero-v6/*.jpg
       product-detail  ← ../tiktok-engine/assets/products/*_HD.png

Uso:  python3 scripts/kenburns.py [--only loops|reels] [--force]
Requiere ffmpeg con libvpx-vp9 y libx264 (usa imageio-ffmpeg si no hay ffmpeg en PATH).
"""
import argparse, glob, os, shutil, subprocess, sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
PUB = ROOT / "public"
SITE = ROOT.parent
FPS = 30


def ffmpeg():
    if shutil.which("ffmpeg"):
        return "ffmpeg"
    try:
        import imageio_ffmpeg
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("No hay ffmpeg. Instala ffmpeg o `pip install imageio-ffmpeg`.")


FF = ffmpeg()


def run(args):
    r = subprocess.run([FF, "-hide_banner", "-loglevel", "error", "-y", *args], capture_output=True, text=True)
    if r.returncode:
        print(r.stderr[-1500:], file=sys.stderr)
        raise SystemExit(f"ffmpeg falló: {' '.join(args[:6])}…")


def kenburns_filter(frames, w, h, seed, breathe=True):
    """zoompan seguro: se escala primero a 2x para que el zoom no pixele.
    breathe=True → z sube y baja (loop sin corte). False → zoom lento de entrada."""
    if breathe:
        z = f"1+0.075*sin(PI*on/{frames})"
    else:
        z = f"1.02+0.11*on/{frames}"
    # deriva lateral suave, distinta por clip (seed)
    dx = 0.5 + 0.06 * ((seed % 5) - 2)
    dy = 0.5 + 0.05 * (((seed * 7) % 5) - 2)
    return (
        f"scale={w*2}:{h*2}:force_original_aspect_ratio=increase,crop={w*2}:{h*2},"
        f"zoompan=z='{z}':x='iw*{dx}-(iw/zoom)*{dx}':y='ih*{dy}-(ih/zoom)*{dy}':d={frames}:s={w}x{h}:fps={FPS},"
        f"format=yuv420p"
    )


def encode_pair(src_filter_args, out_base, seconds, crf_webm=36, crf_mp4=26):
    webm = out_base.with_suffix(".webm")
    mp4 = out_base.with_suffix(".mp4")
    run([*src_filter_args, "-t", str(seconds), "-an", "-c:v", "libvpx-vp9", "-b:v", "0", "-crf", str(crf_webm),
         "-row-mt", "1", "-deadline", "good", "-cpu-used", "2", str(webm)])
    run([*src_filter_args, "-t", str(seconds), "-an", "-c:v", "libx264", "-preset", "slow", "-crf", str(crf_mp4),
         "-pix_fmt", "yuv420p", "-movflags", "+faststart", str(mp4)])
    return webm, mp4


def make_loops(force):
    made = 0
    for d in sorted((PUB / "products").iterdir()):
        if not d.is_dir():
            continue
        still = next((d / n for n in ["still-4k.webp", "still-4k.png", "still.webp", "still.png", "still.jpg"] if (d / n).exists()), None)
        has_loop = any((d / n).exists() for n in ["loop.webm", "loop.mp4"])
        if not still or (has_loop and not force):
            continue
        seconds = 8
        frames = seconds * FPS
        vf = kenburns_filter(frames, 1280, 720, seed=made, breathe=True)
        encode_pair(["-i", str(still), "-vf", vf], d / "loop", seconds)
        print(f"  loop  {d.name}")
        made += 1
    print(f"{made} loops generados")


def make_reel(name, sources, clip_s=4.0, fade_s=1.0, w=1600, h=900):
    if not sources:
        print(f"  reel  {name}: sin fuentes, omitido")
        return
    frames = int(clip_s * FPS)
    inputs, chains = [], []
    for i, src in enumerate(sources):
        inputs += ["-i", str(src)]
        chains.append(f"[{i}:v]{kenburns_filter(frames, w, h, seed=i, breathe=False)},setsar=1[v{i}]")
    # cadena de xfade: cada fundido empieza en (i+1)*clip - i*fade - fade
    prev = "v0"
    for i in range(1, len(sources)):
        offset = i * (clip_s - fade_s)
        out = f"x{i}" if i < len(sources) - 1 else "vout"
        chains.append(f"[{prev}][v{i}]xfade=transition=fade:duration={fade_s}:offset={offset:.3f}[{out}]")
        prev = out
    if len(sources) == 1:
        chains[-1] = chains[-1].replace("[v0]", "[vout]")
    total = len(sources) * clip_s - (len(sources) - 1) * fade_s
    fc = ";".join(chains)
    (PUB / "motion").mkdir(exist_ok=True)
    # reels largos: bitrate contenido (van al repo dos veces: public/ y la copia publicada)
    encode_pair([*inputs, "-filter_complex", fc, "-map", "[vout]"], PUB / "motion" / name, total, crf_webm=40, crf_mp4=28)
    print(f"  reel  {name}: {len(sources)} tomas, {total:.0f}s")


def make_reels():
    stills = [p for p in sorted((PUB / "products").glob("*/still-4k.webp"))]
    make_reel("hero-orbit", stills)
    faena = sorted(glob.glob(str(SITE / "assets" / "hero-v6" / "*.jpg")))
    make_reel("sectors-reel", [Path(p) for p in faena])
    detail = sorted(glob.glob(str(SITE / "tiktok-engine" / "assets" / "products" / "*_HD.png")))
    make_reel("product-detail", [Path(p) for p in detail])


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", choices=["loops", "reels"])
    ap.add_argument("--force", action="store_true")
    a = ap.parse_args()
    if a.only != "reels":
        make_loops(a.force)
    if a.only != "loops":
        make_reels()
