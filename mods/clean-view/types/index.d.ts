export type StepStatus = 'running' | 'done' | 'error'

export type Step = {
  id: string
  tool: string
  label: string
  status: StepStatus
}

declare module 'claude-code' {
  interface PluginState {
    'clean-view': {
      isOn: boolean
      steps: Step[]
    }
  }
}
