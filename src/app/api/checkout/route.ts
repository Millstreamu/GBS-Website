import { NextResponse } from 'next/server'
import Stripe from 'stripe'

interface CheckoutItem {
  slug: string
  name: string
  price: number
  quantity: number
}

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    return NextResponse.json(
      {
        error:
          'Checkout is not configured yet. Add STRIPE_SECRET_KEY to .env.local with your Stripe test secret key, then restart the dev server.',
      },
      { status: 503 }
    )
  }

  let body: { items?: CheckoutItem[] }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const items = body.items ?? []
  if (items.length === 0) {
    return NextResponse.json({ error: 'Your cart is empty.' }, { status: 400 })
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-04-10' })

  const origin = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'

  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: items.map(item => ({
        price_data: {
          currency: 'aud',
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      shipping_options: [
        {
          shipping_rate_data: {
            type: 'fixed_amount',
            fixed_amount: { amount: 1500, currency: 'aud' },
            display_name: 'Flat rate shipping',
          },
        },
      ],
      // automatic_tax: { enabled: true }, // enable once Stripe Tax is turned on in the dashboard
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout/cancel`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout session creation failed:', err)
    return NextResponse.json(
      { error: 'Could not start checkout. Please try again shortly.' },
      { status: 500 }
    )
  }
}
