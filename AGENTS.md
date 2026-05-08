# AI Agent Instructions

This document provides system instructions for AI coding assistants working on the DevBcn project.

## Code Style & Constraints

- **Architectural Boundaries**: React Components must not import from `app/`. Data must flow down via props.
- **Typing**: Use strict TypeScript. Avoid `any` at all costs.
- **Error Handling Policy**: Avoid unhandled promise rejections. Do not use generic catch-all statements without logging or handling the error properly.
- **Comments**: Code must be self-documenting. DO NOT add inline comments explaining _what_ code does. Only explain _why_ non-obvious decisions were made.
- **Styling**: SCSS must be used. No Tailwind or CSS Modules.

## AI Usage Norms

- No unchecked AI-generated code should be pushed to main. All code must pass the test suite.
- Ensure code changes are manually reviewed as per branch protection rules.
- Agents must never bypass `pre-commit`, `commit-msg`, or `pre-push` Git hooks.
- Do not disable eslint rules.
- Check the build and tests always pass before completing a task.
- Check SonarQube findings and resolve them before claiming any task is done.
- For Supabase-related verification, inspection, or project operations, prefer using the installed `supabase` CLI when it helps validate the real environment.
- For Vercel-related verification, deployment, environment, or project operations, prefer using the installed `vercel` CLI when it helps validate the real environment.
