## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-18 - Single-Pass Iteration for Display Elements

**Learning:** When generating page metadata or filtering elements by a URL parameter, it is common to perform an O(N) traversal (like `.flatMap(...).find(...)`) to find a valid display string, and then perform a second O(N) pass to filter the elements. This causes redundant string allocations and nested iterations.
**Action:** Always combine lookup iterations into the primary filtering loop if possible. To maintain strict `no-restricted-syntax` rules that forbid `let` declarations while mutating local tracking variables inside a `.some()` or `.filter()` loop, utilize a `const state = { displayTag?: string }` object and assign values to it when matches are found. This allows safe, early-breaking single-pass algorithms.
