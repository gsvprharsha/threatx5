import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Threat X5",
  description: "The Universal APT Search Engine",
  icons: '/images/threatx5/icon.png'
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={geistSans.className}
      >
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}