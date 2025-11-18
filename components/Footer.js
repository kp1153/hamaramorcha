import Link from "next/link";

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-200 bg-white mt-8">
      <div className="max-w-5xl mx-auto px-4 py-6 text-center">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-4 mb-6">
          <h4 className="font-semibold mb-2 text-white">
            वर्डप्रेस पर बनी आपकी वेबसाइट के डेटा को सावधानी के साथ नेक्स्ट.जेएस
            पर माइग्रेट कर देंगे, कोई लॉस नहीं होगा। सब कुछ उसी दाम में।
          </h4>
          <p className="text-sm mb-3 text-white">
            <strong>
              हम मेडिकल शॉप व शैक्षणिक संस्थानों के लिए भी जरूरत के अनुसार
              सॉफ्टवेयर-मोबाइल विकसित करके दे देते हैं और वह भी एक ही डोमेन-नेम
              पर।{" "}
            </strong>
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-white mb-3">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <span>hamaramorcha1153@gmail.com</span>
              <span className="hidden sm:inline">|</span>
              <a
                href="https://wa.me/919996865069"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                9996865069
              </a>
            </div>
          </div>
          <div>
            <a
              href="https://www.web-developer-kp.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              विस्तार से जानने के लिए क्लिक करें
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
            </a>
          </div>
        </div>

        {/* Copyright */}
        <p className="text-xs text-gray-600">
          © 2025 Hamara Morcha. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
