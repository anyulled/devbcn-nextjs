## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-05-18 - Optimize array lookups with Maps in Next.js Server Components

**Learning:** When repeatedly looking up items in an array by ID across multiple Next.js Server Components, a linear `Array.prototype.find()` creates unnecessary O(N) operations per lookup. Creating a `Map` provides O(1) lookups, but creating the map itself takes O(N) time.
**Action:** Wrap the Map generation function (e.g., `getSpeakersMap`) in React's `cache()` so the O(N) initialization cost is paid only once per request lifecycle, allowing all subsequent lookups during that request to run in O(1) time.
