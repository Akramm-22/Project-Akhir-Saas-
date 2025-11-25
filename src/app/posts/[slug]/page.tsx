import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays, Clock, Share2, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { RatingWidget } from "@/components/ui/rating-widget";
import { getPost, getPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";

export async function generateStaticParams() {
  const response = await getPosts({ limit: 20 });
  if (response.success && response.data) {
    return response.data.map((post) => ({
      slug: post.slug,
    }));
  }
  return [];
}

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const response = await getPost(params.slug);
  if (response.success && response.data) {
    return {
      title: response.data.title,
      description: response.data.excerpt,
      openGraph: {
        title: response.data.title,
        description: response.data.excerpt,
        images: [response.data.imageUrl],
      },
    };
  }

  return {
    title: "Berita tidak ditemukan",
  };
}

export default async function PostDetailPage({ params }: { params: { slug: string } }) {
  const response = await getPost(params.slug);

  if (!response.success || !response.data) {
    notFound();
  }

  const post = response.data;
  const contentBlocks = post.content.split("\n").filter(Boolean);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/10 lg:p-10">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke beranda
        </Link>
        <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-slate-400">
          Newsletter Islam
          <span className="text-slate-300">•</span>
          {formatDate(post.publishedAt)}
        </div>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,3fr)_1fr]">
        <article>
          <Badge className="mb-4 bg-emerald-600 text-white">{post.category}</Badge>
          <h1 className="text-4xl font-semibold leading-tight text-slate-900">{post.title}</h1>
          <p className="mt-4 text-lg text-slate-600">{post.excerpt}</p>

          <div className="mt-6 flex flex-wrap gap-4 rounded-2xl bg-slate-50 p-4 text-sm text-slate-500">
            <span className="inline-flex items-center gap-2">
              <User className="h-4 w-4" />
              {post.author.name}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {post.readTime} menit baca
            </span>
            <span className="inline-flex items-center gap-2">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <div className="relative mt-8 overflow-hidden rounded-3xl">
            <Image
              src={post.imageUrl}
              alt={post.title}
              width={1600}
              height={900}
              className="w-full object-cover"
              priority
            />
          </div>

          <div className="prose prose-lg prose-slate mt-10 max-w-none">
            {contentBlocks.map((paragraph, index) => (
              <p key={index} className="text-slate-700">
                {paragraph}
              </p>
            ))}
          </div>

          {post.tags.length > 0 && (
            <div className="mt-10 flex flex-wrap gap-3">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-slate-200 px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-slate-500"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </article>

        <aside className="space-y-6">
          <RatingWidget postId={post.id} stats={post.stats} />
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-6">
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Penulis</p>
            <div className="mt-4 flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={64}
                height={64}
                className="h-16 w-16 rounded-full object-cover"
              />
              <div>
                <p className="text-lg font-semibold text-slate-900">{post.author.name}</p>
                <p className="text-sm text-slate-500">{post.author.title}</p>
              </div>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Liputan eksklusif dengan verifikasi dari dua narasumber lapangan dan riset
              literatur terbaru.
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm">
            <p className="text-sm font-semibold text-slate-900">Bagikan artikel</p>
            <p className="mt-2 text-xs text-slate-500">Sebarkan informasi bermanfaat</p>
            <div className="mt-4 flex items-center justify-center gap-3">
              {["X", "WA", "FB"].map((label) => (
                <button
                  key={label}
                  className="rounded-full border border-slate-200 px-4 py-2 text-xs font-semibold tracking-[0.3em] text-slate-500 transition hover:border-slate-400 hover:text-slate-900"
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-slate-900 px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white">
              <Share2 className="h-4 w-4" />
              Copy Link
            </div>
          </div>
        </aside>
      </div>
    </section>
  );
}


