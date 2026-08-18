import type { Editor } from "@tiptap/core";

export interface SlashCommandItem {
  title: string;
  description: string;
  searchTerms: string[];
  command: (editor: Editor, range: { from: number; to: number }) => void;
}

/** The exact "Turn into..." menu from Step 3 of the blueprint. */
export const SLASH_COMMANDS: SlashCommandItem[] = [
  {
    title: "Text",
    description: "Just start writing with plain text.",
    searchTerms: ["paragraph", "text"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setParagraph().run(),
  },
  {
    title: "Heading 1",
    description: "Big section heading.",
    searchTerms: ["h1", "heading"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 1 }).run(),
  },
  {
    title: "Heading 2",
    description: "Medium section heading.",
    searchTerms: ["h2", "heading"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 2 }).run(),
  },
  {
    title: "Heading 3",
    description: "Small section heading.",
    searchTerms: ["h3", "heading"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setNode("heading", { level: 3 }).run(),
  },
  {
    title: "Bulleted list",
    description: "Create a simple bulleted list.",
    searchTerms: ["bullet", "ul", "list"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).toggleBulletList().run(),
  },
  {
    title: "Numbered list",
    description: "Create a list with numbering.",
    searchTerms: ["numbered", "ol", "ordered"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).toggleOrderedList().run(),
  },
  {
    title: "To-do",
    description: "Track tasks with a checklist.",
    searchTerms: ["todo", "task", "checkbox", "checklist"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).toggleTaskList().run(),
  },
  {
    title: "Quote",
    description: "Capture a quote.",
    searchTerms: ["quote", "blockquote"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).toggleBlockquote().run(),
  },
  {
    title: "Code",
    description: "Capture a code snippet.",
    searchTerms: ["code", "codeblock"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).toggleCodeBlock().run(),
  },
  {
    title: "Divider",
    description: "Visually divide blocks.",
    searchTerms: ["divider", "hr", "separator"],
    command: (editor, range) =>
      editor.chain().focus().deleteRange(range).setHorizontalRule().run(),
  },
  {
    title: "Image",
    description: "Embed an image by URL.",
    searchTerms: ["image", "picture", "img"],
    command: (editor, range) => {
      const url = window.prompt("Image URL");
      const chain = editor.chain().focus().deleteRange(range);
      if (url) chain.setImage({ src: url }).run();
      else chain.run();
    },
  },
  {
    title: "Link",
    description: "Turn selected text into a link.",
    searchTerms: ["link", "url", "hyperlink"],
    command: (editor, range) => {
      const url = window.prompt("URL");
      const chain = editor.chain().focus().deleteRange(range);
      if (url) chain.setLink({ href: url }).run();
      else chain.run();
    },
  },
];

export function filterSlashCommands(query: string): SlashCommandItem[] {
  if (!query) return SLASH_COMMANDS;
  const q = query.toLowerCase();
  return SLASH_COMMANDS.filter(
    (item) =>
      item.title.toLowerCase().includes(q) ||
      item.searchTerms.some((term) => term.includes(q))
  );
}
