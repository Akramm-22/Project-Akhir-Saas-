export interface AuthorInfo {
  name: string;
  title: string;
  avatar: string;
}

export interface PostStats {
  averageRating: number;
  ratingCount: number;
}

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: AuthorInfo;
  category: string;
  tags: string[];
  publishedAt: string;
  imageUrl: string;
  readTime: number;
  featured?: boolean;
  stats: PostStats;
}

export interface NewsletterSubscription {
  email: string;
  name?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}
