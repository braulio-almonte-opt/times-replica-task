import Image from "next/image";
import Banner from "@/components/Banner";
import CustomFooter from "@/components/CustomFooter";
import Link from "next/link";

export default function notFound(){
    return (
        <>
        <Banner/>
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-bold">404</h1>
            <Image src="/images/emptynews.jpg" alt="Broken newspaper illustration" height={500} width={500} />
            <h2>There are no news here.</h2>
            <button className="bg-yellow-950 text-white rounded-md p-2 mt-4 transition-colors duration-300 hover:bg-yellow-800">
            <Link href="/">
            Go back to home page
            </Link>
            </button>
        </div>
        <CustomFooter/>
        </>
    );
}