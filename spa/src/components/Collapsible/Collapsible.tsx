import { useState } from 'react'
import styles from './Collapsible.module.css'

interface CollapsibleProps {
  label: string
  variant?: 'hint' | 'solution'
  children: React.ReactNode
}

export default function Collapsible({ label, variant = 'hint', children }: CollapsibleProps) {
  const [isOpen, setIsOpen] = useState(false)
  const contentId = `collapsible-${label.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div className={styles.wrapper} data-variant={variant}>
      <button
        className={styles.toggle}
        onClick={() => setIsOpen((v) => !v)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        type="button"
      >
        <span className={styles.toggleIcon}>{isOpen ? '▼' : '▶'}</span>
        {label}
      </button>
      <div
        id={contentId}
        className={`${styles.content} ${isOpen ? styles.open : ''}`}
        aria-hidden={!isOpen}
      >
        <div className={styles.inner}>{children}</div>
      </div>
    </div>
  )
}
