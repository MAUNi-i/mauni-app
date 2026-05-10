import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "U-ACT / MAUNi — Built Since 2015",
  description:
    "U-ACT / MAUNi is an international recovery coaching, systemic wellness, and recovery capital ecosystem operating across the UK, South Africa, the Netherlands, and 27 countries worldwide.",
  openGraph: {
    title: "U-ACT / MAUNi — Built Since 2015",
    description:
      "A decade of building recovery capital, systemic wellness, coaching, and recovery infrastructure across 27 countries.",
    type: "website",
    url: "https://uact.org.za",
    images: ["https://uact.org.za/og-image.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "U-ACT / MAUNi — Built Since 2015",
    description:
      "Recovery infrastructure, coaching, systemic wellness, and AI-enabled recovery ecosystems.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
