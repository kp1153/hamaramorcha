// app/page.js
import React from "react";
import { getAllPosts, getCategories, getPopularPosts } from "@/lib/sanity";
import MagazineLayout from "@/components/HomeContent";

export const revalidate = 60;

export const metadata = {
  title: 'Home - Latest News & Updates',
  description: 'Stay updated with the latest news, articles and stories from around the world. Breaking news, trending topics and in-depth coverage.',
  openGraph: {
    title: 'Latest News & Updates',
    description: 'Breaking news and trending stories from around the world',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Latest News & Updates',
    description: 'Breaking news and trending stories',
  },
};

export default async function Page() {
  const posts = await getAllPosts();
  const categories = await getCategories();
  const popularPosts = await getPopularPosts(3);

  if (!posts || posts.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        <p className="text-lg text-gray-600">No posts available.</p>
      </div>
    );
  }

  return <MagazineLayout posts={posts} categories={categories} popularPosts={popularPosts} />;
}