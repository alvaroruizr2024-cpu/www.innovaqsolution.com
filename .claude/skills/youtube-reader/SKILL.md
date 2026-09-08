---
name: youtube-reader
description: "Lee y analiza videos de YouTube (youtube.com, youtu.be, Shorts) y artefactos de NotebookLM a partir de un enlace. Obtiene titulo, canal, descripcion, capitulos y transcripcion (subtitulos manuales o automaticos) y, si importa lo visual, descarga el video y extrae fotogramas para verlo. Comprueba primero si la red del entorno bloquea YouTube y aplica alternativas (Google Drive, texto pegado por el usuario, politica de red) en vez de fallar. Usala SIEMPRE que el usuario pegue un enlace de YouTube o NotebookLM, con o sin instrucciones, y cuando pida ver, leer, resumir, transcribir, describir, sacar el titulo o publicar en la web un video de YouTube, incluso si no nombra la herramienta. Tambien cuando necesites el titulo real de un video para embeberlo en un sitio. Para videos locales o de Drive sin origen YouTube usa la skill video-reader."
---

# YouTube Reader

Claude no puede reproducir video, pero sí puede reconstruir lo que un video de
YouTube contiene en tres capas de costo creciente: **metadatos** (título, canal,
descripción, capítulos), **transcripción** (subtítulos manuales o automáticos) y
**fotogramas** (imágenes extraídas con ffmpeg que Claude sí puede ver). La mayoría
de las preguntas se responden con las dos primeras capas sin descargar el video;
reserva los fotogramas para cuando importe lo visual (qué se muestra, marca,
EPP, pantallas de una demo, calidad del render).

Los entornos remotos de Claude Code suelen tener una política de red que bloquea
youtube.com. Por eso el flujo empieza con un chequeo de red: es mejor descubrir
el bloqueo en 5 segundos y proponer una alternativa que fallar tras varios
intentos. Todo lo que se descarga va al scratchpad de la sesión, nunca al repo.

## Flujo

### 1. Preflight: red, herramientas e identificación del video

```bash
python3 scripts/yt_preflight.py "<URL o ID>" --workdir <scratchpad>/yt
```

Imprime JSON con `video_id`, `kind` (`youtube` | `notebooklm` | `unknown`),
`reachable` por host (youtube.com, googlevideo.com, notebooklm.google.com,
pypi.org), la ruta a `ffmpeg` y `yt-dlp` (instala `yt-dlp` e `imageio-ffmpeg`
desde PyPI si faltan y PyPI es accesible) y un campo `mode`:

- `full`: YouTube accesible. Sigue al paso 2.
- `blocked`: la red rechaza YouTube. Salta al paso 5 (alternativas) y dilo
  claramente al usuario en la primera línea de la respuesta. No repitas
  intentos con curl, WebFetch, espejos tipo Invidious o servicios oEmbed de
  terceros: comparten el mismo bloqueo y solo gastan tiempo.

Un enlace de NotebookLM (`notebooklm.google.com/notebook/<id>/artifact/<id>`)
requiere la sesión de Google del usuario y casi nunca es legible desde el
entorno. Trátalo como `blocked` salvo que el preflight lo marque accesible.

### 2. Metadatos y transcripción (barato, resuelve la mayoría de los casos)

```bash
python3 scripts/yt_fetch.py "<URL o ID>" --workdir <scratchpad>/yt --no-video
```

Escribe `info.json` (título, canal, fecha, duración, descripción, capítulos,
etiquetas, miniatura) y, si existen, subtítulos en `es` y `en` (manuales primero,
automáticos después) convertidos a `transcript.txt` con marcas de tiempo cada
~30 s. El script imprime un resumen. Lee `transcript.txt` con `sed -n` por
tramos si es largo; un video de 20 minutos ronda las 3.000 palabras.

Con esto ya puedes: dar el título exacto para embeberlo, resumir, listar temas
por minuto, responder "qué dice sobre X", redactar descripción y hashtags.

### 3. Fotogramas (solo si importa lo visual)

```bash
python3 scripts/yt_fetch.py "<URL o ID>" --workdir <scratchpad>/yt --max-height 480
python3 scripts/sample_frames.py <scratchpad>/yt/video.mp4 <scratchpad>/yt/frames --max-frames 12
```

Descarga a 480p como máximo (suficiente para leer texto en pantalla y mucho
más liviano que 1080p) y extrae fotogramas equiespaciados incluyendo primero y
último. Míralos en orden con la herramienta de lectura de imágenes. Si el
usuario pregunta por un instante concreto, vuelve a muestrear con `--start` y
`--end` alrededor de ese momento en vez de aumentar `--max-frames` global.

### 4. Síntesis

Responde anclado a marcas de tiempo (`[02:15]`) y separa lo que viene de la
transcripción de lo que viene de los fotogramas. Sé descriptivo, no
especulativo: el muestreo no es exhaustivo y los subtítulos automáticos
confunden nombres propios y siglas (SSOMA, ISO 45001, PETS). Si el usuario va a
tomar una decisión con lo que digas, indícalo y ofrece un muestreo más denso.

### 5. Cuando la red bloquea YouTube

Lee `references/fallbacks.md`. En resumen, ofrece estas tres rutas y ejecuta
la que esté disponible sin esperar confirmación:

1. **Archivo en Google Drive**: busca con el conector de Drive un video reciente
   que coincida (mismo día de subida, nombre parecido). El conector solo
   descarga archivos de hasta 10 MB; para más, pide una versión comprimida o un
   recorte. Una vez descargado, usa la skill `video-reader` para decodificar y
   `sample_frames.py` para los fotogramas.
2. **Texto pegado por el usuario**: transcripción, resumen de NotebookLM o
   descripción. Trabaja con eso como si fuera `transcript.txt`.
3. **Política de red**: indícale al usuario que habilite `youtube.com`,
   `googlevideo.com` y `notebooklm.google.com` en la configuración de red del
   entorno de Claude Code en la web.

Mientras tanto, haz todo lo que no depende del contenido (por ejemplo,
embeber el video con un título provisional y marcarlo para reemplazo).

### 6. Publicar el video en el sitio (opcional)

Si el usuario pegó el enlace en un repo web sin más instrucciones, lo habitual
es que quiera el video en la página. Lee `references/publish-to-site.md` para
el patrón del carrusel de YouTube de innovaqsolution.com y cómo agregar un
video con su ID y título real.

## Errores comunes

- Confundir el parámetro `si=` de los enlaces compartidos con parte del ID. El
  ID son los 11 caracteres tras `v=`, `youtu.be/`, `shorts/` o `embed/`.
- Usar `img.youtube.com/vi/<id>/maxresdefault.jpg` para "ver" el video: es una
  sola miniatura y, además, comparte el bloqueo de red.
- Descargar a 1080p por defecto. Los fotogramas se leen igual a 480p y el
  archivo pesa cinco veces menos.
- Dejar los archivos descargados dentro del repositorio. Usa el scratchpad.
