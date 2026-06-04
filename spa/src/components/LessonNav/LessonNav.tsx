import { Link } from 'react-router-dom'
import type { ModuleMeta } from '../../types/curriculum'
import styles from './LessonNav.module.css'

interface LessonNavProps {
  prev: ModuleMeta | null
  next: ModuleMeta | null
}

export default function LessonNav({ prev, next }: LessonNavProps) {
  return (
    <nav className={styles.nav} aria-label="Lesson navigation">
      <div className={styles.side}>
        {prev && (
          <Link to={`/lesson/${prev.id}`} className={`${styles.btn} ${styles.prevBtn}`}>
            <span className={styles.arrow}>←</span>
            <span className={styles.label}>
              <span className={styles.dir}>Previous</span>
              <span className={styles.title}>{prev.title}</span>
            </span>
          </Link>
        )}
      </div>
      <div className={`${styles.side} ${styles.right}`}>
        {next && (
          <Link to={`/lesson/${next.id}`} className={`${styles.btn} ${styles.nextBtn}`}>
            <span className={styles.label}>
              <span className={styles.dir}>Next</span>
              <span className={styles.title}>{next.title}</span>
            </span>
            <span className={styles.arrow}>→</span>
          </Link>
        )}
      </div>
    </nav>
  )
}
