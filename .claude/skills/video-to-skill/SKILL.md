---
name: video-to-skill
description: Convierte cualquier video (YouTube, TikTok, Instagram, un .mp4 subido) en una skill nueva de Claude, lista y guardada, en tres pasos — (1) "ver" el video con la ruta disponible (plugin /watch, puente Gemini con llave gratis de Google AI Studio, o extracción local con ffmpeg de subtítulos, audio y fotogramas), (2) extraer lo aprendido en una ficha estructurada (guion, lo que se ve en pantalla, afirmaciones y método), y (3) redactar, validar, guardar en .claude/skills e instalar en ~/.claude/skills la skill resultante, con commit y PR. Úsala SIEMPRE que el usuario comparta un video o enlace y pida "conviértelo en skill", "aprende de este video", "analizar video y convertir en skill", "guardar e instalar", "que Claude vea este video", "enséñale esto a Claude", "extrae el método de este video" o "transcribe y haz una habilidad". Aplica a videos de expertos (ventas, contenido, IA, procesos) y a tutoriales de INNOVAQ o PANASUR. Use for any video-to-skill, watch-video or learn-from-video request.
---

# Video → Skill — que Claude vea un video y lo guarde como habilidad

Esta skill nace de un video (TikTok de @melisaescobarta, "Le acabo de enseñar a Claude
a ver vídeos de YouTube"): con **tres cosas** Claude aprende de cualquier video y lo
convierte en una habilidad nueva que queda disponible para siempre. (1) Instalar una
habilidad que le dé "ojos" (el plugin `/watch`), (2) una llave de Gemini en Google AI
Studio, gratis, porque Gemini entiende videos de YouTube de forma nativa y sirve de
puente, y (3) pedirle a Claude que "todo lo que aprendió lo convierta en una habilidad
nueva". A partir de ahí, "lo que quieras enseñarle, él lo aprende y lo guarda". El
guion completo y lo que se ve en pantalla están en `references/origen.md`.

Aquí reproducimos ese flujo con dos matices que el video omite: **no siempre hay una
sola ruta para ver el video** (en el sandbox web de Claude Code la API de Gemini está
bloqueada y hay que extraer subtítulos con ffmpeg), y **una skill no es un resumen**:
tiene que decir cuándo dispararse, qué hacer paso a paso y qué es verificable. El valor
está en el bucle completo: ver → ficha → skill → instalada → commit.

---

## 0. Antes de empezar

**Entrada.** Un enlace (YouTube, TikTok, Instagram, Vimeo, X) o un archivo local
(`.mp4`, `.mov`, `.webm`), normalmente en `~/.claude/uploads/…` cuando el usuario lo
sube al chat.

**Qué ruta de visión hay.** Compruébalo en este orden y usa la primera que funcione
(detalles y comandos en `references/rutas-de-vision.md`):

| Ruta | Cuándo | Requiere |
|------|--------|----------|
| A. Plugin `/watch` (bradautomates/claude-video) | Claude Code local del usuario, enlace público o archivo | `ffmpeg`, `yt-dlp` (se autoinstalan); Whisper opcional |
| B. Puente Gemini (`scripts/watch_youtube.py`) | Enlace de YouTube público y `GEMINI_API_KEY` en el entorno | Llave gratis de Google AI Studio |
| C. Extracción local (`scripts/extract_local_video.sh`) | Archivo subido, o cuando A y B no aplican | `ffmpeg` (`pip install imageio-ffmpeg` lo trae estático) |

En el **sandbox web de Claude Code** (`claude.ai/code`) la ruta A no está (no hay plugin
ni `yt-dlp` hacia fuera) y Whisper no puede bajar su modelo (Hugging Face responde 403
por el proxy). La API de Gemini **sí** es alcanzable, así que con `GEMINI_API_KEY` en el
entorno la ruta B funciona para enlaces de YouTube; para archivos subidos, ruta C.

**Convenciones del repositorio.** Las skills viven en `.claude/skills/<nombre>/` con
`SKILL.md`, `references/` y `scripts/`. Mira `launch-kit` o esta misma skill como
modelo. La plantilla y las reglas de frontmatter están en
`references/plantilla-skill.md`.

---

## 1. Flujo

### Paso 1 — Ver el video (ojos)

1. Identifica la entrada y elige la ruta (tabla de arriba).
2. Obtén **tres capas** del video; sin las tres la skill sale coja:
   - **Guion**: transcripción con marcas de tiempo (subtítulos, Whisper o Gemini).
   - **Pantalla**: qué se muestra y cuándo (capturas, código, webs, prompts escritos).
   - **Metadatos**: autor, plataforma, duración, idioma, fecha, título en pantalla.
3. Ruta C en detalle (lo que se hizo para esta skill):
   ```bash
   bash .claude/skills/video-to-skill/scripts/extract_local_video.sh <video.mp4> <carpeta_salida>
   ```
   Genera `sheet.jpg` (mosaico de fotogramas cada 3 s), `capsheet_*.jpg` (tiras de
   subtítulos a 2 fps, si el video los trae incrustados), `audio.wav` (16 kHz mono) y,
   si `faster-whisper` puede bajar su modelo, `transcript.txt`. Lee los mosaicos con la
   herramienta Read y reconstruye el guion **frase por frase, sin inventar**; anota
   `[inaudible]` o `[ilegible]` donde no se lea.
4. Ruta B en detalle:
   ```bash
   export GEMINI_API_KEY=…   # nunca la pegues en el repo ni en el chat
   python3 .claude/skills/video-to-skill/scripts/watch_youtube.py "https://www.youtube.com/watch?v=…" --out ficha.json
   ```
   Devuelve guion con tiempos, cronología de pantalla y resumen en JSON. Límite gratis:
   8 h de YouTube al día, solo videos públicos. Sin llave, el script se detiene y lo dice;
   pídesela al usuario (o que la exporte en su entorno), nunca la escribas tú.

### Paso 2 — Ficha de aprendizaje (lo que Claude "aprendió")

Antes de escribir la skill, deja escrita (y muéstrala al usuario) esta ficha. Es lo que
luego va a `references/origen.md` de la skill nueva:

```
Fuente:        <plataforma, @autor, duración, idioma, fecha>
Tema:          <en una frase>
Guion:         <transcripción completa o reconstruida de subtítulos>
Pantalla:      <tabla tiempo → qué se ve>
Afirmaciones:  <lista de lo que el video promete o afirma>
Método:        <los pasos que enseña, en orden, tal como los dice>
Verificación:  <qué se pudo comprobar (repos, docs, precios) y qué no>
Para INNOVAQ:  <a qué producto/proceso de la suite o de PANASUR se aplica>
```

Regla: **verifica antes de prometer**. Si el video dice "gratis", "un solo comando",
"38 000 estrellas" o "sin API", compruébalo (WebFetch al repo, a la doc oficial) y
anota la diferencia. En el video de origen, por ejemplo, el plugin `/watch` **no
necesita Gemini** (usa subtítulos gratuitos y Whisper); la llave de Gemini es una
segunda ruta, no un requisito del plugin.

### Paso 3 — Convertir la ficha en una skill

1. **Nombre**: kebab-case, 2–3 palabras, describe la capacidad (no el video):
   `ventas-consultivas`, `guion-tiktok`, `agent-reach`.
2. **Descripción** (frontmatter): qué hace + cuándo dispararse con frases literales que
   diría el usuario, en español, + una línea final en inglés. Máximo 1024 caracteres.
   **Sin `: ` (dos puntos + espacio) dentro del texto**, o el YAML se rompe; usa guiones
   o paréntesis.
3. **Cuerpo** (sigue `references/plantilla-skill.md`):
   - Párrafo de origen ("Esta skill nace de un video…") con el mensaje central en dos
     o tres frases, y los matices que el video omite.
   - `## 0.` Qué hay antes de empezar (requisitos, entorno, dónde están los datos).
   - `## 1.` Flujo paso a paso, con comandos copiables y salidas esperadas.
   - `## 2.` Reglas / checklist de calidad (qué NO hacer).
   - `## 3.` Aplicación a INNOVAQ/PANASUR cuando tenga sentido (productos, marca).
   - `## 4.` Referencias a `references/` y `scripts/`.
4. **`references/origen.md`**: la ficha del Paso 2 completa, incluida la tabla
   "Afirmación del video → Verificación".
5. **`scripts/`** solo si automatizan algo real (instalación, extracción, render). Cada
   script se ejecuta una vez antes del commit.
6. Si el video enseña un **estilo** (un vendedor, un creador), la skill debe capturar
   el estilo como reglas operativas (tono, estructura, frases gancho, ritmo, cierres),
   no como biografía. Incluye 2–3 ejemplos reconstruidos del propio video.

### Paso 4 — Guardar e instalar

```bash
bash .claude/skills/video-to-skill/scripts/install_skill.sh .claude/skills/<nombre>
```

El script valida el frontmatter (nombre, longitud de descripción, ausencia de `: `),
copia la skill a `~/.claude/skills/<nombre>/` (skills personales, disponibles en toda
sesión local) y lista lo instalado. Luego:

1. `git add .claude/skills/<nombre> && git commit` con un mensaje que nombre la skill y
   el video de origen. **Nunca** añadas el video, los fotogramas ni el audio al repo.
2. `git push -u origin <rama>` y abre el PR (borrador) con el resumen de la ficha.
3. Si el usuario trabaja en claude.ai (web), recuérdale que también puede subir la
   carpeta como skill personal (Settings → Capabilities → Skills) para que exista fuera
   del repo; el sandbox web se borra al cerrar la sesión, así que **la copia durable es
   la del repositorio**.

### Paso 5 — Probar

Invoca la skill nueva con una petición real del usuario (o una de las frases de su
descripción) y comprueba que dispara y que los comandos funcionan. Si algo no se puede
probar en este entorno (red, llave), dilo explícitamente en el mensaje final.

---

## 2. Reglas

- **No inventes guion.** Solo lo que se lee en subtítulos, se oye en el audio o
  devuelve Gemini. Las lagunas se marcan.
- **No prometas lo que el video promete.** Cada afirmación va a la tabla de
  verificación con su estado.
- **No metas llaves.** `GEMINI_API_KEY`, `GROQ_API_KEY`, etc. van en variables de
  entorno o en `~/.config/watch/.env`; jamás en `SKILL.md`, scripts o commits. Si una
  llave apareció en pantalla o en el chat, trátala como expuesta y sugiere rotarla.
- **No subas medios.** Videos, fotogramas y audio se quedan en el scratchpad.
- **No reduzcas alcance en silencio.** Si solo se pudo hacer parte (p. ej. sin
  transcripción de audio), la skill se entrega igual y el mensaje final lo dice.
- **Distingue un 403 de Google de un 403 del proxy.** `curl` a `generativelanguage…/models`
  sin llave devuelve 403 de Google (la API es alcanzable); el proxy bloqueado dice
  `CONNECT tunnel failed`. Solo el segundo obliga a cambiar de ruta.
- **Una skill por video.** Si un video enseña dos cosas distintas, dos skills, o una
  skill con dos flujos claramente separados.

---

## 3. Para INNOVAQ y PANASUR

- Videos de **ventas o marketing** → skill de estilo aplicable a los guiones de
  `tiktok-engine/`, brochures y campañas de la suite 360 (precios y copy oficial en
  `global/index.html`, array `PRODUCTS`).
- Videos de **herramientas de IA / Claude Code** → skill operativa con instalación
  segura por defecto (comprobar antes de cambiar el sistema), como `agent-reach` o
  `claude-code-stack` en ramas anteriores de este repo.
- Videos de **procesos de obra o seguridad (PANASUR/SSOMA)** → skill de procedimiento
  con checklist y evidencias, enlazada a `sig360-panasur/`.
- Si se generan imágenes o videos derivados, la única ruta sancionada es la skill
  `innovaq-gemini-proxy` (Worker de Cloudflare); esa misma llave de Gemini podría
  reutilizarse añadiendo una ruta `/api/watch` al Worker para que la llave nunca esté en
  local. Proponlo, no lo implementes sin que el usuario lo pida.

---

## 4. Referencias

- `references/origen.md` — guion, cronología de pantalla y verificación del video de
  @melisaescobarta.
- `references/rutas-de-vision.md` — las tres rutas para "ver" un video, con comandos,
  límites y qué falla en cada entorno.
- `references/plantilla-skill.md` — plantilla de `SKILL.md`, reglas de frontmatter y
  checklist de calidad.
- `scripts/extract_local_video.sh` — ruta C, extracción local con ffmpeg.
- `scripts/watch_youtube.py` — ruta B, puente Gemini para enlaces de YouTube.
- `scripts/install_skill.sh` — validación e instalación en `~/.claude/skills`.
