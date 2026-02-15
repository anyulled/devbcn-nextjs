"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface SearchFilterProps {
  label?: string;
  placeholder?: string;
  className?: string;
}

export default function SearchFilter({ label = "Filter by Keyword:", placeholder = "Search by title or description...", className = "" }: SearchFilterProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query) {
        params.set("q", query);
      } else {
        params.delete("q");
      }

      const currentQ = searchParams.get("q") || "";
      if (currentQ !== query) {
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query, pathname, router, searchParams]);

  return (
    <div className={`blog-auhtor-details ${className}`}>
      <div className="search-area">
        {label && <h3 className="mb-4">{label}</h3>}
        <form onSubmit={(e) => e.preventDefault()}>
          <input id="talk-search" type="text" placeholder={placeholder} value={query} onChange={(e) => setQuery(e.target.value)} />
          <button type="submit" aria-label="Search">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
