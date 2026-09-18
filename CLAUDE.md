# www.innovaqsolution.com

Sitio estático (HTML/CSS/JS) de Innova Q Solution publicado con GitHub Pages
(ver `CNAME`). Cada carpeta de producto (ERP360, SIG360, TPM360, etc.) es una
landing independiente. No hay build ni tests: los cambios se validan abriendo
los HTML en el navegador.

## Plugins de Claude Code configurados en este repo

Instalación local: `bash scripts/setup-claude-plugins.sh`. Detalle en
`docs/CLAUDE_PLUGINS.md`.

- **claude-mem**: memoria persistente entre sesiones. Usa `/mem-search` para
  recuperar trabajo previo antes de repetir una investigación.
- **claude-code-setup**: pide "recommend automations for this project" para
  obtener recomendaciones de hooks, skills, subagentes y servidores MCP.
- **task-observer**: meta-skill que registra observaciones de cada sesión
  (bloque de activación abajo).
- **OmniRoute** y **Headroom** son herramientas externas (gateway de modelos y
  compresión de contexto); se usan al lanzar Claude Code, no desde el chat.

## task-observer activation

Before the first tool call of any session — and before writing or
proposing a plan, not merely before executing one — invoke the
task-observer skill AND execute its Session Start Protocol (storage
check, frontmatter scan, review trigger). Loading the skill and running
the protocol are separate steps; a session that loads the file and stops
has activated nothing. Any turn that will involve a tool call counts; do
not classify the session as "too simple" from its opening message.
If the skill is not installed under `.claude/skills/task-observer/`, say so
once and continue; do not fetch it yourself.

Select skills on the DECISION the request is about, not on the artefact it
arrived as. Name what the user is deciding, then match the installed skill
descriptions against that — a request handed over as a file to review
still needs the skill whose description names its subject.

After completing each task, check the observation records written this
session and report a one-line summary (ids and titles, or "none logged
and why").

Loading a skill is not complete until you have queried the observation
log for OPEN observations naming it and read their bodies:
  grep -l "skill:.*<skill-name>" \
    ~/.claude/skill-observations/innovaqsolution/skill-observations/observation-log/*.md
Apply their insights to the current work, even if the skill file hasn't
been updated yet.

The task-observer workspace for this project is:
  ~/.claude/skill-observations/innovaqsolution
Every path the skill uses derives from that root and nothing else:
  ~/.claude/skill-observations/innovaqsolution/skill-observations/observation-log/
  ~/.claude/skill-observations/innovaqsolution/skill-observations/cross-cutting-principles.md
  ~/.claude/skill-observations/innovaqsolution/skill-updates/
  ~/.claude/skill-observations/innovaqsolution/skill-updates/PENDING.md
Never resolve any of them from the current working directory — a cwd
inside an ephemeral checkout (a git worktree, a temporary clone) is torn
down and takes the log with it. Never place the workspace inside a
skills-discovery directory or any path linked into one.
