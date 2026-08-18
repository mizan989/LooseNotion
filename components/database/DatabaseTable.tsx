"use client";

import { Plus } from "lucide-react";
import { DatabaseRow } from "@/components/database/DatabaseRow";
import { COLUMN_TYPE_LABELS } from "@/lib/constants";
import type { DatabaseColumn, DatabaseRow as DatabaseRowType } from "@/types/database";

export function DatabaseTable({
  columns,
  rows,
  onEditCell,
  onDeleteRow,
  onAddRow,
}: {
  columns: DatabaseColumn[];
  rows: DatabaseRowType[];
  onEditCell: (rowId: string, columnId: string, value: string | number | boolean | null) => void;
  onDeleteRow: (rowId: string) => void;
  onAddRow: () => void;
}) {
  return (
    <div className="overflow-x-auto rounded-md border">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b bg-muted/40">
            {columns.map((column) => (
              <th key={column.id} className="border-r px-2 py-1.5 text-left font-medium">
                {column.name}
                <span className="ml-1 text-[10px] font-normal text-muted-foreground">
                  {COLUMN_TYPE_LABELS[column.type]}
                </span>
              </th>
            ))}
            <th className="w-8" />
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <DatabaseRow key={row.id} row={row} columns={columns} onEditCell={onEditCell} onDelete={onDeleteRow} />
          ))}
        </tbody>
      </table>
      <button
        onClick={onAddRow}
        className="flex w-full items-center gap-2 px-3 py-2 text-sm text-muted-foreground hover:bg-accent/40"
      >
        <Plus className="h-3.5 w-3.5" /> New row
      </button>
    </div>
  );
}
