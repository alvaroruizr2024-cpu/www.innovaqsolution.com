#!/usr/bin/env python3
"""
transcribe.py — transcribe audio.wav con faster-whisper (local, sin API).

Uso: python3 transcribe.py salida/audio.wav [--lang es] [--model small]
Escribe salida/transcript.txt con marcas de tiempo.

Requiere: pip install faster-whisper  (descarga el modelo de Hugging Face la
primera vez, ~250 MB para "small"). Si el entorno no tiene acceso a Hugging Face,
el script termina con código 2 y hay que usar los subtítulos grabados
(capsheet_K.jpg de extract_frames.py) como transcripción.
"""
import argparse
import os
import sys


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("audio")
    ap.add_argument("--lang", default="es")
    ap.add_argument("--model", default="small")
    a = ap.parse_args()

    try:
        from faster_whisper import WhisperModel  # type: ignore
    except ImportError:
        sys.exit("Instala faster-whisper: pip install faster-whisper")

    try:
        model = WhisperModel(a.model, device="cpu", compute_type="int8")
    except Exception as e:  # sin red a Hugging Face, proxy, etc.
        print(f"No se pudo cargar el modelo ({type(e).__name__}). "
              f"Usa los subtítulos grabados (capsheet_*.jpg).", file=sys.stderr)
        sys.exit(2)

    segs, info = model.transcribe(a.audio, language=a.lang, beam_size=5)
    lines = []
    for s in segs:
        line = f"[{s.start:6.1f}-{s.end:6.1f}] {s.text.strip()}"
        print(line)
        lines.append(line)
    out = os.path.join(os.path.dirname(os.path.abspath(a.audio)), "transcript.txt")
    open(out, "w").write("\n".join(lines) + "\n")
    print(f"\nTranscripción en {out} (idioma detectado: {info.language})")


if __name__ == "__main__":
    main()
