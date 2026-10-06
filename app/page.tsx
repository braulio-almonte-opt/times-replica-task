import Image from "next/image";
import ArticleCard from "../components/articleCard";

export default function Home() {
  return (
    <>
    <div className="flex justify-center items-start">
      <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
    </div>
    <div className="flex flex-row justify-center items-start h-64">
      {/* Row with the three articles, also, I know AI likes to write comments but this one is mine
      to keep code organized */}
      <div className="flex flex-col justify-center items-center w-1/3 p-4">
        <ArticleCard title="Article 1" description="This is the first article." imageUrl="/images/hospital.jpg" />
        <a href="/articles/article1" className="text-blue-500 mt-2">Read more</a>
      </div>

    </div>
    </>
  );
}
