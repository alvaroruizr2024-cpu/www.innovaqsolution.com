# Plugins de Claude Code para este proyecto

Los cinco plugins/herramientas del video "No uses Claude Code hasta que hayas
instalado estos 5 plugins" (@migue.baena), ya configurados para este repo.

Instalación en tu máquina, desde la raíz del repo:

```bash
bash scripts/setup-claude-plugins.sh
```

Luego abre una sesión **nueva** de Claude Code en el repo. Los dos plugins de
Claude Code se cargan solos porque están declarados en `.claude/settings.json`
(scope de proyecto): la primera vez Claude Code te pedirá confirmar los
marketplaces `thedotmack` y `claude-plugins-official`.

| # | Herramienta | Qué hace | Tipo |
|---|-------------|----------|------|
| 1 | OmniRoute | Gateway gratuito: conecta Claude Code a 350+ proveedores de IA y cambia de modelo automáticamente al llegar al límite | CLI externo (npm) |
| 2 | claude-mem | Memoria persistente: Claude recuerda tus proyectos y archivos entre sesiones | Plugin Claude Code |
| 3 | Headroom | Filtra el contexto y envía solo lo importante para reducir consumo de tokens | CLI externo (pip) |
| 4 | claude-code-setup | Analiza tu código y recomienda hooks, skills, subagentes y servidores MCP | Plugin oficial Anthropic |
| 5 | task-observer | Observa cómo trabajas, aprende tu estilo y mejora tus skills en segundo plano | Skill de proyecto |

## 1. OmniRoute

Repositorio: https://github.com/diegosouzapw/OmniRoute

```bash
npm install -g omniroute
omniroute launch            # API + dashboard en http://localhost:20128
omniroute setup-claude      # asistente que configura Claude Code
```

Configuración manual, si prefieres variables de entorno:

```bash
export ANTHROPIC_BASE_URL=http://localhost:20128   # sin sufijo /v1
export ANTHROPIC_AUTH_TOKEN=<token del dashboard>
export CLAUDE_CODE_ENABLE_GATEWAY_MODEL_DISCOVERY=1
claude
```

Claude Code lee estas variables al arrancar: reinícialo tras cambiarlas.

## 2. claude-mem

Repositorio: https://github.com/thedotmack/claude-mem

Ya está instalado a nivel de proyecto. Comandos útiles dentro de Claude Code:

- `/mem-search` busca en la memoria de sesiones anteriores.
- `/learn-codebase` carga todo el repo en memoria de una sola pasada.
- `/how-it-works` explica qué captura y dónde guarda los datos.
- Visor web: http://localhost:37777

Requisitos: Node 20+. Bun y uv se instalan solos si faltan. La memoria se
guarda en `~/.claude-mem/`.

## 3. Headroom

Repositorio: https://github.com/headroomlabs-ai/headroom

```bash
pip install "headroom-ai[all]"      # o: uv tool install "headroom-ai[all]"
headroom wrap claude                # lanza Claude Code a través del proxy
headroom doctor                     # diagnóstico
headroom unwrap claude              # deshacer
```

`headroom wrap claude` arranca un proxy local (puerto 8787) y lanza Claude Code
con `ANTHROPIC_BASE_URL` apuntando a él. Opciones: `--memory`, `--code-graph`.

## 4. claude-code-setup

Repositorio: https://github.com/anthropics/claude-plugins-official/tree/main/plugins/claude-code-setup

Ya está instalado a nivel de proyecto. Es de solo lectura: no modifica archivos.
Pídelo en lenguaje natural dentro de Claude Code:

- "recommend automations for this project"
- "help me set up Claude Code"
- "what hooks should I use?"

## 5. task-observer (One Skill to Rule Them All)

Repositorio: https://github.com/rebelytics/one-skill-to-rule-them-all
Autor: Eoghan Henn / rebelytics.com. Licencia CC BY 4.0.

El script de instalación clona el skill en `.claude/skills/task-observer/`
(SKILL.md, `references/` y `scripts/`). La activación tiene dos capas:

1. El bloque "task-observer activation" en `CLAUDE.md` (ya incluido).
2. Opcional, pero es la única capa garantizada: un hook `SessionStart` en
   `.claude/settings.json` que inyecte la instrucción de activación en cada
   sesión. El script de ejemplo y el snippet de configuración están en
   `.claude/skills/task-observer/references/environments.md`, sección
   "A session-start hook", una vez instalado el skill.

Las observaciones se guardan fuera del repo, en
`~/.claude/skill-observations/innovaqsolution/`. Para cambiar la ruta exporta
`OBS_WORKSPACE` antes de ejecutar el script y actualiza las rutas en `CLAUDE.md`.

Verificación: en una sesión nueva, comprueba que Claude invoca el skill antes
de la primera herramienta. Si tras varias sesiones no existe
`skill-observations/observation-log/`, la activación no ocurrió.

Al terminar una sesión pregunta "Any observations logged?" y programa una
revisión periódica que aplique las observaciones abiertas.
