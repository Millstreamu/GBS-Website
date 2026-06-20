import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CollectionCard from '@/components/CollectionCard'
import { getActiveCollections } from '@/lib/sanityData'

export const revalidate = 60

export default async function CollectionsPage() {
  const collections = await getActiveCollections()

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <div className="max-w-6xl mx-auto px-8 py-16">
        <h1 className="font-serif text-5xl mb-4" style={{ color: 'var(--fg)' }}>Collections</h1>
        <p className="text-base mb-16 max-w-lg" style={{ color: 'var(--muted)' }}>
          Distinct collections, each with its own character and focus. Collections rotate
          over time — what's here now is worth having.
        </p>

        <div className="grid grid-cols-3 gap-10">
          {collections.map(col => (
            <CollectionCard
              key={col.id}
              href={`/collections/${col.slug}`}
              name={col.name}
              description={col.tagline}
              status={col.status}
              productTypes={col.productTypes}
              variant="light"
              imageUrl={col.heroImageUrl}
            />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
