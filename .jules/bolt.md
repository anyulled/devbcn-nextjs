## 2026-02-01 - Hidden CSS Images

**Learning:** Found critical hero images being loaded via CSS `background-image` in React components, bypassing Next.js image optimization.
**Action:** grep for `style={{.*backgroundImage.*url` or `url(` in components to find hidden unoptimized images.

## 2026-02-01 - Package Lock Noise

**Learning:** `package-lock.json` generated massive diffs (removing dev dependencies like `webpack`) during `npm install`. This indicates environment mismatch.
**Action:** When working on small optimizations, always verify `package-lock.json` diffs and revert them if they include unrelated changes, to avoid breaking the build.

## 2026-02-01 - Client-Side Fetching Anti-Pattern in App Router

**Learning:** Found `useEffect` fetching static content (Speakers) in a Client Component (`Section5`) on the homepage. This caused unnecessary layout shifts and delayed LCP.
**Action:** Move data fetching to the parent Server Component (`page.tsx`) and pass data as props. This leverages ISR caching and eliminates client-side waterfall.

## 2026-03-17 - Scroll Event Listener Anti-Pattern

**Learning:** Found multiple instances of `scroll` event listeners attached to the `window` or `document` object without debouncing or throttling. These events can trigger frequently and block the main thread.
**Action:** When adding scroll event listeners, use `{ passive: true }` options and throttle execution using `requestAnimationFrame` to prevent main-thread blocking. Ensure local state variables used for throttling are wrapped in a constant object to satisfy ESLint `no-restricted-syntax`.
