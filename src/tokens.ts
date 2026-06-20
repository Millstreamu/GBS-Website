// Good Boy Supply Co. — design tokens
// Single source of truth for all content, colours, and site config.
// Never hardcode product names, prices, or copy directly into page components —
// always reference them from this file, so updates happen in one place.

export const theme = {
  colors: {
    bg: '#F5F2ED',
    surface: '#EEEAE3',
    dark: '#1C1C1A',
    text: '#1C1C1A',
    textSecondary: '#6B6560',
    textMuted: '#9A9590',
    accent: '#2D3B2A',
    accentText: '#F5F2ED',
    border: '#E0DDD7',
    badges: {
      current: { bg: '#2D3B2A', text: '#F5F2ED' },
      returning: { bg: '#A0732A', text: '#F5F2ED' },
      'coming-soon': { bg: '#3D5A6B', text: '#F5F2ED' },
      archived: { bg: '#5A5550', text: '#F5F2ED' },
    },
  },
  fonts: {
    serif: 'var(--font-serif)',
    sans: 'var(--font-sans)',
  },
} as const

export type CollectionStatus = 'current' | 'returning' | 'coming-soon' | 'archived'

export interface Product {
  slug: string
  name: string
  price: number
  shortDesc: string
  material: string
  tag: string
  features?: string[]
  imageUrls?: string[]
}

export interface ProductCategory {
  name: string
  slug: string
  products: Product[]
}

export interface Collection {
  id: string
  slug: string
  name: string
  status: CollectionStatus
  tagline: string
  description: string
  longDescription: string
  materials: string
  productTypes: string
  heroAlt: string
  heroImageUrl?: string
  categories: ProductCategory[]
}

export const collections: Collection[] = [
  {
    id: 'fieldmark',
    slug: 'fieldmark',
    name: 'Fieldmark',
    status: 'current',
    tagline: 'Everyday carry in canvas and leather.',
    description: 'Everyday carry in canvas and leather.',
    longDescription:
      'Built for the daily miles. Timeless materials. Made to keep up and age beautifully.',
    materials: 'Waxed Canvas, Full-Grain Leather, Brass Hardware',
    productTypes: 'Canvas Bags, Leather Wallets',
    heroAlt: 'Waxed canvas tote and leather wallet on a timber surface',
    categories: [
      {
        name: 'Canvas Bags',
        slug: 'canvas-bags',
        products: [
          {
            slug: 'field-tote',
            name: 'Field Tote',
            price: 198,
            shortDesc: 'A roomy tote for workdays, weekends, and everything in between.',
            material: 'Waxed canvas & full-grain leather',
            tag: 'Canvas Bags',
            features: [
              'Waxed canvas exterior',
              'Full-grain leather handles',
              'Solid brass hardware',
              'Cotton twill lining',
              'Interior slip pocket',
              'Interior zip pocket',
              'Detachable shoulder strap',
              'Made responsibly',
            ],
          },
          {
            slug: 'utility-satchel',
            name: 'Utility Satchel',
            price: 228,
            shortDesc: 'A versatile crossbody built for everyday movement.',
            material: 'Waxed canvas, brass buckles, leather trim',
            tag: 'Canvas Bags',
          },
          {
            slug: 'market-carryall',
            name: 'Market Carryall',
            price: 168,
            shortDesc: 'Lightweight and durable for market runs and daily errands.',
            material: '10oz waxed canvas, brass rivets',
            tag: 'Canvas Bags',
          },
        ],
      },
      {
        name: 'Leather Wallets',
        slug: 'leather-wallets',
        products: [
          {
            slug: 'fold-wallet',
            name: 'Fold Wallet',
            price: 78,
            shortDesc: 'Classic bi-fold with room for essentials and more.',
            material: 'Full-grain vegetable-tanned leather',
            tag: 'Leather Wallets',
          },
          {
            slug: 'card-sleeve',
            name: 'Card Sleeve',
            price: 48,
            shortDesc: 'Minimal by design. Holds cards you use most.',
            material: 'Single-piece veg-tan leather',
            tag: 'Leather Wallets',
          },
          {
            slug: 'travel-billfold',
            name: 'Travel Billfold',
            price: 98,
            shortDesc: 'Organised storage for travel documents, cards, and cash.',
            material: 'Full-grain leather, saddle-stitched',
            tag: 'Leather Wallets',
          },
        ],
      },
    ],
  },
  {
    id: 'furniture',
    slug: 'furniture',
    name: 'Good Boy Furniture',
    status: 'current',
    tagline: 'Functional furniture components and statement pieces.',
    description: 'Functional furniture components and statement pieces.',
    longDescription: 'Furniture built for daily life — not for showrooms.',
    materials: 'Solid Wood, Steel, Brass Hardware',
    productTypes: 'Table Legs, Dining Tables',
    heroAlt: 'Dark timber dining table in a moody room',
    categories: [
      {
        name: 'Table Legs',
        slug: 'table-legs',
        products: [
          {
            slug: 'tapered-legs',
            name: 'Tapered Legs',
            price: 168,
            shortDesc: 'Sleek profile with subtle taper for a refined look.',
            material: 'Solid ash, set of 4, M10 hanger bolt',
            tag: 'Table Legs',
          },
          {
            slug: 'studio-base',
            name: 'Studio Base',
            price: 198,
            shortDesc: 'Clean, open base perfect for modern spaces.',
            material: 'Steel, powder-coated matte black',
            tag: 'Table Legs',
          },
          {
            slug: 'block-legs',
            name: 'Block Legs',
            price: 148,
            shortDesc: 'Bold and substantial for a grounded presence.',
            material: 'Solid oak, set of 4',
            tag: 'Table Legs',
          },
        ],
      },
      {
        name: 'Dining Tables',
        slug: 'dining-tables',
        products: [
          {
            slug: 'hearth-dining-table',
            name: 'Hearth Dining Table',
            price: 1598,
            shortDesc: 'Warm wood and timeless proportions for everyday meals.',
            material: 'White oak, hand-oiled, 2000×900mm',
            tag: 'Dining Tables',
          },
          {
            slug: 'workshop-table',
            name: 'Workshop Table',
            price: 1798,
            shortDesc: 'Sturdy and practical with heritage details.',
            material: 'Reclaimed timber, steel legs',
            tag: 'Dining Tables',
          },
          {
            slug: 'long-table',
            name: 'Long Table',
            price: 1998,
            shortDesc: 'Built for gatherings with room to spare.',
            material: 'White oak, 2400×900mm, hand-oiled',
            tag: 'Dining Tables',
          },
        ],
      },
    ],
  },
  {
    id: 'stillroom',
    slug: 'stillroom',
    name: 'Stillroom',
    status: 'returning',
    tagline: 'Quiet kitchen objects in wood and glass.',
    description: 'Quiet kitchen objects in wood and glass.',
    longDescription:
      'Crafted for slow mornings and shared meals. Simple pieces that bring calm to the everyday.',
    materials: 'Solid Wood, Recycled Glass, Food-Safe Finishes',
    productTypes: 'Wood Goods, Glass Goods',
    heroAlt: 'Wooden spoons and glass jars on a linen-draped surface',
    categories: [
      {
        name: 'Wood Goods',
        slug: 'wood-goods',
        products: [
          {
            slug: 'spoon-crock',
            name: 'Spoon Crock',
            price: 48,
            shortDesc: 'A sturdy vessel for everyday tools.',
            material: 'Hand-turned walnut',
            tag: 'Wood Goods',
          },
          {
            slug: 'utility-board',
            name: 'Utility Board',
            price: 58,
            shortDesc: 'A versatile board for prep and serve.',
            material: 'End-grain walnut, food-safe oiled',
            tag: 'Wood Goods',
          },
          {
            slug: 'serving-spoon',
            name: 'Serving Spoon',
            price: 18,
            shortDesc: 'Hand-shaped for stirring and serving.',
            material: 'Solid oak, hand-carved',
            tag: 'Wood Goods',
          },
        ],
      },
      {
        name: 'Glass Goods',
        slug: 'glass-goods',
        products: [
          {
            slug: 'green-glass-jar',
            name: 'Green Glass Jar',
            price: 26,
            shortDesc: 'For pantry staples and bulk goods.',
            material: 'Recycled glass, 1L',
            tag: 'Glass Goods',
          },
          {
            slug: 'pantry-tumbler',
            name: 'Pantry Tumbler',
            price: 14,
            shortDesc: 'Simple tumblers for water or wine.',
            material: 'Mouth-blown recycled glass',
            tag: 'Glass Goods',
          },
          {
            slug: 'preserve-bottle',
            name: 'Preserve Bottle',
            price: 22,
            shortDesc: 'Ideal for oils, syrups, and infusions.',
            material: 'Recycled glass, swing-top lid',
            tag: 'Glass Goods',
          },
        ],
      },
    ],
  },
]

export const archivedCollections = [
  {
    id: 'campfire',
    name: 'Campfire',
    description: 'Rugged gear for nights outdoors and the stories around the fire.',
    status: 'archived' as const,
    mayReturn: false,
  },
  {
    id: 'workshop',
    name: 'Workshop',
    description: 'Tools and storage for hands-on projects and everyday fixes.',
    status: 'archived' as const,
    mayReturn: false,
  },
  {
    id: 'stillroom-2023',
    name: 'Stillroom 2023',
    description: 'An earlier take on quiet kitchen essentials in wood and glass.',
    status: 'archived' as const,
    mayReturn: true,
  },
  {
    id: 'ledger',
    name: 'Ledger',
    description: 'Everyday notebooks and essentials for record keeping and reflection.',
    status: 'archived' as const,
    mayReturn: false,
  },
]

export const site = {
  name: 'Good Boy Supply',
  tagline: 'Thoughtful goods. Made well. Built around collections.',
  about: {
    headline: 'About Good Boy Supply',
    subheadline:
      'Thoughtful goods, made well. We build collections with purpose, using honest materials and timeless design.',
    story: [
      'Good Boy Supply began with a simple idea: everyday items should be useful, beautiful, and made to last. We set out to create collections that earn a place in your daily routine.',
      'Every product starts with purpose and is brought to life through thoughtful design, quality materials, and careful craftsmanship.',
    ],
    approach: [
      'We work with trusted makers and small workshops who share our standards and attention to detail. We keep our runs small, our materials honest, and our designs timeless.',
      'The result is goods that feel good in your hands and only get better with time.',
    ],
    values: [
      { title: 'Honest Materials', desc: 'We choose materials that are durable, beautiful, and responsibly sourced when possible.' },
      { title: 'Small Batches', desc: 'We produce in small runs to ensure quality, reduce waste, and stay intentional.' },
      { title: 'Built to Last', desc: 'We design and make goods that stand up to daily use and the test of time.' },
      { title: 'Collections with Purpose', desc: 'Our collections are curated with intention — built to work together and evolve over time.' },
    ],
  },
  contact: {
    headline: 'Contact',
    subheadline:
      "We're here to help. Questions about our products, orders, or partnerships — reach out anytime. We'll get back to you as soon as we can.",
    channels: [
      { title: 'General Enquiries', desc: 'Questions about products, orders, or anything else.', email: 'hello@goodboysupply.com' },
      { title: 'Shipping & Returns', desc: 'Need help with an order, shipping, or a return?', email: 'support@goodboysupply.com' },
      { title: 'Wholesale / Stockists', desc: 'Interested in carrying Good Boy Supply?', email: 'wholesale@goodboysupply.com' },
      { title: 'Press', desc: 'Media inquiries and press requests.', email: 'press@goodboysupply.com' },
    ],
    faqs: [
      { q: 'How long does shipping take?', a: 'Orders typically ship within 1–2 business days. Delivery times depend on your location.' },
      { q: 'What is your return policy?', a: 'We accept returns within 30 days of delivery for unused items in original condition.' },
      { q: 'Where are your products made?', a: 'Our products are made with care using quality materials sourced from trusted partners.' },
    ],
  },
  footer: {
    shop: ['Collections', 'Archive'],
    about: ['Our Story', 'Materials & Care'],
    support: ['Contact', 'Shipping & Returns', 'FAQs'],
  },
}

export function formatPrice(dollars: number): string {
  if (dollars >= 1000) {
    return `$${dollars.toLocaleString('en-AU', { minimumFractionDigits: 0 })}`
  }
  return `$${dollars}`
}
