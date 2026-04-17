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

## 2026-03-22 - Parallelizing Build-Time Data Fetching

**Learning:** Data fetching loops (`for...of`) inside Next.js `generateStaticParams` and `sitemap.ts` were blocking and executed sequentially, artificially inflating static build times. Refactoring these to use `Promise.all` with `Array.map` significantly reduces execution time (e.g., from ~5s down to ~1.4s for `sitemap.ts`).
**Action:** Always prefer `await Promise.all(array.map(async (item) => {...}))` over sequential `for...of` loops when fetching external API data for static generation, and remember to use `.flat()` to process the resulting array of arrays.
