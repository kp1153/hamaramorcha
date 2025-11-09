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
      {/* Title Section */}
      <div className="bg-[#006680] text-white">
        <div className="container mx-auto px-4 py-6">
          <Link href="/">
            <h1 className="text-3xl font-extrabold text-center text-pink-600 hover:text-pink-700 transition-colors cursor-pointer">
              हमारा मोर्चा
            </h1>
          </Link>
          <p className="text-base font-semibold text-center mt-2">
            वेबसाइट-मोबाइल ऐप और मेडिकल शॉप-शैक्षणिक संस्थानों हेतु कम पैसों में
            सॉफ्टवेयर बनवाने के लिए करें संपर्क
          </p>
        </div>
      </div>

      {/* Menu Section */}
      <div className="px-4">
        <div className="flex flex-wrap md:flex-nowrap justify-evenly items-center py-3">
          {menuItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="px-4 py-2 text-gray-700 hover:text-[#006680] font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
