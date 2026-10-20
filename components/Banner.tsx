import Image from "next/image";
import Link from "next/link";

interface BannerProp{
  showSignup : Boolean
}

export default function Banner(props : BannerProp) {
  let showButton = props.showSignup

  return (
    <header className="border-b border-neutral-200 bg-white">
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
        {showButton && (<Link
          href="/signup"
          className="rounded-full bg-red-700 px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 sm:px-5"
        >
          Sign up for Newsletter
        </Link>)}
      </div>
    </header>
  );
}