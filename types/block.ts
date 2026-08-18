export type BlockType =
  | "paragraph"
  | "heading1"
  | "heading2"
  | "heading3"
  | "bulletList"
  | "numberedList"
  | "todo"
  | "quote"
  | "divider"
  | "code"
  | "image"
  | "link";

export interface Block {
  id: string;
  pageId: string;
  type: BlockType;
  content: Record<string, unknown>;
  position: number;
  createdAt: string;
  updatedAt: string;
}

/**
 * LooseNotion stores each page's editor content as a single Tiptap JSON
 * document (see lib/server/blocks.ts). The `Block` type above models the
 * conceptual "block" unit used by the slash command menu, block menu, and
 * database rows; the persisted document itself is one JSON blob per page.
 */
export interface EditorDocument {
  pageId: string;
  content: unknown; // Tiptap JSONContent
  updatedAt: string;
}
