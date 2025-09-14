import React from "react";
import { getAllPosts, urlFor } from "@/lib/sanity";
import Link from "next/link";
import Image from "next/image";

export const dynamic = "force-dynamic";

export default async function Page() {
  const posts = await getAllPosts();

  const getCategoryRoute = (categorySlug) => {
    return categorySlug;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ताज़ा खबरें</h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white shadow-md rounded-lg overflow-hidden border hover:shadow-lg transition-shadow"
          >
            {post.mainImage && (
              <div className="relative w-full h-48">
                <Image
                  src={urlFor(post.mainImage).width(600).height(400).url()}
                  alt={post.mainImage.alt || post.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                  {post.category.name}
                </span>
                <span className="text-xs text-gray-500">
                  {new Date(post.publishedAt).toLocaleDateString("hi-IN")}
                </span>
              </div>

              <h2 className="text-xl font-semibold mb-3 line-clamp-2 leading-tight">
                {post.title}
              </h2>

              <p className="text-gray-700 text-sm line-clamp-3 mb-4 leading-relaxed">
                {post.content && Array.isArray(post.content)
                  ? post.content
                      .map(
                        (block) =>
                          block.children?.map((child) => child.text).join("") ||
                          ""
                      )
                      .join(" ")
                      .slice(0, 150)
                  : ""}
                ...
              </p>

              <Link
                href={`/${getCategoryRoute(post.category.slug.current)}/${post.slug.current}`}
                className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm hover:underline transition-colors"
              >
                और पढ़ें
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
          </div>
        ))}
      </div>
    </div>
  );
}
