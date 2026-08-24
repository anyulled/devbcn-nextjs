## 2024-08-23 - Optimize extraction with limit via early break

**Learning:** When extracting a small, limited number of items from a large dataset, avoid using chained methods like `.filter(condition).slice(0, limit)`. This forces a full array traversal and allocates a discarded intermediate array.
**Action:** Use a standard `for...of` loop with a `break` statement to exit early once the limit is reached.
