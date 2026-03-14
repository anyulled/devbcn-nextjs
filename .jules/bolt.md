## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-02-01 - Ken Burns Animation Optimization

**Learning:** When using resource-intensive CSS animations (e.g., Ken Burns effect) in a Swiper carousel, avoid tracking the active slide state in React (`onSlideChange`) to apply conditional classes. This causes redundant re-renders of the entire carousel and degrades performance.
**Action:** Always scope the animation via pure CSS using Swiper's native classes (e.g., `.swiper-slide-active &`, `.swiper-slide-prev &`, `.swiper-slide-duplicate-active &`) to ensure only visible slides are animated without any JavaScript overhead.
