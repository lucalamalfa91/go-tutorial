# Content Schema for the Go Self-Learning SPA

## Example curriculum.yaml

```yaml
course:
  id: go-self-learning-path
  title: Go - from zero to first app
  level: beginner
  format: self-paced
  delivery: spa
  sessions:
    - id: session-1
      title: Go foundations
      target_hours: 5
    - id: session-2
      title: First app
      target_hours: 5

modules:
  - id: introduction
    order: 1
    session: session-1
    title: Introduction to Go
    objectives:
      - understand what Go is
      - understand the main reasons to learn it
    prerequisites: []

  - id: setup
    order: 2
    session: session-1
    title: Environment setup
    objectives:
      - install Go
      - verify local setup
      - prepare editor and terminal
    prerequisites:
      - introduction

  - id: hello-world
    order: 3
    session: session-1
    title: Hello World and modules
    objectives:
      - create a first project
      - initialize a module
      - run a Go program
    prerequisites:
      - setup

  - id: basic-syntax
    order: 4
    session: session-1
    title: Basic syntax
    objectives:
      - use variables, functions, conditions, loops
    prerequisites:
      - hello-world

  - id: data-structures
    order: 5
    session: session-1
    title: Arrays, slices, maps, and structs
    objectives:
      - understand the main data structures used in beginner Go programs
    prerequisites:
      - basic-syntax

  - id: idiomatic-go
    order: 6
    session: session-2
    title: Writing Go in a Go way
    objectives:
      - understand formatting and simple idioms
      - write readable beginner-level Go code
    prerequisites:
      - data-structures

  - id: first-app
    order: 7
    session: session-2
    title: First working app
    objectives:
      - build a small functioning application
    prerequisites:
      - idiomatic-go

  - id: next-steps
    order: 8
    session: session-2
    title: Next steps
    objectives:
      - identify the best official resources for further learning
    prerequisites:
      - first-app
```

## Example lesson markdown

```md
---
id: first-app
title: First working app
estimated_minutes: 120
session: session-2
---

# First working app

## Objectives
- build a simple CLI application
- model data with structs
- work with slices and functions
- optionally persist data with JSON

## Project
Create a **Calorie Counter for Cocktails and Beers**.

## Suggested data model
```go
type Drink struct {
    Name     string
    Category string
    Calories int
}
```

## Suggested features
- add a drink
- list all drinks
- show total calories
- show average calories
- show highest-calorie drink
- optionally save and load drinks from a JSON file

## Steps
1. Create the `Drink` struct.
2. Store drinks in a slice.
3. Implement `addDrink`.
4. Implement `listDrinks`.
5. Implement `totalCalories`.
6. Implement summary output.
7. Add optional JSON persistence.

## Exercise
Extend the app with a category filter for `beer` and `cocktail`.

## Hint
Create a function that takes the full list and returns only the matching drinks.

## Checkpoint
- Can you explain why a struct is useful here?
- Can you explain why a slice is useful here?
- Can you explain how JSON helps persist data locally?
```

## Suggested module metadata fields

Each lesson/module file can include:

- `id`
- `title`
- `session`
- `estimated_minutes`
- `objectives`
- `prerequisites`
- `summary`
- `examples`
- `exercises`
- `hints`
- `solution`
- `official_links`
- `next_module`

## Suggested official references to include in the SPA

- Go getting started tutorial
- A Tour of Go
- Go by Example
- official Go tutorials page
