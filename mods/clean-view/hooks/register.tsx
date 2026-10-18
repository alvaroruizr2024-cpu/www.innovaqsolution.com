import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Filter, Step, StepKind, TurnSummary } from '../types'

// Clean View: `/simple on` oculta el detalle técnico de la conversación y
// muestra los pasos del turno; `/simple` abre el dashboard interactivo, un
// panel con el interruptor, contadores, desglose por tipo, filtros, la lista
// de pasos con su detalle y el historial de turnos. `/simple off` lo quita.
// Toda la información sigue en la transcripción: solo cambia lo que se dibuja.

const PANE = 'clean-view'
const MAX_STEPS = 80
const MAX_HISTORY = 12
const BAR_MAX = 10

const isOn = atom({ plugin: 'clean-view', key: 'isOn' } as const, false)
const steps = atom({ plugin: 'clean-view', key: 'steps' } as const, [])
const filter = atom({ plugin: 'clean-view', key: 'filter' } as const, 'all')
const selectedId = atom({ plugin: 'clean-view', key: 'selectedId' } as const, null)
const history = atom({ plugin: 'clean-view', key: 'history' } as const, [])
const showHistory = atom({ plugin: 'clean-view', key: 'showHistory' } as const, false)
const turnStartedAt = atom({ plugin: 'clean-view', key: 'turnStartedAt' } as const, 0)

const GLYPH: Record<Step['status'], string> = { running: '●', done: '✓', error: '✗' }
const KINDS: StepKind[] = ['read', 'edit', 'shell', 'web', 'agent', 'plan', 'other']
const KIND_NAME: Record<StepKind, string> = {
  read: 'Lectura',
  edit: 'Edición',
  shell: 'Comandos',
  web: 'Web',
  agent: 'Agentes',
  plan: 'Plan',
  other: 'Otros',
}
const FILTERS: Array<{ id: Filter; name: string; hotkey: string }> = [
  { id: 'all', name: 'Todos', hotkey: '1' },
  { id: 'running', name: 'En curso', hotkey: '2' },
  { id: 'done', name: 'Hechos', hotkey: '3' },
  { id: 'error', name: 'Errores', hotkey: '4' },
]

function short(path: string): string {
  const parts = path.split('/')
  return parts.length > 2 ? parts.slice(-2).join('/') : path
}

function str(value: unknown, max = 48): string {
  const text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

function elapsed(ms: number): string {
  const seconds = Math.max(0, Math.round(ms / 1000))
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

function bar(count: number): string {
  return count === 0 ? '·' : '▇'.repeat(Math.min(count, BAR_MAX)) + (count > BAR_MAX ? '+' : '')
}

function kindOf(tool: string): StepKind {
  switch (tool) {
    case 'Read':
    case 'Grep':
    case 'Glob':
    case 'NotebookRead':
      return 'read'
    case 'Edit':
    case 'MultiEdit':
    case 'Write':
    case 'NotebookEdit':
      return 'edit'
    case 'Bash':
      return 'shell'
    case 'WebFetch':
    case 'WebSearch':
      return 'web'
    case 'Agent':
    case 'Workflow':
      return 'agent'
    case 'TaskCreate':
    case 'TaskUpdate':
    case 'TaskList':
    case 'TaskGet':
      return 'plan'
    default:
      return 'other'
  }
}

// Una etiqueta en lenguaje llano y el detalle (ruta, comando, patrón) de cada llamada.
function describe(tool: string, input: Record<string, unknown>): { label: string; detail: string } {
  const path = typeof input.file_path === 'string' ? input.file_path : ''
  const name = path ? short(path) : ''
  switch (tool) {
    case 'Read':
      return { label: `Leyendo ${name || 'un archivo'}`, detail: path }
    case 'Edit':
    case 'MultiEdit':
      return { label: `Editando ${name || 'un archivo'}`, detail: path }
    case 'Write':
      return { label: `Escribiendo ${name || 'un archivo'}`, detail: path }
    case 'Bash':
      return {
        label: `Ejecutando: ${str(input.description) || str(input.command, 40) || 'un comando'}`,
        detail: str(input.command, 160),
      }
    case 'Grep':
      return { label: `Buscando "${str(input.pattern, 30)}"`, detail: str(input.pattern, 120) }
    case 'Glob':
      return { label: `Listando ${str(input.pattern, 30) || 'archivos'}`, detail: str(input.pattern, 120) }
    case 'WebFetch':
      return { label: `Consultando ${str(input.url, 40)}`, detail: str(input.url, 160) }
    case 'WebSearch':
      return { label: `Buscando en la web: ${str(input.query, 36)}`, detail: str(input.query, 160) }
    case 'Agent':
      return { label: `Delegando: ${str(input.description, 40) || 'un subagente'}`, detail: str(input.prompt, 160) }
    case 'TaskCreate':
      return { label: `Planificando: ${str(input.subject, 40)}`, detail: str(input.description, 160) }
    case 'TaskUpdate':
      return { label: 'Actualizando el plan', detail: str(input.status, 40) }
    case 'AskUserQuestion':
      return { label: 'Preguntándote algo', detail: '' }
    default: {
      const label = tool.startsWith('mcp__') ? `Usando ${tool.split('__').slice(1).join(' / ')}` : `Usando ${tool}`
      return { label, detail: str(JSON.stringify(input), 160) }
    }
  }
}

function countKinds(list: Step[]): Record<StepKind, number> {
  const counts = { read: 0, edit: 0, shell: 0, web: 0, agent: 0, plan: 0, other: 0 }
  for (const step of list) {
    counts[step.kind] += 1
  }

  return counts
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'simple',
      description: 'Vista limpia: on | off, o sin argumento abre el dashboard de pasos',
      argumentHint: 'on|off|panel',
      immediate: true,
    })

    return next(e)
  })

  on('command.run', { command: 'simple' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    if (arg === 'on' || arg === 'off') {
      const next = arg === 'on'
      await update($, isOn, () => next)
      if (next) {
        void $.ui.open({ id: PANE, title: 'Vista limpia' })
      }
      $.ui.invalidate('ui.render')

      return {
        text: next
          ? 'Clean View activado: el detalle técnico queda oculto y los pasos se muestran en el panel y encima del prompt. `/simple off` lo restaura.'
          : 'Clean View desactivado: vuelven a verse las herramientas y sus resultados. `/simple` abre el dashboard.',
      }
    }
    const opened = await $.ui.open({ id: PANE, title: 'Vista limpia', focus: true })

    return {
      text: opened.isPlaced
        ? 'Dashboard de Vista limpia abierto. Teclas: v interruptor, 1-4 filtros, h historial, l limpiar, c cerrar.'
        : `El dashboard espera una terminal más ancha o la vista a pantalla completa (/tui fullscreen): ${opened.reason}`,
    }
  })

  // Cada turno del hilo principal empieza con la lista en blanco.
  on('turn.start', async ($, e, next) => {
    if (e.agentId === undefined) {
      await update($, steps, () => [])
      await update($, selectedId, () => null)
      await update($, turnStartedAt, () => Date.now())
    }

    return next(e)
  })

  // Al cerrar el turno principal, su resumen pasa al historial.
  on('turn.complete', async ($, e, next) => {
    if (e.agentId === undefined) {
      const list = await read($, steps)
      if (list.length > 0) {
        const startedAt = await read($, turnStartedAt)
        const endedAt = Date.now()
        const summary: TurnSummary = {
          endedAt,
          durationMs: startedAt > 0 ? endedAt - startedAt : 0,
          total: list.length,
          done: list.filter(step => step.status === 'done').length,
          errors: list.filter(step => step.status === 'error').length,
          kinds: countKinds(list),
        }
        await update($, history, past => [...past, summary].slice(-MAX_HISTORY))
      }
    }

    return next(e)
  })

  // Cada llamada a herramienta es un paso: corriendo, hecho o con error.
  on('tool.call', async ($, e, next) => {
    if (e.agentId !== undefined) {
      return next(e) // los pasos de un subagente no se listan
    }
    const { label, detail } = describe(e.tool, e as unknown as Record<string, unknown>)
    const step: Step = {
      id: e.tool_use_id,
      tool: e.tool,
      kind: kindOf(e.tool),
      label,
      detail,
      status: 'running',
      startedAt: Date.now(),
    }
    await update($, steps, list => [...list, step].slice(-MAX_STEPS))

    const ran = await next(e)
    const failed = ran.deny !== undefined || ran.isError === true
    const error = ran.deny ?? (failed ? str(ran.text, 200) || 'La herramienta devolvió un error.' : undefined)
    const endedAt = Date.now()
    await update($, steps, list =>
      list.map(one => (one.id === step.id ? { ...one, status: failed ? 'error' : 'done', endedAt, error } : one)),
    )

    return ran
  })

  // Con la vista limpia, cada fila de herramienta es una línea tenue.
  on('ui.render', { component: 'ToolUse' }, async ($, e, next) => {
    if (!(await read($, isOn))) {
      return next(e)
    }
    const { Text } = $.ui.resolve(e)
    const input = (e.props.input ?? {}) as Record<string, unknown>
    const mark = e.props.isRunning ? '●' : e.props.isErrored ? '✗' : '✓'

    return (
      <Text dimColor>
        {mark} {describe(e.props.tool, input).label}
      </Text>
    )
  })

  on('ui.render', { component: 'ToolResult' }, async ($, e, next) => {
    if (!(await read($, isOn))) {
      return next(e)
    }
    const { Text } = $.ui.resolve(e)

    return <Text dimColor>{e.props.isErrored ? '  resultado con error (/simple off para verlo)' : '  resultado oculto'}</Text>
  })

  on('ui.render', { component: 'ToolGroup' }, async ($, e, next) => {
    if (!(await read($, isOn))) {
      return next(e)
    }
    const { Text } = $.ui.resolve(e)
    const total = e.props.calls.length
    const running = e.props.calls.filter(call => call.isRunning).length

    return (
      <Text dimColor>
        {running > 0 ? '●' : '✓'} {total} {total === 1 ? 'paso' : 'pasos'} de lectura
        {running > 0 ? ` (${running} en curso)` : ''}
      </Text>
    )
  })

  // La banda encima del prompt: los últimos pasos y un botón al dashboard.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const list = await read($, steps)
    if (!(await read($, isOn)) || e.props.hasSurvey || list.length === 0) {
      return next(e)
    }
    const { Box, Button, Text } = $.ui.resolve(e)
    const done = list.filter(step => step.status === 'done').length
    const errors = list.filter(step => step.status === 'error').length
    const room = Math.max(1, e.props.maxRows - 1)
    const shown = list.slice(-room)

    return (
      <Box flexDirection="column">
        <Box>
          <Text>
            Vista limpia · {done}/{list.length} pasos
            {errors > 0 ? ` · ${errors} con error` : ''}
            {e.props.isWorking ? ' · trabajando…' : ' · listo'}{' '}
          </Text>
          <Button key="panel" label="Panel" hotkey="p" onPress={() => $.ui.open({ id: PANE, title: 'Vista limpia', focus: true })} />
        </Box>
        {shown.map(step => (
          <Text key={step.id} dimColor={step.status === 'done'}>
            {GLYPH[step.status]} {step.label}
          </Text>
        ))}
      </Box>
    )
  })

  // El dashboard.
  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Text } = $.ui.resolve(e)
    const enabled = await read($, isOn)
    const list = await read($, steps)
    const active = await read($, filter)
    const selected = await read($, selectedId)
    const past = await read($, history)
    const inHistory = await read($, showHistory)
    const startedAt = await read($, turnStartedAt)
    const now = Date.now()

    const running = list.filter(step => step.status === 'running').length
    const done = list.filter(step => step.status === 'done').length
    const errors = list.filter(step => step.status === 'error').length
    const kinds = countKinds(list)
    const visible = active === 'all' ? list : list.filter(step => step.status === active)
    const current = list.find(step => step.id === selected)
    const turnMs = startedAt > 0 ? (running > 0 ? now - startedAt : Math.max(...list.map(s => s.endedAt ?? now), startedAt) - startedAt) : 0

    const toggle = async () => {
      await update($, isOn, value => !value)
      $.ui.invalidate('ui.render')
    }

    return (
      <Box flexDirection="column">
        <Box>
          <Text weight="bold">Vista limpia </Text>
          <Button key="toggle" label={enabled ? 'Activada' : 'Desactivada'} hotkey="v" variant={enabled ? 'primary' : 'secondary'} onPress={toggle} />
          <Text> </Text>
          <Button
            key="history"
            label={inHistory ? 'Turno actual' : 'Historial'}
            hotkey="h"
            onPress={async () => {
              await update($, showHistory, value => !value)
              $.ui.invalidate('ui.render')
            }}
          />
          <Text> </Text>
          <Button
            key="clear"
            label="Limpiar"
            hotkey="l"
            onPress={async () => {
              await update($, steps, () => [])
              await update($, selectedId, () => null)
              $.ui.invalidate('ui.render')
            }}
          />
          <Text> </Text>
          <Button key="close" label="Cerrar" hotkey="c" onPress={() => $.ui.close({ id: PANE })} />
        </Box>
        {!enabled && <Text dimColor>La vista limpia está apagada: la transcripción muestra el detalle completo. Pulsa v para ocultarlo.</Text>}

        {inHistory ? (
          <Box flexDirection="column">
            <Text>Últimos turnos</Text>
            {past.length === 0 && <Text dimColor>Aún no hay turnos cerrados en esta sesión.</Text>}
            {[...past].reverse().map((turn, i) => (
              <Text key={`turn-${turn.endedAt}`} dimColor={i > 0}>
                {GLYPH[turn.errors > 0 ? 'error' : 'done']} hace {elapsed(now - turn.endedAt)} · {turn.total} pasos · {turn.done} ✓
                {turn.errors > 0 ? ` · ${turn.errors} ✗` : ''} · {elapsed(turn.durationMs)} ·{' '}
                {KINDS.filter(kind => turn.kinds[kind] > 0)
                  .map(kind => `${KIND_NAME[kind].toLowerCase()} ${turn.kinds[kind]}`)
                  .join(', ')}
              </Text>
            ))}
          </Box>
        ) : (
          <Box flexDirection="column">
            <Text>
              Turno: {list.length} pasos · {done} ✓ · {running} ● · {errors} ✗ · {elapsed(turnMs)}
              {running > 0 ? ' · trabajando…' : ''}
            </Text>
            <Box flexDirection="column">
              {KINDS.filter(kind => kinds[kind] > 0 || kind === 'read' || kind === 'edit' || kind === 'shell').map(kind => (
                <Text key={`kind-${kind}`} dimColor={kinds[kind] === 0}>
                  {KIND_NAME[kind].padEnd(9)} {bar(kinds[kind])} {kinds[kind]}
                </Text>
              ))}
            </Box>
            <Box>
              <Text dimColor>Filtro: </Text>
              {FILTERS.map(option => (
                <Button
                  key={`filter-${option.id}`}
                  label={option.name}
                  hotkey={option.hotkey}
                  variant={active === option.id ? 'primary' : 'secondary'}
                  onPress={async () => {
                    await update($, filter, () => option.id)
                    $.ui.invalidate('ui.render')
                  }}
                />
              ))}
            </Box>
            {visible.length === 0 && (
              <Text dimColor>{list.length === 0 ? 'Aún no hay pasos en este turno.' : 'Ningún paso con ese filtro.'}</Text>
            )}
            {visible.map(step => (
              <Button
                key={`step-${step.id}`}
                plain
                dimColor={step.status === 'done' && step.id !== selected}
                onPress={async () => {
                  await update($, selectedId, value => (value === step.id ? null : step.id))
                  $.ui.invalidate('ui.render')
                }}
              >
                {step.id === selected ? '▸ ' : '  '}
                {GLYPH[step.status]} {step.label}
                <Text dimColor> {elapsed((step.endedAt ?? now) - step.startedAt)}</Text>
              </Button>
            ))}
            {current !== undefined && (
              <Box flexDirection="column">
                <Text> </Text>
                <Text weight="bold">Detalle</Text>
                <Text>
                  {current.tool} · {KIND_NAME[current.kind].toLowerCase()} ·{' '}
                  {current.status === 'running' ? 'en curso' : current.status === 'done' ? 'hecho' : 'error'} ·{' '}
                  {elapsed((current.endedAt ?? now) - current.startedAt)}
                </Text>
                {current.detail !== '' && <Text dimColor>{current.detail}</Text>}
                {current.error !== undefined && <Text color="red">{current.error}</Text>}
              </Box>
            )}
          </Box>
        )}
      </Box>
    )
  })
}
