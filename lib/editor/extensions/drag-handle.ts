import { Extension } from "@tiptap/core";
import { Plugin, PluginKey } from "@tiptap/pm/state";
import { Decoration, DecorationSet } from "@tiptap/pm/view";

/**
 * Adds a hover-revealed grip handle to the left of every top-level block.
 * Dragging the handle reorders that block within the document (Step 3 /
 * "Block interactions" -> Drag & drop, Reordering).
 */
export const DragHandle = Extension.create({
  name: "dragHandle",

  addProseMirrorPlugins() {
    let dragFromPos: number | null = null;

    return [
      new Plugin({
        key: new PluginKey("dragHandle"),
        props: {
          decorations: (state) => {
            const decorations: Decoration[] = [];
            state.doc.forEach((node, offset) => {
              const handle = document.createElement("div");
              handle.className = "ln-drag-handle";
              handle.draggable = true;
              handle.innerHTML =
                '<svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><circle cx="5" cy="3" r="1.3"/><circle cx="11" cy="3" r="1.3"/><circle cx="5" cy="8" r="1.3"/><circle cx="11" cy="8" r="1.3"/><circle cx="5" cy="13" r="1.3"/><circle cx="11" cy="13" r="1.3"/></svg>';
              handle.addEventListener("dragstart", (e) => {
                dragFromPos = offset;
                e.dataTransfer?.setData("text/plain", String(offset));
              });
              decorations.push(Decoration.widget(offset + 1, handle, { side: -1 }));
            });
            return DecorationSet.create(state.doc, decorations);
          },
          handleDOMEvents: {
            dragover: (view, event) => {
              event.preventDefault();
              return false;
            },
            drop: (view, event) => {
              if (dragFromPos === null) return false;
              event.preventDefault();

              const coords = { left: event.clientX, top: event.clientY };
              const target = view.posAtCoords(coords);
              if (!target) return false;

              const { state, dispatch } = view;
              const fromNode = state.doc.nodeAt(dragFromPos);
              if (!fromNode) return false;

              const fromEnd = dragFromPos + fromNode.nodeSize;
              let insertPos = state.doc.resolve(target.pos).before(1);
              if (insertPos > dragFromPos && insertPos < fromEnd) return false;

              const tr = state.tr;
              const slice = state.doc.slice(dragFromPos, fromEnd);
              tr.delete(dragFromPos, fromEnd);
              const mappedInsertPos = tr.mapping.map(insertPos);
              tr.insert(mappedInsertPos, slice.content);
              dispatch(tr);

              dragFromPos = null;
              return true;
            },
          },
        },
      }),
    ];
  },
});
