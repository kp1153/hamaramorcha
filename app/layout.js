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
  title: "High-Performance Next.js + Sanity Websites | Free Hosting Included",
  description:
    "We build fast, modern, SEO-optimized websites using Next.js and Sanity CMS. Get a powerful news-grade website with free hosting, lightning performance, and professional support.",
  keywords: [
    "Next.js developer",
    "Sanity CMS",
    "SEO optimized website",
    "free hosting website",
    "fast news website",
    "Next.js India",
    "Sanity expert",
    "modern web development",
  ],
  openGraph: {
    title: "Next.js + Sanity Websites with Free Hosting",
    description:
      "Build your powerful, scalable website with Next.js and Sanity. Free hosting included.",
    url: "https://yourdomain.com",
    siteName: "Hamara Morcha",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="hi">
      <head>
        {/* Google Analytics */}
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
