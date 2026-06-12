## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2025-02-12 — Avoid multiple array `.find()` lookups per render loop

**Learning:** When needing to extract multiple specific properties from an array of objects during a React render (e.g., matching social media link URLs by their `linkType`), using sequential `array.find(item => item.type === "X")` calls per render loop forces redundant O(N) array iterations. Calling this multiple times per render (e.g., 8 times per `SpeakerCard`) is highly inefficient and creates unnecessary CPU overhead.
**Action:** Replace multiple `.find()` lookups with a single O(N) iteration that builds a mapping object (e.g., using `Array.prototype.reduce`), enabling O(1) property access for the remainder of the render loop.
