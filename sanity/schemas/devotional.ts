import { defineField, defineType } from "sanity";

export default defineType({
  name: "devotional",
  title: "Devotionals",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "publishedAt",
      title: "Published Date",
      type: "datetime",
      validation: (Rule) => Rule.required(),
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "scripture",
      title: "Scripture Reference",
      type: "string",
      description: "E.g., 'Isaiah 41:10'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "verseText",
      title: "Key Verse Text",
      type: "text",
      description: "The actual words of the scripture for the top box.",
      validation: (Rule) => Rule.required(),
    }),
    // defineField({
    //   name: "meditation",
    //   title: "Daily Meditation",
    //   type: "text",
    //   description: "The closing reflection or prayer.",
    // }),
    defineField({
      name: "excerpt",
      title: "Excerpt",
      type: "text",
      description: "Brief summary for cards and previews (max 200 characters)",
      validation: (Rule) => Rule.required().max(200),
    }),
    defineField({
      name: "coverImage",
      title: "Cover Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          marks: {
            decorators: [
              { title: "Strong", value: "strong" },
              { title: "Emphasis", value: "em" },
            ],
          },
        },
        {
          type: "image",
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readTime",
      title: "Read Time (minutes)",
      type: "number",
      description: "Estimated read time in minutes",
      validation: (Rule) => Rule.required().min(1).max(30),
    }),

    defineField({
      name: "confession",
      title: "Daily Confession",
      type: "text", // Great for the "In Jesus name..." part
    }),
    defineField({
      name: "pray",
      title: "Prayer",
      type: "text",
    }),
    defineField({
      name: "meditationScripture",
      title: "Meditation Scripture",
      type: "string",
      description: "E.g., 2Tim.1.7",
    }),
    defineField({
      name: "meditationText",
      title: "Meditation Text",
      type: "text",
      description: "The actual words of the meditation scripture.",
    }),
    defineField({
      name: "audioUrl",
      title: "Audio URL",
      type: "url",
      description: "Link to audio version of this devotional",
    }),
    defineField({
      name: "topics",
      title: "Topics",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { title: "Faith", value: "faith" },
          { title: "Growth", value: "growth" },
          { title: "Prayer", value: "prayer" },
          { title: "Marriage", value: "marriage" },
          { title: "Purpose", value: "purpose" },
          { title: "Healing", value: "healing" },
          { title: "Prosperity", value: "prosperity" },
          { title: "Grace", value: "grace" },
        ],
      },
    }),
    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      description: "Show this devotional in the spotlight section",
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      media: "coverImage",
      scripture: "scripture",
    },
    prepare({ title, date, media, scripture }) {
      const formattedDate = new Date(date).toLocaleDateString();
      return {
        title: title,
        subtitle: `${scripture} • ${formattedDate}`,
        media: media,
      };
    },
  },
  orderings: [
    {
      title: "Published Date, New",
      name: "publishedDateDesc",
      by: [{ field: "publishedAt", direction: "desc" }],
    },
    {
      title: "Published Date, Old",
      name: "publishedDateAsc",
      by: [{ field: "publishedAt", direction: "asc" }],
    },
  ],
});
