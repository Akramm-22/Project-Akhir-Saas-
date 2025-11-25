import Image from "next/image";
import Link from "next/link";
import { Flame } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDateShort } from "@/lib/utils";

interface TrendingHeadlinesProps {
  posts: Post[];
}

export function TrendingHeadlines({ posts }: TrendingHeadlinesProps) {
  return (
    <aside id="trending" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700">
          <Flame className="h-5 w-5" />
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-rose-600">Trending</p>
          <h2 className="text-xl font-semibold text-slate-900">Headline Populer</h2>
        </div>
      </div>
      <div className="space-y-5">
        {posts.map((post, index) => (
          <Link
            key={post.id}
            href={`/posts/${post.slug}`}
            className="group flex gap-4 rounded-2xl border border-slate-100/70 p-4 transition hover:border-slate-300 hover:bg-slate-50"
          >
            <div className="relative h-16 w-16 overflow-hidden rounded-xl">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            <div className="flex flex-1 flex-col">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
                <span className="text-slate-900">{String(index + 1).padStart(2, "0")}</span>
                •
                <span>{post.category}</span>
                •
                <span>{formatDateShort(post.publishedAt)}</span>
              </div>
              <p className="mt-2 text-sm font-semibold text-slate-900 group-hover:text-rose-700">
                {post.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
}

