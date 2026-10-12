'use client';

import { useEffect } from 'react';
import { pushToDataLayer } from '@/app/lib/gtm';

interface ArticleDataLayerProps {
  articleId?: string;
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedDate?: string;
}

export default function ArticleDataLayer({
  articleId,
  title,
  slug,
  category,
  author,
  publishedDate,
}: ArticleDataLayerProps) {
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      pushToDataLayer({
        event: 'article_view',
        article_title: title,
        article_slug: slug,
        category_name: category || 'Uncategorized',
        author_name: author || 'Anonymous',
        published_date: publishedDate,
      });
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [articleId, title, slug, category, author, publishedDate]);

  return null; // Renders no HTML element
}