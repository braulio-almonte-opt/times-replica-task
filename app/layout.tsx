import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { GoogleTagManager } from "@next/third-parties/google";
import PageViewDataLayer from "@/components/PageViewDataLayer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TIME Replica",
  description: "TIME Replica built for the Next.js practice task",
};

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID
export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      {GTM_ID ? <GoogleTagManager gtmId={GTM_ID} /> : null}
      <body className="min-h-full flex flex-col">
        <Suspense fallback={null}>
          <PageViewDataLayer />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
