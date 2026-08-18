import { create } from "zustand";
import type { DatabaseViewType } from "@/types/database";

interface DatabaseState {
  viewByDatabaseId: Record<string, DatabaseViewType>;
  setView: (databaseId: string, view: DatabaseViewType) => void;
  getView: (databaseId: string) => DatabaseViewType;
}

export const useDatabaseStore = create<DatabaseState>((set, get) => ({
  viewByDatabaseId: {},
  setView: (databaseId, view) =>
    set({ viewByDatabaseId: { ...get().viewByDatabaseId, [databaseId]: view } }),
  getView: (databaseId) => get().viewByDatabaseId[databaseId] ?? "table",
}));
