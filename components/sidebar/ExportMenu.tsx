"use client";

import { useState } from "react";
import { Download } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { exportWorkspace } from "@/actions/workspace";

export function ExportMenu({ workspaceId }: { workspaceId: string }) {
  const [loading, setLoading] = useState(false);

  async function handleExport(format: "markdown" | "json") {
    setLoading(true);
    try {
      const content = await exportWorkspace(workspaceId, format);
      const blob = new Blob([content], {
        type: format === "json" ? "application/json" : "text/markdown",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = format === "json" ? "loosenotion-export.json" : "loosenotion-export.md";
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setLoading(false);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          disabled={loading}
          className="flex items-center gap-2 rounded-md px-2 py-1 text-sm text-muted-foreground hover:bg-accent"
        >
          <Download className="h-3.5 w-3.5" /> {loading ? "Exporting..." : "Export"}
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem onClick={() => handleExport("markdown")}>Export as Markdown</DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport("json")}>Export as JSON</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
