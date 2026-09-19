# Los cuatro plugins — referencia verificada (septiembre 2026)

Todo lo de esta página se comprobó contra el README oficial de cada proyecto. Cuando el
video y el README dicen cosas distintas, aquí manda el README. Antes de dar por buena una
cifra o un comando en una conversación con el usuario, vuelve a mirar el repo: estos
proyectos cambian rápido (OmniRoute pasó de 160 a 352 proveedores en pocos meses).

## Índice

1. [Ponytail](#1-ponytail) — menos código, menos tokens
2. [OmniRoute](#2-omniroute) — gateway a proveedores gratuitos con auto-fallback
3. [Graphify](#3-graphify) — grafo de conocimiento del repo
4. [Agent Skills](#4-agent-skills-addy-osmani) — 25 skills por fase del ciclo de vida
5. [Instalación automática por proyecto](#5-instalación-automática-por-proyecto)

---

## 1. Ponytail

- Repo: https://github.com/DietrichGebert/ponytail
- Qué es: un plugin/skill que obliga al agente a subir una "escalera de decisión" antes
  de escribir código: ¿necesita existir? → ¿ya está en el repo? → ¿lo resuelve la
  stdlib? → ¿es nativo de la plataforma? → ¿lo hace una dependencia ya instalada? →
  ¿cabe en una línea? → recién entonces, la implementación mínima. "Perezoso con las
  soluciones, riguroso con seguridad, validación y accesibilidad."
- Funciona en Claude Code, Codex CLI, Copilot, Cursor, Windsurf, Cline, Aider,
  OpenCode, Gemini CLI y más.

**Instalar en Claude Code (dos comandos, dentro de la sesión):**

```
/plugin marketplace add DietrichGebert/ponytail
/plugin install ponytail@ponytail
```

**Usar:**

| Comando | Para qué |
|---|---|
| `/ponytail lite` · `full` · `ultra` · `off` | cambiar la intensidad en la sesión (por defecto `full`) |
| `/ponytail-review` | señalar sobre-ingeniería en el diff actual, antes de un PR |
| `/ponytail-audit` | recorrer todo el repo buscando código innecesario |
| `/ponytail-debt` | recopilar los atajos diferidos en un ledger |
| `/ponytail-gain` | scoreboard LOC / tokens / costo / tiempo (el panel del video) |
| `/ponytail-help` | referencia rápida |

Modo por defecto persistente: variable `PONYTAIL_DEFAULT_MODE=lite|full|ultra|off` o
`~/.config/ponytail/config.json` con `{"defaultMode": "full"}`.

**Lo que ahorra de verdad.** El video dice "más del 50 % de tokens sin perder
precisión". El benchmark del propio proyecto reporta 54 % menos líneas de código en
promedio (hasta 94 % en casos de sobre-ingeniería), pero solo ~22 % menos tokens y ~20 %
menos costo. Una prueba independiente (JetBrains, 80 tareas pareadas) midió una mediana
de −15 % de código y −10 % de costo. Es un ahorro real, pero el número honesto para el
usuario es "entre 10 y 25 % de tokens, y bastante menos código que mantener".

**Cuándo NO usar `ultra`:** cuando el usuario pide explícitamente cobertura, abstracción
o extensibilidad (un módulo compartido entre productos de la suite, por ejemplo).
`ultra` recorta lo que juzga innecesario y puede eliminar lo que el usuario sí quería.

---

## 2. OmniRoute

- Repo canónico: https://github.com/diegosouzapw/OmniRoute (MIT, 550+ contribuidores;
  hay decenas de forks con el mismo README).
- Qué es: un gateway local con un solo endpoint compatible con la API de Anthropic y
  OpenAI, que enruta a 352 proveedores (150+ gratuitos, 1200+ modelos: Kimi, Claude,
  GPT, Gemini, GLM, DeepSeek, MiniMax...). Cascada de fallback en 4 niveles:
  Suscripción → API key → Barato → Gratis, con circuit breakers, cooldown y lockout de
  modelo. Compresión "RTK + Caveman" que reduce 15–95 % de tokens (~89 % en promedio
  según el proyecto) en cargas elegibles. Dashboard web, versión Desktop/PWA, MCP/A2A.
- Cifra del video: "hasta 1,6 mil millones gratuitos cada mes". El README dice "~1.62B
  free tokens/month" sumando 35 pools recurrentes y 54 proveedores keyless, y hasta
  ~2.22B con los créditos de primer mes. Es una suma de cuotas de muchos proveedores,
  no una cuota única; en la práctica depende de cuántas cuentas gratuitas registre el
  usuario.

**Instalar y arrancar:**

```bash
npm install -g omniroute && omniroute      # o: npx omniroute
# o Docker:
docker run -p 20128:20128 diegosouzapw/omniroute
```

El servidor escucha en el puerto **20128** y abre el dashboard en el navegador.

**Conectar Claude Code** (solo para esa terminal; no lo pongas en el perfil del shell
sin que el usuario lo decida):

```bash
ANTHROPIC_BASE_URL=http://localhost:20128/v1 ANTHROPIC_API_KEY=any-value claude
```

**Lo que hay que decirle al usuario antes de encenderlo (no es opcional):**

1. **Los prompts y el código salen hacia terceros.** Cada proveedor gratuito es una
   empresa distinta con sus propios términos. Este repo contiene datos de clientes
   (`invoices-sire-*`, `panasur/`, `sig360-panasur/`, `consultas/`): esas carpetas no
   deben pasar por proveedores gratuitos. Regla práctica: OmniRoute solo en repos
   públicos o en trabajo sin datos de terceros.
2. **Cuando cae al fallback, ya no responde Claude.** "Switching model... GLM-5.0 /
   Kimi" en el video significa exactamente eso: otro modelo, otra calidad, otras
   convenciones. Bien para tareas mecánicas cuando se agotó la cuota; mal para
   decisiones de arquitectura o para código que se publica ese día.
3. **Solo aplica a Claude Code CLI local.** Las sesiones de Claude Code web/remoto y
   Cowork no leen `ANTHROPIC_BASE_URL` del usuario; ahí OmniRoute no hace nada.
4. El "costo" del dashboard es un contador de ahorro, no una factura: OmniRoute no
   cobra.

---

## 3. Graphify

- Repo: https://github.com/safishamsi/graphify (76k+ estrellas; el paquete PyPI oficial
  es `graphifyy`, con doble y; el comando es `graphify`).
- Qué es: convierte una carpeta de código, SQL, scripts, docs, PDFs, imágenes o video
  en un grafo de conocimiento consultable. El parseo de código es local y determinista
  (tree-sitter, 38+ lenguajes, sin llamadas a un LLM); cada arista se marca `EXTRACTED`
  (leída del código) o `INFERRED` (deducida). Sin vector store. El proyecto reporta
  ~71× menos tokens por consulta que leer los archivos crudos, y el grafo persiste entre
  sesiones. Eso es lo que el video llama "que tu agente no desperdicie una y otra vez".

**Instalar:**

```bash
uv tool install graphifyy     # o: pipx install graphifyy  /  pip install graphifyy
graphify install              # registra la skill /graphify en Claude Code y otros agentes
```

**Usar:**

```
/graphify .                    # construir el grafo del directorio actual
/graphify ./src --update       # re-extraer solo lo que cambió
/graphify ./src --watch        # sincronizar mientras se edita
graphify update ./src          # desde la terminal, después de un git pull
graphify query "qué conecta el catálogo de productos con los brochures?"
graphify path "PRODUCTS" "renderBrochure"
graphify explain "B"           # explicar un nodo (p. ej. el objeto de marca de global/index.html)
```

**Salida** en `graphify-out/`: `graph.html` (visualización interactiva), `GRAPH_REPORT.md`
(resumen, conceptos clave, preguntas sugeridas) y `graph.json` (datos completos).

**Cuidado con este repo en particular:** el sitio se publica desde `main` con GitHub
Pages. Si `graphify-out/` se sube al repo, `graph.html` queda público en
`www.innovaqsolution.com/graphify-out/graph.html` con la estructura interna del código.
Añade `graphify-out/` al `.gitignore` antes del primer `/graphify` (el script
`scripts/stack.sh` lo hace). En FOOD360 (Vite) aplica lo mismo si la carpeta cae dentro
de `public/`.

Requiere Python 3.10+ (o `uv`). Los archivos que no son código (PDF, imágenes) sí usan
el LLM de la sesión para extraer conceptos: en un repo con 500 KB de brochures y fotos,
limita el primer `/graphify` a las carpetas de código.

---

## 4. Agent Skills (Addy Osmani)

- Repo: https://github.com/addyosmani/agent-skills (77k+ estrellas, el directorio de
  skills más popular de GitHub). Sitio: https://skills.addy.ie
- Autor: Addy Osmani, ingeniero de Google (lideró Chrome Developer Experience y
  desarrollo con IA en Google; el video lo presenta como "ex director de ingeniería de
  IA en Google").
- Qué es: 25 skills en formato SKILL.md (24 del ciclo de vida + la meta-skill
  `using-agent-skills`) y 8–9 comandos slash. Cada skill trae una tabla de "excusas que
  usa el agente para saltarse pasos" con su contraargumento, y termina con requisitos de
  evidencia (tests pasando, salida del build, datos en runtime). Funciona en 70+ agentes.

**Instalar en Claude Code:**

```
/plugin marketplace add addyosmani/agent-skills
/plugin install agent-skills@addy-agent-skills
```

Si falla el SSH: `/plugin marketplace add https://github.com/addyosmani/agent-skills.git`.

Alternativa universal (instala en el proyecto o con `-g` global, sirve para Cursor,
Codex, Copilot...):

```bash
npx skills add addyosmani/agent-skills -g -a claude-code                 # global, solo Claude Code
npx skills add addyosmani/agent-skills --skill code-review-and-quality   # una sola, en el proyecto
```

Las skills quedan en `~/.claude/skills/<nombre>/` (global) o `.claude/skills/` (proyecto)
como enlaces a `~/.agents/skills/`. Probado el 19-09-2026: 25 skills instaladas.

**Comandos (puntos de entrada del ciclo):**

| Fase | Comando | Lema |
|---|---|---|
| Define | `/spec` | "Spec before code" |
| Plan | `/plan` | tareas pequeñas y atómicas |
| Build | `/build` (`/build auto` = todo el plan en una pasada aprobada) | una rebanada a la vez |
| Test | `/test` | "Tests are proof" |
| Constraints | `/constraints` | "Decide it once, enforce it everywhere" |
| Review | `/review` | quality gates antes del merge |
| Audit | `/webperf` | medir rendimiento web |
| Simplify | `/code-simplify` | "Clarity over cleverness" |
| Ship | `/ship` | desplegar a producción con seguridad |

Si un nombre choca con un comando propio de Claude Code o de otro plugin, Claude Code
lo expone con prefijo (`/agent-skills:review`).

**Las 25 skills por fase:**

- **Meta:** `using-agent-skills` — enruta el trabajo entrante a la skill correcta
  (seguridad → `security-and-hardening`, UI → `frontend-ui-engineering`...) y fija las
  reglas comunes. Es lo que el video llama "activa la correcta en cada etapa por sí
  solo".
- **Define (4):** `interview-me` (una pregunta a la vez hasta ~95 % de confianza),
  `idea-refine` (divergir/converger ideas vagas), `spec-driven-development` (PRD con
  objetivos, comandos, estructura, estilo, testing, límites),
  `constraint-driven-development` (entrevista de calidad → `CONSTRAINTS.md`).
- **Plan (1):** `planning-and-task-breakdown` (tareas pequeñas y verificables con
  criterios de aceptación).
- **Build (7):** `incremental-implementation` (rebanadas verticales, feature flags),
  `test-driven-development` (Red-Green-Refactor, pirámide 80/15/5, DAMP sobre DRY),
  `context-engineering`, `source-driven-development` (cada decisión de framework
  respaldada por docs oficiales), `doubt-driven-development` (revisión adversarial con
  contexto fresco), `frontend-ui-engineering` (componentes, design systems, WCAG 2.1
  AA), `api-and-interface-design` (contract-first, ley de Hyrum).
- **Verify (2):** `browser-testing-with-devtools` (Chrome DevTools MCP),
  `debugging-and-error-recovery` (reproducir, localizar, reducir, arreglar, proteger).
- **Review (4):** `code-review-and-quality` (cinco ejes, cambios de ~100 líneas),
  `code-simplification` (cerca de Chesterton, regla de 500),
  `security-and-hardening` (OWASP Top 10, secretos, dependencias),
  `performance-optimization` (medir primero, Core Web Vitals).
- **Ship (6):** `git-workflow-and-versioning`, `ci-cd-and-automation`,
  `deprecation-and-migration`, `documentation-and-adrs`,
  `observability-and-instrumentation`, `shipping-and-launch`.

**Convivencia con las skills de este repo.** `launch-kit` y `claude-code-stack` no
chocan con ninguna: son de marketing y de tooling. Sí hay solapamiento parcial entre
`/review` de Agent Skills y `/code-review` de Claude Code: usa `/code-review` para el
diff de un PR concreto y `/review` cuando quieras las quality gates completas del
paquete.

---

## 5. Instalación automática por proyecto

Claude Code puede instalar plugins automáticamente al abrir un repo si
`.claude/settings.json` los declara. Esto es lo que genera `scripts/stack.sh settings`:

```json
{
  "extraKnownMarketplaces": {
    "ponytail": { "source": { "source": "github", "repo": "DietrichGebert/ponytail" } },
    "addy-agent-skills": { "source": { "source": "github", "repo": "addyosmani/agent-skills" } }
  },
  "enabledPlugins": {
    "ponytail@ponytail": true,
    "agent-skills@addy-agent-skills": true
  }
}
```

Al abrir el repo, Claude Code pide confirmación una vez y luego mantiene los plugins
instalados y actualizados para todo el equipo. Graphify (paquete Python) y OmniRoute
(servidor local) no se pueden declarar aquí: van por `scripts/stack.sh install`.
