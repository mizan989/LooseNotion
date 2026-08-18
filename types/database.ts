export type ColumnType = "text" | "number" | "select" | "checkbox" | "date";

export interface SelectOption {
  id: string;
  label: string;
  color: string;
}

export interface DatabaseColumn {
  id: string;
  databaseId: string;
  name: string;
  type: ColumnType;
  options: SelectOption[] | null; // used for "select" columns
  position: number;
}

export interface DatabaseRow {
  id: string;
  databaseId: string;
  position: number;
  values: Record<string, string | number | boolean | null>; // keyed by column id
  createdAt: string;
}

export interface DatabaseRecord {
  id: string;
  pageId: string;
  name: string;
  createdAt: string;
}

export type DatabaseViewType = "table" | "board" | "list";
