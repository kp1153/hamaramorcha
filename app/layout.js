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
  title: "Hamara Morcha | World, India, Performing Arts, Academics, Health & More",
  description:
    "Hamara Morcha - A struggle for dignity and livelihood. Get latest news on World, India, Performing Arts, Academics, Health, and विविध.",
  keywords: [
    "Hamara Morcha",
    "World news",
    "India news",
    "Performing Arts",
    "Academics news",
    "Health news",
    "विविध समाचार",
    "news website",
    "breaking news",
    "current affairs",
  ],
  openGraph: {
    title: "Hamara Morcha | Latest News & Updates",
    description:
      "A struggle for dignity and livelihood. World, India, Performing Arts, Academics, Health & विविध news.",
    url: "https://www.hamaramorcha.com",
    siteName: "Hamara Morcha",
    images: ["https://www.hamaramorcha.com/logo.png"],
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hamara Morcha | Latest News",
    description: "A struggle for dignity and livelihood. World, India, Performing Arts & more.",
    images: ["https://www.hamaramorcha.com/logo.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
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