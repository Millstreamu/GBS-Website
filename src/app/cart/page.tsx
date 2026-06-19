'use client'

import { useState } from 'react'
import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { useCart } from '@/lib/cart-context'
import { formatPrice } from '@/tokens'

export default function CartPage() {
  const { items, updateQuantity, removeItem, subtotal } = useCart()
  const [checkingOut, setCheckingOut] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleCheckout() {
    setError(null)
    setCheckingOut(true)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? 'Checkout is not available yet.')
        return
      }
      if (data.url) window.location.href = data.url
    } catch {
      setError('Something went wrong starting checkout. Please try again.')
    } finally {
      setCheckingOut(false)
    }
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <section className="max-w-4xl mx-auto px-8 py-16">
        <h1 className="font-serif text-5xl leading-tight mb-10" style={{ color: 'var(--fg)' }}>
          Your Cart
        </h1>

        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-base mb-6" style={{ color: 'var(--muted)' }}>
              Your cart is empty.
            </p>
            <Link
              href="/collections"
              className="inline-block text-xs tracking-widest uppercase px-6 py-3 hover:opacity-85 transition-opacity"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              Shop Collections
            </Link>
          </div>
        ) : (
          <>
            <div className="flex flex-col">
              {items.map(item => (
                <div
                  key={item.slug}
                  className="flex items-center gap-6 py-6 border-b"
                  style={{ borderColor: 'var(--border)' }}
                >
                  <div className="w-24 h-24 img-placeholder flex-shrink-0" />

                  <div className="flex-1">
                    <Link
                      href={`/collections/${item.collectionSlug}/${item.categorySlug}/${item.slug}`}
                      className="font-serif text-lg hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--fg)' }}
                    >
                      {item.name}
                    </Link>
                    <p className="text-sm mt-1" style={{ color: 'var(--muted)' }}>
                      {formatPrice(item.price)} each
                    </p>
                  </div>

                  <div className="flex items-center border" style={{ borderColor: 'var(--border)' }}>
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                      className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--fg)' }}
                    >
                      −
                    </button>
                    <span className="w-10 text-center text-sm" style={{ color: 'var(--fg)' }}>
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                      className="w-9 h-9 flex items-center justify-center hover:opacity-60 transition-opacity"
                      style={{ color: 'var(--fg)' }}
                    >
                      +
                    </button>
                  </div>

                  <p className="w-20 text-right text-sm" style={{ color: 'var(--fg)' }}>
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    type="button"
                    onClick={() => removeItem(item.slug)}
                    aria-label={`Remove ${item.name}`}
                    className="text-xs tracking-widest uppercase hover:opacity-60 transition-opacity"
                    style={{ color: 'var(--muted-2)' }}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-between pt-8 mb-2">
              <span className="text-sm" style={{ color: 'var(--muted)' }}>Subtotal</span>
              <span className="font-serif text-2xl" style={{ color: 'var(--fg)' }}>
                {formatPrice(subtotal)}
              </span>
            </div>
            <p className="text-xs mb-6" style={{ color: 'var(--muted-2)' }}>
              Shipping and tax calculated at checkout.
            </p>

            {error && (
              <p className="text-sm mb-4" style={{ color: '#A0732A' }}>
                {error}
              </p>
            )}

            <button
              type="button"
              onClick={handleCheckout}
              disabled={checkingOut}
              className="w-full py-4 text-xs tracking-widest uppercase hover:opacity-85 transition-opacity disabled:opacity-50"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              {checkingOut ? 'Redirecting…' : 'Checkout'}
            </button>
          </>
        )}
      </section>

      <Footer />
    </div>
  )
}
