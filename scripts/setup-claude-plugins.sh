#!/usr/bin/env bash
# Instala los 5 plugins/herramientas para Claude Code usados en este proyecto.
#
#   1. OmniRoute        - gateway gratuito con 350+ proveedores de IA (npm)
#   2. claude-mem       - memoria persistente entre sesiones (plugin Claude Code)
#   3. Headroom         - compresion de contexto, menos tokens (pip)
#   4. claude-code-setup- analiza el repo y recomienda hooks/skills/MCP (plugin oficial)
#   5. task-observer    - meta-skill que observa tu trabajo y mejora tus skills
#
# Uso:  bash scripts/setup-claude-plugins.sh [--skip-omniroute] [--skip-headroom]
#
# Requisitos: Claude Code CLI (claude), Node 20+, npm, Python 3.10+ y pip.
# Ver docs/CLAUDE_PLUGINS.md para el detalle de cada herramienta.

set -euo pipefail

SKIP_OMNIROUTE=0
SKIP_HEADROOM=0
for arg in "$@"; do
  case "$arg" in
    --skip-omniroute) SKIP_OMNIROUTE=1 ;;
    --skip-headroom) SKIP_HEADROOM=1 ;;
    -h|--help) sed -n '2,13p' "$0"; exit 0 ;;
    *) echo "Opcion desconocida: $arg" >&2; exit 1 ;;
  esac
done

REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SKILL_DIR="$REPO_ROOT/.claude/skills/task-observer"
TASK_OBSERVER_REPO="https://github.com/rebelytics/one-skill-to-rule-them-all.git"
OBS_WORKSPACE="${OBS_WORKSPACE:-$HOME/.claude/skill-observations/innovaqsolution}"

log()  { printf '\n\033[1;34m==> %s\033[0m\n' "$*"; }
ok()   { printf '\033[1;32m  OK  %s\033[0m\n' "$*"; }
warn() { printf '\033[1;33m  !!  %s\033[0m\n' "$*"; }
need() { command -v "$1" >/dev/null 2>&1 || { echo "Falta '$1' en el PATH." >&2; exit 1; }; }

need claude
need git

# ---------------------------------------------------------------------------
log "1/5  Plugins de Claude Code (claude-mem y claude-code-setup)"
# Los marketplaces y plugins ya estan declarados en .claude/settings.json.
# Estos comandos los registran en la maquina local y descargan el codigo.
cd "$REPO_ROOT"
claude plugin marketplace add thedotmack/claude-mem --scope project 2>/dev/null \
  || claude plugin marketplace update thedotmack
claude plugin marketplace add anthropics/claude-plugins-official --scope project 2>/dev/null \
  || claude plugin marketplace update claude-plugins-official
claude plugin install claude-mem@thedotmack --scope project -y
claude plugin install claude-code-setup@claude-plugins-official --scope project -y
ok "claude-mem y claude-code-setup instalados (scope: project)"

# ---------------------------------------------------------------------------
log "2/5  task-observer (One Skill to Rule Them All)"
if [ -f "$SKILL_DIR/SKILL.md" ]; then
  ok "Ya existe en $SKILL_DIR"
else
  tmp="$(mktemp -d)"
  git clone --depth 1 "$TASK_OBSERVER_REPO" "$tmp/task-observer"
  mkdir -p "$SKILL_DIR"
  # Solo el bundle que el README pide mantener junto: SKILL.md, references/, scripts/
  cp "$tmp/task-observer/SKILL.md" "$tmp/task-observer/LICENSE.txt" "$SKILL_DIR/"
  cp -r "$tmp/task-observer/references" "$tmp/task-observer/scripts" "$SKILL_DIR/"
  rm -rf "$tmp"
  ok "Instalado en $SKILL_DIR (licencia CC BY 4.0, autor Eoghan Henn / rebelytics.com)"
fi
mkdir -p "$OBS_WORKSPACE/skill-observations/observation-log" "$OBS_WORKSPACE/skill-updates"
ok "Workspace de observaciones: $OBS_WORKSPACE"

# ---------------------------------------------------------------------------
log "3/5  OmniRoute (gateway gratuito de APIs de IA)"
if [ "$SKIP_OMNIROUTE" = 1 ]; then
  warn "Omitido (--skip-omniroute)"
else
  need npm
  npm install -g omniroute
  ok "OmniRoute instalado. Arranca con:  omniroute launch   (dashboard en http://localhost:20128)"
  echo "      Conecta Claude Code con el asistente:  omniroute setup-claude"
fi

# ---------------------------------------------------------------------------
log "4/5  Headroom (compresion de contexto para reducir tokens)"
if [ "$SKIP_HEADROOM" = 1 ]; then
  warn "Omitido (--skip-headroom)"
else
  if command -v uv >/dev/null 2>&1; then
    uv tool install "headroom-ai[all]"
  else
    need pip
    pip install --user "headroom-ai[all]"
  fi
  ok "Headroom instalado. Lanza Claude Code a traves de Headroom con:  headroom wrap claude"
fi

# ---------------------------------------------------------------------------
log "5/5  Resumen"
cat <<EOF
  Plugins activos en el proyecto (.claude/settings.json):
    - claude-mem@thedotmack
    - claude-code-setup@claude-plugins-official
  Skill del proyecto:
    - .claude/skills/task-observer  (activado por CLAUDE.md; hook SessionStart
      opcional, ver docs/CLAUDE_PLUGINS.md)
  Herramientas externas:
    - omniroute launch  /  omniroute setup-claude
    - headroom wrap claude

  Siguiente paso: abre una sesion NUEVA de Claude Code en este repo y pide
  "recommend automations for this project" para probar claude-code-setup.
  Guia completa: docs/CLAUDE_PLUGINS.md
EOF
