#!/usr/bin/env python3
"""
extract_frames.py — convierte un video en hojas de contacto legibles por Claude.

Genera, en la carpeta de salida:
  frames/f_NNN.jpg        un fotograma cada N segundos (por defecto 2 s)
  sheet_K.jpg             hojas de contacto de 12 fotogramas con el tiempo impreso
  caps/c_NNN.png          tira de subtítulos (franja inferior) cada 0,5 s
  capsheet_K.jpg          hojas de contacto de las tiras (40 por hoja) con el tiempo
  audio.wav               pista de audio mono 16 kHz para transcribir
  info.txt                duración, resolución y fps

Claude lee las hojas con la herramienta Read (imágenes) y reconstruye la
transcripción a partir de los subtítulos grabados cuando no hay modelo de voz.

Requisitos: pip install imageio-ffmpeg opencv-python-headless
Uso:        python3 extract_frames.py VIDEO.mp4 --out ./salida [--every 2] [--cap-band 0.43,0.55]
"""
import argparse
import glob
import os
import shutil
import subprocess
import sys


def ffmpeg_bin():
    exe = shutil.which("ffmpeg")
    if exe:
        return exe
    try:
        import imageio_ffmpeg  # type: ignore
        return imageio_ffmpeg.get_ffmpeg_exe()
    except Exception:
        sys.exit("No hay ffmpeg. Instala con: pip install imageio-ffmpeg")


def run(cmd):
    r = subprocess.run(cmd, capture_output=True, text=True)
    if r.returncode != 0:
        sys.exit(f"Fallo: {' '.join(cmd)}\n{r.stderr[-800:]}")
    return r


def probe(ff, video):
    r = subprocess.run([ff, "-i", video], capture_output=True, text=True)
    lines = [l.strip() for l in r.stderr.splitlines() if "Duration" in l or "Stream" in l]
    return "\n".join(lines)


def sheets(pattern, out_prefix, cols, per_sheet, scale, seconds_per_frame):
    import cv2  # type: ignore
    import numpy as np  # type: ignore

    files = sorted(glob.glob(pattern))
    if not files:
        return 0
    imgs = [cv2.imread(f) for f in files]
    h, w = imgs[0].shape[:2]
    tw, th = int(w * scale), int(h * scale)
    imgs = [cv2.resize(i, (tw, th)) for i in imgs]
    for s in range(0, len(imgs), per_sheet):
        chunk = imgs[s:s + per_sheet]
        rows = (len(chunk) + cols - 1) // cols
        canvas = np.zeros((rows * th, cols * tw, 3), np.uint8)
        for k, im in enumerate(chunk):
            r, c = divmod(k, cols)
            canvas[r * th:(r + 1) * th, c * tw:(c + 1) * tw] = im
            t = (s + k) * seconds_per_frame
            cv2.putText(canvas, f"t={t:g}s", (c * tw + 5, r * th + 22),
                        cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 255), 2)
        cv2.imwrite(f"{out_prefix}_{s // per_sheet}.jpg", canvas)
    return len(imgs)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("video")
    ap.add_argument("--out", default="video-analysis")
    ap.add_argument("--every", type=float, default=2.0, help="segundos entre fotogramas")
    ap.add_argument("--cap-band", default="0.43,0.55",
                    help="franja vertical (fracciones de la altura) donde están los subtítulos")
    ap.add_argument("--no-audio", action="store_true")
    a = ap.parse_args()

    ff = ffmpeg_bin()
    out = os.path.abspath(a.out)
    os.makedirs(f"{out}/frames", exist_ok=True)
    os.makedirs(f"{out}/caps", exist_ok=True)

    info = probe(ff, a.video)
    open(f"{out}/info.txt", "w").write(info + "\n")
    print(info)

    # Fotogramas completos
    run([ff, "-loglevel", "error", "-y", "-i", a.video,
         "-vf", f"fps=1/{a.every},scale=960:-1", f"{out}/frames/f_%03d.jpg"])
    n = sheets(f"{out}/frames/f_*.jpg", f"{out}/sheet", cols=6, per_sheet=12, scale=0.5,
               seconds_per_frame=a.every)
    print(f"{n} fotogramas → hojas sheet_K.jpg")

    # Tiras de subtítulos (2 por segundo)
    y0, y1 = (float(x) for x in a.cap_band.split(","))
    run([ff, "-loglevel", "error", "-y", "-i", a.video,
         "-vf", f"fps=2,crop=iw:ih*{y1 - y0:.3f}:0:ih*{y0:.3f},scale=576:-1",
         f"{out}/caps/c_%03d.png"])
    m = sheets(f"{out}/caps/c_*.png", f"{out}/capsheet", cols=4, per_sheet=40, scale=1.0,
               seconds_per_frame=0.5)
    print(f"{m} tiras de subtítulos → hojas capsheet_K.jpg")

    if not a.no_audio:
        run([ff, "-loglevel", "error", "-y", "-i", a.video, "-vn", "-ac", "1", "-ar", "16000",
             f"{out}/audio.wav"])
        print("audio.wav listo para transcribe.py")

    print(f"\nSalida en {out}. Lee sheet_*.jpg y capsheet_*.jpg con Read.")


if __name__ == "__main__":
    main()
