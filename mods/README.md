# Mods de Claude Code

Los nueve mods del video [«Estos 9 MODS de Claude son MUY BESTIAS (y así se usan)»](https://www.youtube.com/watch?v=jMxAO6Lo8dc) de Migue Baena IA, listos para instalar desde este repositorio.

Un mod es un plugin de Claude Code con un módulo de *function hooks*: puede dibujar paneles, bandas encima del prompt, comandos `/`, y reaccionar a lo que hace Claude. Necesitan **Claude Code 2.1.287 o superior**, en la terminal o en la pestaña Code de la app de escritorio. Los paneles laterales requieren la vista a pantalla completa (`/tui fullscreen`) y una terminal de al menos 110 columnas.

| # | Mod (video) | Nombre del plugin | Comando | Origen | Licencia |
|---|---|---|---|---|---|
| 1 | Subagent Progress | `savvy-progress` | `/agents-info` | [johnnyvizz/claude-kit](https://github.com/johnnyvizz/claude-kit/tree/main/plugins/savvy-progress) | MIT |
| 2 | File Tree | `filetree` | `/filetree` | [data-goblin/claude-code-filetree](https://github.com/data-goblin/claude-code-filetree) | MIT |
| 3 | Next Steps | `next-steps` | automático tras cada turno | [anthropics/claude-plugins-community](https://github.com/anthropics/claude-plugins-community/tree/main/next-steps) | MIT |
| 4 | Recording Mode | `recording-mode` | `/rec`, `/rec off`, `/rec config` | [nateherkai/claude-code-mods](https://github.com/nateherkai/claude-code-mods) | MIT |
| 5 | Clean View | `clean-view` | `/simple on`, `/simple off` | [este repo](clean-view/) | MIT |
| 6 | Agent Dock | `agent-dock` | `/dock [1-8]` | [este repo](agent-dock/) | MIT |
| 7 | You Should Know | `cc-plugin-you-should-know@builtin` | ninguno, avisa solo | integrado en Claude Code | — |
| 8 | Claude Skins | `skins` | `/skin`, `/skin <nombre>` | [hellosverre/claude-skins](https://github.com/hellosverre/claude-skins) | MIT |
| 9 | Replay Theater | `replay-theater` | `/replay` | [anthropics/claude-code-playground](https://github.com/anthropics/claude-code-playground/tree/main/claude-code/mods/replay-theater) | Apache-2.0 |

Extra: `savvy-flow`, la skill de orquestación para la que se hizo `savvy-progress` (el video la usa para repartir el trabajo entre subagentes).

## Instalación en un paso

Desde la terminal, con Claude Code instalado:

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/alvaroruizr2024-cpu/www.innovaqsolution.com/main/mods/install-mods.sh)
```

O, si ya tienes el repositorio clonado:

```bash
bash mods/install-mods.sh
```

El script registra este repositorio como *marketplace* (`innovaq-mods`), instala los ocho plugins con alcance de usuario y activa el mod integrado You Should Know. Después abre una sesión nueva: un mod carga al iniciar la sesión.

## Instalación manual

Registra el marketplace una vez:

```bash
claude plugin marketplace add alvaroruizr2024-cpu/www.innovaqsolution.com
```

Instala cada mod que quieras:

```bash
claude plugin install savvy-progress@innovaq-mods --scope user
claude plugin install savvy-flow@innovaq-mods --scope user
claude plugin install filetree@innovaq-mods --scope user
claude plugin install next-steps@innovaq-mods --scope user
claude plugin install recording-mode@innovaq-mods --scope user
claude plugin install clean-view@innovaq-mods --scope user
claude plugin install agent-dock@innovaq-mods --scope user
claude plugin install skins@innovaq-mods --scope user
claude plugin install replay-theater@innovaq-mods --scope user
```

Activa You Should Know, que viene dentro de Claude Code pero apagado:

```bash
claude plugin enable cc-plugin-you-should-know@builtin
```

Dentro de una sesión funcionan los mismos comandos con `/plugin` en lugar de `claude plugin`. En la app de escritorio: `+` junto al prompt, **Plugins**, **Add marketplace** con `alvaroruizr2024-cpu/www.innovaqsolution.com`, y luego **Add plugin**.

Los siete mods de la comunidad se descargan de su repositorio de origen en el momento de instalar, así que `claude plugin update <mod>@innovaq-mods` trae sus nuevas versiones. Lee el código de un mod antes de instalarlo: un mod corre con tus permisos.

## Desinstalar

```bash
claude plugin uninstall <mod>@innovaq-mods
claude plugin marketplace remove innovaq-mods   # quita el marketplace y todos sus plugins
```

## Los dos mods propios

### clean-view

`/simple on` oculta el detalle técnico: cada fila de herramienta pasa a ser una línea tenue («Leyendo src/app.ts», «Ejecutando: instalar dependencias»), los resultados se ocultan y los grupos de lecturas se resumen en una línea. Encima del prompt aparece la lista de pasos del turno con su estado (● en curso, ✓ hecho, ✗ error) y el contador «n/m pasos». `/simple off` devuelve la vista normal. Nada se pierde: la transcripción sigue completa y el modelo ve lo mismo de siempre. No usa tokens adicionales.

### agent-dock

`/dock` abre el panel Agent Dock. Elige con los botones 1 a 8 (o `/dock 5`) cuántos subagentes quieres para el siguiente encargo; tu próximo mensaje lleva la instrucción de repartir el trabajo entre ellos. Cada subagente que arranca aparece como una tarjeta con su tarea, tipo, estado y tiempo. «Limpiar terminadas» deja solo las activas. Cada agente consume uso de tu plan: elige el equipo según el trabajo.

## Desarrollar sobre ellos

```bash
claude plugin validate mods/clean-view
claude plugin test mods/clean-view
claude --plugin-dir mods/clean-view      # cargarlo solo en esa sesión
```

Los tipos del motor (`import type { Register } from 'claude-code'`) los escribe Claude Code junto al mod la primera vez que lo carga, en `.claude-plugin/types/`.
