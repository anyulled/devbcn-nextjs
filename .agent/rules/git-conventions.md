---
trigger: model_decision
description: git commit conventions and history tracking
---

# Git Commit Conventions

To ensure a clean and auditable project history, follow these rules for every commit:

## Semantic Commit Separation

- **Never combine unrelated changes**: Separate commits by their semantic meaning (e.g., a performance fix should be a different commit than an environment configuration change or a content update).
- **Group by impact**: 
  - `perf`: Performance optimizations (e.g., CLS fixes).
  - `chore`: Tooling, dependencies, and internal maintenance (e.g., linter fixes).
  - `feat`: New features or content additions.
  - `fix`: Bug fixes.
  - `refactor`: Code changes that neither fix a bug nor add a feature.

## Rationale

Granular, semantic commits improve historical tracking, making it easier to revert specific changes, identify the introduction of regressions, and understand the evolution of the codebase.
