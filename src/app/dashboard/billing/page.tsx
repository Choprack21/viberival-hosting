'use client';

export default function DashboardBilling() {
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
            
            <div className="bg-[#0C1018] rounded-lg p-5 border border-[#1E2538] flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <h4 className="font-bold text-white">16GB Game VPS</h4>
                  <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded uppercase">Active</span>
                </div>
                <p className="text-xs text-gray-500">Renews on July 14, 2026</p>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="text-lg font-bold text-white">$29.99</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wider">Per Month</div>
                </div>
                <button 
                  onClick={() => alert("This will open the Stripe Customer Portal to cancel or upgrade your plan.")}
                  className="bg-[#1E2538] hover:bg-[#2A344B] text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors border border-[#2A344B]"
                >
                  Manage
                </button>
              </div>
            </div>
          </div>

          {/* Payment History */}
          <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Payment History</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-[#1E2538]">
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Description</th>
                    <th className="pb-3 font-medium">Amount</th>
                    <th className="pb-3 font-medium text-right">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-[#1E2538]/50">
                    <td className="py-4">Jun 14, 2026</td>
                    <td className="py-4 text-white">16GB Game VPS (Monthly)</td>
                    <td className="py-4">$29.99</td>
                    <td className="py-4 text-right">
                      <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs">Paid</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div className="space-y-6">
          <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-6 shadow-xl">
            <h3 className="text-lg font-bold text-white mb-4">Payment Method</h3>
            
            <div className="bg-[#0C1018] rounded-lg p-4 border border-[#1E2538] flex items-center gap-4 mb-4">
              <div className="w-12 h-8 bg-white rounded border border-gray-300 flex items-center justify-center">
                <span className="text-blue-600 font-black italic text-xs">VISA</span>
              </div>
              <div className="flex-1">
                <div className="text-sm font-bold text-white">•••• 4242</div>
                <div className="text-xs text-gray-500">Expires 12/28</div>
              </div>
            </div>

            <button 
              onClick={() => alert("This will open Stripe Elements to securely update your credit card on file.")}
              className="w-full bg-[#1E2538] hover:bg-[#2A344B] text-white text-sm font-semibold py-2.5 rounded-lg transition-colors border border-[#2A344B]"
            >
              Update Payment Method
            </button>
          </div>

          {/* Stripe Integration Notice */}
          <div className="bg-indigo-900/20 border border-indigo-500/30 rounded-xl p-6 shadow-xl">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-indigo-400">🔒</span>
              <h3 className="text-sm font-bold text-indigo-300">Secure Payments</h3>
            </div>
            <p className="text-xs text-indigo-200/70 leading-relaxed mb-4">
              Your billing information is securely processed by Stripe. We do not store your credit card details on our servers.
            </p>
            <button 
              onClick={() => alert("This will redirect you to the official Stripe Customer Portal where users manage their own invoices.")}
              className="w-full bg-[#635BFF] hover:bg-[#5249EC] text-white text-sm font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              Open Stripe Customer Portal
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
