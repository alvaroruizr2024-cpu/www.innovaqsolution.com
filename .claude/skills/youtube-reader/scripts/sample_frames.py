#!/usr/bin/env python3
"""
Extrae fotogramas equiespaciados de un video para que Claude pueda "verlo".
Version de youtube-reader: localiza ffmpeg aunque no este en PATH (usa el
binario de imageio-ffmpeg), no depende de ffprobe y permite acotar un tramo.

Uso:
    python3 sample_frames.py <video> <out_dir> [--max-frames 12] [--start SEG] [--end SEG]

Estrategia: siempre incluye el primer y el ultimo fotograma del tramo y reparte
el resto de forma uniforme. Con --start/--end se re-muestrea un instante
concreto con mas densidad sin inundar el contexto con imagenes de todo el video.
"""
import argparse
import json
import os
import re
import shutil
import subprocess
import sys


def ffmpeg_exe() -> str:
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg  # type: ignore
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("No hay ffmpeg. Ejecuta: pip install imageio-ffmpeg")


def probe(ff: str, video: str) -> dict:
    """Duracion/resolucion/audio leyendo el stderr de ffmpeg -i (no requiere ffprobe)."""
    r = subprocess.run([ff, "-hide_banner", "-i", video], capture_output=True, text=True)
    err = r.stderr
    dur = 0.0
    m = re.search(r"Duration:\s*(\d+):(\d{2}):(\d{2})\.(\d+)", err)
    if m:
        h, mi, s, frac = m.groups()
        dur = int(h) * 3600 + int(mi) * 60 + int(s) + float("0." + frac)
    res = re.search(r"Video:.*?(\d{2,5})x(\d{2,5})", err)
    return {
        "duration_sec": round(dur, 2),
        "width": int(res.group(1)) if res else None,
        "height": int(res.group(2)) if res else None,
        "has_audio": "Audio:" in err,
    }


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("out_dir")
    ap.add_argument("--max-frames", type=int, default=12)
    ap.add_argument("--start", type=float, default=0.0)
    ap.add_argument("--end", type=float, default=None)
    a = ap.parse_args()

    ff = ffmpeg_exe()
    info = probe(ff, a.video)
    os.makedirs(a.out_dir, exist_ok=True)
    dur = info["duration_sec"] or 1.0
    start = max(0.0, a.start)
    end = min(dur, a.end) if a.end else dur
    span = max(end - start, 0.1)

    n = max(2, min(a.max_frames, int(span // 2) + 2)) if span > 4 else 2
    step = span / (n - 1)
    stamps = sorted({round(min(start + i * step, end - 0.05), 2) for i in range(n)})

    frames = []
    for idx, ts in enumerate(stamps, 1):
        out = os.path.join(a.out_dir, f"frame_{idx:03d}_t{ts:07.2f}s.jpg")
        subprocess.run([ff, "-hide_banner", "-loglevel", "error", "-y", "-ss", str(ts),
                        "-i", a.video, "-frames:v", "1", "-q:v", "3", out],
                       capture_output=True, text=True)
        if os.path.exists(out):
            frames.append({"t": ts, "path": out})

    print(json.dumps({"video_info": info, "range": [start, end], "frames": frames},
                     indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
