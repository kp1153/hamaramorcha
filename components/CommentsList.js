// components/CommentsList.js
"use client";
import { useState, useEffect } from "react";
import { MessageCircle, User } from "lucide-react";

function CommentsList({ postId }) {  // ← यहाँ से 'export default' हटा दिया
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`/api/comments?postId=${postId}`);
        if (!response.ok) throw new Error("Failed to fetch comments");
        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (postId) {
      fetchComments();
    }
  }, [postId]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("hi-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        <p>कमेंट लोड करने में समस्या हुई। कृपया पुनः प्रयास करें।</p>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-8 bg-gray-50 rounded-lg">
        <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
        <p className="text-gray-600">अभी तक कोई टिप्पणी नहीं है। पहली टिप्पणी करें!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-cyan-600" />
        टिप्पणियाँ ({comments.length})
      </h3>
      
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-cyan-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-cyan-600" />
                </div>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-900">{comment.name}</h4>
                  <span className="text-xs text-gray-500">{formatDate(comment._createdAt)}</span>
                </div>
                <p className="text-gray-700 text-base">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CommentsList;  // ← सिर्फ यह एक बार रहे