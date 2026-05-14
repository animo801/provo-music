import type { Metadata } from "next";
import { Inter, Gelasio } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-inter",
});

const gelasio = Gelasio({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-gelasio",
});

export const metadata: Metadata = {
  title: "Provo Music Scene",
  description: "See every show in Provo in one place",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${gelasio.variable}`}>
      <body className="font-[family-name:var(--font-gelasio)] antialiased">
        {children}
      </body>
    </html>
  );
}
