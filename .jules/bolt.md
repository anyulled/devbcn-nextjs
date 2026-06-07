## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-19 - Avoid redundant array string mapping in filtering loops

**Learning:** When matching string parameters (like a slugified `tag`) against an array of objects where each object contains an array of strings (like `tags`), pulling the parameter transformation (`decodedTag.toLowerCase()`) out of the loop and using `reduce` or localized `for...of` loops prevents O(N*M) redundant string `.toLowerCase()` and `.replaceAll()` reallocations and improves both rendering and static site generation performance.
**Action:** When filtering objects by matching sub-properties against a parameter, extract the invariant transformation logic from the loop, and try to construct the derived `displayTag` variable and the `filteredTalks` array in a single loop traversal.
