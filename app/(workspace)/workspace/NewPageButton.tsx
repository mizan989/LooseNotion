"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Plus, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { createPage } from "@/actions/pages";

export function NewPageButton({ workspaceId }: { workspaceId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleClick() {
    try {
      setLoading(true);
      const page = await createPage({ workspaceId, title: "Untitled" });
      router.push(`/workspace/${page.id}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}>
      <Button
        onClick={handleClick}
        disabled={loading}
        size="sm"
        className="gap-2 bg-white text-black hover:bg-zinc-200 text-xs font-medium h-9 px-4 shadow-md"
      >
        {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Plus className="h-3.5 w-3.5" />}
        <span>Create new page</span>
      </Button>
    </motion.div>
  );
}
