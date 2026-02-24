// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import AuthButton from "./AuthButton";
import SearchBar from "./SearchBar";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "📞 संपर्क करें", href: "/contact" },
  { name: "हमारी टीम", href: "/team" },
  { name: "World", href: "/world" },
  { name: "India", href: "/india" },
  { name: "Performing Arts", href: "/performing-arts" },
  { name: "Academics", href: "/academics" },
  { name: "Health", href: "/health" },
  { name: "विविध", href: "/vividha" },
  { name: "Payment", href: "/payment" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="bg-zinc-400">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex flex-col items-start">
            <Image
              src="/logo.jpeg"
              alt="Hamara Morcha Logo"
              width={300}
              height={80}
              className="object-contain"
            />
            <p className="mt-2 text-sm md:text-base font-semibold tracking-wide text-green-700 pl-1">
              A struggle for dignity and livelihood
            </p>
          </Link>

          {/* Desktop Search Bar - मध्यम स्क्रीन से ऊपर दिखेगा */}
          <div className="hidden md:block flex-1 max-w-xl mx-4">
            <SearchBar />
          </div>

          {/* Right side buttons */}
          <div className="flex items-center gap-4">
            <AuthButton />
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="text-white text-4xl focus:outline-none hover:text-blue-300 transition-colors"
            >
              ☰
            </button>
          </div>
        </div>

        {/* Bottom strip with contact info */}
        <div className="container mx-auto px-4 pb-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <p className="text-sm sm:text-base text-rose-600 font-bold text-center">
            Need a Website, Software or Mobile App? Contact us today.
          </p>
          <a
            href="tel:+919996865069"
            className="text-indigo-600 font-bold text-base sm:text-lg hover:text-amber-200 transition-colors whitespace-nowrap"
          >
            📱 +91 9996865069
          </a>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="bg-white border-t shadow-inner">
          {/* Mobile Search Bar - सिर्फ मोबाइल में मेन्यू खुलने पर दिखेगा */}
          <div className="md:hidden px-4 py-3 border-b">
            <SearchBar />
          </div>
          
          {/* Menu Items */}
          <ul className="flex flex-col py-3">
            {menuItems.map((item) => (
              <li key={item.name} className="border-b last:border-b-0">
                <Link
                  href={item.href}
                  className="block px-6 py-3 text-teal-700 hover:text-cyan-600 hover:bg-gray-50 font-medium transition-all"
                  onClick={() => setOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;