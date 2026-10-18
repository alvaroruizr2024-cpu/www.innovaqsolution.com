#!/usr/bin/env bash
# Instala los 9 mods del video "Estos 9 MODS de Claude son MUY BESTIAS" en Claude Code.
# Requiere Claude Code 2.1.287 o superior: https://code.claude.com/docs/en/plugins
#
# Uso:
#   bash mods/install-mods.sh                 # para ti, en todos tus proyectos (alcance user)
#   bash mods/install-mods.sh --scope project # para todos los colaboradores del proyecto actual
#   bash mods/install-mods.sh --scope local   # solo para ti y solo en el proyecto actual
#   bash mods/install-mods.sh --ref main      # marketplace desde GitHub en esa rama (si no estás en el clon)
set -euo pipefail

MARKET="innovaq-mods"
REPO="alvaroruizr2024-cpu/www.innovaqsolution.com"
MODS=(savvy-progress savvy-flow filetree next-steps recording-mode clean-view agent-dock skins replay-theater)
SCOPE="user"
REF=""

while (($#)); do
  case "$1" in
    --scope) SCOPE="$2"; shift 2 ;;
    --ref) REF="$2"; shift 2 ;;
    -h|--help) sed -n '2,10p' "$0"; exit 0 ;;
    *) echo "Opción desconocida: $1" >&2; exit 2 ;;
  esac
done

if ! command -v claude >/dev/null 2>&1; then
  echo "No encuentro la CLI 'claude'. Instala Claude Code primero: https://code.claude.com/docs/en/setup" >&2
  exit 1
fi

# Si el script corre dentro del clon del repo, el marketplace se lee de la carpeta local
# (funciona en cualquier rama y los cambios en mods/ llegan con /reload-plugins).
HERE="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
if [[ -z "$REF" && -f "$HERE/.claude-plugin/marketplace.json" ]]; then
  SOURCE="$HERE"
else
  SOURCE="$REPO${REF:+#$REF}"
fi

echo "==> Claude Code $(claude --version 2>/dev/null | head -1)"
echo "==> Marketplace $MARKET desde $SOURCE"
if claude plugin marketplace list 2>/dev/null | grep -q "$MARKET"; then
  claude plugin marketplace update "$MARKET"
else
  claude plugin marketplace add "$SOURCE"
fi

failed=()
for mod in "${MODS[@]}"; do
  echo "==> Instalando $mod@$MARKET (alcance: $SCOPE)"
  if ! claude plugin install "$mod@$MARKET" --scope "$SCOPE"; then
    failed+=("$mod")
  fi
done

echo "==> Activando el mod integrado You Should Know"
claude plugin enable cc-plugin-you-should-know@builtin || failed+=("cc-plugin-you-should-know@builtin")

echo
claude plugin list || true
echo
if ((${#failed[@]})); then
  echo "Terminó con fallos en: ${failed[*]}" >&2
  echo "Revisa el mensaje de cada uno; el resto quedó instalado." >&2
  exit 1
fi
echo "Listo. Abre una sesión nueva de Claude Code (o /reload-plugins en una abierta): los mods cargan al iniciar."
if [[ "$SCOPE" == "project" ]]; then
  echo "Alcance project: haz commit de .claude/settings.json; cada colaborador ejecuta este script una vez."
fi
echo "Comandos: /agents-info  /filetree  /rec  /simple  /dock  /skin  /replay"
