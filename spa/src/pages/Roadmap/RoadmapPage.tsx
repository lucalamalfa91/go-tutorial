import { getSessionGroups } from '@data/curriculum'
import { useProgress } from '@hooks/useProgress'
import RoadmapCard from '@components/RoadmapCard/RoadmapCard'
import styles from './RoadmapPage.module.css'

export default function RoadmapPage() {
  const sessionGroups = getSessionGroups()
  const { isVisited } = useProgress()

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Learning roadmap</h1>
        <p className={styles.intro}>
          8 modules across 2 sessions. Work through them in order — each module builds on the previous.
          Click any module to open its lesson.
        </p>
      </header>

      {sessionGroups.map(({ session, modules }) => (
        <section key={session.id} className={styles.session}>
          <div className={styles.sessionHeader}>
            <h2 className={styles.sessionTitle}>{session.title}</h2>
            <span className={styles.sessionHours}>{session.targetHours}h target</span>
          </div>
          <div className={styles.modules}>
            {modules.map((mod) => (
              <RoadmapCard
                key={mod.id}
                module={mod}
                isVisited={isVisited(mod.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
