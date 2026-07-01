## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2024-06-24 - O(N) Array finds in React Hooks

**Learning:** In React components or utility functions (like `lib/shared/navigation.ts`), using `Object.entries(obj).find(([key]) => key === target)?.[1]` to retrieve a value from a lookup object causes unnecessary O(N) array allocation (`Object.entries()`) and linear search overhead.
**Action:** Replace `Object.entries(obj).find()` with direct O(1) property access `obj[target as keyof typeof obj]`. This avoids both array allocation and search iteration, executing significantly faster and producing less garbage collection overhead.
