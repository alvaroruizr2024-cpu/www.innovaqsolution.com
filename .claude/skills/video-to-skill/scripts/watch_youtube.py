#!/usr/bin/env python3
"""Ruta B de video-to-skill: Gemini como puente para leer un video de YouTube.

Uso:
  export GEMINI_API_KEY=...
  watch_youtube.py "https://www.youtube.com/watch?v=ID" [--out ficha.json] [--model gemini-2.5-flash]
                   [--start 60s --end 180s] [--fps 1] [--lang es] [--prompt "..."]
  watch_youtube.py --list-models

Solo videos públicos. Nivel gratuito: 8 h de YouTube al día. Sin dependencias fuera de la
biblioteca estándar. La llave nunca se escribe en disco ni se imprime.
"""
import argparse, json, os, sys, urllib.request, urllib.error

API = "https://generativelanguage.googleapis.com/v1beta"

PROMPT = """Eres el par de ojos de Claude. Analiza este video y devuelve SOLO un JSON con esta forma:
{
  "metadatos": {"titulo": "", "autor_o_canal": "", "duracion_s": 0, "idioma": ""},
  "guion": [{"t": "mm:ss", "texto": ""}],
  "pantalla": [{"t": "mm:ss", "que_se_ve": ""}],
  "afirmaciones": [""],
  "metodo": [""],
  "resumen": ""
}
Reglas: transcribe literalmente en el idioma original ({lang}); marca [inaudible] donde no se entienda;
en "pantalla" describe capturas, código, prompts escritos, webs y textos sobreimpresos con su tiempo;
en "metodo" lista los pasos que el video enseña en orden y con sus palabras; no inventes nada."""


def call(path, body=None, key=None):
    url = f"{API}/{path}"
    url += ("&" if "?" in url else "?") + "key=" + key
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=600) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        msg = e.read().decode(errors="replace")[:800]
        sys.exit(f"HTTP {e.code} en {path.split('?')[0]}: {msg}")
    except urllib.error.URLError as e:
        sys.exit(f"Sin salida de red hacia Gemini ({e.reason}). En el sandbox web usa la ruta C (extract_local_video.sh).")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("url", nargs="?")
    ap.add_argument("--out")
    ap.add_argument("--model", default=os.environ.get("GEMINI_MODEL", "gemini-2.5-flash"))
    ap.add_argument("--start"), ap.add_argument("--end")
    ap.add_argument("--fps", type=float)
    ap.add_argument("--lang", default="es")
    ap.add_argument("--prompt")
    ap.add_argument("--list-models", action="store_true")
    a = ap.parse_args()

    key = os.environ.get("GEMINI_API_KEY")
    if not key:
        sys.exit("Falta GEMINI_API_KEY (llave gratis en https://aistudio.google.com). Expórtala; no la pegues en el repo.")

    if a.list_models:
        r = call("models?pageSize=100", key=key)
        for m in r.get("models", []):
            if "generateContent" in m.get("supportedGenerationMethods", []):
                print(m["name"].split("/", 1)[1])
        return

    if not a.url or "youtu" not in a.url:
        sys.exit("Indica una URL pública de YouTube (para archivos locales usa extract_local_video.sh).")

    part = {"file_data": {"file_uri": a.url}}
    meta = {}
    if a.start: meta["start_offset"] = a.start
    if a.end: meta["end_offset"] = a.end
    if a.fps: meta["fps"] = a.fps
    if meta: part["video_metadata"] = meta

    body = {
        "contents": [{"parts": [part, {"text": (a.prompt or PROMPT.replace("{lang}", a.lang))}]}],
        "generationConfig": {"temperature": 0.2, "responseMimeType": "application/json"},
    }
    r = call(f"models/{a.model}:generateContent", body, key)
    try:
        text = r["candidates"][0]["content"]["parts"][0]["text"]
    except (KeyError, IndexError):
        sys.exit("Respuesta sin contenido (¿video privado, bloqueado o cuota agotada?):\n" + json.dumps(r)[:800])
    try:
        ficha = json.loads(text)
    except json.JSONDecodeError:
        ficha = {"raw": text}
    ficha["_fuente"] = {"url": a.url, "modelo": a.model, "usage": r.get("usageMetadata", {})}
    out = json.dumps(ficha, ensure_ascii=False, indent=2)
    if a.out:
        with open(a.out, "w", encoding="utf-8") as f:
            f.write(out)
        print(f"ficha guardada en {a.out} ({len(ficha.get('guion', []))} líneas de guion)")
    else:
        print(out)


if __name__ == "__main__":
    main()
