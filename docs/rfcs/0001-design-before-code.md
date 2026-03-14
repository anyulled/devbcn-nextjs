# RFC 0001: Design-Before-Code Culture

## Summary

Establish a process where all significant architectural changes, new feature components, or systemic refactoring require a Request For Comments (RFC) document before implementation begins.

## Motivation

To reduce the risk of "cognitive offloading" to AI agents resulting in unreviewable or disconnected architectural decisions. By writing a document up-front, both human developers and AI coding assistants share a common understanding of the intended design and testing strategy.

## Detailed Design

1. Create a markdown file in the `docs/rfcs/` directory outlining the proposed changes.
2. The RFC must include sections for Summary, Motivation, Detailed Design, and Drawbacks.
3. Once approved by the repository CODEOWNERS, implementation can begin.

## Drawbacks

Adds process overhead to smaller tasks if not scoped correctly. RFCs should be reserved for significant changes.
