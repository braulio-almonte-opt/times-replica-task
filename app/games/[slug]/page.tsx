// app/games/[slug]/page.tsx
import { notFound } from 'next/navigation';
import MarketMovers from '@/components/games/MarketMovers';
import WhatYeatWasIt from '@/components/games/WhatYearWasIt';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// 1. Map string slugs to your unique game React components
const gameRegistry: Record<string, React.ComponentType> = {
  'market-movers': MarketMovers,
  'what-year-was-it': WhatYeatWasIt
};

export default async function GameDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 2. Look up the component based on the slug URL parameter
  const SelectedGameComponent = gameRegistry[slug];

  // 3. If the slug doesn't match any game, return a 404 page
  if (!SelectedGameComponent) {
    notFound();
  }

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold capitalize mb-6">
        {slug.replace(/-/g, ' ')}
      </h1>
      
      {/* 4. Render the specific game dynamically */}
      <SelectedGameComponent />
    </main>
  );
}