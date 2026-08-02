## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-11-20 - Avoid array.flatMap().find() pattern for nested lookups

**Learning:** When searching for an item within nested structures (e.g., finding a matching tag in an array of talks), chaining `.flatMap()` to flatten the arrays followed by `.find()` causes unnecessary memory allocation and full-array traversal, leading to performance bottlenecks during static generation.
**Action:** Use `.find()` combined with `.some()` (or `.filter()` followed by index access) to immutably locate the parent element without flattening, then extract the required child value, preventing redundant memory allocations and full-array traversals while adhering to `no-restricted-syntax`.
