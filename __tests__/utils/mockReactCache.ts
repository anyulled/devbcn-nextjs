
export const createMockCache = () => {
  const cacheMaps: Map<any, any>[] = [];

  const mockedCache = (fn: Function) => {
    const cacheMap = new Map();
    cacheMaps.push(cacheMap);
    return function (...args: any[]) {
      const key = JSON.stringify(args);
      if (cacheMap.has(key)) {
        return cacheMap.get(key);
      }
      const result = fn(...args);
      cacheMap.set(key, result);
      return result;
    };
  };

  // Attach a helper to clear the caches
  (mockedCache as any)._reset = () => {
    cacheMaps.forEach((map) => {
      map.clear();
    });
  };

  return mockedCache;
};
