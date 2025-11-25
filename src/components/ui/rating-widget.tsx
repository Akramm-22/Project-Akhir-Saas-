"use client";

import { useState } from "react";
import { Star, CheckCircle, Loader2, AlertTriangle } from "lucide-react";
import { ratePost } from "@/lib/api";
import type { PostStats } from "@/lib/types";

interface RatingWidgetProps {
  postId: string;
  stats: PostStats;
}

export function RatingWidget({ postId, stats }: RatingWidgetProps) {
  const [currentStats, setCurrentStats] = useState(stats);
  const [selected, setSelected] = useState<number | null>(null);
  const [hovered, setHovered] = useState<number | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  async function handleRate(value: number) {
    setSelected(value);
    setHovered(null);
    setStatus("loading");
    setMessage("");

    const response = await ratePost(postId, value);
    if (response.success && response.data) {
      setCurrentStats(response.data.stats);
      setStatus("success");
      setMessage("Terima kasih atas penilaiannya!");
    } else {
      setStatus("error");
      setMessage(response.error ?? "Gagal mengirim rating. Coba lagi.");
    }
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center">
      <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Rating pembaca</p>
      <div className="mt-3 flex items-baseline justify-center gap-2">
        <p className="text-4xl font-semibold text-slate-900">
          {currentStats.averageRating.toFixed(1)}
        </p>
        <p className="text-sm text-slate-500">/5</p>
      </div>
      <p className="text-xs text-slate-500">
        {currentStats.ratingCount.toLocaleString("id-ID")} ulasan
      </p>
      <div className="mt-4 flex items-center justify-center gap-2">
        {[1, 2, 3, 4, 5].map((value) => {
          const active = hovered ? value <= hovered : value <= (selected ?? currentStats.averageRating);
          return (
            <button
              key={value}
              aria-label={`Beri rating ${value}`}
              onMouseEnter={() => setHovered(value)}
              onMouseLeave={() => setHovered(null)}
              onClick={() => handleRate(value)}
              disabled={status === "loading"}
              className={`rounded-full p-2 transition ${active ? "text-amber-500" : "text-slate-400"}`}
            >
              <Star className="h-7 w-7 fill-current" />
            </button>
          );
        })}
      </div>
      {status === "loading" && (
        <div className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
          <Loader2 className="h-4 w-4 animate-spin" />
          Mengirim penilaian...
        </div>
      )}
      {status !== "idle" && status !== "loading" && message && (
        <div
          className={`mt-3 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs ${
            status === "success"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-rose-100 text-rose-700"
          }`}
        >
          {status === "success" ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <AlertTriangle className="h-4 w-4" />
          )}
          {message}
        </div>
      )}
    </div>
  );
}

