export interface DataLayerPageViewEvent extends Record<string, unknown> {
  event: 'page_view';
  page_path: string;
  page_title: string;
}

export interface DataLayerArticleViewEvent extends Record<string, unknown> {
  event: 'article_view';
  article_title: string;
  article_slug: string;
  category_name: string;
  author_name: string;
  article_image_url: string | null;
  published_date?: string;
}

export type DataLayerEvent =
  | DataLayerPageViewEvent
  | DataLayerArticleViewEvent;

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

export {};