## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
## 2024-05-25 - Avoid array includes inside array filter operations

**Learning:** In Next.js/React applications, when filtering a list of items based on their presence in another array (e.g., `savedSessionIds.includes(s.id)` inside a `filter` function), it leads to an O(N * M) time complexity. This can cause performance bottlenecks and block the main thread, especially if the arrays are large.
**Action:** Convert the lookup array into a `Set` before the filtering loop. Use `set.has(id)` inside the `filter` function to achieve O(N + M) time complexity.
