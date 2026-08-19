"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Star, PanelLeftClose, PanelLeft, Database, Loader2 } from "lucide-react";
import { cn } from "@/lib/client/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import { WorkspaceSwitcher } from "@/components/sidebar/WorkspaceSwitcher";
import { PageTree } from "@/components/sidebar/PageTree";
import { SearchDialog } from "@/components/search/SearchDialog";
import { ExportMenu } from "@/components/sidebar/ExportMenu";
import { createPage } from "@/actions/pages";
import type { Page, PageTreeNode } from "@/types/page";

function filterTree(nodes: PageTreeNode[], deletedIds: Set<string>): PageTreeNode[] {
  return nodes
    .filter((n) => !deletedIds.has(n.id))
    .map((n) => ({
      ...n,
      children: filterTree(n.children, deletedIds),
    }));
}

export function Sidebar({
  workspaceId,
  workspaceName,
  userEmail,
  tree,
  favorites,
}: {
  workspaceId: string;
  workspaceName: string;
  userEmail: string;
  tree: PageTreeNode[];
  favorites: Page[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const activePageId = pathname?.split("/workspace/")[1];
  const isOpen = useSidebarStore((s) => s.isOpen);
  const toggle = useSidebarStore((s) => s.toggle);
  const deletedPageIds = useSidebarStore((s) => s.deletedPageIds);
  const [searchOpen, setSearchOpen] = useState(false);
  const [creatingPage, setCreatingPage] = useState(false);
  const [creatingDb, setCreatingDb] = useState(false);

  const visibleFavorites = favorites.filter((p) => !deletedPageIds.has(p.id));
  const visibleTree = filterTree(tree, deletedPageIds);

  async function handleNewPage() {
    try {
      setCreatingPage(true);
      const page = await createPage({ workspaceId, title: "Untitled" });
      router.push(`/workspace/${page.id}`);
    } finally {
      setCreatingPage(false);
    }
  }

  async function handleNewDatabase() {
    try {
      setCreatingDb(true);
      const page = await createPage({ workspaceId, title: "Untitled Database", isDatabase: true });
      router.push(`/workspace/${page.id}`);
    } finally {
      setCreatingDb(false);
    }
  }

  if (!isOpen) {
    return (
      <motion.button
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={toggle}
        className="fixed left-2 top-2 z-40 rounded-md p-1.5 bg-[#161619] border border-white/10 hover:bg-white/10 text-zinc-300 shadow-md"
        title="Show sidebar"
      >
        <PanelLeft className="h-4 w-4" />
      </motion.button>
    );
  }

  return (
    <motion.aside
      initial={{ x: -16, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 350, damping: 28 }}
      className="flex h-screen w-64 shrink-0 flex-col border-r border-white/10 bg-[#141416]/95 backdrop-blur-md"
    >
      <div className="flex items-center justify-between px-2 pt-2">
        <WorkspaceSwitcher workspaceName={workspaceName} userEmail={userEmail} />
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={toggle}
          className="rounded-md p-1.5 text-zinc-400 hover:bg-white/5 hover:text-white"
          title="Hide sidebar"
        >
          <PanelLeftClose className="h-4 w-4" />
        </motion.button>
      </div>

      <div className="flex flex-col gap-0.5 px-2 pt-2">
        <motion.button
          whileHover={{ x: 2 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setSearchOpen(true)}
          className="flex items-center gap-2 rounded-md px-2 py-1.5 text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <Search className="h-3.5 w-3.5" /> Search
          <kbd className="ml-auto rounded border border-white/10 bg-black/40 px-1 py-0.5 text-[10px] font-mono text-zinc-400">
            Ctrl K
          </kbd>
        </motion.button>
        <ExportMenu workspaceId={workspaceId} />
      </div>

      {visibleFavorites.length > 0 && (
        <div className="mt-3 px-2">
          <div className="flex items-center gap-1 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
            <Star className="h-3 w-3" /> Favorites
          </div>
          <div className="space-y-0.5 mt-0.5">
            {visibleFavorites.map((page) => (
              <motion.div key={page.id} whileHover={{ x: 2 }} whileTap={{ scale: 0.99 }}>
                <Link
                  href={`/workspace/${page.id}`}
                  className={cn(
                    "flex items-center gap-2 truncate rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-white/5 hover:text-white transition-colors",
                    activePageId === page.id && "bg-white/10 text-white font-medium shadow-sm"
                  )}
                >
                  <span>{page.icon ?? "📄"}</span> {page.title || "Untitled"}
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-3 flex flex-1 flex-col overflow-y-auto px-2">
        <div className="flex items-center justify-between px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-500">
          <span>Workspace</span>
          <div className="flex items-center gap-1">
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNewDatabase}
              disabled={creatingDb}
              title="New database"
              className="rounded p-0.5 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              {creatingDb ? <Loader2 className="h-3 w-3 animate-spin" /> : <Database className="h-3 w-3" />}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleNewPage}
              disabled={creatingPage}
              title="New page"
              className="rounded p-0.5 text-zinc-400 hover:bg-white/10 hover:text-white"
            >
              {creatingPage ? <Loader2 className="h-3 w-3 animate-spin" /> : <Plus className="h-3 w-3" />}
            </motion.button>
          </div>
        </div>
        <PageTree nodes={visibleTree} activePageId={activePageId} workspaceId={workspaceId} />
      </div>

      <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} pages={flattenTree(visibleTree)} />
    </motion.aside>
  );
}

function flattenTree(nodes: PageTreeNode[]): Page[] {
  return nodes.flatMap((n) => [n, ...flattenTree(n.children)]);
}
