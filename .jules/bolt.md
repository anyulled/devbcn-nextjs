## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-18 - Optimize generateStaticParams with Promise.all

**Learning:** In Next.js applications, sequential data fetching inside `generateStaticParams` (e.g., using `for...of` loops over an array of years) blocks the build process. Next.js statically builds pages in parallel, but fetching the paths shouldn't be a bottleneck.
**Action:** Always map over the independent data (like years) and use `Promise.all` to fetch the parameters in parallel. Retain the per-item `try/catch` inside the map to gracefully return empty arrays for failed items without failing the entire batch, and finish with `.flat()` to combine the parameter arrays.
