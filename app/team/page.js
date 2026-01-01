import Link from "next/link";
import Image from "next/image";

const teamMembers = [
  {
    id: 1,
    name: "चीकू सिंह बुंदेला",
    role:
      "उर्फ दीवान जी, जिन्होंने नाग-पंचमी के दिन हमारे परिवार की नाग-देवता से रक्षा की थी",
    photo: "/images/1.jpg",
    slug: "cheeku-singh-bundela",
  },
  {
    id: 2,
    name: "अश्विनी कुमार शुक्ला",
    role: "प्रधान संपादक",
    photo: "/images/2.jpeg",
    address: "शुक्ला सदन, ग्रामः बैदौला-272189, सिद्धार्थनगर।",
    phone: "9918921792",
    email: "ashwini@hamaramorcha.com",
    slug: "ashwini-kumar-shukla",
  },
  {
    id: 3,
    name: "वंदना शुक्ला",
    role: "संपादक",
    photo: "/images/3.jpeg",
    address: "शुक्ला सदन, ग्रामः बैदौला-272189, सिद्धार्थनगर।",
    email: "editor@hamaramorcha.com",
    slug: "vandana-shukla",
  },
  {
    id: 4,
    name: "कामता प्रसाद",
    role: "कार्यकारी संपादक",
    photo: "/images/4.jpg",
    address: "तिवारी भवन, ग्रामः गहरपुर, पोस्टः पुआरीकलाँ-221202, वाराणसी।",
    phone: "9996865069",
    email: "kamta@hamaramorcha.com",
    slug: "kamta-prasad",
  },
  {
    id: 5,
    name: "सुमन तिवारी",
    role: "प्रबंध निदेशक",
    photo: "/images/5.jpg",
    address: "तिवारी भवन, ग्रामः गहरपुर, पोस्टः पुआरीकलाँ-221202, वाराणसी।",
    slug: "suman-tiwari",
  },
  {
    id: 6,
    name: "अखिलेश चौधरी",
    role: "सीनियर रिपोर्टर",
    designation: "प्रभारीः सिद्धार्थनगर, बस्ती और गोरखपुर",
    photo: "/images/6.jpg",
    phone: "7754093975",
    slug: "akhilesh-chaudhary",
  },
  {
    id: 7,
    name: "रामचंद्र शुक्ल",
    role: "साहित्य संपादक",
    photo: "/images/rc.jpg",
    address: "548 वी/125, विक्रम नगर, पोस्ट-मानक नगर, लखनऊ-226011",
    phone: "9454413842",
    email: "ramchandra.shukla@hamaramorcha.com", 
    slug: "ramchandra-shukla",
  },
  {
    id: 8,
    name: "चाँदनी तिवारी",
    role: "विशेष प्रतिनिधि",
    designation: "पंजाब-हरियाणा और जम्मू-कश्मीर",
    photo: "/images/chandni.jpg",
    email: "chandni@hamaramorcha.com",
    slug: "chandni-tiwari",
  },
];

export default function TeamPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline">← होम</Link>
      <h1 className="text-4xl font-bold text-center my-8">हमारी टीम</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member) => (
          <article key={member.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="relative h-64">
              <Image
                src={member.photo}
                alt={member.name}
                fill
                sizes="(max-width:768px) 100vw, 25vw"
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h2 className="font-bold text-lg">{member.name}</h2>
              <p className="text-orange-600 text-sm">{member.role}</p>
              {member.designation && <p className="text-gray-600 text-sm">{member.designation}</p>}
              {member.address && <p className="text-gray-600 text-xs mt-1">📍 {member.address}</p>}
              <Link href={`/team/${member.slug}`} className="inline-block mt-3 text-blue-600 hover:underline text-sm">
                विस्तार से देखें →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}