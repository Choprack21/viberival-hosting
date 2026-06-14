'use client';
import React, { useState, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { loadStripe } from '@stripe/stripe-js';

// Load Stripe outside of component to avoid recreating it
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function CheckoutContent() {
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  // Read from URL, fallback to 16GB default if directly accessed
  const planId = searchParams.get('id') || '16gb';
  const planName = searchParams.get('name') || 'Game VPS 16GB';
  const planPrice = parseFloat(searchParams.get('price') || '29.99');

  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [isCheckingUser, setIsCheckingUser] = useState(true);

  React.useEffect(() => {
    const fetchUser = async () => {
      const { createClient } = await import('@/utils/supabase/client');
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setUserId(user.id);
        setUserEmail(user.email || null);
      }
      setIsCheckingUser(false);
    };
    fetchUser();
  }, []);

  const handleCheckout = async () => {
    if (!userId) {
      alert("Please log in to purchase a server.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          planId: planId,
          price: planPrice,
          name: planName,
          userId: userId,
          userEmail: userEmail,
        }),
      });

      const { sessionId, url } = await response.json();
      
      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Error in checkout:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-8 max-w-md w-full shadow-2xl relative overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/10 rounded-full blur-[80px] pointer-events-none" />

      <div className="flex justify-between items-center mb-8 border-b border-[#1E2538] pb-4">
        <h1 className="text-2xl font-bold text-white">Order Summary</h1>
        <Link href="/" className="text-gray-500 hover:text-white transition-colors text-sm">
          Cancel
        </Link>
      </div>

      <div className="bg-[#0C1018] rounded-lg p-4 border border-[#1E2538] mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-white font-medium">VibeRival Game VPS</span>
          <span className="text-white font-bold">${planPrice.toFixed(2)}</span>
        </div>
        <div className="text-xs text-blue-400 mb-4">{planName}</div>
        
        <div className="flex justify-between items-center text-xs text-gray-400 border-t border-[#1E2538] pt-3">
          <span>Monthly Subscription</span>
          <span>Due today</span>
        </div>
      </div>

      {isCheckingUser ? (
        <button disabled className="w-full bg-[#3A3F58] text-white font-bold py-4 rounded-lg flex items-center justify-center gap-3">
          <span className="animate-pulse">Loading...</span>
        </button>
      ) : !userId ? (
        <button 
          onClick={() => window.location.href = `/login?redirect=${encodeURIComponent(window.location.href)}`}
          className="w-full bg-[#1E2538] hover:bg-[#2A344B] text-white font-bold py-4 rounded-lg border border-[#2A344B] transition-all flex items-center justify-center gap-3"
        >
          Log in to continue
        </button>
      ) : (
        <button 
          onClick={handleCheckout}
          disabled={isLoading}
          className="w-full bg-[#635BFF] hover:bg-[#5249EC] disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(99,91,255,0.4)] transition-all flex items-center justify-center gap-3"
        >
          {isLoading ? (
            <span className="animate-pulse">Connecting to Stripe...</span>
          ) : (
            <>
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M14.5 10.5C14.5 9.11929 13.3807 8 12 8C10.6193 8 9.5 9.11929 9.5 10.5C9.5 11.8807 10.6193 13 12 13C13.3807 13 14.5 14.1193 14.5 15.5C14.5 16.8807 13.3807 18 12 18C10.6193 18 9.5 16.8807 9.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M12 7V8M12 18V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Pay ${planPrice.toFixed(2)}
            </>
          )}
        </button>
      )}

      <p className="text-center text-[10px] text-gray-500 mt-4 flex items-center justify-center gap-1">
        🔒 Secure Checkout powered by Stripe
      </p>
    </div>
  );
}

export default function Checkout() {
  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center p-4">
      <Suspense fallback={<div className="text-white">Loading checkout...</div>}>
        <CheckoutContent />
      </Suspense>
    </div>
  );
}
