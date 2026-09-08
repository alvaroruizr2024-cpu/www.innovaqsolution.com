#!/usr/bin/env python3
"""
Descarga metadatos, subtitulos y (opcionalmente) el video de YouTube con yt-dlp.

Uso:
    python3 yt_fetch.py "<URL o ID>" --workdir DIR [--no-video] [--max-height 480]
                        [--langs es,en] [--cookies FILE]

Genera en --workdir:
    info.json        metadatos depurados (titulo, canal, fecha, duracion, descripcion, capitulos, tags, miniatura)
    subs/*.vtt       subtitulos crudos por idioma (manuales o automaticos)
    transcript.txt   transcripcion limpia con marcas de tiempo cada ~30 s (mejor idioma disponible)
    video.mp4        solo si no se pasa --no-video
"""
import argparse
import glob
import json
import os
import re
import shutil
import subprocess
import sys

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from yt_preflight import parse_link, find_ffmpeg  # noqa: E402
from vtt_to_text import vtt_to_text  # noqa: E402


def ytdlp_cmd() -> list[str]:
    exe = shutil.which("yt-dlp")
    if exe:
        return [exe]
    return [sys.executable, "-m", "yt_dlp"]


def run(cmd: list[str]) -> subprocess.CompletedProcess:
    return subprocess.run(cmd, capture_output=True, text=True)


def fmt_duration(sec) -> str:
    if not sec:
        return ""
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    return f"{h:d}:{m:02d}:{s:02d}" if h else f"{m:d}:{s:02d}"


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--workdir", required=True)
    ap.add_argument("--no-video", action="store_true")
    ap.add_argument("--max-height", type=int, default=480)
    ap.add_argument("--langs", default="es,en")
    ap.add_argument("--cookies", default=None)
    args = ap.parse_args()

    link = parse_link(args.url)
    if link.get("kind") != "youtube":
        print(json.dumps({"error": "La URL no es un video de YouTube", **link}, ensure_ascii=False))
        return 2
    vid = link["video_id"]
    url = f"https://www.youtube.com/watch?v={vid}"
    wd = args.workdir
    os.makedirs(os.path.join(wd, "subs"), exist_ok=True)

    ff = find_ffmpeg()
    base = ytdlp_cmd() + ["--no-playlist", "--no-warnings", "--js-runtimes", "node"]
    if ff.get("ffmpeg"):
        base += ["--ffmpeg-location", os.path.dirname(ff["ffmpeg"])]
    if args.cookies:
        base += ["--cookies", args.cookies]

    # 1) Metadatos + subtitulos (sin video)
    langs = args.langs.split(",")
    sub_langs = ",".join(langs + [f"{l}-orig" for l in langs])
    cmd = base + [
        "--skip-download", "--write-info-json", "--write-subs", "--write-auto-subs",
        "--sub-langs", sub_langs, "--sub-format", "vtt",
        "-o", os.path.join(wd, "subs", "%(id)s.%(ext)s"), url,
    ]
    r = run(cmd)
    if r.returncode != 0:
        blocked = "403" in r.stderr and "proxy" in r.stderr.lower()
        print(json.dumps({"error": "yt-dlp fallo obteniendo metadatos",
                          "network_blocked": blocked,
                          "hint": "La red del entorno bloquea YouTube: sigue references/fallbacks.md" if blocked else None,
                          "stderr": r.stderr[-600:]}, ensure_ascii=False))
        return 1

    raw_path = os.path.join(wd, "subs", f"{vid}.info.json")
    raw = json.load(open(raw_path, encoding="utf-8")) if os.path.exists(raw_path) else {}
    info = {
        "video_id": vid,
        "url": url,
        "title": raw.get("title"),
        "channel": raw.get("channel") or raw.get("uploader"),
        "channel_url": raw.get("channel_url"),
        "upload_date": raw.get("upload_date"),
        "duration_sec": raw.get("duration"),
        "duration": fmt_duration(raw.get("duration")),
        "view_count": raw.get("view_count"),
        "description": raw.get("description"),
        "chapters": [{"start": fmt_duration(c.get("start_time")), "title": c.get("title")}
                     for c in (raw.get("chapters") or [])],
        "tags": raw.get("tags") or [],
        "thumbnail": raw.get("thumbnail"),
        "language": raw.get("language"),
        "subtitles_manual": sorted((raw.get("subtitles") or {}).keys()),
        "subtitles_auto": sorted((raw.get("automatic_captions") or {}).keys())[:20],
    }
    json.dump(info, open(os.path.join(wd, "info.json"), "w", encoding="utf-8"),
              indent=2, ensure_ascii=False)

    # 2) Elegir el mejor VTT: manual en idioma preferido > automatico en idioma preferido
    vtts = glob.glob(os.path.join(wd, "subs", f"{vid}.*.vtt"))
    chosen = None
    manual = set(info["subtitles_manual"])
    for lang in langs:
        for path in vtts:
            m = re.search(rf"\.{re.escape(lang)}(-orig)?\.vtt$", path)
            if m and lang in manual:
                chosen = path
                break
        if chosen:
            break
    if not chosen:
        for lang in langs:
            for path in vtts:
                if re.search(rf"\.{re.escape(lang)}(-orig)?\.vtt$", path):
                    chosen = path
                    break
            if chosen:
                break
    if not chosen and vtts:
        chosen = vtts[0]

    transcript_path = None
    if chosen:
        text = vtt_to_text(open(chosen, encoding="utf-8").read(), block_sec=30)
        transcript_path = os.path.join(wd, "transcript.txt")
        with open(transcript_path, "w", encoding="utf-8") as f:
            f.write(f"# {info['title']}\n# {info['channel']} · {info['duration']} · fuente: "
                    f"{os.path.basename(chosen)}\n\n{text}")

    # 3) Video (opcional)
    video_path = None
    if not args.no_video:
        out_tpl = os.path.join(wd, "video.%(ext)s")
        fmt = f"bv*[height<={args.max_height}][ext=mp4]+ba[ext=m4a]/b[height<={args.max_height}]/b"
        r = run(base + ["-f", fmt, "--merge-output-format", "mp4", "-o", out_tpl, url])
        cands = glob.glob(os.path.join(wd, "video.*"))
        if r.returncode == 0 and cands:
            video_path = cands[0]
        else:
            info["video_error"] = r.stderr[-800:]

    summary = {
        "title": info["title"], "channel": info["channel"], "duration": info["duration"],
        "upload_date": info["upload_date"], "chapters": len(info["chapters"]),
        "transcript": transcript_path, "transcript_source": os.path.basename(chosen) if chosen else None,
        "video": video_path, "info_json": os.path.join(wd, "info.json"),
        "video_error": info.get("video_error"),
    }
    print(json.dumps(summary, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
