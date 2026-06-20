import Image from 'next/image'
import Link from 'next/link'
import Badge from './Badge'
import type { CollectionStatus } from '@/tokens'

type Props = {
  href?: string
  name: string
  description: string
  status: CollectionStatus
  badgeLabel?: string
  productTypes?: string
  variant?: 'light' | 'dark'
  imageUrl?: string
}

export default function CollectionCard({
  href,
  name,
  description,
  status,
  badgeLabel,
  productTypes,
  imageUrl,
}: Props) {
  const categories = productTypes
    ? productTypes.split(',').map(s => s.trim()).filter(Boolean)
    : []

  const exploreLabel = status === 'archived' ? 'Explore Archive →' : 'Explore Collection →'

  const inner = (
    <div className="relative aspect-[3/4] w-full overflow-hidden rounded-sm img-placeholder-dark">
      {imageUrl && (
        <Image
          src={imageUrl}
          alt={name}
          fill
          sizes="(min-width: 1024px) 25vw, 100vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
      )}

      {/* Gradient for text legibility over the photo */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-black/5" />

      <Badge status={status} label={badgeLabel} className="absolute top-4 left-4 z-10" />

      <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
        <p className="font-serif text-2xl mb-1.5" style={{ color: '#F5F2ED' }}>
          {name}
        </p>
        <p className="text-sm leading-relaxed mb-3" style={{ color: '#D8D4CC' }}>
          {description}
        </p>

        {categories.length > 0 && (
          <ul className="mb-4 space-y-1.5">
            {categories.map(cat => (
              <li
                key={cat}
                className="flex items-center gap-2 text-xs tracking-wide"
                style={{ color: '#B8B3AA' }}
              >
                <svg width="7" height="7" viewBox="0 0 7 7" fill="none" className="flex-shrink-0">
                  <circle cx="3.5" cy="3.5" r="3.5" fill="#9A9590" />
                </svg>
                {cat}
              </li>
            ))}
          </ul>
        )}

        {href && (
          <span
            className="text-xs tracking-widest uppercase group-hover:opacity-60 transition-opacity"
            style={{ color: '#F5F2ED' }}
          >
            {exploreLabel}
          </span>
        )}
      </div>
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="group block">
        {inner}
      </Link>
    )
  }

  return <div className="group">{inner}</div>
}
