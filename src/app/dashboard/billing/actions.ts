'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

export async function openCustomerPortal() {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user || !user.email) {
      return { error: 'Not authenticated' };
    }

    // Find the Stripe customer by email
    const customers = await stripe.customers.search({
      query: `email:'${user.email}'`,
      limit: 1,
    });

    if (customers.data.length === 0) {
      // If they haven't bought anything yet, they won't have a Stripe customer record
      return { error: 'No billing history found for your email. Please make sure you used the same email during checkout.' };
    }

    const customerId = customers.data[0].id;

    // Create a Stripe Customer Portal session
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `https://viberival-hosting.vercel.app/dashboard/billing`,
    });

    return { url: session.url };
  } catch (err: any) {
    console.error(err);
    // This catches Stripe errors like "portal not configured"
    return { error: err.message || 'An unknown error occurred with Stripe.' };
  }
}
