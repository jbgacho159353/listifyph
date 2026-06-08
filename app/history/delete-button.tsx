"use client";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { useState } from "react";

export default function DeleteButton({ id }: { id: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm("Delete this listing? This cannot be undone.")) return;
    setLoading(true);
    await fetch(`/api/listings/${id}/delete`, { method: "POST" });
    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      style={{
        display: "inline-flex", alignItems: "center", gap: 4,
        padding: "4px 10px", borderRadius: 6, cursor: loading ? "wait" : "pointer",
        border: "1px solid rgba(239,68,68,0.3)",
        background: "transparent", color: "#F87171",
        fontSize: "0.78rem", fontWeight: 500, transition: "all 0.15s",
      }}
    >
      <Trash2 size={12} />
      {loading ? "..." : "Delete"}
    </button>
  );
}
