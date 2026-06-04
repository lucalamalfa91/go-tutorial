---
id: hello-world
title: Hello World and modules
session: session-1
estimated_minutes: 45
objectives:
  - Create a first Go project
  - Initialize a Go module with go mod init
  - Run a Go program with go run
---

# Hello World and modules

## Summary

Every Go project starts with a module. A module is a collection of Go packages with a `go.mod` file at its root.

### Create a project

```bash
mkdir hello-go
cd hello-go
go mod init hello-go
```

The `go mod init` command creates a `go.mod` file:

```
module hello-go

go 1.22
```

This file declares the module name and the minimum Go version.

### Your first Go file

Create `main.go`:

```go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
```

Let's unpack this:

- **`package main`** — every Go file belongs to a package. The `main` package is special: it is the entry point of an executable program.
- **`import "fmt"`** — imports the `fmt` package from the standard library for formatted I/O.
- **`func main()`** — the entry point function. The program starts here.
- **`fmt.Println`** — prints a line to standard output.

### Run the program

```bash
go run .
```

Output:
```
Hello, Go!
```

The `.` means "the package in the current directory". You can also use:

```bash
go run main.go
```

### Build an executable

```bash
go build -o hello .
./hello
```

`go build` compiles the code into a binary. On Windows the binary has a `.exe` extension.

### Project structure so far

```
hello-go/
├── go.mod
└── main.go
```

For small programs, one `main.go` is enough. As the program grows you add more files to the same `main` package, or extract packages into subdirectories.

### Multiple files in the same package

All `.go` files in the same directory belong to the same package. They share declarations — you can define a function in one file and call it from another.

```go
// greet.go
package main

import "fmt"

func greet(name string) {
    fmt.Printf("Hello, %s!\n", name)
}
```

```go
// main.go
package main

func main() {
    greet("Go")
}
```

```bash
go run .   # compiles and runs both files
```

### go mod tidy

After adding or removing imports, run:

```bash
go mod tidy
```

This updates `go.sum` and removes unused dependencies.

## Exercise

1. Create a new module called `my-first-go`
2. Write a `main.go` that prints your name and today's date using `fmt.Printf`
3. Run it with `go run .`
4. Build it with `go build` and run the binary directly

## Hint

Use `fmt.Printf("Name: %s\n", "your name")` for formatted output. For the date, import `"time"` and use `time.Now().Format("2006-01-02")`.

## Solution

```go
package main

import (
    "fmt"
    "time"
)

func main() {
    name := "Alice"
    today := time.Now().Format("2006-01-02")
    fmt.Printf("Name: %s\n", name)
    fmt.Printf("Date: %s\n", today)
}
```

## References

- [Go modules reference](https://go.dev/ref/mod)
- [How to write Go code](https://go.dev/doc/code)
- [fmt package docs](https://pkg.go.dev/fmt)
