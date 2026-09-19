#!/usr/bin/env bash
# check_env.sh — chequeo de solo lectura previo a instalar o usar Agent Reach.
# No instala nada, no escribe archivos, no necesita sudo. Imprime qué hay y qué falta
# para que el agente sepa qué ruta de instalación proponer (pipx, venv, Windows).
#
# Uso: bash .claude/skills/agent-reach/scripts/check_env.sh

set -u

ok()   { printf '  \033[32m[OK]\033[0m   %s\n' "$*"; }
miss() { printf '  \033[33m[--]\033[0m   %s\n' "$*"; }
info() { printf '  \033[36m[i]\033[0m    %s\n' "$*"; }

have() { command -v "$1" >/dev/null 2>&1; }
ver()  { "$@" 2>&1 | head -n 1; }

echo "Agent Reach — chequeo de entorno (solo lectura)"
echo "================================================"

# --- Sistema ---------------------------------------------------------------
OS="$(uname -s 2>/dev/null || echo desconocido)"
case "$OS" in
  Darwin) OS_LABEL="macOS" ;;
  Linux)  OS_LABEL="Linux" ;;
  MINGW*|MSYS*|CYGWIN*) OS_LABEL="Windows (shell POSIX)" ;;
  *)      OS_LABEL="$OS" ;;
esac
info "Sistema: $OS_LABEL"
if [ -n "${DISPLAY:-}" ] || [ "$OS" = "Darwin" ] || [ -n "${WAYLAND_DISPLAY:-}" ]; then
  info "Entorno con escritorio: los canales OpenCLI (Reddit, Facebook, Instagram) son viables."
else
  info "Sin escritorio detectado: tratar como servidor (sin OpenCLI; Reddit necesita rdt-cli + cookie)."
fi
echo

# --- Python ----------------------------------------------------------------
echo "Python"
PY=""
for c in python3 python py; do
  if have "$c"; then PY="$c"; break; fi
done
if [ -n "$PY" ]; then
  PYV="$($PY -c 'import sys; print("%d.%d.%d" % sys.version_info[:3])' 2>/dev/null || echo '?')"
  MAJ="${PYV%%.*}"; MIN="$(echo "$PYV" | cut -d. -f2)"
  if [ "$MAJ" -ge 3 ] 2>/dev/null && [ "$MIN" -ge 10 ] 2>/dev/null; then
    ok "$PY $PYV (>= 3.10 requerido)"
  else
    miss "$PY $PYV — Agent Reach requiere Python 3.10 o superior"
  fi
else
  miss "No hay Python en el PATH. En Windows usa 'py -3'; en macOS 'brew install python'."
fi
if have pipx; then ok "pipx $(ver pipx --version)  → ruta recomendada: pipx install <zip de GitHub>"; else miss "pipx no está; alternativa: python3 -m venv ~/.agent-reach-venv"; fi
if [ -d "$HOME/.agent-reach-venv" ]; then info "Existe ~/.agent-reach-venv (instalación previa por venv)"; fi
echo

# --- Agent Reach -----------------------------------------------------------
echo "Agent Reach"
if have agent-reach; then
  ok "agent-reach instalado: $(ver agent-reach version)"
  info "Siguiente paso: agent-reach doctor"
elif [ -x "$HOME/.agent-reach-venv/bin/agent-reach" ]; then
  ok "agent-reach en el venv (no está en el PATH): source ~/.agent-reach-venv/bin/activate"
else
  miss "agent-reach no instalado. Ver SKILL.md, paso 2."
fi
if [ -d "$HOME/.agent-reach" ]; then
  info "Config previa en ~/.agent-reach/ ($(ls "$HOME/.agent-reach" 2>/dev/null | tr '\n' ' '))"
fi
if [ -f "$HOME/.claude/skills/agent-reach/SKILL.md" ]; then
  info "Skill en ~/.claude/skills/agent-reach/SKILL.md ($(head -c 300 "$HOME/.claude/skills/agent-reach/SKILL.md" | grep -q 'video de origen' && echo 'la de INNOVAQ' || echo 'la registrada por agent-reach --system'))"
fi
echo

# --- Infraestructura que revisa 'agent-reach install' ----------------------
echo "Infraestructura base (lo que revisa 'agent-reach install --env=auto')"
if have node; then ok "Node.js $(ver node --version)"; else miss "Node.js (necesario para mcporter y OpenCLI)"; fi
if have npm; then ok "npm $(ver npm --version)"; else miss "npm"; fi
if have gh; then
  if gh auth status >/dev/null 2>&1; then ok "gh CLI autenticado"; else ok "gh CLI presente, sin login (repos públicos funcionan; 'gh auth login' para privados)"; fi
else miss "gh CLI (canal GitHub)"; fi
if have mcporter; then ok "mcporter $(ver mcporter --version)"; else miss "mcporter (búsqueda Exa y LinkedIn por MCP)"; fi
if have yt-dlp; then ok "yt-dlp $(ver yt-dlp --version)"; else miss "yt-dlp (YouTube) — lo instala el paquete agent-reach"; fi
if have curl; then ok "curl (Jina Reader)"; else miss "curl"; fi
echo

# --- Canales opcionales ------------------------------------------------------
echo "Canales opcionales"
if have opencli; then ok "opencli (Reddit/Facebook/Instagram) — verificar extensión con: opencli doctor"; else miss "opencli"; fi
if have twitter; then ok "twitter-cli"; else miss "twitter-cli"; fi
if [ -n "${TWITTER_AUTH_TOKEN:-}" ] && [ -n "${TWITTER_CT0:-}" ]; then ok "TWITTER_AUTH_TOKEN / TWITTER_CT0 en el entorno"; else miss "TWITTER_AUTH_TOKEN / TWITTER_CT0 no exportadas (búsqueda en X no funcionará en este shell)"; fi
if have rdt; then ok "rdt-cli (Reddit)"; else miss "rdt-cli"; fi
if have uvx; then ok "uvx (LinkedIn vía mcp-server-linkedin)"; else miss "uv/uvx"; fi
if have bili; then ok "bili-cli"; else miss "bili-cli"; fi
echo
echo "Fin. Nada ha sido modificado."
