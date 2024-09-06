import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { PodcastProvider } from "@/context/PodcastContext";
import { Header } from "./components/header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Podcaster",
  description: "Top 100 Podcast iTunes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} layout-container`}>
        <PodcastProvider>
          <Header />
          {children}
        </PodcastProvider>
      </body>
    </html>
  );
}
