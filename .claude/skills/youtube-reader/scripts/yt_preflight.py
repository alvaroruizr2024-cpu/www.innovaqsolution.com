#!/usr/bin/env python3
"""
Preflight para leer un video de YouTube o un artefacto de NotebookLM.

1. Extrae el video_id (o el tipo de enlace) de la URL.
2. Comprueba si la red del entorno permite llegar a los hosts necesarios.
3. Localiza ffmpeg/ffprobe y yt-dlp; si faltan y PyPI es accesible, los instala
   (yt-dlp e imageio-ffmpeg, que trae un binario estatico de ffmpeg).
4. Imprime JSON con `mode`: "full" (se puede descargar) o "blocked".

Uso:
    python3 yt_preflight.py "<URL o ID>" [--workdir DIR] [--no-install]
"""
import argparse
import json
import os
import re
import shutil
import socket
import subprocess
import sys
import urllib.request
import urllib.error

YT_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


def parse_link(url: str) -> dict:
    """Devuelve {kind, video_id|notebook_id, artifact_id}."""
    url = url.strip()
    if YT_ID_RE.match(url):
        return {"kind": "youtube", "video_id": url}
    m = re.search(r"notebooklm\.google\.com/notebook/([0-9a-f-]+)(?:/artifact/([0-9a-f-]+))?", url)
    if m:
        return {"kind": "notebooklm", "notebook_id": m.group(1), "artifact_id": m.group(2)}
    patterns = [
        r"[?&]v=([A-Za-z0-9_-]{11})",
        r"youtu\.be/([A-Za-z0-9_-]{11})",
        r"youtube\.com/(?:shorts|embed|live|v)/([A-Za-z0-9_-]{11})",
    ]
    for p in patterns:
        m = re.search(p, url)
        if m:
            return {"kind": "youtube", "video_id": m.group(1)}
    return {"kind": "unknown"}


def reachable(host: str, timeout: float = 6.0) -> dict:
    """HEAD/GET via el proxy configurado (urllib respeta HTTPS_PROXY)."""
    try:
        req = urllib.request.Request(f"https://{host}/", method="GET",
                                     headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=timeout) as r:
            return {"ok": True, "status": r.status}
    except urllib.error.HTTPError as e:
        # 4xx/5xx del destino real: la red si llega. 403 del proxy CONNECT llega como URLError.
        return {"ok": e.code < 500 and e.code != 403, "status": e.code, "detail": str(e.reason)}
    except (urllib.error.URLError, socket.timeout, OSError) as e:
        return {"ok": False, "status": None, "detail": str(getattr(e, "reason", e))}


def find_ffmpeg() -> dict:
    ff = shutil.which("ffmpeg")
    fp = shutil.which("ffprobe")
    if ff:
        return {"ffmpeg": ff, "ffprobe": fp}
    try:
        import imageio_ffmpeg  # type: ignore
        ff = imageio_ffmpeg.get_ffmpeg_exe()
        # imageio-ffmpeg no incluye ffprobe; sample_frames.py usa ffmpeg para la duracion.
        return {"ffmpeg": ff, "ffprobe": fp}
    except Exception:
        return {"ffmpeg": None, "ffprobe": fp}


def find_ytdlp() -> str | None:
    exe = shutil.which("yt-dlp")
    if exe:
        return exe
    try:
        import yt_dlp  # type: ignore  # noqa: F401
        return sys.executable + " -m yt_dlp"
    except Exception:
        return None


def pip_install(pkgs: list[str]) -> bool:
    cmd = [sys.executable, "-m", "pip", "install", "-q", "--disable-pip-version-check", *pkgs]
    r = subprocess.run(cmd, capture_output=True, text=True)
    return r.returncode == 0


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("url")
    ap.add_argument("--workdir", default=None)
    ap.add_argument("--no-install", action="store_true")
    args = ap.parse_args()

    out: dict = {"input": args.url, **parse_link(args.url)}
    if args.workdir:
        os.makedirs(args.workdir, exist_ok=True)
        out["workdir"] = args.workdir

    hosts = ["www.youtube.com", "youtu.be", "rr1---sn-aigl6nsk.googlevideo.com",
             "notebooklm.google.com", "pypi.org"]
    out["reachable"] = {h: reachable(h) for h in hosts}
    yt_ok = out["reachable"]["www.youtube.com"]["ok"]
    pypi_ok = out["reachable"]["pypi.org"]["ok"]

    tools = find_ffmpeg()
    ytdlp = find_ytdlp()
    if not args.no_install and pypi_ok:
        need = []
        if not tools["ffmpeg"]:
            need.append("imageio-ffmpeg")
        if not ytdlp:
            need.append("yt-dlp")
        if need:
            out["installed"] = {"packages": need, "ok": pip_install(need)}
            tools = find_ffmpeg()
            ytdlp = find_ytdlp()
    out["tools"] = {**tools, "yt_dlp": ytdlp}

    if out["kind"] == "notebooklm":
        out["mode"] = "full" if out["reachable"]["notebooklm.google.com"]["ok"] else "blocked"
        out["note"] = ("NotebookLM requiere la sesion de Google del usuario; aun con red abierta "
                       "es probable que devuelva la pagina de login. Prioriza las alternativas.")
    elif out["kind"] == "youtube":
        out["mode"] = "full" if (yt_ok and ytdlp) else "blocked"
    else:
        out["mode"] = "blocked"
        out["note"] = "No se reconocio un ID de YouTube ni un enlace de NotebookLM en la URL."

    if out["mode"] == "blocked":
        out["fallbacks"] = [
            "Buscar el archivo fuente en Google Drive (conector, limite 10 MB por descarga) y usar video-reader",
            "Pedir al usuario la transcripcion, el resumen de NotebookLM o el titulo",
            "Habilitar youtube.com, googlevideo.com y notebooklm.google.com en la politica de red del entorno",
        ]
    print(json.dumps(out, indent=2, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
