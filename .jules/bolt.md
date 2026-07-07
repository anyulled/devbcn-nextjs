## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2025-02-18 - Build index Map for O(1) lookups instead of multiple .find()

**Learning:** Using `.find()` in repeated lookups within loops or across repeated component mounts (like `getSpeakerByYearAndId`) creates O(N) linear search overhead each time. When looking up a single item in a large array by ID, this causes redundant processing and time spent traversing the same elements.
**Action:** Always build a Map (e.g. `new Map(items.map(item => [item.id, item]))`) wrapped in `cache()` (if it's a server function) once per list retrieval. Then, use `map.get(id)` for O(1) time complexity lookups instead of `.find()`.
