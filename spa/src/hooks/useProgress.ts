import { useState, useCallback } from 'react'
import type { ModuleId } from '../types/curriculum'

const STORAGE_KEY = 'go-tutorial-progress'

function loadProgress(): Set<ModuleId> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return new Set()
    const arr = JSON.parse(raw) as ModuleId[]
    return new Set(arr)
  } catch {
    return new Set()
  }
}

function saveProgress(visited: Set<ModuleId>) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...visited]))
  } catch {
    // localStorage unavailable — ignore silently
  }
}

export function useProgress() {
  const [visited, setVisited] = useState<Set<ModuleId>>(() => loadProgress())

  const markVisited = useCallback((id: ModuleId) => {
    setVisited((prev) => {
      const next = new Set(prev)
      next.add(id)
      saveProgress(next)
      return next
    })
  }, [])

  const isVisited = useCallback((id: ModuleId) => visited.has(id), [visited])

  return { visited, markVisited, isVisited }
}
