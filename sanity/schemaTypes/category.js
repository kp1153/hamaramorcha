import { hindiToRoman } from "./utils";

export default {
  name: "category",
  title: "श्रेणी (Category)",
  type: "document",
  fields: [
    {
      name: "name",
      title: "श्रेणी का नाम",
      type: "string",
      validation: (Rule) => Rule.required().error("श्रेणी का नाम आवश्यक है"),
    },
    {
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
        slugify: (input) => {
          const romanized = hindiToRoman(input);
          const timePart = new Date()
            .toISOString()
            .replace(/[-:.TZ]/g, "")
            .slice(0, 14);
          return `${romanized}-${timePart}`;
        },
      },
      validation: (Rule) => Rule.required().error("Slug आवश्यक है"),
    },
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "slug.current",
    },
  },
};