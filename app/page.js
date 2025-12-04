import Image from "next/image";
import Link from "next/link";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";

const categories = [
  {
    name: "World",
    slug: "world",
    icon: "🌍",
    color: "from-blue-600 to-blue-800",
  },
  {
    name: "India",
    slug: "india",
    icon: "🇮🇳",
    color: "from-orange-600 to-red-700",
  },
  {
    name: "Performing Arts",
    slug: "performing-arts",
    icon: "🎭",
    color: "from-purple-600 to-pink-700",
  },
  {
    name: "Academics",
    slug: "academics",
    icon: "📚",
    color: "from-green-600 to-teal-700",
  },
  {
    name: "Health",
    slug: "health",
    icon: "🏥",
    color: "from-red-600 to-pink-700",
  },
  {
    name: "विविध",
    slug: "vividha",
    icon: "✨",
    color: "from-amber-600 to-yellow-700",
  },
];

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function timeAgo(date) {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
  };
  for (const [unit, sec] of Object.entries(intervals)) {
    const count = Math.floor(seconds / sec);
    if (count >= 1) return `${count} ${unit}${count > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}

function safeImage(img, w, h) {
  if (typeof img === "string" && img.startsWith("http")) {
    return img;
  }
  if (img?.asset?._ref?.startsWith("image-")) {
    return urlFor(img).width(w).height(h).url();
  }
  return null;
}

export default async function Page() {
  const heroPost = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0]{
      _id, title, slug, mainImage, excerpt, category->{title, slug}, _createdAt
    }`
  );

  const featuredPosts = await client.fetch(
    `*[_type == "post" && featured == true] | order(_createdAt desc)[0...3]{
      _id, title, slug, mainImage, excerpt, category->{title, slug}, _createdAt
    }`
  );

  const latestPosts = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[0...6]{
      _id, title, slug, category->{title, slug}, _createdAt
    }`
  );

  const editorPicks = await client.fetch(
    `*[_type == "post"] | order(_createdAt desc)[3...6]{
      _id, title, slug, mainImage, excerpt, category->{title, slug}, _createdAt
    }`
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
        <div className="container mx-auto px-4 py-12 md:py-20 relative z-10">
          {heroPost && (
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div>
                <div className="inline-block bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-bold mb-4">
                  {heroPost.category?.title}
                </div>
                <h1 className="text-2xl md:text-3xl font-black mb-6">
                  {heroPost.title}
                </h1>
                <p className="text-lg text-gray-300 mb-8">{heroPost.excerpt}</p>

                <div className="flex flex-wrap gap-4">
                  <Link
                    href={`/${heroPost.category?.slug?.current}/${heroPost.slug.current}`}
                    className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-lg shadow-lg"
                  >
                    Read Full Story
                  </Link>
                  <span className="px-6 py-4 text-gray-400 font-medium">
                    {formatDate(heroPost._createdAt)}
                  </span>
                </div>
              </div>

              <div className="relative h-[400px] lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                {safeImage(heroPost.mainImage, 800, 600) ? (
                  <Image
                    src={safeImage(heroPost.mainImage, 800, 600)}
                    alt={heroPost.title}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center text-8xl">
                    📰
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* FEATURED STORIES */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <h2 className="text-xl md:text-2xl font-black mb-8">
          Featured Stories
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredPosts.map((post) => (
            <Link
              key={post._id}
              href={`/${post.category?.slug?.current}/${post.slug.current}`}
              className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all"
            >
              <div className="relative h-56">
                {safeImage(post.mainImage, 600, 400) ? (
                  <Image
                    src={safeImage(post.mainImage, 600, 400)}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-6xl">
                    📰
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-700">
                  {post.title}
                </h3>
                <p className="text-gray-600 mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    {formatDate(post._createdAt)}
                  </span>
                  <span className="text-cyan-600 font-semibold">
                    Read More →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="bg-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl font-black mb-8 text-center">
            Explore by Category
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className={`group bg-gradient-to-br ${cat.color} rounded-xl p-6 text-white shadow-lg hover:scale-105 transition-transform`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="text-lg font-bold">{cat.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EDITOR'S PICKS */}
      <section className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <h2 className="text-xl md:text-2xl font-black mb-8">
              Editor&apos;s Picks
            </h2>

            <div className="space-y-6">
              {editorPicks.map((post) => (
                <Link
                  key={post._id}
                  href={`/${post.category?.slug?.current}/${post.slug.current}`}
                  className="group bg-white rounded-xl p-6 shadow-md hover:shadow-xl flex gap-6"
                >
                  <div className="w-40 h-40 rounded-lg overflow-hidden flex-shrink-0">
                    {safeImage(post.mainImage, 300, 300) ? (
                      <Image
                        src={safeImage(post.mainImage, 300, 300)}
                        alt={post.title}
                        width={160}
                        height={160}
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-4xl">
                        📄
                      </div>
                    )}
                  </div>

                  <div>
                    <div className="text-sm text-cyan-600 font-semibold">
                      {post.category?.title}
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-cyan-700">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-2">{post.excerpt}</p>
                    <span className="text-sm text-gray-500">
                      {formatDate(post._createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <div className="bg-slate-900 text-white rounded-xl p-6 sticky top-4">
              <h3 className="text-xl font-black mb-6 flex items-center gap-2">
                <span className="text-red-500 animate-pulse">🔴</span> Latest
                Updates
              </h3>

              <ul className="space-y-4">
                {latestPosts.map((post) => (
                  <li
                    key={post._id}
                    className="border-b border-slate-700 pb-4 last:border-b-0"
                  >
                    <div className="text-xs text-amber-400 font-semibold">
                      {post.category?.title}
                    </div>

                    <Link
                      href={`/${post.category?.slug?.current}/${post.slug.current}`}
                      className="text-white hover:text-amber-300 font-medium line-clamp-2"
                    >
                      {post.title}
                    </Link>

                    <div className="text-xs text-gray-400">
                      {timeAgo(post._createdAt)}
                    </div>
                  </li>
                ))}
              </ul>

              <Link
                href="/all"
                className="block mt-6 bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-center"
              >
                View All News
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
