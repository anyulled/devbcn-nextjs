## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-23 — O(1) Lookups inside filter loops
**Learning:** `Array.prototype.includes` within `Array.prototype.filter` or `.map` can create O(N*M) bottlenecks if the lookup array is sizable, negatively affecting JS execution time (especially on critical render paths for large lists like schedules).
**Action:** Always convert lookup arrays to `Set`s before array iteration and use `.has()` for O(1) checks. Ensure to place the `Set` initialization *outside* any loops. Also, be sure to clean up `.orig` files created by patch tools before committing.
