"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EditorContent } from "@tiptap/react";
import { usePageEditor } from "@/hooks/useEditor";
import { useAutosave } from "@/hooks/useAutosave";
import { savePageBlocks } from "@/actions/blocks";
import { EditorToolbar } from "@/components/editor/EditorToolbar";
import { useEditorStore } from "@/stores/editor-store";

export function Editor({ pageId, initialContent }: { pageId: string; initialContent: unknown }) {
  const [doc, setDoc] = useState<unknown>(initialContent);
  const setActivePage = useEditorStore((s) => s.setActivePage);

  const editor = usePageEditor(initialContent, useCallback((json: unknown) => setDoc(json), []));

  useEffect(() => {
    setActivePage(pageId);
    return () => setActivePage(null);
  }, [pageId, setActivePage]);

  useAutosave(doc, async (value) => {
    await savePageBlocks(pageId, value);
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="flex flex-1 flex-col"
    >
      <EditorToolbar editor={editor} />
      <div className="flex-1 overflow-y-auto px-8 py-6 md:px-16">
        <EditorContent editor={editor} />
      </div>
    </motion.div>
  );
}
