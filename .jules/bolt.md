## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Avoid flatMap and find for deep tag lookups in large datasets

**Learning:** When searching for a specific item in nested arrays (like finding a specific tag across all talks), using `allTalks.flatMap(getTags).find(...)` creates unnecessary intermediate arrays and forces multiple full O(N) traversals. This is particularly slow during build-time operations like `generateStaticParams` or tag pages rendering with many talks.
**Action:** Use nested `for...of` loops (or `.some()` with early return and state accumulation) to do a single-pass O(N) search with early breakout to minimize Garbage Collection overhead and CPU cycles.
