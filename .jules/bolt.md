## 2025-05-20 — Schedule Filter Optimization

**Learning:** Found a common anti-pattern where `Array.prototype.includes()` was used inside `Array.prototype.filter()`, leading to O(N\*M) time complexity when filtering large session arrays based on user saved IDs.
**Action:** Always convert lookup arrays to a `Set` outside the loop and use `Set.has()` for O(1) membership checks inside loops to achieve O(N+M) time complexity.
