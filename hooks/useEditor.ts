"use client";

import { useEditor as useTiptapEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CodeBlock from "@tiptap/extension-code-block";
import { SlashCommand } from "@/lib/editor/extensions/slash-command";
import { DragHandle } from "@/lib/editor/extensions/drag-handle";

/** Central Tiptap config used by the page editor (Step 12 / lib/editor/editor-config.ts). */
export function usePageEditor(content: unknown, onUpdate: (json: unknown) => void) {
  return useTiptapEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CodeBlock,
      Placeholder.configure({ placeholder: "Type '/' for commands..." }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Image,
      Link.configure({ openOnClick: false }),
      SlashCommand,
      DragHandle,
    ],
    content: content as any,
    immediatelyRender: false,
    editorProps: {
      attributes: { class: "ln-editor prose prose-neutral dark:prose-invert max-w-none" },
    },
    onUpdate: ({ editor }) => onUpdate(editor.getJSON()),
  });
}
