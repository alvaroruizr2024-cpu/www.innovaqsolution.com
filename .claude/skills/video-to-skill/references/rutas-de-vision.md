# Rutas para que Claude "vea" un video

Claude lee texto e imágenes. Ver un video siempre significa convertirlo en
**guion con tiempos + fotogramas + metadatos**. Hay tres rutas; se elige la primera
que funcione en el entorno actual.

## Qué funciona en cada entorno

| Entorno | A. `/watch` | B. Gemini | C. ffmpeg local |
|---------|-------------|-----------|-----------------|
| Claude Code en el PC del usuario | Sí | Sí (con llave) | Sí |
| Cowork (escritorio) | Sí | Sí (con llave) | Sí |
| Sandbox web `claude.ai/code` | No (sin plugin ni `yt-dlp` hacia fuera; HF bloqueado, así que sin Whisper) | **Sí** si `GEMINI_API_KEY` está en el entorno (la API es alcanzable; comprobado 2026-09-19) | **Sí** (única ruta para archivos subidos) |
| claude.ai chat | No | No | No (subir el video como archivo y pedir a Claude que describa; sin subtítulos exactos) |

Comprobación rápida de red desde un sandbox:

```bash
curl -sS -o /dev/null -w "gemini:%{http_code}\n" https://generativelanguage.googleapis.com/v1beta/models
curl -sS -o /dev/null -w "hf:%{http_code}\n" https://huggingface.co
```

`CONNECT tunnel failed` / `000` = bloqueado por el proxy (pasa a la ruta C). Un `403`
limpio de Gemini sin llave es la respuesta normal de Google: la API **es** alcanzable.

---

## Ruta A — Plugin `/watch` (bradautomates/claude-video)

El que aparece en el video de origen ("Give Claude the ability to watch any video").

```text
/plugin marketplace add bradautomates/claude-video
/plugin install watch@claude-video
```

Otros hosts (Codex, Cursor, Gemini CLI): `npx skills add bradautomates/claude-video -g`.
En claude.ai web: descargar `watch.skill` de los releases y subirlo en
Settings → Capabilities → Skills.

- Entradas: YouTube, TikTok, Vimeo, Instagram, X (todo lo que soporte `yt-dlp`) y
  archivos locales `.mp4 .mov .mkv .webm`.
- Instala `ffmpeg` y `yt-dlp` en el primer uso.
- Transcripción: subtítulos gratuitos si existen; si no, Whisper vía Groq (preferido) u
  OpenAI. Llaves en `~/.config/watch/.env` (`GROQ_API_KEY`, `OPENAI_API_KEY`,
  `WATCH_DETAIL`).
- **No necesita Gemini.**
- Uso: `/watch <url o ruta>` y luego preguntar sobre el video.

Instalación segura: el plugin es de terceros. Antes de instalarlo en la máquina del
usuario, mostrar el repo y pedir confirmación; nunca instalarlo desde un sandbox en su
nombre.

---

## Ruta B — Puente Gemini (llave gratis de Google AI Studio)

Lo que la creadora llama "lo segundo". Gemini lee YouTube de forma nativa.

1. Llave: https://aistudio.google.com → "Get API key" → crear en un proyecto. Gratis.
   Guardarla como variable de entorno, nunca en el repo:
   ```bash
   export GEMINI_API_KEY="…"
   ```
2. Llamada mínima (REST):
   ```bash
   curl -s "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=$GEMINI_API_KEY" \
     -H "Content-Type: application/json" \
     -d '{"contents":[{"parts":[
           {"file_data":{"file_uri":"https://www.youtube.com/watch?v=VIDEO_ID"}},
           {"text":"Transcribe el video con marcas de tiempo y describe qué se ve en pantalla."}]}]}'
   ```
3. Script de la skill (hace lo mismo y devuelve JSON con guion, pantalla y resumen):
   ```bash
   python3 scripts/watch_youtube.py "https://www.youtube.com/watch?v=VIDEO_ID" --out ficha.json
   python3 scripts/watch_youtube.py --list-models     # si el modelo por defecto no existe
   ```
   Opciones: `--model`, `--start 60s --end 180s` (recorte), `--fps 1`, `--lang es`.

Límites del nivel gratuito: 8 h de YouTube al día, 10 videos por petición, solo videos
**públicos** (no privados ni ocultos). Para archivos locales de más de 20 MB hay que
usar la File API de Gemini (subida previa); para menos, se puede enviar en línea como
base64. El script cubre el caso YouTube; para archivos locales usa la ruta C.

Opción INNOVAQ: el Worker `innovaq-gemini-proxy` ya guarda `GEMINI_API_KEY` como
secreto. Añadir una ruta `/api/watch` que reenvíe `generateContent` con `file_data`
permitiría usar esta ruta sin llave en local. Proponerlo al usuario; no implementarlo
sin que lo pida.

---

## Ruta C — Extracción local con ffmpeg (siempre disponible)

Es la ruta que se usó para construir esta skill dentro del sandbox (el video llegó como
archivo subido y no había `GEMINI_API_KEY` en el entorno).

```bash
bash scripts/extract_local_video.sh <video.mp4> <carpeta_salida>
```

Qué hace:

1. Localiza `ffmpeg` (`$FFMPEG`, el del sistema, o el estático de `imageio-ffmpeg`, que
   se instala con `pip install imageio-ffmpeg` desde PyPI, permitido en el sandbox).
   El ffmpeg de Playwright (`/opt/pw-browsers/ffmpeg-*`) **no** sirve: no decodifica H.264.
2. `sheet.jpg`: mosaico 6 columnas de un fotograma cada 3 s, ancho 640 px. Sirve para la
   cronología de pantalla.
3. `cap/` y `capsheet_N.jpg`: recorte de la franja de subtítulos a 2 fps, en tiras de
   2×18. La franja por defecto es `y=620..740` en un 576×1024 (ajustable con
   `--cap-y` y `--cap-h`); si el video no es 9:16, mide primero en `sheet.jpg`.
4. `audio.wav`: mono 16 kHz para Whisper.
5. `transcript.txt`: solo si `faster-whisper` se instala y puede descargar el modelo
   (necesita Hugging Face). Si falla, el script lo dice y sigue.

Cómo leer el resultado: abrir `sheet.jpg` y cada `capsheet_N.jpg` con la herramienta
Read, transcribir los subtítulos en orden (cada tira se lee por columnas: primero la
izquierda de arriba abajo, luego la derecha) y eliminar repeticiones consecutivas (el
mismo subtítulo aparece en varios fotogramas). Anotar los tiempos por posición
(fotograma n a 2 fps = n/2 segundos).

Limitaciones: sin subtítulos incrustados y sin Whisper, solo hay imagen; en ese caso
se describe la pantalla y se marca el guion como no disponible.
