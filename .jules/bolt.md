## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-05-18 - Replacing Object.entries() map + spread with direct push

**Learning:** Using `...sponsorsList.map(...)` inside an array `.push()` creates unnecessary intermediate array allocations and risks "Maximum call stack size exceeded" for very large lists. Using `Object.entries(sponsorsData)` also incurs an `O(N)` array allocation.
**Action:** Use a `for...of` loop with `Object.entries()` (or standard `for...in` + `hasOwnProperty`) and push items individually to the accumulator array to optimize memory overhead.

## 2024-05-18 - Optimizing deep lookups instead of flatMap

**Learning:** Using `array.flatMap(fn).find(fn)` allocates a massive temporary array unnecessarily, consuming memory.
**Action:** Use `array.find(item => item.children.some(fn))` to lazily short-circuit lookups without allocating a flattened intermediate array, minimizing memory consumption and garbage collection overhead.
