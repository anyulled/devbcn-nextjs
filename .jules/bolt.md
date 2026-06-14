## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-18 - Replacing Object.entries().find() with Direct Property Access

**Learning:** Finding properties on a small static object by using `Object.entries(obj).find(([key]) => key === target)` is an anti-pattern. It incurs the cost of creating an intermediate array of tuples and doing a linear search O(N), which is much slower and allocates more memory than a direct O(1) property lookup `obj[target]`.
**Action:** Always prefer direct property access with a type assertion `obj[target as keyof typeof obj]` over iterating `Object.entries` when the target key is known and the goal is simply to retrieve its value.
