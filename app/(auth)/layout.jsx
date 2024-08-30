import { Montserrat_Alternates } from "next/font/google";

const montAlt = Montserrat_Alternates({
  subsets: ["latin"],
  weight: ["300", "500", "700"],
});

export const metadata = {
  metadataBase: new URL(process.env.HOST_URI),
  title: "Admin: Philip Oyelegbin - Web and Cloud Engineer",
  description:
    "Result-Driven Support Specialist | Frontend Developer | Cloud Engineer | Passionate Innovator | STEM Advocate",
  favicon: "/favicon.ico",
  type: "website",
  openGraph: {
    title: "Admin: Philip Oyelegbin - Web and Cloud Engineer",
    description:
      "Result-Driven Support Specialist | Frontend Developer | Cloud Engineer | Passionate Innovator | STEM Advocate",
    url: process.env.HOST_URI,
    type: "website",
    locale: "en_US",
    images: "/opengraph-image.png",
    site_name: "Philip Oyelegbin",
  },
  twitter: {
    handle: "@OyelegbinPhilip",
    site: "@OyelegbinPhilip",
    images: "/opengraph-image.png",
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
    icon: "/apple-touch-icon.png",
    shortcut: "/shortcut-icon.png",
    apple: "/apple-touch-icon.png",
    other: {
      rel: "apple-touch-icon-precomposed",
      url: "/apple-touch-icon-precomposed.png",
    },
  },
};

export default function AuthLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <main className={montAlt.className}>{children}</main>
      </body>
    </html>
  );
}
