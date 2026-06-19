import Link from 'next/link'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

export default function CheckoutCancelPage() {
  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      <section className="max-w-2xl mx-auto px-8 py-24 text-center">
        <h1 className="font-serif text-5xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
          Checkout Cancelled
        </h1>
        <p className="text-base leading-relaxed mb-10" style={{ color: 'var(--muted)' }}>
          No charge was made. Your cart is still saved if you'd like to pick up where you left
          off.
        </p>
        <Link
          href="/cart"
          className="inline-block text-xs tracking-widest uppercase px-6 py-3 hover:opacity-85 transition-opacity"
          style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
        >
          Back to Cart
        </Link>
      </section>

      <Footer />
    </div>
  )
}
