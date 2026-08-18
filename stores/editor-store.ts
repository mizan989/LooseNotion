import { create } from "zustand";

export type SaveStatus = "idle" | "saving" | "saved";

interface EditorState {
  activePageId: string | null;
  saveStatus: SaveStatus;
  setActivePage: (pageId: string | null) => void;
  setSaveStatus: (status: SaveStatus) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  activePageId: null,
  saveStatus: "idle",
  setActivePage: (pageId) => set({ activePageId: pageId }),
  setSaveStatus: (status) => set({ saveStatus: status }),
}));
