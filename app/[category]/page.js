// app/[category]/page.js

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  getPostsByCategory,
  getCategories,
  getPopularPosts,
} from "@/lib/sanity";

export const dynamic = "force-dynamic";

const getCategoryDisplayName = (categoryData) => {
  return categoryData?.title || categoryData?.name || "News";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

export default async function CategoryPage({ params }) {
  const { category } = await params;
  const posts = await getPostsByCategory(category);
  const allCategories = await getCategories();
  const popularPosts = await getPopularPosts(4);

  const currentCategory = allCategories.find(
    (cat) => cat.slug.current === category
  );

  if (!currentCategory) {
    notFound();
  }

  const categoryDisplayName = getCategoryDisplayName(currentCategory);

  const heroPost = posts[0];
  const mainPosts = posts.slice(1);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          {categoryDisplayName}
        </h1>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {heroPost && (
              <article className="border border-gray-200 overflow-hidden">
                {heroPost.mainImageUrl && (
                  <div className="relative h-80 bg-gray-100">
                    <Image
                      src={heroPost.mainImageUrl}
                      alt={heroPost.mainImageAlt || heroPost.title}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>
                )}
                <div className="bg-white p-4">
                  <span className="inline-block bg-cyan-600 text-white px-3 py-1 text-xs font-bold mb-3 uppercase rounded-full">
                    {getCategoryDisplayName(heroPost.category)}
                  </span>
                  <h2 className="text-2xl font-bold mb-3 leading-tight text-gray-900">
                    {heroPost.title}
                  </h2>
                  <Link
                    href={`/${heroPost.category?.slug?.current}/${heroPost.slug?.current}`}
                    className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold text-sm"
                  >
                    Read More
                    <svg
                      className="w-4 h-4 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                      />
                    </svg>
                  </Link>
                </div>
              </article>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {mainPosts.map((post) => (
                <article
                  key={post._id}
                  className="bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
                >
                  {post.mainImageUrl && (
                    <div className="relative h-48 bg-gray-100">
                      <Image
                        src={post.mainImageUrl}
                        alt={post.mainImageAlt || post.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
                  <div className="p-4">
                    <span className="inline-block bg-cyan-600 text-white px-2 py-1 text-xs font-bold mb-2 uppercase rounded-full">
                      {getCategoryDisplayName(post.category)}
                    </span>
                    <h3 className="font-bold text-base leading-tight mb-2 line-clamp-2 text-gray-900">
                      {post.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <span>{formatDate(post.publishedAt)}</span>
                      <span>{post.views || 0} views</span>
                    </div>
                    <Link
                      href={`/${post.category?.slug?.current}/${post.slug?.current}`}
                      className="inline-flex items-center text-cyan-600 hover:text-cyan-700 font-semibold text-sm"
                    >
                      Read More
                      <svg
                        className="w-4 h-4 ml-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-600">
                Popular Stories
              </h3>
              {popularPosts.length > 0 ? (
                <div className="space-y-4">
                  {popularPosts.map((post) => (
                    <article key={post._id} className="flex gap-3">
                      {post.mainImageUrl && (
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={post.mainImageUrl}
                            alt={post.mainImageAlt || post.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-sm leading-tight line-clamp-2 hover:text-cyan-600 transition-colors mb-2">
                          <Link
                            href={`/${post.category?.slug?.current}/${post.slug?.current}`}
                          >
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{formatDate(post.publishedAt)}</span>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">
                  No popular stories available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
