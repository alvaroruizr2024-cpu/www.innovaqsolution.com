import { describe, expect, test } from 'claude-code/testing'

describe('register', () => {
  test('/simple on y /simple off encienden y apagan la vista limpia', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const turnedOn = await $.command.run({ command: 'simple', args: 'on', origin: { kind: 'composer' } })
    expect(turnedOn.text).toContain('activado')

    const turnedOff = await $.command.run({ command: 'simple', args: 'off', origin: { kind: 'composer' } })
    expect(turnedOff.text).toContain('desactivado')
  })

  test('/simple sin argumento alterna el estado', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const first = await $.command.run({ command: 'simple', args: '', origin: { kind: 'composer' } })
    expect(first.text).toContain('activado')

    const second = await $.command.run({ command: 'simple', args: '', origin: { kind: 'composer' } })
    expect(second.text).toContain('desactivado')
  })
})
