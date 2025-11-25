import Image from "next/image";
import Link from "next/link";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface CategoryShowcaseProps {
  data: {
    category: string;
    post: Post;
  }[];
}

export function CategoryShowcase({ data }: CategoryShowcaseProps) {
  return (
    <section id="kategori" className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-col gap-2">
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Kategori</p>
        <h2 className="text-2xl font-semibold text-slate-900">
          Update Terbaru dari Tiap Kanal
        </h2>
        <p className="text-sm text-slate-500">
          Sistem otomatis memilih berita paling baru dari setiap kategori utama.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map(({ category, post }) => (
          <Link
            key={category}
            href={`/posts/${post.slug}`}
            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100"
          >
            <div className="relative h-40 w-full">
              <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/80 to-transparent p-4 text-sm font-semibold text-white">
                {category}
              </div>
            </div>
            <div className="flex flex-1 flex-col gap-3 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-400">
                {formatDate(post.publishedAt)}
              </p>
              <h3 className="text-base font-semibold text-slate-900 group-hover:text-emerald-700">
                {post.title}
              </h3>
              <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

