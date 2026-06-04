---
id: data-structures
title: Arrays, slices, maps, and structs
session: session-1
estimated_minutes: 60
objectives:
  - Understand arrays and slices and how they differ
  - Use maps for key-value storage
  - Model data with structs
---

# Arrays, slices, maps, and structs

## Summary

### Arrays

An array has a fixed size determined at compile time. In practice, arrays are rarely used directly — slices are used instead.

```go
var a [5]int           // [0 0 0 0 0]
b := [3]string{"x", "y", "z"}
fmt.Println(len(b))    // 3
```

### Slices

A slice is a dynamic view over an array. It grows as needed.

```go
// Create a slice
nums := []int{1, 2, 3}

// Append
nums = append(nums, 4, 5)

// Slice a slice
sub := nums[1:3]  // [2 3] — indices 1 inclusive to 3 exclusive

// Make a slice with length and capacity
s := make([]int, 5)      // len=5, cap=5, all zeros
s2 := make([]int, 0, 10) // len=0, cap=10 — efficient if you know the size
```

**Range over a slice:**

```go
for i, v := range nums {
    fmt.Printf("[%d] = %d\n", i, v)
}

// Ignore the index
for _, v := range nums {
    fmt.Println(v)
}
```

**Slices are reference types** — when you pass a slice to a function, the function can modify the underlying array.

### Maps

A map is an unordered collection of key-value pairs.

```go
// Create a map
ages := map[string]int{
    "Alice": 30,
    "Bob":   25,
}

// Add / update
ages["Carol"] = 28

// Read
fmt.Println(ages["Alice"])  // 30

// Check if key exists
age, ok := ages["David"]
if !ok {
    fmt.Println("David not found")
}

// Delete
delete(ages, "Bob")

// Make an empty map
m := make(map[string]int)

// Iterate
for name, age := range ages {
    fmt.Printf("%s: %d\n", name, age)
}
```

**Important:** reading a missing key from a map does not panic — it returns the zero value for the value type. Always use the two-value form `val, ok := m[key]` when you need to distinguish "missing" from "zero value".

### Structs

A struct groups related data under a named type.

```go
type Person struct {
    Name string
    Age  int
    City string
}

// Create a struct
alice := Person{Name: "Alice", Age: 30, City: "Zurich"}

// Access fields
fmt.Println(alice.Name)

// Update a field
alice.Age = 31

// Struct with pointer
p := &Person{Name: "Bob", Age: 25}
p.Age = 26  // Go auto-dereferences — no need for (*p).Age
```

**Methods on structs:**

```go
type Rectangle struct {
    Width  float64
    Height float64
}

func (r Rectangle) Area() float64 {
    return r.Width * r.Height
}

func (r *Rectangle) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

rect := Rectangle{Width: 10, Height: 5}
fmt.Println(rect.Area())  // 50
rect.Scale(2)
fmt.Println(rect.Area())  // 200
```

Use a **pointer receiver** (`*Rectangle`) when the method modifies the struct. Use a **value receiver** when it only reads.

### Nested structs

```go
type Address struct {
    Street string
    City   string
}

type Employee struct {
    Name    string
    Address Address
}

e := Employee{
    Name: "Alice",
    Address: Address{Street: "Bahnhofstr. 1", City: "Zurich"},
}
fmt.Println(e.Address.City)
```

## Exercise

Write a program that:
1. Creates a `[]string` of 5 programming languages
2. Counts how many times each character `a`, `e`, `i`, `o`, `u` appears across all language names (use a `map[rune]int`)
3. Prints the vowel counts sorted by vowel

## Hint

Use `for _, lang := range languages` to iterate. Then `for _, ch := range lang` iterates over runes of a string. Use a `switch` or a `strings.ContainsRune` check to test if a rune is a vowel. To sort the output, iterate over a sorted list of vowels rather than the map.

## Solution

```go
package main

import (
    "fmt"
    "strings"
)

func main() {
    languages := []string{"Go", "Python", "JavaScript", "Rust", "TypeScript"}
    vowels := map[rune]int{}

    for _, lang := range languages {
        for _, ch := range strings.ToLower(lang) {
            if strings.ContainsRune("aeiou", ch) {
                vowels[ch]++
            }
        }
    }

    for _, v := range []rune{'a', 'e', 'i', 'o', 'u'} {
        fmt.Printf("%c: %d\n", v, vowels[v])
    }
}
```

## References

- [A Tour of Go — More types](https://go.dev/tour/moretypes)
- [Go by Example — Slices](https://gobyexample.com/slices)
- [Go by Example — Maps](https://gobyexample.com/maps)
- [Go by Example — Structs](https://gobyexample.com/structs)
