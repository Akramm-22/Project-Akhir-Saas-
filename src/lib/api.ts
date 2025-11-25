import { API_ENDPOINTS } from "./config";
import type { ApiResponse, Post, NewsletterSubscription } from "./types";

// Backend Post format
interface BackendPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  tags: string[];
  featured: boolean;
  trendingScore: number;
  publishedAt: string;
  readingTime: number;
  author: {
    name: string;
    title: string;
    avatar: string;
  };
  stats: {
    averageRating: number;
    ratingCount: number;
  };
}

// Transform backend post to frontend post
function transformPost(backendPost: BackendPost): Post {
  return {
    id: backendPost.id,
    slug: backendPost.slug,
    title: backendPost.title,
    excerpt: backendPost.excerpt,
    content: backendPost.content,
    author: backendPost.author,
    category: backendPost.category,
    tags: backendPost.tags,
    publishedAt: backendPost.publishedAt,
    imageUrl: backendPost.coverImage,
    readTime: backendPost.readingTime,
    featured: backendPost.featured,
    stats: backendPost.stats,
  };
}

async function fetchAPI<T>(
  url: string,
  options?: RequestInit,
  retries = 3
): Promise<ApiResponse<T>> {
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          "Content-Type": "application/json",
          ...options?.headers,
        },
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({
          message: `HTTP error! status: ${response.status}`,
        }));
        
        // Handle backend error format: { status: "error", message: "..." }
        const errorMessage = errorData.message || errorData.error || `HTTP ${response.status}`;
        throw new Error(errorMessage);
      }

      const data = await response.json();
      
      // Handle backend response format: { status: "success", data: [...] }
      if (data.status === "success" && data.data !== undefined) {
        return {
          success: true,
          data: data.data,
        };
      }
      
      // Fallback for direct data response
      return {
        success: true,
        data: data,
      };
    } catch (error) {
      // Don't retry on connection refused - backend is not running
      if (error instanceof TypeError && error.message.includes("Failed to fetch")) {
        return {
          success: false,
          error: "Backend server tidak berjalan. Silakan jalankan server dengan perintah: cd server && npm run dev",
        };
      }

      if (attempt === retries) {
        let errorMessage = "Network error. Please check your connection.";
        
        if (error instanceof Error) {
          if (error.message.includes("Failed to fetch") || error.message.includes("ERR_CONNECTION_REFUSED")) {
            errorMessage = "Backend server tidak berjalan. Silakan jalankan server dengan perintah: cd server && npm run dev";
          } else if (error.message.includes("timeout") || error.name === "AbortError") {
            errorMessage = "Request timeout. Server mungkin tidak merespons.";
          } else {
            errorMessage = error.message;
          }
        } else if (error instanceof DOMException && error.name === "AbortError") {
          errorMessage = "Request timeout. Server mungkin tidak merespons.";
        }

        return {
          success: false,
          error: errorMessage,
        };
      }
      // Wait before retry (exponential backoff)
      await new Promise((resolve) => setTimeout(resolve, 1000 * attempt));
    }
  }

  return {
    success: false,
    error: "Failed after retries",
  };
}

export async function getPosts(filters?: {
  featured?: boolean;
  category?: string;
  trending?: boolean;
  limit?: number;
}): Promise<ApiResponse<Post[]>> {
  let url = API_ENDPOINTS.posts.list;
  const params = new URLSearchParams();

  if (filters?.featured) params.append("featured", "true");
  if (filters?.category) params.append("category", filters.category);
  if (filters?.trending) params.append("trending", "true");
  if (filters?.limit) params.append("limit", filters.limit.toString());

  if (params.toString()) {
    url += `?${params.toString()}`;
  }

  const response = await fetchAPI<BackendPost[]>(url);
  
  if (response.success && response.data) {
    return {
      success: true,
      data: response.data.map(transformPost),
    };
  }

  return response as ApiResponse<Post[]>;
}

export async function getPost(slug: string): Promise<ApiResponse<Post>> {
  const response = await fetchAPI<BackendPost>(API_ENDPOINTS.posts.detail(slug));
  
  if (response.success && response.data) {
    return {
      success: true,
      data: transformPost(response.data),
    };
  }

  return response as ApiResponse<Post>;
}

export async function subscribeNewsletter(
  data: NewsletterSubscription
): Promise<ApiResponse<{ message: string }>> {
  return fetchAPI<{ message: string }>(API_ENDPOINTS.newsletter.subscribe, {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function ratePost(
  id: string,
  rating: number,
): Promise<ApiResponse<{ stats: Post["stats"] }>> {
  return fetchAPI<{ stats: Post["stats"] }>(API_ENDPOINTS.posts.rate(id), {
    method: "POST",
    body: JSON.stringify({ rating }),
  });
}
