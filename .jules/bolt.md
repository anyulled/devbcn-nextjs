## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-03-01 - Sitemap Generation Bottleneck

**Learning:** `app/sitemap.ts` generated the sitemap using an `O(N)` sequential loop where it awaited speaker and talk fetching for each year. This blocked the event loop and prolonged build time significantly as the number of years grew.
**Action:** When working on Server Actions or static generation functions like `sitemap`, replace sequential `await` calls inside loops with a `Promise.all` combined with array `.map` to fetch data in parallel. Ensure individual fetches are wrapped in `.catch()` to prevent one failure from breaking the whole process.
