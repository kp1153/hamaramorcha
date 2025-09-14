import Link from "next/link";

const menuItems = [
  { name: "होम", href: "/" },
  { name: "देश-विदेश", href: "/desh-videsh" },
  { name: "जीवन के रंग", href: "/jeevan-ke-rang" },
  { name: "विविध", href: "/vividh" },
  { name: "प्रतिरोध", href: "/pratirodh" },
  { name: "कला-साहित्य", href: "/kala-sahitya" },
  { name: "कृषि-मवेशी", href: "/krishi-maveshi" },
  { name: "टीम", href: "/team" }
];

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="bg-red-600 text-white">
        <div className="container mx-auto px-4 py-2">
          <Link href="/">
            <h1 className="text-2xl font-bold text-center hover:text-red-100 transition-colors cursor-pointer">
              हमारा मोर्चा
            </h1>
          </Link>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center lg:justify-start items-center py-3">
          {menuItems.map((item) => (
            <Link 
              key={item.name}
              href={item.href} 
              className="px-4 py-2 text-gray-700 hover:text-red-600 font-medium transition-colors"
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