// index.js
export const schema = {
  types: [
    // Category Schema
    {
      name: "category",
      title: "Category",
      type: "document",
      fields: [
        {
          name: "name",
          title: "Category Name",
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
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // Post Schema
    {
      name: "post",
      title: "Post",
      type: "document",
      fields: [
        {
          name: "title",
          title: "Title",
          type: "string",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "slug",
          title: "Slug",
          type: "slug",
          options: {
            source: "title",
            maxLength: 96,
          },
          validation: (Rule) => Rule.required(),
        },
        {
          name: "content",
          title: "Content",
          type: "blockContent",
        },
        {
          name: "mainImage",
          title: "Main Image",
          type: "image",
          options: {
            hotspot: true,
          },
          fields: [
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
          name: "publishedAt",
          title: "Published At",
          type: "datetime",
          validation: (Rule) => Rule.required(),
        },
        {
          name: "category",
          title: "Category",
          type: "reference",
          to: [{ type: "category" }],
          validation: (Rule) => Rule.required(),
        },
      ],
    },

    // Block Content Schema for rich text
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
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
            annotations: [
              {
                title: "URL",
                name: "link",
                type: "object",
                fields: [
                  {
                    title: "URL",
                    name: "href",
                    type: "url",
                  },
                ],
              },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
    },
  ],
};
