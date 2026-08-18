import "server-only";
import { createClient } from "@/lib/server/supabase";

const EMPTY_DOC = { type: "doc", content: [{ type: "paragraph" }] };

/** Returns the Tiptap JSON document for a page, creating an empty one if needed. */
export async function getPageContent(pageId: string): Promise<unknown> {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blocks")
    .select("content")
    .eq("page_id", pageId)
    .maybeSingle();

  if (error) throw error;
  return data?.content ?? EMPTY_DOC;
}

export async function savePageContent(pageId: string, content: unknown) {
  const supabase = createClient();
  const { error } = await supabase
    .from("blocks")
    .upsert(
      { page_id: pageId, content, updated_at: new Date().toISOString() },
      { onConflict: "page_id" }
    );
  if (error) throw error;
}

/** Naive full-text search across a workspace's page content, used by the search dialog. */
export async function searchPageContent(workspaceId: string, query: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("blocks")
    .select("page_id, content, pages!inner(id, title, workspace_id, is_deleted)")
    .eq("pages.workspace_id", workspaceId)
    .eq("pages.is_deleted", false);

  if (error) throw error;

  const needle = query.toLowerCase();
  return (data ?? [])
    .filter((row: any) => JSON.stringify(row.content).toLowerCase().includes(needle))
    .map((row: any) => ({ pageId: row.page_id, title: row.pages.title }));
}
