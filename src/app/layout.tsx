import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import TopBar from "@/components/layout/TopBar";
import { ThemeProvider } from "@/components/ThemeProvider";
import LayoutClient from "@/components/layout/LayoutClient";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HyperCalc",
  description: "Engineering Calculator Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex h-screen bg-background text-text-primary transition-colors duration-200">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
          <Sidebar />
          <div className="flex-1 flex flex-col md:pl-60">
            <TopBar />
            <main className="flex-1 overflow-y-auto p-4 pt-20">
              {children}
            </main>
          </div>
          <BottomNav />
          <LayoutClient />
        </ThemeProvider>
      </body>
    </html>
  );
}
