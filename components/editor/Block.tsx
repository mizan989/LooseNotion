import { BLOCK_TYPE_LABELS } from "@/lib/constants";
import type { BlockType } from "@/types/block";

/** Renders the label for a block type, used inside SlashCommand/BlockMenu rows. */
export function Block({ type }: { type: BlockType }) {
  return <span>{BLOCK_TYPE_LABELS[type] ?? type}</span>;
}
