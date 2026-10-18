import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { Step } from '../types'

// Clean View: `/simple on` oculta el detalle técnico de la conversación y
// muestra una lista de pasos encima del prompt; `/simple off` lo restaura.
// Toda la información sigue en la transcripción: solo cambia lo que se dibuja.

const MAX_STEPS = 60

const isOn = atom({ plugin: 'clean-view', key: 'isOn' } as const, false)
const steps = atom({ plugin: 'clean-view', key: 'steps' } as const, [])

const GLYPH: Record<Step['status'], string> = { running: '●', done: '✓', error: '✗' }

function short(path: string): string {
  const parts = path.split('/')
  return parts.length > 2 ? parts.slice(-2).join('/') : path
}

function str(value: unknown, max = 48): string {
  const text = typeof value === 'string' ? value.replace(/\s+/g, ' ').trim() : ''
  return text.length > max ? `${text.slice(0, max - 1)}…` : text
}

// Una etiqueta en lenguaje llano para cada llamada a herramienta.
function labelOf(tool: string, input: Record<string, unknown>): string {
  const path = typeof input.file_path === 'string' ? short(input.file_path) : ''
  switch (tool) {
    case 'Read':
      return `Leyendo ${path || 'un archivo'}`
    case 'Edit':
    case 'MultiEdit':
      return `Editando ${path || 'un archivo'}`
    case 'Write':
      return `Escribiendo ${path || 'un archivo'}`
    case 'Bash':
      return `Ejecutando: ${str(input.description) || str(input.command, 40) || 'un comando'}`
    case 'Grep':
      return `Buscando "${str(input.pattern, 30)}"`
    case 'Glob':
      return `Listando ${str(input.pattern, 30) || 'archivos'}`
    case 'WebFetch':
      return `Consultando ${str(input.url, 40)}`
    case 'WebSearch':
      return `Buscando en la web: ${str(input.query, 36)}`
    case 'Agent':
      return `Delegando: ${str(input.description, 40) || 'un subagente'}`
    case 'TaskCreate':
      return `Planificando: ${str(input.subject, 40)}`
    case 'TaskUpdate':
      return 'Actualizando el plan'
    case 'AskUserQuestion':
      return 'Preguntándote algo'
    default:
      return tool.startsWith('mcp__') ? `Usando ${tool.split('__').slice(1).join(' / ')}` : `Usando ${tool}`
  }
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'simple',
      description: 'Vista limpia: oculta el detalle técnico y muestra una lista de pasos (on | off)',
      argumentHint: 'on|off',
      immediate: true,
    })

    return next(e)
  })

  on('command.run', { command: 'simple' }, async ($, e) => {
    const arg = e.args.trim().toLowerCase()
    const current = await read($, isOn)
    const next = arg === 'on' ? true : arg === 'off' ? false : !current
    await update($, isOn, () => next)
    $.ui.invalidate('ui.render')

    return {
      text: next
        ? 'Clean View activado: el detalle técnico queda oculto y los pasos se muestran encima del prompt. `/simple off` lo restaura.'
        : 'Clean View desactivado: vuelven a verse las herramientas y sus resultados.',
    }
  })

  // Cada turno del hilo principal empieza con la lista en blanco.
  on('turn.start', async ($, e, next) => {
    if (e.agentId === undefined) {
      await update($, steps, () => [])
    }

    return next(e)
  })

  // Cada llamada a herramienta es un paso: corriendo, hecho o con error.
  on('tool.call', async ($, e, next) => {
    if (e.agentId !== undefined) {
      return next(e) // los pasos de un subagente no se listan
    }

    const step: Step = {
      id: e.tool_use_id,
      tool: e.tool,
      label: labelOf(e.tool, e as unknown as Record<string, unknown>),
      status: 'running',
    }
    await update($, steps, list => [...list, step].slice(-MAX_STEPS))

    const ran = await next(e)
    const status: Step['status'] = ran.deny !== undefined || ran.isError === true ? 'error' : 'done'
    await update($, steps, list => list.map(one => (one.id === step.id ? { ...one, status } : one)))

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
        {mark} {labelOf(e.props.tool, input)}
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

  // La lista de pasos encima del prompt.
  on('ui.render', { component: 'AbovePrompt' }, async ($, e, next) => {
    const list = await read($, steps)
    if (!(await read($, isOn)) || e.props.hasSurvey || list.length === 0) {
      return next(e)
    }
    const { Box, Text } = $.ui.resolve(e)
    const done = list.filter(step => step.status === 'done').length
    const errors = list.filter(step => step.status === 'error').length
    const room = Math.max(1, e.props.maxRows - 1)
    const shown = list.slice(-room)

    return (
      <Box flexDirection="column">
        <Text>
          Vista limpia · {done}/{list.length} pasos
          {errors > 0 ? ` · ${errors} con error` : ''}
          {e.props.isWorking ? ' · trabajando…' : ' · listo'}
          <Text dimColor> · /simple off para ver el detalle</Text>
        </Text>
        {shown.map(step => (
          <Text key={step.id} dimColor={step.status === 'done'}>
            {GLYPH[step.status]} {step.label}
          </Text>
        ))}
      </Box>
    )
  })
}
