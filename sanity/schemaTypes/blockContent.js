import CloudinaryImageInput from "./CloudinaryImageInput";
import MultiImageInput from "./MultiImageInput";

export default {
  name: "blockContent",
  title: "Block Content",
  type: "array",
  of: [
    {
      title: "Block",
      type: "block",
      styles: [
        { title: "सामान्य", value: "normal" },
        { title: "शीर्षक 1", value: "h1" },
        { title: "शीर्षक 2", value: "h2" },
        { title: "शीर्षक 3", value: "h3" },
        { title: "उद्धरण", value: "blockquote" },
      ],
      lists: [
        { title: "बुलेट पॉइंट", value: "bullet" },
        { title: "संख्या सूची", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "मोटा (Bold)", value: "strong" },
          { title: "तिरछा (Italic)", value: "em" },
          { title: "अंडरलाइन", value: "underline" },
          { title: "पिंक", value: "pink" },
        ],
        annotations: [
          {
            title: "लिंक",
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
                title: "नई विंडो में खोलें",
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
      title: "तस्वीर (Cloudinary)",
      fields: [
        {
          name: "url",
          title: "Image URL",
          type: "string",
          components: {
            input: CloudinaryImageInput,
          },
        },
        {
          name: "caption",
          title: "कैप्शन",
          type: "string",
        },
      ],
    },
    {
      type: "object",
      name: "gallery",
      title: "फोटो गैलरी",
      fields: [
        {
          name: "images",
          title: "तस्वीरें",
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
          validation: (Rule) => Rule.min(1).error("कम से कम एक तस्वीर जोड़ें"),
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
    {
      type: "object",
      name: "break",
      title: "पेज ब्रेक",
      fields: [
        {
          name: "style",
          type: "string",
          options: { list: ["break", "line"] },
        },
      ],
    },
  ],
};