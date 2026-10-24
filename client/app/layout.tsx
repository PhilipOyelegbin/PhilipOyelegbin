import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_HOST_URI || "http://localhost:3000",
  ),
  title:
    "Philip Oyelegbin - L2/L3 Technical Support, Software Engineer | Full-Stack JavaScript, DevOps & Cloud Technologies",
  description:
    "Experienced Support Specialist | Full-Stack Developer | Cloud & DevOps Engineer",
  keywords: [
    "Philip Oyelegbin",
    "Technical Support",
    "Software Engineer",
    "Full-Stack JavaScript Developer",
    "DevOps Engineer",
    "Cloud Technologies",
    "Node.js Developer",
    "React Developer",
    "Next.js Developer",
    "NestJS Developer",
    "PHP Developer",
    "Laravel Developer",
  ],
  favicon: "./favicon.ico",
  type: "website",
  openGraph: {
    title:
      "Philip Oyelegbin - L2/L3 Technical Support, Software Engineer | Full-Stack JavaScript, DevOps & Cloud Technologies",
    description:
      "Experienced Support Specialist | Full-Stack Developer | Cloud & DevOps Engineer",
    url: process.env.HOST_URI,
    type: "website",
    locale: "en_US",
    images: "./opengraph-image.png",
    site_name: "Philip Oyelegbin",
  },
  twitter: {
    handle: "@OyelegbinPhilip",
    site: "@OyelegbinPhilip",
    images: "./opengraph-image.png",
    cardType: "summary_large_image",
  },
  robots: {
    index: false,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "./apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "./apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="bg-[#0a0a0c] text-[#f1f0f5] selection:bg-[#7c3aed] selection:text-[#f5f0ff] antialiased min-h-screen flex flex-col font-sans">
        <Toaster position="top-right" />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
