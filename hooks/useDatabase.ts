"use client";

import { useOptimistic, useTransition } from "react";
import type { DatabaseRow } from "@/types/database";
import { updateDatabaseRow, deleteDatabaseRow } from "@/actions/databases";

/** Optimistic cell edits + row deletes for a database view. */
export function useDatabase(initialRows: DatabaseRow[]) {
  const [isPending, startTransition] = useTransition();
  const [rows, applyOptimistic] = useOptimistic(
    initialRows,
    (state, update: { type: "edit"; rowId: string; values: Record<string, any> } | { type: "delete"; rowId: string }) => {
      if (update.type === "edit") {
        return state.map((r) =>
          r.id === update.rowId ? { ...r, values: { ...r.values, ...update.values } } : r
        );
      }
      return state.filter((r) => r.id !== update.rowId);
    }
  );

  function editCell(rowId: string, columnId: string, value: string | number | boolean | null) {
    startTransition(async () => {
      applyOptimistic({ type: "edit", rowId, values: { [columnId]: value } });
      await updateDatabaseRow(rowId, { [columnId]: value });
    });
  }

  function removeRow(rowId: string) {
    startTransition(async () => {
      applyOptimistic({ type: "delete", rowId });
      await deleteDatabaseRow(rowId);
    });
  }

  return { rows, editCell, removeRow, isPending };
}
