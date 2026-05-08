## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-20 - Optimizing multiple iterations with Map/Set or state objects

**Learning:** When filtering large arrays to derive multiple outputs (e.g., finding a display name matching a certain casing AND returning the filtered list), developers often write multiple sequential array operations (`.find()` followed by `.filter()`). This leads to redundant iterations and duplicated logic (like `.toLowerCase()` computations). In strict ESLint configs where `let` is forbidden, developers avoid single-pass iterations because accumulating results feels cumbersome without mutable variables.
**Action:** Use a `const state = { displayValue: fallback, filteredList: [] }` object and a single `.forEach()` loop to build multiple results simultaneously. This avoids the `no-restricted-syntax` lint error for `let`, halves the iteration overhead, and guarantees that expensive intermediate computations (like string replacements or case conversions) only happen once per item.
