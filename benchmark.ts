import { performance } from "perf_hooks";

// Mock data
const talks = Array.from({ length: 500 }, (_, i) => ({
  id: i,
  tags: [
    `Tag ${i % 50}`,
    `Another Tag ${i % 30}`,
    `Target Tag`
  ]
}));

function getTagsFromTalk(talk: any): string[] {
  return talk.tags;
}

const decodedTagLower = "target tag";
const decodedTag = "Target Tag";

// BEFORE
function runBefore() {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    const displayTag = talks.flatMap(getTagsFromTalk).find((t) => t.toLowerCase() === decodedTagLower) ?? decodedTag;
  }
  return performance.now() - start;
}

// AFTER
function runAfter() {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    let displayTag = decodedTag;
    for (const talk of talks) {
      const foundTag = getTagsFromTalk(talk).find((t) => t.toLowerCase() === decodedTagLower);
      if (foundTag) {
        displayTag = foundTag;
        break;
      }
    }
  }
  return performance.now() - start;
}

// AFTER (optimized filter version)
function runAfterOptimized() {
  const start = performance.now();
  for (let i = 0; i < 1000; i++) {
    const filteredTalks = talks.filter((talk) =>
      getTagsFromTalk(talk).some((t) => t.toLowerCase() === decodedTagLower)
    );

    const displayTag = filteredTalks[0]
      ? (getTagsFromTalk(filteredTalks[0]).find((t) => t.toLowerCase() === decodedTagLower) ?? decodedTag)
      : decodedTag;
  }
  return performance.now() - start;
}

console.log("Before: ", runBefore().toFixed(2), "ms");
console.log("After (optimized): ", runAfterOptimized().toFixed(2), "ms");
