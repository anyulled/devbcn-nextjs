## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2026-07-07 - Avoid redundant string operations and full array traversal in find/filter

**Learning:** When searching for an element in an array and filtering items, calling `.toLowerCase()` or `.replaceAll()` on the target string inside the loop creates redundant string allocations. Additionally, chaining `.flatMap().find()` traverses the entire array, whereas `.some()` with a state object allows for O(1) early breakout while safely adhering to \`no-restricted-syntax\` (no \`let\`) rules.
**Action:** Pre-calculate target variables outside the loop. Avoid \`.flatMap().find()\` in favor of nested \`some()\` with an external state object to safely store the found item and exit early, without mutating an outer variable directly.
