

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AETLI - Premium E-commerce Experience",
  description:
    "Discover premium products with exceptional quality and style at aetli.",
  openGraph: {
    images: [
      {
        url: "https://pub-17efedec55164e89bd4ffc8eb8674e04.r2.dev/public/aetli-logo.svg",
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}
