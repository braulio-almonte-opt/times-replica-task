import Image from "next/image";
export default function ArticleCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-1/3 p-4">
      <div className="w-full h-64 relative">
        <Image src={imageUrl} alt={title} layout="fill" objectFit="cover" />
      </div>
      <h2 className="text-lg font-bold mt-4">{title}</h2>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}