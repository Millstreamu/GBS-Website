import type { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
import { CartProvider } from '@/lib/cart-context'
import './globals.css'

// Space Grotesk is a squarish, geometric grotesque sans — closest Google
// Fonts match to the Asimov font referenced by the client, without the
// licensing/self-hosting overhead of a non-Google font file.
const headingFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  variable: '--font-serif',
  display: 'swap',
})

const bodyFont = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-sans',
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
    <html lang="en" className={`${headingFont.variable} ${bodyFont.variable}`}>
      <body className="font-sans antialiased">
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
