import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function safeImage(img, w, h) {
  if (img?.asset?._ref?.startsWith("image-")) {
    return urlFor(img).width(w).height(h).url();
  }
  return null;
}

export default async function Page({ params }) {
  const { slug } = params;

  // Category info
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{
      title, slug, description
    }`,
    { slug }
  );

  // All posts in this category
  const posts = await client.fetch(
    `*[_type == "post" && category->slug.current == $slug] | order(_createdAt desc){
      _id, title, slug, mainImage, excerpt, category->{title, slug}, _createdAt, author->{name}
    }`,
    { slug }
  );

  // Featured post (first one)
  const featured = posts[0];
  const restPosts = posts.slice(1);

  if (!category) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl font-black text-slate-900 mb-4">
          Category Not Found
        </h1>
        <Link href="/" className="text-cyan-600 font-bold hover:text-cyan-800">
          ← Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="text-amber-400 hover:text-amber-300 font-semibold mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-xl text-gray-300 max-w-3xl">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* FEATURED POST */}
        {featured && (
          <section className="mb-16">
            <h2 className="text-2xl font-black text-slate-900 mb-6">
              Featured Story
            </h2>
            <Link
              href={`/${featured.category?.slug?.current}/${featured.slug.current}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all grid md:grid-cols-2 gap-6"
            >
              <div className="relative h-64 md:h-full">
                {safeImage(featured.mainImage, 800, 600) ? (
                  <Image
                    src={safeImage(featured.mainImage, 800, 600)}
                    alt={featured.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-8xl">
                    📰
                  </div>
                )}
              </div>

              <div className="p-8 flex flex-col justify-center">
                <div className="text-sm text-cyan-600 font-bold mb-3">
                  {featured.category?.title}
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 group-hover:text-cyan-700 transition-colors">
                  {featured.title}
                </h3>
                <p className="text-gray-600 text-lg mb-6 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{formatDate(featured._createdAt)}</span>
                  {featured.author && <span>By {featured.author.name}</span>}
                </div>
              </div>
            </Link>
          </section>
        )}

        {/* ALL POSTS GRID */}
        <section>
          <h2 className="text-2xl font-black text-slate-900 mb-6">
            All Stories
          </h2>

          {restPosts.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {restPosts.map((post) => (
                <Link
                  key={post._id}
                  href={`/${post.category?.slug?.current}/${post.slug.current}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    {safeImage(post.mainImage, 600, 400) ? (
                      <Image
                        src={safeImage(post.mainImage, 600, 400)}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-6xl">
                        📰
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-cyan-700 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-500">
                        {formatDate(post._createdAt)}
                      </span>
                      <span className="text-cyan-600 font-semibold group-hover:text-cyan-800">
                        Read More →
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                No Stories Yet
              </h3>
              <p className="text-gray-600">
                Check back soon for new content in this category.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await client.fetch(
    `*[_type == "category"]{
      "slug": slug.current
    }`
  );

  return categories.map((cat) => ({
    slug: cat.slug,
  }));
}
