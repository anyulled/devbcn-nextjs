## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-29 - Parallelize generateStaticParams fetching

**Learning:** In Next.js applications, `generateStaticParams` often runs multiple asynchronous data fetches sequentially in loops (e.g., iterating through event years). This acts as a bottleneck during static site generation (SSG). Refactoring loops (`for...of`) to use `Promise.all` with `Array.map()` drastically speeds up generation times.
**Action:** When working on SSG pages or routes mapped to multiple dynamic parameters, utilize `Promise.all(array.map(async (item) => ...))` alongside `.flat()` to safely aggregate data in parallel instead of sequentially iterating. Ensure that try/catch blocks are contained within the loop elements so a single failed item doesn't prematurely crash the entire concurrent batch.
