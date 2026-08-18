"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server/supabase";
import { requireUser } from "@/lib/server/auth";

export async function createPage(input: {
  workspaceId: string;
  parentId?: string | null;
  title?: string;
  isDatabase?: boolean;
}) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: page, error } = await supabase
    .from("pages")
    .insert({
      workspace_id: input.workspaceId,
      parent_id: input.parentId ?? null,
      title: input.title ?? "Untitled",
      is_database: input.isDatabase ?? false,
      created_by: user.id,
      position: Date.now(),
    })
    .select()
    .single();
  if (error) throw error;

  if (input.isDatabase) {
    const { data: db, error: dbError } = await supabase
      .from("databases")
      .insert({ page_id: page.id, name: input.title ?? "Untitled Database" })
      .select()
      .single();
    if (dbError) throw dbError;

    // Seed with the three default columns from the blueprint (Task / Status / Priority style)
    await supabase.from("database_columns").insert([
      { database_id: db.id, name: "Name", type: "text", position: 0 },
      {
        database_id: db.id,
        name: "Status",
        type: "select",
        position: 1,
        options: [
          { id: "todo", label: "Todo", color: "#94a3b8" },
          { id: "doing", label: "Doing", color: "#3b82f6" },
          { id: "done", label: "Done", color: "#30a46c" },
        ],
      },
      {
        database_id: db.id,
        name: "Priority",
        type: "select",
        position: 2,
        options: [
          { id: "low", label: "Low", color: "#94a3b8" },
          { id: "medium", label: "Medium", color: "#f5a623" },
          { id: "high", label: "High", color: "#e5484d" },
        ],
      },
    ]);
  } else {
    await supabase.from("blocks").insert({
      page_id: page.id,
      content: { type: "doc", content: [{ type: "paragraph" }] },
    });
  }

  revalidatePath("/workspace");
  return page;
}

export async function renamePage(pageId: string, title: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pages")
    .update({ title, updated_at: new Date().toISOString() })
    .eq("id", pageId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function setPageIcon(pageId: string, icon: string | null) {
  const supabase = createClient();
  const { error } = await supabase.from("pages").update({ icon }).eq("id", pageId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function setPageCover(pageId: string, cover: string | null) {
  const supabase = createClient();
  const { error } = await supabase.from("pages").update({ cover }).eq("id", pageId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function movePage(pageId: string, parentId: string | null, position: number) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pages")
    .update({ parent_id: parentId, position })
    .eq("id", pageId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function deletePage(pageId: string) {
  const supabase = createClient();
  const { error } = await supabase
    .from("pages")
    .update({ is_deleted: true })
    .eq("id", pageId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function duplicatePage(pageId: string) {
  const user = await requireUser();
  const supabase = createClient();
  const { data: original, error } = await supabase
    .from("pages")
    .select("*")
    .eq("id", pageId)
    .single();
  if (error) throw error;

  const { data: copy, error: copyError } = await supabase
    .from("pages")
    .insert({
      workspace_id: original.workspace_id,
      parent_id: original.parent_id,
      title: `${original.title} (Copy)`,
      icon: original.icon,
      cover: original.cover,
      is_database: original.is_database,
      created_by: user.id,
      position: Date.now(),
    })
    .select()
    .single();
  if (copyError) throw copyError;

  if (original.is_database) {
    const { data: origDb } = await supabase
      .from("databases")
      .select("*")
      .eq("page_id", pageId)
      .maybeSingle();

    if (origDb) {
      const { data: newDb } = await supabase
        .from("databases")
        .insert({ page_id: copy.id, name: origDb.name })
        .select()
        .single();

      if (newDb) {
        const { data: origCols } = await supabase
          .from("database_columns")
          .select("*")
          .eq("database_id", origDb.id);

        const colIdMap = new Map<string, string>();
        if (origCols && origCols.length > 0) {
          for (const col of origCols) {
            const { data: newCol } = await supabase
              .from("database_columns")
              .insert({
                database_id: newDb.id,
                name: col.name,
                type: col.type,
                options: col.options,
                position: col.position,
              })
              .select()
              .single();
            if (newCol) {
              colIdMap.set(col.id, newCol.id);
            }
          }
        }

        const { data: origRows } = await supabase
          .from("database_rows")
          .select("*")
          .eq("database_id", origDb.id);

        if (origRows && origRows.length > 0) {
          for (const row of origRows) {
            const newValues: Record<string, any> = {};
            for (const [colId, val] of Object.entries(row.values ?? {})) {
              const newColId = colIdMap.get(colId) || colId;
              newValues[newColId] = val;
            }
            await supabase.from("database_rows").insert({
              database_id: newDb.id,
              position: row.position,
              values: newValues,
            });
          }
        }
      }
    }
  } else {
    const { data: blocks } = await supabase
      .from("blocks")
      .select("content")
      .eq("page_id", pageId)
      .maybeSingle();
    if (blocks) {
      await supabase.from("blocks").insert({ page_id: copy.id, content: blocks.content });
    }
  }

  revalidatePath("/workspace");
  return copy;
}

export async function toggleFavorite(pageId: string) {
  const user = await requireUser();
  const supabase = createClient();

  const { data: existing } = await supabase
    .from("favorites")
    .select("id")
    .eq("user_id", user.id)
    .eq("page_id", pageId)
    .maybeSingle();

  if (existing) {
    await supabase.from("favorites").delete().eq("id", existing.id);
  } else {
    await supabase.from("favorites").insert({ user_id: user.id, page_id: pageId });
  }

  revalidatePath("/workspace");
}
