# agent-dock

Un mod de Claude Code: `/dock` abre un panel para elegir cuántos subagentes usar en el siguiente encargo y seguir una tarjeta por agente.

- **Equipo**: botones 1 a 8 (teclas rápidas con el panel enfocado) o `/dock 5`. El siguiente mensaje que envíes lleva, como contexto para el modelo, la instrucción de repartir el trabajo entre ese número de subagentes y de integrar sus resultados al final. Se aplica una sola vez por elección.
- **Tarjetas**: cada subagente que arranca (`agent.spawn`) aparece con su tarea, su tipo, su estado (● trabajando, ✓ terminado, ✗ falló) y el tiempo transcurrido. El estado se actualiza cuando termina el turno del subagente y, al cerrar el turno principal, con lo que `$.agent.list()` sepa de cada uno.
- **Limpiar terminadas** deja solo las activas; **Cerrar** cierra el panel. El panel se abre solo cuando arranca un agente.

Cada subagente consume uso de tu plan. Elige el equipo según el trabajo: cinco áreas distintas, cinco agentes.

## Instalar

```
/plugin install agent-dock --marketplace alvaroruizr2024-cpu/www.innovaqsolution.com
```

O desde la terminal: `claude plugin install agent-dock@innovaq-mods` tras `claude plugin marketplace add alvaroruizr2024-cpu/www.innovaqsolution.com`.

## Cómo funciona

`hooks/register.tsx` registra `/dock` en `session.start`, lo atiende en `command.run`, añade el contexto en `prompt.submit` mientras el dock está armado, registra tarjetas en `agent.spawn`, las cierra en `turn.complete` y dibuja el panel con `ui.render` sobre `Pane`. El estado vive en `$.state` bajo `agent-dock` (`crew`, `isArmed`, `cards`), declarado en `types/index.d.ts`.

## Desarrollar

```bash
claude plugin validate .
claude plugin test .
claude --plugin-dir .
```
