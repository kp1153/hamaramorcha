import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

// Team Data
const teamMembers = [
  {
    id: 1,
    name: "चीकू सिंह बुंदेला",
    role: "उर्फ दीवान जी, जिन्होंने नाग-पंचमी के दिन हमारे परिवार की नाग-देवता से रक्षा की थी और जिन्हें गोद में उठाए हुए हैं हमारे प्रधान संपादक दिगंत शुक्ल और उनके साथ में विक्ट्री का चिह्न बनाकर खड़े हुए हैं संपादक अद्वय शुक्ल",
    photo: "/images/1.jpg",
    slug: "cheeku-singh-bundela",
  },
  {
    id: 2,
    name: "अश्विनी कुमार शुक्ला",
    role: "प्रधान संपादक",
    photo: "/images/2.jpg",
    slug: "digant-shukla",
  },
  {
    id: 3,
    name: "वंदना शुक्ला",
    role: "संपादक",
    photo: "/images/3.jpg",
    slug: "advay-shukla",
  },
  {
    id: 4,
    name: "कामता प्रसाद",
    role: "कार्यकारी संपादक",
    photo: "/images/4.jpg",
    address: "तिवारी भवन, ग्रामः गहरपुर, पोस्टः पुआरीकलां -221202, वाराणसी।",
    phone: "9996865069",
    email: "hamaramorcha1153@gmail.com",
    slug: "kamta-prasad",
  },
  {
    id: 5,
    name: "सुमन तिवारी",
    role: "प्रबंध निदेशक",
    photo: "/images/5.jpg",
    slug: "suman-tiwari",
  },
  {
    id: 6,
    name: "अखिलेश चौधरी",
    role: "सीनियर रिपोर्टर",
    designation: "प्रभारीः सिद्धार्थनगर, बस्ती और गोरखपुर",
    photo: "/images/6.jpg",
    phone: "77540 93975",
    slug: "akhilesh-chaudhary",
  },
];

// Generate static params for all team members
export async function generateStaticParams() {
  return teamMembers.map((member) => ({
    slug: member.slug,
  }));
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;

  const member = teamMembers.find((m) => m.slug === slug);

  if (!member) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <nav className="flex items-center space-x-2 text-sm">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              होम
            </Link>
            <span className="text-gray-500">›</span>
            <Link
              href="/team"
              className="text-blue-600 hover:text-blue-800 hover:underline"
            >
              टीम
            </Link>
            <span className="text-gray-500">›</span>
            <span className="text-gray-700 font-medium">{member.name}</span>
          </nav>
        </div>

        {/* Member Details Card */}
        <article className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            {/* Photo Section */}
            <div className="md:w-1/3 bg-gray-900 flex items-center justify-center p-8">
              <div className="relative w-64 h-80 rounded-lg overflow-hidden shadow-lg">
                <Image
                  src={member.photo}
                  alt={member.name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            {/* Content Section */}
            <div className="md:w-2/3 p-8">
              <div className="text-center md:text-left">
                <h1 className="text-4xl font-bold mb-4 text-gray-900 leading-tight">
                  {member.name}
                </h1>

                {member.id === 6 ? (
                  <div className="mb-6">
                    <span className="block text-xl font-semibold text-orange-600 mb-2">
                      सीनियर रिपोर्टर
                    </span>
                    <span className="block text-lg text-gray-600">
                      प्रभारीः सिद्धार्थनगर, बस्ती और गोरखपुर
                    </span>
                  </div>
                ) : (
                  <p className="text-xl font-semibold text-orange-600 mb-6">
                    {member.role}
                  </p>
                )}

                {/* Contact Information */}
                <div className="space-y-3 mb-8">
                  {member.address && (
                    <div className="flex items-start text-gray-700">
                      <span className="text-blue-600 mr-3 text-lg">📍</span>
                      <span className="text-base leading-relaxed">
                        {member.address}
                      </span>
                    </div>
                  )}

                  {member.phone && (
                    <div className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-3 text-lg">📞</span>
                      <a
                        href={`tel:${member.phone}`}
                        className="text-base hover:text-blue-600 transition-colors font-medium"
                      >
                        {member.phone}
                      </a>
                    </div>
                  )}

                  {member.email && (
                    <div className="flex items-center text-gray-700">
                      <span className="text-blue-600 mr-3 text-lg">✉️</span>
                      <a
                        href={`mailto:${member.email}`}
                        className="text-base hover:text-blue-600 transition-colors font-medium"
                      >
                        {member.email}
                      </a>
                    </div>
                  )}
                </div>

                {/* Additional Information */}
                {member.id === 1 && (
                  <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      विशेष परिचय
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      चीकू सिंह बुंदेला, जिन्हें दीवान जी के नाम से भी जाना जाता
                      है, हमारे संगठन के महत्वपूर्ण सदस्य हैं। नाग-पंचमी के दिन
                      परिवार की नाग-देवता से रक्षा करने का उनका योगदान
                      अविस्मरणीय है।
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </article>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          <Link
            href="/team"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-semibold"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            सभी टीम सदस्य देखें
          </Link>

          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
          >
            होम पेज
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </Link>
        </div>
      </div>
    </main>
  );
}
