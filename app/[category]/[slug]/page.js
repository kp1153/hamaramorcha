// app/[category]/[slug]/page.js

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getPostBySlugAndCategory, getPopularPosts } from "@/lib/sanity";
import { PortableText } from "@portabletext/react";
import { urlFor } from "@/sanity/lib/image";
import ViewsCounter from "@/components/ViewsCounter";

export const dynamic = "force-dynamic";

const getCategoryDisplayName = (categoryData) => {
  return categoryData?.title || categoryData?.name || "News";
};

const getYouTubeId = (url) => {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

const safeImage = (img, w, h) => {
  if (typeof img === "string" && img.startsWith("http")) return img;
  if (img?.asset?._ref?.startsWith("image-"))
    return urlFor(img).width(w).height(h).url();
  return null;
};

const portableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mb-4 text-gray-800 leading-relaxed text-base">{children}</p>
    ),
    h1: ({ children }) => (
      <h1 className="text-2xl font-bold mb-4 text-gray-900 mt-6">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold mb-3 text-gray-900 mt-5">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-bold mb-2 text-gray-900 mt-4">{children}</h3>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-600 pl-4 italic text-gray-700 my-4 bg-gray-50 py-3">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc ml-6 mb-4 text-gray-800 space-y-1">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal ml-6 mb-4 text-gray-800 space-y-1">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
    number: ({ children }) => (
      <li className="text-base leading-relaxed">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    underline: ({ children }) => <span className="underline">{children}</span>,
    link: ({ value, children }) => {
      const href = value?.href || "#";
      const target = value?.blank ? "_blank" : undefined;
      const rel = target === "_blank" ? "noopener noreferrer" : undefined;
      return (
        <a
          href={href}
          className="text-cyan-600 hover:text-cyan-800 underline"
          target={target}
          rel={rel}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    cloudinaryImage: ({ value }) => {
      if (!value?.url) return null;
      return (
        <div className="my-6 flex flex-col items-center">
          <Image
            src={value.url}
            alt={value.caption || "Article image"}
            width={1200}
            height={800}
            className="object-contain max-h-[70vh] w-auto bg-gray-100"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic w-full">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    gallery: ({ value }) => {
      if (!value?.images) return null;
      return (
        <div className="my-6 grid grid-cols-2 md:grid-cols-3 gap-4">
          {value.images.map((img, index) => (
            <div key={index} className="relative aspect-square">
              <Image
                src={img.url}
                alt={img.alt || `Gallery image ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      );
    },
    youtube: ({ value }) => {
      const videoId = getYouTubeId(value?.url);
      if (!videoId) return null;
      return (
        <div className="my-6">
          <div className="relative w-full pt-[56.25%] bg-black">
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src={`https://www.youtube.com/embed/${videoId}?rel=0`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          {value.caption && (
            <p className="text-sm text-gray-600 text-center mt-2 italic">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
    break: ({ value }) => {
      if (value?.style === "break") {
        return <div className="my-8" />;
      }
      return <hr className="my-6 border-gray-300" />;
    },
  },
};

export default async function NewsPage({ params }) {
  const { category, slug } = await params;
  const decodedSlug = decodeURIComponent(slug);
  const post = await getPostBySlugAndCategory(decodedSlug, category);
  const popularPosts = await getPopularPosts(4);

  if (!post) {
    notFound();
  }

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const categoryDisplayName = getCategoryDisplayName(post.category);
  const videoId = getYouTubeId(post.videoLink);

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <article className="bg-white">
              {post.mainImageUrl && (
                <div className="w-full mb-6">
                  <Image
                    src={post.mainImageUrl}
                    alt={post.mainImageAlt || "Main image"}
                    width={800}
                    height={600}
                    className="object-cover w-full bg-gray-100"
                    priority
                  />
                </div>
              )}

              {post.mainImageCaption && (
                <p className="text-sm text-gray-600 mb-4 italic">
                  {post.mainImageCaption}
                </p>
              )}

              <div className="mb-4">
                <span className="inline-block bg-cyan-600 text-white px-3 py-1 text-xs font-bold uppercase rounded-full">
                  {categoryDisplayName}
                </span>
              </div>

              <h1 className="text-3xl font-bold mb-4 text-gray-900 leading-tight">
                {post.title}
              </h1>

              <div className="flex items-center gap-4 text-sm text-gray-500 mb-6 pb-4 border-b border-gray-200">
                <span>{formatDate(post.publishedAt)}</span>
                <ViewsCounter slug={post.slug.current} />
              </div>

              <div className="prose prose-base max-w-none">
                {post.content ? (
                  <PortableText
                    value={post.content}
                    components={portableTextComponents}
                  />
                ) : (
                  <p className="text-gray-600">No content available.</p>
                )}
              </div>

              {post.videoLink && (
                <div className="my-6">
                  {videoId ? (
                    <div className="relative w-full pt-[56.25%] bg-black">
                      <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={`https://www.youtube.com/embed/${videoId}?rel=0`}
                        title="Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                      />
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <a
                        href={post.videoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-semibold text-sm rounded"
                      >
                        Watch Video
                      </a>
                    </div>
                  )}
                </div>
              )}

              <div className="mt-8 pt-6 border-t border-gray-200">
                <Link
                  href="/"
                  className="inline-flex items-center px-4 py-2 bg-cyan-600 text-white hover:bg-cyan-700 transition-colors font-semibold text-sm rounded"
                >
                  ← Back to Home
                </Link>
              </div>
            </article>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="text-lg font-bold text-gray-900 mb-4 pb-2 border-b-2 border-cyan-600">
                Popular Stories
              </h3>
              {popularPosts.length > 0 ? (
                <div className="space-y-4">
                  {popularPosts.map((popularPost) => (
                    <article key={popularPost._id} className="flex gap-3">
                      {popularPost.mainImageUrl && (
                        <div className="relative w-20 h-20 flex-shrink-0 rounded overflow-hidden">
                          <Image
                            src={popularPost.mainImageUrl}
                            alt={popularPost.mainImageAlt || popularPost.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex-1">
                        <h4 className="font-bold text-sm leading-tight line-clamp-2 hover:text-cyan-600 transition-colors mb-2">
                          <Link
                            href={`/${popularPost.category?.slug?.current}/${popularPost.slug?.current}`}
                          >
                            {popularPost.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{formatDate(popularPost.publishedAt)}</span>
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
    </main>
  );
}
