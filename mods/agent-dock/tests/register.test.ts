import { describe, expect, test } from 'claude-code/testing'

describe('register', () => {
  test('/dock 5 arma el siguiente encargo para cinco agentes', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))
    on('ui.open', () => ({ value: { isPlaced: true } }))
    on('prompt.submit', ($, e) => ({ text: e.text, context: e.context }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const ran = await $.command.run({ command: 'dock', args: '5', origin: { kind: 'composer' } })
    expect(ran.text).toContain('5 agentes')

    const entered = await $.prompt.submit({ text: 'prepara la apertura del estudio', wait: false, origin: { kind: 'composer' } })
    expect(entered.drop).toBeUndefined()
    expect(entered.context?.[0]).toContain('5 subagentes')

    // Se aplica una sola vez: el siguiente prompt va limpio.
    const again = await $.prompt.submit({ text: 'gracias', wait: false, origin: { kind: 'composer' } })
    expect(again.context ?? []).toHaveLength(0)
  })

  test('/dock sin número solo abre el panel y no toca el siguiente prompt', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))
    on('ui.open', () => ({ value: { isPlaced: true } }))
    on('prompt.submit', ($, e) => ({ text: e.text, context: e.context }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const ran = await $.command.run({ command: 'dock', args: '', origin: { kind: 'composer' } })
    expect(ran.text).toContain('abierto')

    const entered = await $.prompt.submit({ text: 'hola', wait: false, origin: { kind: 'composer' } })
    expect(entered.context ?? []).toHaveLength(0)
  })
})
