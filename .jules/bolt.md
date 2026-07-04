## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-04 — Parallelizing generateStaticParams

**Learning:** In Next.js applications, using sequential await for data fetching inside `generateStaticParams` significantly delays build times. Furthermore, chaining `.flatMap().map()` or similar operations introduces unnecessary O(N) memory allocation.
**Action:** Parallelize top-level data fetching via `Promise.all()` combined with `array.map()` and replace intermediate arrays with nested loops to decrease memory overhead and improve generation time.
