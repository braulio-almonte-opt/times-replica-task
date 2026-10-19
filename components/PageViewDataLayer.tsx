'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pushToDataLayer } from '@/app/lib/gtm';

export default function PageViewDataLayer() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const queryString = searchParams.toString();
  const pagePath = queryString ? `${pathname}?${queryString}` : pathname;
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pagePath || lastTrackedPath.current === pagePath) return;

    lastTrackedPath.current = pagePath;
    const pageTitle = document.title.trim() || 'Untitled page';

    pushToDataLayer({
      event: 'page_view',
      page_path: pagePath,
      page_title: pageTitle,
    });
  }, [pagePath]);

  return null;
}
