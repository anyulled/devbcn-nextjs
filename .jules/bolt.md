## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-05-19 - Replace O(N) array spreads for object map lookup with O(1) Property Access

**Learning:** In the Next.js `lib/shared/navigation.ts`, using `Object.entries(data).find(([key]) => key === expectedKey)?.[1]` to perform property lookups is highly inefficient. It allocates a new array of key-value pairs (O(N) memory and runtime) and linearly searches them on every navigation evaluation.
**Action:** Replace `Object.entries(data).find(...)` with O(1) direct property access `data[expectedKey as keyof typeof data]`. This removes the overhead of array allocation, stops unnecessary garbage collection during critical navigation rendering paths, and properly casts the type for TS and the `security/detect-object-injection` lint rule.
