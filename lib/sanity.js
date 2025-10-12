import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

// ---------------- Client Setup ----------------
export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-05-03",
  useCdn: false,
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source).auto("format");
}

// ---------------- Fetch Functions ----------------

// 1. Get all posts (Homepage)
export async function getAllPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage {
          asset->{ _id, url },
          alt,
          caption
        },
        publishedAt,
        category->{ name, slug },
        content,
        "excerpt": pt::text(content)[0...200]
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(600).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("❌ Error fetching all posts:", error);
    return [];
  }
}

// 2. Get posts by category (Listing pages)
export async function getPostsByCategory(categorySlug) {
  try {
    const posts = await client.fetch(
      `
      *[_type == "post" && category->slug.current == $categorySlug] 
        | order(publishedAt desc) {
          _id,
          title,
          slug,
          mainImage {
            asset->{ _id, url },
            alt,
            caption
          },
          publishedAt,
          category->{ name, slug },
          content,
          "excerpt": pt::text(content)[0...200]
        }
      `,
      { categorySlug }
    );

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(400).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("❌ Error fetching posts by category:", error);
    return [];
  }
}

// 3. Get single post (Slug page)
export async function getPostBySlugAndCategory(slug, categorySlug) {
  try {
    const post = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
        _id,
        title,
        "slug": slug.current,
        mainImage {
          asset->{ _id, url },
          alt,
          caption
        },
        content,
        publishedAt,
        views, 
        "category": {
          "name": category->name,
          "slug": category->slug.current
        }
      }
      `,
      { slug, categorySlug }
    );

    if (!post) return null;

    return {
      ...post,
      mainImage: post.mainImage?.asset ? post.mainImage : null,
      mainImageUrl: post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
      mainImageCaption: post.mainImage?.caption || "",
    };
  } catch (error) {
    console.error("❌ Error fetching post by slug and category:", error);
    return null;
  }
}

// 4. Get all categories
export async function getCategories() {
  try {
    return await client.fetch(`
      *[_type == "category"] | order(name asc) {
        _id,
        name,
        slug
      }
    `);
  } catch (error) {
    console.error("❌ Error fetching categories:", error);
    return [];
  }
}

// 5. Get recent posts (Sidebar/Featured)
export async function getRecentPosts(limit = 5) {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        mainImage {
          asset->{ _id, url },
          alt
        },
        publishedAt,
        category->{ name, slug },
        "excerpt": pt::text(content)[0...150]
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(300).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("❌ Error fetching recent posts:", error);
    return [];
  }
}
