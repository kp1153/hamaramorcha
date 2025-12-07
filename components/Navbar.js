"use client";

import Link from "next/link";
import { useState } from "react";

const menuItems = [
  { name: "Home", href: "/" },
  { name: "World", href: "/world" },
  { name: "India", href: "/india" },
  { name: "Performing Arts", href: "/performing-arts" },
  { name: "Academics", href: "/academics" },
  { name: "Health", href: "/health" },
  { name: "Team", href: "/team" },
  { name: "विविध", href: "/vividha" },
  { name: "Payment", href: "/payment" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="bg-zinc-400">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {/* LOGO + TAGLINE */}
          <Link href="/" className="flex flex-col items-start">
            <h1
              className="text-4xl md:text-6xl font-black tracking-tight text-amber-600"
              style={{
                textShadow:
                  "4px 4px 0px rgba(0,0,0,0.3), 8px 8px 0px rgba(0,0,0,0.15), 2px 2px 10px rgba(255,193,7,0.4)",
                letterSpacing: "0.05em",
              }}
            >
              HAMARA MORCHA
            </h1>
            <p className="mt-2 text-sm md:text-base font-semibold tracking-wide text-blue-600 pl-1">
              A struggle for dignity and livelihood
            </p>
          </Link>

          {/* HAMBURGER BUTTON */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="text-white text-4xl focus:outline-none hover:text-amber-300 transition-colors"
          >
            ☰
          </button>
        </div>

        {/* CONTACT LINE */}
        <div className="container mx-auto px-4 pb-4 flex flex-col sm:flex-row justify-center items-center gap-2 sm:gap-4">
          <p className="text-sm sm:text-base text-rose-600 font-bold text-center">
            Need a Website, Software or Mobile App? Contact us today.
          </p>

          <a
            href="tel:+919996865069"
            className="text-amber-300 font-bold text-base sm:text-lg hover:text-amber-200 transition-colors whitespace-nowrap"
          >
            📱 +91 9996865069
          </a>
        </div>
      </div>

      {/* MENU */}
      {open && (
        <div className="bg-white border-t shadow-inner">
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
