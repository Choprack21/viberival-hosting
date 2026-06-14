'use server';

import { redirect } from 'next/navigation';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

export async function openCustomerPortal() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !user.email) {
    throw new Error('Not authenticated');
  }

  // Find the Stripe customer by email
  const customers = await stripe.customers.search({
    query: `email:'${user.email}'`,
    limit: 1,
  });

  if (customers.data.length === 0) {
    // If they haven't bought anything yet, they won't have a Stripe customer record
    throw new Error('No billing history found. Please purchase a server first.');
  }

  const customerId = customers.data[0].id;

  // Create a Stripe Customer Portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/dashboard/billing`,
  });

  redirect(session.url);
}
