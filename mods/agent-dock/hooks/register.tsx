import { atom, read, update } from 'claude-code'
import type { Register } from 'claude-code'

import type { AgentCard } from '../types'

// Agent Dock: `/dock` abre un panel donde eliges cuántos subagentes quieres
// para el siguiente encargo y sigues una tarjeta por agente mientras trabajan.

const PANE = 'agent-dock'
const MAX_CARDS = 40
const MIN_CREW = 1
const MAX_CREW = 8

const crew = atom({ plugin: 'agent-dock', key: 'crew' } as const, 3)
const isArmed = atom({ plugin: 'agent-dock', key: 'isArmed' } as const, false)
const cards = atom({ plugin: 'agent-dock', key: 'cards' } as const, [])

const GLYPH: Record<AgentCard['status'], string> = { running: '●', done: '✓', failed: '✗' }
const WORD: Record<AgentCard['status'], string> = { running: 'trabajando', done: 'terminado', failed: 'falló' }

function elapsed(from: number, to: number): string {
  const seconds = Math.max(0, Math.round((to - from) / 1000))
  return seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m ${seconds % 60}s`
}

function brief(n: number): string {
  return [
    `Reparte este encargo entre ${n} subagentes que trabajen en paralelo.`,
    'Divide el trabajo en partes claramente delimitadas, una por agente, con una descripción corta de cada tarea.',
    'Cuando terminen, integra sus resultados en una sola entrega y señala cualquier conflicto entre ellos.',
  ].join(' ')
}

export const register: Register = on => {
  on('session.start', async ($, e, next) => {
    await $.command.register({
      name: 'dock',
      description: 'Agent Dock: elige cuántos subagentes usar y sigue sus tarjetas en un panel',
      argumentHint: '[1-8]',
    })

    return next(e)
  })

  on('command.run', { command: 'dock' }, async ($, e) => {
    const n = Number.parseInt(e.args.trim(), 10)
    let text = 'Agent Dock abierto.'
    if (Number.isInteger(n) && n >= MIN_CREW && n <= MAX_CREW) {
      await update($, crew, () => n)
      await update($, isArmed, () => true)
      text = `Agent Dock: el siguiente encargo se repartirá entre ${n} ${n === 1 ? 'agente' : 'agentes'}.`
    }
    await $.ui.open({ id: PANE, title: 'Agent Dock', focus: true })

    return { text }
  })

  // El siguiente prompt lleva la instrucción de repartir el trabajo.
  on('prompt.submit', async ($, e, next) => {
    if (e.command !== undefined || e.isMeta || e.origin.kind !== 'composer' || !(await read($, isArmed))) {
      return next(e)
    }
    const n = await read($, crew)
    await update($, isArmed, () => false)
    $.ui.toast(`Agent Dock: encargo repartido entre ${n} agentes`)

    return next({ ...e, context: [...(e.context ?? []), brief(n)] })
  })

  // Cada subagente que arranca es una tarjeta.
  on('agent.spawn', async ($, e, next) => {
    const spawned = await next(e)
    if (spawned.deny !== undefined || spawned.agentId === undefined) {
      return spawned
    }
    const card: AgentCard = {
      id: spawned.agentId,
      description: e.description || e.prompt.slice(0, 60),
      type: e.subagentType,
      status: 'running',
      startedAt: await $.clock.now(),
    }
    await update($, cards, list => [...list.filter(one => one.id !== card.id), card].slice(-MAX_CARDS))
    void $.ui.open({ id: PANE, title: 'Agent Dock' })
    $.ui.invalidate('ui.render')

    return spawned
  })

  // El turno de un subagente termina: su tarjeta cambia de estado.
  on('turn.complete', async ($, e, next) => {
    if (e.agentId !== undefined) {
      const status: AgentCard['status'] = e.reason === 'answer' ? 'done' : 'failed'
      const endedAt = await $.clock.now()
      await update($, cards, list =>
        list.map(one => (one.id === e.agentId && one.status === 'running' ? { ...one, status, endedAt } : one)),
      )
      $.ui.invalidate('ui.render')
    } else {
      // Al cerrar el turno principal, lo que el motor sepa de cada agente manda.
      const known = await $.agent.list()
      const endedAt = await $.clock.now()
      await update($, cards, list =>
        list.map(one => {
          const live = known.find(agent => agent.id === one.id)
          if (one.status !== 'running' || live === undefined) {
            return one
          }
          if (live.status === 'completed') {
            return { ...one, status: 'done', endedAt }
          }
          if (live.status === 'failed' || live.status === 'killed') {
            return { ...one, status: 'failed', endedAt }
          }

          return one
        }),
      )
      $.ui.invalidate('ui.render')
    }

    return next(e)
  })

  on('ui.render', { component: 'Pane', requestId: PANE }, async ($, e) => {
    const { Box, Button, Text } = $.ui.resolve(e)
    const n = await read($, crew)
    const armed = await read($, isArmed)
    const list = await read($, cards)
    const now = await $.clock.now()
    const running = list.filter(card => card.status === 'running').length
    const done = list.filter(card => card.status === 'done').length
    const sizes = Array.from({ length: MAX_CREW }, (_, i) => i + MIN_CREW)

    return (
      <Box flexDirection="column">
        <Text>Agentes para el siguiente encargo:</Text>
        <Box flexWrap="wrap">
          {sizes.map(size => (
            <Button
              key={`crew-${size}`}
              label={size === n ? `[${size}]` : ` ${size} `}
              hotkey={String(size)}
              variant={size === n ? 'primary' : 'secondary'}
              onPress={async () => {
                await update($, crew, () => size)
                await update($, isArmed, () => true)
                $.ui.invalidate('ui.render')
              }}
            />
          ))}
        </Box>
        <Text dimColor>
          {armed
            ? `Listo: tu próximo mensaje se repartirá entre ${n} ${n === 1 ? 'agente' : 'agentes'}.`
            : 'Pulsa un número (o /dock N) y el siguiente mensaje se repartirá entre esos agentes.'}
        </Text>
        <Text> </Text>
        <Text>
          Tarjetas · {running} trabajando · {done} terminadas
        </Text>
        {list.length === 0 && <Text dimColor>Aún no hay agentes en esta sesión.</Text>}
        {list.map(card => (
          <Box key={card.id} flexDirection="column">
            <Text dimColor={card.status !== 'running'}>
              {GLYPH[card.status]} {card.description}
            </Text>
            <Text dimColor>
              {'   '}
              {card.type} · {WORD[card.status]} · {elapsed(card.startedAt, card.endedAt ?? now)}
            </Text>
          </Box>
        ))}
        <Box>
          <Button
            key="clear"
            label="Limpiar terminadas"
            hotkey="l"
            onPress={async () => {
              await update($, cards, list => list.filter(card => card.status === 'running'))
              $.ui.invalidate('ui.render')
            }}
          />
          <Text> </Text>
          <Button key="close" label="Cerrar" hotkey="c" onPress={() => $.ui.close({ id: PANE })} />
        </Box>
      </Box>
    )
  })
}
