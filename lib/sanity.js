import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  useCdn: true,
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Get all posts for homepage
export async function getAllPosts() {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        publishedAt,
        category->{
          name, 
          slug
        },
        content,
        "excerpt": pt::text(content)[0...200]
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(600).height(400).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
}

// Get posts by category for category pages
export async function getPostsByCategory(categorySlug) {
  try {
    const posts = await client.fetch(
      `
      *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
        _id,
        title,
        slug,
        mainImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        publishedAt,
        category->{
          name, 
          slug
        },
        content,
        "excerpt": pt::text(content)[0...200]
      }
    `,
      { categorySlug }
    );

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(400).height(300).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("Error fetching posts by category:", error);
    return [];
  }
}

// Get single post by slug and category
export async function getPostBySlugAndCategory(slug, categorySlug) {
  try {
    console.log("🔍 Fetching post:", { slug, categorySlug });

    const post = await client.fetch(
      `
      *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
        _id,
        title,
        "slug": slug.current,
        mainImage {
          asset->{
            _id,
            url
          },
          alt,
          caption
        },
        content,
        publishedAt,
        "category": {
          "name": category->name,
          "slug": category->slug.current
        }
      }
    `,
      { slug, categorySlug }
    );

    console.log("📊 Found post:", post);

    if (!post) return null;

    return {
      ...post,
      mainImage: post.mainImage?.asset ? post.mainImage : null,
      mainImageUrl: post.mainImage?.asset
        ? urlFor(post.mainImage).width(1200).height(600).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
      mainImageCaption: post.mainImage?.caption || "",
    };
  } catch (error) {
    console.error("❌ Error fetching post by slug and category:", error);
    return null;
  }
}

// Get all categories
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
    console.error("Error fetching categories:", error);
    return [];
  }
}

// Get recent posts (for sidebar/featured sections)
export async function getRecentPosts(limit = 5) {
  try {
    const posts = await client.fetch(`
      *[_type == "post"] | order(publishedAt desc)[0...${limit}] {
        _id,
        title,
        slug,
        mainImage {
          asset->{
            _id,
            url
          },
          alt
        },
        publishedAt,
        category->{
          name, 
          slug
        },
        "excerpt": pt::text(content)[0...150]
      }
    `);

    return posts.map((post) => ({
      ...post,
      mainImage: post.mainImage?.asset
        ? urlFor(post.mainImage).width(300).height(200).url()
        : null,
      mainImageAlt: post.mainImage?.alt || post.title,
    }));
  } catch (error) {
    console.error("Error fetching recent posts:", error);
    return [];
  }
}
