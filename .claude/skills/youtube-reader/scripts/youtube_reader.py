#!/usr/bin/env python3
"""
Lee un video de YouTube a partir de su transcripción (subtítulos) y metadatos.

Uso:
    python3 youtube_reader.py <url_o_id> [--out-dir DIR] [--langs es,en]

Genera:
    <out_dir>/<video_id>.json   metadatos + segmentos de transcripción
    <out_dir>/<video_id>.md     documento legible para que Claude lo lea

Imprime en stdout un JSON corto con el estado. Códigos de salida:
    0  éxito (con o sin transcripción; ver "transcript_source")
    2  red bloqueada hacia YouTube (proxy 403)
    3  URL inválida
    4  error inesperado
"""
import argparse
import json
import os
import re
import sys
from urllib.parse import parse_qs, urlparse

VIDEO_ID_RE = re.compile(r"^[A-Za-z0-9_-]{11}$")


def extract_video_id(url_or_id: str) -> str:
    s = url_or_id.strip()
    if VIDEO_ID_RE.match(s):
        return s
    u = urlparse(s if "://" in s else "https://" + s)
    host = (u.netloc or "").lower().replace("www.", "").replace("m.", "")
    path = u.path or ""
    if host == "youtu.be":
        cand = path.strip("/").split("/")[0]
    elif host.endswith("youtube.com"):
        qs = parse_qs(u.query)
        if "v" in qs:
            cand = qs["v"][0]
        else:
            parts = [p for p in path.split("/") if p]
            # /live/<id>, /shorts/<id>, /embed/<id>, /v/<id>
            cand = parts[1] if len(parts) >= 2 and parts[0] in ("live", "shorts", "embed", "v") else ""
    else:
        cand = ""
    if not VIDEO_ID_RE.match(cand or ""):
        raise ValueError(f"No se pudo extraer un video id de: {url_or_id}")
    return cand


def is_network_block(exc: BaseException) -> bool:
    msg = str(exc)
    return ("403" in msg and ("Tunnel" in msg or "CONNECT" in msg or "proxy" in msg.lower())) or \
        "EGRESS_BLOCKED" in msg or "Unable to connect to proxy" in msg


def fetch_transcript(video_id: str, langs: list[str]) -> tuple[list[dict], str | None]:
    """Devuelve (segmentos, fuente). Fuente ej. 'manual:es' o 'auto:en'. Lanza si hay bloqueo de red."""
    try:
        from youtube_transcript_api import YouTubeTranscriptApi  # type: ignore
    except ImportError:
        return [], None
    api = YouTubeTranscriptApi()
    try:
        tlist = api.list(video_id)
    except Exception as e:  # noqa: BLE001
        if is_network_block(e):
            raise
        return [], None
    chosen = None
    for code in langs:
        for t in tlist:
            if t.language_code.split("-")[0] == code and not t.is_generated:
                chosen = t
                break
        if chosen:
            break
    if not chosen:
        for code in langs:
            for t in tlist:
                if t.language_code.split("-")[0] == code and t.is_generated:
                    chosen = t
                    break
            if chosen:
                break
    if not chosen:
        chosen = next(iter(tlist), None)
    if not chosen:
        return [], None
    fetched = chosen.fetch()
    segs = [{"start": round(s.start, 2), "duration": round(s.duration, 2), "text": s.text.strip()}
            for s in fetched if s.text.strip()]
    kind = "auto" if chosen.is_generated else "manual"
    return segs, f"{kind}:{chosen.language_code}"


def fetch_metadata(video_id: str, langs: list[str], want_subs: bool) -> tuple[dict, list[dict], str | None]:
    """Metadatos con yt-dlp. Si want_subs, intenta también bajar subtítulos (json3) como fallback."""
    try:
        import yt_dlp  # type: ignore
    except ImportError:
        return {}, [], None
    opts = {"quiet": True, "no_warnings": True, "skip_download": True}
    if want_subs:
        opts.update({"writesubtitles": True, "writeautomaticsub": True,
                     "subtitleslangs": langs + ["-live_chat"], "subtitlesformat": "json3"})
    with yt_dlp.YoutubeDL(opts) as ydl:
        info = ydl.extract_info(f"https://www.youtube.com/watch?v={video_id}", download=False)
    meta = {
        "id": info.get("id"),
        "title": info.get("title"),
        "channel": info.get("channel") or info.get("uploader"),
        "channel_url": info.get("channel_url") or info.get("uploader_url"),
        "upload_date": info.get("upload_date"),
        "release_timestamp": info.get("release_timestamp"),
        "duration_sec": info.get("duration"),
        "view_count": info.get("view_count"),
        "is_live": info.get("is_live"),
        "was_live": info.get("was_live"),
        "live_status": info.get("live_status"),
        "description": info.get("description") or "",
        "chapters": [{"start": c.get("start_time"), "end": c.get("end_time"), "title": c.get("title")}
                     for c in (info.get("chapters") or [])],
        "tags": info.get("tags") or [],
        "webpage_url": info.get("webpage_url"),
    }
    segs: list[dict] = []
    source = None
    if want_subs:
        subs = info.get("subtitles") or {}
        auto = info.get("automatic_captions") or {}
        for kind, table in (("manual", subs), ("auto", auto)):
            for code in langs + list(table.keys()):
                if code in table:
                    entry = next((f for f in table[code] if f.get("ext") == "json3"), None)
                    if not entry:
                        continue
                    try:
                        import urllib.request
                        with urllib.request.urlopen(entry["url"], timeout=30) as r:
                            data = json.load(r)
                        for ev in data.get("events", []):
                            text = "".join(s.get("utf8", "") for s in ev.get("segs", [])).strip()
                            if text and text != "\n":
                                segs.append({"start": round(ev.get("tStartMs", 0) / 1000, 2),
                                             "duration": round(ev.get("dDurationMs", 0) / 1000, 2),
                                             "text": text.replace("\n", " ")})
                        source = f"{kind}:{code}"
                        break
                    except Exception:  # noqa: BLE001
                        continue
            if source:
                break
    return meta, segs, source


def mmss(sec: float) -> str:
    sec = int(sec or 0)
    h, rem = divmod(sec, 3600)
    m, s = divmod(rem, 60)
    return f"{h}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"


def render_markdown(meta: dict, segs: list[dict], source: str | None, video_id: str, block_sec: int = 60) -> str:
    out = []
    title = meta.get("title") or f"YouTube {video_id}"
    out.append(f"# {title}\n")
    out.append(f"- URL: https://www.youtube.com/watch?v={video_id}")
    if meta.get("channel"):
        out.append(f"- Canal: {meta['channel']}")
    if meta.get("upload_date"):
        d = meta["upload_date"]
        out.append(f"- Fecha: {d[:4]}-{d[4:6]}-{d[6:]}")
    if meta.get("duration_sec"):
        out.append(f"- Duración: {mmss(meta['duration_sec'])}")
    if meta.get("live_status"):
        out.append(f"- Estado: {meta['live_status']}")
    if meta.get("view_count") is not None:
        out.append(f"- Vistas: {meta['view_count']}")
    out.append(f"- Transcripción: {source or 'no disponible'}\n")
    if meta.get("description"):
        out.append("## Descripción\n")
        out.append(meta["description"].strip() + "\n")
    if meta.get("chapters"):
        out.append("## Capítulos\n")
        for c in meta["chapters"]:
            out.append(f"- [{mmss(c['start'])}] {c['title']}")
        out.append("")
    out.append("## Transcripción\n")
    if not segs:
        out.append("_No hay subtítulos disponibles para este video._")
        return "\n".join(out) + "\n"
    block_start = None
    buf: list[str] = []
    for s in segs:
        b = int(s["start"] // block_sec) * block_sec
        if block_start is None:
            block_start = b
        if b != block_start:
            out.append(f"**[{mmss(block_start)}]** " + " ".join(buf) + "\n")
            buf = []
            block_start = b
        buf.append(s["text"])
    if buf:
        out.append(f"**[{mmss(block_start)}]** " + " ".join(buf) + "\n")
    return "\n".join(out) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("url")
    ap.add_argument("--out-dir", default="/tmp/youtube-reader")
    ap.add_argument("--langs", default="es,en")
    ap.add_argument("--no-metadata", action="store_true", help="omite yt-dlp (solo transcripción)")
    args = ap.parse_args()

    try:
        video_id = extract_video_id(args.url)
    except ValueError as e:
        print(json.dumps({"status": "invalid_url", "error": str(e)}))
        return 3
    langs = [l.strip() for l in args.langs.split(",") if l.strip()]
    os.makedirs(args.out_dir, exist_ok=True)

    meta: dict = {}
    segs: list[dict] = []
    source: str | None = None
    errors: list[str] = []
    try:
        segs, source = fetch_transcript(video_id, langs)
    except Exception as e:  # noqa: BLE001
        if is_network_block(e):
            print(json.dumps({"status": "network_blocked", "video_id": video_id,
                              "error": "El proxy de red bloquea youtube.com (403). "
                                       "Habilita youtube.com en la política de red del entorno y reintenta."}))
            return 2
        errors.append(f"transcript_api: {e}")
    if not args.no_metadata:
        try:
            meta, segs2, source2 = fetch_metadata(video_id, langs, want_subs=not segs)
            if not segs and segs2:
                segs, source = segs2, source2
        except Exception as e:  # noqa: BLE001
            if is_network_block(e):
                print(json.dumps({"status": "network_blocked", "video_id": video_id,
                                  "error": "El proxy de red bloquea youtube.com (403). "
                                           "Habilita youtube.com en la política de red del entorno y reintenta."}))
                return 2
            errors.append(f"yt_dlp: {e}")

    if not meta and not segs:
        print(json.dumps({"status": "failed", "video_id": video_id, "errors": errors}, ensure_ascii=False))
        return 4

    json_path = os.path.join(args.out_dir, f"{video_id}.json")
    md_path = os.path.join(args.out_dir, f"{video_id}.md")
    with open(json_path, "w", encoding="utf-8") as f:
        json.dump({"video_id": video_id, "metadata": meta, "transcript_source": source,
                   "transcript": segs, "errors": errors}, f, ensure_ascii=False, indent=2)
    with open(md_path, "w", encoding="utf-8") as f:
        f.write(render_markdown(meta, segs, source, video_id))

    print(json.dumps({"status": "ok", "video_id": video_id, "title": meta.get("title"),
                      "duration": mmss(meta.get("duration_sec") or 0) if meta.get("duration_sec") else None,
                      "transcript_source": source, "transcript_segments": len(segs),
                      "output_md": md_path, "output_json": json_path, "errors": errors}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    sys.exit(main())
