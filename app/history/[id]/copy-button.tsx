"use client";
import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  function handleCopy() {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }
  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-brand-border text-xs font-medium text-navy hover:bg-surface transition-colors"
    >
      {copied ? <Check size={13} className="text-success-green" /> : <Copy size={13} />}
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}