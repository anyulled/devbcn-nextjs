## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2026-11-20 - Avoid flatMap().find() for O(N^2) parent-child lookups

**Learning:** Using `array.flatMap(fn).find()` creates intermediate arrays and traverses all child items across all parents, which is inefficient and leads to O(N^2) memory bloat and garbage collection overhead, especially in data-heavy tasks like `generateStaticParams`.
**Action:** Use an optimized search. For strict `no-restricted-syntax` environments (no `let`), use `array.find(parent => parent.children.some(condition))` to immutably locate the parent element, then extract the needed child value directly.
