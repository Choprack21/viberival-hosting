'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) setEmail(user.email ?? null);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#0A0D14] flex text-white font-sans">
      
      {/* Sidebar */}
      <aside className="w-64 bg-[#10141F] border-r border-[#1E2538] hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-[#1E2538]">
          <Link href="/" className="text-xl font-bold">
            843 <span className="text-blue-500">Hosting</span>
          </Link>
        </div>
        
        <div className="p-4 flex-1">
          <div className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-4 mt-2 px-3">
            Dashboard
          </div>
          <nav className="flex flex-col gap-1">
            <Link href="/dashboard" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${pathname === '/dashboard' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#1E2538]/50'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
              My Servers
            </Link>
            <Link href="/dashboard/billing" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${pathname === '/dashboard/billing' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#1E2538]/50'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
              Billing
            </Link>
            <Link href="/dashboard/support" className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors font-medium ${pathname === '/dashboard/support' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-[#1E2538]/50'}`}>
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              Support Ticket
            </Link>
          </nav>
        </div>
        
        <div className="p-4 border-t border-[#1E2538] flex justify-between items-center">
          <div className="flex items-center gap-3 px-3 py-2 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center font-bold flex-shrink-0">
              {email ? email[0].toUpperCase() : 'U'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium truncate">User Account</span>
              <span className="text-[10px] text-gray-500 truncate">{email || 'Loading...'}</span>
            </div>
          </div>
          <button 
            onClick={() => window.location.href = '/login'}
            className="text-xs text-gray-500 hover:text-red-400 transition-colors mr-2"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        {/* Top Header */}
        <header className="h-16 border-b border-[#1E2538] bg-[#0A0D14]/80 backdrop-blur-md flex items-center justify-between px-8 z-10 sticky top-0">
          <h1 className="text-xl font-bold">Dashboard</h1>
          <div className="flex gap-4">
            <Link href="/" className="bg-blue-600 hover:bg-blue-500 text-sm font-bold px-4 py-2 rounded-lg transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]">
              + Deploy Server
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-8 relative">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none" />
          
          <div className="max-w-5xl mx-auto relative z-10">
            {children}
          </div>
        </main>
      </div>

    </div>
  );
}
