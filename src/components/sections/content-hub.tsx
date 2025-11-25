"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { getPosts } from "@/lib/api";
import { formatDate } from "@/lib/utils";
import type { Post } from "@/lib/types";

export function ContentHub() {
  const [latestPosts, setLatestPosts] = useState<Post[]>([]);
  const [featuredPosts, setFeaturedPosts] = useState<Post[]>([]);
  const [trendingPosts, setTrendingPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllPosts() {
      setLoading(true);
      setError(null);

      try {
        const [latestResponse, featuredResponse, trendingResponse] = await Promise.all([
          getPosts({ limit: 10 }),
          getPosts({ featured: true, limit: 2 }),
          getPosts({ trending: true, limit: 8 }),
        ]);

        if (latestResponse.success && latestResponse.data) {
          setLatestPosts(latestResponse.data);
        } else {
          setError(latestResponse.error || "Failed to load posts");
        }

        if (featuredResponse.success && featuredResponse.data) {
          setFeaturedPosts(featuredResponse.data);
        }

        if (trendingResponse.success && trendingResponse.data) {
          setTrendingPosts(trendingResponse.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    }

    fetchAllPosts();
  }, []);

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    const fetchAllPosts = async () => {
      try {
        const [latestResponse, featuredResponse, trendingResponse] = await Promise.all([
          getPosts({ limit: 10 }),
          getPosts({ featured: true, limit: 2 }),
          getPosts({ trending: true, limit: 8 }),
        ]);

        if (latestResponse.success && latestResponse.data) {
          setLatestPosts(latestResponse.data);
        } else {
          setError(latestResponse.error || "Failed to load posts");
        }

        if (featuredResponse.success && featuredResponse.data) {
          setFeaturedPosts(featuredResponse.data);
        }

        if (trendingResponse.success && trendingResponse.data) {
          setTrendingPosts(trendingResponse.data);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "An unexpected error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAllPosts();
  };

  // Exclude featured posts from latest posts
  const featuredIds = new Set(featuredPosts.map((p) => p.id));
  const regularPosts = latestPosts.filter((post) => !featuredIds.has(post.id));

  if (error && !loading) {
    const isConnectionError = error.includes("tidak berjalan") || error.includes("connection");
    
    return (
      <section id="articles" className="py-16">
        <div className="mx-auto max-w-2xl rounded-lg border border-red-200 bg-red-50 p-8 text-center">
          <div className="mb-4">
            <svg
              className="mx-auto h-12 w-12 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h3 className="mb-2 text-lg font-semibold text-red-900">
            Gagal Memuat Data
          </h3>
          <p className="mb-4 text-sm text-red-700">{error}</p>
          
          {isConnectionError && (
            <div className="mb-4 rounded-md bg-white p-4 text-left text-sm">
              <p className="mb-2 font-semibold text-slate-900">Solusi:</p>
              <ol className="list-decimal list-inside space-y-1 text-slate-700">
                <li>Buka terminal baru</li>
                <li>Masuk ke folder server: <code className="rounded bg-slate-100 px-1 py-0.5">cd server</code></li>
                <li>Jalankan server: <code className="rounded bg-slate-100 px-1 py-0.5">npm run dev</code></li>
                <li>Pastikan server berjalan di <code className="rounded bg-slate-100 px-1 py-0.5">http://localhost:5000</code></li>
                <li>Klik tombol &quot;Coba Lagi&quot; di bawah</li>
              </ol>
            </div>
          )}
          
          <Button onClick={handleRetry} variant="outline" className="mt-4">
            Coba Lagi
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section id="articles" className="py-16">
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Latest News - Left Column (2/3 width) */}
        <div className="lg:col-span-2">
          <div className="mb-8 border-b border-slate-200 pb-4">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900">
              Latest News
            </h2>
          </div>

          {loading ? (
            <div className="space-y-8">
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2].map((i) => (
                  <Skeleton key={i} className="h-80 w-full" />
                ))}
              </div>
              <div className="grid gap-6 md:grid-cols-2">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Featured Articles - Side by Side */}
              {featuredPosts.length > 0 && (
                <div className="mb-8 grid gap-6 md:grid-cols-2">
                  {featuredPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group relative overflow-hidden rounded-lg bg-white shadow-sm transition-shadow hover:shadow-md"
                    >
                      <Link href={`/posts/${post.slug}`} className="block">
                        <div className="relative h-64 w-full">
                          <Image
                            src={post.imageUrl}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            priority={index === 0}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <h3 className="mb-2 text-xl font-bold line-clamp-2">
                              {post.title}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-white/90">
                              <span>By {post.author.name}</span>
                              <span>•</span>
                              <span>{formatDate(post.publishedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.article>
                  ))}
                </div>
              )}

              {/* Regular Articles - 2 Column Grid */}
              <div className="mb-8 grid gap-6 md:grid-cols-2">
                {regularPosts.slice(0, 6).map((post, index) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: (featuredPosts.length + index) * 0.05 }}
                    className="group flex gap-4 overflow-hidden rounded-lg bg-white transition-shadow hover:shadow-md"
                  >
                    <Link href={`/posts/${post.slug}`} className="flex gap-4">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="mb-2 text-base font-bold text-slate-900 line-clamp-2 group-hover:text-slate-700 transition-colors">
                          {post.title}
                        </h3>
                        <p className="mb-2 text-sm text-slate-600 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <span>By {post.author.name}</span>
                          <span>•</span>
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </div>

              {/* View More Button */}
              <div className="text-center">
                <Button variant="outline" size="lg" asChild>
                  <Link href="#articles">
                    View More
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </>
          )}
        </div>

        {/* Trending Headlines - Right Column (1/3 width) */}
        <div className="lg:col-span-1">
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold tracking-tight text-slate-900">
              Trending Headlines
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link href="#articles">View All</Link>
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-20 w-full" />
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {trendingPosts.map((post, index) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group flex gap-3 overflow-hidden rounded-lg transition-colors hover:bg-slate-50"
                >
                  <Link href={`/posts/${post.slug}`} className="flex gap-3">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="mb-1 text-sm font-semibold text-slate-900 line-clamp-2 group-hover:text-slate-700 transition-colors">
                        {post.title}
                      </h3>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>By {post.author.name}</span>
                        <span>•</span>
                        <span>{formatDate(post.publishedAt)}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
