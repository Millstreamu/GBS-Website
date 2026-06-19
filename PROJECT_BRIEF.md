# Good Boy Supply Co. — Project Brief

This document is the context dump for any Claude Code or Cowork session
working on this project. It captures the decisions made and why, so a fresh
session understands the reasoning, not just the end result.

---

## What this is

Good Boy Supply Co. is a brand selling goods organised into **collections** —
distinct product groupings that can come, go, and return over time. Three
collections exist today:

- **Fieldmark** — canvas bags and leather wallets
- **Good Boy Furniture** — table legs and dining tables
- **Stillroom** — kitchen goods in wood and glass

A fourth, implicit "collection" is the **Archive** — a page showing past
collections that have been retired, some of which may return.

## The core design problem we solved

The brand owner's worry: people seeing the site for the first time needed to
immediately understand "this site is organised into collections, each
collection has its own identity, and collections aren't permanent." An
infographic-style, visually distinct approach was wanted over a generic
e-commerce grid.

## Visual direction (locked in from approved mockups)

The owner provided 8 reference mockup images showing the actual approved
look. This is not a placeholder direction — it's the target.

- **Background:** warm linen `#F5F2ED`
- **Surface:** `#EEEAE3`
- **Dark sections (footer, carousel):** `#1C1C1A`
- **Accent / buttons:** deep forest green `#2D3B2A`
- **Text:** `#1C1C1A` primary, `#6B6560` secondary, `#9A9590` muted
- **Headings:** Playfair Display (serif)
- **Body:** Inter (sans)
- **Status badges:** Current = green, Returning = amber `#A0732A`,
  Archive = grey `#5A5550`

Key pages from the mockups, all built into the plugin already:
homepage (hero + dark collection carousel + "at a glance" lifecycle
explainer), collection pages (hero + categorised product grids + "more
collections"), product detail pages (gallery + features + quantity selector
+ "you may also like"), Archive page (past collections grid + lifecycle
explainer), About page (story + values + collections), Contact page (form +
channels + FAQ).

## Key product/business decisions made, and why

**Collections come and go, archived ones don't disappear from view.**
Retired collections move to an Archive page rather than vanishing — they
serve as a record of past work and may return. This shaped the data model:
collections have a `status` field (`current` / `returning` / `archived`)
rather than being deleted outright.

**Prices are shown upfront, everywhere.** The owner was explicit: "I want to
be upfront and to the point." Every product card shows price next to the
name, no hiding it behind a click.

**Custom-built site, not a no-code platform.** Considered Shopify/Webflow as
alternatives. Decided against them because the visual design (per-collection
worlds, custom carousel, non-standard layout) would fight against template
constraints. Trade-off accepted: more pieces to wire up manually (cart,
checkout, inventory) instead of getting them for free.

**Stripe directly, not Shopify's checkout.** Because the site is custom,
Stripe Checkout handles payment processing only — order tracking, inventory,
shipping, and tax all need to be built or configured separately. Decided to
start with a deliberately minimal version: guest checkout, flat-rate
shipping, optional Stripe Tax, no customer accounts yet. More can be added
later; this avoids over-building before the store has real customers.

**Sanity CMS for product management.** The owner (non-technical) and one
teammate need to add products without touching code — name, price, SKU,
description, materials, photos, all via a web form. Sanity was chosen because
it's free for 2 editors, integrates cleanly with Next.js, and replaces what
would otherwise be manual edits to a hardcoded data file. Collection
status (current/returning/archived) also lives here, so retiring or reviving
a collection becomes a dashboard toggle, not a code change.

## Tech stack and what each piece is responsible for

| Tool | Job | Cost |
|---|---|---|
| **Next.js + Tailwind** | The actual website code | Free (open source) |
| **GitHub** | Stores the code, triggers deploys | Free |
| **Vercel** | Hosts the live site + runs backend logic (API routes) | Free at this scale |
| **Sanity** | Product/collection content management — the "add a product" form | Free for 2 editors |
| **Stripe** | Payment processing only | Free to set up; ~1.75% + A$0.30 per AU transaction |
| **Claude Code / Cowork** | Writes and edits the code | (existing subscription) |

Nothing here costs money to simply have running. The only real recurring
cost is the small Stripe fee per sale, plus an optional custom email address
(a few dollars/month) if wanted later.

## Build order (matches the plugin's skill order)

1. `scaffold-project` — Next.js setup, shared Nav/Footer, homepage
2. `build-collection-page` — once per collection (Fieldmark, Furniture, Stillroom)
3. `build-product-card` — product detail pages
4. `build-archive-page` — Archive page
5. `build-about-contact` — About and Contact pages
6. `connect-sanity` — once the design looks right with placeholder data, swap
   in real content management (requires the owner to create a sanity.io
   account and provide a project ID first)
7. `connect-stripe` — once products are real, wire up actual checkout
   (requires the owner to create a stripe.com account and provide API keys
   first)

All of this is implemented as Cowork plugin skills in `good-boy-supply.plugin`
— each skill has a `SKILL.md` with step-by-step instructions and a
`references/` folder with the exact code to write. A Claude Code session
working directly on the repo (rather than through Cowork) can still read
these skill files directly for the same guidance — they're just markdown.

## Single source of truth for content

All product/collection data (until Sanity is connected) lives in
`src/tokens.ts`. Never hardcode product names, prices, or copy directly into
page components — always reference them from this file, so updates happen in
one place.

## Things intentionally deferred (not missing by accident)

- Customer accounts / saved addresses
- Real-time carrier shipping rates (using flat rate for now)
- Order management UI beyond Stripe's own dashboard (Sanity order records are
  optional/manual until specifically requested)
- Mobile-specific layout pass (desktop mockups were the approved reference;
  responsive behaviour should be checked but wasn't the focus of design review)
- Real product photography (everything currently uses placeholder gradients —
  swapping in real photos is a content step, not a code step, once Sanity is
  connected)

## How to use this brief

Drop this file into the project root as `PROJECT_BRIEF.md`. At the start of a
Claude Code or Cowork session, reference it directly ("read PROJECT_BRIEF.md
first") so the session has full context without needing this conversation
history.
