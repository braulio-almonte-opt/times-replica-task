export default function ContentstackUnavailable() {
  return (
    <main
      role="alert"
      className="flex min-h-screen flex-col items-center justify-center gap-4 p-6 text-center"
    >
      <h1 className="text-2xl font-bold">
        Our news service is temporarily unavailable
      </h1>
      <p>
        We couldn&apos;t retrieve this page right now. Please try again in a
        moment.
      </p>
      <a href="" className="rounded-md bg-yellow-950 px-4 py-2 text-white underline">
        Reload this page
      </a>
    </main>
  );
}
