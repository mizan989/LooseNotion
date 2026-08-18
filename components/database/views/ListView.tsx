"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { addDatabaseRow, deleteDatabaseRow } from "@/actions/databases";
import { Trash2, Plus } from "lucide-react";
import type { DatabaseColumn, DatabaseRow } from "@/types/database";

/** Simple checklist view: ✓/○ title rows (Step 4). */
export function ListView({
  databaseId,
  columns,
  rows,
  onEditCell,
}: {
  databaseId: string;
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  onEditCell: (rowId: string, columnId: string, value: string | number | boolean | null) => void;
}) {
  const titleColumn = columns.find((c) => c.type === "text") ?? columns[0];
  const doneColumn =
    columns.find((c) => c.type === "checkbox") ??
    columns.find((c) => c.type === "select" && c.name.toLowerCase() === "status");

  function isDone(row: DatabaseRow) {
    if (!doneColumn) return false;
    if (doneColumn.type === "checkbox") return Boolean(row.values[doneColumn.id]);
    const option = doneColumn.options?.find((o) => o.id === row.values[doneColumn.id]);
    return option?.label.toLowerCase() === "done";
  }

  function toggle(row: DatabaseRow) {
    if (!doneColumn) return;
    if (doneColumn.type === "checkbox") {
      onEditCell(row.id, doneColumn.id, !isDone(row));
    } else {
      const doneOption = doneColumn.options?.find((o) => o.label.toLowerCase() === "done");
      const todoOption = doneColumn.options?.find((o) => o.label.toLowerCase() === "todo");
      onEditCell(row.id, doneColumn.id, isDone(row) ? todoOption?.id ?? null : doneOption?.id ?? null);
    }
  }

  return (
    <div className="flex flex-col gap-1 p-4">
      {rows.map((row) => (
        <div key={row.id} className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-accent/40">
          <Checkbox checked={isDone(row)} onCheckedChange={() => toggle(row)} />
          <span className={isDone(row) ? "flex-1 text-sm text-muted-foreground line-through" : "flex-1 text-sm"}>
            {titleColumn ? (row.values[titleColumn.id] as string) || "Untitled" : "Untitled"}
          </span>
          <button
            onClick={() => deleteDatabaseRow(row.id)}
            className="hidden text-muted-foreground hover:text-destructive group-hover:inline-flex"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
        </div>
      ))}
      <button
        onClick={() => addDatabaseRow(databaseId)}
        className="flex items-center gap-2 rounded-md px-2 py-1.5 text-sm text-muted-foreground hover:bg-accent/40"
      >
        <Plus className="h-3.5 w-3.5" /> New item
      </button>
    </div>
  );
}
