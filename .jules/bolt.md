## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-18 - Avoid flatMap().find() chains for performance

**Learning:** In Next.js/React applications, when iterating over large datasets to find a specific match, chaining `.flatMap()` followed by `.find()` causes O(N) intermediate array allocations and full N-length traversals, leading to significant memory bloat and garbage collection overhead.
**Action:** Replace `array.flatMap(mapFn).find(findFn)` patterns with a state-mutating nested `.some()` or `for...of` loop. This avoids intermediate arrays entirely and enables a true early-breakout when a match is found.
