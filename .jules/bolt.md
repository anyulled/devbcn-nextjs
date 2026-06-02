## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Parallelize generateStaticParams fetching

**Learning:** In Next.js applications, sequential data fetching (using `for...of` loops) inside build-critical functions like `generateStaticParams` significantly slows down static page generation. The bottleneck is amplified when fetching data across multiple parameters (e.g., archived years).
**Action:** Replace sequential `for...of` loops with parallel execution using `Promise.all(array.map(...))` to fetch data concurrently. Preserve per-item `try/catch` blocks inside the map callback to prevent a single item's failure from prematurely failing the entire batch, returning an empty array `[]` as a fallback, and then use `.flat()` on the resulting nested array structure.
