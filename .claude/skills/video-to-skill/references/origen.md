# Origen de la skill

- **Fuente:** TikTok de @melisaescobarta (358,4 mil seguidores, "+65 000 estudiantes se
  han formado conmigo"), vertical 9:16, 576×1024, 66,8 s, español, sin título en
  pantalla. Archivo recibido como `VID-20260919-WA0000.mp4` (reenviado por WhatsApp).
- **Tema:** darle a Claude la capacidad de ver videos de YouTube y convertir lo que
  aprende en una habilidad (skill) nueva y permanente.
- **Método de lectura:** los subtítulos venían incrustados en el video; se extrajeron
  fotograma a fotograma a 2 fps con ffmpeg (ruta C de `rutas-de-vision.md`). No hubo
  transcripción de audio automática: el sandbox no pudo descargar el modelo de
  `faster-whisper` (Hugging Face bloqueado por el proxy con 403). Las frases entre
  corchetes son puntuación o conectores añadidos para legibilidad; el resto es literal.

## Guion completo (subtítulos)

> Le acabo de enseñar [a Claude] a ver vídeos de YouTube y ahora todo lo que aprende es
> una nueva habilidad. Y así es como tú también [puedes hacerlo]. A ver, para lograr
> todo esto solo necesitas tres cosas. Pero tranqui, Claude Code te ayuda a configurarlo
> todo.
>
> Lo primero es instalar esta habilidad. Y es que Claude normalmente no puede ver
> vídeos, pero esta habilidad es la que le da ese poder, que básicamente es como si le
> diera ojos.
>
> Lo segundo es conseguir una llave de Gemini en Google AI Studio, pero eso es
> completamente gratis. Y es importante, porque Gemini de Google entiende videos de
> YouTube de forma nativa; es decir, lo usa como puente para que Claude pueda acceder al
> contenido del video sin ningún problema.
>
> Y lo tercero: con toda esa información que Claude ya extrajo del video, simplemente
> tienes que pedirle que todo lo que aprendió lo convierta en una habilidad nueva. Y
> listo. A partir de ahí tiene esa habilidad disponible para que la uses cuando quieras.
>
> Y eso es algo súper poderoso. A ver, imagina que le pones a ver videos sobre los
> mejores vendedores del mundo: Claude aprenderá su estilo y a partir de ese momento
> puede aplicarlo solo. O videos de los mejores creadores de contenido, o de cualquier
> experto en los que lo necesites. Lo que quieras enseñarle, él lo aprende y lo guarda.
>
> Así que si quieres aprender a instalarlo, te dejé un comentario en mi comunidad. Para
> acceder, pulsa aquí en mi perfil.

## Lo que se ve en pantalla (cronología)

| Tiempo | Pantalla |
|--------|----------|
| 0–3 s | Mascota naranja de Claude (mano con gafas) sobre la presentadora; sobreimpreso "a ver vídeos de YouTube". |
| 9–12 s | Captura de Claude Code en terminal con el prompt `what does the retry logic do?` mientras dice "Claude Code te ayuda a configurarlo todo". |
| 13–15 s | Mascota gris/triste frente a un portátil: "Claude normalmente no puede ver vídeos". |
| 15–17 s | README de GitHub, pestañas "README · MIT license", título `/watch` con flecha roja y el subtítulo **"Give Claude the ability to watch any video."** |
| 21–24 s | Pantalla de Google AI Studio, cuadro "Detalles de la clave de API" (clave, nombre `Gemini API Key`, nombre y número de proyecto difuminados), botón "Copiar guía de inicio rápido de cURL" y aviso "Se copió en el portapapeles". |
| 30–36 s | Mascota naranja en primer plano ("lo usa como puente… para que Claude pueda acceder al contenido del video"). |
| 36–39 s | Captura de Claude (modelo "Sonnet 5 · Medio", modo Chat) con el prompt escrito: **"con toda la información que aprendiste sobre ese video conviértela en una habilidad"**. |
| 46–52 s | Resultados de búsqueda de YouTube sobre vendedores: "Joe Girard, el mejor vendedor del mundo según los Guinness récords", "Expertos en Ventas: los mejores vendedores hablan poco…", "¿Te dicen 'es muy caro'? Responde esto", "La venta es un juego mental", "Expertos En Ventas: Cómo Vender Cualquier Cosa" (Adrià Solà Pastor). |
| 52–56 s | Resultados de YouTube sobre creación de contenido: "CURSO GRATUITO Creación de contenido, CLASE 1, Nicho, Proceso…" (Eli Finds), "Si empezara mi marca personal en 2026 haría esto" (Carla Con Wifi), "Construye tu marca…", "Así es Crear Contenido en Modo Fácil" (Solange Ferreira), "En realidad es fácil". |
| 58–60 s | Mascota naranja con gafas frente a un portátil, pizarra "ENFOQUE · DISCIPLINA · CONSTANCIA · ÉXITO" ("él lo aprende y lo guarda"). |
| 62–65 s | Perfil de TikTok @melisaescobarta con flecha roja al enlace de la bio ("pulsa aquí en mi perfil"). |
| 65–67 s | Cierre con logo de TikTok y "@melisaescobarta". |

## Lo que el video afirma y cómo lo verifica esta skill

| Afirmación del video | Verificación (2026-09-19) |
|----------------------|----------------------------|
| "Instalar esta habilidad" (`/watch`) | Es el plugin **bradautomates/claude-video** (MIT). Se instala con `/plugin marketplace add bradautomates/claude-video` y `/plugin install watch@claude-video`, o `npx skills add bradautomates/claude-video -g` para otros hosts. Descarga con `yt-dlp`, extrae fotogramas con `ffmpeg`, usa subtítulos gratuitos y Whisper (Groq u OpenAI) como respaldo. |
| "Claude normalmente no puede ver vídeos" | Cierto. Claude lee imágenes, no video; cualquier ruta convierte el video en fotogramas + texto. |
| "Lo segundo es una llave de Gemini… gratis" | Google AI Studio da una llave gratuita. **Pero el plugin `/watch` no la usa**; su README dice "No Gemini API required". La llave sirve para la ruta alternativa (puente Gemini), que sí lee YouTube de forma nativa. |
| "Gemini entiende videos de YouTube de forma nativa" | Cierto. La API acepta `file_data.file_uri` con una URL pública de YouTube. Límite gratis 8 h de video al día, máximo 10 videos por petición, solo videos públicos. |
| "Todo lo que aprendió lo convierte en una habilidad nueva… y listo" | Cierto en el sentido de que Claude Code puede escribir una carpeta `SKILL.md`; **no** es automático. La skill tiene que decir cuándo dispararse y qué hacer, y hay que guardarla en un sitio durable (repo o `~/.claude/skills`). Eso es lo que sistematiza `video-to-skill`. |
| "Claude aprenderá su estilo [de los mejores vendedores] y puede aplicarlo solo" | Parcialmente. Aprende lo que el video muestra (frases, estructura, objeciones), y solo si la skill lo captura como reglas operativas con ejemplos. No hay "aprendizaje" fuera de lo escrito en la skill. |
| "Claude Code te ayuda a configurarlo todo" | Cierto para ffmpeg/yt-dlp y para crear la skill. La llave de Gemini y la instalación del plugin las hace el usuario en su máquina. |
| "Te dejé un comentario en mi comunidad" | Llamada a la acción comercial; no aporta al método. |

## Lo que esta skill toma del video

1. La idea de **tres pasos** (ojos → puente → convertir en habilidad), respetada como
   estructura del flujo.
2. El **prompt literal** de la creadora, que se usa como frase de disparo:
   "con toda la información que aprendiste sobre ese video conviértela en una habilidad".
3. Los dos **casos de uso** que propone (estilo de vendedores, estilo de creadores de
   contenido), convertidos en la regla de "capturar estilo como reglas operativas".
