# Transcripción del video de origen

- **Fuente:** TikTok de @revolutia.ai (vertical 9:16, 51 s, español).
- **Tema:** Agent Reach, repositorio open source `Panniantong/Agent-Reach` (~38 000 estrellas en el momento del video).
- **Método:** los subtítulos venían grabados en el video; se extrajeron fotograma a fotograma cada 0,5 s. No hay transcripción de audio automática porque el modelo de voz no estaba disponible en el entorno.

## Texto completo (subtítulos)

> Claude tiene un problema gordo, y es que no puede leer las plataformas donde de verdad
> está la información, como Twitter, LinkedIn, Reddit. Y alguien acaba de solucionarlo.
> Se llama AgentReach. Es gratis. Es OpenSource y tiene 38.000 estrellas en GitHub.
> El Claude normal no puede tocar plataformas cerradas, pero este sí. Transcripciones de
> YouTube y los [hilos] de Reddit, búsquedas en Twitter, en LinkedIn. Y todo con una sola
> herramienta. Pegas un comando en tu terminal y lo metes en Claude Code y ya está.
> Ahora tu agente puede leer Internet de verdad, no esos web fetches que fallan las
> veces; es acceso real con cero coste de APIs. La mayoría de la gente está parcheando
> cinco scrapers distintos para hacer esto. Así que no seas la mayoría y usa esta
> aplicación. Si quieres el repo de configuración, comunidad donde compartimos
> herramientas como ésta [todas las] semanas, ve al link de la descripción y encuentra
> el acceso.

## Lo que se ve en pantalla (cronología)

| Tiempo | Pantalla |
|--------|----------|
| 0–5 s | Logo de Claude en móvil, código en pantalla: "Claude no puede leer Twitter, LinkedIn, Reddit". |
| 10–17 s | Repositorio GitHub `Panniantong/Agent-Reach`, cartel "FREE", contador de 38.1k estrellas, web `agentreach.ai`. |
| 18–21 s | Iconos de YouTube, Reddit, X y LinkedIn: las plataformas que desbloquea. |
| 26 s | Windows PowerShell, el autor escribe `claude` para abrir Claude Code. |
| 28–29 s | Claude Code abierto (v2.1.197). En el prompt pega: `Install Agent Reach: https://raw.githubusercontent.com/Panniantong/agent-reach/main/docs/install.md`. |
| 30–35 s | Animación "ONE COMMAND — Setup. Register. Connect." con un instalador que registra el agente y conecta plataformas (`installing toolchain… registering with coding agent… running health checks… connecting platforms… agent ready. 4 platforms linked`). |
| 36 s | Animación de un "autonomous coding agent: edit · run · inspect". |
| 48–51 s | Cierre con el usuario de TikTok @revolutia.ai. |

## Lo que el video afirma y cómo lo verifica esta skill

| Afirmación del video | Verificación contra el repositorio (2026-09-19) |
|----------------------|--------------------------------------------------|
| "Gratis y open source" | Licencia MIT. Todas las herramientas aguas arriba son open source. El único coste posible es un proxy residencial (~1 USD/mes) si se despliega en un servidor. |
| "Un solo comando" | Correcto: se pega la frase con la URL de `docs/install.md` y el agente sigue esa guía. Por debajo instala un paquete Python y varias CLI. |
| "Transcripciones de YouTube" | `yt-dlp` extrae subtítulos; sin configuración. |
| "Búsquedas en Twitter" | Requiere cookies de una sesión de X exportadas a mano con Cookie-Editor. Sin cookies solo lee tuits sueltos. |
| "Reddit" | No hay ruta sin login: OpenCLI con la sesión del navegador (escritorio) o `rdt-cli` con cookie. |
| "LinkedIn" | Páginas públicas vía Jina Reader sin configurar; perfiles completos y búsqueda de empleo con `mcp-server-linkedin` (login manual en navegador). |
| "Cero coste de APIs" | Cierto para las rutas por defecto (Jina, yt-dlp, gh, Exa vía MCP). |
| "Acceso real, no web fetches que fallan" | Agent Reach no reemplaza WebFetch: añade CLIs con sesión o rutas específicas por plataforma. Sigue fallando donde la plataforma exige login y el usuario no lo aporta. |
