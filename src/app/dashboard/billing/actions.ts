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

    // Fetch the user's servers to get a subscription ID
    const { data: servers } = await supabase
      .from('servers')
      .select('stripe_subscription_id')
      .eq('user_id', user.id)
      .not('stripe_subscription_id', 'is', null)
      .limit(1);

    if (!servers || servers.length === 0) {
      return { error: 'No billing history found. Please make sure you used the same email during checkout.' };
    }

    const subId = servers[0].stripe_subscription_id;
    
    // Retrieve the subscription from Stripe to get the customer ID
    const subscription = await stripe.subscriptions.retrieve(subId);
    const customerId = subscription.customer as string;

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
