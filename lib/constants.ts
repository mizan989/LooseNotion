export const APP_NAME = "LooseNotion";

export const BLOCK_TYPE_LABELS: Record<string, string> = {
  paragraph: "Text",
  heading1: "Heading 1",
  heading2: "Heading 2",
  heading3: "Heading 3",
  bulletList: "Bulleted list",
  numberedList: "Numbered list",
  todo: "To-do",
  quote: "Quote",
  divider: "Divider",
  code: "Code",
  image: "Image",
};

export const COLUMN_TYPE_LABELS: Record<string, string> = {
  text: "Text",
  number: "Number",
  select: "Select",
  checkbox: "Checkbox",
  date: "Date",
};

export const SELECT_COLORS = [
  "#e5484d", "#f76b15", "#f5a623", "#ffd60a",
  "#30a46c", "#3b82f6", "#8b5cf6", "#ec4899",
];

export const KEYBOARD_SHORTCUTS = [
  { keys: "Ctrl + K", action: "Search" },
  { keys: "Ctrl + P", action: "Quick switcher" },
  { keys: "Ctrl + Z", action: "Undo" },
  { keys: "Ctrl + Shift + Z", action: "Redo" },
  { keys: "Ctrl + B", action: "Bold" },
  { keys: "Ctrl + I", action: "Italic" },
];
