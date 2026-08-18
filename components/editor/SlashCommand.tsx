"use client";

import * as React from "react";
import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import type { SlashCommandItem } from "@/lib/editor/editor-config";
import { cn } from "@/lib/client/utils";

export interface SlashCommandListRef {
  onKeyDown: (props: { event: KeyboardEvent }) => boolean;
}

interface SlashCommandListProps {
  items: SlashCommandItem[];
  command: (item: SlashCommandItem) => void;
}

export const SlashCommandList = forwardRef<SlashCommandListRef, SlashCommandListProps>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    useEffect(() => setSelectedIndex(0), [items]);

    const selectItem = (index: number) => {
      const item = items[index];
      if (item) command(item);
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: ({ event }) => {
        if (event.key === "ArrowUp") {
          setSelectedIndex((i) => (i + items.length - 1) % items.length);
          return true;
        }
        if (event.key === "ArrowDown") {
          setSelectedIndex((i) => (i + 1) % items.length);
          return true;
        }
        if (event.key === "Enter") {
          selectItem(selectedIndex);
          return true;
        }
        return false;
      },
    }));

    if (items.length === 0) {
      return (
        <div className="w-64 rounded-md border bg-popover p-2 text-sm text-muted-foreground shadow-md">
          No results
        </div>
      );
    }

    return (
      <div className="max-h-72 w-64 overflow-y-auto rounded-md border bg-popover p-1 shadow-md">
        {items.map((item, index) => (
          <button
            key={item.title}
            onClick={() => selectItem(index)}
            className={cn(
              "flex w-full flex-col items-start gap-0.5 rounded-sm px-2 py-1.5 text-left text-sm",
              index === selectedIndex ? "bg-accent text-accent-foreground" : "hover:bg-accent/60"
            )}
          >
            <span className="font-medium">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.description}</span>
          </button>
        ))}
      </div>
    );
  }
);
SlashCommandList.displayName = "SlashCommandList";
