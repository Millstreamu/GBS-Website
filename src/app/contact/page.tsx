'use client'

import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { site } from '@/tokens'

export default function ContactPage() {
  const { contact } = site

  return (
    <div style={{ backgroundColor: 'var(--bg)' }}>
      <Nav />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-10 grid grid-cols-2 gap-16 items-end border-b" style={{ borderColor: 'var(--border)' }}>
        <div>
          <h1 className="font-serif text-6xl leading-tight mb-6" style={{ color: 'var(--fg)' }}>
            {contact.headline}
          </h1>
          <p className="text-base leading-relaxed max-w-md" style={{ color: 'var(--muted)' }}>
            {contact.subheadline}
          </p>
        </div>
        <div className="aspect-[4/3] img-placeholder" />
      </section>

      {/* Form + contact details */}
      <section className="max-w-6xl mx-auto px-8 py-20 grid grid-cols-2 gap-20">

        {/* Form */}
        <div>
          <h2 className="font-serif text-2xl mb-8" style={{ color: 'var(--fg)' }}>Send us a message</h2>
          <form
            className="flex flex-col gap-5"
            onSubmit={e => {
              e.preventDefault()
              console.log('Contact form submitted')
            }}
          >
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none focus:border-current transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>
                Email
              </label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none focus:border-current transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>
                Subject
              </label>
              <select
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none focus:border-current transition-colors"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              >
                {contact.channels.map(c => (
                  <option key={c.title} value={c.title}>{c.title}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs tracking-widest uppercase mb-2" style={{ color: 'var(--muted-2)' }}>
                Message
              </label>
              <textarea
                rows={5}
                placeholder="Tell us what you need."
                className="w-full px-4 py-3 text-sm border bg-transparent outline-none focus:border-current transition-colors resize-none"
                style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
              />
            </div>
            <button
              type="submit"
              className="self-start text-xs tracking-widest uppercase px-6 py-3 hover:opacity-80 transition-opacity"
              style={{ backgroundColor: 'var(--accent)', color: 'var(--accent-text)' }}
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact details */}
        <div>
          <h2 className="font-serif text-2xl mb-8" style={{ color: 'var(--fg)' }}>Get in touch</h2>
          <div className="flex flex-col gap-8">
            {contact.channels.map(({ title, desc, email }) => (
              <div key={title} className="pb-8 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <p className="font-serif text-lg mb-1" style={{ color: 'var(--fg)' }}>{title}</p>
                <p className="text-sm mb-1" style={{ color: 'var(--fg)' }}>{email}</p>
                <p className="text-xs" style={{ color: 'var(--muted)' }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ teaser */}
      <section className="border-t py-16" style={{ borderColor: 'var(--border)' }}>
        <div className="max-w-6xl mx-auto px-8 flex items-start justify-between gap-16">
          <div className="shrink-0">
            <h2 className="font-serif text-2xl mb-6" style={{ color: 'var(--fg)' }}>Frequently asked questions</h2>
            <button
              className="text-xs tracking-widest uppercase px-6 py-3 border hover:opacity-70 transition-opacity"
              style={{ borderColor: 'var(--border)', color: 'var(--fg)' }}
            >
              View All FAQs
            </button>
          </div>
          <div className="flex-1 grid grid-cols-1 gap-6">
            {contact.faqs.map(({ q, a }) => (
              <div key={q} className="pb-6 border-b last:border-0" style={{ borderColor: 'var(--border)' }}>
                <p className="font-serif text-base mb-2" style={{ color: 'var(--fg)' }}>{q}</p>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
