## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-06-26 — Optimize getSpeakerByYearAndId with Map Lookups
**Learning:** In a codebase frequently querying speaker configurations (like via `getSpeakerByYearAndId`), standard array traversals via `.find()` introduce O(n) amortized overhead upon multiple lookups.
**Action:** Always wrap lists generated from repeated queries in a React `cache()` wrapped generic map generator (e.g. `const map = new Map(arr.map(a => [a.id, a]))`) to facilitate amortized O(1) property access.
