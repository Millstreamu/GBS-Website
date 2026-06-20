// Fetches catalog content (collections, categories, products) from Sanity
// and maps it into the same shapes the page components already expect
// (see the Collection/Product types in src/tokens.ts). This keeps every
// existing component (ProductCard, CollectionCard, Badge, CollectionCarousel)
// unchanged — only the data source moves from tokens.ts to Sanity.

import { sanityClient, urlFor } from "./sanity";
import type { Collection, Product, ProductCategory, CollectionStatus } from "@/tokens";

type SanityImageRef = { asset?: { _ref?: string; _id?: string } } | null | undefined;

type SanityProduct = {
  _id: string;
  name: string;
  slug: string;
  sku?: string;
  price: number;
  shortDescription?: string;
  materials?: string;
  features?: string[];
  images?: SanityImageRef[];
};

type SanityCategory = {
  _id: string;
  name: string;
  slug: string;
  products: SanityProduct[];
};

type SanityCollection = {
  _id: string;
  name: string;
  slug: string;
  status: CollectionStatus;
  tagline?: string;
  description?: string;
  longDescription?: string;
  materials?: string;
  productTypes?: string;
  heroAlt?: string;
  heroImage?: SanityImageRef;
  categories: SanityCategory[];
};

// Sanity returns null for empty image fields, and not every image asset
// reference is guaranteed valid — guard before calling urlFor() so a bad
// or missing image never breaks the page.
function safeImageUrl(image: SanityImageRef): string | undefined {
  if (!image || !image.asset) return undefined;
  try {
    return urlFor(image).width(1200).fit("max").auto("format").url();
  } catch {
    return undefined;
  }
}

function mapProduct(p: SanityProduct, tag: string): Product {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    shortDesc: p.shortDescription ?? "",
    material: p.materials ?? "",
    tag,
    features: p.features,
    imageUrls: (p.images ?? [])
      .map(safeImageUrl)
      .filter((url): url is string => !!url),
  };
}

function mapCategory(c: SanityCategory): ProductCategory {
  return {
    name: c.name,
    slug: c.slug,
    products: c.products.map(p => mapProduct(p, c.name)),
  };
}

function mapCollection(c: SanityCollection): Collection {
  return {
    id: c.slug,
    slug: c.slug,
    name: c.name,
    status: c.status,
    tagline: c.tagline ?? "",
    description: c.description ?? c.tagline ?? "",
    longDescription: c.longDescription ?? c.description ?? "",
    materials: c.materials ?? "",
    productTypes: c.productTypes ?? "",
    heroAlt: c.heroAlt ?? `${c.name} hero image`,
    heroImageUrl: safeImageUrl(c.heroImage),
    categories: (c.categories ?? []).map(mapCategory),
  };
}

const COLLECTION_PROJECTION = `
  _id, name, "slug": slug.current, status, tagline, description, longDescription,
  materials, productTypes, heroAlt, heroImage,
  "categories": *[_type == "category" && collection._ref == ^._id] {
    _id, name, "slug": slug.current,
    "products": *[_type == "product" && category._ref == ^._id] {
      _id, name, "slug": slug.current, sku, price, shortDescription, materials, features, images
    }
  }
`;

export async function getActiveCollections(): Promise<Collection[]> {
  const results = await sanityClient.fetch<SanityCollection[]>(
    `*[_type == "collection" && status != "archived"] | order(name asc) { ${COLLECTION_PROJECTION} }`
  );
  return results.map(mapCollection);
}

export async function getCollectionBySlug(slug: string): Promise<Collection | null> {
  const result = await sanityClient.fetch<SanityCollection | null>(
    `*[_type == "collection" && slug.current == $slug][0] { ${COLLECTION_PROJECTION} }`,
    { slug }
  );
  return result ? mapCollection(result) : null;
}

export async function getAllCollectionSlugs(): Promise<string[]> {
  const slugs = await sanityClient.fetch<string[]>(
    `*[_type == "collection"].slug.current`
  );
  return slugs;
}

export async function getAllProductParams(): Promise<
  { slug: string; category: string; product: string }[]
> {
  const rows = await sanityClient.fetch<
    { collection: string; category: string; product: string }[]
  >(`
    *[_type == "product"] {
      "product": slug.current,
      "category": category->slug.current,
      "collection": category->collection->slug.current
    }
  `);
  return rows
    .filter(r => r.collection && r.category && r.product)
    .map(r => ({ slug: r.collection, category: r.category, product: r.product }));
}

export async function getAllCategoryParams(): Promise<
  { slug: string; category: string }[]
> {
  const rows = await sanityClient.fetch<
    { collection: string; category: string }[]
  >(`
    *[_type == "category"] {
      "category": slug.current,
      "collection": collection->slug.current
    }
  `);
  return rows
    .filter(r => r.collection && r.category)
    .map(r => ({ slug: r.collection, category: r.category }));
}

export async function getArchivedCollections(): Promise<
  { id: string; name: string; description: string; status: "archived"; mayReturn: boolean }[]
> {
  const rows = await sanityClient.fetch<
    { slug: string; name: string; description?: string; mayReturn?: boolean }[]
  >(`
    *[_type == "collection" && status == "archived"] | order(name asc) {
      "slug": slug.current, name, description, mayReturn
    }
  `);
  return rows.map(r => ({
    id: r.slug,
    name: r.name,
    description: r.description ?? "",
    status: "archived" as const,
    mayReturn: !!r.mayReturn,
  }));
}
