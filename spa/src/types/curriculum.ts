export type SessionId = 'session-1' | 'session-2'

export type ModuleId =
  | 'introduction'
  | 'setup'
  | 'hello-world'
  | 'basic-syntax'
  | 'data-structures'
  | 'idiomatic-go'
  | 'first-app'
  | 'next-steps'

export interface Session {
  id: SessionId
  title: string
  targetHours: number
}

export interface ModuleMeta {
  id: ModuleId
  order: number
  session: SessionId
  title: string
  estimatedMinutes: number
  objectives: string[]
  prerequisites: ModuleId[]
  filename: string
}

export interface Curriculum {
  course: {
    id: string
    title: string
    level: 'beginner' | 'intermediate' | 'advanced'
    format: 'self-paced'
    delivery: 'spa'
  }
  sessions: Session[]
  modules: ModuleMeta[]
}

export interface SessionGroup {
  session: Session
  modules: ModuleMeta[]
}
