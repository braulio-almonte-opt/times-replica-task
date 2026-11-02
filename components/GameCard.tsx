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
      <article className="overflow-hidden rounded-lg border border-gray-100 bg-white shadow-lg p-4 m-4">
        <div className="flex align-items-center">
        <Image alt="" src={imageURL} width={200} height={100}/>
        </div>

        <div className="p-4 sm:p-6">
          <a href="#">
            <h3 className="text-lg font-medium text-accent hover:text-accent-hover">
              {gameName}
            </h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-500 pb-2">
            {gameDescription}
          </p>

          <button>
            <Link href={slug}>
              <p className="text-white bg-foreground hover:bg-accent p-2 rounded-sm">
                Play Now
              </p>
            </Link>
          </button>
        </div>
      </article>
    </>
  );
}
