/* eslint-disable @next/next/no-page-custom-font */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Providers } from "./Providers";
import { AnimatedHeader, MenuHeader } from "./MenuHeader";
import { Footer } from "./Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Marie Yoga",
  description: "Cours de yoga",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" suppressHydrationWarning className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Lobster&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" href="/apple-touch-icon-no-bg.png" />
      </head>
      <body
        className={cn(
          geistSans.variable,
          geistMono.variable,
          "antialiased h-full"
        )}
      >
        <Providers>
          <div className="flex flex-col min-h-screen w-full bg-gradient-to-r from-white via-[#fef3c6] to-white dark:bg-white dark:via-white">
            <header className="fixed top-0 left-0 w-full z-50">
              <AnimatedHeader>
                <MenuHeader />
              </AnimatedHeader>
            </header>

            <main className="flex-1 flex flex-col h-full w-full pt-14 lg:pt-16">
              {children}
            </main>

            <footer className="w-full">
              <Footer />
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
