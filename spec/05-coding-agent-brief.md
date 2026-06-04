# Coding Agent Brief - Build the Go Self-Learning SPA

## Objective

Build a production-ready SPA for an internal Go self-learning path.

## Context

This is not a live course platform and does not require user accounts, backend services, or AI chat. It is a lightweight self-learning SPA that presents a structured path for learning Go from zero to a first working app.

The course is divided into 2 sessions of 5 hours each, with some intentional buffer for breaks, review, and debugging.

The final practical project in the learning path is a small CLI-oriented exercise called:
**Calorie Counter for Cocktails and Beers**

## Deliverable expectations

The SPA should:

- present the course as a self-learning experience
- clearly separate Session 1 and Session 2
- provide a roadmap view
- render lesson content from Markdown or structured content files
- include exercises, hints, and solutions
- include official Go resource links
- be ready for deployment on Vercel

## Recommended stack

- React
- TypeScript
- Vite
- React Router
- Markdown rendering
- minimal and clean UI

## Functional requirements

### 1. Home page
Include:
- course purpose
- audience
- learning outcomes
- prerequisite summary
- explanation that the path is split into 2 sessions

### 2. Roadmap page
Include:
- all modules in order
- session grouping
- estimated time per module
- progress-friendly layout

### 3. Lesson page
Include:
- title
- objectives
- summary
- examples
- exercises
- hints
- solution
- external references
- previous/next navigation

### 4. First app page
The first app content should revolve around:
- a CLI calorie counter for cocktails and beers
- struct-based modeling
- slices
- summary calculations
- optional JSON persistence

## Non-functional requirements

- responsive layout
- clear typography
- simple navigation
- no backend dependency
- easy content maintenance
- Vercel-friendly setup

## Content strategy

The content should be stored outside the UI logic as much as possible.

Preferred approach:
- keep modules in Markdown files or structured JSON/YAML files
- keep a central curriculum manifest
- derive roadmap and lesson navigation from content metadata

## Deployment expectation

The project should be designed for:
- Git-based deployment to Vercel
- straightforward local development with `npm install` and `npm run dev`
- production build with `npm run build`

## Nice-to-have features

- collapsible hints and solutions
- search or quick navigation across modules
- lightweight progress tracking
- copy-to-clipboard for code snippets

## Tone and UX

The experience should feel clean, practical, and developer-oriented. It should not look like a marketing site. It should feel like an internal technical learning resource with a lightweight modern UI.
