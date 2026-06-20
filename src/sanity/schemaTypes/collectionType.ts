import { defineField, defineType } from "sanity";

export const collectionType = defineType({
  name: "collection",
  title: "Collection",
  type: "document",
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["current", "returning", "coming-soon", "archived"] },
      initialValue: "current",
    }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text" }),
    defineField({ name: "longDescription", title: "Long description", type: "text" }),
    defineField({ name: "materials", title: "Materials", type: "string" }),
    defineField({ name: "productTypes", title: "Product types", type: "string" }),
    defineField({ name: "heroAlt", title: "Hero image alt text", type: "string" }),
    defineField({ name: "heroImage", title: "Hero image", type: "image", options: { hotspot: true } }),
    defineField({ name: "mayReturn", title: "May return (archived only)", type: "boolean" }),
  ],
  preview: {
    select: { title: "name", subtitle: "status" },
  },
});
