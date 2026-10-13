'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { pushToDataLayer } from '@/app/lib/gtm';

export default function PageViewDataLayer() {
  const pathname = usePathname();
  const lastTrackedPath = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname || lastTrackedPath.current === pathname) return;

    lastTrackedPath.current = pathname;
    const pageTitle = document.title.trim() || 'Untitled page';

    pushToDataLayer({
      event: 'page_view',
      page_path: pathname,
      page_title: pageTitle,
    });
  }, [pathname]);

  return null;
}
