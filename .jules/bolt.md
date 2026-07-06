## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Parallelize next build generateStaticParams

**Learning:** When `generateStaticParams` uses a sequential `for...of` loop to iterate over multiple parameters (like event years) and fetches external data, it forces Next.js to wait sequentially for each fetch to finish before starting the next. This creates a significant, O(N) performance bottleneck during the build step.
**Action:** Replace sequential `for...of` loops with `await Promise.all(items.map(async (item) => { ... }))`. By mapping each item into an async data-fetching promise, Next.js executes the requests concurrently, resulting in significantly faster build times. Always make sure to preserve per-item `try/catch` fallbacks to avoid failing the entire batch if a single item errors.
