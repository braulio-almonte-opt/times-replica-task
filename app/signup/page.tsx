import CustomFooter from "@/components/CustomFooter";
import SignupForm from "./SignupForm";
import Banner from "@/components/Banner";

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Banner showSignup={false}/>
      <main className="mx-auto flex w-full max-w-7xl flex-1 items-start justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <section
          aria-labelledby="signup-heading"
          className="w-full max-w-2xl overflow-hidden rounded-xl border border-border bg-surface shadow-sm"
        >
          <div className="h-1.5 bg-accent" />
          <div className="px-5 py-8 sm:px-10 sm:py-12">
            <p className="mb-3 text-center text-xs font-bold uppercase tracking-[0.2em] text-accent">
              TIME Newsletter
            </p>
            <h1
              id="signup-heading"
              className="text-center font-serif text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Sign up for our Newsletter
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-center leading-7 text-foreground-muted">
              Get the latest stories and headlines from TIME, delivered to your
              inbox.
            </p>
            <div className="mx-auto mt-8 max-w-md">
              <SignupForm />
            </div>
          </div>
        </section>
      </main>
      <div className="mt-auto">
        <CustomFooter />
      </div>
    </div>
  );
}
