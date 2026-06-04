---
id: introduction
title: Introduction to Go
session: session-1
estimated_minutes: 45
objectives:
  - Understand what Go is and why it was created
  - Know Go's main use cases
  - Get an overview of this learning path
---

# Introduction to Go

## Summary

Go (also called Golang) is a statically typed, compiled language designed at Google in 2007 and open-sourced in 2009. It was created by Robert Griesemer, Rob Pike, and Ken Thompson.

### Why Go exists

Go was designed to address specific pain points at Google:

- **Slow compile times** in large C++ codebases
- **Complexity** of managing dependencies
- **Difficulty** writing concurrent software

Go's answer: a simple language with fast compilation, built-in concurrency primitives, and a no-frills standard library.

### Key characteristics

- **Statically typed** — type errors caught at compile time
- **Compiled** — produces native executables, no VM needed
- **Garbage collected** — manual memory management not required
- **Fast** — compiles in seconds even for large programs
- **Simple** — the language spec fits in a single web page
- **Opinionated** — there is usually one right way to format Go code

### Common use cases

Go is widely used for:

| Use case | Examples |
|----------|---------|
| Web servers and APIs | Docker, Kubernetes, Caddy |
| CLI tools | Hugo, Terraform, kubectl |
| Microservices | widespread in cloud-native stacks |
| Network tools | Prometheus, CoreDNS |
| DevOps tooling | most infrastructure tooling is Go |

### Go vs other languages

If you come from Python or JavaScript: Go is more verbose but much faster and catches errors at compile time. You give up dynamic typing and get explicit code that is easy to follow.

If you come from Java: Go feels simpler. No classes, no inheritance, no checked exceptions. Interfaces are implicit. The toolchain is minimal.

### This learning path

You will follow 8 modules across 2 sessions:

- **Session 1 (Go foundations):** language fundamentals — syntax, types, data structures
- **Session 2 (First app):** idiomatic Go, then building a real CLI application

By the end you will have a working Go program you can read, extend, and deploy.

## Exercise

Research question: find three Go-based tools you already use in your daily workflow (think about CLI tools, infrastructure tools, containers).

## References

- [Go official website](https://go.dev/)
- [Why Go? — official blog post](https://go.dev/blog/why-go)
- [Go FAQ](https://go.dev/doc/faq)
- [A Tour of Go](https://go.dev/tour/)
