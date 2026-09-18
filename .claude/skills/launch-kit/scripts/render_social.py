#!/usr/bin/env python3
"""
Renderiza UNA plantilla HTML en los cuatro formatos de redes (16:9, 1:1, 4:5, 9:16)
usando Chromium headless. Los colores, tipografías y textos entran por un JSON de
tokens, de modo que cambiar un color en el JSON corrige todas las piezas a la vez.

Uso:
  python3 render_social.py --template pieza.html --tokens brand.json --out ./salida \
      [--formats landscape,square,portrait,story] [--prefix varde]

La plantilla es HTML normal. El script:
  1. Inyecta un bloque <style>:root{--token: valor; ...}</style> con cada clave del
     JSON `tokens` (y cada clave de `text` como --text-<clave> para usar en content()).
  2. Reemplaza {{clave}} por el valor de `text.clave` del JSON.
  3. Pone data-format="landscape|square|portrait|story" en <html>, para que el CSS
     adapte el layout por formato ([data-format="story"] .titulo { font-size: ... }).
  4. Captura un PNG del tamaño exacto de cada formato.

Formato del JSON:
{
  "tokens": {"color-primary": "#0B3D91", "color-accent": "#F5A623", "font-heading": "Inter"},
  "text":   {"headline": "Rain is a given.", "sub": "Shells should act like it.", "cta": "..."},
  "assets": {"logo": "/ruta/absoluta/logo.svg"}     # se expone como {{asset.logo}} (file://)
}
"""
import argparse, glob, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

FORMATS = {
    "landscape": (1920, 1080),   # 16:9  — LinkedIn/X/YouTube thumbnail, banner web
    "square":    (1080, 1080),   # 1:1   — Instagram feed, WhatsApp, LinkedIn
    "portrait":  (1080, 1350),   # 4:5   — Instagram/Facebook feed (más área visible)
    "story":     (1080, 1920),   # 9:16  — Stories, Reels, TikTok, WhatsApp Status
}


def find_chrome():
    for env in ("CHROME_BIN", "CHROMIUM_BIN"):
        if os.environ.get(env) and Path(os.environ[env]).exists():
            return os.environ[env]
    candidates = sorted(glob.glob("/opt/pw-browsers/chromium-*/chrome-linux/chrome"), reverse=True)
    candidates += [shutil.which(n) for n in ("chromium", "chromium-browser", "google-chrome", "google-chrome-stable", "chrome")]
    for c in candidates:
        if c and Path(c).exists():
            return c
    sys.exit("No se encontró Chromium/Chrome. Define CHROME_BIN=/ruta/al/binario.")


def build_html(template: str, data: dict, fmt: str) -> str:
    tokens = data.get("tokens", {})
    text = data.get("text", {})
    assets = data.get("assets", {})

    css_vars = "".join(f"--{k}: {v};" for k, v in tokens.items())
    css_vars += "".join(f"--text-{k}: \"{str(v).replace(chr(34), chr(39))}\";" for k, v in text.items())
    style = f"<style id=\"launch-kit-tokens\">:root{{{css_vars}}}</style>"

    html = template
    for k, v in text.items():
        html = html.replace("{{" + k + "}}", str(v))
    for k, v in assets.items():
        # rutas relativas: primero contra el cwd (normalmente la raíz del repo),
        # luego contra la carpeta del JSON de tokens
        cands = [Path(v).expanduser(), Path(data.get("_dir", ".")) / v]
        found = next((c.resolve() for c in cands if c.exists()), None)
        html = html.replace("{{asset." + k + "}}", found.as_uri() if found else str(v))

    # atributo de formato en <html> + tokens en <head>
    if re.search(r"<html[^>]*>", html, re.I):
        html = re.sub(r"<html([^>]*)>", lambda m: f"<html{m.group(1)} data-format=\"{fmt}\">", html, count=1, flags=re.I)
    else:
        html = f"<html data-format=\"{fmt}\">" + html + "</html>"
    if re.search(r"<head[^>]*>", html, re.I):
        html = re.sub(r"(<head[^>]*>)", lambda m: m.group(1) + style, html, count=1, flags=re.I)
    else:
        html = re.sub(r"(<html[^>]*>)", lambda m: m.group(1) + f"<head>{style}</head>", html, count=1, flags=re.I)

    # Aviso de placeholders sin reemplazar
    left = set(re.findall(r"{{\s*([\w.]+)\s*}}", html))
    if left:
        print(f"  aviso: placeholders sin valor en el JSON: {', '.join(sorted(left))}", file=sys.stderr)
    return html


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--template", required=True)
    ap.add_argument("--tokens", required=True, help="JSON con tokens/text/assets")
    ap.add_argument("--out", required=True)
    ap.add_argument("--formats", default=",".join(FORMATS), help="lista separada por comas")
    ap.add_argument("--prefix", default="social")
    ap.add_argument("--scale", type=float, default=1.0, help="device scale factor (2 = retina)")
    args = ap.parse_args()

    chrome = find_chrome()
    template = Path(args.template).read_text(encoding="utf-8")
    data = json.loads(Path(args.tokens).read_text(encoding="utf-8"))
    data["_dir"] = str(Path(args.tokens).resolve().parent)
    out = Path(args.out); out.mkdir(parents=True, exist_ok=True)
    tmpdir = Path(tempfile.mkdtemp(prefix="launch-kit-"))
    written = []

    for fmt in [f.strip() for f in args.formats.split(",") if f.strip()]:
        if fmt not in FORMATS:
            sys.exit(f"Formato desconocido: {fmt}. Usa: {', '.join(FORMATS)}")
        w, h = FORMATS[fmt]
        html_path = tmpdir / f"{fmt}.html"
        html_path.write_text(build_html(template, data, fmt), encoding="utf-8")
        png = out / f"{args.prefix}-{fmt}-{w}x{h}.png"
        cmd = [chrome, "--headless=new", "--no-sandbox", "--disable-gpu", "--hide-scrollbars",
               f"--window-size={w},{h}", f"--force-device-scale-factor={args.scale}",
               "--run-all-compositor-stages-before-draw", "--virtual-time-budget=3000",
               f"--screenshot={png}", html_path.as_uri()]
        r = subprocess.run(cmd, capture_output=True, text=True)
        if not png.exists():
            print(r.stderr[-2000:], file=sys.stderr)
            sys.exit(f"Falló el render de {fmt}")
        written.append(png)
        print(f"  ok  {png.name}")

    shutil.rmtree(tmpdir, ignore_errors=True)
    print(f"{len(written)} piezas en {out.resolve()}")


if __name__ == "__main__":
    main()
