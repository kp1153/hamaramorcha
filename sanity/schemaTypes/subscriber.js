export default {
  name: "subscriber",
  title: "Subscribers",
  type: "document",
  fields: [
    {
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    },
    {
      name: "subscribedAt",
      title: "Subscribed At",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    },
    {
      name: "isActive",
      title: "Active",
      type: "boolean",
      initialValue: true,
    },
  ],
};
