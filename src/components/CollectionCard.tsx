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
}

export default function CollectionCard({
  href,
  name,
  description,
  status,
  badgeLabel,
  productTypes,
  variant = 'light',
}: Props) {
  const dark = variant === 'dark'

  const content = (
    <>
      <div
        className={`aspect-[4/5] mb-5 relative overflow-hidden ${dark ? 'img-placeholder-dark' : 'img-placeholder'}`}
      >
        <Badge status={status} label={badgeLabel} className="absolute top-4 left-4" />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
      </div>
      <p
        className="font-serif text-2xl mb-2"
        style={{ color: dark ? '#F5F2ED' : 'var(--fg)' }}
      >
        {name}
      </p>
      <p
        className="text-sm leading-relaxed mb-3"
        style={{ color: dark ? '#9A9590' : 'var(--muted)' }}
      >
        {description}
      </p>
      {productTypes && (
        <p
          className="text-xs tracking-wide mb-4"
          style={{ color: dark ? '#6B6560' : 'var(--muted-2)' }}
        >
          {productTypes}
        </p>
      )}
      {href && (
        <span
          className="text-xs tracking-widest uppercase group-hover:opacity-60 transition-opacity"
          style={{ color: dark ? '#F5F2ED' : 'var(--fg)' }}
        >
          Explore Collection →
        </span>
      )}
    </>
  )

  if (href) {
    return (
      <Link href={href} className="group block">
        {content}
      </Link>
    )
  }

  return <div className="group">{content}</div>
}
