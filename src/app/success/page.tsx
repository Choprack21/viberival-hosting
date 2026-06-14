import Link from 'next/link';

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center p-4 text-center">
      <div className="bg-[#10141F] border border-green-500/30 rounded-xl p-12 max-w-lg w-full shadow-[0_0_50px_rgba(34,197,94,0.1)] relative overflow-hidden">
        
        {/* Success Icon */}
        <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-10 h-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="text-3xl font-bold text-white mb-4">Payment Successful!</h1>
        <p className="text-gray-400 mb-8">
          Your 16GB VibeRival VPS is currently being provisioned. We've sent the Pterodactyl Panel login credentials to your email.
        </p>

        <div className="flex flex-col gap-4">
          <Link href="/" className="bg-[#1E2538] hover:bg-[#2A344B] text-white font-medium py-3 px-6 rounded-lg transition-colors border border-[#2A344B]">
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
