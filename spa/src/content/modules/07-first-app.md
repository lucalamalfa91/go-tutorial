---
id: first-app
title: First working app
session: session-2
estimated_minutes: 120
objectives:
  - Design and build a small CLI application
  - Model data with structs and slices
  - Optionally persist data with JSON
---

# First working app

## Summary

You are going to build a **Calorie Counter for Cocktails and Beers** — a CLI app that lets you track drinks and get a calorie summary.

### Project setup

```bash
mkdir calorie-counter
cd calorie-counter
go mod init calorie-counter
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
        fmt.Println("No drinks to summarise.")
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
    fmt.Printf("\nTotal:   %d kcal\n", total)
    fmt.Printf("Average: %d kcal\n", avg)
    fmt.Printf("Highest: %s (%d kcal)\n", highest.Name, highest.Calories)
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

    for {
        fmt.Println("\n=== Calorie Counter ===")
        fmt.Println("1) Add drink")
        fmt.Println("2) List drinks")
        fmt.Println("3) Summary")
        fmt.Println("4) Quit")
        fmt.Print("\nChoice: ")

        choice, _ := reader.ReadString('\n')
        choice = strings.TrimSpace(choice)

        switch choice {
        case "1":
            name := readLine(reader, "Name: ")
            category := readLine(reader, "Category (beer/cocktail): ")
            calStr := readLine(reader, "Calories: ")
            cal, err := strconv.Atoi(calStr)
            if err != nil {
                fmt.Println("Invalid calorie value.")
                continue
            }
            drinks = addDrink(drinks, name, category, cal)
            fmt.Println("Drink added.")
        case "2":
            listDrinks(drinks)
        case "3":
            summary(drinks)
        case "4":
            fmt.Println("Bye!")
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

## References

- [encoding/json package](https://pkg.go.dev/encoding/json)
- [bufio package](https://pkg.go.dev/bufio)
- [os package](https://pkg.go.dev/os)
- [Go by Example — JSON](https://gobyexample.com/json)
- [Go by Example — Reading Files](https://gobyexample.com/reading-files)
