#!/usr/bin/env bash
# Valida una skill y la instala como skill personal en ~/.claude/skills/<nombre>.
# Uso: install_skill.sh <ruta/a/.claude/skills/nombre> [--check] [--dest DIR]
set -euo pipefail
SRC="${1:-}"; [[ -z "$SRC" ]] && { echo "Uso: $0 <carpeta_skill> [--check] [--dest DIR]" >&2; exit 2; }
shift
CHECK=0; DEST="${CLAUDE_SKILLS_DIR:-$HOME/.claude/skills}"
while [[ $# -gt 0 ]]; do case "$1" in --check) CHECK=1; shift;; --dest) DEST="$2"; shift 2;; *) echo "Opción desconocida: $1" >&2; exit 2;; esac; done

SRC="${SRC%/}"; NAME="$(basename "$SRC")"; SKILL="$SRC/SKILL.md"
[[ -f "$SKILL" ]] || { echo "FALTA $SKILL" >&2; exit 1; }

python3 - "$SKILL" "$NAME" <<'PY'
import re, sys
path, folder = sys.argv[1], sys.argv[2]
t = open(path, encoding="utf-8").read()
m = re.match(r"^---\n(.*?)\n---\n", t, re.S)
errs = []
if not m:
    errs.append("sin frontmatter YAML (--- ... ---) al inicio")
else:
    fm = m.group(1)
    name = re.search(r"^name:\s*(.+)$", fm, re.M)
    desc = re.search(r"^description:\s*(.+)$", fm, re.M)
    if not name: errs.append("falta 'name'")
    elif name.group(1).strip() != folder: errs.append(f"name '{name.group(1).strip()}' != carpeta '{folder}'")
    elif not re.fullmatch(r"[a-z0-9]+(-[a-z0-9]+)*", name.group(1).strip()): errs.append("name debe ser kebab-case")
    if not desc: errs.append("falta 'description'")
    else:
        d = desc.group(1).strip()
        if len(d) > 1024: errs.append(f"description tiene {len(d)} caracteres (máx. 1024)")
        if ": " in d: errs.append("description contiene ': ' (rompe el YAML); usa guiones o paréntesis")
        if len(d) < 80: errs.append("description demasiado corta para disparar bien (<80)")
for pat, msg in [(r"AIza[0-9A-Za-z_\-]{30,}", "posible llave de Google"), (r"sk-[A-Za-z0-9]{20,}", "posible llave de OpenAI"), (r"gsk_[A-Za-z0-9]{20,}", "posible llave de Groq")]:
    if re.search(pat, t): errs.append(f"{msg} dentro de SKILL.md")
if errs:
    print("SKILL.md INVÁLIDO:"); [print("  -", e) for e in errs]; sys.exit(1)
print(f"SKILL.md OK  (name={folder}, description={len(desc.group(1).strip())} chars)")
PY

# Medios pesados o binarios de video no deben viajar con la skill.
if find "$SRC" -type f \( -iname '*.mp4' -o -iname '*.mov' -o -iname '*.webm' -o -iname '*.wav' -o -iname '*.mp3' \) | grep -q .; then
  echo "La skill contiene archivos de video/audio; quítalos antes de instalar." >&2; exit 1
fi

[[ $CHECK -eq 1 ]] && exit 0

mkdir -p "$DEST"
rm -rf "$DEST/$NAME"
cp -R "$SRC" "$DEST/$NAME"
find "$DEST/$NAME" -name __pycache__ -type d -prune -exec rm -rf {} +
chmod +x "$DEST/$NAME"/scripts/* 2>/dev/null || true
echo "Instalada en $DEST/$NAME"
echo "Skills personales disponibles:"; ls -1 "$DEST"
