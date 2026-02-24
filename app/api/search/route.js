// app/api/search/route.js
import { client } from "@/lib/sanity";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");

    if (!query || query.length < 3) {
      return new Response(JSON.stringify([]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    const searchQuery = `*[_type == "post" && title match "*${query}*"] | score(title match "*${query}*") {
      _id,
      title,
      "slug": slug.current,
      "categorySlug": category->slug.current,
      "categoryName": category->name,
      mainImageUrl,
      publishedAt
    }`;

    const results = await client.fetch(searchQuery);
    
    return new Response(JSON.stringify(results), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}