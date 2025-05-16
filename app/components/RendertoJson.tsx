import React from "react";

function extractText(node: any): string {
  if (!node) return "";
  if (node.type === "text") return node.text || "";
  if (Array.isArray(node.content)) {
    return node.content.map(extractText).join(" ");
  }
  return "";
}

export function RenderToJson({ data }: { data: any }) {
  const text = extractText(data);
  return (
    <div className="px-2 pt-2">
      {text}
    </div>
  );
}