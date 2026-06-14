'use client';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

function ServerCard({ server }: { server: any }) {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div className="bg-[#10141F] border border-yellow-500/30 rounded-xl p-6 shadow-xl relative overflow-hidden group">
      
      {/* Status Indicator */}
      <div className="absolute top-6 right-6 flex items-center gap-2">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500"></span>
        </span>
        <span className="text-xs font-bold uppercase tracking-wider text-yellow-500">
          Provisioning (48H Queue)
        </span>
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-6 border-b border-[#1E2538] pb-6 mb-6">
        <div className="w-16 h-16 rounded-xl bg-blue-900/30 border border-blue-500/30 flex items-center justify-center text-blue-400">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
          </svg>
        </div>
        
        <div>
          <h3 className="text-xl font-bold text-white mb-1">{server.name}</h3>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-blue-400 font-semibold bg-blue-900/20 px-2 py-1 rounded">{server.plan}</span>
            <span className="text-gray-400 font-mono">Assigning IP...</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6 opacity-50">
        <div className="bg-[#0C1018] rounded-lg p-4 border border-[#1E2538]">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">CPU Usage</div>
          <div className="text-lg font-bold text-white">---</div>
        </div>
        <div className="bg-[#0C1018] rounded-lg p-4 border border-[#1E2538]">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">RAM Usage</div>
          <div className="text-lg font-bold text-white">---</div>
        </div>
        <div className="bg-[#0C1018] rounded-lg p-4 border border-[#1E2538]">
          <div className="text-gray-500 text-[10px] uppercase tracking-widest mb-1">Uptime</div>
          <div className="text-lg font-bold text-white">Queued</div>
        </div>
      </div>

      <div className="bg-yellow-500/10 p-4 rounded-lg border border-yellow-500/30 mb-6">
        <p className="text-sm text-yellow-200/80">
          <strong className="text-yellow-400">High Demand Alert:</strong> Your server is currently in the deployment queue. You will receive an email with your Pterodactyl login and server IP address within 48 hours. Thank you for your patience!
        </p>
      </div>

      <div className="flex gap-4">
        <button 
          disabled
          className="flex-1 bg-[#635BFF]/50 text-white/50 font-bold py-3 rounded-lg flex items-center justify-center gap-2 cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Open Panel
        </button>
        <button 
          disabled
          className="bg-[#1E2538] text-white/50 font-semibold px-6 py-3 rounded-lg border border-[#2A344B] cursor-not-allowed"
        >
          Restart
        </button>
        <button 
          disabled
          className="bg-[#1E2538] text-white/50 font-semibold px-6 py-3 rounded-lg border border-[#2A344B] cursor-not-allowed"
        >
          Settings
        </button>
      </div>

    </div>
  );
}

export default function DashboardHome() {
  const [servers, setServers] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  if (isLoading) {
    return <div className="text-white animate-pulse">Loading servers...</div>;
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">My Servers</h2>
        <p className="text-gray-400 text-sm">Manage your active Game VPS instances and access the Pterodactyl control panel.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        
        {servers.length === 0 && (
          <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-12 text-center flex flex-col items-center justify-center">
            <div className="w-20 h-20 bg-blue-900/20 rounded-full flex items-center justify-center mb-6">
              <svg className="w-10 h-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No active servers</h3>
            <p className="text-gray-400 text-sm max-w-md mb-8">You don't have any active Game VPS instances running right now. Deploy your first server to get started.</p>
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
            >
              Deploy a New Server
            </button>
          </div>
        )}

        {servers.map((server) => (
          <ServerCard key={server.id} server={server} />
        ))}

        {/* Deploy New Server Placeholder (Only show if they already have servers) */}
        {servers.length > 0 && (
          <div 
            onClick={() => window.location.href = '/'}
            className="border-2 border-dashed border-[#1E2538] hover:border-blue-500/50 rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-colors group bg-[#0A0D14]/50"
          >
            <div className="w-16 h-16 rounded-full bg-[#1E2538] flex items-center justify-center mb-4 group-hover:bg-blue-600/20 group-hover:text-blue-400 transition-colors text-gray-500">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Deploy Another Server</h3>
            <p className="text-gray-500 text-sm max-w-sm">Need more capacity? Spin up a new Game VPS in under 60 seconds.</p>
          </div>
        )}

      </div>
    </div>
  );
}
