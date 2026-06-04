---
id: setup
title: Environment setup
session: session-1
estimated_minutes: 45
objectives:
  - Install Go on your machine
  - Verify the installation
  - Set up your editor and terminal
---

# Environment setup

## Summary

Before writing Go code you need three things: the Go toolchain, a terminal, and an editor.

### Install Go

Go to [https://go.dev/dl/](https://go.dev/dl/) and download the installer for your OS.

**macOS (with Homebrew):**
```bash
brew install go
```

**Linux:**
```bash
wget https://go.dev/dl/go1.22.linux-amd64.tar.gz
sudo rm -rf /usr/local/go
sudo tar -C /usr/local -xzf go1.22.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin
```

**Windows:** use the `.msi` installer from the download page.

### Verify the installation

Open a terminal and run:

```bash
go version
```

Expected output (version may differ):

```
go version go1.22.0 darwin/amd64
```

Check that the Go workspace is accessible:

```bash
go env GOPATH
go env GOROOT
```

### Project-level workspace with Go modules

Since Go 1.11 you do not need a global `GOPATH` workspace for your projects. Instead, each project has its own `go.mod` file. You will set this up in the next module.

### Terminal setup

Use any terminal you like. On macOS/Linux: iTerm2, the built-in Terminal, or Alacritty. On Windows: Windows Terminal with PowerShell or WSL2.

Make sure `go` is on your `PATH`:

```bash
which go       # macOS/Linux
where go       # Windows
```

### Editor setup

**VS Code** is the most popular choice for Go:

1. Install the [Go extension](https://marketplace.visualstudio.com/items?itemName=golang.Go) by the Go team
2. Open a `.go` file — VS Code will prompt you to install the Go tools (gopls, dlv, etc.)
3. Accept and let it install

**Other options:** GoLand (full IDE, paid), Vim/Neovim with gopls, Zed.

### Verify gopls (language server) is working

In VS Code, open a `.go` file. Hover over a symbol — if you see documentation, gopls is working. If not, run `Go: Install/Update Tools` from the command palette.

### Essential go commands to know

| Command | What it does |
|---------|-------------|
| `go version` | Show installed Go version |
| `go env` | Show Go environment variables |
| `go build` | Compile the current package |
| `go run .` | Compile and run the current package |
| `go test ./...` | Run all tests |
| `go mod tidy` | Clean up module dependencies |
| `gofmt` | Format Go code |

## Exercise

1. Install Go and verify it with `go version`
2. Install the VS Code Go extension
3. Run `go env` and note the values of `GOPATH`, `GOROOT`, and `GOMODCACHE`

## References

- [Go download page](https://go.dev/dl/)
- [Getting started — official guide](https://go.dev/doc/install)
- [VS Code Go extension](https://marketplace.visualstudio.com/items?itemName=golang.Go)
