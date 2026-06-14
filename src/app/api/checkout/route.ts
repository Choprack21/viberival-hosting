import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2026-05-27.dahlia',
});

export async function POST(req: Request) {
  try {
    const { planId, price, name, userId, userEmail } = await req.json();

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: userEmail || undefined,
      metadata: {
        userId: userId,
        planId: planId,
        planName: name,
      },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `VibeRival Game VPS - ${name}`,
              description: 'High-performance dedicated gaming server',
              images: ['https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Server-multiple.svg/1024px-Server-multiple.svg.png'],
            },
            unit_amount: Math.round(price * 100), // Stripe expects cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/`,
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
