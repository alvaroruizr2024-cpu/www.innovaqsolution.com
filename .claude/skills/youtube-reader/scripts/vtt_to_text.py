#!/usr/bin/env python3
"""
Convierte subtitulos WebVTT (manuales o automaticos de YouTube) en texto limpio
con una marca de tiempo por bloque de N segundos. Elimina etiquetas <c>, marcas
de karaoke <00:00:01.000>, cabeceras y las lineas duplicadas que generan los
subtitulos automaticos (cada frase aparece dos veces con desplazamiento).

Uso:
    python3 vtt_to_text.py archivo.vtt [--block-sec 30] > transcript.txt
"""
import argparse
import html
import re
import sys

TS_RE = re.compile(r"(\d+):(\d{2}):(\d{2})\.(\d{3})|(\d{1,2}):(\d{2})\.(\d{3})")


def parse_ts(s: str) -> float:
    m = TS_RE.match(s.strip())
    if not m:
        return 0.0
    if m.group(1) is not None:
        h, mi, se, ms = m.group(1, 2, 3, 4)
        return int(h) * 3600 + int(mi) * 60 + int(se) + int(ms) / 1000
    mi, se, ms = m.group(5, 6, 7)
    return int(mi) * 60 + int(se) + int(ms) / 1000


def fmt(sec: float) -> str:
    sec = int(sec)
    h, m, s = sec // 3600, (sec % 3600) // 60, sec % 60
    return f"[{h:d}:{m:02d}:{s:02d}]" if h else f"[{m:02d}:{s:02d}]"


def clean_line(line: str) -> str:
    line = re.sub(r"<[^>]+>", "", line)          # <c>, <00:00:01.000>, <i>...
    line = html.unescape(line).replace("\xa0", " ")
    return re.sub(r"\s+", " ", line).strip()


def vtt_to_text(vtt: str, block_sec: int = 30) -> str:
    cues = []  # (start, text)
    lines = vtt.splitlines()
    i = 0
    while i < len(lines):
        line = lines[i]
        if "-->" in line:
            start = parse_ts(line.split("-->")[0])
            i += 1
            buf = []
            while i < len(lines) and lines[i].strip() != "":
                t = clean_line(lines[i])
                if t:
                    buf.append(t)
                i += 1
            if buf:
                cues.append((start, " ".join(buf)))
        i += 1

    # Deduplicar: los auto-subs de YouTube repiten cada frase en el cue siguiente
    # (la linea "vieja" sube y la nueva aparece debajo). Nos quedamos solo con lo nuevo.
    prev_orig = ""
    dedup = []
    for start, text in cues:
        if text == prev_orig or (prev_orig and prev_orig.endswith(text)):
            prev_orig = text
            continue
        new_text = text[len(prev_orig):].strip() if (prev_orig and text.startswith(prev_orig)) else text
        prev_orig = text
        if new_text:
            dedup.append((start, new_text))

    # Agrupar por bloques de block_sec
    out = []
    block_start = None
    block = []
    for start, text in dedup:
        if block_start is None:
            block_start = start
        if start - block_start >= block_sec and block:
            out.append(f"{fmt(block_start)} {' '.join(block)}")
            block_start, block = start, []
        block.append(text)
    if block:
        out.append(f"{fmt(block_start or 0)} {' '.join(block)}")
    return "\n".join(out)


if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("vtt")
    ap.add_argument("--block-sec", type=int, default=30)
    a = ap.parse_args()
    sys.stdout.write(vtt_to_text(open(a.vtt, encoding="utf-8").read(), a.block_sec) + "\n")
