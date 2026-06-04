import { Link } from 'react-router-dom'
import type { ModuleMeta } from '../../types/curriculum'
import styles from './RoadmapCard.module.css'

interface RoadmapCardProps {
  module: ModuleMeta
  isVisited?: boolean
}

export default function RoadmapCard({ module, isVisited = false }: RoadmapCardProps) {
  return (
    <Link
      to={`/lesson/${module.id}`}
      className={`${styles.card} ${isVisited ? styles.visited : ''}`}
      aria-label={`Go to lesson: ${module.title}`}
    >
      <div className={styles.order}>{String(module.order).padStart(2, '0')}</div>
      <div className={styles.content}>
        <h3 className={styles.title}>{module.title}</h3>
        <ul className={styles.objectives}>
          {module.objectives.slice(0, 2).map((obj) => (
            <li key={obj}>{obj}</li>
          ))}
        </ul>
      </div>
      <div className={styles.meta}>
        <span className={styles.time}>~{module.estimatedMinutes} min</span>
        {isVisited && <span className={styles.done}>✓</span>}
      </div>
    </Link>
  )
}
