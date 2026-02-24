// app/api/comments/route.js
import { client } from "@/lib/sanity";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId");

  if (!postId) {
    return new Response(JSON.stringify({ error: "postId required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const comments = await client.fetch(
      `*[_type == "comment" && post._ref == $postId && approved == true] | order(_createdAt desc) {
        _id,
        name,
        comment,
        _createdAt
      }`,
      { postId }
    );

    return new Response(JSON.stringify(comments), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching comments:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}