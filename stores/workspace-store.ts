import { create } from "zustand";
import type { Page } from "@/types/page";

interface WorkspaceState {
  workspaceId: string | null;
  pages: Page[];
  recentPageIds: string[];
  setWorkspaceId: (id: string) => void;
  setPages: (pages: Page[]) => void;
  upsertPage: (page: Page) => void;
  removePage: (pageId: string) => void;
  visitPage: (pageId: string) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set, get) => ({
  workspaceId: null,
  pages: [],
  recentPageIds: [],
  setWorkspaceId: (id) => set({ workspaceId: id }),
  setPages: (pages) => set({ pages }),
  upsertPage: (page) => {
    const existing = get().pages;
    const idx = existing.findIndex((p) => p.id === page.id);
    const next = [...existing];
    if (idx >= 0) next[idx] = page;
    else next.push(page);
    set({ pages: next });
  },
  removePage: (pageId) => set({ pages: get().pages.filter((p) => p.id !== pageId) }),
  visitPage: (pageId) => {
    const next = [pageId, ...get().recentPageIds.filter((id) => id !== pageId)].slice(0, 8);
    set({ recentPageIds: next });
  },
}));
