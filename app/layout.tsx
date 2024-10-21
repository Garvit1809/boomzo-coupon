import type { Metadata } from "next";
import "./globals.css";
import AppBottomBar from "@/components/AppBottomBar";
import Bannner from "@/components/Banner";
import { Manrope } from 'next/font/google';
import PageWrapper from "@/components/PageWrapper";
import { Toaster } from "@/components/ui/sonner"

const manrope = Manrope({
  subsets: ['latin'],
  weight: ['200', '400', '600', '800'],
});

export const metadata: Metadata = {
  title: "BoomZo Coupons",
  description: "All Trending Coupons and Deals",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.className}  antialiased`}>
          <PageWrapper>
        <div>
          <Bannner />
        </div>
        <div className="max-w-screen w-full">
          {children}
          <Toaster richColors />
        </div>
        <div className="block sm:hidden">
          <AppBottomBar />
        </div>
        </PageWrapper>
      </body>
    </html>
  );
}
