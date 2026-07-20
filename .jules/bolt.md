## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-03-24 — [Next.js Build Parallelization with Nested Array Traversal Optimization]

**Learning:** When using Next.js build-time functions like `generateStaticParams` and `generateMetadata` with complex nested data structures (e.g. `allTalks.flatMap(getTagsFromTalk).find(...)`), redundant full-array flat-mapping and repeated lowercasing of search strings inside the callbacks can significantly inflate memory usage and processing time, leading to O(N) traversals per request.
**Action:** Always pre-compute invariant strings (like lowercasing the target tag) outside the loop. Use a combination of `.find()` with `.some()` (e.g., `allTalks.find(talk => getTagsFromTalk(talk).some(...))`) to lazily locate matching parents without instantiating massive flattened child arrays, thereby optimizing React Server Components and build-time metadata generation.
