import Link from "next/link";
import Image from "next/image";

// Static Team Data
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
    name: "दिगंत शुक्ल",
    role: "प्रधान संपादक",
    photo: "/images/2.jpg",
    slug: "digant-shukla",
  },
  {
    id: 3,
    name: "अद्वय शुक्ल",
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

export default function TeamPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline mb-2 inline-block"
        >
          ← होम
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-900 text-center">
        हमारी टीम
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <article
            key={member.id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="relative h-64 w-full">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <h2 className="text-xl font-bold mb-2 text-gray-900 leading-tight">
                {member.name}
              </h2>

              {member.id === 6 ? (
                <div className="mb-3">
                  <p className="text-orange-600 font-semibold text-sm">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm">{member.designation}</p>
                </div>
              ) : (
                <p className="text-orange-600 font-semibold mb-3 text-sm">
                  {member.role}
                </p>
              )}

              {member.address && (
                <p className="text-gray-600 text-xs mb-2 flex items-start">
                  <span className="mr-1">📍</span>
                  <span>{member.address}</span>
                </p>
              )}

              {member.phone && (
                <p className="text-gray-600 text-xs mb-2 flex items-center">
                  <span className="mr-1">📞</span>
                  <a
                    href={`tel:${member.phone}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {member.phone}
                  </a>
                </p>
              )}

              {member.email && (
                <p className="text-gray-600 text-xs mb-2 flex items-center">
                  <span className="mr-1">✉️</span>
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-blue-600 transition-colors"
                  >
                    {member.email}
                  </a>
                </p>
              )}

              <Link
                href={`/team/${member.slug}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline transition-colors mt-3"
              >
                विस्तार से देखें
                <svg
                  className="w-4 h-4 ml-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
