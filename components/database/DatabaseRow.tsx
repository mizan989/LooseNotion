"use client";

import { Trash2 } from "lucide-react";
import { DatabaseCell } from "@/components/database/DatabaseCell";
import type { DatabaseColumn, DatabaseRow as DatabaseRowType } from "@/types/database";

export function DatabaseRow({
  row,
  columns,
  onEditCell,
  onDelete,
}: {
  row: DatabaseRowType;
  columns: DatabaseColumn[];
  onEditCell: (rowId: string, columnId: string, value: string | number | boolean | null) => void;
  onDelete: (rowId: string) => void;
}) {
  return (
    <tr className="group border-b hover:bg-accent/30">
      {columns.map((column) => (
        <td key={column.id} className="border-r p-0 align-top">
          <DatabaseCell
            column={column}
            value={row.values[column.id] ?? null}
            onChange={(value) => onEditCell(row.id, column.id, value)}
          />
        </td>
      ))}
      <td className="w-8 p-0 text-center">
        <button
          onClick={() => onDelete(row.id)}
          className="hidden h-8 w-8 items-center justify-center text-muted-foreground hover:text-destructive group-hover:inline-flex"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </td>
    </tr>
  );
}
