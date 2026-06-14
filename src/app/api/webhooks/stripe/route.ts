import { headers } from 'next/headers'
import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabaseAdmin } from '@/utils/supabase/admin'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia', // using a recent valid API version
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: Request) {
  try {
    const body = await req.text()
    const signature = (await headers()).get('stripe-signature') as string

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
      console.error(`Webhook Error: ${err.message}`)
      return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 })
    }

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      // Retrieve the user_id and plan details we passed in the metadata
      const userId = session.metadata?.userId
      const planId = session.metadata?.planId
      const planName = session.metadata?.planName

      if (userId && planId && planName) {
        // Insert the new server into the database
        const { error } = await supabaseAdmin
          .from('servers')
          .insert({
            user_id: userId,
            stripe_subscription_id: session.subscription as string,
            name: `${planName} Server`,
            plan: planName,
            status: 'deploying',
            ip: 'Pending Allocation', // Will be updated when Pterodactyl provisions it
            cpu_usage: '0%',
            ram_usage: '0GB',
            uptime: '0m',
          })

        if (error) {
          console.error('Error inserting server into Supabase:', error)
          return NextResponse.json({ error: 'Database error' }, { status: 500 })
        }
        
        console.log(`Successfully provisioned ${planName} for user ${userId}`)
      }
    }

    return NextResponse.json({ received: true })
  } catch (err: any) {
    console.error('Unhandled webhook error:', err)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}
