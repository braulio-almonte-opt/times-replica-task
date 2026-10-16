"use client";

import { useActionState } from "react";
import { exportValidEmail } from "@/scripts/emailExport";

const initialState = { status: "idle" as const, message: "" };

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(
    exportValidEmail,
    initialState,
  );

  return (
    <div>
      <form action={formAction} className="flex flex-col">
        <label
          htmlFor="newsletter-email"
          className="mb-2 text-sm font-semibold text-neutral-800"
        >
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="w-full rounded-lg border border-neutral-300 bg-white px-4 py-3 text-base text-neutral-950 outline-none transition placeholder:text-neutral-400 focus:border-red-700 focus:ring-2 focus:ring-red-700/20"
        />
        {state.message && (
          <p
            className={`mt-3 text-sm ${
              state.status === "error" ? "text-red-700" : "text-green-700"
            }`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-full bg-red-700 px-5 py-3 font-semibold text-white transition-colors hover:bg-red-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-700 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm leading-6 text-neutral-500">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
