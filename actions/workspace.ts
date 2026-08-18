"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server/supabase";

export async function renameWorkspace(workspaceId: string, name: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("workspaces")
    .update({ name })
    .eq("id", workspaceId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function exportWorkspace(workspaceId: string, format: "markdown" | "json") {
  const supabase = createClient();
  const { data: pages, error } = await supabase
    .from("pages")
    .select("id, title, parent_id")
    .eq("workspace_id", workspaceId)
    .eq("is_deleted", false);
  if (error) throw error;

  const pageIds = (pages ?? []).map((p) => p.id);
  const { data: blocks } = await supabase
    .from("blocks")
    .select("page_id, content")
    .in("page_id", pageIds.length ? pageIds : ["00000000-0000-0000-0000-000000000000"]);

  const byPage = new Map((blocks ?? []).map((b) => [b.page_id, b.content]));

  if (format === "json") {
    return JSON.stringify(
      (pages ?? []).map((p) => ({ ...p, content: byPage.get(p.id) ?? null })),
      null,
      2
    );
  }

  // Minimal Tiptap JSON -> Markdown text extraction
  function toMarkdown(node: any): string {
    if (!node) return "";
    if (node.type === "text") return node.text ?? "";
    const children = (node.content ?? []).map(toMarkdown).join("");
    switch (node.type) {
      case "heading1":
      case "heading":
        return `# ${children}\n\n`;
      case "paragraph":
        return `${children}\n\n`;
      case "bulletList":
        return `${children}`;
      case "listItem":
        return `- ${children}\n`;
      default:
        return children;
    }
  }

  return (pages ?? [])
    .map((p) => `# ${p.title}\n\n${toMarkdown(byPage.get(p.id))}`)
    .join("\n---\n\n");
}
