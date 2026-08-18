"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Search as SearchIcon } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useSearch } from "@/hooks/useSearch";
import type { Page } from "@/types/page";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  pages: Page[];
}

export function SearchDialog({ open, onOpenChange, pages }: SearchDialogProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const results = useSearch(pages, query);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && (e.key === "k" || e.key === "p")) {
        e.preventDefault();
        onOpenChange(true);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onOpenChange]);

  useEffect(() => {
    if (!open) setQuery("");
  }, [open]);

  function goTo(pageId: string) {
    onOpenChange(false);
    router.push(`/workspace/${pageId}`);
  }

  const items = query ? results : pages.slice(0, 8);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="top-[20%] max-w-md translate-y-0 p-0 overflow-hidden bg-[#161619] border-white/10 shadow-2xl">
        <div className="flex items-center gap-2.5 border-b border-white/10 px-3.5 py-2.5 bg-[#18181c]">
          <SearchIcon className="h-4 w-4 text-zinc-400" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages and content..."
            className="w-full bg-transparent text-xs text-white placeholder:text-zinc-500 outline-none"
          />
        </div>
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
          <AnimatePresence>
            {items.map((item: any) => (
              <motion.button
                key={item.pageId ?? item.id}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                whileHover={{ x: 2, backgroundColor: "rgba(255, 255, 255, 0.06)" }}
                whileTap={{ scale: 0.99 }}
                onClick={() => goTo(item.pageId ?? item.id)}
                className="flex w-full items-center gap-2 rounded-md px-2.5 py-2 text-left text-xs text-zinc-300 transition-colors"
              >
                <span>{item.icon ?? <FileText className="h-3.5 w-3.5 text-zinc-400" />}</span>
                <span className="truncate flex-1 font-medium">{item.title || "Untitled"}</span>
              </motion.button>
            ))}
          </AnimatePresence>
          {query && results.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="px-2 py-6 text-center text-xs text-zinc-500"
            >
              No matching pages found
            </motion.div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
