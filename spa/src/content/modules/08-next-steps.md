---
id: next-steps
title: Next steps
session: session-2
estimated_minutes: 30
objectives:
  - Identify the best official resources for further learning
  - Know what topics to study after this path
---

# Next steps

## Summary

You have reached the end of the Go self-learning path. Here is what you have covered and where to go from here.

### What you have done

- Understood what Go is and why it exists
- Set up a complete Go development environment
- Written your first Go programs
- Learned the core syntax: variables, types, functions, control flow
- Used the core data structures: arrays, slices, maps, structs
- Applied Go idioms: error handling, formatting, naming
- Built a complete CLI application from scratch

### Immediate next resources

These are the best official resources to continue from here:

#### A Tour of Go
Interactive browser-based tour covering all language features step by step.

[https://go.dev/tour/](https://go.dev/tour/)

Start here if you want to fill in gaps or explore language features you have not encountered yet.

#### Go by Example
Annotated example programs for every Go concept. The fastest way to look up "how do I do X in Go".

[https://gobyexample.com/](https://gobyexample.com/)

Bookmark this — you will come back to it regularly.

#### Effective Go
The official guide on writing idiomatic Go. Written by the Go team. Covers naming, control structures, concurrency, interfaces, and more.

[https://go.dev/doc/effective_go](https://go.dev/doc/effective_go)

Read this once you have written a few hundred lines of Go. It will reshape how you think about the language.

#### Official Go tutorials
A collection of guided tutorials on the official site.

[https://go.dev/doc/tutorial/](https://go.dev/doc/tutorial/)

Includes tutorials on REST APIs, generics, fuzz testing, and more.

#### Go standard library documentation
The complete reference for all packages in the standard library.

[https://pkg.go.dev/std](https://pkg.go.dev/std)

When in doubt, check stdlib first before reaching for a third-party dependency.

### Topics to study next

In rough order of priority for a Go beginner:

| Topic | Why |
|-------|-----|
| **Interfaces** | The core abstraction mechanism in Go — you will use them everywhere |
| **Testing** | `go test`, table-driven tests, testable examples |
| **Goroutines and channels** | Go's built-in concurrency primitives |
| **HTTP servers** | `net/http` package — build simple REST APIs |
| **Error wrapping** | `errors.Is`, `errors.As`, custom error types |
| **Generics** | Added in Go 1.18 — useful for reusable data structures |
| **Context** | Cancellation and deadlines — essential for real-world programs |

### Where Go is used at work

Look for Go in:
- Docker, Kubernetes, and related CNCF projects (most are Go)
- CLI tooling (Terraform, kubectl, GitHub CLI)
- Internal microservices and APIs
- Any team that values simplicity, fast compilation, and low operational overhead

### Recommended reading

- **"The Go Programming Language"** by Donovan & Kernighan — the definitive book
- **"100 Go Mistakes and How to Avoid Them"** by Teiva Harsanyi — practical and direct

## Exercise

Pick one of the following and build it this week:

1. A CLI tool that reads a JSON file and prints a summary
2. A simple HTTP server that responds with a JSON response
3. Extend the calorie counter with JSON persistence and a filter option

## References

- [A Tour of Go](https://go.dev/tour/)
- [Go by Example](https://gobyexample.com/)
- [Effective Go](https://go.dev/doc/effective_go)
- [Official Go tutorials](https://go.dev/doc/tutorial/)
- [Standard library reference](https://pkg.go.dev/std)
- [Go blog](https://go.dev/blog/)
