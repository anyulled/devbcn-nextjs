## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2025-02-23 - Optimize multiple traversals on same datasets

**Learning:** In Next.js SSG metadata and page generation (like `app/[year]/tags/[tag]/page.tsx`), when doing filtering operations on an array of objects to get multiple subsets of data or metadata, finding a match through multiple `flatMap` and `.find` and `filter` array iterations introduces unneeded O(N) traversal overhead.
**Action:** Instead of running the same string manipulations and `.some` callback validations, combine the logic to reuse variables. E.g. hoisting `decodedTag.toLowerCase()` out of the filter block, and for finding a title tag for metadata display, extract it from `filteredTalks[0]` instead of traversing the whole original list again. Ensure `.find` is used instead of `.filter` when expecting one item or when only caring about the first match to allow short-circuiting.
