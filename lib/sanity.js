// lib/sanity.js

import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

function getImageUrl(mainImage) {
  if (!mainImage) return null;

  if (typeof mainImage === "string" && mainImage.startsWith("http")) {
    return mainImage;
  }

  if (mainImage.asset) {
 return builder.image(mainImage).width(1200).height(630).url();
  }

  return null;
}

export async function getAllPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage,
        mainImageCaption,
        publishedAt,
        category->{title, name, slug},
        content,
        videoLink,
        views
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImageUrl: getImageUrl(post.mainImage),
      mainImageAlt: post.mainImageCaption || post.title,
    }));
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

export async function getPostsByCategory(categorySlug) {
  try {
    const posts = await client.fetch(
      `
      *[_type == "post" && category->slug.current == $categorySlug] 
        | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage,
          mainImageCaption,
          publishedAt,
          category->{title, name, slug},
          content,
          videoLink,
          views
        }
      `,
      { categorySlug }
    );

    return posts.map((post) => ({
      ...post,
      mainImageUrl: getImageUrl(post.mainImage),
      mainImageAlt: post.mainImageCaption || post.title,
    }));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

export async function getPostBySlugAndCategory(slug, categorySlug) {
  try {
    const post = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
        _id,
        title,
        slug,
        mainImage,
        mainImageCaption,
        content,
        publishedAt,
        views,
        videoLink,
        category->{title, name, slug}
      }
      `,
      { slug, categorySlug }
    );

    if (!post) return null;

    return {
      ...post,
      mainImageUrl: getImageUrl(post.mainImage),
      mainImageAlt: post.mainImageCaption || post.title,
    };
  } catch (error) {
    console.error("Error fetching post by slug and category:", error);
    return null;
  }
}

export async function getPopularPosts(limit = 4) {
  try {
    const posts = await client.fetch(
      `
      *[_type == "post"] | order(views desc, publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        mainImage,
        mainImageCaption,
        publishedAt,
        category->{title, name, slug},
        views
      }
    `
    );

    return posts.map((post) => ({
      ...post,
      mainImageUrl: getImageUrl(post.mainImage),
      mainImageAlt: post.mainImageCaption || post.title,
    }));
  } catch (error) {
    console.error("Error fetching popular posts:", error);
    return [];
  }
}

export async function getCategories() {
  try {
    return await client.fetch(`
      *[_type == "category"] | order(name asc) {
        _id,
        name,
        title,
        slug,
        "slugCurrent": slug.current
      }
    `);
  } catch (error) {
    console.error("Error fetching categories:", error);
    return [];
  }
}

export async function getRecentPosts(limit = 5) {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        mainImage,
        mainImageCaption,
        publishedAt,
        category->{title, name, slug},
        videoLink
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImageUrl: getImageUrl(post.mainImage),
      mainImageAlt: post.mainImageCaption || post.title,
    }));
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}
