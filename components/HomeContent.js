// components/HomeContent.js
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const formatCategory = (c) => {
  if (!c) return "News";
  const map = {
    world: "World",
    india: "India",
    "performing-arts": "Performing Arts",
    academics: "Academics",
    health: "Health",
    vividha: "Vividha",
  };
  return map[c] || c;
};

const formatDate = (d) =>
  d
    ? new Date(d).toLocaleDateString("en-US", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

const getCategoryColor = (categorySlug) => {
  const colors = {
    world: "rgb(37, 99, 235)",
    india: "rgb(249, 115, 22)",
    "performing-arts": "rgb(168, 85, 247)",
    academics: "rgb(34, 197, 94)",
    health: "rgb(239, 68, 68)",
    vividha: "rgb(245, 158, 11)",
  };
  return colors[categorySlug] || "rgb(37, 99, 235)";
};

export default function HomeContent({ posts = [], categories = [], popularPosts = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const sliderPosts = posts.slice(0, 5);

  useEffect(() => {
    if (sliderPosts.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderPosts.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [sliderPosts.length]);

  const nextSlide = () => {
    if (sliderPosts.length === 0) return;
    setCurrentSlide((prev) => (prev + 1) % sliderPosts.length);
  };
  
  const prevSlide = () => {
    if (sliderPosts.length === 0) return;
    setCurrentSlide((prev) => (prev - 1 + sliderPosts.length) % sliderPosts.length);
  };

  const worldPosts = posts.filter(p => p.category?.slug?.current === "world").slice(0, 4);
  const indiaPosts = posts.filter(p => p.category?.slug?.current === "india").slice(0, 4);
  const performingArtsPosts = posts.filter(p => p.category?.slug?.current === "performing-arts").slice(0, 4);
  const academicsPosts = posts.filter(p => p.category?.slug?.current === "academics").slice(0, 4);
  const sidebarTextOnly = posts.slice(5, 13);

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600">No posts available.</p>
      </div>
    );
  }

  return (
    <div className="font-['Open_Sans'] text-stone-800 bg-gray-50">
      <div className="sticky top-0 z-50 bg-white shadow-sm mb-6">
        <div className="flex items-center h-10 overflow-hidden">
          <div style={{backgroundColor: 'rgb(37, 99, 235)'}} className="text-white px-4 text-[10px] font-bold uppercase flex items-center h-full">
            Breaking News
          </div>
          <div className="flex-1 px-4 text-xs font-semibold text-stone-700 truncate">
            • {sliderPosts[currentSlide]?.title ?? "Welcome"}
          </div>
          <div className="flex border-l">
            <button onClick={prevSlide} className="h-10 w-8 flex justify-center items-center hover:bg-gray-100">
              <ChevronLeft size={14} />
            </button>
            <button onClick={nextSlide} className="h-10 w-8 flex justify-center items-center hover:bg-gray-100">
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-8">
          <div className="lg:col-span-3 relative h-[500px] overflow-hidden group">
            {sliderPosts[currentSlide] && (
              <Link href={`/${sliderPosts[currentSlide].category?.slug?.current}/${sliderPosts[currentSlide].slug.current}`}>
                <div className="relative w-full h-full">
                  {sliderPosts[currentSlide].mainImageUrl ? (
                    <Image
                      src={sliderPosts[currentSlide].mainImageUrl}
                      alt={sliderPosts[currentSlide].title}
                      fill
                      priority
                      className="object-cover group-hover:scale-105 duration-700"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-300" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 text-white">
                    <span style={{backgroundColor: getCategoryColor(sliderPosts[currentSlide].category?.slug?.current)}} className="text-[10px] font-bold px-3 py-1 inline-block mb-3">
                      {formatCategory(sliderPosts[currentSlide].category?.slug?.current)}
                    </span>
                    <h2 className="text-4xl font-bold leading-tight mb-2">
                      {sliderPosts[currentSlide].title}
                    </h2>
                    <span className="text-xs text-gray-300">{formatDate(sliderPosts[currentSlide].publishedAt)}</span>
                  </div>
                </div>
              </Link>
            )}
          </div>

          <div className="space-y-2">
            {sliderPosts.map((post, idx) => (
              <button
                key={post._id}
                onClick={() => setCurrentSlide(idx)}
                className={`w-full text-left p-3 transition ${currentSlide === idx ? 'bg-white shadow-md' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex gap-3">
                  <div className="w-20 h-16 relative flex-shrink-0">
                    {post.mainImageUrl ? (
                      <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover" unoptimized />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold line-clamp-2 leading-tight">{post.title}</h4>
                    <span className="text-[9px] text-gray-500">{formatDate(post.publishedAt)}</span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-8 space-y-10">
            {worldPosts.length > 0 && (
              <section>
                <h3 style={{backgroundColor: getCategoryColor("world")}} className="text-white text-sm font-bold px-4 py-2 inline-block mb-4">
                  World
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {worldPosts.map((post) => (
                    <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="bg-white group">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.mainImageUrl ? (
                          <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 duration-500" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-base leading-snug group-hover:text-blue-600 mb-2">{post.title}</h4>
                        <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {indiaPosts.length > 0 && (
              <section>
                <h3 style={{backgroundColor: getCategoryColor("india")}} className="text-white text-sm font-bold px-4 py-2 inline-block mb-4">
                  India
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {indiaPosts.map((post) => (
                    <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="bg-white group">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.mainImageUrl ? (
                          <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 duration-500" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-base leading-snug group-hover:text-orange-600 mb-2">{post.title}</h4>
                        <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {performingArtsPosts.length > 0 && (
              <section>
                <h3 style={{backgroundColor: getCategoryColor("performing-arts")}} className="text-white text-sm font-bold px-4 py-2 inline-block mb-4">
                  Performing Arts
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {performingArtsPosts.map((post) => (
                    <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="bg-white group">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.mainImageUrl ? (
                          <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 duration-500" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-base leading-snug group-hover:text-purple-600 mb-2">{post.title}</h4>
                        <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {academicsPosts.length > 0 && (
              <section>
                <h3 style={{backgroundColor: getCategoryColor("academics")}} className="text-white text-sm font-bold px-4 py-2 inline-block mb-4">
                  Academics
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {academicsPosts.map((post) => (
                    <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="bg-white group">
                      <div className="relative aspect-[16/10] overflow-hidden">
                        {post.mainImageUrl ? (
                          <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover group-hover:scale-105 duration-500" unoptimized />
                        ) : (
                          <div className="w-full h-full bg-gray-200" />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="font-bold text-base leading-snug group-hover:text-green-600 mb-2">{post.title}</h4>
                        <p className="text-xs text-gray-500">{formatDate(post.publishedAt)}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white p-4 shadow-sm">
              <h4 style={{backgroundColor: 'rgb(37, 99, 235)'}} className="text-white text-xs font-bold px-3 py-1 inline-block mb-4">
                Latest News
              </h4>
              <div className="space-y-3">
                {sidebarTextOnly.map((post, idx) => (
                  <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="block border-b pb-3 last:border-none group">
                    <div className="flex gap-2">
                      <span style={{color: 'rgb(37, 99, 235)'}} className="font-bold text-sm flex-shrink-0">{idx + 1}.</span>
                      <div>
                        <h5 className="text-sm font-semibold leading-snug group-hover:text-blue-600">{post.title}</h5>
                        <p className="text-[10px] text-gray-500 mt-1">{formatDate(post.publishedAt)}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            <div className="bg-white p-4 shadow-sm">
              <h4 style={{backgroundColor: 'rgb(37, 99, 235)'}} className="text-white text-xs font-bold px-3 py-1 inline-block mb-4">
                Popular Posts
              </h4>
              <div className="space-y-4">
                {popularPosts.map((post, idx) => (
                  <Link key={post._id} href={`/${post.category?.slug?.current}/${post.slug.current}`} className="flex gap-3 border-b pb-3 last:border-none group">
                    <div className="w-20 h-16 relative flex-shrink-0 overflow-hidden">
                      {post.mainImageUrl ? (
                        <Image src={post.mainImageUrl} alt={post.title} fill className="object-cover" unoptimized />
                      ) : (
                        <div className="w-full h-full bg-gray-200" />
                      )}
                      <span style={{backgroundColor: 'rgb(37, 99, 235)'}} className="absolute top-0 left-0 w-5 h-5 text-white text-[10px] flex items-center justify-center font-bold">
                        {idx + 1}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h5 className="text-sm font-bold leading-tight group-hover:text-blue-600">{post.title}</h5>
                      <small className="text-[10px] text-gray-500">{formatDate(post.publishedAt)}</small>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}