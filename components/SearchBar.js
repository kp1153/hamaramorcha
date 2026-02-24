// components/SearchBar.js
"use client";
import { useState } from "react";
import { Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length < 3) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      const data = await response.json();
      setResults(data);
      setShowResults(true);
    } catch (error) {
      console.error("Search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setShowResults(false);
  };

  return (
    <div className="relative w-full max-w-xl mx-auto">
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          placeholder="खोजें... (कम से कम 3 अक्षर)"
          className="w-full px-4 py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:border-cyan-600"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        {query && (
          <button onClick={clearSearch} className="absolute right-3 top-2.5">
            <X className="text-gray-400 hover:text-gray-600" size={18} />
          </button>
        )}
      </div>

      {/* Search Results Dropdown */}
      {showResults && query.length >= 3 && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-96 overflow-y-auto">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              खोज रहे हैं...
            </div>
          ) : results.length > 0 ? (
            results.map((post) => (
              <Link
                key={post._id}
                href={`/${post.categorySlug}/${post.slug}`}
                onClick={clearSearch}
                className="block p-3 border-b last:border-b-0 hover:bg-gray-50 transition-colors"
              >
                <div className="flex gap-3">
                  {post.mainImageUrl && (
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={post.mainImageUrl}
                        alt={post.title}
                        fill
                        className="object-cover rounded"
                        unoptimized
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 line-clamp-2">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.categoryName} • {new Date(post.publishedAt).toLocaleDateString("hi-IN")}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              कोई परिणाम नहीं मिला
            </div>
          )}
        </div>
      )}
    </div>
  );
}