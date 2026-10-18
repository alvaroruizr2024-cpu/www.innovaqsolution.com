#!/usr/bin/env bash
# Instala los 9 mods del video "Estos 9 MODS de Claude son MUY BESTIAS" en Claude Code.
# Requiere Claude Code 2.1.287 o superior: https://code.claude.com/docs/en/plugins
set -euo pipefail

MARKET="innovaq-mods"
REPO="alvaroruizr2024-cpu/www.innovaqsolution.com"
MODS=(savvy-progress savvy-flow filetree next-steps recording-mode clean-view agent-dock skins replay-theater)

if ! command -v claude >/dev/null 2>&1; then
  echo "No encuentro la CLI 'claude'. Instala Claude Code primero: https://code.claude.com/docs/en/setup" >&2
  exit 1
fi

echo "==> Claude Code $(claude --version 2>/dev/null | head -1)"
echo "==> Registrando el marketplace $MARKET ($REPO)"
if claude plugin marketplace list 2>/dev/null | grep -q "$MARKET"; then
  claude plugin marketplace update "$MARKET"
else
  claude plugin marketplace add "$REPO"
fi

failed=()
for mod in "${MODS[@]}"; do
  echo "==> Instalando $mod@$MARKET"
  if ! claude plugin install "$mod@$MARKET" --scope user; then
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
echo "Listo. Abre una sesión nueva de Claude Code: los mods cargan al iniciar."
echo "Comandos: /agents-info  /filetree  /rec  /simple on  /dock  /skin  /replay"
