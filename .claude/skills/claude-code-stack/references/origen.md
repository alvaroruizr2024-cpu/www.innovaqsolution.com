# Origen de la skill

Video vertical de 60 s (TikTok, @student.gpt), titulado en pantalla "Desde principiante
hasta experto en el Código Claude". Recibido por WhatsApp el 18-09-2026
(`VID-20260918-WA0097.mp4`). Guion reconstruido de los subtítulos incrustados:

> [...] Claude Code, a menos que hayas instalado estos 4 plugins.
>
> Primero, **Ponytail**. Optimiza la salida de Claude Code y reduce el uso de tokens
> en más del 50 % sin perder precisión.
>
> Segundo, es **OmniRoute**. Le da a tu Claude Code un uso casi ilimitado al conectarse
> a más de 300 proveedores de IA gratuitos. Cuando tu límite se agota, te cambia
> automáticamente al siguiente mejor modelo, dándote hasta 1,6 mil millones [de tokens]
> gratuitos cada mes.
>
> Tercero, es **Graphify**. Convierte toda tu base de código en un grafo de conocimiento
> para que tu agente no desperdicie [tokens releyendo el código] una y otra vez.
>
> Y finalmente, **Agent Skills**. Es un paquete de 24 habilidades que te permiten
> programar como un ingeniero senior. Construido por el ex director de ingeniería de IA
> en Google, tiene habilidades dedicadas para planificación, codificación, pruebas y
> publicación. Activa la correcta en cada etapa por sí solo.

Los subtítulos escriben "Sponytail" y "Omniroot"; los nombres reales de los proyectos
son Ponytail y OmniRoute (ver `plugins.md`).

Lo que se ve en pantalla:

- Un monitor con "CLAUDE CODE" al centro y los cuatro íconos alrededor: Ponytail,
  Graphify, OmniRoute, Agent Skills.
- Ponytail: una terminal con `> /ponytail` y un panel con columnas LOC / tokens / cost /
  time (el scoreboard de `/ponytail-gain`).
- OmniRoute: la tabla "353 AI Providers — 154 Catalog-Marked Free", la grilla "Every
  major lab — through one endpoint" (OpenAI, Anthropic, Gemini, xAI, DeepSeek, Qwen,
  Meta Llama, Groq, NVIDIA, MiniMax, Perplexity, HuggingFace, Cloudflare...) y la
  pantalla "Switching model..." alternando entre GLM-5.0, Kimi y Claude Code.
- Graphify: el grafo de comunidades de colores y el panel "COMMUNITIES" con nodos como
  `APIRouter`, `SecurityBase`, `FastAPIDeprecationWarning`, `HTTPException`, `Scope`.
- Agent Skills: la tabla del README de addyosmani/agent-skills ("The pack includes 24
  skills total — 23 lifecycle skills plus the using-agent-skills meta-skill") con las
  secciones Meta / Define / Plan / Build y filas como `interview-me`, `idea-refine`,
  `spec-driven-development`, `incremental-implementation`, `test-driven-development`,
  `doubt-driven-development`, `api-and-interface-design`.

De ahí salen las reglas de la skill: instalar los cuatro en un orden que no rompa nada,
decir la verdad sobre lo que cada uno ahorra de verdad, y usar cada uno en la etapa del
trabajo donde rinde (grafo al abrir sesión, skills por fase, Ponytail al escribir,
OmniRoute solo cuando se agota la cuota).
