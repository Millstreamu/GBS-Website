import Link from 'next/link'
import { notFound } from 'next/navigation'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ProductCard from '@/components/ProductCard'
import { collections } from '@/tokens'

export function generateStaticParams() {
  return collections.flatMap(col =>
    col.categories.map(cat => ({ slug: col.slug, category: cat.slug }))
  )
}

export default function CategoryPage({
  params,
}: {
  params: { slug: string; category: string }
}) {
  const col = collections.find(c => c.slug === params.slug)
  if (!col) notFound()
  const cat = col.categories.find(c => c.slug === params.category)
  if (!cat) notFound()

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-8 py-10">
        <p className="text-xs mb-10" style={{ color: 'var(--muted)' }}>
          <Link href="/" className="hover:opacity-60 transition-opacity">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/collections" className="hover:opacity-60 transition-opacity">Collections</Link>
          <span className="mx-2">/</span>
          <Link href={`/collections/${col.slug}`} className="hover:opacity-60 transition-opacity">{col.name}</Link>
          <span className="mx-2">/</span>
          <span>{cat.name}</span>
        </p>

        <h1 className="font-serif text-4xl mb-12" style={{ color: 'var(--fg)' }}>{cat.name}</h1>

        <div className="grid grid-cols-3 gap-8 mb-16">
          {cat.products.map(product => (
            <ProductCard
              key={product.slug}
              product={product}
              collectionSlug={col.slug}
              categorySlug={cat.slug}
            />
          ))}
        </div>

        <Link
          href={`/collections/${col.slug}`}
          className="text-xs tracking-widest uppercase"
          style={{ color: 'var(--accent)' }}
        >
          ← Back to {col.name}
        </Link>
      </div>

      <Footer />
    </div>
  )
}
