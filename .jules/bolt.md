## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2026-07-13 - Avoid flatMap followed by find for string matching in loops

**Learning:** Using `array.flatMap(fn).find(fn)` pattern inside a page component to find a specific string match across nested arrays (like finding a matching tag for a talk) creates unnecessary full array traversals and string allocations, especially when dealing with large datasets during build time (e.g. `generateMetadata` or page rendering). This causes O(N\*M) string replacements and allocations.
**Action:** Use a nested `for...of` loop or `.find()` with `.some()` internally to allow for early break/return as soon as the match is found, eliminating unnecessary array flattening and string manipulation overhead.
