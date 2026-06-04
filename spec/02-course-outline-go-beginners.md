# Go Self-Learning Path - Outline

## Goal

The purpose of this self-learning path is to help developers with general programming experience get started with Go, understand its core syntax and concepts, and build a first simple working application.

## Audience

Developers with basic programming knowledge and no prior experience in Go.

## Format

- Self-paced
- Reference learning path
- SPA-based content navigation
- Official resources + curated internal material
- Structured in 2 sessions of 5 hours each
- Final objective: first working app
- Planned release of the SPA on Vercel

## Learning outcomes

By the end of the path, learners should be able to:

- understand the basic structure of a Go program
- use the Go toolchain for simple local development
- write basic Go syntax confidently
- work with common Go data structures
- understand some Go-specific idioms
- build a first small application

---

## Session 1 - Go foundations

Target pacing:
- about 4h to 4h 15m of actual study content
- remaining time left for breaks, review, debugging, and breathing room

### Block 1 - Introduction and setup
Estimated time: 45 minutes

- What Go is
- Why Go exists
- Common use cases
- Install Go
- Verify installation
- Editor and terminal setup

### Block 2 - First program and project structure
Estimated time: 45 minutes

- `package main`
- `func main()`
- imports
- `fmt.Println`
- `go mod init`
- `go run .`
- `go mod tidy`
- minimal project structure

### Block 3 - Basic syntax
Estimated time: 75 minutes

- variables and constants
- basic types
- functions
- if
- for
- switch
- defer

### Break / buffer
Estimated time: 15 to 20 minutes

### Block 4 - Core data structures
Estimated time: 60 minutes

- arrays
- slices
- maps
- structs

### Block 5 - Guided exercises and recap
Estimated time: 45 to 60 minutes

Suggested exercises:
- sum and average a list of numbers
- search within a slice
- count occurrences with a map
- model a simple entity with a struct

---

## Session 2 - First app

Target pacing:
- about 4h to 4h 15m of actual study content
- remaining time left for breaks, review, troubleshooting, and recap

### Block 1 - Quick review
Estimated time: 30 to 45 minutes

- recap of Session 1
- common mistakes
- questions and clarification points

### Block 2 - Writing Go in a Go way
Estimated time: 45 minutes

- formatting
- readability
- naming basics
- simple error handling
- standard library mindset

### Block 3 - App design
Estimated time: 30 to 45 minutes

Design the first app:
- define the goal
- define the data model
- define the main features
- define a minimal file structure

### Break / buffer
Estimated time: 15 to 20 minutes

### Block 4 - Build the first app
Estimated time: 90 to 120 minutes

Project:
**Calorie Counter for Cocktails and Beers**

Suggested minimum features:
- add a drink
- choose category: beer or cocktail
- enter name
- enter calories
- list drinks
- show total calories
- show average calories
- show highest-calorie item

Suggested data model:

```go
type Drink struct {
    Name     string
    Category string
    Calories int
}
```

### Block 5 - Improvements and wrap-up
Estimated time: 30 to 45 minutes

Possible improvements:
- save data to JSON
- load data from JSON
- filter by category
- preloaded sample drinks
- cleaner CLI flow

Next steps:
- A Tour of Go
- Go by Example
- official Go tutorials
- later follow-ups: testing, REST APIs, concurrency
