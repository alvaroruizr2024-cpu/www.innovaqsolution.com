# Alternativas cuando la red bloquea YouTube o NotebookLM

El proxy de los entornos remotos de Claude Code rechaza con 403 el CONNECT a
youtube.com, youtu.be, ytimg.com, googlevideo.com, drive.google.com (descarga
directa) y notebooklm.google.com. Tambien bloquea espejos (Invidious, Piped) y
servicios oEmbed de terceros (noembed). Comprobado en septiembre de 2026; si el
preflight dice `blocked`, no insistas con otra herramienta: WebFetch y curl
comparten el mismo proxy.

## Que si funciona desde el entorno

| Via | Limite | Como |
|-----|--------|------|
| Conector Google Drive (`download_file_content`) | 10 MB por archivo | Buscar con `search_files`, descargar, decodificar con `video-reader/scripts/decode_drive_download.py` |
| Conector Gmail | solo texto | Buscar correos de YouTube ("Tu video se ha publicado") o del usuario con el enlace; suelen traer el titulo |
| PyPI | libre | Instalar `yt-dlp` e `imageio-ffmpeg` para cuando la red se abra |
| Texto pegado en el chat | ninguno | Transcripcion, resumen de NotebookLM, descripcion |

## Orden recomendado

1. **Buscar el archivo fuente en Drive.** Consulta
   `mimeType contains 'video/' and modifiedTime > '<fecha reciente>'` y compara
   fecha de subida y nombre con el video de YouTube. Si pesa mas de 10 MB, pide
   al usuario un recorte de 1 a 2 minutos o una version comprimida
   (`ffmpeg -i in.mp4 -vf scale=-2:360 -b:v 400k -b:a 64k out.mp4` ronda 3 MB/min).
2. **Buscar el titulo en Gmail.** Consultas utiles: el ID del video, `from:youtube.com newer_than:7d`,
   `notebooklm`. Si aparece el titulo, ya puedes cerrar el caso de "embeber con
   titulo real".
3. **Pedir texto al usuario.** Un artefacto de NotebookLM es un resumen o video
   generado a partir de fuentes; el usuario puede copiar el texto o descargar el
   video de NotebookLM y subirlo a Drive.
4. **Politica de red.** Para futuras sesiones, habilitar en el entorno de
   Claude Code en la web: `youtube.com`, `*.youtube.com`, `youtu.be`,
   `*.googlevideo.com`, `*.ytimg.com`, `notebooklm.google.com`.
   Documentacion: https://code.claude.com/docs/en/claude-code-on-the-web

## Que hacer mientras tanto

No detengas el resto del trabajo. Si la tarea era embeber el video, hazlo con el
ID (el `iframe` funciona igual en el navegador del visitante) y un titulo
provisional facil de localizar, por ejemplo `INNOVAQ Solutions: Nuevo Video del
Canal`, y deja dicho en la respuesta final que hay que reemplazarlo.
