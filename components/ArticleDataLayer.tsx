'use client';

import { useEffect } from 'react';
import { pushToDataLayer } from '@/app/lib/gtm';

interface ArticleDataLayerProps {
  title: string;
  slug: string;
  category: string;
  author: string;
  publishedDate?: string;
}

export default function ArticleDataLayer({
  title,
  slug,
  category,
  author,
  publishedDate,
}: ArticleDataLayerProps) {
  useEffect(() => {
    
      pushToDataLayer({
        event: 'article_view',
        article_title: title,
        article_slug: slug,
        category_name: category || 'Uncategorized',
        author_name: author || 'Anonymous',
        published_date: publishedDate,
      });
    ;
  }, [title, slug, category, author, publishedDate]);

  return null; // Renders no HTML element
}