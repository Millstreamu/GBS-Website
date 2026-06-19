import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import ProductDetail from './ProductDetail'
import { collections } from '@/tokens'

export function generateStaticParams() {
  return collections.flatMap(col =>
    col.categories.flatMap(cat =>
      cat.products.map(p => ({
        slug: col.slug,
        category: cat.slug,
        product: p.slug,
      }))
    )
  )
}

export default function ProductPage({
  params,
}: {
  params: { slug: string; category: string; product: string }
}) {
  const col = collections.find(c => c.slug === params.slug)
  if (!col) notFound()
  const cat = col.categories.find(c => c.slug === params.category)
  if (!cat) notFound()
  const product = cat.products.find(p => p.slug === params.product)
  if (!product) notFound()

  const related = col.categories
    .flatMap(c => c.products.map(p => ({ product: p, categorySlug: c.slug })))
    .filter(p => p.product.slug !== product.slug)
    .slice(0, 3)

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${col.slug}`} className="hover:opacity-60 transition-opacity">{col.name}</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${col.slug}/${cat.slug}`} className="hover:opacity-60 transition-opacity">{cat.name}</Link>
          <span className="mx-2">/</span>
          <span>{product.name}</span>
        </p>

        <ProductDetail
          product={product}
          collectionName={col.name}
          collectionSlug={col.slug}
          categorySlug={cat.slug}
        />

        {/* Materials & Details */}
        <section className="border-t py-16" style={{ borderColor: 'var(--border)' }}>
          <div className="grid grid-cols-2 gap-16">
            <div>
              <h2 className="font-serif text-3xl mb-4" style={{ color: 'var(--fg)' }}>Materials &amp; Details</h2>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                {product.material}. Every piece is finished by hand and inspected before it
                leaves the workshop.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-x-8 gap-y-3 content-start">
              {(product.features ?? [product.material, 'Made in small batches', 'Inspected before shipping', 'Backed by our guarantee']).map(f => (
                <p key={f} className="text-sm flex items-start gap-2" style={{ color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--accent)' }}>—</span> {f}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Value props */}
        <section className="border-t py-16 grid grid-cols-3 gap-10" style={{ borderColor: 'var(--border)' }}>
          {[
            { title: 'Built to Last', body: 'Made with materials chosen to age well, not fall apart.' },
            { title: 'Everyday Versatility', body: 'Designed to earn its place in daily use, not sit on a shelf.' },
            { title: 'Timeless Materials', body: 'Honest, simple materials that only look better with time.' },
          ].map(({ title, body }) => (
            <div key={title}>
              <div className="w-8 h-0.5 mb-4" style={{ backgroundColor: 'var(--accent)' }} />
              <p className="font-serif text-lg mb-2" style={{ color: 'var(--fg)' }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{body}</p>
            </div>
          ))}
        </section>

        {/* You may also like */}
        {related.length > 0 && (
          <section className="border-t py-16" style={{ borderColor: 'var(--border)' }}>
            <h2 className="font-serif text-2xl mb-8" style={{ color: 'var(--fg)' }}>You may also like</h2>
            <div className="grid grid-cols-3 gap-8">
              {related.map(({ product: p, categorySlug }) => (
                <ProductCard
                  key={p.slug}
                  product={p}
                  collectionSlug={col.slug}
                  categorySlug={categorySlug}
                />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  )
}
