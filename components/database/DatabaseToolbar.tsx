"use client";

import { useState } from "react";
import { Table2, Columns3, List as ListIcon, Plus } from "lucide-react";
import { cn } from "@/lib/client/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { addDatabaseColumn } from "@/actions/databases";
import type { ColumnType, DatabaseViewType } from "@/types/database";

const VIEWS: { value: DatabaseViewType; label: string; icon: typeof Table2 }[] = [
  { value: "table", label: "Table", icon: Table2 },
  { value: "board", label: "Board", icon: Columns3 },
  { value: "list", label: "List", icon: ListIcon },
];

export function DatabaseToolbar({
  databaseId,
  view,
  onViewChange,
}: {
  databaseId: string;
  view: DatabaseViewType;
  onViewChange: (view: DatabaseViewType) => void;
}) {
  const [adding, setAdding] = useState(false);
  const [name, setName] = useState("");
  const [type, setType] = useState<ColumnType>("text");

  async function handleAddColumn() {
    if (!name.trim()) return;
    await addDatabaseColumn(databaseId, name.trim(), type);
    setName("");
    setAdding(false);
  }

  return (
    <div className="flex items-center justify-between border-b px-4 py-2">
      <div className="flex items-center gap-1">
        {VIEWS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => onViewChange(value)}
            className={cn(
              "flex items-center gap-1.5 rounded-md px-2 py-1 text-sm hover:bg-accent",
              view === value && "bg-accent font-medium"
            )}
          >
            <Icon className="h-3.5 w-3.5" /> {label}
          </button>
        ))}
      </div>

      {adding ? (
        <div className="flex items-center gap-2">
          <Input
            autoFocus
            placeholder="Column name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-8 w-32"
          />
          <Select value={type} onValueChange={(v) => setType(v as ColumnType)}>
            <SelectTrigger className="w-28">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="number">Number</SelectItem>
              <SelectItem value="select">Select</SelectItem>
              <SelectItem value="checkbox">Checkbox</SelectItem>
              <SelectItem value="date">Date</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" onClick={handleAddColumn}>Add</Button>
        </div>
      ) : (
        <Button size="sm" variant="outline" onClick={() => setAdding(true)}>
          <Plus className="h-3.5 w-3.5" /> Column
        </Button>
      )}
    </div>
  );
}
