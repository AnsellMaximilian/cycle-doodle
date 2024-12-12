import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { DevCycleClientsideProvider } from "@devcycle/nextjs-sdk";
import { getClientContext } from "./devcycle";
import Navbar from "@/components/Navbar";
// import the getClientContext method from your shared DevCycle file

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cycle Doodle",
  description: "Powered by DevCycle",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <DevCycleClientsideProvider context={getClientContext()}>
          <Navbar />
          <div className="mx-auto container p-4">{children}</div>
        </DevCycleClientsideProvider>
      </body>
    </html>
  );
}
