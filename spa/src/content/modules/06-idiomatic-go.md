---
id: idiomatic-go
title: Writing Go in a Go way
session: session-2
estimated_minutes: 85
objectives:
  - Use gofmt and understand Go formatting conventions
  - Handle errors idiomatically with the if err != nil pattern
  - Apply Go naming conventions
  - Define and satisfy interfaces implicitly
---

# Writing Go in a Go way

## Summary

Go is an opinionated language. There is usually one right way to write something. This module covers the key conventions that make Go code readable to other Go developers.

### Formatting with gofmt

Never argue about formatting in Go. Run `gofmt` (or save in VS Code with the Go extension) and the formatter decides everything for you.

```bash
gofmt -w .      # format all .go files in place
gofmt -d .      # show diff without changing files
```

What gofmt enforces:
- tabs for indentation (not spaces)
- specific brace placement
- aligned struct fields and import blocks
- no trailing whitespace

`goimports` is a superset of `gofmt` that also adds/removes import statements automatically. Recommended.

### Naming conventions

| Thing | Convention | Example |
|-------|-----------|---------|
| Package | lowercase, short, no underscores | `http`, `json`, `strconv` |
| Exported (public) | PascalCase | `ReadFile`, `MaxRetries` |
| Unexported (private) | camelCase | `readLine`, `maxRetries` |
| Acronyms | keep them all-caps | `HTTPClient`, `JSONParser`, `userID` |
| Error variables | `err` | always |
| Loop variables | `i`, `j`, `k` or meaningful short names | |

### Error handling

Errors in Go are values. Functions that can fail return an `error` as the last return value.

```go
// The idiomatic pattern
result, err := riskyOperation()
if err != nil {
    return fmt.Errorf("operation failed: %w", err)
}
// use result
```

**Creating errors:**

```go
import "errors"

// Simple error
err := errors.New("something went wrong")

// Formatted error
err := fmt.Errorf("expected %d items, got %d", expected, got)

// Wrapping an error (Go 1.13+)
err := fmt.Errorf("parsing config: %w", originalErr)
```

**Unwrapping errors:**

```go
if errors.Is(err, os.ErrNotExist) {
    // file not found specifically
}

var pathErr *os.PathError
if errors.As(err, &pathErr) {
    fmt.Println("path:", pathErr.Path)
}
```

### The standard library mindset

Go's standard library is extensive. Before reaching for a third-party package, check if `stdlib` has what you need.

Commonly used packages:

| Package | Purpose |
|---------|---------|
| `fmt` | Formatted I/O |
| `os` | OS operations (files, env, processes) |
| `io` | I/O interfaces |
| `strings` | String manipulation |
| `strconv` | String conversions (`Atoi`, `Itoa`, etc.) |
| `bufio` | Buffered I/O (reading lines) |
| `encoding/json` | JSON marshal/unmarshal |
| `math` | Math functions |
| `sort` | Sorting slices and more |
| `time` | Time and duration |
| `log` | Simple logging |

### Short, readable functions

Go style prefers many small functions over large ones. A function should do one thing.

```go
// Too many responsibilities
func processAll(data []byte) ([]Result, error) { ... }

// Better: separated concerns
func parse(data []byte) ([]Item, error) { ... }
func validate(items []Item) error { ... }
func transform(items []Item) []Result { ... }
```

### Avoid unnecessary nesting

Early returns keep code flat:

```go
// Avoid
func process(s string) error {
    if s != "" {
        if len(s) > 5 {
            // do work
            return nil
        }
        return errors.New("too short")
    }
    return errors.New("empty")
}

// Better
func process(s string) error {
    if s == "" {
        return errors.New("empty")
    }
    if len(s) <= 5 {
        return errors.New("too short")
    }
    // do work
    return nil
}
```

### Interfaces

An interface in Go defines a set of method signatures. A type satisfies an interface **implicitly** — just by having the right methods. There is no `implements` keyword.

```text
Java / C# (explicit):          Go (implicit):

type Animal interface {         type Animal interface {
    Sound() string                  Sound() string
}                               }

type Dog struct{}               type Dog struct{ Name string }
// must declare intent          // just implement the method:
// implements Animal
func (d Dog) Sound() string {   func (d Dog) Sound() string {
    return "woof"                   return "woof"
}                               }
                                → Dog satisfies Animal automatically
```

#### Your first interface: fmt.Stringer

The `fmt` package defines this interface:

```go
type Stringer interface {
    String() string
}
```

Any type with a `String() string` method is automatically a `Stringer`. `fmt.Println` uses it to print your type the way you want.

```go
type Drink struct {
    Name     string
    Category string
    Calories int
}

func (d Drink) String() string {
    return fmt.Sprintf("%s (%s) — %d kcal", d.Name, d.Category, d.Calories)
}

beer := Drink{Name: "Lager", Category: "beer", Calories: 150}
fmt.Println(beer) // Lager (beer) — 150 kcal
```

Without `String()`, `fmt.Println(beer)` would print `{Lager beer 150}`. No changes needed in the caller.

#### error is an interface

You have already been using an interface without knowing it. The built-in `error` type is:

```go
type error interface {
    Error() string
}
```

Every time you write `if err != nil`, you are working with an interface value. You can create your own error types by implementing this interface:

```go
type ValidationError struct {
    Field   string
    Message string
}

func (e ValidationError) Error() string {
    return fmt.Sprintf("%s: %s", e.Field, e.Message)
}
```

#### Interface values — what they hold

```text
interface variable
┌──────────────────┬──────────────────────┐
│  concrete type   │  concrete value      │
│  *Drink          │  &Drink{...}         │
└──────────────────┴──────────────────────┘
nil interface → no type, no value → calling a method panics
```

#### When to reach for interfaces

- Accept an interface as a function parameter when any type with those methods should work
- The `io.Reader` / `io.Writer` pair from the standard library is a perfect example: files, network connections, and in-memory buffers all satisfy them, so code written against those interfaces works everywhere
- Return concrete types from functions — the caller can always assign to an interface later

## Exercise

Refactor this code to be idiomatic Go. Identify at least 3 problems:

```go
func GetUser(Id int, db map[int]string) (string, bool) {
    val := db[Id]
    if val != "" {
        return val, true
    } else {
        return "", false
    }
}
```

## Hint

Problems to look for: (1) naming convention for the parameter, (2) the else after a return is unnecessary, (3) using `!= ""` to check map presence is wrong — use the two-value form.

## Solution

```go
func GetUser(id int, db map[int]string) (string, bool) {
    val, ok := db[id]
    if !ok {
        return "", false
    }
    return val, true
}
```

Changes: `Id` → `id` (unexported parameter uses camelCase), removed unnecessary `else`, used the two-value map lookup `val, ok := db[id]` to correctly detect a missing key.

## References

- [Effective Go](https://go.dev/doc/effective_go)
- [Go Code Review Comments](https://github.com/golang/go/wiki/CodeReviewComments)
- [Go by Example — Errors](https://gobyexample.com/errors)
- [Standard library index](https://pkg.go.dev/std)
