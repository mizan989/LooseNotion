"use client";

import { useRouter } from "next/navigation";
import { MoreHorizontal, Star, Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { deletePage, duplicatePage, toggleFavorite } from "@/actions/pages";
import { useSidebarStore } from "@/stores/sidebar-store";
import type { Page } from "@/types/page";

export function PageActions({ page }: { page: Page }) {
  const router = useRouter();
  const markPageDeleted = useSidebarStore((s) => s.markPageDeleted);
  const unmarkPageDeleted = useSidebarStore((s) => s.unmarkPageDeleted);

  async function handleDuplicate() {
    const copy = await duplicatePage(page.id);
    router.push(`/workspace/${copy.id}`);
  }

  async function handleDelete() {
    // 0ms instant optimistic UI response
    markPageDeleted(page.id);
    router.push("/workspace");

    try {
      await deletePage(page.id);
    } catch (err) {
      console.error("Failed to delete page:", err);
      unmarkPageDeleted(page.id);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="rounded-md p-1.5 hover:bg-accent">
          <MoreHorizontal className="h-4 w-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleFavorite(page.id)}>
          <Star className="h-3.5 w-3.5" /> {page.isFavorite ? "Remove from favorites" : "Add to favorites"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDuplicate}>
          <Copy className="h-3.5 w-3.5" /> Duplicate
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDelete} className="text-destructive">
          <Trash2 className="h-3.5 w-3.5" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
