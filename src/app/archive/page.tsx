import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import CollectionCard from '@/components/CollectionCard'
import { archivedCollections, collections } from '@/tokens'

export default function ArchivePage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-16 grid grid-cols-2 gap-16 items-end">
        <div>
          <h1 className="font-serif text-6xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
            The Archive
          </h1>
          <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--muted)' }}>
            Past collections remain here for reference. Some may return — we never delete the
            record, we just retire it.
          </p>
        </div>
        <div className="aspect-[4/3] img-placeholder" />
      </section>

      {/* Past collections */}
      <section className="py-16" style={{ backgroundColor: 'var(--dark)' }}>
        <div className="max-w-6xl mx-auto px-8">
          <p className="text-xs tracking-widest uppercase mb-10" style={{ color: '#6B6560' }}>
            Past collections
          </p>
          <div className="grid grid-cols-4 gap-8">
            {archivedCollections.map(col => (
              <CollectionCard
                key={col.id}
                name={col.name}
                description={col.description}
                status={col.status}
                badgeLabel={col.mayReturn ? 'May Return' : 'Archived'}
                variant="dark"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Collection lifecycle */}
      <section className="border-t py-16" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-8 grid grid-cols-3 gap-16">
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--muted-2)' }}>
              Collections live now
            </p>
            <p className="font-serif text-3xl mb-2" style={{ color: 'var(--fg)' }}>{collections.length} active</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              Collections rotate over time. What's live now is worth having.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--muted-2)' }}>
              Collection lifecycle
            </p>
            <p className="font-serif text-3xl mb-2" style={{ color: 'var(--fg)' }}>Current → Returning → Archived</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              We retire collections when they've run their course. Past work lives here.
            </p>
          </div>
          <div>
            <p className="text-xs tracking-widest uppercase mb-4" style={{ color: 'var(--muted-2)' }}>
              Archived collections
            </p>
            <p className="font-serif text-3xl mb-2" style={{ color: 'var(--fg)' }}>{archivedCollections.length}</p>
            <p className="text-sm" style={{ color: 'var(--muted)' }}>
              The archive grows with each season. Explore what came before.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
