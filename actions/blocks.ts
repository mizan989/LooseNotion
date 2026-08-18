"use server";

import { createClient } from "@/lib/server/supabase";

/** Autosave endpoint: persists the whole Tiptap JSON document for a page. */
export async function savePageBlocks(pageId: string, content: unknown) {
  const supabase = createClient();
  const { error } = await supabase
    .from("blocks")
    .upsert(
      { page_id: pageId, content, updated_at: new Date().toISOString() },
      { onConflict: "page_id" }
    );
  if (error) throw error;
  return { savedAt: new Date().toISOString() };
}
