# Instalador de skills y MCP para Claude Code

Script para dejar Claude Code listo para diseñar webs profesionales, basado en el
video **"3 Tips para crear Webs Profesionales con Claude"**. Instala un conjunto de
skills de diseño a nivel de usuario (`~/.claude/skills`) y conecta los MCP de Figma
y Playwright.

## Requisitos

- Node.js 18 o superior (incluye `npx`) — <https://nodejs.org>
- Git
- Claude Code CLI (`claude`). Si no está instalado, las skills se instalan igual y
  los MCP se agregan a mano (ver más abajo).

## Uso (macOS / Linux)

```bash
bash tools/claude-setup/instalar-skills-claude.sh
```

El script es idempotente: se puede volver a ejecutar para actualizar las skills.

## Qué instala

| # | Paquete | Qué aporta |
|---|---------|------------|
| 1 | `emilkowalski/skills` | `emil-design-eng`, `animate`, `prototype` y otras skills de animación y diseño |
| 2 | `pbakaus/impeccable` | Lenguaje de diseño y comandos `/impeccable` (craft, shape, critique, audit...) |
| 3 | `leonxlnx/taste-skill` | `design-taste-frontend`, `image-to-code`, anti-diseño genérico |
| 4 | `senlindesign/taste-skill` | Comando `/taste <url>` para tomar referencias visuales de cualquier web |
| 5 | MCP **Figma** | `https://mcp.figma.com/mcp` (transporte HTTP, alcance de usuario) |
| 6 | MCP **Playwright** | `@playwright/mcp` para navegar y capturar pantallas desde Claude Code |

## Agregar los MCP a mano

Si el script no encontró el comando `claude`, instala Claude Code y luego ejecuta:

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp -s user
claude mcp add playwright -s user -- npx -y @playwright/mcp@latest
claude mcp list
```

La primera vez que uses el MCP de Figma, Claude Code te pedirá iniciar sesión en Figma.

## Próximos pasos

1. Reinicia Claude Code (cierra y vuelve a abrir la sesión).
2. Dentro del chat escribe `/impeccable init` para configurar el lenguaje de diseño del proyecto.
3. Para copiar el estilo de una web de referencia: `/taste https://linear.app`.
4. Para construir: `Build me a landing page for <tu producto>`.

## Aplicarlo a INNOVAQ

El repo ya trae los dos archivos que leen estas skills, así que no hace falta correr
`/impeccable init` desde cero:

- `PRODUCT.md` (raíz): quién es el cliente, productos, voz, CTA de WhatsApp y
  restricciones (sin precios en el showroom, precios solo en `global/`).
- `DESIGN.md` (raíz): paleta de los dos temas (cinematic oscuro y suite claro),
  tipografía, radios, componentes y antipatrones, extraídos del código real.

Flujo por landing de producto (`sig360/`, `ERP360/`, `TPM360/`, …):

1. `/impeccable critique sig360` para listar qué se ve genérico.
2. `/taste https://linear.app` (o la web de referencia que quieras) para tomar ritmo y
   jerarquía; Claude los aplica con la paleta de `DESIGN.md`.
3. "Rediseña el hero de SIG360 siguiendo DESIGN.md y PRODUCT.md".
4. `/impeccable audit sig360` y, con el MCP de Playwright, "abre sig360/index.html,
   captura móvil y escritorio y dime qué se rompe".

Si `/impeccable init` pregunta por datos que ya están en `PRODUCT.md`, responde que los
lea de ahí. Cuando cambie la marca, edita `DESIGN.md` y el JSON de la skill
`launch-kit` (`.claude/skills/launch-kit/assets/brand-innovaq.json`) a la vez.

## Windows

El script está pensado para macOS y Linux. En Windows ejecútalo desde Git Bash o WSL,
o corre los comandos `npx` y `claude mcp add` del script uno a uno en PowerShell.
