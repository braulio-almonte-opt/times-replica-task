export interface DataLayerArticleViewEvent {
  event: 'article_view';
  article_title: string;
  article_slug: string;
  category_name: string;
  author_name: string;
  published_date?: string;
}

declare global {
  interface Window {
    dataLayer: Record<string, any>[];
  }
}

export {};