#!/usr/bin/env bash
# claude-code-stack — instala, verifica y configura los cuatro plugins del video
# (Ponytail, OmniRoute, Graphify, Agent Skills) para Claude Code.
#
# Uso:
#   scripts/stack.sh check                 # qué hay y qué falta (no cambia nada)
#   scripts/stack.sh install [--omniroute] # instala lo que se puede desde la terminal
#   scripts/stack.sh settings [DIR]        # escribe/mezcla .claude/settings.json del repo
#   scripts/stack.sh gitignore [DIR]       # añade graphify-out/ al .gitignore del repo
#
# Ponytail se instala con `claude plugin marketplace add` + `claude plugin install`
# (CLI de Claude Code 2.x); si `claude` no está en PATH, el script imprime los comandos
# /plugin equivalentes. OmniRoute solo se instala con --omniroute: enruta prompts y
# código a proveedores externos y el usuario tiene que decidirlo expresamente.
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cmd="${1:-check}"; shift || true

have() { command -v "$1" >/dev/null 2>&1; }
ok()   { printf '  \033[32m✔\033[0m %s\n' "$*"; }
miss() { printf '  \033[31m✘\033[0m %s\n' "$*"; }
info() { printf '  · %s\n' "$*"; }

repo_root() {
  local d="${1:-.}"
  git -C "$d" rev-parse --show-toplevel 2>/dev/null || (cd "$d" && pwd)
}

check_ponytail() {
  local found=0
  if have claude && claude plugin list 2>/dev/null | grep -q 'ponytail@ponytail'; then found=1; fi
  for f in "$HOME/.claude/plugins/installed_plugins.json" "$HOME/.claude/settings.json"; do
    [ -f "$f" ] && grep -q 'ponytail' "$f" 2>/dev/null && found=1
  done
  if [ "$found" = 1 ]; then ok "Ponytail: plugin instalado ($(claude plugin list 2>/dev/null | grep -A1 ponytail@ponytail | grep -o 'Version: .*' || echo 'registrado en ~/.claude'))"; else
    miss "Ponytail: no instalado — desde terminal:"
    info "claude plugin marketplace add DietrichGebert/ponytail && claude plugin install ponytail@ponytail"
    info "o dentro de Claude Code: /plugin marketplace add DietrichGebert/ponytail  →  /plugin install ponytail@ponytail"
  fi
}

check_agent_skills() {
  local found=0
  for f in "$HOME/.claude/plugins/installed_plugins.json" "$HOME/.claude/settings.json"; do
    [ -f "$f" ] && grep -q 'agent-skills' "$f" 2>/dev/null && found=1
  done
  [ -d "$HOME/.agents/skills/using-agent-skills" ] && found=1
  [ -d "$HOME/.claude/skills/using-agent-skills" ] && found=1
  [ -d ".claude/skills/using-agent-skills" ] && found=1
  [ -d ".agents/skills/using-agent-skills" ] && found=1
  if [ "$found" = 1 ]; then ok "Agent Skills (addyosmani): instalado"; else
    miss "Agent Skills: no encontrado — en Claude Code ejecuta:"
    info "/plugin marketplace add addyosmani/agent-skills"
    info "/plugin install agent-skills@addy-agent-skills"
    info "o desde la terminal: npx skills add addyosmani/agent-skills"
  fi
}

check_graphify() {
  if have graphify; then
    ok "Graphify: $(graphify --version 2>/dev/null | head -1 || echo 'cli presente')"
    if grep -rqs -m1 graphify "$HOME/.claude/skills" "$HOME/.claude/commands" "$HOME/.agents/skills" 2>/dev/null; then
      ok "Graphify: skill /graphify registrada"
    else
      miss "Graphify: cli presente pero la skill no está registrada — ejecuta: graphify install"
    fi
  else
    miss "Graphify: no instalado — uv tool install graphifyy && graphify install"
  fi
  if [ -d graphify-out ]; then
    if git check-ignore -q graphify-out 2>/dev/null; then ok "graphify-out/ está ignorado por git"; else
      miss "graphify-out/ existe y NO está en .gitignore (este sitio publica main en GitHub Pages) — scripts/stack.sh gitignore"
    fi
  fi
}

check_omniroute() {
  if have omniroute; then ok "OmniRoute: cli instalado"; else info "OmniRoute: no instalado (opcional; enruta a proveedores externos)"; fi
  if curl -fsS --max-time 2 http://localhost:20128/ >/dev/null 2>&1; then
    ok "OmniRoute: servidor activo en :20128"
  else
    info "OmniRoute: sin servidor en :20128 (arrancar con: omniroute)"
  fi
  if [ -n "${ANTHROPIC_BASE_URL:-}" ] && ! printf '%s' "$ANTHROPIC_BASE_URL" | grep -q 'api.anthropic.com'; then
    info "ANTHROPIC_BASE_URL=$ANTHROPIC_BASE_URL (Claude Code está enrutado por aquí en esta terminal)"
  fi
}

do_check() {
  echo "Prerrequisitos:"
  have node && ok "node $(node --version)" || miss "node (necesario para OmniRoute y npx skills)"
  have npm  && ok "npm $(npm --version)"  || miss "npm"
  if have uv; then ok "uv $(uv --version | awk '{print $2}')"; elif have pipx; then ok "pipx"; elif have pip; then ok "pip (sirve, pero uv/pipx aíslan mejor)"; else miss "uv / pipx / pip (necesario para Graphify)"; fi
  have claude && ok "claude $(claude --version 2>/dev/null | head -1)" || info "claude cli no está en PATH (los comandos /plugin se ejecutan dentro de Claude Code)"
  echo "Plugins:"
  check_agent_skills; check_ponytail; check_graphify; check_omniroute
}

do_install() {
  local with_omni=0
  for a in "$@"; do [ "$a" = "--omniroute" ] && with_omni=1; done

  echo "== Graphify"
  if have graphify; then ok "ya instalado"; else
    if have uv; then uv tool install graphifyy
    elif have pipx; then pipx install graphifyy
    elif have pip; then pip install --user graphifyy
    else miss "no hay uv/pipx/pip; instala uv (https://docs.astral.sh/uv/) y reintenta"; fi
  fi
  have graphify && graphify install || true

  echo "== Agent Skills (addyosmani)"
  # -a claude-code: solo Claude Code (sin -a intenta registrar en los 70+ agentes y algunos fallan en modo global)
  if have npx; then npx -y skills add addyosmani/agent-skills -g -y -a claude-code || miss "npx skills falló; usa los comandos /plugin de abajo"; else miss "sin npx; usa los comandos /plugin de abajo"; fi

  echo "== Ponytail"
  if have claude; then
    if claude plugin list 2>/dev/null | grep -q 'ponytail@ponytail'; then ok "ya instalado"; else
      claude plugin marketplace add DietrichGebert/ponytail && claude plugin install ponytail@ponytail || miss "claude plugin falló; usa los comandos /plugin de abajo"
    fi
  else
    miss "claude cli no está en PATH; instala Ponytail dentro de Claude Code (comandos abajo)"
  fi

  echo "== OmniRoute"
  if [ "$with_omni" = 1 ]; then
    have npm && npm install -g omniroute || miss "npm no disponible; alternativa: docker run -p 20128:20128 diegosouzapw/omniroute"
    info "arrancar: omniroute   → dashboard en http://localhost:20128"
    info "enrutar solo una terminal: ANTHROPIC_BASE_URL=http://localhost:20128/v1 ANTHROPIC_API_KEY=any-value claude"
  else
    info "omitido (pasa --omniroute para instalarlo; lee references/plugins.md §2 antes)"
  fi

  cat <<'TXT'

== Si algo de arriba falló, dentro de Claude Code:
  /plugin marketplace add DietrichGebert/ponytail
  /plugin install ponytail@ponytail
  /plugin marketplace add addyosmani/agent-skills
  /plugin install agent-skills@addy-agent-skills   (solo si NO se instaló con npx skills)

  Para que el repo lo mantenga solo para todo el equipo: scripts/stack.sh settings
TXT
}

do_settings() {
  local root; root="$(repo_root "${1:-.}")"
  local f="$root/.claude/settings.json"
  mkdir -p "$root/.claude"
  have python3 || { miss "python3 necesario para mezclar settings.json"; exit 1; }
  python3 - "$f" <<'PY'
import json, sys, os
f = sys.argv[1]
data = {}
if os.path.exists(f):
    with open(f) as fh:
        data = json.load(fh)
mk = data.setdefault("extraKnownMarketplaces", {})
mk.setdefault("ponytail", {"source": {"source": "github", "repo": "DietrichGebert/ponytail"}})
mk.setdefault("addy-agent-skills", {"source": {"source": "github", "repo": "addyosmani/agent-skills"}})
en = data.setdefault("enabledPlugins", {})
en.setdefault("ponytail@ponytail", True)
en.setdefault("agent-skills@addy-agent-skills", True)
with open(f, "w") as fh:
    json.dump(data, fh, indent=2, ensure_ascii=False)
    fh.write("\n")
print(f"  ✔ {f}")
PY
  info "al abrir el repo, Claude Code pedirá confirmar e instalará Ponytail y Agent Skills"
}

do_gitignore() {
  local root; root="$(repo_root "${1:-.}")"
  local g="$root/.gitignore"
  touch "$g"
  if grep -qxE 'graphify-out/?' "$g"; then ok "graphify-out/ ya está en $g"; else
    printf '\n# Graphify (grafo local del repo; no publicar)\ngraphify-out/\n' >> "$g"; ok "graphify-out/ añadido a $g"
  fi
}

case "$cmd" in
  check)     do_check ;;
  install)   do_install "$@" ;;
  settings)  do_settings "$@" ;;
  gitignore) do_gitignore "$@" ;;
  *) sed -n '2,14p' "$0"; exit 1 ;;
esac
