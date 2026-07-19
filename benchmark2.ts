import { performance } from "perf_hooks";

// Mock data: 100 talks, target tag is deeply buried in talk 95
const talks = Array.from({ length: 100 }, (_, i) => ({
  id: i,
  tags: [
    `Tag ${i}-1`,
    `Tag ${i}-2`,
    i === 95 ? `target-tag` : `Tag ${i}-3`,
  ]
}));

function getTagsFromTalk(talk: any): string[] {
  return talk.tags;
}

const decodedTagLower = "target-tag";
const decodedTag = "Target Tag";
const ITERATIONS = 10000;

// BEFORE
function runBefore() {
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const displayTag = talks.flatMap(getTagsFromTalk).find((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTagLower) ?? decodedTag.replaceAll("-", " ");
  }
  return performance.now() - start;
}

// AFTER
function runAfter() {
  const start = performance.now();
  for (let i = 0; i < ITERATIONS; i++) {
    const matchingTalk = talks.find((talk) => getTagsFromTalk(talk).some((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTagLower));
    const displayTag = matchingTalk
      ? (getTagsFromTalk(matchingTalk).find((t) => t.replaceAll(" ", "-").toLowerCase() === decodedTagLower) ?? decodedTag.replaceAll("-", " "))
      : decodedTag.replaceAll("-", " ");
  }
  return performance.now() - start;
}

// Memory tracking wrapper
function trackMemory(fn: () => void, label: string) {
  if (global.gc) {
    global.gc(); // Force GC if exposed
  }
  const memBefore = process.memoryUsage().heapUsed;
  const timeBefore = performance.now();

  fn();

  const timeAfter = performance.now();
  const memAfter = process.memoryUsage().heapUsed;

  console.log(`[${label}] Time: ${(timeAfter - timeBefore).toFixed(2)}ms, Memory Allocated: ${((memAfter - memBefore) / 1024 / 1024).toFixed(2)} MB`);
}

trackMemory(runBefore, "Before");
trackMemory(runAfter, "After");
