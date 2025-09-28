import { Montserrat_Alternates } from "next/font/google";
import { getServerSession } from "next-auth";
import { AuthProvdier } from "@/app/utils/SessionProvider";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./main.css";
import "./globals.css";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_HOST_URI),
  title: "Philip Oyelegbin - Full Stack and Cloud Engineer",
  description:
    "Experienced Support Specialist | Frontend Developer | Backend Developer | Cloud & DevOps Engineer",
  favicon: "./favicon.ico",
  type: "website",
  openGraph: {
    title: "Philip Oyelegbin - Full Stack and Cloud Engineer",
    description:
      "Experienced Support Specialist | Frontend Developer | Backend Developer | Cloud & DevOps Engineer",
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

export default async function RootLayout({ children }) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${montAlt.className} bg-background text-text-primary`}>
        <Navbar />
        <AuthProvdier session={session}>
          <main className={montAlt.className}>{children}</main>
        </AuthProvdier>
        <Footer />
      </body>
    </html>
  );
}
