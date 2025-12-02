import Image from "next/image";
import Link from "next/link";

const menuItems = [
  { name: "होम", href: "/" },
  { name: "देश-विदेश", href: "/desh-videsh" },
  { name: "जीवन के रंग", href: "/jeevan-ke-rang" },
  { name: "इंडस्ट्रियल-एरिया", href: "/industrial-area" },
  { name: "प्रतिरोध", href: "/pratirodh" },
  { name: "कला-साहित्य", href: "/kala-sahitya" },
  { name: "कृषि-मवेशी", href: "/krishi-maveshi" },
  { name: "टीम", href: "/team" },
];

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      {/* LINE 1 — LOGO */}
      <div className="bg-[#006680] text-white">
        <div className="container mx-auto px-4 py-6">
          <Link href="/" className="flex justify-center">
            <h1 className="text-5xl font-bold text-amber-600">हमारा मोर्चा</h1>
          </Link>

          {/* LINE 2 — TAGLINE */}
          <p className="text-base font-semibold text-center mt-4">
            वेबसाइट-सॉफ्टवेयर-मोबाइल ऐप बनाने का काम दिलाएं और आजाद पत्रकारिता
            की करें हेल्प
          </p>
        </div>
      </div>

      {/* LINE 3 — MENU */}
      <div className="bg-yellow-600">
        <div className="container mx-auto">
          <ul className="flex flex-wrap md:flex-nowrap justify-evenly items-center py-3">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className="px-4 py-2 text-rose-600 hover:text-pink-600 font-medium transition-colors"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
