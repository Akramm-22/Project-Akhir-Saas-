export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const API_ENDPOINTS = {
  posts: {
    list: `${API_BASE_URL}/posts`,
    detail: (slug: string) => `${API_BASE_URL}/posts/slug/${slug}`,
    featured: `${API_BASE_URL}/posts?featured=true`,
    byCategory: (category: string) =>
      `${API_BASE_URL}/posts?category=${category}`,
    rate: (id: string) => `${API_BASE_URL}/posts/${id}/rate`,
  },
  newsletter: {
    subscribe: `${API_BASE_URL}/newsletter/subscribe`,
  },
} as const;
