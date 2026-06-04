import { Link } from 'react-router-dom'
import Collapsible from '@components/Collapsible/Collapsible'
import styles from './FirstAppPage.module.css'

export default function FirstAppPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.badge}>Session 2 · Module 7 · ~120 min</span>
        <h1>Calorie Counter for Cocktails and Beers</h1>
        <p className={styles.intro}>
          Your first real Go application. A CLI tool that tracks drinks and calculates calorie summaries.
          Built step by step using structs, slices, and functions.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Goal</h2>
        <p>
          Build a command-line program that lets a user add drinks (beers and cocktails),
          see a list of all drinks, and get a calorie summary including total, average,
          and the highest-calorie item.
        </p>
      </section>

      <section className={styles.section}>
        <h2>Data model</h2>
        <p>Model each drink with a simple struct:</p>
        <pre><code className="language-go">{`type Drink struct {
    Name     string
    Category string // "beer" or "cocktail"
    Calories int
}`}</code></pre>
        <p>Store all drinks in a slice:</p>
        <pre><code className="language-go">{`drinks := []Drink{}`}</code></pre>
      </section>

      <section className={styles.section}>
        <h2>Step-by-step implementation</h2>

        <div className={styles.step}>
          <div className={styles.stepNum}>01</div>
          <div className={styles.stepContent}>
            <h3>Create the project</h3>
            <pre><code className="language-bash">{`mkdir calorie-counter
cd calorie-counter
go mod init calorie-counter`}</code></pre>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNum}>02</div>
          <div className={styles.stepContent}>
            <h3>Define the Drink struct</h3>
            <p>In <code>main.go</code>, define your data model:</p>
            <pre><code className="language-go">{`package main

type Drink struct {
    Name     string
    Category string
    Calories int
}`}</code></pre>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNum}>03</div>
          <div className={styles.stepContent}>
            <h3>Implement addDrink</h3>
            <pre><code className="language-go">{`func addDrink(drinks []Drink, name, category string, calories int) []Drink {
    return append(drinks, Drink{
        Name:     name,
        Category: category,
        Calories: calories,
    })
}`}</code></pre>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNum}>04</div>
          <div className={styles.stepContent}>
            <h3>Implement listDrinks</h3>
            <pre><code className="language-go">{`func listDrinks(drinks []Drink) {
    fmt.Printf("%-20s %-10s %s\\n", "Name", "Category", "Calories")
    fmt.Println(strings.Repeat("-", 40))
    for _, d := range drinks {
        fmt.Printf("%-20s %-10s %d\\n", d.Name, d.Category, d.Calories)
    }
}`}</code></pre>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNum}>05</div>
          <div className={styles.stepContent}>
            <h3>Implement calorie summary</h3>
            <pre><code className="language-go">{`func summary(drinks []Drink) {
    if len(drinks) == 0 {
        fmt.Println("No drinks added yet.")
        return
    }
    total := 0
    max := drinks[0]
    for _, d := range drinks {
        total += d.Calories
        if d.Calories > max.Calories {
            max = d
        }
    }
    avg := total / len(drinks)
    fmt.Printf("Total: %d kcal\\n", total)
    fmt.Printf("Average: %d kcal\\n", avg)
    fmt.Printf("Highest: %s (%d kcal)\\n", max.Name, max.Calories)
}`}</code></pre>
          </div>
        </div>

        <div className={styles.step}>
          <div className={styles.stepNum}>06</div>
          <div className={styles.stepContent}>
            <h3>Wire up the CLI loop in main</h3>
            <pre><code className="language-go">{`func main() {
    drinks := []Drink{}
    reader := bufio.NewReader(os.Stdin)

    for {
        fmt.Println("\\n1) Add drink  2) List  3) Summary  4) Quit")
        fmt.Print("> ")
        input, _ := reader.ReadString('\\n')
        choice := strings.TrimSpace(input)

        switch choice {
        case "1":
            // prompt name, category, calories and call addDrink
        case "2":
            listDrinks(drinks)
        case "3":
            summary(drinks)
        case "4":
            return
        }
    }
}`}</code></pre>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2>Exercise</h2>
        <p>
          Extend the app with a <strong>category filter</strong>. Add a menu option that lets the user
          choose "beer" or "cocktail" and prints only drinks from that category.
        </p>

        <Collapsible label="Show Hint" variant="hint">
          <p>
            Write a function <code>filterByCategory(drinks []Drink, category string) []Drink</code>.
            Use a range loop over <code>drinks</code> and append matching items to a new slice.
            Pass the result to <code>listDrinks</code>.
          </p>
        </Collapsible>

        <Collapsible label="Show Solution" variant="solution">
          <pre><code className="language-go">{`func filterByCategory(drinks []Drink, category string) []Drink {
    result := []Drink{}
    for _, d := range drinks {
        if d.Category == category {
            result = append(result, d)
        }
    }
    return result
}`}</code></pre>
        </Collapsible>
      </section>

      <section className={styles.section}>
        <h2>Optional improvements</h2>
        <ul>
          <li>Save drinks to a JSON file with <code>json.Marshal</code> and <code>os.WriteFile</code></li>
          <li>Load drinks on startup if the JSON file exists</li>
          <li>Add preloaded sample drinks for testing</li>
          <li>Improve the CLI with better prompts and input validation</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Checkpoints</h2>
        <div className={styles.checkpoints}>
          <div className={styles.checkpoint}>Can you explain why a struct is useful here?</div>
          <div className={styles.checkpoint}>Can you explain why a slice is used instead of an array?</div>
          <div className={styles.checkpoint}>How would you save the drinks list to a file?</div>
        </div>
      </section>

      <div className={styles.nav}>
        <Link to="/lesson/idiomatic-go" className={styles.navLink}>← Back to Idiomatic Go</Link>
        <Link to="/lesson/next-steps" className={styles.navLink}>Next: Next steps →</Link>
      </div>
    </div>
  )
}
