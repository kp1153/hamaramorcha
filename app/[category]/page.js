import Image from "next/image";
import Link from "next/link";
import { getPostsByCategory, getCategories } from "@/lib/sanity";

function formatDate(date) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
export const dynamic = 'force-dynamic';

export default async function Page(props) {
  const params = await props.params;
  const categorySlug = params.category;

  const allCategories = await getCategories();
  const category = allCategories.find(
    (cat) => cat.slug.current === categorySlug
  );
  const posts = await getPostsByCategory(categorySlug);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-slate-900 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Link href="/" className="text-amber-400 font-semibold">
            ← Back
          </Link>
          <h1 className="text-4xl md:text-6xl font-black mb-4">
            {category?.title || category?.name}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* FEATURED */}
        {featured && (
          <section className="mb-16">
            <h2 className="text-2xl font-black mb-6">Featured Story</h2>

            <Link
              href={`/${featured.category?.slug?.current}/${featured.slug.current}`}
              className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all grid md:grid-cols-2 gap-6"
            >
              <div className="relative h-64 md:h-full">
                {featured.mainImageUrl ? (
                  <Image
                    src={featured.mainImageUrl}
                    alt={featured.mainImageAlt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300 flex items-center justify-center text-8xl">
                    📰
                  </div>
                )}
              </div>

              <div className="p-8">
                <h3 className="text-3xl font-black mb-4">{featured.title}</h3>
                <p className="text-gray-600 text-lg mb-6">{featured.excerpt}</p>
                <span className="text-gray-500">
                  {formatDate(featured._createdAt)}
                </span>
              </div>
            </Link>
          </section>
        )}

        {/* REST POSTS */}
        <section>
          <h2 className="text-2xl font-black mb-6">All Stories</h2>

          {rest.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {rest.map((post) => (
                <Link
                  key={post._id}
                  href={`/${post.category?.slug?.current}/${post.slug.current}`}
                  className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all transform hover:-translate-y-2"
                >
                  <div className="relative h-56">
                    {post.mainImageUrl ? (
                      <Image
                        src={post.mainImageUrl}
                        alt={post.mainImageAlt}
                        fill
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-300 flex items-center justify-center text-6xl">
                        📰
                      </div>
                    )}
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold line-clamp-2 mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 line-clamp-3 mb-4">
                      {post.excerpt}
                    </p>
                    <span className="text-sm text-gray-500">
                      {formatDate(post._createdAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-12 text-center shadow-md">
              <div className="text-6xl mb-4">🔭</div>
              <h3 className="text-2xl font-bold">No stories yet</h3>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((c) => ({ category: c.slug.current }));
}
