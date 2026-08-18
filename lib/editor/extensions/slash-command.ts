import { Extension } from "@tiptap/core";
import Suggestion, { type SuggestionOptions } from "@tiptap/suggestion";
import { ReactRenderer } from "@tiptap/react";
import { SlashCommandList, type SlashCommandListRef } from "@/components/editor/SlashCommand";
import { filterSlashCommands } from "@/lib/editor/editor-config";

/**
 * Wires up "/" -> Suggestion popup -> SLASH_COMMANDS from editor-config.ts.
 * The popup itself is rendered by components/editor/SlashCommand.tsx.
 */
export const SlashCommand = Extension.create({
  name: "slashCommand",

  addOptions() {
    return {
      suggestion: {
        char: "/",
        startOfLine: false,
        command: ({ editor, range, props }: any) => {
          props.command(editor, range);
        },
      } as Partial<SuggestionOptions>,
    };
  },

  addProseMirrorPlugins() {
    return [
      Suggestion({
        editor: this.editor,
        ...this.options.suggestion,
        items: ({ query }: { query: string }) => filterSlashCommands(query),
        render: () => {
          let component: ReactRenderer<SlashCommandListRef>;
          let popupEl: HTMLDivElement;

          return {
            onStart: (props: any) => {
              component = new ReactRenderer(SlashCommandList, {
                props,
                editor: props.editor,
              });

              popupEl = document.createElement("div");
              popupEl.style.position = "fixed";
              popupEl.style.zIndex = "60";
              document.body.appendChild(popupEl);
              popupEl.appendChild(component.element);
              positionPopup(popupEl, props.clientRect);
            },
            onUpdate: (props: any) => {
              component.updateProps(props);
              positionPopup(popupEl, props.clientRect);
            },
            onKeyDown: (props: any) => {
              if (props.event.key === "Escape") {
                popupEl.remove();
                return true;
              }
              return component.ref?.onKeyDown(props) ?? false;
            },
            onExit: () => {
              popupEl.remove();
              component.destroy();
            },
          };
        },
      }),
    ];
  },
});

function positionPopup(el: HTMLDivElement, clientRect?: (() => DOMRect | null) | null) {
  const rect = clientRect?.();
  if (!rect) return;
  el.style.left = `${rect.left}px`;
  el.style.top = `${rect.bottom + 6}px`;
}
