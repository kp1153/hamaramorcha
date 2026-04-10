import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 text-center text-xs text-gray-500 space-y-2">
        <p>
          वेबसाइट · मोबाइल ऐप बनवाने के लिए —{" "}
          <a
            href="https://www.nishantsoftwares.in"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-semibold"
          >
            nishantsoftwares.in
          </a>{" "}
          ·{" "}
          <a
            href="https://wa.me/919996865069"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            9996865069
          </a>
        </p>
        <div className="flex justify-center gap-4">
          <Link href="/contact" className="hover:text-blue-600">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:text-blue-600">
            Privacy Policy
          </Link>
        </div>
        <p>© {new Date().getFullYear()} Kamta Prasad. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;