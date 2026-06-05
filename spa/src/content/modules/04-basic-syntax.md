---
id: basic-syntax
title: Basic syntax
session: session-1
estimated_minutes: 95
objectives:
  - Declare variables, constants, and use basic types
  - Write functions with multiple return values
  - Use if, for, switch, and defer
  - Understand pointers and when to use them
---

# Basic syntax

## Summary

### Variables

Go has two ways to declare variables:

```go
// Long form — explicit type
var name string = "Alice"
var age int = 30

// Short form — type inferred (only inside functions)
name := "Alice"
age := 30
```

**Zero values**: every variable has a zero value if not initialized — `0` for integers, `""` for strings, `false` for booleans, `nil` for pointers/slices/maps.

```go
var x int     // x == 0
var s string  // s == ""
var b bool    // b == false
```

### Constants

```go
const Pi = 3.14159
const MaxRetries = 3
const Greeting = "Hello"
```

Constants are evaluated at compile time and cannot be reassigned.

### Basic types

| Type | Example | Notes |
|------|---------|-------|
| `int` | `42` | platform-sized integer |
| `int64` | `int64(42)` | always 64-bit |
| `float64` | `3.14` | default floating point |
| `string` | `"hello"` | UTF-8 encoded |
| `bool` | `true` | |
| `byte` | `'A'` | alias for `uint8` |
| `rune` | `'€'` | alias for `int32`, represents a Unicode code point |

### Functions

```go
func add(a int, b int) int {
    return a + b
}

// Shorthand for same-type parameters
func add(a, b int) int {
    return a + b
}
```

**Multiple return values** — a key Go feature:

```go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, fmt.Errorf("cannot divide by zero")
    }
    return a / b, nil
}

result, err := divide(10, 2)
if err != nil {
    fmt.Println("Error:", err)
}
```

**Named return values:**

```go
func minMax(nums []int) (min, max int) {
    min, max = nums[0], nums[0]
    for _, n := range nums {
        if n < min { min = n }
        if n > max { max = n }
    }
    return  // naked return — returns min and max
}
```

### if

```go
if x > 10 {
    fmt.Println("big")
} else if x > 5 {
    fmt.Println("medium")
} else {
    fmt.Println("small")
}
```

**if with initializer** — very common in Go:

```go
if val, err := someFunc(); err != nil {
    fmt.Println("error:", err)
} else {
    fmt.Println("value:", val)
}
```

### for

Go has only one loop construct: `for`. It covers all three common loop patterns.

```go
// Classic C-style loop
for i := 0; i < 5; i++ {
    fmt.Println(i)
}

// While-style loop
n := 1
for n < 100 {
    n *= 2
}

// Infinite loop
for {
    // break when needed
    break
}

// Range loop over slice
nums := []int{1, 2, 3}
for i, v := range nums {
    fmt.Printf("index %d: value %d\n", i, v)
}

// Range loop over map
m := map[string]int{"a": 1, "b": 2}
for key, val := range m {
    fmt.Printf("%s = %d\n", key, val)
}
```

### switch

```go
switch day {
case "Monday", "Tuesday", "Wednesday", "Thursday", "Friday":
    fmt.Println("weekday")
case "Saturday", "Sunday":
    fmt.Println("weekend")
default:
    fmt.Println("unknown")
}
```

Go's switch does not fall through by default — no `break` needed.

**Type switch:**

```go
func describe(i interface{}) {
    switch v := i.(type) {
    case int:
        fmt.Printf("int: %d\n", v)
    case string:
        fmt.Printf("string: %s\n", v)
    default:
        fmt.Printf("unknown: %T\n", v)
    }
}
```

### defer

`defer` schedules a function call to run when the surrounding function returns.

```go
func readFile(name string) error {
    f, err := os.Open(name)
    if err != nil {
        return err
    }
    defer f.Close()  // guaranteed to run when readFile returns
    
    // read f...
    return nil
}
```

Multiple defers run in LIFO order (last in, first out).

### Pointers

A pointer holds the memory address of a variable. Go has pointers but no pointer arithmetic.

```text
Memory layout
┌─────────────────────────────────────────┐
│  address    │  name  │  value           │
├─────────────┼────────┼──────────────────┤
│  0xc000014  │   x    │   42             │
│  0xc000018  │   p    │   0xc000014      │  ← p = &x
└─────────────────────────────────────────┘
                         *p → 42
```

`&` gives you the address of a variable. `*` dereferences a pointer (reads the value at that address).

```go
x := 42
p := &x       // p is a *int — pointer to int

fmt.Println(p)   // 0xc000014070  (a memory address)
fmt.Println(*p)  // 42

*p = 100         // modify x through the pointer
fmt.Println(x)   // 100
```

**Why pointers matter in Go:**
- To let a function *modify* a variable, not just read it
- For large structs (avoids copying the whole value)
- Required for pointer receivers on methods — you will see `func (d *Drink) ...` in Module 5

```go
// Without pointer: modifies a copy — original unchanged
func doubleWrong(n int) { n *= 2 }

// With pointer: modifies the original
func double(n *int) { *n *= 2 }

x := 5
double(&x)
fmt.Println(x) // 10
```

**Nil pointer panic** — the most common pointer mistake:

```go
var p *int      // p is nil — points to nothing
fmt.Println(*p) // panic: runtime error: invalid memory address
```

Always initialize a pointer before dereferencing it. The zero value of any pointer type is `nil`.

## Exercise

Write a function `fizzbuzz(n int) string` that returns:
- `"Fizz"` if n is divisible by 3
- `"Buzz"` if n is divisible by 5
- `"FizzBuzz"` if divisible by both
- the number as a string otherwise

Then print the result for numbers 1 through 20.

## Hint

Use `n % 3 == 0` to check divisibility. Use `fmt.Sprintf("%d", n)` to convert an integer to a string. Check for `FizzBuzz` (both conditions) before checking `Fizz` or `Buzz` individually.

## Solution

```go
package main

import "fmt"

func fizzbuzz(n int) string {
    switch {
    case n%3 == 0 && n%5 == 0:
        return "FizzBuzz"
    case n%3 == 0:
        return "Fizz"
    case n%5 == 0:
        return "Buzz"
    default:
        return fmt.Sprintf("%d", n)
    }
}

func main() {
    for i := 1; i <= 20; i++ {
        fmt.Println(fizzbuzz(i))
    }
}
```

## References

- [A Tour of Go — Basics](https://go.dev/tour/basics)
- [Effective Go — Control structures](https://go.dev/doc/effective_go#control-structures)
- [Go by Example — Functions](https://gobyexample.com/functions)
- [Go by Example — For](https://gobyexample.com/for)
