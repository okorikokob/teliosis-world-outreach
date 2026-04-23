import { defineField, defineType } from "sanity";

export default defineType({
  name: "sermon",
  title: "Audio Sermons",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Sermon Title",
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
      name: "speaker",
      title: "Speaker",
      type: "string",
      initialValue: "Pastor Peter E. Nwoji",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "series",
      title: "Sermon Series",
      type: "string",
      description: "E.g., 'Faith Foundations'",
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: "date",
      title: "Date Preached",
      type: "date",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "E.g., '42:15'",
    }),
    defineField({
      name: "audioUrl",
      title: "Cloudflare Audio Link",
      type: "url",
      description:
        "Paste the direct .mp3 link from Cloudflare R2 here. This single link powers both the audio player and the download button.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "published",
      title: "Published",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "speaker",
      date: "date",
    },
    prepare({ title, subtitle, date }) {
      return {
        title,
        subtitle: `${subtitle} • ${date ? new Date(date).toLocaleDateString() : ""}`,
      };
    },
  },
});
