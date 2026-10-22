import Image from "next/image";
import Link from "next/link";

interface BannerProps {
  showSignup?: boolean;
}

export default function Banner({ showSignup = true }: BannerProps) {
  return (
    <header className="border-b border-border bg-surface">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" aria-label="TIME News home" className="shrink-0">
          <Image
            src="/images/time_logo.png"
            alt="TIME"
            width={160}
            height={64}
            priority
            className="h-auto w-24 sm:w-28"
          />
        </Link>
        {showSignup && (
          <Link
            href="/signup"
            className="rounded-full bg-accent px-4 py-2 text-center text-sm font-semibold text-inverse transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-5"
          >
            Sign up for Newsletter
          </Link>
        )}
      </div>
    </header>
  );
}