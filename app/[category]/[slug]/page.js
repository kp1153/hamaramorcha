import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "@portabletext/react";
import ViewsCounter from "@/components/ViewsCounter";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function safeImage(img, w, h) {
  if (typeof img === "string" && img.startsWith("http")) return img;
  if (img?.asset?._ref?.startsWith("image-"))
    return urlFor(img).width(w).height(h).url();
  return null;
}

const portableTextComponents = {
  types: {
    image: ({ value }) => {
      if (!value?.asset?._ref) return null;

      const imgUrl =
        typeof value === "string"
          ? value
          : urlFor(value).width(1200).height(800).url();

      return (
        <div className="my-8 rounded-lg overflow-hidden">
          <Image
            src={imgUrl}
            alt={value.alt || "Article image"}
            width={1200}
            height={800}
            className="w-full h-auto"
          />
          {value.caption && (
            <p className="text-sm text-gray-600 italic mt-2 text-center">
              {value.caption}
            </p>
          )}
        </div>
      );
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold text-slate-900 mt-10 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold text-slate-900 mt-6 mb-2">{children}</h4>
    ),
    normal: ({ children }) => (
      <p className="text-lg text-gray-700 leading-relaxed mb-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-cyan-600 pl-6 italic text-xl text-gray-800 my-8">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc list-inside space-y-2 mb-6 text-lg text-gray-700">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal list-inside space-y-2 mb-6 text-lg text-gray-700">
        {children}
      </ol>
    ),
  },
  marks: {
    link: ({ children, value }) => (
      <a
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cyan-600 font-semibold hover:text-cyan-800 underline"
      >
        {children}
      </a>
    ),
    strong: ({ children }) => (
      <strong className="font-bold text-slate-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
  },
};

export default async function Page(props) {
  const params = await props.params;
  const { category, slug } = params;

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug && category->slug.current == $category][0]{
      _id,
      title,
      slug,
      mainImage,
      excerpt,
      body,
      _createdAt,
      _updatedAt,
      category->{title, slug},
      author->{name, image, bio}
    }`,
    { slug, category }
  );

  const relatedPosts = await client.fetch(
    `*[_type == "post" && category->slug.current == $category && slug.current != $slug] 
      | order(_createdAt desc)[0...3]{
      _id, title, slug, mainImage, excerpt, category->{title, slug}, _createdAt
    }`,
    { category, slug }
  );

  if (!post) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Article Not Found
        </h1>
        <Link href="/" className="text-cyan-600 font-bold hover:text-cyan-800">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* BREADCRUMB */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-cyan-600">
              Home
            </Link>
            <span>/</span>
            <Link
              href={`/${post.category?.slug?.current}`}
              className="hover:text-cyan-600"
            >
              {post.category?.title}
            </Link>
            <span>/</span>
            <span className="text-slate-900 font-semibold">{post.title}</span>
          </div>
        </div>
      </div>

      {/* ARTICLE HEADER */}
      <article className="bg-white">
        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${post.category?.slug?.current}`}
              className="inline-block bg-cyan-600 text-white px-4 py-2 rounded-full text-sm font-bold mb-6 hover:bg-cyan-700 transition-colors"
            >
              {post.category?.title}
            </Link>

            <h1 className="text-4xl md:text-6xl font-black text-slate-900 mb-6 leading-tight">
              {post.title}
            </h1>

            {/* ✅ VIEW COUNTER INSERTED HERE */}
            <ViewsCounter slug={slug} />

            {post.excerpt && (
              <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">
                {post.excerpt}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b">
              {post.author && (
                <div className="flex items-center gap-3">
                  {post.author.image && safeImage(post.author.image, 80, 80) ? (
                    <Image
                      src={safeImage(post.author.image, 80, 80)}
                      alt={post.author.name}
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-lg">
                      👤
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-slate-900">
                      {post.author.name}
                    </p>
                  </div>
                </div>
              )}

              <div className="flex items-center gap-2">
                <span>📅</span>
                <span>{formatDate(post._createdAt)}</span>
              </div>

              {post._updatedAt !== post._createdAt && (
                <div className="flex items-center gap-2">
                  <span>🔄</span>
                  <span>Updated {formatDate(post._updatedAt)}</span>
                </div>
              )}
            </div>

            {/* Featured Image */}
            {post.mainImage && safeImage(post.mainImage, 1200, 800) && (
              <div className="relative w-full h-[400px] md:h-[600px] rounded-xl overflow-hidden mb-12 shadow-2xl">
                <Image
                  src={safeImage(post.mainImage, 1200, 800)}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            )}

            {/* Article Body */}
            <div className="prose prose-lg max-w-none">
              {post.body ? (
                <PortableText
                  value={post.body}
                  components={portableTextComponents}
                />
              ) : (
                <p className="text-gray-600">No content available.</p>
              )}
            </div>

            {/* Author Bio */}
            {post.author?.bio && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex gap-4 bg-gray-100 rounded-xl p-6">
                  {post.author.image &&
                  safeImage(post.author.image, 120, 120) ? (
                    <Image
                      src={safeImage(post.author.image, 120, 120)}
                      alt={post.author.name}
                      width={80}
                      height={80}
                      className="rounded-full flex-shrink-0"
                    />
                  ) : (
                    <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center text-3xl flex-shrink-0">
                      👤
                    </div>
                  )}
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">
                      About {post.author.name}
                    </h3>
                    <p className="text-gray-700">{post.author.bio}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </article>

      {/* RELATED POSTS */}
      {relatedPosts.length > 0 && (
        <section className="bg-gray-100 py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-black text-slate-900 mb-8">
              Related Stories
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link
                  key={related._id}
                  href={`/${related.category?.slug?.current}/${related.slug.current}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="relative h-48">
                    {safeImage(related.mainImage, 600, 400) ? (
                      <Image
                        src={safeImage(related.mainImage, 600, 400)}
                        alt={related.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-5xl">
                        📰
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-cyan-700 transition-colors line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(related._createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* BACK TO CATEGORY */}
      <div className="bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <Link
            href={`/${post.category?.slug?.current}`}
            className="inline-block px-8 py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-bold rounded-lg transition-colors"
          >
            ← Back to {post.category?.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  try {
    const posts = await client.fetch(
      `*[_type == "post"]{
        "slug": slug.current,
        "category": category->slug.current
      }`
    );

    return posts.map((post) => ({
      category: post.category,
      slug: post.slug,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}
