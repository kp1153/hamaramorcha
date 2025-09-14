// lib/sanity.js
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

export const client = createClient({
  projectId: "4ifmq4x3",
  dataset: "production",
  token:
    "skCaoJv7uSXiiDpf2Rppo81WZp0oVMqUwdpZH4KXdynVF46jg1Id6UtliNpnfFKiuLoDT5NYMgFYDQ72RySmvSU0jYRVRFVk3Tp6RVE3lie0PwKG9fldWdyQPA9XeKdEiirtxxgbBsdMWGcAKWaDJb3A0iINjE7VCq3usZ3yGmFTC5iDT8vl",
  useCdn: false,
  apiVersion: "2023-05-03",
});

const builder = imageUrlBuilder(client);

export function urlFor(source) {
  return builder.image(source);
}

// Get all posts
export async function getAllPosts() {
  const query = `
    *[_type == "post"] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      category->{
        name,
        slug
      },
      content
    }
  `;

  return await client.fetch(query);
}

// Get posts by category
export async function getPostsByCategory(categorySlug) {
  const query = `
    *[_type == "post" && category->slug.current == $categorySlug] | order(publishedAt desc) {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      category->{
        name,
        slug
      },
      content
    }
  `;

  return await client.fetch(query, { categorySlug });
}

// Get single post by slug and category
export async function getPostBySlugAndCategory(slug, categorySlug) {
  const query = `
    *[_type == "post" && slug.current == $slug && category->slug.current == $categorySlug][0] {
      _id,
      title,
      slug,
      mainImage,
      publishedAt,
      category->{
        name,
        slug
      },
      content
    }
  `;

  return await client.fetch(query, { slug, categorySlug });
}
