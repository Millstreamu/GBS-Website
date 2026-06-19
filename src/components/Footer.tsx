import Link from 'next/link'
import { site } from '@/tokens'

const footerLinkMap: Record<string, string> = {
  Collections: '/collections',
  Archive: '/archive',
  'Our Story': '/about',
  'Materials & Care': '/about',
  Contact: '/contact',
  'Shipping & Returns': '/contact',
  FAQs: '/contact',
}

export default function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--footer-bg)', color: 'var(--footer-fg)' }}>
      <div className="max-w-6xl mx-auto px-8 py-16">
        <div className="grid grid-cols-5 gap-12">

          {/* Brand */}
          <div className="col-span-2">
            <p className="font-serif text-xl text-white mb-3">{site.name}</p>
            <p className="text-sm leading-relaxed mb-6 max-w-xs" style={{ opacity: 0.5 }}>
              {site.tagline}
            </p>
            <div className="flex gap-4 text-xs" style={{ opacity: 0.35 }}>
              <span className="cursor-pointer hover:opacity-100 transition-opacity">Instagram</span>
              <span className="cursor-pointer hover:opacity-100 transition-opacity">Pinterest</span>
            </div>
          </div>

          {/* Shop */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5" style={{ opacity: 0.35 }}>Shop</p>
            <ul className="space-y-3 text-sm">
              {site.footer.shop.map(label => (
                <li key={label}>
                  <Link href={footerLinkMap[label] ?? '/'} className="hover:text-white transition-colors" style={{ opacity: 0.55 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5" style={{ opacity: 0.35 }}>About</p>
            <ul className="space-y-3 text-sm">
              {site.footer.about.map(label => (
                <li key={label}>
                  <Link href={footerLinkMap[label] ?? '/about'} className="hover:text-white transition-colors" style={{ opacity: 0.55 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs tracking-widest uppercase mb-5" style={{ opacity: 0.35 }}>Support</p>
            <ul className="space-y-3 text-sm">
              {site.footer.support.map(label => (
                <li key={label}>
                  <Link href={footerLinkMap[label] ?? '/contact'} className="hover:text-white transition-colors" style={{ opacity: 0.55 }}>
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between mt-16 pt-8 text-xs"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)', opacity: 0.35 }}
        >
          <p>© {new Date().getFullYear()} Good Boy Supply. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:opacity-100 transition-opacity">Privacy Policy</a>
            <a href="#" className="hover:opacity-100 transition-opacity">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
