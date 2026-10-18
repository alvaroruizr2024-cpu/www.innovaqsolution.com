import { describe, expect, test } from 'claude-code/testing'

const PANE = {
  component: 'Pane' as const,
  requestId: 'clean-view',
  props: {
    title: 'Vista limpia',
    isFocused: true,
    bodyColumns: 80,
    placement: 'dock' as const,
    scroll: { offset: 0, bodyRows: 30 },
    view: {},
  },
}

describe('register', () => {
  test('/simple on y /simple off encienden y apagan la vista limpia', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))
    on('ui.open', () => ({ value: { isPlaced: true } }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const turnedOn = await $.command.run({ command: 'simple', args: 'on', origin: { kind: 'composer' } })
    expect(turnedOn.text).toContain('activado')

    const turnedOff = await $.command.run({ command: 'simple', args: 'off', origin: { kind: 'composer' } })
    expect(turnedOff.text).toContain('desactivado')
  })

  test('/simple sin argumento abre el dashboard', async ($, on) => {
    const opened: string[] = []
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))
    on('ui.open', ($, e) => {
      opened.push(e.id)

      return { value: { isPlaced: true } }
    })

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const ran = await $.command.run({ command: 'simple', args: '', origin: { kind: 'composer' } })
    expect(ran.text).toContain('Dashboard')
    expect(opened).toEqual(['clean-view'])
  })

  test('el dashboard dibuja el interruptor, los filtros y responde a v', async ($, on) => {
    on('session.start', ($, e) => ({ cwd: e.cwd }))
    on('command.register', ($, e) => ({ value: { command: e.name } }))
    on('ui.open', () => ({ value: { isPlaced: true } }))

    await $.session.start({ surface: 'terminal', isInteractive: true, cwd: '/work' })

    const ui = await $.ui.mount({ plugin: 'clean-view', surface: 'terminal', ...PANE })
    expect((await ui.find({ key: 'toggle' }))?.props.label).toBe('Desactivada')
    expect(await ui.find({ key: 'filter-error' })).toBeDefined()
    expect((await ui.find({ type: 'Text', text: /Aún no hay pasos/ }))).toBeDefined()

    await ui.press({ key: 'toggle' })
    expect((await ui.find({ key: 'toggle' }))?.props.label).toBe('Activada')

    await ui.press({ key: 'history' })
    expect(await ui.find({ type: 'Text', text: /Últimos turnos/ })).toBeDefined()
  })
})
