import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Post } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface HeroSpotlightProps {
  categories: string[];
  featured: Post;
  highlights: Post[];
}

export function HeroSpotlight({ categories, featured, highlights }: HeroSpotlightProps) {
  return (
    <section
      id="headline"
      className="rounded-3xl bg-slate-950 text-white shadow-2xl shadow-slate-900/30"
    >
      <div className="border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.3em] text-white/70">
        Newsroom • Indonesia • Dunia Muslim
      </div>
      <div className="flex flex-col gap-10 px-6 py-10 lg:flex-row">
        <div className="flex-1 space-y-6">
          <div className="flex flex-wrap gap-2 text-sm text-white/70">
            {categories.slice(0, 8).map((cat) => (
              <span key={cat} className="rounded-full border border-white/20 px-3 py-1">
                {cat}
              </span>
            ))}
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-white/10">
            <div className="relative aspect-[16/9] w-full bg-slate-900">
              <Image
                src={featured.imageUrl}
                alt={featured.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="mb-3 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-emerald-200">
                  {featured.category}
                  <span className="text-white/60">•</span>
                  {formatDate(featured.publishedAt)}
                </div>
                <h1 className="mb-4 text-3xl font-semibold leading-tight lg:text-4xl">
                  {featured.title}
                </h1>
                <p className="mb-6 text-base text-white/80 lg:text-lg">{featured.excerpt}</p>
                <Link
                  href={`/posts/${featured.slug}`}
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Baca Selengkapnya
                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full space-y-6 lg:w-96">
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            Sorotan Redaksi
          </p>
          <div className="space-y-6">
            {highlights.map((post) => (
              <Link
                key={post.id}
                href={`/posts/${post.slug}`}
                className="group flex gap-4 rounded-2xl border border-white/10 bg-white/5 p-4 transition hover:bg-white/10"
              >
                <div className="relative h-24 w-24 overflow-hidden rounded-xl">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <p className="text-xs uppercase tracking-[0.2em] text-emerald-200">
                    {post.category}
                  </p>
                  <h3 className="mt-2 text-base font-semibold leading-snug text-white group-hover:text-emerald-200">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/70">{formatDate(post.publishedAt)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

