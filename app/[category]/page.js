// app/[category]/page.js
import { getPostsByCategory } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

// Category display names mapping
const getCategoryDisplayName = (route) => {
  const displayNames = {
    "desh-videsh": "देश-विदेश",
    "industrial-area": "इंडस्ट्रियल-एरिया",
    "jeevan-ke-rang": "जीवन के रंग",
    pratirodh: "प्रतिरोध",
    "kala-sahitya": "कला-साहित्य",
    "krishi-maveshi": "कृषि-मवेशी",
  };
  return displayNames[route] || route;
};

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const safeCategory = decodeURIComponent(category);

  // Validate category
  const validCategories = [
    "desh-videsh",
    "industrial-area",
    "jeevan-ke-rang",
    "pratirodh",
    "kala-sahitya",
    "krishi-maveshi",
  ];

  if (!validCategories.includes(safeCategory)) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-6 text-gray-900">गलत श्रेणी</h1>
        <p className="text-gray-600 text-lg">यह श्रेणी मौजूद नहीं है।</p>
        <Link
          href="/"
          className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-semibold hover:underline"
        >
          ← होम पेज पर वापस जाएं
        </Link>
      </main>
    );
  }

  const posts = await getPostsByCategory(safeCategory);
  const categoryDisplayName = getCategoryDisplayName(safeCategory);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  if (!posts || posts.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="mb-6">
          <Link
            href="/"
            className="text-blue-600 hover:text-blue-800 font-medium hover:underline mb-2 inline-block"
          >
            ← वापस
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-6 text-gray-900">
          {categoryDisplayName} की खबरें
        </h1>
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            कोई खबर नहीं मिली
          </h2>
          <p className="text-gray-600 text-lg">
            इस श्रेणी में अभी तक कोई खबर प्रकाशित नहीं हुई है।
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <div className="mb-6">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-800 font-medium hover:underline mb-2 inline-block"
        >
          ← वापस
        </Link>
      </div>

      <h1 className="text-4xl font-bold mb-8 text-gray-900">
        {categoryDisplayName} की खबरें
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {post.mainImage && (
              <div className="w-full flex justify-center bg-gray-100">
                <Image
                  src={post.mainImage}
                  alt={post.mainImageAlt || post.title}
                  width={800}
                  height={600}
                  className="object-contain w-auto max-h-52 rounded-t-xl"
                />
              </div>
            )}

            <div className="p-6">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs bg-blue-600 text-white px-3 py-1 rounded-full font-semibold">
                  {post.category?.name || "सामान्य"}
                </span>
                <span className="text-xs text-gray-500 font-medium">
                  {formatDate(post.publishedAt)}
                </span>
              </div>

              <h2 className="text-xl font-bold mb-4 text-gray-900 leading-tight">
                <Link
                  href={`/${safeCategory}/${post.slug.current}`}
                  className="hover:underline hover:text-blue-700 transition-colors"
                >
                  {post.title}
                </Link>
              </h2>

              <Link
                href={`/${safeCategory}/${post.slug.current}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold text-sm hover:underline transition-colors"
              >
                पूरी खबर पढ़ें
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
