import type { Curriculum, ModuleId } from '../types/curriculum'

export const curriculum: Curriculum = {
  course: {
    id: 'go-self-learning-path',
    title: 'Go — from zero to first app',
    level: 'beginner',
    format: 'self-paced',
    delivery: 'spa',
  },
  sessions: [
    { id: 'session-1', title: 'Go foundations', targetHours: 5 },
    { id: 'session-2', title: 'First app', targetHours: 5 },
  ],
  modules: [
    {
      id: 'introduction',
      order: 1,
      session: 'session-1',
      title: 'Introduction to Go',
      estimatedMinutes: 45,
      objectives: [
        'Understand what Go is and why it exists',
        'Learn Go common use cases',
        'Get an overview of the learning path',
      ],
      prerequisites: [],
      filename: '01-introduction.md',
    },
    {
      id: 'setup',
      order: 2,
      session: 'session-1',
      title: 'Environment setup',
      estimatedMinutes: 45,
      objectives: [
        'Install Go on your machine',
        'Verify the installation with go version',
        'Set up your editor and terminal',
      ],
      prerequisites: ['introduction'],
      filename: '02-setup.md',
    },
    {
      id: 'hello-world',
      order: 3,
      session: 'session-1',
      title: 'Hello World and modules',
      estimatedMinutes: 45,
      objectives: [
        'Create a first Go project',
        'Initialize a Go module with go mod init',
        'Run a Go program with go run',
      ],
      prerequisites: ['setup'],
      filename: '03-hello-world.md',
    },
    {
      id: 'basic-syntax',
      order: 4,
      session: 'session-1',
      title: 'Basic syntax',
      estimatedMinutes: 95,
      objectives: [
        'Declare variables, constants, and basic types',
        'Write functions with multiple return values',
        'Use if, for, switch, and defer',
        'Understand pointers and when to use them',
      ],
      prerequisites: ['hello-world'],
      filename: '04-basic-syntax.md',
    },
    {
      id: 'data-structures',
      order: 5,
      session: 'session-1',
      title: 'Arrays, slices, maps, and structs',
      estimatedMinutes: 60,
      objectives: [
        'Understand arrays and slices and how they differ',
        'Use maps for key-value storage',
        'Model data with structs',
      ],
      prerequisites: ['basic-syntax'],
      filename: '05-data-structures.md',
    },
    {
      id: 'idiomatic-go',
      order: 6,
      session: 'session-2',
      title: 'Writing Go in a Go way',
      estimatedMinutes: 85,
      objectives: [
        'Use gofmt and understand Go formatting conventions',
        'Handle errors idiomatically',
        'Apply basic Go naming conventions',
        'Define and satisfy interfaces implicitly',
      ],
      prerequisites: ['data-structures'],
      filename: '06-idiomatic-go.md',
    },
    {
      id: 'first-app',
      order: 7,
      session: 'session-2',
      title: 'First working app',
      estimatedMinutes: 145,
      objectives: [
        'Design and build a small CLI application',
        'Model data with structs and slices',
        'Optionally persist data with JSON',
        'Write basic tests with go test',
      ],
      prerequisites: ['idiomatic-go'],
      filename: '07-first-app.md',
    },
    {
      id: 'next-steps',
      order: 8,
      session: 'session-2',
      title: 'Next steps',
      estimatedMinutes: 30,
      objectives: [
        'Identify the best official resources for further learning',
        'Know what to study next after this path',
      ],
      prerequisites: ['first-app'],
      filename: '08-next-steps.md',
    },
  ],
}

export function getModuleById(id: string) {
  return curriculum.modules.find((m) => m.id === id) ?? null
}

export function getAdjacentModules(id: ModuleId) {
  const idx = curriculum.modules.findIndex((m) => m.id === id)
  return {
    prev: idx > 0 ? curriculum.modules[idx - 1] : null,
    next: idx < curriculum.modules.length - 1 ? curriculum.modules[idx + 1] : null,
  }
}

export function getSessionGroups() {
  return curriculum.sessions.map((session) => ({
    session,
    modules: curriculum.modules.filter((m) => m.session === session.id),
  }))
}
