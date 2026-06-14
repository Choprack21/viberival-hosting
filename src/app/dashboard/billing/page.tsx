'use client';
import { useEffect, useState, useTransition } from 'react';
import { createClient } from '@/utils/supabase/client';
import { openCustomerPortal } from './actions';

export default function DashboardBilling() {
  const [servers, setServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    const fetchServers = async () => {
      const supabase = createClient();
      const { data, error } = await supabase.from('servers').select('*');
      if (data) {
        setServers(data);
      }
      setIsLoading(false);
    };
    fetchServers();
  }, []);

  const handleOpenPortal = () => {
    startTransition(async () => {
      try {
        const res = await openCustomerPortal();
        if (res.error) {
          alert(res.error);
        } else if (res.url) {
          window.location.href = res.url;
        }
      } catch (err: any) {
        alert(err.message);
      }
    });
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Billing & Subscriptions</h2>
        <p className="text-gray-400 text-sm">Manage your payment methods, view invoices, and upgrade your plans.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Active Subscriptions */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
              Active Subscriptions
            </h3>
            
            {isLoading ? (
              <div className="text-gray-500 animate-pulse">Loading subscriptions...</div>
            ) : servers.length === 0 ? (
              <div className="text-gray-500 text-sm">You do not have any active subscriptions.</div>
            ) : (
              <div className="space-y-4">
                {servers.map((server) => (
                  <div key={server.id} className="bg-[#0C1018] rounded-lg p-5 border border-[#1E2538] flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <h4 className="font-bold text-white">{server.name}</h4>
                        <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Active</span>
                      </div>
                      <p className="text-xs text-gray-500">Plan: {server.plan}</p>
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={handleOpenPortal}
                        disabled={isPending}
                        className="bg-[#1E2538] hover:bg-[#2A344B] disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors border border-[#2A344B]"
                      >
                        {isPending ? 'Loading...' : 'Manage'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment Method & Portal */}
        <div className="space-y-6">
          <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Billing Portal</h3>
            <p className="text-sm text-gray-400 mb-6">
              Update your payment methods, download past invoices, and manage your billing information securely through Stripe.
            </p>
            <button 
              onClick={handleOpenPortal}
              disabled={isPending}
              className="w-full bg-[#635BFF] hover:bg-[#5249EC] disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? 'Opening Stripe...' : 'Open Stripe Customer Portal'}
            </button>
          </div>

          {/* Stripe Integration Notice */}
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-400">🔒</span>
              <h3 className="text-sm font-bold text-indigo-300">Secure Payments</h3>
            </div>
            <p className="text-xs text-indigo-200/70 leading-relaxed">
              Your billing information is securely processed by Stripe. We do not store your credit card details on our servers.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
