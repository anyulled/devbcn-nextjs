## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-18 - Avoid Object.entries().find() for O(1) Object property lookups

**Learning:** When retrieving a value from an object (`Record<string, unknown>`) dynamically by a key, using `Object.entries(obj).find(([k]) => k === target)?.[1]` creates an array of all entries (allocating memory) and performs an $O(N)$ linear search. This introduces unnecessary Garbage Collection overhead and slows execution, especially in functions mapping over arrays.
**Action:** Replace it with direct object property access using `obj[target as keyof typeof obj]`. This is an $O(1)$ operation that avoids array allocation and linear searching.
