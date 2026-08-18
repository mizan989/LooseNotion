"use client";

import { useState } from "react";
import { setPageIcon } from "@/actions/pages";

const EMOJI_CHOICES = ["📄", "📝", "📚", "🎓", "💡", "🚀", "📌", "🗃", "✅", "📊", "🎯", "🔥"];

export function PageIcon({ pageId, icon }: { pageId: string; icon: string | null }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-md p-1 text-5xl hover:bg-accent"
        title="Change icon"
      >
        {icon ?? "📄"}
      </button>
      {open && (
        <div className="absolute z-20 mt-1 grid grid-cols-6 gap-1 rounded-md border bg-popover p-2 shadow-md">
          {EMOJI_CHOICES.map((emoji) => (
            <button
              key={emoji}
              onClick={async () => {
                await setPageIcon(pageId, emoji);
                setOpen(false);
              }}
              className="rounded p-1 text-xl hover:bg-accent"
            >
              {emoji}
            </button>
          ))}
          <button
            onClick={async () => {
              await setPageIcon(pageId, null);
              setOpen(false);
            }}
            className="col-span-6 rounded p-1 text-xs text-muted-foreground hover:bg-accent"
          >
            Remove icon
          </button>
        </div>
      )}
    </div>
  );
}
