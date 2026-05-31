## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-31 - Optimize Next.js static generation builds with parallel data fetching

**Learning:** Sequential `for...of` loops used for fetching dynamic page dependencies inside Next.js build-time functions like `generateStaticParams` (or `sitemap.ts`) block the thread and significantly increase total site build duration.
**Action:** When gathering parameters for static routes across large array sets (such as mapping years or categories), replace sequential `for...of` iteration with parallel execution using `Promise.all(array.map(...))`. Then, correctly aggregate nested outputs utilizing `.flat()` or `.flatMap()`, and preserve per-item `try/catch` fallbacks to prevent a single item failure from crashing the entire batch build.
