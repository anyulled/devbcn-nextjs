## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Replace O(N) array find over Object.entries with O(1) object lookup

**Learning:** When retrieving a value from an object based on a key matching a string, using `Object.entries(obj).find(([k]) => k === target)?.[1]` creates an unnecessary array of all key-value pairs (O(N) memory and time) and performs a linear search (O(N) time).
**Action:** Always use direct object property access `obj[target as keyof typeof obj]` for O(1) time and space complexity, which is significantly faster and cleaner.
