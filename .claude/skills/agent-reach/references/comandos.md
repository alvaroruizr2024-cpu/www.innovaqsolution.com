# Agent Reach — referencia rápida de comandos (en español)

Resumen operativo destilado de `install-guide.md`, `update-guide.md`, el README del
repositorio y `docs/troubleshooting.md`. Cuando algo aquí contradiga la guía oficial
vigente, manda la guía oficial: los backends cambian (en marzo de 2026 retiraron varias
CLI de una sola plataforma y en junio de 2026 yt-dlp dejó de servir para Bilibili).

## Índice

1. Instalación del paquete
2. Modos de `agent-reach install`
3. Canales opcionales
4. Comando por plataforma (uso diario)
5. Credenciales y cookies
6. Diagnóstico, actualización y desinstalación
7. Problemas frecuentes
8. Límites y directorios

---

## 1. Instalación del paquete

El paquete se instala **desde GitHub**, nunca desde PyPI (el paquete `agent-reach` de
PyPI es otro proyecto). Requiere Python 3.10 o superior.

```bash
# Opción A (recomendada): pipx, aísla el paquete y deja el comando en el PATH
pipx install https://github.com/Panniantong/agent-reach/archive/main.zip

# Opción B: entorno virtual (obligatoria si pip da "externally-managed-environment", PEP 668)
python3 -m venv ~/.agent-reach-venv
source ~/.agent-reach-venv/bin/activate
pip install https://github.com/Panniantong/agent-reach/archive/main.zip
```

Windows PowerShell (es lo que se ve en el video). Si `python3` abre la Microsoft Store,
usa el lanzador `py -3`:

```powershell
py -3 -m venv $env:USERPROFILE\.agent-reach-venv
$env:USERPROFILE\.agent-reach-venv\Scripts\Activate.ps1
python -m pip install https://github.com/Panniantong/agent-reach/archive/main.zip
agent-reach install --env=auto
```

Alternativa solo para registrar la skill del propio repositorio en el agente (después,
el agente detecta si falta la CLI y la instala):

```bash
npx skills add Panniantong/Agent-Reach@agent-reach
```

## 2. Modos de `agent-reach install`

| Comando | Qué hace | Toca el sistema |
|---------|----------|-----------------|
| `agent-reach install --env=auto` | Comprueba Node.js, gh CLI, mcporter, Exa, yt-dlp y lista lo que falta. **Es el modo por defecto y es de solo lectura.** | No |
| `agent-reach install --env=auto --dry-run` | Muestra lo que haría `--system` sin hacerlo. | No |
| `agent-reach install --env=auto --safe` | Alias de compatibilidad del modo por defecto. | No |
| `agent-reach install --env=auto --system` | Instala y configura lo que falta, conecta Exa por MCP y registra `SKILL.md` en los directorios de skills de los agentes detectados. | **Sí** |
| `agent-reach install --env=auto --system --channels=a,b` | Lo anterior más los canales opcionales indicados. | **Sí** |

Canales que se activan con `--system` sin configuración adicional: Web (Jina Reader),
YouTube, GitHub, RSS, búsqueda Exa, V2EX, Bilibili básico.

`--env=auto` detecta si es un PC de escritorio o un servidor. `--env=local` fuerza modo
escritorio (necesario para el canal `boss`).

## 3. Canales opcionales

Nombres válidos para `--channels`: `opencli`, `twitter`, `xiaoyuzhou`, `xueqiu`,
`xiaohongshu`, `reddit`, `facebook`, `instagram`, `bilibili`, `linkedin`, `boss`, `all`.

| Canal | Qué desbloquea | Requisito humano |
|-------|----------------|------------------|
| `opencli` | Backend de escritorio para Reddit, Facebook, Instagram, subtítulos de Bilibili, respaldo de Twitter y Xiaohongshu. Reutiliza la sesión de Chrome del usuario. | Instalar la extensión OpenCLI en Chrome (un clic en la Chrome Web Store) y verificar con `opencli doctor`. |
| `twitter` | Búsqueda de tuits, timeline, artículos largos. | Exportar cookies de x.com con Cookie-Editor y entregarlas. |
| `reddit` | Buscar y leer hilos y comentarios. No hay ruta anónima. | Sesión de Reddit en Chrome (OpenCLI) o `rdt login` con cookie. |
| `linkedin` | Perfiles completos, empresas, búsqueda de empleo. | Instalar `uv`; login manual en un navegador con `uvx mcp-server-linkedin@latest --login`. |
| `facebook`, `instagram` | Búsqueda, perfiles, feed, grupos (FB); búsqueda de usuarios, perfiles, posts recientes (IG). Solo escritorio. | Estar logueado en Chrome. |
| `xiaoyuzhou` | Transcripción de podcasts con Groq Whisper. | Clave gratuita de Groq (`gsk_...`). |
| `xueqiu`, `xiaohongshu`, `bilibili`, `boss` | Plataformas chinas (bolsa, notas, video, empleo). | Cookies o Chrome dedicado; ver guía oficial. |

Ejemplos:

```bash
agent-reach install --env=auto --system --channels=opencli,reddit
agent-reach install --env=auto --system --channels=twitter,linkedin
agent-reach install --env=auto --system --channels=all      # solo si el usuario lo aprueba todo
```

## 4. Comando por plataforma (uso diario)

Agent Reach es selector, instalador y médico; **la lectura la hace la herramienta aguas
arriba**, invocada directamente. Cuando un canal tiene varios backends, el activo lo
dice `agent-reach doctor --json` en `active_backend`.

| Plataforma | Herramienta | Ejemplo |
|-----------|-------------|---------|
| Cualquier web | `curl` + Jina Reader | `curl -s "https://r.jina.ai/https://ejemplo.com/pagina"` |
| Búsqueda semántica | `mcporter` + Exa | `mcporter call exa.web_search_exa query="comparativa ERP para pymes Perú" numResults=5` |
| YouTube (subtítulos, metadatos) | `yt-dlp` | `yt-dlp --dump-json URL` · `yt-dlp --write-auto-sub --sub-lang es --skip-download URL` |
| YouTube (búsqueda) | `yt-dlp` | `yt-dlp "ytsearch10:agent reach claude code" --dump-json --flat-playlist` |
| GitHub | `gh` | `gh repo view owner/repo` · `gh search repos "query"` · `gh issue list -R owner/repo` |
| RSS / Atom | `feedparser` | `python3 -c "import feedparser; f=feedparser.parse('URL'); [print(e.title, e.link) for e in f.entries[:10]]"` |
| Twitter / X | `twitter` (respaldo `opencli`) | `export TWITTER_AUTH_TOKEN=... TWITTER_CT0=...` y luego `twitter search "query" -n 10` · `twitter tweet URL` |
| Reddit | `opencli` (respaldo `rdt`) | `opencli reddit search "query" -f yaml` · `rdt read POST_ID` |
| LinkedIn | `mcporter` (respaldo Jina) | `mcporter call linkedin.get_person_profile linkedin_username="..."` |
| Facebook | `opencli` | `opencli facebook search "query" -f yaml` · `opencli facebook profile nombre -f yaml` |
| Instagram | `opencli` | `opencli instagram user nasa -f yaml` · `opencli instagram profile nasa -f yaml` |
| Bilibili | `bili` (subtítulos con `opencli`) | `bili search "query" --type video` · `opencli bilibili subtitle BVxxx` |
| Podcast Xiaoyuzhou | `transcribe.sh` | `bash ~/.agent-reach/tools/xiaoyuzhou/transcribe.sh URL` |

Twitter sin cookies: usar Exa como sustituto,
`mcporter call exa.web_search_exa query="site:x.com <tema>" numResults=5`.

## 5. Credenciales y cookies

- Todas las credenciales se guardan en local, en `~/.agent-reach/` (`config.yaml`, permisos 600). No se suben a ningún sitio.
- **Usa una cuenta secundaria** en las plataformas que van por cookie o sesión (X, Reddit, Facebook, Instagram): las plataformas pueden detectar llamadas no-navegador y suspender la cuenta, y una cookie equivale a acceso total.
- Flujo Cookie-Editor: el usuario inicia sesión en su navegador, instala la extensión Cookie-Editor, pulsa Export → Header String y pega el resultado al agente. Luego `agent-reach configure twitter-cookies`.
- Lo que guarda `configure twitter-cookies` sirve para que `doctor` sepa que las credenciales existen. Para ejecutar `twitter ...` hay que exportar `TWITTER_AUTH_TOKEN` y `TWITTER_CT0` en el mismo proceso.
- Otros configuradores: `agent-reach configure proxy` (proxy residencial para servidores), `agent-reach configure groq-key` (transcripción de podcasts), `agent-reach configure --from-browser chrome --platform xueqiu`.

## 6. Diagnóstico, actualización y desinstalación

```bash
agent-reach doctor            # estado de cada canal, backend activo y receta de arreglo
agent-reach doctor --json     # lo mismo, legible por máquina
agent-reach version
agent-reach check-update
agent-reach watch             # chequeo rápido de salud y versiones, para tareas programadas
agent-reach skill --install   # reescribe la skill que Agent Reach registra en los agentes
```

Actualizar (la guía completa está en `update-guide.md`):

```bash
pipx install --force https://github.com/Panniantong/agent-reach/archive/main.zip   # si se instaló con pipx
pip install --upgrade https://github.com/Panniantong/agent-reach/archive/main.zip  # si fue venv (activarlo antes)
agent-reach doctor
```

Al actualizar, solo se refrescan las herramientas ya instaladas; no se instalan nuevas
ni se desinstalan las retiradas (siguen como respaldo).

Desinstalar:

```bash
agent-reach uninstall --dry-run      # previsualizar
agent-reach uninstall                # borra ~/.agent-reach/, skills registradas y config MCP
agent-reach uninstall --keep-config  # conserva tokens para reinstalar
pip uninstall agent-reach            # o pipx uninstall agent-reach
```

## 7. Problemas frecuentes

| Síntoma | Causa | Arreglo |
|---------|-------|---------|
| `pip install` falla con `externally-managed-environment` | PEP 668 (Python de Homebrew o del sistema). | Usar `pipx` o un venv (sección 1). |
| `python3` abre la Microsoft Store en Windows | `python3` es un alias de la Store, no un Python real. | Usar `py -3` o el `python.exe` de la instalación real. |
| `twitter search` falla o dice "Missing credentials" | Faltan `TWITTER_AUTH_TOKEN` / `TWITTER_CT0` en el entorno del proceso, o la red exige proxy. | Exportar las variables; `twitter check`; si no, usar Exa con `site:x.com`. |
| Reddit devuelve 403 | Endpoints anónimos bloqueados; IP de servidor. | OpenCLI con sesión de Chrome (escritorio) o `rdt login`; en servidor, proxy residencial. |
| Canal marcado ❌ / ⚠️ en `doctor` | El backend activo no responde. | `doctor` imprime la receta exacta; aplicarla y volver a ejecutar `doctor`. |
| `boss status` dice logueado pero la búsqueda da `AUTH_EXPIRED` | Dos almacenes de sesión distintos. | `AUTH_EXPIRED` es la verdad: login manual en el Chrome dedicado y `boss --cdp-url http://localhost:9222 login --cdp`. |
| Xueqiu devuelve HTTP 400 | Necesita cookie de sesión. | Login en Chrome y `agent-reach configure --from-browser chrome --platform xueqiu`. |
| `fetch failed` desde redes restringidas | Sin salida a x.com / reddit.com. | `agent-reach configure proxy` y exportar `HTTP_PROXY` / `HTTPS_PROXY`. |

## 8. Límites y directorios

Reglas que la guía oficial impone al agente que instala:

- No usar `sudo` sin aprobación explícita del usuario.
- No modificar archivos del sistema fuera de `~/.agent-reach/`.
- No instalar paquetes que no estén en la guía.
- No desactivar cortafuegos ni protecciones.
- No clonar repos, crear archivos ni ejecutar comandos dentro del proyecto o directorio de trabajo del agente.
- Si algo necesita permisos elevados, decírselo al usuario y que decida.

| Propósito | Directorio |
|-----------|-----------|
| Configuración y tokens | `~/.agent-reach/` (`config.json` / `config.yaml`) |
| Repos de herramientas aguas arriba | `~/.agent-reach/tools/` |
| Temporales | `/tmp/` |
| Skill registrada en OpenClaw | `~/.openclaw/skills/agent-reach/` |
| Skill registrada en Claude Code | `~/.claude/skills/agent-reach/` (la escribe `--system` o `agent-reach skill --install`) |

Ojo: `agent-reach install --system` puede escribir su propio `SKILL.md` en
`~/.claude/skills/agent-reach/`. `doctor` respeta un archivo existente y no lo
sobrescribe; `agent-reach skill --install` sí lo reemplaza.
