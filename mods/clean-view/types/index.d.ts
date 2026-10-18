export type StepStatus = 'running' | 'done' | 'error'

export type StepKind = 'read' | 'edit' | 'shell' | 'web' | 'agent' | 'plan' | 'other'

export type Filter = 'all' | 'running' | 'done' | 'error'

export type Step = {
  id: string
  tool: string
  kind: StepKind
  label: string
  detail: string
  status: StepStatus
  startedAt: number
  endedAt?: number
  error?: string
}

export type TurnSummary = {
  endedAt: number
  durationMs: number
  total: number
  done: number
  errors: number
  kinds: Record<StepKind, number>
}

declare module 'claude-code' {
  interface PluginState {
    'clean-view': {
      isOn: boolean
      steps: Step[]
      filter: Filter
      selectedId: string | null
      history: TurnSummary[]
      showHistory: boolean
      turnStartedAt: number
    }
  }
}
