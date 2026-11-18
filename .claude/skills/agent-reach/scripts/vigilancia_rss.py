#!/usr/bin/env python3
"""
vigilancia_rss.py — digest de novedades normativas y sectoriales para INNOVAQ.

Lee una lista de feeds RSS/Atom (por defecto, fuentes peruanas de trabajo,
fiscalización laboral, minería y normas legales), filtra por palabras clave y
escribe un digest en Markdown listo para pegar en un informe o en una tarea
programada. Solo usa la biblioteca estándar: corre en cualquier Python 3.

Uso:
  python3 vigilancia_rss.py                       # últimas 72 h, fuentes por defecto
  python3 vigilancia_rss.py --hours 168 --out digest.md
  python3 vigilancia_rss.py --feeds mis_fuentes.txt --keywords "SST,ISO 45001,MINTRA"
  python3 vigilancia_rss.py --feeds - < fuentes.txt   # feeds por stdin (útil para probar)

Las URLs de las fuentes por defecto son las rutas RSS públicas de gob.pe y
El Peruano vigentes al crear el script; si alguna cambia, edita FUENTES o pasa
--feeds. Con --verbose se ven los errores por fuente.
"""
import argparse
import datetime as dt
import email.utils
import re
import sys
import urllib.error
import urllib.request
import xml.etree.ElementTree as ET

FUENTES = [
    ("MTPE — Ministerio de Trabajo", "https://www.gob.pe/institucion/mtpe/noticias.rss"),
    ("SUNAFIL", "https://www.gob.pe/institucion/sunafil/noticias.rss"),
    ("MINEM — Ministerio de Energía y Minas", "https://www.gob.pe/institucion/minem/noticias.rss"),
    ("OSINERGMIN", "https://www.gob.pe/institucion/osinergmin/noticias.rss"),
    ("Normas legales — El Peruano", "https://busquedas.elperuano.pe/rss"),
    ("INACAL", "https://www.gob.pe/institucion/inacal/noticias.rss"),
]

KEYWORDS = [
    "seguridad y salud", "sst", "ssoma", "sunafil", "fiscalizaci", "mintra",
    "iso 45001", "iso 9001", "iso 14001", "auditor", "minería", "minera", "construcci",
    "ley 29783", "d.s.", "decreto supremo", "resoluci", "reglamento", "capacitaci",
    "accidente", "inspecci", "multa", "haccp", "inocuidad", "catastro", "agro",
]

NS = {"atom": "http://www.w3.org/2005/Atom"}


def fetch(url, timeout=25):
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0 (INNOVAQ vigilancia)"})
    with urllib.request.urlopen(req, timeout=timeout) as r:
        return r.read()


def parse_date(s):
    if not s:
        return None
    try:
        return email.utils.parsedate_to_datetime(s)
    except Exception:
        pass
    try:
        return dt.datetime.fromisoformat(s.replace("Z", "+00:00"))
    except Exception:
        return None


def text(el, *names):
    for n in names:
        x = el.find(n, NS) if ":" in n else el.find(n)
        if x is not None and (x.text or x.get("href")):
            return (x.text or x.get("href")).strip()
    return ""


def parse_feed(raw):
    root = ET.fromstring(raw)
    items = []
    # RSS 2.0
    for it in root.iter("item"):
        items.append({
            "title": text(it, "title"),
            "link": text(it, "link"),
            "date": parse_date(text(it, "pubDate", "{http://purl.org/dc/elements/1.1/}date")),
            "summary": re.sub(r"<[^>]+>", " ", text(it, "description"))[:400],
        })
    # Atom
    for it in root.iter("{http://www.w3.org/2005/Atom}entry"):
        items.append({
            "title": text(it, "atom:title"),
            "link": text(it, "atom:link"),
            "date": parse_date(text(it, "atom:updated", "atom:published")),
            "summary": re.sub(r"<[^>]+>", " ", text(it, "atom:summary", "atom:content"))[:400],
        })
    return items


def load_feeds(path):
    src = sys.stdin if path == "-" else open(path, encoding="utf-8")
    feeds = []
    for line in src:
        line = line.strip()
        if not line or line.startswith("#"):
            continue
        if "|" in line:
            name, url = (p.strip() for p in line.split("|", 1))
        else:
            name, url = line, line
        feeds.append((name, url))
    return feeds


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--hours", type=int, default=72, help="ventana temporal hacia atrás")
    ap.add_argument("--feeds", help="archivo con 'Nombre | URL' por línea, o '-' para stdin")
    ap.add_argument("--keywords", help="lista separada por comas; sustituye las predefinidas")
    ap.add_argument("--all", action="store_true", help="no filtrar por palabras clave")
    ap.add_argument("--out", help="archivo Markdown de salida (por defecto, stdout)")
    ap.add_argument("--verbose", action="store_true")
    a = ap.parse_args()

    feeds = load_feeds(a.feeds) if a.feeds else FUENTES
    kws = [k.strip().lower() for k in a.keywords.split(",")] if a.keywords else KEYWORDS
    since = dt.datetime.now(dt.timezone.utc) - dt.timedelta(hours=a.hours)

    sections, errors, total = [], [], 0
    for name, url in feeds:
        try:
            items = parse_feed(fetch(url))
        except (urllib.error.URLError, ET.ParseError, TimeoutError, OSError) as e:
            errors.append(f"{name}: {type(e).__name__} {e}")
            continue
        keep = []
        for it in items:
            d = it["date"]
            if d and d.tzinfo is None:
                d = d.replace(tzinfo=dt.timezone.utc)
            if d and d < since:
                continue
            blob = f"{it['title']} {it['summary']}".lower()
            if a.all or any(k in blob for k in kws):
                keep.append((d, it))
        keep.sort(key=lambda x: x[0] or dt.datetime.min.replace(tzinfo=dt.timezone.utc), reverse=True)
        total += len(keep)
        if keep:
            lines = [f"### {name} ({len(keep)})"]
            for d, it in keep:
                when = d.strftime("%Y-%m-%d") if d else "s/f"
                lines.append(f"- **{when}** [{it['title']}]({it['link']})")
                if it["summary"]:
                    lines.append(f"  {it['summary'].strip()}")
            sections.append("\n".join(lines))

    hoy = dt.datetime.now().strftime("%Y-%m-%d %H:%M")
    head = [f"# Vigilancia normativa y sectorial — {hoy}",
            f"Ventana: últimas {a.hours} h · Fuentes consultadas: {len(feeds)} · "
            f"Novedades relevantes: {total}", ""]
    body = "\n\n".join(sections) if sections else "_Sin novedades que coincidan con las palabras clave._"
    tail = ""
    if errors:
        tail = "\n\n### Fuentes no disponibles\n" + "\n".join(f"- {e}" for e in errors)
        if not a.verbose:
            tail = f"\n\n_{len(errors)} fuente(s) no respondieron; usa --verbose para el detalle._"
    md = "\n".join(head) + body + tail + "\n"

    if a.out:
        open(a.out, "w", encoding="utf-8").write(md)
        print(f"Digest escrito en {a.out} ({total} novedades, {len(errors)} fuentes con error)")
    else:
        sys.stdout.write(md)
    sys.exit(0 if not errors or total else 1)


if __name__ == "__main__":
    main()
