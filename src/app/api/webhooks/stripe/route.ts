import { NextResponse } from 'next/server'
import Stripe from 'stripe'

// Records completed orders. Until Sanity is connected, completed checkouts
// are just logged clearly to the server console — connect Sanity to persist
// them as real order records.

export async function POST(request: Request) {
  const secretKey = process.env.STRIPE_SECRET_KEY
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!secretKey || !webhookSecret) {
    return NextResponse.json(
      {
        error:
          'Webhook is not configured yet. Add STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET to .env.local.',
      },
      { status: 503 }
    )
  }

  const stripe = new Stripe(secretKey, { apiVersion: '2024-04-10' })

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header.' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid signature.' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session
    console.log('✅ Order completed:', {
      sessionId: session.id,
      amountTotal: session.amount_total,
      customerEmail: session.customer_details?.email,
    })
    // TODO: once Sanity is connected, write an order record here instead of
    // just logging it.
  }

  return NextResponse.json({ received: true })
}
