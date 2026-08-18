"use client";

import { useEffect, useState } from "react";
import type { Page } from "@/types/page";

export interface SearchResult {
  pageId: string;
  title: string;
  icon: string | null;
}

/** Client-side title search plus a debounced call out to full-content search. */
export function useSearch(pages: Page[], query: string) {
  const [contentMatches, setContentMatches] = useState<SearchResult[]>([]);

  const titleMatches: SearchResult[] = pages
    .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
    .map((p) => ({ pageId: p.id, title: p.title, icon: p.icon }));

  useEffect(() => {
    if (!query) {
      setContentMatches([]);
      return;
    }
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/pages?search=${encodeURIComponent(query)}`);
        if (!res.ok) return;
        const data = await res.json();
        setContentMatches(data.results ?? []);
      } catch {
        setContentMatches([]);
      }
    }, 250);
    return () => clearTimeout(timeout);
  }, [query]);

  const seen = new Set(titleMatches.map((m) => m.pageId));
  const merged = [...titleMatches, ...contentMatches.filter((m) => !seen.has(m.pageId))];

  return merged.slice(0, 20);
}
