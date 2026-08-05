## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-05-18 - Avoid flatMap().find() for single property lookups

**Learning:** When searching for an item that matches a condition in nested arrays, using `array.flatMap(mapFn).find(findFn)` is an anti-pattern. `flatMap` iterates the entire array and allocates a completely new flattened array before `find` even begins its search. This causes O(N) memory allocations and full array traversal overhead even if the target item is at the very beginning of the collection.
**Action:** Use a combination of `.find()` and `.some()` (e.g., `array.find(item => getNested(item).some(condition))`) to allow the engine to short-circuit the execution the moment it finds a match, avoiding unnecessary processing and large array allocations.
