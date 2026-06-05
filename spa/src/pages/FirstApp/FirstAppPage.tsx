import { Link } from 'react-router-dom'
import Collapsible from '@components/Collapsible/Collapsible'
import styles from './FirstAppPage.module.css'

export default function FirstAppPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <span className={styles.badge}>Session 2 · Module 7 · ~145 min</span>
        <h1>Open Bar Damage Tracker</h1>
        <p className={styles.intro}>
          EduCamp 2026 — Mallorca edition. You are here to learn Go. There is also an open bar,
          which is less great for your calorie balance. This CLI tracks every drink from the evening
          and tells you exactly how many kilometres to run on the beach the next morning.
        </p>
      </header>

      <section className={styles.section}>
        <h2>Goal</h2>
        <p>
          Build a command-line program that logs cocktails and beers, shows the full drink list,
          and produces a damage report: total calories, average per drink, worst offender,
          and kilometres of running needed to burn it all off.
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
            <pre><code className="language-bash">{`mkdir open-bar-tracker
cd open-bar-tracker
go mod init open-bar-tracker`}</code></pre>
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
            <h3>Implement the damage report</h3>
            <pre><code className="language-go">{`func summary(drinks []Drink) {
    if len(drinks) == 0 {
        fmt.Println("Nothing logged yet. The night is young.")
        return
    }
    total := 0
    highest := drinks[0]
    for _, d := range drinks {
        total += d.Calories
        if d.Calories > highest.Calories {
            highest = d
        }
    }
    avg := total / len(drinks)
    kmToRun := float64(total) / 65.0 // ~65 kcal per km
    fmt.Printf("\\n--- Damage Report ---\\n")
    fmt.Printf("Total:          %d kcal\\n", total)
    fmt.Printf("Average/drink:  %d kcal\\n", avg)
    fmt.Printf("Worst offender: %s (%d kcal)\\n", highest.Name, highest.Calories)
    fmt.Printf("To burn it off: %.1f km of running\\n", kmToRun)
    fmt.Printf("Good luck tomorrow morning.\\n")
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

    fmt.Println("EduCamp 2026 — Mallorca")
    fmt.Println("Track your open bar consumption. No judgement.")

    for {
        fmt.Println("\\n=== Open Bar Damage Tracker ===")
        fmt.Println("1) Log a drink")
        fmt.Println("2) Show tonight's list")
        fmt.Println("3) Damage report")
        fmt.Println("4) I'm done (and scared)")
        fmt.Print("\\nChoice: ")
        input, _ := reader.ReadString('\\n')
        choice := strings.TrimSpace(input)

        switch choice {
        case "1":
            // prompt name, category, calories and call addDrink
            fmt.Println("Logged. The beach run gets longer.")
        case "2":
            listDrinks(drinks)
        case "3":
            summary(drinks)
        case "4":
            fmt.Println("See you at 6am on the beach.")
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
        <h2>Open bar reference</h2>
        <p>Common calories to enter when testing the app at the actual bar:</p>
        <table>
          <thead>
            <tr><th>Drink</th><th>Category</th><th>Approx. kcal</th></tr>
          </thead>
          <tbody>
            <tr><td>Aperol Spritz</td><td>cocktail</td><td>160</td></tr>
            <tr><td>Mojito</td><td>cocktail</td><td>180</td></tr>
            <tr><td>Negroni</td><td>cocktail</td><td>200</td></tr>
            <tr><td>Gin Tonic</td><td>cocktail</td><td>140</td></tr>
            <tr><td>Margarita</td><td>cocktail</td><td>220</td></tr>
            <tr><td>Piña Colada</td><td>cocktail</td><td>280</td></tr>
            <tr><td>Estrella Damm</td><td>beer</td><td>145</td></tr>
            <tr><td>IPA</td><td>beer</td><td>190</td></tr>
          </tbody>
        </table>
      </section>

      <section className={styles.section}>
        <h2>Optional improvements</h2>
        <ul>
          <li>Save drinks to a JSON file with <code>json.Marshal</code> and <code>os.WriteFile</code></li>
          <li>Load drinks on startup if the JSON file exists</li>
          <li>Write tests for <code>addDrink</code> and <code>filterByCategory</code> with <code>go test</code></li>
          <li>Improve input validation — what if the user types letters for calories?</li>
        </ul>
      </section>

      <section className={styles.section}>
        <h2>Checkpoints</h2>
        <div className={styles.checkpoints}>
          <div className={styles.checkpoint}>Can you explain why a struct is useful here?</div>
          <div className={styles.checkpoint}>Can you explain why a slice is used instead of an array?</div>
          <div className={styles.checkpoint}>After 4 Negronis, how many km does the tracker tell you to run?</div>
        </div>
      </section>

      <div className={styles.nav}>
        <Link to="/lesson/idiomatic-go" className={styles.navLink}>← Back to Idiomatic Go</Link>
        <Link to="/lesson/next-steps" className={styles.navLink}>Next: Next steps →</Link>
      </div>
    </div>
  )
}
