#!/usr/bin/env bash
# =====================================================================
#  Instalador de skills y MCP para Claude Code  (macOS / Linux)
#  Basado en el video "3 Tips para crear Webs Profesionales con Claude"
#
#  Instala (a nivel de usuario, ~/.claude/skills):
#    1. emilkowalski/skills   -> emil-design-eng, animate, prototype, etc.
#    2. pbakaus/impeccable    -> /impeccable (craft, shape, critique, audit...)
#    3. leonxlnx/taste-skill  -> design-taste-frontend, image-to-code, etc.
#    4. senlindesign/taste-skill -> /taste  (analiza el diseño de cualquier web por URL)
#  Conecta los MCP:
#    5. Figma      (https://mcp.figma.com/mcp)
#    6. Playwright (@playwright/mcp)
#
#  Uso:  bash instalar-skills-claude.sh
# =====================================================================
set -euo pipefail

paso() { printf '\n\033[1;36m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m   ✓ %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m   ! %s\033[0m\n' "$*"; }

# ---- Requisitos ------------------------------------------------------
paso "Verificando requisitos"
for cmd in node npx git; do
  if ! command -v "$cmd" >/dev/null 2>&1; then
    echo "   ✗ Falta '$cmd'. Instala Node.js (https://nodejs.org) y Git, luego vuelve a ejecutar." >&2
    exit 1
  fi
done
ok "node $(node -v), npx y git disponibles"

if command -v claude >/dev/null 2>&1; then
  ok "Claude Code CLI: $(claude --version 2>/dev/null | head -1)"
  HAS_CLAUDE=1
else
  warn "No se encontró el comando 'claude'. Las skills se instalarán igual; los MCP los agregas luego (ver README)."
  HAS_CLAUDE=0
fi

mkdir -p "$HOME/.claude/skills"

# ---- 1. Emil Kowalski ------------------------------------------------
paso "1/6  Skills de Emil Kowalski (animaciones y diseño)"
npx -y skills@latest add emilkowalski/skills -g -a claude-code -s '*' -y --copy
ok "emilkowalski/skills instalado"

# ---- 2. Impeccable ---------------------------------------------------
paso "2/6  Impeccable (lenguaje de diseño + comandos /impeccable)"
npx -y impeccable install -y --providers=claude-code --global --force
ok "impeccable instalado"

# ---- 3. Taste-Skill (leonxlnx) --------------------------------------
paso "3/6  Taste-Skill (anti-diseño genérico, image-to-code)"
npx -y skills@latest add leonxlnx/taste-skill -g -a claude-code -s '*' -y --copy
ok "leonxlnx/taste-skill instalado"

# ---- 4. /taste (senlindesign) — referencias visuales por URL --------
paso "4/6  /taste (toma referencias de diseño de cualquier web)"
DEST="$HOME/.claude/skills/taste"
if [ -d "$DEST/.git" ]; then
  git -C "$DEST" pull -q --ff-only || warn "No se pudo actualizar $DEST (se mantiene la versión actual)"
else
  rm -rf "$DEST"
  git clone -q https://github.com/senlindesign/taste-skill "$DEST"
fi
ok "senlindesign/taste-skill instalado en ~/.claude/skills/taste"

# ---- 5 y 6. MCP: Figma + Playwright ---------------------------------
if [ "$HAS_CLAUDE" = "1" ]; then
  paso "5/6  MCP de Figma"
  claude mcp remove figma -s user >/dev/null 2>&1 || true
  claude mcp add --transport http figma https://mcp.figma.com/mcp -s user
  ok "MCP figma agregado (la primera vez Claude Code te pedirá iniciar sesión en Figma)"

  paso "6/6  MCP de Playwright"
  claude mcp remove playwright -s user >/dev/null 2>&1 || true
  claude mcp add playwright -s user -- npx -y @playwright/mcp@latest
  ok "MCP playwright agregado"
else
  paso "5-6/6  MCP omitidos (no hay CLI 'claude')"
fi

# ---- Resumen ---------------------------------------------------------
paso "Listo. Skills instaladas en ~/.claude/skills:"
ls -1 "$HOME/.claude/skills" | sed 's/^/     - /'
if [ "$HAS_CLAUDE" = "1" ]; then
  echo
  claude mcp list 2>/dev/null || true
fi
cat <<'EOF'

Próximos pasos:
  1. Reinicia Claude Code (cierra y vuelve a abrir la sesión).
  2. Dentro del chat de Claude Code escribe:   /impeccable init
  3. Para copiar el estilo de una web:          /taste https://linear.app
  4. Para construir:  "Build me a landing page for <tu producto>"
EOF
