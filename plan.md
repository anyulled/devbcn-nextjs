1. **Optimize Tag Lookup in `app/[year]/tags/[tag]/page.tsx` and `app/2026/tags/[tag]/page.tsx`**
   - In both page files (`app/[year]/tags/[tag]/page.tsx` and `app/2026/tags/[tag]/page.tsx`), the current implementation uses multiple array operations inside a loop (`allTalks.filter`, `allTalks.flatMap(getTagsFromTalk).find`, `talkTags.some`) resulting in redundant iterations over `allTalks` and redundant string operations (`replaceAll`, `toLowerCase`).
   - I will replace the redundant operations with a single `for...of` loop over `allTalks` that finds both `displayTag` and builds `filteredTalks` in a single pass. This improves time complexity and reduces string allocations.

2. **Verify changes**
   - Check if `app/[year]/tags/[tag]/page.tsx` and `app/2026/tags/[tag]/page.tsx` have been updated correctly using `cat` and check if the tests still pass (`npm run test` and `npm run lint`).
   - Ensure the Next.js app builds properly (`npm run build`).

3. **Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.**

4. **Submit the PR**
   - Create a PR with the title 'feat: [performance improvement]'
   - Include 💡 What, 🎯 Why, 📊 Impact, and 🔬 Measurement sections in the description detailing the reduction in string and array operations.
