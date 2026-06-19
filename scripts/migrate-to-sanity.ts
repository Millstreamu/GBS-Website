// One-time migration: copies the hardcoded catalog data from src/tokens.ts
// into Sanity as real documents. Run once, then delete this file.
//
//   npx tsx scripts/migrate-to-sanity.ts
//
// NOTE: only text data is migrated (names, prices, descriptions, materials,
// features). Product photos are NOT migrated — the current site only has
// placeholder gradients, not real image files. Upload real photography
// through the Sanity Studio dashboard after this runs.

import { createClient } from "@sanity/client";
import { collections, archivedCollections } from "../src/tokens";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: "2024-01-01",
  token: process.env.SANITY_API_TOKEN!, // needs write access
  useCdn: false,
});

async function migrate() {
  for (const col of collections) {
    const collectionDoc = await client.create({
      _type: "collection",
      name: col.name,
      slug: { current: col.slug },
      status: col.status,
      tagline: col.tagline,
      description: col.description,
      longDescription: col.longDescription,
      materials: col.materials,
      productTypes: col.productTypes,
      heroAlt: col.heroAlt,
    });
    console.log(`Created collection: ${col.name}`);

    for (const cat of col.categories) {
      const categoryDoc = await client.create({
        _type: "category",
        name: cat.name,
        slug: { current: cat.slug },
        collection: { _type: "reference", _ref: collectionDoc._id },
      });
      console.log(`  Created category: ${cat.name}`);

      for (const p of cat.products) {
        await client.create({
          _type: "product",
          name: p.name,
          slug: { current: p.slug },
          price: p.price,
          shortDescription: p.shortDesc,
          materials: p.material,
          features: p.features || [],
          category: { _type: "reference", _ref: categoryDoc._id },
          inStock: true,
        });
        console.log(`    Created product: ${p.name}`);
      }
    }
  }

  for (const col of archivedCollections) {
    await client.create({
      _type: "collection",
      name: col.name,
      slug: { current: col.id },
      status: "archived",
      description: col.description,
      mayReturn: col.mayReturn,
    });
    console.log(`Created archived collection: ${col.name}`);
  }

  console.log("Migration complete.");
}

migrate().catch(console.error);
