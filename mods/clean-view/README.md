# clean-view

Un mod de Claude Code: `/simple on` oculta el detalle técnico de la conversación y muestra una lista de pasos encima del prompt. `/simple off` lo restaura.

- **Filas de herramientas**: cada llamada se dibuja como una línea tenue en lenguaje llano («Leyendo src/app.ts», «Ejecutando: instalar dependencias», «Buscando "TODO"»).
- **Resultados**: ocultos; una línea dice que lo están. Un resultado con error lo avisa.
- **Grupos de lecturas**: una sola línea con el conteo.
- **Lista de pasos**: encima del prompt, con ● en curso, ✓ hecho y ✗ error, y el contador «n/m pasos». Se vacía al empezar cada turno.

Nada se pierde: la transcripción guarda todo y el modelo ve lo mismo de siempre. El mod no llama al modelo ni consume tokens.

## Instalar

```
/plugin install clean-view --marketplace alvaroruizr2024-cpu/www.innovaqsolution.com
```

O desde la terminal: `claude plugin install clean-view@innovaq-mods` tras `claude plugin marketplace add alvaroruizr2024-cpu/www.innovaqsolution.com`.

## Cómo funciona

`hooks/register.tsx` engancha `tool.call` para registrar cada paso (y su estado al resolverse), `turn.start` para vaciar la lista, `command.run` para `/simple`, y `ui.render` sobre `ToolUse`, `ToolResult`, `ToolGroup` y `AbovePrompt` para dibujar la vista limpia. El estado vive en `$.state` bajo `clean-view` (`isOn`, `steps`), declarado en `types/index.d.ts`.

## Desarrollar

```bash
claude plugin validate .
claude plugin test .
claude --plugin-dir .
```
