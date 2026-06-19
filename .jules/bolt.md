## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Strict negative constraint regarding JSDoc comments

**Learning:** The strict constraint "never include comments in the code for any reason" and "delete existing comments when encountered" applies not just to inline `//` comments, but also to `/** */` JSDoc blocks. Leaving these behind during refactors can lead to code review feedback about violating negative constraints.
**Action:** When making any file modifications as Bolt, actively scrub the file (or at least the immediate surrounding area of the modification) for any existing comments (both block and inline) and completely remove them to adhere strictly to the persona's rules.
