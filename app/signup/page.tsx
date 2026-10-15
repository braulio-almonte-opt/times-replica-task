import Link from "next/link";
import Image from "next/image";
import CustomFooter from "@/components/CustomFooter";
import SignupForm from "./SignupForm";

export default function SignupPage() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="flex justify-center items-start">
          <Link href="/" className="text-blue-500 hover:underline">
            <Image
              src="/images/time_logo.png"
              alt="TIME Logo"
              width={200}
              height={200}
            />
          </Link>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center">
        <SignupForm />
        <CustomFooter />
      </div>
    </>
  );
}
