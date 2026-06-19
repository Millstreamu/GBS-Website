'use client'

import { useRef } from 'react'
import CollectionCard from './CollectionCard'
import type { CollectionStatus } from '@/tokens'

type CarouselItem = {
  id: string
  slug?: string
  name: string
  description: string
  status: CollectionStatus
  productTypes?: string
}

type Props = {
  items: CarouselItem[]
  variant?: 'light' | 'dark'
}

export default function CollectionCarousel({ items, variant = 'dark' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)

  // Three or fewer fits comfortably as a static grid — no need for a carousel.
  if (items.length <= 3) {
    return (
      <div className="grid grid-cols-3 gap-10">
        {items.map(item => (
          <CollectionCard
            key={item.id}
            href={item.slug ? `/collections/${item.slug}` : undefined}
            name={item.name}
            description={item.description}
            status={item.status}
            productTypes={item.productTypes}
            variant={variant}
          />
        ))}
      </div>
    )
  }

  function scroll(direction: 'left' | 'right') {
    const track = trackRef.current
    if (!track) return
    const cardWidth = track.firstElementChild?.clientWidth ?? 320
    track.scrollBy({ left: direction === 'left' ? -(cardWidth + 40) : cardWidth + 40, behavior: 'smooth' })
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-10 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map(item => (
          <div key={item.id} className="snap-start flex-shrink-0 w-[320px]">
            <CollectionCard
              href={item.slug ? `/collections/${item.slug}` : undefined}
              name={item.name}
              description={item.description}
              status={item.status}
              productTypes={item.productTypes}
              variant={variant}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-3 mt-8">
        <button
          type="button"
          aria-label="Scroll collections left"
          onClick={() => scroll('left')}
          className="w-10 h-10 flex items-center justify-center border rounded-full hover:opacity-70 transition-opacity"
          style={{ borderColor: '#3A3A36', color: variant === 'dark' ? '#F5F2ED' : 'var(--fg)' }}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Scroll collections right"
          onClick={() => scroll('right')}
          className="w-10 h-10 flex items-center justify-center border rounded-full hover:opacity-70 transition-opacity"
          style={{ borderColor: '#3A3A36', color: variant === 'dark' ? '#F5F2ED' : 'var(--fg)' }}
        >
          →
        </button>
      </div>
    </div>
  )
}
