'use client';

import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  retry: () => void;
}

export default function ErrorPage({ error, retry }: ErrorPageProps) {
  useEffect(() => {
    console.error('Page rendering failed:', error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center">
      <h1 className="text-2xl font-bold">We couldn&apos;t load this page</h1>
      <p>Please check your connection and try again in a moment.</p>
      <button
        type="button"
        onClick={retry}
        className="rounded-md bg-yellow-950 px-4 py-2 text-white transition-colors hover:bg-yellow-800"
      >
        Try again
      </button>
    </main>
  );
}
