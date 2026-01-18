import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

const teamMembers = [
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

export async function generateStaticParams() {
  return teamMembers.map((m) => ({ slug: m.slug }));
}

export default async function TeamMemberPage({ params }) {
  const { slug } = await params;
  const member = teamMembers.find((m) => m.slug === slug);
  if (!member) notFound();

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <Link href="/team" className="text-blue-600 hover:underline">← टीम</Link>

      <div className="bg-blue-50 p-6 rounded-lg mb-8 mt-6">
        <h2 className="text-2xl font-bold mb-4">संपर्क करें / Contact Us</h2>
        <div className="space-y-2">
          <p>📧 <strong>Email:</strong> editor@hamaramorcha.com</p>
          <p>📞 <strong>Phone:</strong> +91 9996865069</p>
          <p>📍 <strong>Address:</strong> तिवारी भवन, ग्रामः गहरपुर, पोस्टः पुआरीकलाँ-221202, वाराणसी</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="relative w-64 h-80 mx-auto">
          <Image src={member.photo} alt={member.name} fill sizes="256px" className="object-cover rounded-lg" />
        </div>

        <h1 className="text-3xl font-bold text-center mt-6">{member.name}</h1>
        <p className="text-orange-600 text-center mt-2 text-lg">{member.role}</p>
        {member.designation && <p className="text-center text-gray-600 mt-1">{member.designation}</p>}

        <div className="mt-6 space-y-2 text-center">
          {member.address && <p>📍 {member.address}</p>}
          {member.phone && <p>📞 <a href={`tel:${member.phone}`}>{member.phone}</a></p>}
          {member.email && <p>✉️ <a href={`mailto:${member.email}`}>{member.email}</a></p>}
        </div>
      </div>
    </main>
  );
}