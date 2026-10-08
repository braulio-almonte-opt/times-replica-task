import Image from "next/image";
import Link from "next/link";

export default function Banner() {
  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-1 justify-center pl-50">
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-start">
            <Link href="/" className="text-blue-500 hover:underline">
                <Image src="/images/time_logo.png" alt="TIME Logo" width={100} height={100} />
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-end bg-yellow-950 shadow-lg/30 transition-colors duration-300 hover:bg-yellow-800 dark:text-white rounded-full p-2 m-2">
        <button className="rounded-full">
          <Link href="/signup" className="text-white font-semibold">
          Sign up for Newsletter
          </Link>
        </button>
      </div>
    </div>
  );
}