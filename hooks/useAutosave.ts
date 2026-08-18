"use client";

import { useEffect, useRef } from "react";
import { useEditorStore } from "@/stores/editor-store";

/**
 * Debounces calls to `save` and drives the "Saving... / Saved" indicator
 * in the editor toolbar via the editor store.
 */
export function useAutosave<T>(value: T, save: (value: T) => Promise<void>, delayMs = 800) {
  const setSaveStatus = useEditorStore((s) => s.setSaveStatus);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const isFirstRun = useRef(true);

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    setSaveStatus("saving");
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      await save(value);
      setSaveStatus("saved");
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
}
