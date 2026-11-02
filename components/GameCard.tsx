import Link from "next/link";
import Image from "next/image";

interface GameCardProps {
  gameName: string;
  gameDescription: string;
  imageURL: string;
  slug: string;
}

export default function GameCard({
  gameName,
  gameDescription,
  imageURL,
  slug,
}: GameCardProps) {
  return (
    <>
      <article className="flex flex-col justify-between align-items-end overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg p-4 m-4">
        <div className="flex justify-center w-full">
          <Image alt="" loading="eager" src={imageURL} width={200} height={100} className="h-56 w-full object-cover" />
        </div>

        <div className="p-4 sm:p-6">
          <a href="#">
            <h3 className="text-lg font-medium text-accent hover:text-accent-hover">
              {gameName}
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-foreground-muted pb-2">
            {gameDescription}
          </p>
          <div className="mb-5 flex items-end justify-between border-b border-border-strong pb-3 pt-4"></div>
          <button>
            <Link href={`/games/${slug}`}>
              <p className="text-white bg-foreground hover:bg-accent p-2 rounded-sm transition-colors">
                Play Now
              </p>
            </Link>
          </button>
        </div>
      </article>
    </>
  );
}
