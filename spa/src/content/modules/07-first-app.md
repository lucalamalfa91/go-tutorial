---
id: first-app
title: First working app
session: session-2
estimated_minutes: 120
objectives:
  - Design and build a small CLI application
  - Model data with structs and slices
  - Write basic tests with go test
---

# First working app

## Summary

It is EduCamp 2026 in Mallorca. There is an open bar. By the end of the week you need to know how much damage you did and how many kilometres to run on the beach to offset it.

You are building the **Open Bar Damage Tracker** — a CLI that logs drinks, totals the calories, and tells you exactly how much running awaits you the next morning.

### Why a struct?

Each drink has multiple related fields. A struct keeps them together as a single unit:

```go
type Drink struct {
    Name     string
    Category string // "beer" or "cocktail"
    Calories int
}
```

A plain variable can hold one value. A struct holds a *record* — the name, category, and calories of one drink as a coherent whole. If you add a field later (say, `ABV float64`), you change it in one place.

### Why a slice?

You don't know in advance how many drinks the evening will produce. A slice grows dynamically with `append` — unlike an array, its length is not fixed at compile time:

```go
drinks := []Drink{}
drinks = addDrink(drinks, "Aperol Spritz", "cocktail", 160)
drinks = addDrink(drinks, "Estrella Damm", "beer", 145)
```

Each call to `addDrink` returns a new slice with the item appended. The caller is responsible for capturing the return value — a common Go pattern.

### Key design decisions

- **Functions return the updated slice** — `addDrink(drinks, ...) []Drink` instead of mutating a global. Easier to test, no hidden state.
- **Error handling at the boundary** — validate user input (calories as a number) at the CLI layer, not inside `addDrink`. Core functions stay simple.
- **`float64` for the km calculation** — integer division would truncate. Cast total to `float64` before dividing: `float64(total) / 65.0`.

### Step-by-step implementation guide

The lesson covers the concepts. For the numbered step-by-step guide — with collapsible hints, the full CLI loop, JSON persistence, and checkpoints — open:

**[→ Open Bar Damage Tracker — implementation guide](/first-app)**

Work through that page while you code. Come back here for the exercise below.

### Testing the app

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

Create `open_bar_tracker_test.go` alongside `main.go`:

```go
package main

import "testing"

func TestAddDrink(t *testing.T) {
    drinks := []Drink{}
    drinks = addDrink(drinks, "Aperol Spritz", "cocktail", 160)

    if len(drinks) != 1 {
        t.Errorf("expected 1 drink, got %d", len(drinks))
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
}
```

Run with `go test ./...`. Use `-v` for verbose output.

`t.Errorf` marks the test failed but keeps running. `t.Fatalf` stops immediately — use it before dereferencing a pointer that might be nil.

## Exercise

Add a **category filter** to the app: let the user choose "beer" or "cocktail" from the menu and show only drinks in that category.

## Hint

Write a helper function `filterByCategory(drinks []Drink, category string) []Drink` that returns a new slice containing only matching drinks. Use `strings.EqualFold` for a case-insensitive comparison. Then add a menu option that calls this function and passes the result to `listDrinks`.

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

`strings.EqualFold` makes the comparison case-insensitive — "Beer", "beer", "BEER" all match.

## References

- [encoding/json package](https://pkg.go.dev/encoding/json)
- [bufio package](https://pkg.go.dev/bufio)
- [os package](https://pkg.go.dev/os)
- [Go by Example — JSON](https://gobyexample.com/json)
- [Go by Example — Testing](https://gobyexample.com/testing)
- [testing package](https://pkg.go.dev/testing)
