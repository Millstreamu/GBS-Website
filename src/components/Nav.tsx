'use client'

import Link from 'next/link'
import { useCart } from '@/lib/cart-context'

export default function Nav() {
  const { itemCount } = useCart()

  return (
    <nav
      className="w-full flex items-center justify-between px-8 py-4 border-b sticky top-0 z-50"
      style={{ backgroundColor: 'var(--bg)', borderColor: 'var(--border)' }}
    >
      {/* Logo */}
      <Link
        href="/"
        className="font-serif text-xl tracking-tight"
        style={{ color: 'var(--fg)' }}
      >
        Good Boy Supply
      </Link>

      {/* Links */}
      <div className="flex items-center gap-8 text-sm" style={{ color: 'var(--muted)' }}>
        <Link href="/#collections" className="hover:opacity-60 transition-opacity">Collections</Link>
        <Link href="/archive" className="hover:opacity-60 transition-opacity">Shop All</Link>
        <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
        <Link href="/contact" className="hover:opacity-60 transition-opacity">Contact</Link>
        <Link href="/cart" className="hover:opacity-60 transition-opacity">Cart ({itemCount})</Link>
      </div>

      {/* CTA */}
      <Link
        href="/collections"
        className="text-xs tracking-widest uppercase px-5 py-2.5 rounded-full hover:opacity-80 transition-opacity"
        style={{ backgroundColor: 'var(--fg)', color: '#FFFFFF' }}
      >
        Shop All
      </Link>
    </nav>
  )
}
