import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { writeClient } from '@/sanity/lib/writeClient'

// Records completed orders as "order" documents in Sanity.

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

    let items: { name: string; slug: string; price: number; quantity: number }[] = []
    try {
      items = session.metadata?.items ? JSON.parse(session.metadata.items) : []
    } catch {
      console.error('Could not parse order items from session metadata.')
    }

    try {
      await writeClient.create({
        _type: 'order',
        stripeSessionId: session.id,
        customerEmail: session.customer_details?.email ?? undefined,
        amountTotal: session.amount_total ?? undefined,
        currency: session.currency ?? undefined,
        items,
        status: 'paid',
        createdAt: new Date().toISOString(),
      })
      console.log('✅ Order recorded in Sanity:', session.id)
    } catch (err) {
      // Don't fail the webhook over a Sanity write error — log it loudly so
      // it can be investigated, but still acknowledge receipt to Stripe.
      console.error('Failed to write order to Sanity:', err)
    }
  }

  return NextResponse.json({ received: true })
}
