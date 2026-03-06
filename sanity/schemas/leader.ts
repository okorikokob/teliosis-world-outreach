import { defineField, defineType } from "sanity";

export default defineType({
  name: "leader",
  title: "Leadership Team",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "role",
      title: "Role/Position",
      type: "string",
      validation: (Rule) => Rule.required(),
      options: {
        list: [
          { title: "Senior Pastor", value: "Senior Pastor" },
          { title: "Worship Pastor", value: "Worship Pastor" },
          { title: "Youth Pastor", value: "Youth Pastor" },
          { title: "Children's Pastor", value: "Children's Pastor" },
          { title: "Elder", value: "Elder" },
          { title: "Deacon", value: "Deacon" },
        ],
      },
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      description: "Brief description of their role and impact",
      validation: (Rule) => Rule.required().max(150),
    }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Order in which to display (lower numbers first)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "role",
      media: "image",
    },
  },
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
});
