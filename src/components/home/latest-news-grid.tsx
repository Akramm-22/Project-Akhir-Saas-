import Image from "next/image";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface LatestNewsGridProps {
  posts: Post[];
}

export function LatestNewsGrid({ posts }: LatestNewsGridProps) {
  return (
    <section id="latest" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-emerald-600">
            Latest News
          </p>
          <h2 className="text-2xl font-semibold text-slate-900">Berita Islam Terbaru</h2>
        </div>
        <Link
          href="#latest"
          className="text-sm font-semibold text-emerald-700 transition hover:text-emerald-500"
        >
          Arsip Lengkap →
        </Link>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {posts.map((post, index) => (
          <article
            key={post.id}
            className={`flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-slate-50 ${index < 2 ? "lg:row-span-2" : ""}`}
          >
            <div className="relative aspect-[4/3] w-full">
              <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
              <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-900">
                {post.category}
              </div>
            </div>
            <div className="flex flex-1 flex-col px-5 py-6">
              <h3 className="text-xl font-semibold text-slate-900">{post.title}</h3>
              <p className="mt-3 flex-1 text-sm text-slate-600">{post.excerpt}</p>
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5" />
                  {formatDate(post.publishedAt)}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  {post.readTime} menit baca
                </span>
              </div>
              <Link
                href={`/posts/${post.slug}`}
                className="mt-5 inline-flex items-center text-sm font-semibold text-emerald-700 transition hover:text-emerald-500"
              >
                Baca selengkapnya →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

