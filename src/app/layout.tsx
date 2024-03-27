import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "IERT Alumni Society",
  description: "IERT Alumni",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased overflow-x-hidden scrollbar-hidden`}
      >
        {children}

        <footer className="bg-[#323e48] text-white text-center space-y-12 text-2xl">
          <p className="break-words">
            Institute of Engineering and Rural Technolgy
          </p>
        </footer>
      </body>
    </html>
  );
}
