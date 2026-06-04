import { markdownModules } from '../content/index'

function stripFrontmatter(raw: string): string {
  if (!raw.startsWith('---')) return raw
  const end = raw.indexOf('---', 3)
  return end === -1 ? raw : raw.slice(end + 3).trimStart()
}

export function useMarkdown(filename: string) {
  const raw = filename ? (markdownModules[filename] ?? '') : ''
  const content = stripFrontmatter(raw)
  const error = filename && !markdownModules[filename] ? new Error(`Module not found: ${filename}`) : null

  return { content, loading: false, error }
}
