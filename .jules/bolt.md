## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-03-18 - Immutability constraints over performance in grouping loops

**Learning:** When attempting to optimize an O(N^2) array spread operation (`[...existing, talk]`) inside a grouping loop in `groupTalksByTrack`, the purely functional/immutable constraint specified by the team (and the lack of `Map.groupBy` support in Node 20.x Jest environments) means that we must fall back to immutable reductions.
**Action:** When constraints require strict immutability without mutation of objects, use `reduce` with object and array spreads (e.g., `{ ...acc, [key]: [...(acc[key] || []), item] }`) even if it introduces O(N^2) overhead for large arrays. Avoid using `push()` or modifying accumulators directly. Always run Prettier/formatting checks before merge to resolve CI failures.

## 2025-05-18 - Build-Time Parallel Data Fetching & Error Propagation

**Learning:** During static generation or sitemap generation, sequential fetching inside `for...of` loops severely impacts build performance. However, when refactoring to use `Promise.all` for concurrent fetching, it is critical NOT to swallow errors (e.g. by adding `.catch(() => [])` or leaving unhandled promise rejections). Swallowing these errors leads to silently missing dynamic pages (like talk or speaker pages) instead of properly failing the build when an API or dependency is down.
**Action:** Use `Promise.all` to parallelize data fetching in build scripts, and ensure the `.map` is wrapped in a `try/catch` that explicitly `throw error;` so build-time failures are visible and fail correctly.

## 2025-05-18 - Promise Error Propagation

**Learning:** When using `await Promise.all()` inside an `async` function, explicitly catching and rethrowing the error is redundant (e.g. `try { await Promise.all() } catch(e) { throw e; }`) because unhandled rejected promises automatically propagate up to the caller in async contexts.
**Action:** Avoid using `try/catch` wrappers purely for rethrowing errors when using `await`; let the rejection propagate naturally.
