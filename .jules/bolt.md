## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.
## 2024-07-20 - Avoid chained flatMap().find() and flatMap().filter() on grouped data structures

**Learning:** When dealing with nested or grouped data structures (like `SessionGroup[]` where each group contains `Session[]`), chaining `.flatMap()` to flatten the arrays followed by `.find()` or `.filter()` causes the engine to allocate an entirely new flattened O(N) array in memory before performing the search. This introduces significant memory allocation overhead and multiple linear traversals.
**Action:** Instead of `flatMap().find()`, use nested loops or `groupedData.some(group => group.items.some(condition))` to allow for O(1) early bailout matching without pre-allocating a flattened array. For `.filter()`, use nested `.forEach()` loops and manually `.push()` matching items into a state array to perform the filtering in a single memory-efficient pass.
