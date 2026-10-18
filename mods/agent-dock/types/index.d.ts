export type CardStatus = 'running' | 'done' | 'failed'

export type AgentCard = {
  id: string
  description: string
  type: string
  status: CardStatus
  startedAt: number
  endedAt?: number
}

declare module 'claude-code' {
  interface PluginState {
    'agent-dock': {
      crew: number
      isArmed: boolean
      cards: AgentCard[]
    }
  }
}
