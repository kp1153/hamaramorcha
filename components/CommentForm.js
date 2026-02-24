"use client";
import { useState } from "react";

export default function CommentForm({ postId, user }) {
  const [comment, setComment] = useState("");

  if (!user) {
    return <p className="mt-6 text-red-600">कमेंट करने के लिए लॉगिन करें</p>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("/api/comment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        postId,
        name: user.name,
        email: user.email,
        comment,
      }),
    });

    alert("कमेंट भेज दिया गया है। अनुमोदन के बाद दिखेगा।");
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        className="w-full border p-3 rounded"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="अपना कमेंट लिखें..."
        required
      />
      <button className="mt-2 bg-red-700 text-white px-4 py-2 rounded">
        कमेंट करें
      </button>
    </form>
  );
}