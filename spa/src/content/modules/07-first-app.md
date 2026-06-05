---
id: first-app
title: First working app
session: session-2
estimated_minutes: 145
objectives:
  - Design and build a small CLI application
  - Model data with structs and slices
  - Optionally persist data with JSON
  - Write basic tests with go test
---

# First working app

## Summary

Welcome to **EduCamp 2026 — Mallorca edition**. You are here to learn Go. There is also an open bar, which is less great for your calorie balance.

Your first real Go app solves an actual problem you are about to have: by the end of the week you need to know how much damage you did and how many kilometres to run on the beach to offset it.

You are going to build the **Open Bar Damage Tracker** — a CLI that logs every cocktail and beer from the evening, totals the calories, and tells you exactly how much running awaits you the next morning. Practical. Necessary.

### Project setup

```bash
mkdir open-bar-tracker
cd open-bar-tracker
go mod init open-bar-tracker
```

### The data model

```go
type Drink struct {
    Name     string
    Category string // "beer" or "cocktail"
    Calories int
}
```

Store drinks in a slice:

```go
drinks := []Drink{}
```

### Core functions

**Add a drink:**

```go
func addDrink(drinks []Drink, name, category string, calories int) []Drink {
    return append(drinks, Drink{
        Name:     name,
        Category: category,
        Calories: calories,
    })
}
```

**List all drinks:**

```go
import (
    "fmt"
    "strings"
)

func listDrinks(drinks []Drink) {
    if len(drinks) == 0 {
        fmt.Println("No drinks added yet.")
        return
    }
    fmt.Printf("\n%-20s %-12s %s\n", "Name", "Category", "Calories")
    fmt.Println(strings.Repeat("-", 42))
    for _, d := range drinks {
        fmt.Printf("%-20s %-12s %d\n", d.Name, d.Category, d.Calories)
    }
}
```

**Calorie summary:**

```go
func summary(drinks []Drink) {
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
    kmToRun := float64(total) / 65.0 // ~65 kcal burned per km at average pace
    fmt.Printf("\n--- Damage Report ---\n")
    fmt.Printf("Total:         %d kcal\n", total)
    fmt.Printf("Average/drink: %d kcal\n", avg)
    fmt.Printf("Worst offender: %s (%d kcal)\n", highest.Name, highest.Calories)
    fmt.Printf("To burn it off: %.1f km of running\n", kmToRun)
    fmt.Printf("Good luck tomorrow morning.\n")
}
```

### The CLI loop

```go
import (
    "bufio"
    "fmt"
    "os"
    "strconv"
    "strings"
)

func readLine(reader *bufio.Reader, prompt string) string {
    fmt.Print(prompt)
    line, _ := reader.ReadString('\n')
    return strings.TrimSpace(line)
}

func main() {
    drinks := []Drink{}
    reader := bufio.NewReader(os.Stdin)

    fmt.Println("EduCamp 2026 — Mallorca")
    fmt.Println("Track your open bar consumption. No judgement.")

    for {
        fmt.Println("\n=== Open Bar Damage Tracker ===")
        fmt.Println("1) Log a drink")
        fmt.Println("2) Show tonight's list")
        fmt.Println("3) Damage report")
        fmt.Println("4) I'm done (and scared)")
        fmt.Print("\nChoice: ")

        choice, _ := reader.ReadString('\n')
        choice = strings.TrimSpace(choice)

        switch choice {
        case "1":
            name := readLine(reader, "Drink name: ")
            category := readLine(reader, "Category (beer/cocktail): ")
            calStr := readLine(reader, "Calories: ")
            cal, err := strconv.Atoi(calStr)
            if err != nil {
                fmt.Println("Invalid calorie value.")
                continue
            }
            drinks = addDrink(drinks, name, category, cal)
            fmt.Println("Logged. The beach run gets longer.")
        case "2":
            listDrinks(drinks)
        case "3":
            summary(drinks)
        case "4":
            fmt.Println("See you at 6am on the beach.")
            return
        default:
            fmt.Println("Unknown choice.")
        }
    }
}
```

### Optional: JSON persistence

Save to file:

```go
import "encoding/json"

func saveToFile(drinks []Drink, path string) error {
    data, err := json.MarshalIndent(drinks, "", "  ")
    if err != nil {
        return fmt.Errorf("marshal: %w", err)
    }
    return os.WriteFile(path, data, 0644)
}
```

Load from file:

```go
func loadFromFile(path string) ([]Drink, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        if errors.Is(err, os.ErrNotExist) {
            return []Drink{}, nil  // no file yet — start fresh
        }
        return nil, fmt.Errorf("read file: %w", err)
    }
    var drinks []Drink
    if err := json.Unmarshal(data, &drinks); err != nil {
        return nil, fmt.Errorf("unmarshal: %w", err)
    }
    return drinks, nil
}
```

Call `loadFromFile` at startup and `saveToFile` after each add.

A quick reference for common open-bar items:

| Drink | Category | Approx. kcal |
|-------|----------|-------------|
| Aperol Spritz | cocktail | 160 |
| Mojito | cocktail | 180 |
| Negroni | cocktail | 200 |
| Gin Tonic | cocktail | 140 |
| Margarita | cocktail | 220 |
| Piña Colada | cocktail | 280 |
| Estrella Damm | beer | 145 |
| IPA | beer | 190 |

## Exercise

Add a **category filter** to the app: let the user choose "beer" or "cocktail" from the menu and show only drinks in that category.

## Hint

Write a helper function `filterByCategory(drinks []Drink, category string) []Drink` that returns a new slice containing only matching drinks. Then add a menu option that calls this function and passes the result to `listDrinks`.

## Solution

```go
func filterByCategory(drinks []Drink, category string) []Drink {
    result := []Drink{}
    for _, d := range drinks {
        if strings.EqualFold(d.Category, category) {
            result = append(result, d)
        }
    }
    return result
}
```

Add to the switch in `main`:

```go
case "5":
    cat := readLine(reader, "Filter by category (beer/cocktail): ")
    filtered := filterByCategory(drinks, cat)
    listDrinks(filtered)
```

Using `strings.EqualFold` makes the comparison case-insensitive.

### Optional: Testing the app

Go has a built-in test runner — no external libraries needed. Create a file ending in `_test.go` in the same package:

```text
go test ./...
      ↓
[ compile package + _test.go ]
      ↓
[ run each func TestXxx(t *testing.T) ]
      ↓
  t.Errorf() / t.Fatalf()  →  FAIL
  (no error called)        →  PASS
```

Create `calorie_counter_test.go` alongside `main.go`:

```go
package main

import "testing"

func TestAddDrink(t *testing.T) {
    drinks := []Drink{}
    drinks = addDrink(drinks, "Aperol Spritz", "cocktail", 160)

    if len(drinks) != 1 {
        t.Errorf("expected 1 drink, got %d", len(drinks))
    }
    if drinks[0].Name != "Aperol Spritz" {
        t.Errorf("expected Aperol Spritz, got %s", drinks[0].Name)
    }
    if drinks[0].Calories != 160 {
        t.Errorf("expected 160 kcal, got %d", drinks[0].Calories)
    }
}

func TestFilterByCategory(t *testing.T) {
    drinks := []Drink{
        {Name: "Estrella Damm", Category: "beer", Calories: 145},
        {Name: "Mojito", Category: "cocktail", Calories: 180},
        {Name: "IPA", Category: "beer", Calories: 190},
    }

    beers := filterByCategory(drinks, "beer")
    if len(beers) != 2 {
        t.Errorf("expected 2 beers, got %d", len(beers))
    }

    cocktails := filterByCategory(drinks, "cocktail")
    if len(cocktails) != 1 {
        t.Errorf("expected 1 cocktail, got %d", len(cocktails))
    }
}
```

Run the tests:

```bash
go test ./...
# ok  calorie-counter  0.002s

go test -v ./...   # verbose: shows each test name
```

`t.Errorf` marks the test as failed but continues running. `t.Fatalf` stops the current test immediately — use it when continuing would cause a panic (e.g., before dereferencing a pointer that might be nil).

## References

- [encoding/json package](https://pkg.go.dev/encoding/json)
- [bufio package](https://pkg.go.dev/bufio)
- [os package](https://pkg.go.dev/os)
- [Go by Example — JSON](https://gobyexample.com/json)
- [Go by Example — Reading Files](https://gobyexample.com/reading-files)
- [Go by Example — Testing](https://gobyexample.com/testing)
- [testing package](https://pkg.go.dev/testing)
