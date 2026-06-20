import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CollectionCard from '@/components/CollectionCard'
import { site } from '@/tokens'
import { getActiveCollections } from '@/lib/sanityData'

export const revalidate = 60

export default async function AboutPage() {
  const { about } = site
  const collections = await getActiveCollections()

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-16 grid grid-cols-2 gap-16 items-end">
        <div>
          <h1 className="font-serif text-6xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
            {about.headline}
          </h1>
          <p className="text-base leading-relaxed max-w-md mb-8" style={{ color: 'var(--muted)' }}>
            {about.subheadline}
          </p>
          <div className="flex gap-10 text-sm" style={{ color: 'var(--muted)' }}>
            {['Thoughtful Goods', 'Honest Design', 'Made to Last'].map(label => (
              <div key={label} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="aspect-[4/3] img-placeholder" />
      </section>

      {/* Story + Approach */}
      <section className="border-t py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-2 gap-20">
          <div>
            <h2 className="font-serif text-3xl mb-6" style={{ color: 'var(--fg)' }}>Our story</h2>
            {about.story.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4 last:mb-0" style={{ color: 'var(--muted)' }}>
                {p}
              </p>
            ))}
          </div>
          <div>
            <h2 className="font-serif text-3xl mb-6" style={{ color: 'var(--fg)' }}>Our approach</h2>
            {about.approach.map((p, i) => (
              <p key={i} className="text-sm leading-relaxed mb-4 last:mb-0" style={{ color: 'var(--muted)' }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t py-20" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-4 gap-10">
          {about.values.map(({ title, desc }) => (
            <div key={title}>
              <div className="w-8 h-0.5 mb-5" style={{ backgroundColor: 'var(--accent)' }} />
              <p className="font-serif text-lg mb-3" style={{ color: 'var(--fg)' }}>{title}</p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="py-20" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <h2 className="font-serif text-3xl mb-10" style={{ color: '#F5F2ED' }}>Our collections</h2>
          <div className="grid grid-cols-3 gap-10">
            {collections.map(col => (
              <CollectionCard
                key={col.id}
                href={`/collections/${col.slug}`}
                name={col.name}
                description={col.tagline}
                status={col.status}
                productTypes={col.productTypes}
                variant="dark"
                imageUrl={col.heroImageUrl}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
