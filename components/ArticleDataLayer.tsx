'use client';

import { useEffect, useRef } from 'react';
import { pushToDataLayer } from '@/app/lib/gtm';

interface ArticleDataLayerProps {
  title?: string | null;
  slug: string;
  category?: string | null;
  author?: string | null;
  imageUrl?: string | null;
  publishedDate?: string;
}

export default function ArticleDataLayer({
  title,
  slug,
  category,
  author,
  imageUrl,
  publishedDate,
}: ArticleDataLayerProps) {
  const lastTrackedArticle = useRef<string | null>(null);

  useEffect(() => {
    const eventKey = `${slug}:${title ?? ''}:${category ?? ''}:${author ?? ''}:${imageUrl ?? ''}:${publishedDate ?? ''}`;
    if (lastTrackedArticle.current === eventKey) return;

    lastTrackedArticle.current = eventKey;
    pushToDataLayer({
      event: 'article_view',
      article_title: title?.trim() || 'Untitled article',
      article_slug: slug,
      category_name: category?.trim() || 'Uncategorized',
      author_name: author?.trim() || 'Anonymous',
      article_image_url: imageUrl || '/images/emptynews.jpg',
      published_date: publishedDate,
    });
  }, [title, slug, category, author, imageUrl, publishedDate]);

  return null; // Renders no HTML element
}