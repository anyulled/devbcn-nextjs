## 2024-05-18 - Avoid array spreads inside loops for Map grouping

**Learning:** In Next.js/React applications, when grouping items (like schedules or talks) into a `Map` where the values are arrays, using the array spread operator `[...existing, item]` inside a loop (like `forEach` or `map`) causes amortized O(N^2) memory allocations and unnecessary Garbage Collection overhead.
**Action:** Always use `.push()` on the existing array reference if the data structure permits local mutation. For strict ESLint configurations enforcing `no-restricted-syntax`, extract the existing array, push to it, and handle the fallback elegantly (`if (!existing) { map.set(key, [item]); } else { existing.push(item); }`).
## 2024-05-18 - Avoid npm install in sandbox
**Learning:** Running `npm install --legacy-peer-deps` instead of `npm ci --legacy-peer-deps` in the sandbox environment can lead to destructive modifications to `package-lock.json`, stripping out critical build dependencies like Webpack and ESLint plugins, which causes downstream linting and build failures.
**Action:** Always strictly use `npm ci --legacy-peer-deps` to safely install dependencies without mutating the lockfile. If accidental changes to lockfiles occur, run `git restore package-lock.json package.json`.
