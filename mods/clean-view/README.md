# clean-view

Un mod de Claude Code: `/simple on` oculta el detalle técnico de la conversación y muestra los pasos del turno; `/simple` abre un dashboard interactivo; `/simple off` lo restaura.

## Vista limpia

- **Filas de herramientas**: cada llamada se dibuja como una línea tenue en lenguaje llano («Leyendo src/app.ts», «Ejecutando: instalar dependencias», «Buscando "TODO"»).
- **Resultados**: ocultos; una línea dice que lo están. Un resultado con error lo avisa.
- **Grupos de lecturas**: una sola línea con el conteo.
- **Banda encima del prompt**: los últimos pasos con ● en curso, ✓ hecho y ✗ error, el contador «n/m pasos» y el botón **Panel** (tecla `p`) que abre el dashboard.

## Dashboard interactivo (`/simple`)

Un panel lateral (en la terminal necesita `/tui fullscreen` y 110 columnas; en la app de escritorio se acopla solo) con:

| Zona | Qué hace | Tecla |
|---|---|---|
| Interruptor | Enciende o apaga la vista limpia sin salir del panel | `v` |
| Resumen del turno | Pasos totales, hechos, en curso, con error y duración del turno | |
| Desglose | Barras por tipo: lectura, edición, comandos, web, agentes, plan | |
| Filtros | Todos · En curso · Hechos · Errores | `1` `2` `3` `4` |
| Lista de pasos | Cada paso es un botón; al pulsarlo se abre su detalle | clic o Tab + Enter |
| Detalle | Herramienta, tipo, estado, duración, ruta o comando completo y el texto del error | |
| Historial | Los últimos 12 turnos: pasos, aciertos, errores, duración y mezcla de tipos | `h` |
| Limpiar / Cerrar | Vacía la lista del turno / cierra el panel | `l` `c` |

Las teclas funcionan cuando el panel tiene el foco (`/simple` lo abre enfocado; `ctrl+x tab` lo enfoca después).

Nada se pierde: la transcripción guarda todo y el modelo ve lo mismo de siempre. El mod no llama al modelo ni consume tokens.

## Instalar

```
/plugin install clean-view --marketplace alvaroruizr2024-cpu/www.innovaqsolution.com
```

O desde la terminal: `claude plugin install clean-view@innovaq-mods` tras `claude plugin marketplace add alvaroruizr2024-cpu/www.innovaqsolution.com`.

## Cómo funciona

`hooks/register.tsx` engancha `tool.call` para registrar cada paso (tipo, etiqueta, detalle, tiempos y error al resolverse), `turn.start` para vaciar la lista, `turn.complete` para guardar el resumen del turno en el historial, `command.run` para `/simple`, y `ui.render` sobre `ToolUse`, `ToolResult`, `ToolGroup`, `AbovePrompt` y `Pane` para dibujar la vista limpia y el dashboard. El estado vive en `$.state` bajo `clean-view`, declarado en `types/index.d.ts`.

## Desarrollar

```bash
claude plugin validate .
claude plugin test .
claude --plugin-dir .
```
