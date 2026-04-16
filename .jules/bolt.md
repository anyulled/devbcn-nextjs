## 2024-04-16 - Sitemap Generation Parallelization
**Learning:** The `app/sitemap.ts` file iteratively generated static routing rules sequentially for each available year, awaiting data retrieval individually. This resulted in compounding delay blocks proportional to the number of years requested.
**Action:** Parallelize outer loops referencing asynchronous functions in standalone build scripts or API routes leveraging `Promise.all` across array mappings (`await Promise.all(years.map(async (year) => { ... }))`), specifically avoiding chained sequence loops `for (const x of xs) await ...`.
