#!/usr/bin/env python3
"""Lanza un actor de Apify, descarga su dataset y lo normaliza a un CSV de leads.

Uso (desde la raíz del repo, con APIFY_TOKEN en el entorno):

  # Google Maps: 50 dentistas de Madrid con teléfonos, correos y redes
  python3 .claude/skills/apify-leads/scripts/apify_leads.py run \
      --query "dentista" --location "Madrid, España" --max 50 \
      --out leads/dentistas-madrid-20260919

  # Cualquier otro actor con su propio input
  python3 .claude/skills/apify-leads/scripts/apify_leads.py run \
      --actor apify~instagram-scraper --input-json input.json --out leads/ig-marcas

  # Recuperar un run ya terminado
  python3 .claude/skills/apify-leads/scripts/apify_leads.py fetch --run-id <id> --out leads/x

  # Normalizar un dataset descargado a mano desde la consola de Apify
  python3 .claude/skills/apify-leads/scripts/apify_leads.py normalize --json dataset.json --out leads/x

Solo usa la librería estándar. El token nunca se imprime ni se escribe en disco.
"""
from __future__ import annotations

import argparse
import csv
import json
import os
import re
import sys
import time
import urllib.error
import urllib.parse
import urllib.request

API = "https://api.apify.com/v2"
GOOGLE_MAPS_ACTOR = "compass~crawler-google-places"
POLL_SECONDS = 10
MAX_WAIT_SECONDS = 20 * 60

COLUMNS = [
    "nombre", "categoria", "telefono", "correo", "web", "direccion", "ciudad",
    "rating", "resenas", "instagram", "facebook", "linkedin", "maps_url", "estado",
]

# Correos que salen del scraping pero no son del negocio.
EMAIL_BLOCKLIST = re.compile(
    r"(sentry|wixpress|wix\.com|squarespace|godaddy|example\.com|noreply|no-reply|"
    r"donotreply|\.png$|\.jpg$|\.gif$|\.webp$)", re.I,
)


# ----------------------------------------------------------------------------- API

def token() -> str:
    t = os.environ.get("APIFY_TOKEN", "").strip()
    if not t:
        sys.exit("Falta APIFY_TOKEN en el entorno. Créalo en apify.com → Settings → Integrations.")
    return t


def request(method: str, path: str, body: dict | None = None, params: dict | None = None):
    params = dict(params or {})
    params["token"] = token()
    url = f"{API}{path}?{urllib.parse.urlencode(params)}"
    data = json.dumps(body).encode() if body is not None else None
    req = urllib.request.Request(url, data=data, method=method,
                                 headers={"Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(req, timeout=120) as r:
            return json.loads(r.read().decode())
    except urllib.error.HTTPError as e:
        detail = e.read().decode(errors="replace")[:400]
        sys.exit(f"Apify respondió {e.code} en {method} {path}: {detail}")


def google_maps_input(query: str, location: str, max_places: int, language: str,
                      contacts: bool) -> dict:
    """Input del actor compass/crawler-google-places.

    Los nombres de campo se escribieron sin acceso a apify.com; confírmalos en la
    pestaña Input del actor antes de la primera ejecución (ver references/actores.md).
    """
    return {
        "searchStringsArray": [q.strip() for q in query.split("|") if q.strip()],
        "locationQuery": location,
        "maxCrawledPlacesPerSearch": max_places,
        "language": language,
        "skipClosedPlaces": True,
        "scrapeContacts": contacts,
        "website": "allPlaces",
        "maxReviews": 0,
        "maxImages": 0,
    }


def start_run(actor: str, run_input: dict) -> dict:
    data = request("POST", f"/acts/{actor}/runs", body=run_input)["data"]
    print(f"Run {data['id']} lanzado para {actor} (dataset {data['defaultDatasetId']})")
    return data


def wait_run(run_id: str) -> dict:
    started = time.time()
    while True:
        data = request("GET", f"/actor-runs/{run_id}")["data"]
        status = data["status"]
        if status in ("SUCCEEDED",):
            return data
        if status in ("FAILED", "ABORTED", "TIMED-OUT"):
            sys.exit(f"El run {run_id} terminó en estado {status}. Revísalo en la consola de Apify.")
        if time.time() - started > MAX_WAIT_SECONDS:
            sys.exit(f"El run {run_id} sigue en {status} tras {MAX_WAIT_SECONDS // 60} min; "
                     f"recupéralo luego con: fetch --run-id {run_id}")
        print(f"  {status}… ({int(time.time() - started)} s)")
        time.sleep(POLL_SECONDS)


def dataset_items(dataset_id: str) -> list[dict]:
    items: list[dict] = []
    offset = 0
    while True:
        page = request("GET", f"/datasets/{dataset_id}/items",
                       params={"format": "json", "clean": "true", "offset": offset, "limit": 1000})
        if not isinstance(page, list):
            page = page.get("items", [])
        items.extend(page)
        if len(page) < 1000:
            return items
        offset += 1000


# ------------------------------------------------------------------- normalización

def first(value):
    if isinstance(value, list):
        return value[0] if value else ""
    return value or ""


def pick_email(raw: dict) -> str:
    candidates = raw.get("emails") or []
    if isinstance(candidates, str):
        candidates = [candidates]
    for e in candidates:
        e = str(e).strip().lower()
        if "@" in e and not EMAIL_BLOCKLIST.search(e):
            return e
    return ""


def normalize_item(raw: dict) -> dict:
    """Aplana un elemento de Google Maps Scraper (u otro actor con campos parecidos)."""
    phone = raw.get("phoneUnformatted") or raw.get("phone") or raw.get("telefono") or ""
    closed = raw.get("permanentlyClosed") or raw.get("temporarilyClosed")
    return {
        "nombre": raw.get("title") or raw.get("name") or raw.get("fullName") or "",
        "categoria": raw.get("categoryName") or first(raw.get("categories")) or "",
        "telefono": str(phone).replace(" ", ""),
        "correo": pick_email(raw) or (raw.get("email") or ""),
        "web": raw.get("website") or raw.get("url_website") or "",
        "direccion": raw.get("address") or raw.get("street") or "",
        "ciudad": raw.get("city") or raw.get("location") or "",
        "rating": raw.get("totalScore") or raw.get("rating") or "",
        "resenas": raw.get("reviewsCount") or "",
        "instagram": first(raw.get("instagrams")) or raw.get("instagram") or "",
        "facebook": first(raw.get("facebooks")) or raw.get("facebook") or "",
        "linkedin": first(raw.get("linkedIns")) or raw.get("linkedin") or raw.get("profileUrl") or "",
        "maps_url": raw.get("url") or "",
        "estado": "cerrado" if closed else "nuevo",
    }


def dedupe(rows: list[dict]) -> list[dict]:
    seen: set[str] = set()
    out: list[dict] = []
    for r in rows:
        key = r["telefono"] or r["web"].lower().rstrip("/") or r["nombre"].lower()
        if not key or key in seen:
            continue
        seen.add(key)
        out.append(r)
    return out


def write_outputs(items: list[dict], out: str) -> None:
    os.makedirs(os.path.dirname(out) or ".", exist_ok=True)
    with open(f"{out}.json", "w", encoding="utf-8") as f:
        json.dump(items, f, ensure_ascii=False, indent=1)
    rows = dedupe([normalize_item(i) for i in items])
    with open(f"{out}.csv", "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=COLUMNS)
        w.writeheader()
        w.writerows(rows)
    with_phone = sum(1 for r in rows if r["telefono"])
    with_email = sum(1 for r in rows if r["correo"])
    with_web = sum(1 for r in rows if r["web"])
    print(f"\n{len(items)} elementos crudos → {len(rows)} leads únicos")
    print(f"  con teléfono: {with_phone}   con correo: {with_email}   con web: {with_web}")
    print(f"  {out}.json (crudo)\n  {out}.csv (normalizado)")
    for r in rows[:3]:
        print(f"  · {r['nombre']} | {r['telefono']} | {r['correo']} | {r['web']}")


# ------------------------------------------------------------------------- CLI

def cmd_run(a: argparse.Namespace) -> None:
    if a.input_json:
        with open(a.input_json, encoding="utf-8") as f:
            run_input = json.load(f)
    else:
        if not (a.query and a.location):
            sys.exit("Indica --query y --location (o --input-json para otro actor).")
        run_input = google_maps_input(a.query, a.location, a.max, a.language, not a.no_contacts)
    run = start_run(a.actor, run_input)
    run = wait_run(run["id"])
    write_outputs(dataset_items(run["defaultDatasetId"]), a.out)


def cmd_fetch(a: argparse.Namespace) -> None:
    run = wait_run(a.run_id)
    write_outputs(dataset_items(run["defaultDatasetId"]), a.out)


def cmd_normalize(a: argparse.Namespace) -> None:
    with open(a.json, encoding="utf-8") as f:
        items = json.load(f)
    if isinstance(items, dict):
        items = items.get("items", [])
    write_outputs(items, a.out)


def main() -> None:
    p = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    sub = p.add_subparsers(dest="cmd", required=True)

    r = sub.add_parser("run", help="lanzar un actor y descargar el resultado")
    r.add_argument("--actor", default=GOOGLE_MAPS_ACTOR, help="usuario~actor (por defecto Google Maps Scraper)")
    r.add_argument("--query", help='búsqueda de Maps; varias separadas por "|"')
    r.add_argument("--location", help='p. ej. "Miraflores, Lima" o "Madrid, España"')
    r.add_argument("--max", type=int, default=50, help="lugares por búsqueda (50 por defecto)")
    r.add_argument("--language", default="es")
    r.add_argument("--no-contacts", action="store_true", help="no entrar a las webs a buscar correos")
    r.add_argument("--input-json", help="input completo del actor (ignora --query/--location)")
    r.add_argument("--out", required=True, help="ruta base de salida, sin extensión")
    r.set_defaults(fn=cmd_run)

    f = sub.add_parser("fetch", help="descargar el dataset de un run existente")
    f.add_argument("--run-id", required=True)
    f.add_argument("--out", required=True)
    f.set_defaults(fn=cmd_fetch)

    n = sub.add_parser("normalize", help="convertir un dataset JSON ya descargado a CSV")
    n.add_argument("--json", required=True)
    n.add_argument("--out", required=True)
    n.set_defaults(fn=cmd_normalize)

    a = p.parse_args()
    a.fn(a)


if __name__ == "__main__":
    main()
