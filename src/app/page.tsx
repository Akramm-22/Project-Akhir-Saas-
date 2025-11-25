import { HeroSpotlight } from "@/components/home/hero-spotlight";
import { LatestNewsGrid } from "@/components/home/latest-news-grid";
import { TrendingHeadlines } from "@/components/home/trending-headlines";
import { CategoryShowcase } from "@/components/home/category-showcase";
import { NewsletterSection } from "@/components/sections/newsletter-section";
import { getPosts } from "@/lib/api";
import type { Post } from "@/lib/types";

export default async function Home() {
  const [allRes, trendingRes] = await Promise.all([
    getPosts({ limit: 12 }),
    getPosts({ trending: true, limit: 6 }),
  ]);

  if (!allRes.success || !allRes.data || allRes.data.length === 0) {
    return (
      <div className="rounded-2xl border border-rose-100 bg-rose-50 p-10 text-center text-rose-800">
        {allRes.error || "Belum ada berita yang tersedia. Pastikan API telah berjalan."}
      </div>
    );
  }

  const posts = allRes.data;
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const highlights = posts.filter((post) => post.id !== featured.id).slice(0, 3);
  const latestNews = posts.slice(0, 6);
  const trending =
    trendingRes.success && trendingRes.data && trendingRes.data.length > 0
      ? trendingRes.data
      : posts.slice(0, 6);

  const categories = Array.from(new Set(posts.map((post) => post.category)));

  const categoryShowcase = collectLatestPerCategory(posts).slice(0, 6);

  return (
    <div className="space-y-12 pb-16">
      <HeroSpotlight categories={categories} featured={featured} highlights={highlights} />
      <div className="grid gap-8 lg:grid-cols-[2fr,1fr]">
        <LatestNewsGrid posts={latestNews} />
        <TrendingHeadlines posts={trending.slice(0, 6)} />
      </div>
      <CategoryShowcase data={categoryShowcase} />
      <NewsletterSection />
    </div>
  );
}

function collectLatestPerCategory(posts: Post[]) {
  const map = new Map<string, Post>();

  posts
    .sort((a, b) => Number(new Date(b.publishedAt)) - Number(new Date(a.publishedAt)))
    .forEach((post) => {
      if (!map.has(post.category)) {
        map.set(post.category, post);
      }
    });

  return Array.from(map.entries()).map(([category, post]) => ({ category, post }));
}
