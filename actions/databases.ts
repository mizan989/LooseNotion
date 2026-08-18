"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/server/supabase";
import type { ColumnType, SelectOption } from "@/types/database";

export async function addDatabaseColumn(databaseId: string, name: string, type: ColumnType) {
  const supabase = createClient();
  const { count } = await supabase
    .from("database_columns")
    .select("id", { count: "exact", head: true })
    .eq("database_id", databaseId);

  const { data, error } = await supabase
    .from("database_columns")
    .insert({ database_id: databaseId, name, type, position: count ?? 0 })
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/workspace");
  return data;
}

export async function updateDatabaseColumn(
  columnId: string,
  updates: Partial<{ name: string; options: SelectOption[] }>
) {
  const supabase = createClient();
  const { error } = await supabase
    .from("database_columns")
    .update(updates)
    .eq("id", columnId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function deleteDatabaseColumn(columnId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("database_columns").delete().eq("id", columnId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function addDatabaseRow(databaseId: string) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("database_rows")
    .insert({ database_id: databaseId, position: Date.now(), values: {} })
    .select()
    .single();
  if (error) throw error;
  revalidatePath("/workspace");
  return data;
}

export async function updateDatabaseRow(
  rowId: string,
  values: Record<string, string | number | boolean | null>
) {
  const supabase = createClient();
  const { data: current, error: readError } = await supabase
    .from("database_rows")
    .select("values")
    .eq("id", rowId)
    .single();
  if (readError) throw readError;

  const { error } = await supabase
    .from("database_rows")
    .update({ values: { ...current.values, ...values } })
    .eq("id", rowId);
  if (error) throw error;
  revalidatePath("/workspace");
}

export async function deleteDatabaseRow(rowId: string) {
  const supabase = createClient();
  const { error } = await supabase.from("database_rows").delete().eq("id", rowId);
  if (error) throw error;
  revalidatePath("/workspace");
}
