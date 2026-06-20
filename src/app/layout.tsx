import type { Metadata } from 'next'
import { JetBrains_Mono, Courier_Prime } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

// JetBrains Mono — squarish monospace, closer to Asimov's geometric feel
// than Space Grotesk, used for headings and body copy site-wide.
const headingFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const bodyFont = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
  display: 'swap',
})

// Courier Prime — used specifically for product names, per request.
const productFont = Courier_Prime({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-product',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Good Boy Supply',
  description: 'Thoughtful goods, made with purpose.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable} ${productFont.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
