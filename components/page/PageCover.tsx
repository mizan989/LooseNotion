"use client";

import { ImageIcon, X } from "lucide-react";
import { setPageCover } from "@/actions/pages";

const COVER_CHOICES = [
  "linear-gradient(135deg,#a1c4fd,#c2e9fb)",
  "linear-gradient(135deg,#fbc2eb,#a6c1ee)",
  "linear-gradient(135deg,#fddb92,#d1fdff)",
  "linear-gradient(135deg,#84fab0,#8fd3f4)",
];

export function PageCover({ pageId, cover }: { pageId: string; cover: string | null }) {
  if (!cover) {
    return (
      <button
        onClick={() => setPageCover(pageId, COVER_CHOICES[0])}
        className="flex items-center gap-1 px-8 py-2 text-xs text-muted-foreground hover:text-foreground md:px-16"
      >
        <ImageIcon className="h-3.5 w-3.5" /> Add cover
      </button>
    );
  }

  return (
    <div className="group relative h-40 w-full" style={{ background: cover }}>
      <div className="absolute bottom-2 right-4 hidden gap-1 group-hover:flex">
        {COVER_CHOICES.map((choice) => (
          <button
            key={choice}
            onClick={() => setPageCover(pageId, choice)}
            className="h-6 w-6 rounded-full border-2 border-white shadow"
            style={{ background: choice }}
          />
        ))}
        <button
          onClick={() => setPageCover(pageId, null)}
          className="flex h-6 w-6 items-center justify-center rounded-full bg-white/80 shadow"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
