import type { DataLayerArticleViewEvent } from "@/app/types/gtm";

export function pushToDataLayer(data: DataLayerArticleViewEvent) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}