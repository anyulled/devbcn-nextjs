## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-18 - Use Promise.all to parallelize generateStaticParams fetching

**Learning:** Next.js build performance is highly sensitive to synchronous I/O operations inside `generateStaticParams`. A sequential `for...of` loop over multiple archived editions for fetching talks, speakers, or tags can significantly slow down static generation and sitemap rendering times.
**Action:** Always refactor sequential iteration logic over external/database queries in build steps to parallel promises using `Promise.all(array.map(async (item) => { ... }))`. Make sure to retain per-item internal `try/catch` fallbacks to avoid premature build crashes on a single missing parameter item. Ensure to `.flat()` the arrays before returning.
