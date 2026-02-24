// app/api/comment/route.js
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";
import { client } from "@/lib/sanity";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return new Response(JSON.stringify({ error: "कमेंट करने के लिए लॉगिन करें" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const { postId, comment } = await req.json();

    if (!postId || !comment) {
      return new Response(JSON.stringify({ error: "All fields required" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    await client.create({
      _type: "comment",
      post: {
        _type: "reference",
        _ref: postId,
      },
      name: session.user.name,
      email: session.user.email,
      comment,
      approved: false,
    });

    return new Response(JSON.stringify({ message: "Comment submitted successfully" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error creating comment:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}