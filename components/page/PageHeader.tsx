"use client";

import { useState } from "react";
import { PageIcon } from "@/components/page/PageIcon";
import { PageActions } from "@/components/page/PageActions";
import { renamePage } from "@/actions/pages";
import type { Page } from "@/types/page";

export function PageHeader({ page }: { page: Page }) {
  const [title, setTitle] = useState(page.title);

  return (
    <div className="flex items-start justify-between px-8 pt-6 md:px-16">
      <div>
        <PageIcon pageId={page.id} icon={page.icon} />
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={() => title.trim() && title !== page.title && renamePage(page.id, title.trim())}
          placeholder="Untitled"
          className="mt-2 block w-full max-w-2xl bg-transparent text-4xl font-bold outline-none placeholder:text-muted-foreground/50"
        />
      </div>
      <PageActions page={page} />
    </div>
  );
}
