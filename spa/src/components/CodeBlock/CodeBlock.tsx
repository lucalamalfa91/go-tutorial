import { useRef, useState } from 'react'
import type { ClassAttributes, HTMLAttributes } from 'react'
import type { ExtraProps } from 'react-markdown'
import styles from './CodeBlock.module.css'

type CodeBlockProps = ClassAttributes<HTMLElement> &
  HTMLAttributes<HTMLElement> &
  ExtraProps

export default function CodeBlock({ className, children, node, ...props }: CodeBlockProps) {
  const isInline = !className
  const preRef = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)

  if (isInline) {
    return (
      <code className={className} {...props}>
        {children}
      </code>
    )
  }

  const handleCopy = async () => {
    const text = preRef.current?.querySelector('code')?.innerText ?? ''
    try {
      await navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      // Clipboard API unavailable
    }
  }

  return (
    <div className={styles.wrapper} ref={preRef}>
      <button
        className={styles.copyBtn}
        onClick={handleCopy}
        type="button"
        aria-label="Copy code"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
      <code className={`${className ?? ''} ${styles.code}`} {...props}>
        {children}
      </code>
    </div>
  )
}
