"use client";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";

export default function HistoryFilters({
  defaultQ,
  defaultSort,
}: {
  defaultQ?: string;
  defaultSort?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set(key, value);
    else params.delete(key);
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24, flexWrap: "wrap" }}>
      {/* Search */}
      <div style={{ position: "relative", flex: 1, minWidth: 200, maxWidth: 360 }}>
        <Search
          size={16}
          style={{
            position: "absolute", left: 14, top: "50%",
            transform: "translateY(-50%)", color: "#4B5563", pointerEvents: "none",
          }}
        />
        <input
          type="search"
          defaultValue={defaultQ}
          placeholder="Search by location or type..."
          className="form-input-dark"
          style={{ paddingLeft: 40 }}
          onKeyDown={(e) => {
            if (e.key === "Enter") updateParam("q", (e.target as HTMLInputElement).value);
          }}
          onBlur={(e) => updateParam("q", e.target.value)}
        />
      </div>

      {/* Sort */}
      <select
        defaultValue={defaultSort ?? "newest"}
        className="form-select-dark"
        style={{ width: "auto", minWidth: 160 }}
        onChange={(e) => updateParam("sort", e.target.value)}
      >
        <option value="newest">Newest first</option>
        <option value="oldest">Oldest first</option>
      </select>
    </div>
  );
}
