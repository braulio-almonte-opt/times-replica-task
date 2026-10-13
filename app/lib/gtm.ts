import type { DataLayerEvent } from "@/app/types/gtm";

export function pushToDataLayer(data: DataLayerEvent) {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(data);
  }
}