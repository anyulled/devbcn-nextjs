## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-18 - Avoid repeated array filtering/finding for speaker lookups

**Learning:** In Next.js/React applications, when looking up items (like speakers for a talk) by ID repeatedly, using  or  inside loops or hot paths causes unnecessary O(N) array traversals per lookup. This is especially problematic when mapping over hundreds of talks.
**Action:** Always build an O(1) lookup Map wrapped in React's `cache()` (e.g., `new Map(items.map(i => [i.id, i]))`). This ensures the map is only built once per request, and subsequent lookups are instant.
## 2024-05-18 - Avoid repeated array filtering/finding for speaker lookups

**Learning:** In Next.js/React applications, when looking up items (like speakers for a talk) by ID repeatedly, using `.find()` or `.filter()` inside loops or hot paths causes unnecessary O(N) array traversals per lookup. This is especially problematic when mapping over hundreds of talks.
**Action:** Always build an O(1) lookup Map wrapped in React's `cache()` (e.g., `new Map(items.map(i => [i.id, i]))`). This ensures the map is only built once per request, and subsequent lookups are instant.
