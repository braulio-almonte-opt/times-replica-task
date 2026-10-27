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
          className="mb-2 text-sm font-semibold text-foreground-secondary"
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
          className="w-full rounded-lg border border-border-strong bg-surface px-4 py-3 text-base text-foreground outline-none transition placeholder:text-foreground-disabled focus:border-accent focus:ring-2 focus:ring-accent/20"
        />
        {state.message && (
          <p
            className={`mt-3 text-sm ${
              state.status === "error" ? "text-error" : "text-success"
            }`}
            role={state.status === "error" ? "alert" : "status"}
          >
            {state.message}
          </p>
        )}
        <button
          type="submit"
          disabled={pending}
          className="mt-4 w-full rounded-full bg-accent px-5 py-3 font-semibold text-inverse transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Signing up..." : "Sign Up"}
        </button>
      </form>
      <p className="mt-4 text-center text-sm leading-6 text-foreground-subtle">
        We respect your privacy. Unsubscribe at any time.
      </p>
    </div>
  );
}
