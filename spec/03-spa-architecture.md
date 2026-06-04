# SPA Architecture for the Go Self-Learning Path

## Objective

Provide a single SPA that exposes the full Go self-learning path in a structured and easy-to-follow way.

## Delivery model

- Single delivery format: SPA only
- No AI chat dependency
- Same content for everyone
- Self-paced navigation
- Planned deployment on Vercel
- Content-first architecture

## Principles

- Keep the learning path simple and maintainable.
- Use the SPA as the single reference point for the course.
- Keep the content separated from the UI.
- Make it easy to extend later with more modules or examples.
- Optimize for clarity over feature richness.

## High-level structure

```text
/course-content
  /modules
    01-introduction.md
    02-setup.md
    03-hello-world.md
    04-basic-syntax.md
    05-data-structures.md
    06-idiomatic-go.md
    07-first-app.md
    08-next-steps.md
  curriculum.yaml
  glossary.yaml
  exercises.yaml
  checkpoints.yaml

/spa
  /src
    /components
    /pages
    /data
    /styles
  app
```

## SPA features

The SPA should provide:

- a homepage with course overview
- a roadmap view with all modules
- a lesson page for each module
- exercises for each step
- optional hints
- optional solution sections
- checkpoints or mini self-assessments
- external links to official Go resources
- progress indicators (optional)
- responsive layout for desktop and laptop use

## Suggested pages

### Home
- purpose of the path
- audience
- expected outcomes
- recommended prerequisites
- course structure in 2 sessions

### Roadmap
- all modules in order
- short description of each
- estimated effort
- session mapping

### Lesson page
- objectives
- theory summary
- examples
- exercises
- hints
- solution
- official references

### Final app page
- app goal
- data model
- step-by-step implementation
- suggested extensions

## Technical approach

Recommended stack:
- React
- TypeScript
- Vite
- Markdown-driven content
- simple client-side routing

Optional additions:
- syntax highlighting
- collapsible hint/solution sections
- search across modules
- local progress persistence

## Deployment

Recommended deployment flow:

1. Build the SPA in a Git repository.
2. Push the repository to GitHub, GitLab, or another supported Git provider.
3. Import the repository into Vercel.
4. Let Vercel manage builds and deployments for future updates.

Alternative deployment flow:
- deploy manually with the Vercel CLI

## Notes for a coding agent

The coding agent should:

- scaffold the SPA project
- implement routing and navigation
- render Markdown-based lesson content
- create reusable components for roadmap, lesson sections, hints, and solutions
- keep the content model independent from the visual layer
- prepare the project to be deployed on Vercel without extra backend requirements
