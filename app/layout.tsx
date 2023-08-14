import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import NextAuthProvider from "@/providers/NextAuthProvider";
import ToastProvider from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Rock & Play",
  description:
    "Welcome to Rock & Play, your ultimate destination for listening to music.Immerse yourself in a world of captivating melodies and harmonious rhythms, as we bring you a curated selection of songs spanning genres, eras, and moods. With an easy-to-use interface, you can effortlessly explore our extensive list of songs",
  keywords: [
    "music",
    "listen to music",
    "songs",
    "audio",
    "spotify",
    "song",
    "beat",
    "gaana",
    "perfect",
    "love me like you do",
    "dil diyan galla",
    "pee loon",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          <ToastProvider />
          <Navbar />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
