import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import Badge from '@/components/Badge'
import ProductCard from '@/components/ProductCard'
import CollectionCard from '@/components/CollectionCard'
import { collections } from '@/tokens'

export function generateStaticParams() {
  return collections.map(col => ({ slug: col.slug }))
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const col = collections.find(c => c.slug === params.slug)
  if (!col) notFound()

  const otherCollections = collections.filter(c => c.slug !== col.slug)
  const itemCount = col.categories.reduce((acc, c) => acc + c.products.length, 0)

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-8 py-10">

        {/* Breadcrumb */}
        <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:opacity-60 transition-opacity">Collections</Link>
          <span className="mx-2">/</span>
          <span>{col.name}</span>
        </p>

        {/* Hero */}
        <div className="grid grid-cols-2 gap-16 mb-16 pb-12 border-b items-start" style={{ borderColor: 'var(--border)' }}>
          <div>
            <div className="flex items-center gap-4 mb-4">
              <h1 className="font-serif text-5xl leading-tight" style={{ color: 'var(--fg)' }}>
                {col.name}
              </h1>
              <Badge status={col.status} />
            </div>
            <p className="text-base mb-4 font-medium" style={{ color: 'var(--fg)' }}>
              {col.tagline}
            </p>
            <p className="text-sm leading-relaxed mb-8 max-w-md" style={{ color: 'var(--muted)' }}>
              {col.longDescription}
            </p>

            <div className="mb-6">
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>Materials</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{col.materials}</p>
            </div>
            <div>
              <p className="text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>Product Types</p>
              <p className="text-sm" style={{ color: 'var(--muted)' }}>{col.productTypes} — {itemCount} items</p>
            </div>
          </div>

          <div className="aspect-[4/3] img-placeholder" role="img" aria-label={col.heroAlt} />
        </div>

        {/* Categories */}
        {col.categories.map(cat => (
          <section key={cat.slug} className="mb-20">
            <div className="flex items-center justify-between mb-8 pb-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <h2 className="font-serif text-2xl" style={{ color: 'var(--fg)' }}>{cat.name}</h2>
              <Link
                href={`/collections/${col.slug}/${cat.slug}`}
                className="text-xs hover:opacity-60 transition-opacity"
                style={{ color: 'var(--muted)' }}
              >
                View all {cat.name} →
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-8">
              {cat.products.map(product => (
                <ProductCard
                  key={product.slug}
                  product={product}
                  collectionSlug={col.slug}
                  categorySlug={cat.slug}
                />
              ))}
            </div>
          </section>
        ))}
      </div>

      {/* More collections */}
      <section className="py-16" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-serif text-2xl mb-8" style={{ color: '#F5F2ED' }}>
            More collections
          </h2>
          <div className="grid grid-cols-2 gap-10">
            {otherCollections.map(other => (
              <CollectionCard
                key={other.id}
                href={`/collections/${other.slug}`}
                name={other.name}
                description={other.tagline}
                status={other.status}
                productTypes={other.productTypes}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
