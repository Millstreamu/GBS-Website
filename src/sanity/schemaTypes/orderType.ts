import { defineField, defineType } from "sanity";

export const orderType = defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "stripeSessionId",
      title: "Stripe session ID",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer email",
      type: "string",
    }),
    defineField({
      name: "amountTotal",
      title: "Amount total (cents)",
      type: "number",
    }),
    defineField({
      name: "currency",
      title: "Currency",
      type: "string",
    }),
    defineField({
      name: "items",
      title: "Items",
      type: "array",
      of: [
        {
          type: "object",
          name: "orderItem",
          fields: [
            defineField({ name: "name", title: "Name", type: "string" }),
            defineField({ name: "slug", title: "Slug", type: "string" }),
            defineField({ name: "price", title: "Price", type: "number" }),
            defineField({ name: "quantity", title: "Quantity", type: "number" }),
          ],
        },
      ],
    }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: { list: ["paid", "fulfilled", "cancelled"] },
      initialValue: "paid",
    }),
    defineField({
      name: "createdAt",
      title: "Created at",
      type: "datetime",
    }),
  ],
  preview: {
    select: { title: "customerEmail", subtitle: "stripeSessionId" },
  },
});
