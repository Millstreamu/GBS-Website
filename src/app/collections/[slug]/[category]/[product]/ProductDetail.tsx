'use client'

import { useState } from 'react'
import Image from 'next/image'
import { formatPrice, type Product } from '@/tokens'
import { useCart } from '@/lib/cart-context'

type Props = {
  product: Product
  collectionName: string
  collectionSlug: string
  categorySlug: string
}

export default function ProductDetail({ product, collectionName, collectionSlug, categorySlug }: Props) {
  const [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)
  const { addItem } = useCart()

  function handleAddToCart() {
    addItem(
      {
        slug: product.slug,
        collectionSlug,
        categorySlug,
        name: product.name,
        price: product.price,
      },
      quantity
    )
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div className="grid grid-cols-2 gap-16 pb-16">
      {/* Gallery */}
      <div>
        <div className="aspect-[4/3] img-placeholder mb-4 relative overflow-hidden">
          {product.imageUrls?.[0] && (
            <Image
              src={product.imageUrls[0]}
              alt={product.name}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          )}
        </div>
        <div className="grid grid-cols-3 gap-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="aspect-square img-placeholder relative overflow-hidden">
              {product.imageUrls?.[i] && (
                <Image
                  src={product.imageUrls[i]}
                  alt={`${product.name} detail ${i}`}
                  fill
                  sizes="16vw"
                  className="object-cover"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div>
        <span
          className="inline-block text-xs tracking-widest uppercase px-3 py-1 rounded-full mb-5"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
        >
          {collectionName}
        </span>

        <div className="flex items-baseline justify-between gap-6 mb-4">
          <h1 className="font-product text-5xl leading-tight" style={{ color: 'var(--fg)' }}>
            {product.name}
          </h1>
          <p className="font-sans text-2xl font-medium whitespace-nowrap" style={{ color: 'var(--fg)' }}>
            {formatPrice(product.price)}
          </p>
        </div>

        <p className="text-base leading-relaxed mb-6" style={{ color: 'var(--muted)' }}>
          {product.shortDesc}
        </p>

        <div className="border-t mb-6" style={{ borderColor: 'var(--border)' }} />

        <ul className="flex flex-col gap-3 mb-6">
          {(product.features ?? [product.material]).slice(0, 4).map(f => (
            <li key={f} className="flex items-start gap-3 text-sm" style={{ color: 'var(--muted)' }}>
              <span
                className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                style={{ backgroundColor: 'var(--accent)' }}
              />
              {f}
            </li>
          ))}
        </ul>

        <div className="border-t mb-6" style={{ borderColor: 'var(--border)' }} />

        {/* Quantity selector */}
        <div className="flex items-center gap-4 mb-5">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--muted-2)' }}>
            Quantity
          </span>
          <div className="flex items-center border" style={{ borderColor: 'var(--border)' }}>
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQuantity(q => Math.max(1, q - 1))}
              className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
              style={{ color: 'var(--fg)' }}
            >
              −
            </button>
            <span className="w-10 text-center text-sm" style={{ color: 'var(--fg)' }}>{quantity}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQuantity(q => q + 1)}
              className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
              style={{ color: 'var(--fg)' }}
            >
              +
            </button>
          </div>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          className="w-full py-4 text-xs tracking-widest uppercase hover:opacity-85 transition-opacity mb-4"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
        >
          {added ? 'Added ✓' : 'Add to Cart'}
        </button>

        <p className="text-xs" style={{ color: 'var(--muted-2)' }}>
          Free shipping on orders over $150
        </p>
      </div>
    </div>
  )
}
