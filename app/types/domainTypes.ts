export interface Author {
  slug: string;
  title: string;
  bio?: string;
  profileImage: string | null;
}

export interface Category {
  title: string;
  slug: string;
}

export interface Article {
  title: string;
  slug: string;
  description: string;
  content: string;
  publishedAt: string;
  featured: boolean;
  imageUrl: string | null;
  author: Author | null;
  category: Category | null;
}
