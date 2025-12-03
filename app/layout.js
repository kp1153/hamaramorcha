// app/layout.js
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Next.js + Sanity Developer India | High-Performance SEO Websites",
  description:
    "Professional Next.js & Sanity CMS developer in India. We build fast, SEO-optimized, news-grade websites with free hosting, secure architecture, and enterprise-level performance.",
  keywords: [
    "Next.js developer India",
    "Sanity CMS developer",
    "web developer India",
    "Next.js website India",
    "SEO optimized website India",
    "fast news website",
    "React developer India",
    "Sanity expert India",
    "modern web development India",
    "Next.js hosting free",
  ],
  openGraph: {
    title: "Next.js + Sanity Developer India | SEO-Optimized Websites",
    description:
      "Build a powerful, scalable, SEO-friendly website with Next.js 14 and Sanity CMS. Free hosting included.",
    url: "https://yourdomain.com",
    siteName: "Hamara Morcha",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Next.js + Sanity Developer India",
    description:
      "High-speed, SEO-friendly Next.js + Sanity CMS websites with free hosting.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Analytics (untouched) */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'GA_MEASUREMENT_ID');
            `,
          }}
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
