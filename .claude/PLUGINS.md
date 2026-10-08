# Plugins de Claude Code en este repositorio

`.claude/settings.json` declara los marketplaces y los plugins habilitados para
este proyecto, así que cualquier sesión de Claude Code (local o en la nube) que
se abra sobre este repo los instala y habilita automáticamente.

Ese archivo no está versionado (`.claude/.gitignore` lo excluye). La plantilla
`settings.plugins.example.json`, en esta misma carpeta, lleva el contenido:
cópiala a `.claude/settings.json` una vez por máquina.

## Plugins habilitados

| Plugin | Marketplace (repo) | Qué aporta |
| --- | --- | --- |
| `codex@openai-codex` | `openai/codex-plugin-cc` | 11 skills + agente `codex-rescue`: `/codex:review`, `/codex:adversarial-review`, `/codex:rescue`, `/codex:transfer`, `/codex:status`, `/codex:result`, `/codex:cancel`, `/codex:setup`. ~451 tokens always-on. |
| `claude-mem@thedotmack` | `thedotmack/claude-mem` | Memoria persistente entre sesiones: 22 skills, 8 hooks y el servidor MCP `mcp-search`. ~2 243 tokens always-on. |
| `headroom@headroom-marketplace` | `headroomlabs-ai/headroom` | Hooks de arranque (SessionStart, PreToolUse). 0 tokens always-on. |
| `claude-code-setup@anthropic-plugin-directory` | integrado (Anthropic Directory) | Skill `claude-automation-recommender`: recomienda hooks, skills, MCP y subagentes para el repo. ~141 tokens always-on. |

Coste total always-on: ~2,8 k tokens por sesión, casi todo de `claude-mem`.
Para desactivar uno sin desinstalarlo, pon su valor en `false` dentro de
`enabledPlugins`.

## Requisito extra de `codex`

El plugin envuelve el CLI de Codex; no lo trae incluido. En la máquina donde se
use hace falta:

```bash
npm install -g @openai/codex   # requiere Node.js >= 18.18
codex login                    # suscripción de ChatGPT (incluye Free) o OPENAI_API_KEY
```

Luego, dentro de Claude Code, `/codex:setup` comprueba que todo esté listo. En
sesiones en la nube el CLI de Codex no está instalado ni autenticado, así que
los comandos `/codex:*` solo funcionan en local.

`/codex:setup` también puede activar un *review gate* (hook `Stop`) que bloquea
el final del turno hasta que la revisión de Codex pase. El README de OpenAI
advierte que puede entrar en bucles largos y consumir rápido los límites de uso;
viene desactivado.

## Instalación manual (equivalente, sin este archivo de settings)

Los nombres de marketplace que publica cada repo no coinciden con el nombre del
repo, por eso estos son los identificadores correctos:

```
/plugin marketplace add openai/codex-plugin-cc
/plugin install codex@openai-codex

/plugin marketplace add thedotmack/claude-mem
/plugin install claude-mem@thedotmack

/plugin marketplace add headroomlabs-ai/headroom
/plugin install headroom@headroom-marketplace

/plugin install claude-code-setup          # ya viene en el directorio integrado
```

`/plugin` solo existe en la CLI interactiva de Claude Code. El equivalente no
interactivo es `claude plugin marketplace add …` y `claude plugin install …`.
