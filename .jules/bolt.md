## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2025-07-02 — O(N) Object.entries() to O(1) Property Access in Navigation

**Learning:** `Object.entries(obj).find(([key]) => key === target)?.[1]` is a common pattern in the codebase but creates an O(N) bottleneck, particularly when fetching navigation or conditions dynamically where it is called for every nav item. TypeScript sometimes forces this pattern for type safety, but asserting the object as a `Record` safely circumvents it.
**Action:** Replace `Object.entries().find()` with direct property access like `(obj as Record<string, T>)[target]` whenever key lookups are performed dynamically on known objects, removing O(N) linear search overhead and array allocation.
