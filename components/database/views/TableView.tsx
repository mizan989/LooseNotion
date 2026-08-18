"use client";

import { DatabaseTable } from "@/components/database/DatabaseTable";
import { addDatabaseRow } from "@/actions/databases";
import type { DatabaseColumn, DatabaseRow } from "@/types/database";

export function TableView({
  databaseId,
  columns,
  rows,
  onEditCell,
  onDeleteRow,
}: {
  databaseId: string;
  columns: DatabaseColumn[];
  rows: DatabaseRow[];
  onEditCell: (rowId: string, columnId: string, value: string | number | boolean | null) => void;
  onDeleteRow: (rowId: string) => void;
}) {
  return (
    <DatabaseTable
      columns={columns}
      rows={rows}
      onEditCell={onEditCell}
      onDeleteRow={onDeleteRow}
      onAddRow={() => addDatabaseRow(databaseId)}
    />
  );
}
