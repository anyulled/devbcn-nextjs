"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  // Debounced update of the URL
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      // Update URL only if it changed to avoid unnecessary history entries
      const currentQ = searchParams.get("q") || "";
      if (currentQ !== query) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timer);
  }, [query, pathname, router, searchParams]);

  return (
    <div className="search-filter">
      <label htmlFor="talk-search" className="search-filter-label">
        Filter by Keyword:
      </label>
      <div className="search-input-wrapper">
        <input
          id="talk-search"
          type="text"
          placeholder="Search by title or description..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="search-filter-input"
        />
        {query && (
          <button className="search-clear-btn" onClick={() => setQuery("")} aria-label="Clear search">
            ×
          </button>
        )}
      </div>
    </div>
  );
}
