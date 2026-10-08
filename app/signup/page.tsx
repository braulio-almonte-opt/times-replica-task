
'use client';
import { useActionState } from "react";
import Link from "next/link";
import Image from "next/image";
import { exportValidEmail } from "@/scripts/emailExport";

const initialState = { status: "idle" as const, message: "" };

export default function Signup(){
    const [state, formAction, pending] = useActionState(exportValidEmail, initialState);
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
            <form action={formAction} className="flex flex-col items-center">
                <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    className="border border-gray-300 rounded-md p-2 mt-4 w-64"
                />
                {state.message && (
                    <p
                        className={state.status === "error" ? "text-red-700" : "text-green-700"}
                        role={state.status === "error" ? "alert" : "status"}
                    >
                        {state.message}
                    </p>
                )}
                <button
                    type="submit"
                    disabled={pending}
                    className="bg-yellow-950 text-white rounded-md p-2 mt-4 transition-colors duration-300 hover:bg-yellow-800"
                >
                    {pending ? "Signing up..." : "Sign Up"}
                </button>
            </form>
            <p className="text-sm text-gray-500 mt-2">We respect your privacy. Unsubscribe at any time.</p>
        </div>
        </>
    );
}