import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory, urlFor } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";

export const dynamic = "force-dynamic";

export default async function NewsPage({ params }) {
  const { category, slug } = await params;
  const safeSlug = decodeURIComponent(slug);
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

  const post = await getPostBySlugAndCategory(safeSlug, safeCategory);
  if (!post) notFound();

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

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

  const components = {
    types: {
      image: ({ value }) => {
        return (
          <div className="my-6">
            <Image
              src={urlFor(value).width(800).url()}
              alt={value.alt || "Article image"}
              width={800}
              height={400}
              className="rounded-lg"
            />
          </div>
        );
      },
    },
    block: {
      h1: ({ children }) => (
        <h1 className="text-3xl font-bold my-4">{children}</h1>
      ),
      h2: ({ children }) => (
        <h2 className="text-2xl font-bold my-4">{children}</h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-xl font-bold my-3">{children}</h3>
      ),
      normal: ({ children }) => <p className="my-4 leading-7">{children}</p>,
      blockquote: ({ children }) => (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic my-4">
          {children}
        </blockquote>
      ),
    },
    list: {
      bullet: ({ children }) => (
        <ul className="list-disc list-inside my-4 space-y-2">{children}</ul>
      ),
      number: ({ children }) => (
        <ol className="list-decimal list-inside my-4 space-y-2">{children}</ol>
      ),
    },
    marks: {
      strong: ({ children }) => (
        <strong className="font-bold">{children}</strong>
      ),
      em: ({ children }) => <em className="italic">{children}</em>,
      link: ({ value, children }) => (
        <a
          href={value.href}
          className="text-blue-600 hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <nav className="mb-6 text-sm">
          <Link href="/" className="text-blue-600 hover:underline">
            होम
          </Link>
          <span className="mx-2">›</span>
          <Link
            href={`/${safeCategory}`}
            className="text-blue-600 hover:underline"
          >
            {getCategoryDisplayName(safeCategory)}
          </Link>
          <span className="mx-2">›</span>
          <span className="text-gray-500">{post.title?.slice(0, 50)}...</span>
        </nav>

        <article className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center mb-4">
            <span className="bg-red-50 text-red-700 border border-red-200 px-3 py-1 rounded-full text-sm font-medium">
              {post.category.name}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-6 pb-4 border-b">
            <div className="flex items-center">
              <span className="mr-1">🕐</span>
              {formatDate(post.publishedAt)}
            </div>
            <div className="flex items-center">
              <span className="mr-1">📂</span>
              {getCategoryDisplayName(safeCategory)}
            </div>
          </div>

          {post.mainImage && (
            <div className="mb-6">
              <div className="relative w-full h-96 rounded-lg overflow-hidden">
                <Image
                  src={urlFor(post.mainImage).width(1200).height(600).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {post.mainImage.caption && (
                <p className="text-sm text-gray-600 mt-2 text-center italic">
                  {post.mainImage.caption}
                </p>
              )}
            </div>
          )}

          <div className="text-gray-800 leading-relaxed text-base md:text-lg prose max-w-none">
            <PortableText value={post.content} components={components} />
          </div>

          <div className="mt-8 pt-6 border-t">
            <Link
              href={`/${safeCategory}`}
              className="inline-flex items-center text-blue-600 hover:underline font-medium"
            >
              ← {getCategoryDisplayName(safeCategory)} की और खबरें देखें
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
