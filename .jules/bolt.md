## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-01 - Refactoring array iteration side effects

**Learning:** Mutating an external state object inside an array iteration method (like `.filter()` or `.some()`) violates immutable coding principles and reduces readability, even if it safely calculates a derived value in fewer iterations.
**Action:** Extract derived values from the final _filtered_ array instead of relying on side effects during iteration, particularly when enforcing strict no-mutation boundaries in performance improvements.
