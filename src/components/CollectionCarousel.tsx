'use client'

import { useRef, useState } from 'react'
import CollectionCard from './CollectionCard'
import type { CollectionStatus } from '@/tokens'

type CarouselItem = {
  id: string
  slug?: string
  name: string
  description: string
  status: CollectionStatus
  productTypes?: string
  imageUrl?: string
}

type Props = {
  items: CarouselItem[]
  variant?: 'light' | 'dark'
}

export default function CollectionCarousel({ items, variant = 'dark' }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)

  // Four or fewer fits comfortably as a static grid — no need for a carousel.
  if (items.length <= 4) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map(item => (
          <CollectionCard
            key={item.id}
            href={item.slug ? `/collections/${item.slug}` : undefined}
            name={item.name}
            description={item.description}
            status={item.status}
            productTypes={item.productTypes}
            variant={variant}
            imageUrl={item.imageUrl}
          />
        ))}
      </div>
    )
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current
    if (!track) return
    const card = track.children[index] as HTMLElement | undefined
    if (!card) return
    track.scrollTo({ left: card.offsetLeft - (track.offsetWidth - card.clientWidth) / 2, behavior: 'smooth' })
    setActive(index)
  }

  function scroll(direction: 'left' | 'right') {
    const next = direction === 'left' ? Math.max(active - 1, 0) : Math.min(active + 1, items.length - 1)
    scrollToIndex(next)
  }

  return (
    <div className="relative">
      <div
        ref={trackRef}
        className="flex gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none' }}
      >
        {items.map(item => (
          <div key={item.id} className="snap-start flex-shrink-0 w-[280px]">
            <CollectionCard
              href={item.slug ? `/collections/${item.slug}` : undefined}
              name={item.name}
              description={item.description}
              status={item.status}
              productTypes={item.productTypes}
              variant={variant}
              imageUrl={item.imageUrl}
            />
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-8">
        <div className="flex gap-2">
          {items.map((item, i) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Go to collection ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className="w-2 h-2 rounded-full transition-opacity"
              style={{
                backgroundColor: variant === 'dark' ? '#F5F2ED' : 'var(--fg)',
                opacity: i === active ? 1 : 0.25,
              }}
            />
          ))}
        </div>

        <div className="flex gap-3">
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
    </div>
  )
}
