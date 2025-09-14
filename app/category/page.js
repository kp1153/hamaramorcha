export const dynamic = "force-dynamic";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getPostsByCategory, urlFor } from "@/lib/sanity";

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const safeCategory = decodeURIComponent(category);

  const validCategories = [
    "desh-videsh",
    "pratirodh",
    "jeevan-ke-rang",
    "vividh",
    "kala-sahitya",
    "krishi-maveshi",
  ];

  if (!validCategories.includes(safeCategory)) {
    notFound();
  }

  const posts = await getPostsByCategory(safeCategory);

  const getCategoryDisplayName = (route) => {
    const displayNames = {
      "desh-videsh": "देश-विदेश",
      pratirodh: "प्रतिरोध",
      "jeevan-ke-rang": "जीवन के रंग",
      vividh: "विविध",
      "kala-sahitya": "कला-साहित्य",
      "krishi-maveshi": "कृषि-मवेशी",
    };
    return displayNames[route] || route;
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          {getCategoryDisplayName(safeCategory)}
        </h1>
      </div>

      <div className="space-y-6">
        {posts.map((post) => (
          <article
            key={post._id}
            className="bg-white p-6 rounded-lg shadow-md border"
          >
            <Link href={`/${safeCategory}/${post.slug.current}`}>
              <h2 className="text-2xl font-semibold text-red-600 hover:underline cursor-pointer mb-3">
                {post.title}
              </h2>
            </Link>

            {post.mainImage && (
              <div className="mb-4">
                <div className="relative w-full h-64 rounded-lg overflow-hidden">
                  <Image
                    src={urlFor(post.mainImage).width(800).height(400).url()}
                    alt={post.mainImage.alt || post.title}
                    fill
                    className="object-cover"
                  />
                </div>
                {post.mainImage.caption && (
                  <p className="text-sm text-gray-600 mt-2 text-center italic">
                    {post.mainImage.caption}
                  </p>
                )}
              </div>
            )}

            <div className="text-gray-700 leading-relaxed">
              {post.content && Array.isArray(post.content)
                ? post.content.slice(0, 2).map((block, index) => {
                    if (block._type === "block") {
                      return (
                        <p key={index} className="mb-2">
                          {block.children?.map((child) => child.text).join("")}
                        </p>
                      );
                    }
                    return null;
                  })
                : null}
              ...
            </div>

            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm text-gray-500">
                {new Date(post.publishedAt).toLocaleDateString("hi-IN")}
              </span>
              <Link
                href={`/${safeCategory}/${post.slug.current}`}
                className="text-blue-600 hover:underline font-medium"
              >
                पूरा पढ़ें →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}
