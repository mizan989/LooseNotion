import { create } from "zustand";

interface SidebarState {
  isOpen: boolean;
  expandedIds: Set<string>;
  toggle: () => void;
  setOpen: (open: boolean) => void;
  toggleExpanded: (pageId: string) => void;
}

export const useSidebarStore = create<SidebarState>((set, get) => ({
  isOpen: true,
  expandedIds: new Set(),
  toggle: () => set({ isOpen: !get().isOpen }),
  setOpen: (open) => set({ isOpen: open }),
  toggleExpanded: (pageId) => {
    const next = new Set(get().expandedIds);
    next.has(pageId) ? next.delete(pageId) : next.add(pageId);
    set({ expandedIds: next });
  },
}));
