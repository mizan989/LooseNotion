"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import type { DatabaseColumn } from "@/types/database";

interface DatabaseCellProps {
  column: DatabaseColumn;
  value: string | number | boolean | null;
  onChange: (value: string | number | boolean | null) => void;
}

/** Renders + edits a single cell, switching UI based on the column's type. */
export function DatabaseCell({ column, value, onChange }: DatabaseCellProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(value ?? "");

  if (column.type === "checkbox") {
    return (
      <div className="flex h-8 items-center px-2">
        <Checkbox checked={Boolean(value)} onCheckedChange={(checked) => onChange(Boolean(checked))} />
      </div>
    );
  }

  if (column.type === "select") {
    const options = column.options ?? [];
    const selected = options.find((o) => o.id === value);
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="flex h-8 w-full items-center px-2 text-left">
            {selected ? (
              <Badge style={{ backgroundColor: `${selected.color}22`, color: selected.color }}>
                {selected.label}
              </Badge>
            ) : (
              <span className="text-xs text-muted-foreground">Empty</span>
            )}
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {options.map((option) => (
            <DropdownMenuItem key={option.id} onClick={() => onChange(option.id)}>
              <Badge style={{ backgroundColor: `${option.color}22`, color: option.color }}>
                {option.label}
              </Badge>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  if (column.type === "date") {
    return (
      <input
        type="date"
        defaultValue={(value as string) ?? ""}
        onBlur={(e) => onChange(e.target.value || null)}
        className="h-8 w-full bg-transparent px-2 text-sm outline-none"
      />
    );
  }

  // text / number
  if (!editing) {
    return (
      <button
        onClick={() => setEditing(true)}
        className="flex h-8 w-full items-center truncate px-2 text-left text-sm hover:bg-accent/40"
      >
        {value ?? ""}
      </button>
    );
  }

  return (
    <input
      autoFocus
      type={column.type === "number" ? "number" : "text"}
      value={draft as string | number}
      onChange={(e) => setDraft(e.target.value)}
      onBlur={() => {
        setEditing(false);
        onChange(column.type === "number" ? Number(draft) || null : (draft as string) || null);
      }}
      onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()}
      className="h-8 w-full bg-transparent px-2 text-sm outline-none ring-1 ring-ring"
    />
  );
}
