import Image from "next/image";
import ArticleCard from "../components/articleCard";
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-start">
      <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
    </div>
    <div className="flex justify-center items-start">
      <h1 className="text-4xl font-bold mt-4">Welcome to the TIME News Website</h1>
    </div>
    <div className="flex justify-center items-start">
      <p className="text-lg mt-2">Today's Headlines</p>
    </div>
    <div className="flex flex-row justify-center items-start h-64">
      {/* Row with the three articles, also, I know AI likes to write comments but this one is mine
      to keep code organized */}
      {/* Article 1 */}
      <div className="flex flex-col justify-center items-center w-1/3 p-4">
        <ArticleCard title="Hospital Opened Nearby" description="This is the first modern hospital in the area." imageUrl="/images/hospital.jpg" />
        <Link href="/articles/article1" className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
      {/* Article 2 */}
      <div className="flex flex-col justify-center items-center w-1/3 p-4">
        <ArticleCard title="River Dam Built as Flood Control" description="It is expected to hold back floodwaters." imageUrl="/images/riverdam.jpg" />
        <Link href="/articles/article2" className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
      {/* Article 3 */}
      <div className="flex flex-col justify-center items-center w-1/3 p-4">
        <ArticleCard title="Supermarket Prices expected to be rise soon" description="Do your groceries while you can." imageUrl="/images/supermarket.jpeg" />
        <Link href="/articles/article3" className="text-blue-500 mt-2">
          Read more
        </Link>
      </div>
    </div>
    </>
  );
}
