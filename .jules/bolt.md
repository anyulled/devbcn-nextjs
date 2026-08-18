## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).

## 2026-07-06 - Avoid Object.entries().find() for simple key lookups

**Learning:** Using `Object.entries(obj).find(([key]) => key === target)` creates O(N) array allocations for the entries and traverses them linearly just to do a simple property lookup. This adds unnecessary memory allocation overhead and Garbage Collection.
**Action:** Use direct property lookup instead: `Object.prototype.hasOwnProperty.call(obj, target) ? obj[target as keyof typeof obj] : undefined`. This maintains O(1) performance while satisfying `security/detect-object-injection` linting rules.

## 2024-05-19 - Provide Concrete Benchmark Evidence in PR Descriptions

**Learning:** When detailing performance improvements in PR descriptions (e.g., for the 'Bolt' persona), the 'Impact' and 'Measurement' sections must include concrete, empirical benchmark numbers (e.g., execution time differences like '222ms vs 0.5ms'). Providing only theoretical algorithmic complexity improvements (like 'O(N) to O(1)') without real performance data will cause the PR to be rejected.
**Action:** Always include a local Node.js benchmark script in your exploration phase to collect real execution times. Include these specific numbers in the 📊 Impact and 🔬 Measurement sections of your PR description.
