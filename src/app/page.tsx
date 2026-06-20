import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CollectionCarousel from '@/components/CollectionCarousel'
import { getActiveCollections, getArchivedCollections } from '@/lib/sanityData'

export const revalidate = 60

export default async function HomePage() {
  const [collections, archivedCollections] = await Promise.all([
    getActiveCollections(),
    getArchivedCollections(),
  ])

  const currentCount = collections.filter(c => c.status === 'current').length
  const returningCount = collections.filter(
    c => c.status === 'returning' || c.status === 'coming-soon'
  ).length
  const archivedCount = archivedCollections.length

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

      {/* Collections at a glance */}
      <section className="py-20" style={{ backgroundColor: 'var(--bg)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <p
            className="text-xs tracking-widest uppercase mb-10"
            style={{ color: 'var(--muted)' }}
          >
            Collections at a glance
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M4 11.5L9 16.5L18 6" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Current',
                description: `${currentCount} collection${currentCount === 1 ? '' : 's'} available to shop now.`,
                cta: 'Browse Current →',
                href: '/collections',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <circle cx="11" cy="11" r="8.5" stroke="var(--fg)" strokeWidth="2" />
                    <path d="M11 6.5V11L14.2 13" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Returning Soon',
                description: `${returningCount} collection${returningCount === 1 ? '' : 's'} in the works and may be back.`,
                cta: 'See What’s Coming →',
                href: '/collections',
              },
              {
                icon: (
                  <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
                    <path d="M3 7L11 3.5L19 7M3 7L11 10.5M3 7V16L11 19.5M19 7L11 10.5M19 7V16L11 19.5M11 10.5V19.5" stroke="var(--fg)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                title: 'Archive',
                description: `${archivedCount} past collection${archivedCount === 1 ? '' : 's'} that may return in the future.`,
                cta: 'Explore Archive →',
                href: '/archive',
              },
            ].map(({ icon, title, description, cta, href }) => (
              <Link
                key={title}
                href={href}
                className="block p-8 border rounded-sm hover:opacity-85 transition-opacity"
                style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}
              >
                <div className="mb-5">{icon}</div>
                <p className="font-serif text-2xl mb-2" style={{ color: 'var(--fg)' }}>{title}</p>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--muted)' }}>
                  {description}
                </p>
                <span
                  className="text-xs tracking-widest uppercase"
                  style={{ color: 'var(--fg)' }}
                >
                  {cta}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
