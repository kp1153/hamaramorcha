// sanity/schemaTypes/index.js

import MultiImageInput from "./MultiImageInput";
import CloudinaryImageInput from "./CloudinaryImageInput";

function hindiToRoman(input) {
  if (!input) return "";

  const consonants = {
    क: "k",
    ख: "kh",
    ग: "g",
    घ: "gh",
    ङ: "ng",
    च: "ch",
    छ: "chh",
    ज: "j",
    झ: "jh",
    ञ: "ny",
    ट: "t",
    ठ: "th",
    ड: "d",
    ढ: "dh",
    ण: "n",
    त: "t",
    थ: "th",
    द: "d",
    ध: "dh",
    न: "n",
    प: "p",
    फ: "ph",
    ब: "b",
    भ: "bh",
    म: "m",
    य: "y",
    र: "r",
    ल: "l",
    व: "v",
    ळ: "l",
    श: "sh",
    ष: "sh",
    स: "s",
    ह: "h",
    क्ष: "ksh",
    त्र: "tr",
    ज्ञ: "gya",
  };

  const vowels = {
    अ: "a",
    आ: "aa",
    इ: "i",
    ई: "ee",
    उ: "u",
    ऊ: "oo",
    ऋ: "ri",
    ए: "e",
    ऐ: "ai",
    ओ: "o",
    औ: "au",
  };

  const matras = {
    "ा": "aa",
    "ि": "i",
    "ी": "ee",
    "ु": "u",
    "ू": "oo",
    "ृ": "ri",
    "े": "e",
    "ै": "ai",
    "ो": "o",
    "ौ": "au",
  };

  const specials = {
    "ं": "n",
    "ः": "h",
    "ँ": "n",
    "्": "",
  };

  const dict = {
    में: "mein",
    की: "ki",
    का: "ka",
    के: "ke",
    और: "aur",
    से: "se",
    पर: "par",
    है: "hai",
    हुई: "hui",
    हुआ: "hua",
    को: "ko",
    ने: "ne",
    एक: "ek",
    यह: "yah",
    वह: "vah",
    था: "tha",
    थी: "thi",
    हैं: "hain",
    हो: "ho",
    गया: "gaya",
    गई: "gayi",
    दिया: "diya",
    लिया: "liya",
  };

  const cleaned = input
    .trim()
    .replace(/[।!?,.]/g, "")
    .replace(/[\u0964\u0965]/g, "")
    .replace(/\s+/g, " ");

  const words = cleaned.split(" ");
  const transliteratedWords = [];

  for (let word of words) {
    word = word.trim();
    if (!word) continue;

    const lowerWord = word.toLowerCase();
    if (dict[lowerWord]) {
      transliteratedWords.push(dict[lowerWord]);
      continue;
    }

    let result = "";
    let i = 0;

    while (i < word.length) {
      const char = word[i];
      const nextChar = word[i + 1];
      const twoChar = char + nextChar;

      if (consonants[twoChar]) {
        result += consonants[twoChar];
        i += 2;
        continue;
      }

      if (vowels[char]) {
        result += vowels[char];
        i++;
        continue;
      }

      if (consonants[char]) {
        result += consonants[char];

        if (matras[nextChar]) {
          result += matras[nextChar];
          i += 2;
          continue;
        } else if (nextChar === "्") {
          i += 2;
          continue;
        } else if (nextChar && !consonants[nextChar] && !vowels[nextChar]) {
          i++;
          continue;
        } else {
          result += "a";
          i++;
          continue;
        }
      }

      if (specials[char] !== undefined) {
        result += specials[char];
        i++;
        continue;
      }

      if (/[a-zA-Z0-9]/.test(char)) {
        result += char.toLowerCase();
        i++;
        continue;
      }

      i++;
    }

    if (result) {
      transliteratedWords.push(result);
    }
  }

  return transliteratedWords.join("-");
}

export const schema = {
  types: [
    {
      name: "category",
      title: "Category",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Category Name",
          type: "string",
          validation: (Rule) =>
            Rule.required().error("Category name is required"),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
            slugify: (input) => hindiToRoman(input),
          },
          validation: (Rule) => Rule.required().error("Slug is required"),
        },
        {
          name: "description",
          title: "Description",
          type: "text",
          rows: 3,
        },
      ],
      preview: {
        select: {
          title: "title",
          subtitle: "slug.current",
        },
      },
    },

    {
      name: "author",
      title: "Author",
      type: "document",
      fields: [
        {
          name: "name",
          title: "Name",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "name",
            maxLength: 96,
          },
        },
        {
          name: "image",
          title: "Image",
          type: "string",
          components: {
            input: CloudinaryImageInput,
          },
        },
        {
          name: "bio",
          title: "Bio",
          type: "text",
          rows: 4,
        },
      ],
    },

    {
      name: "post",
      title: "Post",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) =>
            Rule.required()
              .min(10)
              .max(200)
              .error("Title must be between 10-200 characters"),
        },
        {
          name: "slug",
          title: "URL Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
            slugify: (input) => hindiToRoman(input),
          },
          validation: (Rule) => Rule.required().error("URL Slug is required"),
        },
        {
          name: "excerpt",
          title: "Excerpt",
          type: "text",
          rows: 3,
          validation: (Rule) =>
            Rule.max(300).error("Excerpt should be under 300 characters"),
        },
        {
          name: "body",
          title: "Content",
          type: "blockContent",
          validation: (Rule) => Rule.required().error("Content is required"),
        },
        {
          name: "mainImage",
          title: "Main Image (Cloudinary URL)",
          type: "string",
          components: {
            input: CloudinaryImageInput,
          },
        },
        {
          name: "mainImageCaption",
          title: "Main Image Caption",
          type: "string",
        },
        {
          name: "category",
          title: "Category",
          type: "reference",
          to: [{ type: "category" }],
          validation: (Rule) =>
            Rule.required().error("Category selection is required"),
        },
        {
          name: "author",
          title: "Author",
          type: "reference",
          to: [{ type: "author" }],
        },
        {
          name: "featured",
          title: "Featured Post",
          type: "boolean",
          initialValue: false,
        },
        {
          name: "videoLink",
          title: "Video Link",
          type: "url",
          validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }),
        },
        {
          name: "views",
          title: "Views Count",
          type: "number",
          initialValue: 0,
          validation: (Rule) => Rule.min(0),
        },
      ],
      orderings: [
        {
          title: "Publication Date (Newest First)",
          name: "createdAtDesc",
          by: [{ field: "_createdAt", direction: "desc" }],
        },
        {
          title: "Title",
          name: "titleAsc",
          by: [{ field: "title", direction: "asc" }],
        },
      ],
      preview: {
        select: {
          title: "title",
          media: "mainImage",
          category: "category.title",
          featured: "featured",
        },
        prepare(selection) {
          const { title, category, featured } = selection;
          return {
            title,
            subtitle: `${category || "No Category"}${featured ? " • ⭐ Featured" : ""}`,
          };
        },
      },
    },

    {
      name: "blockContent",
      title: "Block Content",
      type: "array",
      of: [
        {
          title: "Block",
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading 1", value: "h1" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet Points", value: "bullet" },
            { title: "Numbered List", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                title: "Link",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                    validation: (Rule) =>
                      Rule.uri({
                        scheme: ["http", "https", "mailto", "tel"],
                      }),
                  },
                  {
                    title: "Open in New Window",
                    name: "blank",
                    type: "boolean",
                    initialValue: false,
                  },
                ],
              },
            ],
          },
        },
        {
          type: "object",
          name: "cloudinaryImage",
          title: "Image (Cloudinary)",
          fields: [
            {
              name: "imageRef",
              title: "Image",
              type: "object",
              fields: [
                {
                  name: "ref",
                  type: "string",
                },
              ],
            },
            {
              name: "alt",
              title: "Alt Text",
              type: "string",
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
        {
          type: "object",
          name: "gallery",
          title: "Photo Gallery",
          fields: [
            {
              name: "images",
              title: "Images",
              type: "array",
              of: [
                {
                  type: "object",
                  name: "galleryImage",
                  fields: [
                    {
                      name: "url",
                      title: "Image URL",
                      type: "string",
                    },
                    {
                      name: "alt",
                      title: "Alt Text",
                      type: "string",
                    },
                  ],
                },
              ],
              components: {
                input: MultiImageInput,
              },
              validation: (Rule) => Rule.min(1).error("Add at least one image"),
            },
          ],
        },
        {
          type: "object",
          name: "youtube",
          title: "YouTube Video",
          fields: [
            {
              name: "url",
              title: "YouTube URL",
              type: "url",
              validation: (Rule) =>
                Rule.required().uri({ scheme: ["http", "https"] }),
            },
            {
              name: "caption",
              title: "Caption",
              type: "string",
            },
          ],
        },
      ],
    },
  ],
};
