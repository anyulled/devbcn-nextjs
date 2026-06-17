## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-18 - Replacing Object.entries().find() with Direct Property Access

**Learning:** When retrieving a value from an object based on a matching key, using `Object.entries(obj).find(([key]) => key === target)?.[1]` introduces unnecessary array allocations and linear search overhead. This is particularly harmful inside frequently executed loops or filter functions.
**Action:** Replace `Object.entries(obj).find()` loops with direct `obj[target]` property access (O(1) time complexity) whenever possible. Cast the key using `as keyof typeof obj` if TypeScript enforces strict key constraints.
