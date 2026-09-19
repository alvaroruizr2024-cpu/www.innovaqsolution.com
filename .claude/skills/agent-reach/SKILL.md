---
name: agent-reach
description: Instala, configura, diagnostica y usa Agent Reach (repo open source Panniantong/Agent-Reach, gratis) para que Claude Code lea Internet de verdad desde la terminal — transcripciones y búsqueda en YouTube, tuits y búsquedas en X/Twitter, hilos de Reddit, perfiles y empleos de LinkedIn, Instagram, Facebook, GitHub, RSS, cualquier web vía Jina Reader y búsqueda semántica Exa, con un solo comando y sin coste de APIs. Úsala SIEMPRE que el usuario pida instalar, actualizar, reparar o desinstalar Agent Reach; que Claude lea, resuma, transcriba, busque o monitoree contenido de YouTube, TikTok, X, Reddit, LinkedIn, Instagram, Facebook, un podcast o un RSS ("qué dicen en Twitter/Reddit sobre…", "transcribe este video", "qué opina la gente de este producto"); o cuando WebFetch falle con 403, login obligatorio o página vacía. También para social listening e investigación de competencia de INNOVAQ (SIG360, ERP360, FOOD360, etc.) y PANASUR. Use for any Agent Reach or closed-platform reading request.
---

# Agent Reach — que Claude Code lea Internet de verdad

Esta skill nace de un video (TikTok de @revolutia.ai, "Claude tiene un problema gordo"):
Claude no puede leer las plataformas donde de verdad está la información —Twitter,
LinkedIn, Reddit, YouTube— y alguien lo resolvió con **Agent Reach**, un repositorio
open source y gratuito con 38 000 estrellas. Pegas un comando en la terminal, lo metes en
Claude Code y ya está: acceso real, con cero coste de APIs, en vez de "esos web fetches
que fallan". La transcripción completa y lo que aparece en pantalla están en
`references/video-transcripcion.md`.

Aquí reproducimos ese flujo con dos matices que el video omite: la instalación es
**segura por defecto** (solo comprueba; cambiar el sistema exige aprobación explícita del
usuario) y varias plataformas **necesitan una sesión que solo el usuario puede aportar**
(cookies de X, login de Reddit o LinkedIn). El valor no está en un scraper concreto: está
en que una sola herramienta elige, instala y diagnostica el mejor backend de cada
plataforma, y Claude llama a esas herramientas directamente.

---

## 0. Qué es Agent Reach (y qué no es)

- **Capa de capacidad, no un wrapper.** `agent-reach` selecciona, instala, comprueba
  (`doctor`) y enruta. La lectura la hacen herramientas aguas arriba que Claude invoca
  directamente: `yt-dlp`, `gh`, `curl` + Jina Reader, `twitter-cli`, `opencli`, `rdt-cli`,
  `mcporter` (Exa y LinkedIn), `feedparser`, `bili-cli`.
- **Cada plataforma = lista ordenada de backends** (principal + respaldos). Si una ruta
  muere, el proyecto cambia el orden; `agent-reach doctor` siempre dice cuál está activa.
- **Gratis y local.** Todo es open source; las cookies y tokens quedan en
  `~/.agent-reach/` con permisos 600. El único coste posible es un proxy residencial
  (~1 USD/mes) si se despliega en un servidor, nunca en un PC.
- **Compatible con cualquier agente que ejecute comandos:** Claude Code, Cursor,
  Windsurf, OpenClaw.

Qué funciona sin configurar y qué necesita al usuario:

| Plataforma | Sin configurar | Con configuración | Quién la aporta |
|-----------|----------------|-------------------|-----------------|
| Web (cualquier URL) | Leer en Markdown limpio (Jina) | — | nadie |
| YouTube | Subtítulos, metadatos, búsqueda (yt-dlp) | — | nadie |
| GitHub | Repos públicos y búsqueda (gh) | Privados, issues, PR | `gh auth login` |
| RSS / Atom | Leer cualquier feed | — | nadie |
| Búsqueda web | — | Búsqueda semántica Exa (MCP, sin clave) | se configura sola con `--system` |
| Twitter / X | Leer un tuit suelto | Buscar, timeline, artículos | cookies vía Cookie-Editor |
| Reddit | nada (endpoints anónimos bloqueados) | Buscar y leer hilos y comentarios | sesión de Chrome (OpenCLI) o `rdt login` |
| LinkedIn | Páginas públicas (Jina) | Perfiles, empresas, empleos | login manual en navegador |
| Facebook / Instagram | — | Búsqueda, perfiles, feed, grupos | sesión de Chrome (OpenCLI, solo escritorio) |
| Podcasts (Xiaoyuzhou) | — | Transcripción con Whisper | clave gratuita de Groq |

---

## 1. Cuándo aplicar esta skill y qué ruta tomar

1. **"Instala / configura Agent Reach"** → sección 2 (instalación).
2. **"Lee / resume / busca en YouTube, X, Reddit, LinkedIn…"** → primero
   `agent-reach doctor` (o `scripts/check_env.sh` si ni siquiera está instalado); si el
   canal está ✅, sección 3 (uso); si no, ofrece instalar o configurar ese canal.
3. **"Actualiza / arregla / desinstala"** → sección 4.
4. **WebFetch falló (403, login, HTML vacío)** → no insistas con WebFetch: propón la ruta
   de Agent Reach para esa plataforma y explica qué necesitaría del usuario.

Si Agent Reach no está instalado y el usuario solo quería un dato rápido, dilo en una
línea y ofrece la instalación; no la lances sin preguntar, porque el paso `--system`
instala CLI globales y toca su máquina.

---

## 2. Instalación (el "un solo comando" del video, hecho bien)

### Paso 1 — El comando que se pega en Claude Code

Lo que el video muestra es, literalmente, pegar esta frase en el prompt de Claude Code:

```
Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

Claude descarga esa guía y la sigue. Cuando te llegue esa frase (o esta skill se active
para instalar), **descarga la versión vigente de la guía** antes de actuar, porque los
backends cambian de mes en mes:

```bash
curl -s https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md
```

Si no hay red, `references/install-guide.md` es la copia del 2026-09-19.

### Paso 2 — Chequeo de solo lectura y aviso al usuario

```bash
bash .claude/skills/agent-reach/scripts/check_env.sh     # no instala nada
```

Con el resultado, explica en dos líneas qué hay (Python ≥ 3.10, pipx, Node, gh) y qué
ruta vas a usar. Elige así:

| Situación | Ruta |
|-----------|------|
| Hay `pipx` | `pipx install https://github.com/Panniantong/agent-reach/archive/main.zip` |
| pip responde `externally-managed-environment` (macOS Homebrew, Linux moderno) | venv en `~/.agent-reach-venv` y `pip install` del mismo zip |
| Windows PowerShell (el caso del video) | `py -3 -m venv $env:USERPROFILE\.agent-reach-venv`, activar, `python -m pip install <zip>` |

Nunca `pip install agent-reach` desde PyPI: es otro paquete con el mismo nombre.

### Paso 3 — Comprobación por defecto, sin tocar el sistema

```bash
agent-reach install --env=auto
```

Esto solo revisa Node.js, gh CLI, mcporter, Exa y yt-dlp y lista lo que falta. Muestra
la salida al usuario y **pide aprobación explícita** antes del siguiente paso. Si quiere
ver qué haría exactamente: `agent-reach install --env=auto --dry-run`.

### Paso 4 — Instalación real (solo con aprobación)

```bash
agent-reach install --env=auto --system
```

Instala lo que falte, conecta Exa por MCP y registra la skill del propio proyecto en los
agentes que detecte (en Claude Code, `~/.claude/skills/agent-reach/SKILL.md`). Respeta
los límites de la guía oficial: sin `sudo` salvo aprobación, nada fuera de
`~/.agent-reach/`, ningún archivo dentro del proyecto de trabajo, nada que no esté en la
guía.

### Paso 5 — Canales opcionales, a elección del usuario

Presenta la lista y que elija; cada canal con login implica una acción humana:

```
Base instalada: web, YouTube, GitHub, RSS, búsqueda Exa.
Opcionales (dime cuáles):
- OpenCLI (escritorio) — Reddit, Facebook, Instagram con tu sesión de Chrome; un clic para instalar la extensión.
- Twitter/X — búsqueda y timeline; necesito las cookies que exportes con Cookie-Editor.
- LinkedIn — perfiles y empleos; login manual una vez en un navegador.
- Reddit — obligatorio con sesión (OpenCLI) o rdt-cli + cookie.
Ejemplo: "instala OpenCLI y Twitter", o "todo".
```

```bash
agent-reach install --env=auto --system --channels=opencli,twitter
```

Nombres válidos y requisitos de cada canal: `references/comandos.md`, sección 3.

### Paso 6 — Doctor y reporte

```bash
agent-reach doctor
```

Intenta dejar en ✅ todo lo que no dependa de credenciales. Lo que sí dependa
(cookies, logins), pídelo con la instrucción exacta (Cookie-Editor → Export → Header
String, o `uvx mcp-server-linkedin@latest --login`). Recomienda **cuenta secundaria**
para X, Reddit, Facebook e Instagram: las plataformas pueden suspender cuentas que hacen
llamadas fuera del navegador, y una cookie es acceso total.

Termina con un reporte corto: versión, canales disponibles sobre el total, backend activo
de los multi-backend, y qué queda pendiente del usuario.

---

## 3. Uso diario: qué comando para cada pedido

Regla: **llama a la herramienta aguas arriba directamente**; Agent Reach no se usa para
leer. Tabla completa con ejemplos en `references/comandos.md`, sección 4.

| Pedido del usuario | Comando |
|--------------------|---------|
| "¿Qué dice este video de YouTube?" | `yt-dlp --write-auto-sub --sub-lang es,en --skip-download URL` y lee el `.vtt`; metadatos con `yt-dlp --dump-json URL` |
| "Busca videos sobre X" | `yt-dlp "ytsearch10:consulta" --dump-json --flat-playlist` |
| "Lee esta página" (WebFetch falló) | `curl -s "https://r.jina.ai/URL"` |
| "Busca en Internet…" | `mcporter call exa.web_search_exa query="..." numResults=5` |
| "¿Qué dicen en Twitter de…?" | `twitter search "consulta" -n 20` (con `TWITTER_AUTH_TOKEN` y `TWITTER_CT0` exportadas); sin cookies, `exa` con `site:x.com` |
| "¿Qué dicen en Reddit de…?" | `opencli reddit search "consulta" -f yaml` o `rdt read POST_ID` |
| "Perfil de LinkedIn de…" | `mcporter call linkedin.get_person_profile linkedin_username="..."`; página pública con Jina |
| "¿Qué publica esta cuenta de Instagram?" | `opencli instagram user cuenta -f yaml` |
| "¿De qué va este repo / qué issues tiene?" | `gh repo view owner/repo` · `gh issue list -R owner/repo` |
| "Sigue estas fuentes RSS" | `feedparser` en una línea de Python |

Al entregar resultados, cita la fuente (URL del tuit, hilo, video) y la fecha; el usuario
va a reutilizar eso en informes o piezas de redes.

### Casos típicos en INNOVAQ y PANASUR

- **Social listening de un producto** ("qué opina la gente de los ERP para restaurantes",
  para FOOD360): Exa para el panorama, `twitter search` y `opencli reddit search` para
  la conversación real, y una tabla final con fuente, fecha, cita y sentimiento.
- **Investigación de competencia:** `curl r.jina.ai` sobre la web del competidor, `gh`
  si tiene repos, LinkedIn para tamaño de equipo y vacantes.
- **Convertir videos en material propio** (como este mismo video → skill, o un video
  técnico → post para `campaigns/`): `yt-dlp` para subtítulos y luego `launch-kit` si el
  resultado es una campaña. Para TikTok, `yt-dlp` también descarga el video; los
  subtítulos grabados en la imagen se leen extrayendo fotogramas.
- **Monitoreo semanal:** una tarea programada que corra `agent-reach watch` y avise solo
  si hay ❌ o versión nueva.

---

## 4. Mantener, reparar, desinstalar

- **Actualizar:** el video no lo cuenta, pero es igual de "un comando":
  `Update Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/update.md`.
  Pasos en `references/update-guide.md`: `check-update` → reinstalar el zip con `--force`
  o `--upgrade` → refrescar solo las CLI ya instaladas → `doctor`. No desinstales
  backends retirados: siguen como respaldo.
- **Reparar:** `agent-reach doctor` imprime la receta de cada canal roto. Los fallos
  más comunes (PEP 668, `python3` de la Microsoft Store, Twitter sin variables de
  entorno, Reddit 403, `fetch failed` por red) están resueltos en
  `references/comandos.md`, sección 7.
- **Desinstalar:** `agent-reach uninstall --dry-run` y luego `agent-reach uninstall`
  (`--keep-config` conserva tokens). Borra `~/.agent-reach/`, las skills registradas y la
  config MCP; el paquete Python se quita con `pipx uninstall agent-reach`.

---

## 5. Límites que no se negocian

- Instalar es cambiar la máquina del usuario: el modo por defecto es solo lectura y
  `--system` solo con su aprobación en esa conversación.
- Las credenciales las exporta el usuario a mano (Cookie-Editor, login en navegador).
  No automatices logins, no leas cookies del navegador por tu cuenta, no pidas
  contraseñas.
- Nada de Agent Reach se crea dentro del repositorio de trabajo: todo va a
  `~/.agent-reach/`, `~/.agent-reach-venv/` o `/tmp/`.
- Si `agent-reach install --system` reescribe `~/.claude/skills/agent-reach/SKILL.md`
  con la skill del propio proyecto, es normal; esta skill vive también en el repo
  (`.claude/skills/agent-reach/`) y las dos conviven.

---

## Archivos de esta skill

| Archivo | Cuándo leerlo |
|---------|---------------|
| `references/comandos.md` | Referencia rápida en español: rutas de instalación, modos, canales, comando por plataforma, cookies, diagnóstico, problemas frecuentes. Léelo al instalar o al usar un canal por primera vez. |
| `references/install-guide.md` | Copia literal de la guía oficial `docs/install.md` (2026-09-19). Úsala si no hay red; si hay, descarga la vigente. |
| `references/update-guide.md` | Copia literal de `docs/update.md`. Para actualizar. |
| `references/video-transcripcion.md` | Transcripción y cronología del video de origen, con cada afirmación contrastada con el repositorio. |
| `scripts/check_env.sh` | Chequeo de solo lectura del entorno (Python, pipx, Node, gh, CLIs, credenciales). Ejecútalo antes de proponer una ruta de instalación. |
