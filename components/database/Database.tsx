"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DatabaseToolbar } from "@/components/database/DatabaseToolbar";
import { TableView } from "@/components/database/views/TableView";
import { BoardView } from "@/components/database/views/BoardView";
import { ListView } from "@/components/database/views/ListView";
import { useDatabase } from "@/hooks/useDatabase";
import { useDatabaseStore } from "@/stores/database-store";
import type { DatabaseColumn, DatabaseRow } from "@/types/database";

export function Database({
  databaseId,
  columns,
  initialRows,
}: {
  databaseId: string;
  columns: DatabaseColumn[];
  initialRows: DatabaseRow[];
}) {
  const view = useDatabaseStore((s) => s.getView(databaseId));
  const setView = useDatabaseStore((s) => s.setView);
  const { rows, editCell, removeRow } = useDatabase(initialRows);
  const [localColumns] = useState(columns);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      className="flex flex-1 flex-col"
    >
      <DatabaseToolbar databaseId={databaseId} view={view} onViewChange={(v) => setView(databaseId, v)} />
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {view === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="p-4"
            >
              <TableView
                databaseId={databaseId}
                columns={localColumns}
                rows={rows}
                onEditCell={editCell}
                onDeleteRow={removeRow}
              />
            </motion.div>
          )}
          {view === "board" && (
            <motion.div
              key="board"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <BoardView databaseId={databaseId} columns={localColumns} rows={rows} onEditCell={editCell} />
            </motion.div>
          )}
          {view === "list" && (
            <motion.div
              key="list"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <ListView databaseId={databaseId} columns={localColumns} rows={rows} onEditCell={editCell} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
