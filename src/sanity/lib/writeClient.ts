import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Server-only client with write access, used to record completed Stripe
// orders. Needs SANITY_API_TOKEN (a write-scoped token) — never expose this
// token to the browser.
export const writeClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})
