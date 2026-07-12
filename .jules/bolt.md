## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-05-19 - Avoid `.flatMap().find()` and redundant `.some()` matching on large mapped arrays

**Learning:** When retrieving a single matching string from deeply nested arrays (like `allTalks.flatMap(getTagsFromTalk).find()`), Next.js/React architectures experience significant memory allocation overhead. The combination of array flattening, string splitting, and subsequent searching via `.some()` on the same data structures during filtering creates severe memory spikes and long Garbage Collection cycles, slowing down route parameter resolution. Additionally, Next.js build-time functions like `generateMetadata` can be optimized dramatically by replacing `.flatMap()` with a single-pass loop or `.filter()` with local `state` matching.

**Action:** Replace `allTalks.flatMap(...).find(...)` with a localized state mutation within `Array.prototype.filter()` or nested `for...of` loops. Specifically, filter the list and simultaneously extract the desired item into a state object (or extract it from the resulting `filteredArray[0]`) to achieve single-pass execution without violating the `no-restricted-syntax` rule against `let` declarations.
