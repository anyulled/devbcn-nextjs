## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-03-05 - Sitemap Promise.all Performance

**Learning:** The previous implementation used sequential `await` loops to fetch speaker and talk data for all years when generating the sitemap. This resulted in O(N) network requests.

**Action:** Replaced `for...of` loops with `Promise.all()` and `.map()` to fetch years and speakers/talks in parallel (O(1) batches), and added `.catch(() => [])` to prevent isolated API failures from breaking the entire build step. This change significantly improved page generation speeds during `next build`.
