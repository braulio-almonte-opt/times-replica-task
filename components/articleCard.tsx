import Image from "next/image";

//This was genuenly my idea but AI helped me to do it correctly as I knew that every card should be an indenpendent component.
//Most likely I could also apply the same logic I did with the articles and so make a 
//file in the data folder that contains the desired data for the ArticleCards.

export default function ArticleCard({ title, description, imageUrl }: { title: string; description: string; imageUrl: string }) {
  return (
    <div className="flex flex-col justify-center items-center w-1/2 p-4">
      <div className="w-full h-64 relative">
        <Image
          src={imageUrl}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>
      <h2 className="text-lg font-bold mt-4">{title}</h2>
      <p className="text-sm mt-2">{description}</p>
    </div>
  );
}