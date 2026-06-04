import { useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getModuleById, getAdjacentModules } from '@data/curriculum'
import { useMarkdown } from '@hooks/useMarkdown'
import { useProgress } from '@hooks/useProgress'
import CodeBlock from '@components/CodeBlock/CodeBlock'
import Collapsible from '@components/Collapsible/Collapsible'
import LessonNav from '@components/LessonNav/LessonNav'
import type { ModuleId } from '../../types/curriculum'
import styles from './LessonPage.module.css'

function parseSections(content: string) {
  const hintRegex = /^## Hint\n([\s\S]*?)(?=^## |\s*$)/m
  const solutionRegex = /^## Solution\n([\s\S]*?)(?=^## |\s*$)/m

  const hintMatch = content.match(hintRegex)
  const solutionMatch = content.match(solutionRegex)

  let main = content
  if (hintMatch) main = main.replace(hintMatch[0], '')
  if (solutionMatch) main = main.replace(solutionMatch[0], '')

  return {
    main: main.trim(),
    hint: hintMatch?.[1]?.trim() ?? '',
    solution: solutionMatch?.[1]?.trim() ?? '',
  }
}

export default function LessonPage() {
  const { moduleId } = useParams<{ moduleId: string }>()
  const module = moduleId ? getModuleById(moduleId) : null
  const { content, loading, error } = useMarkdown(module?.filename ?? '')
  const { markVisited } = useProgress()

  useEffect(() => {
    if (module) {
      markVisited(module.id as ModuleId)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [module, markVisited])

  if (!module) {
    return <Navigate to="/" replace />
  }

  const { prev, next } = getAdjacentModules(module.id)
  const { main, hint, solution } = parseSections(content)

  return (
    <div className={styles.page}>
      <aside className={styles.meta}>
        <span className={styles.session}>{module.session === 'session-1' ? 'Session 1' : 'Session 2'}</span>
        <span className={styles.time}>~{module.estimatedMinutes} min</span>
        <span className={styles.moduleNum}>Module {module.order} of 8</span>
      </aside>

      <h1 className={styles.title}>{module.title}</h1>

      <section className={styles.objectives}>
        <h2 className={styles.objectivesTitle}>Objectives</h2>
        <ul>
          {module.objectives.map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </section>

      {loading && <div className={styles.loading}>Loading content...</div>}
      {error && <div className={styles.error}>Failed to load lesson content.</div>}

      {!loading && !error && (
        <div className={styles.content}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
            components={{
              code: CodeBlock as React.ComponentType<React.ComponentProps<'code'>>,
            }}
          >
            {main}
          </ReactMarkdown>

          {hint && (
            <Collapsible label="Show Hint" variant="hint">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: CodeBlock as React.ComponentType<React.ComponentProps<'code'>>,
                }}
              >
                {hint}
              </ReactMarkdown>
            </Collapsible>
          )}

          {solution && (
            <Collapsible label="Show Solution" variant="solution">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={{
                  code: CodeBlock as React.ComponentType<React.ComponentProps<'code'>>,
                }}
              >
                {solution}
              </ReactMarkdown>
            </Collapsible>
          )}
        </div>
      )}

      <LessonNav prev={prev} next={next} />
    </div>
  )
}
