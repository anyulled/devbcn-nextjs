# Contributing

Thank you for contributing to DevBcn!

## Small Batch Enforcement

Please submit Pull Requests in small, cohesive batches. Do not submit monolithic PRs containing thousands of lines of changes, especially when AI coding assistants are used. Small PRs are easier to review and less likely to introduce subtle regressions.

## Git Hooks

Zero Tolerance: Never bypass git hooks (`--no-verify`). We focus on quality over speed.
All commits must successfully pass the pre-commit linters and tests.

## Code Standards

- Ensure 90% test coverage.
- Apply SOLID, DRY, KISS, and YAGNI principles.
- Follow the Law of Demeter and "Tell, Don't Ask" pattern.
- Fix any and all SonarQube issues before opening a PR.
