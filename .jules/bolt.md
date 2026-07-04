## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Avoid array flatMap followed by find for single item lookups in Next.js

**Learning:** Using `array.flatMap(mapFn).find(...)` to locate a specific item across nested structures (like tags inside talks) forces a full traversal and memory allocation of the entire mapped array, resulting in O(N) memory complexity and unnecessary CPU cycles.
**Action:** Replace `flatMap().find(...)` with `array.find(item => item.children.some(...))` to enable early breakout. Then extract the specific child from the matched item. This reduces memory footprint to O(1) and significantly speeds up execution by avoiding full-array mapping and traversal. Also, always hoist invariant operations like `.toLowerCase()` outside the iteration logic.
