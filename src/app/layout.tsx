import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { headers } from "next/headers";
import { Header } from "@/components/layouts/header";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CostMyTrip",
  description: "Share Your Travel Costs, Share the Reality",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const url = (await headers()).get("x-url");
  const isSigninPage = url?.includes("/signin");

  return (
    <html lang="en">
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} antialiased`}
      >
        {!isSigninPage && <Header />}
        <main>{children}</main>
      </body>
    </html>
  );
}
