import Image from "next/image";
import Banner from "@/components/Banner";
import CustomFooter from "@/components/customFooter";
export default function notFound(){
    return (
        <>
        <Banner/>
        <div className="flex flex-col justify-center items-center gap-4">
            <h1 className="text-2xl font-bold">404</h1>
            <Image src="/images/emptynews.jpg" alt="Broken newspaper illustration" height={500} width={500} />
            <h2>There are no news here.</h2>
        </div>
        <CustomFooter/>
        </>
    );
}