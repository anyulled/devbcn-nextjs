## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-02-01 - Sequential Data Fetching in Static Generation

**Learning:** Found sequential asynchronous loops inside `generateStaticParams` across multiple dynamic route segments (e.g. `[year]/talks/[talkId]/page.tsx`, `[year]/speakers/[speakerId]/page.tsx`). Iterating over a list of editions and awaiting data for each year one by one significantly delays static site generation (SSG) at build time.
**Action:** Always use `Promise.all` wrapped over an array `map` operation to parallelize independent data fetching operations across segments (like years or categories) in `generateStaticParams` or other build-time data preparation scripts. Make sure to map failures to empty arrays or valid fallbacks so a single failure doesn't break the entire parallel operation.
