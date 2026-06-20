import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CollectionCarousel from '@/components/CollectionCarousel'
import { getActiveCollections } from '@/lib/sanityData'

export const revalidate = 60

export default async function HomePage() {
  const collections = await getActiveCollections()

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-20 pb-16 grid grid-cols-2 gap-16 items-center">
        <div>
          <h1 className="font-serif text-6xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
            Browse by collection
          </h1>
          <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: 'var(--muted)' }}>
            Good Boy Supply is organised into distinct collections that evolve over time.
            Explore what's current, what's returning, and what's gone to the archive.
          </p>
          <Link
            href="/collections"
            className="inline-block text-xs tracking-widest uppercase px-6 py-3 hover:opacity-85 transition-opacity"
            style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
          >
            Shop Collections
          </Link>
        </div>

        <div className="aspect-[4/3] img-placeholder" />
      </section>

      {/* Dark collection carousel */}
      <section className="py-20" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <p
            className="text-xs tracking-widest uppercase mb-10"
            style={{ color: '#6B6560' }}
          >
            Our Collections
          </p>
          <CollectionCarousel
            items={collections.map(col => ({
              id: col.id,
              slug: col.slug,
              name: col.name,
              description: col.tagline,
              status: col.status,
              productTypes: col.productTypes,
              imageUrl: col.heroImageUrl,
            }))}
            variant="dark"
          />
        </div>
      </section>

      {/* At a glance */}
      <section className="border-b py-14" style={{ borderColor: 'var(--border)' }}>
        <div
          className="max-w-6xl mx-auto px-8 grid grid-cols-3 divide-x text-center"
          style={{ '--tw-divide-opacity': 1 } as React.CSSProperties}
        >
          {[
            { stat: String(collections.length), label: 'Unique Collections' },
            { stat: 'Rotating', label: 'Items each season' },
            { stat: 'Archive', label: 'Past collections available' },
          ].map(({ stat, label }) => (
            <div key={label} className="px-8 py-2" style={{ borderColor: 'var(--border)' }}>
              <p className="font-serif text-4xl mb-2" style={{ color: 'var(--fg)' }}>{stat}</p>
              <p className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted)' }}>{label}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
