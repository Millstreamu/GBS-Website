import Link from 'next/link'
import { formatPrice, type Product } from '@/tokens'

type Props = {
  product: Product
  collectionSlug: string
  categorySlug: string
}

export default function ProductCard({ product, collectionSlug, categorySlug }: Props) {
  return (
    <Link
      href={`/collections/${collectionSlug}/${categorySlug}/${product.slug}`}
      className="group block"
    >
      <div className="aspect-[4/3] mb-4 overflow-hidden img-placeholder relative">
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>

      <p className="text-xs mb-2" style={{ color: 'var(--muted-2)' }}>
        {product.tag}
      </p>
      <div className="flex items-baseline justify-between mb-2 gap-3">
        <p className="font-product text-lg" style={{ color: 'var(--fg)' }}>
          {product.name}
        </p>
        <p className="text-sm flex-shrink-0" style={{ color: 'var(--muted)' }}>
          {formatPrice(product.price)}
        </p>
      </div>
      <p className="text-sm leading-relaxed mb-3" style={{ color: 'var(--muted)' }}>
        {product.shortDesc}
      </p>
      <span
        className="text-xs tracking-widest uppercase group-hover:opacity-50 transition-opacity"
        style={{ color: 'var(--accent)' }}
      >
        Shop Now →
      </span>
    </Link>
  )
}
