# AI Agent Instructions

This document provides system instructions for AI coding assistants working on the DevBcn project.

## Code Style & Constraints

- **Architectural Boundaries**: React Components must not import from `app/`. Data must flow down via props.
- **Typing**: Use strict TypeScript. Avoid `any` at all costs.
- **Error Handling Policy**: Avoid unhandled promise rejections. Do not use generic catch-all statements without logging or handling the error properly.
- **Comments**: Code must be self-documenting. DO NOT add inline comments explaining _what_ code does. Only explain _why_ non-obvious decisions were made.
- **Styling**: SCSS must be used. No Tailwind or CSS Modules.

## AI Usage Norms

- Always start with a clean state and the latest snapshot from `main`.
- No unchecked AI-generated code should be pushed to main. All code must pass the test suite.
- Ensure code changes are manually reviewed as per branch protection rules.
- Agents must never bypass `pre-commit`, `commit-msg`, or `pre-push` Git hooks.
- Do not disable eslint rules.
- Check the build and tests always pass before completing a task.
- Check SonarQube findings and resolve them before claiming any task is done.
- For Supabase-related verification, inspection, or project operations, prefer using the installed `supabase` CLI when it helps validate the real environment.
- For Vercel-related verification, deployment, environment, or project operations, prefer using the installed `vercel` CLI when it helps validate the real environment.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
