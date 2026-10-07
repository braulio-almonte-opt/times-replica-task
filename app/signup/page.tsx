
'use client';
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
// import Logo from "@/components/Banner";

function checkEmail (email: string): boolean {
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; <- Sugested by AI
    const emailRegex = /^[^@]*@[^@]*$/; //<- Also suggested by AI but I just 
    return emailRegex.test(email);
}
export default function Signup(){
    const [email, setEmail] = useState<string>('');
    const [message,setMessage] = useState<string>('');

    const handleSubmit = () => {
        if (checkEmail(email)) {
            setMessage("Thank you for signing up!");
        } else {
            setMessage("Please enter a valid email address.");
        }
   }

    return (
        <>
        <div className="flex justify-center items-center">
          <div className="flex justify-center items-start">
            <Link href="/" className="text-blue-500 hover:underline">
                <Image src="/images/TIME-logo.png" alt="TIME Logo" width={100} height={100} />
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold mt-4">Sign up for our Newsletter</h1>
            <input type="email" placeholder="Enter your email" className="border border-gray-300 rounded-md p-2 mt-4 w-64" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <p className="text-black-500">{message}</p>
            <button className="bg-yellow-950 text-white rounded-md p-2 mt-4 transition-colors duration-300 hover:bg-yellow-800" onClick={handleSubmit}>Sign Up</button>
            <p className="text-sm text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
        </div>
        </>
    );
}