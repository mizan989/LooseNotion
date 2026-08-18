"use client";

import { useEffect } from "react";
import { useWorkspaceStore } from "@/stores/workspace-store";
import type { Page } from "@/types/page";

/** Hydrates the workspace store with pages fetched server-side. */
export function usePages(workspaceId: string, initialPages: Page[]) {
  const setWorkspaceId = useWorkspaceStore((s) => s.setWorkspaceId);
  const setPages = useWorkspaceStore((s) => s.setPages);
  const pages = useWorkspaceStore((s) => s.pages);

  useEffect(() => {
    setWorkspaceId(workspaceId);
    setPages(initialPages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [workspaceId]);

  return pages;
}
