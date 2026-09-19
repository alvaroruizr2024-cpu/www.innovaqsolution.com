---
name: claude-code-stack
description: Instala, configura y enseña a usar los 4 plugins del video de @student.gpt que llevan Claude Code "de principiante a experto" — Ponytail (menos código y tokens), OmniRoute (gateway a 300+ proveedores gratuitos con cambio automático de modelo al agotarse la cuota), Graphify (el repo como grafo de conocimiento) y Agent Skills de Addy Osmani (25 skills por fase, /spec /plan /build /test /review /ship). Úsala SIEMPRE que el usuario pida "instala los 4 plugins", "el stack de Claude Code", "los plugins del video", ponytail, omniroute, graphify, agent skills, "se me acaba la cuota de Claude", "gastar menos tokens", "que Claude no relea todo el repo", "programar como ingeniero senior", "configura Claude Code para este repo", o pregunte qué plugin usar en una etapa (spec, plan, build, test, review, ship); también para dejar un repo de INNOVAQ listo con los plugins. Use for any Claude Code plugin stack, token-saving, quota-fallback or codebase-knowledge-graph request.
---

# Claude Code Stack — los cuatro plugins del video, instalados y usados donde rinden

Esta skill nace de un video (TikTok de @student.gpt, "Desde principiante hasta experto
en el Código Claude", guion en `references/origen.md`): no serás bueno con Claude Code
"a menos que hayas instalado estos 4 plugins": **Ponytail** para escribir menos código y
gastar menos tokens, **OmniRoute** para que la cuota nunca te pare, **Graphify** para que
el agente no relea el repo cada vez, y **Agent Skills** para trabajar por fases como un
ingeniero senior.

Aquí lo reproducimos con los comandos reales de cada proyecto (verificados en
`references/plugins.md`), en un orden que no rompe nada, y diciendo la verdad sobre lo
que cada uno ahorra. El valor no está en tener cuatro plugins: está en usar cada uno en
la etapa del trabajo donde rinde y en no encender OmniRoute sin saber a dónde van los
prompts.

---

## 0. Qué hay antes de empezar

**Dónde estás.** Los comandos `/plugin` solo existen dentro de una sesión de Claude
Code (CLI local, app de escritorio o extensión de IDE). Desde una sesión remota
(Claude Code web, Cowork) o desde un script no se pueden ejecutar, y `ANTHROPIC_BASE_URL`
del usuario no afecta a las sesiones remotas. Antes de prometer nada, di en una línea en
qué entorno estás y qué parte va a quedar hecha y qué parte queda como comandos para el
usuario.

| Plugin       | Se instala con                         | Desde terminal/script | Desde `/plugin` |
|--------------|----------------------------------------|-----------------------|-----------------|
| Agent Skills | marketplace o `npx skills add`          | sí                    | sí              |
| Ponytail     | marketplace                             | no                    | sí              |
| Graphify     | `uv tool install graphifyy` + `graphify install` | sí           | no              |
| OmniRoute    | `npm i -g omniroute` (servidor local)   | sí, solo con permiso  | no              |

**El script.** `scripts/stack.sh` hace todo lo que se puede hacer sin estar dentro de
Claude Code: `check` (qué hay, qué falta), `install [--omniroute]`, `settings` (deja el
repo autoinstalando Ponytail y Agent Skills al abrirlo) y `gitignore` (protege
`graphify-out/`). Léelo antes de ejecutarlo la primera vez; es corto.

**Este repo.** `www.innovaqsolution.com` publica `main` en GitHub Pages y contiene datos
de clientes (`invoices-sire-*`, `panasur/`, `consultas/`). Eso fija dos reglas que no
salen del video: `graphify-out/` nunca se sube, y OmniRoute no se usa sobre carpetas con
datos de terceros.

---

## 1. Flujo

### Paso 1 — Diagnóstico (un minuto)

```bash
bash .claude/skills/claude-code-stack/scripts/stack.sh check
```

Muestra el resultado al usuario tal cual. Si ya tiene tres de cuatro, no reinstales:
pasa al paso 3 con lo que falta. Si `node`, `npm` o `uv` no están, dilo antes de seguir;
sin ellos solo se puede hacer la parte de marketplace.

### Paso 2 — Decidir OmniRoute antes de tocar nada

Es el único de los cuatro que cambia a dónde van los prompts. Pregunta, o si el usuario
ya lo pidió explícitamente, declara la decisión:

```
OmniRoute:  no | sí, solo en esta terminal | sí, en repos sin datos de clientes
Motivo:     <se agota la cuota de Claude / quiere probar modelos gratuitos / no lo necesita>
```

Lo que tiene que saber para decidir (detalle en `references/plugins.md` §2): los
prompts y el código salen hacia proveedores externos con sus propios términos; cuando
cae al fallback ya no responde Claude sino GLM, Kimi o el que toque; y en sesiones
remotas no hace nada. Si la respuesta es "no", el stack sigue siendo útil: los otros
tres son los que hacen mejor el código.

### Paso 3 — Instalar, en este orden

El orden importa porque cada paso deja algo que el siguiente aprovecha y porque, si algo
falla a la mitad, lo que ya quedó instalado es lo más valioso.

1. **Agent Skills** (la base de trabajo por fases). Dentro de Claude Code:
   ```
   /plugin marketplace add addyosmani/agent-skills
   /plugin install agent-skills@addy-agent-skills
   ```
   Desde terminal (es lo que hace `stack.sh install`): `npx skills add
   addyosmani/agent-skills -g -a claude-code`; sin `-a` intenta registrarlas en los 70+
   agentes que conoce. Verifica que exista `using-agent-skills`: es la meta-skill que
   enruta el resto.
2. **Ponytail** (cambia cómo se escribe el código a partir de ahora):
   ```
   /plugin marketplace add DietrichGebert/ponytail
   /plugin install ponytail@ponytail
   ```
   Queda en modo `full` en cada sesión. Cámbialo con `/ponytail lite|full|ultra|off`.
3. **Graphify** (necesita el repo ya en su estado final para que el grafo sirva):
   ```bash
   bash .claude/skills/claude-code-stack/scripts/stack.sh gitignore
   uv tool install graphifyy && graphify install
   ```
   Luego, dentro de Claude Code, `/graphify ./<carpeta de código>`; en este repo empieza
   por `global/`, `sig360/` o el producto en el que se va a trabajar, no por la raíz
   (hay cientos de KB de brochures, fotos y audio que el grafo procesaría con el LLM).
4. **OmniRoute** (solo si el paso 2 dijo que sí):
   ```bash
   bash .claude/skills/claude-code-stack/scripts/stack.sh install --omniroute
   omniroute            # dashboard en http://localhost:20128
   ANTHROPIC_BASE_URL=http://localhost:20128/v1 ANTHROPIC_API_KEY=any-value claude
   ```
   Enruta una terminal, no el perfil del shell: así el usuario elige en qué sesiones
   entra al gateway y en cuáles no.

Cuando el usuario quiera que **el repo lo haga solo** para todo el equipo:
```bash
bash .claude/skills/claude-code-stack/scripts/stack.sh settings
```
Mezcla en `.claude/settings.json` los marketplaces y los dos plugins (Ponytail y Agent
Skills); al abrir el repo, Claude Code pide confirmación una vez y los mantiene. Es un
cambio que se commitea y afecta a todos los que abran el repo: muéstralo antes.

### Paso 4 — Verificar

Repite `stack.sh check` y, dentro de Claude Code, prueba una cosa de cada plugin:
`/ponytail-help`, `/spec` (debe responder con la entrevista de Agent Skills),
`graphify query "..."` sobre algo que sepas que existe en el repo, y si hay OmniRoute,
el dashboard en `:20128` con al menos un proveedor conectado. No des por instalado lo
que no respondió.

### Paso 5 — Usar cada uno donde rinde

Esto es lo que el video resume en "activa la correcta en cada etapa por sí solo":

| Momento                          | Qué usar                                                        |
|----------------------------------|-----------------------------------------------------------------|
| Abrir sesión en un repo conocido | `/graphify ./src --update` (solo lo que cambió) y preguntar al grafo antes de leer archivos |
| Pedido vago o nuevo              | `/spec` (o `interview-me` si el usuario no sabe bien qué quiere) |
| Ya hay spec                      | `/plan` → tareas pequeñas con criterio de aceptación            |
| Escribir código                  | `/build` con Ponytail en `full`; `ultra` solo en scripts y utilidades |
| Antes de un PR                   | `/ponytail-review` (sobre-ingeniería) y luego `/review` o `/code-review` |
| Se acabó la cuota a mitad de tarea | OmniRoute para lo mecánico (tests, migraciones, docs); volver a Claude para decisiones |
| Publicar                         | `/ship`; en este repo, recuerda que `main` es producción (GitHub Pages) |

### Paso 6 — Entregar

Lista lo que quedó instalado, lo que quedó como comandos para el usuario (con los
comandos exactos), y los archivos del repo que cambiaron (`.gitignore`,
`.claude/settings.json`). Si algo no se pudo verificar, dilo primero.

---

## 2. Errores que ya conocemos

- **Prometer "50 % menos tokens".** Ponytail reduce mucho el código (≈54 % de líneas en
  su benchmark) pero los tokens bajan entre 10 y 25 % en mediciones independientes. Di
  la cifra honesta; el usuario lo va a medir con `/ponytail-gain`.
- **Enrutar el shell entero.** `export ANTHROPIC_BASE_URL=...` en `.zshrc` manda todas
  las sesiones futuras por OmniRoute, incluidas las de repos con datos de clientes.
  Siempre por terminal o con un alias explícito.
- **Subir `graphify-out/`.** En este repo sería publicar el mapa del código en la web
  del negocio. `stack.sh gitignore` antes del primer `/graphify`.
- **`/graphify .` en la raíz de este repo.** Procesa brochures, fotos y audio con el
  LLM y tarda mucho; empieza por carpetas de código.
- **Ponytail en `ultra` en código compartido.** Quita abstracciones que otro producto
  de la suite sí usa. `full` es el modo para módulos comunes.
- **Instalar Agent Skills dos veces** (marketplace y `npx skills add -g`): dos copias de
  25 skills en el contexto. Una sola vía por máquina.
- **Dar por hecho un `/plugin` desde una sesión remota.** No se ejecutó; entrégalo como
  comandos y díselo.

## Referencias

- `references/origen.md` — guion del video y lo que se ve en pantalla.
- `references/plugins.md` — cada plugin: repo, qué hace, comandos exactos, cifras reales
  vs. las del video, avisos, y el bloque de `settings.json` para autoinstalación.
- `scripts/stack.sh` — `check` · `install [--omniroute]` · `settings [DIR]` ·
  `gitignore [DIR]`.
