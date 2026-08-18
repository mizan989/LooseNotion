"use client";

import type { Editor } from "@tiptap/react";
import { Copy, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { SLASH_COMMANDS } from "@/lib/editor/editor-config";

/**
 * "Change block type / duplicate / delete" menu, offered as a right-click
 * menu on the editor surface (Step 3 -> Block interactions).
 */
export function BlockMenu({ editor, children }: { editor: Editor | null; children: React.ReactNode }) {
  if (!editor) return <>{children}</>;

  function duplicateSelection() {
    const { state } = editor!;
    const { $from } = state.selection;
    const node = $from.node(1) ?? $from.parent;
    const pos = $from.before(1);
    editor!.chain().focus().insertContentAt(pos, node.toJSON()).run();
  }

  function deleteSelection() {
    const { state } = editor!;
    const { $from } = state.selection;
    const from = $from.before(1);
    const to = $from.after(1);
    editor!.chain().focus().deleteRange({ from, to }).run();
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-48">
        <DropdownMenuItem onClick={duplicateSelection}>
          <Copy className="h-3.5 w-3.5" /> Duplicate block
        </DropdownMenuItem>
        <DropdownMenuItem onClick={deleteSelection} className="text-destructive">
          <Trash2 className="h-3.5 w-3.5" /> Delete block
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        {SLASH_COMMANDS.slice(0, 6).map((item) => (
          <DropdownMenuItem
            key={item.title}
            onClick={() => {
              const { $from } = editor!.state.selection;
              const range = { from: $from.before(1), to: $from.after(1) };
              item.command(editor!, range);
            }}
          >
            Turn into {item.title}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
