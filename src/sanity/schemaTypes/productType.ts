import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
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
    defineField({ name: "sku", title: "SKU", type: "string" }),
    defineField({ name: "price", title: "Price", type: "number", validation: (r) => r.required().min(0) }),
    defineField({ name: "shortDescription", title: "Short description", type: "text" }),
    defineField({ name: "materials", title: "Materials", type: "string" }),
    defineField({
      name: "features",
      title: "Features",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "reference",
      to: [{ type: "category" }],
      validation: (r) => r.required(),
    }),
    defineField({ name: "inStock", title: "In stock", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "name", subtitle: "sku" },
  },
});
