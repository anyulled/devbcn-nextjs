## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.
## 2024-05-19 - PR Size Constraint for Performance Optimizations

**Learning:** Performance optimization PRs submitted by the Bolt persona must be labeled `size/S` or `size/XS`. Modifying multiple identical files or applying structural refactoring that expands the diff (e.g., replacing a one-line `flatMap` with an 18-line `for...of` loop in multiple places) will cause the PR to be rejected as `size/M`.
**Action:** When implementing a performance optimization, strictly limit the scope to a single, highly localized change (under 50 lines total, ideally much smaller) to satisfy the automation criteria. Avoid applying identical changes across multiple similar files in the same PR if it risks pushing the diff size threshold.
