'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/cart-context'

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <section className="max-w-2xl mx-auto px-8 py-24 text-center">
        <h1 className="font-serif text-5xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
          Order Confirmed
        </h1>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
          Thank you for your order. A confirmation email is on its way. We'll let you know as
          soon as it ships.
        </p>
        <Link
          href="/collections"
          className="inline-block text-xs tracking-widest uppercase px-6 py-3 hover:opacity-85 transition-opacity"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
        >
          Continue Shopping
        </Link>
      </section>

      <Footer />
    </div>
  )
}
