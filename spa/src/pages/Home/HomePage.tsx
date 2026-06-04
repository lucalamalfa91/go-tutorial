import { Link } from 'react-router-dom'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <div className={styles.page}>
      <header className={styles.hero}>
        <div className={styles.badge}>Go self-learning path</div>
        <h1 className={styles.title}>From zero to first app</h1>
        <p className={styles.subtitle}>
          A structured, self-paced introduction to Go for developers with general programming experience.
          No prior Go knowledge required.
        </p>
        <div className={styles.cta}>
          <Link to="/roadmap" className={styles.btnPrimary}>View roadmap →</Link>
          <Link to="/lesson/introduction" className={styles.btnSecondary}>Start learning</Link>
        </div>
      </header>

      <section className={styles.section}>
        <h2>What you will learn</h2>
        <div className={styles.grid}>
          <div className={styles.card}>
            <span className={styles.cardIcon}>⚙</span>
            <h3>Go fundamentals</h3>
            <p>Variables, types, functions, control flow, and the basic structure of a Go program.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🗂</span>
            <h3>Core data structures</h3>
            <p>Arrays, slices, maps, and structs — the building blocks you will use in every Go program.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🔧</span>
            <h3>Idiomatic Go</h3>
            <p>Formatting, naming conventions, simple error handling, and the standard library mindset.</p>
          </div>
          <div className={styles.card}>
            <span className={styles.cardIcon}>🚀</span>
            <h3>First working app</h3>
            <p>Build a real CLI application: a calorie counter for cocktails and beers.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Course structure</h2>
        <div className={styles.sessions}>
          <div className={styles.session}>
            <div className={styles.sessionNum}>Session 1</div>
            <div className={styles.sessionContent}>
              <h3>Go foundations</h3>
              <p className={styles.sessionTime}>~5 hours</p>
              <ul>
                <li>Introduction to Go</li>
                <li>Environment setup</li>
                <li>Hello World and modules</li>
                <li>Basic syntax</li>
                <li>Arrays, slices, maps, and structs</li>
              </ul>
            </div>
          </div>
          <div className={styles.sessionDivider}>→</div>
          <div className={styles.session}>
            <div className={styles.sessionNum}>Session 2</div>
            <div className={styles.sessionContent}>
              <h3>First app</h3>
              <p className={styles.sessionTime}>~5 hours</p>
              <ul>
                <li>Writing Go in a Go way</li>
                <li>Build the first app</li>
                <li>Next steps and resources</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Prerequisites</h2>
        <div className={styles.prereqs}>
          <div className={styles.prereqItem}>
            <span className={styles.check}>✓</span>
            <span>Basic programming experience in any language</span>
          </div>
          <div className={styles.prereqItem}>
            <span className={styles.check}>✓</span>
            <span>Familiarity with a terminal / command line</span>
          </div>
          <div className={styles.prereqItem}>
            <span className={styles.check}>✓</span>
            <span>A code editor (VS Code recommended)</span>
          </div>
          <div className={styles.prereqItem}>
            <span className={styles.notReq}>✗</span>
            <span>No prior Go knowledge required</span>
          </div>
        </div>
      </section>
    </div>
  )
}
