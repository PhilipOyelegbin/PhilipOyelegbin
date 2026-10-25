import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import Header from "./components/features/Header";
import Footer from "./components/features/Footer";

const montserrat = Montserrat({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
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
  authors: [
    { name: "Philip Oyelegbin", url: "https://philip.oyelegbin.name.ng" },
  ],
  openGraph: {
    title:
      "Philip Oyelegbin - L2/L3 Technical Support, Software Engineer | Full-Stack JavaScript, DevOps & Cloud Technologies",
    description:
      "Experienced Support Specialist | Full-Stack Developer | Cloud & DevOps Engineer",
    url: process.env.NEXT_PUBLIC_HOST_URI,
    type: "website",
    locale: "en_US",
    images: "./opengraph-image.png",
    siteName: "Philip Oyelegbin",
  },
  twitter: {
    title:
      "Philip Oyelegbin - L2/L3 Technical Support, Software Engineer | Full-Stack JavaScript, DevOps & Cloud Technologies",
    description:
      "Experienced Support Specialist | Full-Stack Developer | Cloud & DevOps Engineer",
    site: "@OyelegbinPhilip",
    images: [`${process.env.NEXT_PUBLIC_HOST_URI}/opengraph-image.png`],
    card: "summary_large_image",
    creator: "@OyelegbinPhilip",
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
      url: "./apple-touch-icon.png",
    },
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${montserrat.className} ${poppins.className} h-full antialiased`}
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
