---
name: video-to-skill
description: Convierte un video (TikTok, Reel, Short, YouTube, grabación de pantalla o archivo .mp4 subido) en una skill de Claude instalada y versionada — extrae fotogramas y subtítulos grabados, transcribe el audio, contrasta cada afirmación con la fuente oficial (repo, docs, web), redacta SKILL.md con referencias y scripts, la instala en ~/.claude/skills, la guarda en .claude/skills del repo y abre la PR. Úsala SIEMPRE que el usuario adjunte o enlace un video y pida "analizar y convertir en skill", "guardar como skill", "instalar lo que sale en el video", "haz que Claude sepa hacer esto", "documenta este tutorial", o cuando quiera capturar un flujo, herramienta o truco visto en redes como capacidad repetible del equipo (INNOVAQ, PANASUR). También para transcribir o resumir un video cuando no hay modelo de voz disponible. Use for any video-to-skill, tutorial-capture or video transcription request.
---

# Video → Skill — capturar lo que se ve en un video como capacidad instalada

Esta skill nace de hacerlo dos veces a mano: un TikTok sobre Claude Slides/Design/Docs
se convirtió en `launch-kit`, y otro sobre Agent Reach en `agent-reach`. El patrón es
siempre el mismo y merece ser repetible: **el video es el brief, la fuente oficial es
la verdad, y la skill es el entregable**. Un video de 50 segundos suele omitir lo que
más importa (permisos, credenciales, límites); la skill resultante tiene que
restituirlo.

---

## 0. Qué produce esta skill

```
.claude/skills/<nombre>/
├── SKILL.md                         # frontmatter + flujo + límites + tabla de archivos
├── references/
│   ├── video-transcripcion.md       # transcripción, cronología de pantalla y verificación
│   ├── <guia-oficial>.md            # copia literal de la fuente (fecha de descarga)
│   └── <referencia-rapida>.md       # resumen operativo en español
└── scripts/                         # solo si el flujo tiene pasos deterministas
```

Más la instalación en `~/.claude/skills/<nombre>/`, un `.skill` empaquetado para el
perfil de claude.ai, y una PR en el repo del usuario.

---

## 1. Flujo

### Paso 1 — Extraer lo que el video dice y muestra

```bash
pip install -q imageio-ffmpeg opencv-python-headless        # una vez
python3 .claude/skills/video-to-skill/scripts/extract_frames.py VIDEO.mp4 --out /tmp/va
```

Produce hojas de contacto (`sheet_K.jpg`, un fotograma cada 2 s con el tiempo impreso)
y tiras de subtítulos (`capsheet_K.jpg`, dos por segundo). Léelas con `Read`: en una
sola imagen ves 12 fotogramas o 40 subtítulos, que es mucho más barato que leer
fotogramas sueltos. Si el video no es vertical o los subtítulos no están en la franja
por defecto, ajusta `--cap-band` (fracciones de la altura, por ejemplo `0.80,0.95`
para subtítulos al pie en un video horizontal).

Si un video viene por URL y no como archivo, descárgalo antes con `yt-dlp URL`
(en un entorno con Agent Reach ya está instalado; ver skill `agent-reach`).

### Paso 2 — Transcribir

Primero intenta el audio:

```bash
pip install -q faster-whisper
python3 .claude/skills/video-to-skill/scripts/transcribe.py /tmp/va/audio.wav --lang es
```

Si el modelo no se puede descargar (proxy, sin red a Hugging Face: el script sale con
código 2), **usa los subtítulos grabados**: casi todos los videos de redes los llevan.
Reconstruye el texto leyendo `capsheet_*.jpg` en orden y únelo en párrafos. Anota en la
transcripción qué método usaste; el usuario debe saber si es voz o subtítulo.

Amplía con `ffmpeg -ss T -i VIDEO -frames:v 1 -vf "crop=...,scale=1152:-1"` cualquier
fotograma con comandos, URLs o pantallas de terminal: ahí suele estar el dato exacto
que la voz no dice (en el video de Agent Reach, la URL de instalación solo aparecía en
pantalla durante un segundo).

### Paso 3 — Identificar la fuente de verdad y contrastar

El video afirma; la fuente confirma. Antes de escribir una línea de la skill:

1. Localiza la fuente primaria de lo que muestra el video: repositorio en GitHub,
   documentación oficial, página del producto, norma. Descárgala (`curl -s` a
   `raw.githubusercontent.com` suele pasar cualquier proxy; el resto de la web puede no).
2. Haz una tabla **afirmación del video → qué dice la fuente**. Marca lo que es cierto,
   lo que es cierto con condiciones (login, cookies, pago, sistema operativo) y lo que
   el video exagera. Esta tabla va en `references/video-transcripcion.md`.
3. Guarda copia literal de la guía oficial en `references/` con la fecha: las
   herramientas cambian de mes en mes y la skill debe poder decir "esto era así el
   día X" y recomendar descargar la versión vigente.

Si la fuente es código de terceros que habría que ejecutar para validar, **no lo
instales sin que el usuario lo apruebe**. Documenta los comandos desde la guía oficial
y di explícitamente que no se validaron en vivo.

### Paso 4 — Diseñar la skill (no un resumen del video)

Antes de redactar, responde en dos líneas cada una:

- **Qué debe poder hacer Claude** después de leerla que antes no podía.
- **Cuándo debe activarse:** frases reales del usuario, en español y en inglés,
  incluyendo pedidos que no nombran la herramienta ("qué dicen en Twitter de…").
- **Qué hace el usuario y qué hace Claude:** credenciales, clics en extensiones,
  aprobaciones de instalación. Lo que el video hace parecer automático suele ser manual.
- **Qué puede salir mal** y cómo se diagnostica.

Luego escribe siguiendo `references/plantilla-skill.md`. Reglas que han funcionado:

- Descripción del frontmatter **menor de 1024 caracteres** (límite del empaquetador) y
  "empujona": lista de disparadores concretos, incluidos los de INNOVAQ y PANASUR.
- SKILL.md por debajo de 300 líneas; lo largo va a `references/` con una tabla al final
  de SKILL.md que diga cuándo leer cada archivo.
- Un `scripts/` solo cuando el paso es determinista y se repite (extraer fotogramas,
  chequear un entorno, generar un digest). Pruébalo antes de incluirlo.
- Explica el porqué de cada regla; evita mayúsculas imperativas.
- Menciona el video de origen en la primera línea del cuerpo (autor, plataforma,
  título) y qué matices omite. Es honesto y ayuda a decidir cuándo actualizarla.
- Añade una sección "Casos INNOVAQ/PANASUR" con dos o tres usos concretos para el
  negocio; es lo que convierte una curiosidad de redes en valor.

### Paso 5 — Validar, instalar, empaquetar

```bash
# validar y empaquetar (validador oficial de skill-creator)
python3 -m scripts.package_skill .claude/skills/<nombre> /tmp/salida   # desde el dir de skill-creator
# instalar en el perfil de esta sesión
cp -r .claude/skills/<nombre> ~/.claude/skills/<nombre>
```

Comprueba que el harness lista la skill como disponible (aparece en la lista de
skills tras el siguiente turno) y que los scripts corren con `bash -n` /
`python3 -m py_compile`. Envía el `.skill` al usuario con `SendUserFile`: el botón
"Guardar skill" de la tarjeta es la única vía para el perfil de claude.ai.

### Paso 6 — Versionar

Commit en la rama designada, push y PR en borrador con: resumen del video, contenido de
la skill, y lo que **no** se pudo validar. Seguir el patrón de `launch-kit` y
`agent-reach` en `.claude/skills/` del repo `www.innovaqsolution.com`.

---

## 2. Errores que ya cometimos (para no repetirlos)

| Error | Consecuencia | Regla |
|-------|--------------|-------|
| Descripción de 1285 caracteres | El empaquetador la rechazó | Contar caracteres antes de empaquetar |
| Fiarse de la voz del video para la URL | La URL exacta solo estaba en pantalla | Ampliar los fotogramas con terminal o navegador |
| Instalar código de terceros para "probar" | Bloqueado por el clasificador de seguridad | Documentar desde la guía oficial y decir que no se validó |
| Confiar en que habrá red para Hugging Face | Sin transcripción de voz | Subtítulos grabados como plan B siempre |

---

## 3. Casos INNOVAQ / PANASUR

- **Tutoriales de herramientas de IA** que Alvaro ve en TikTok o YouTube: en una sesión
  pasan a ser una skill del equipo, con las trampas documentadas.
- **Capacitaciones grabadas** (SST, ISO, uso de SIG360 o ERP360): la transcripción y la
  cronología de pantalla se convierten en manual operativo o en skill de soporte.
- **Videos de competidores o del sector**: transcripción y contraste con fuentes para
  alimentar `launch-kit` o el informe de escucha social de `agent-reach`.

---

## Archivos de esta skill

| Archivo | Cuándo usarlo |
|---------|---------------|
| `scripts/extract_frames.py` | Siempre, paso 1. Fotogramas, tiras de subtítulos y audio. |
| `scripts/transcribe.py` | Paso 2 cuando hay red para descargar el modelo de voz. |
| `references/plantilla-skill.md` | Paso 4: esqueleto de SKILL.md y de `video-transcripcion.md`. |
