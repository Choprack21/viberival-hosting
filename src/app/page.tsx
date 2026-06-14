'use client';
import React, { useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [selectedPlanIndex, setSelectedPlanIndex] = useState<number>(1); // Default to 16GB popular plan

  const plans = [
    { id: '12gb', ram: '12GB', players: 60, cpu: 4, storage: 150, price: 19.99 },
    { id: '16gb', ram: '16GB', players: 80, cpu: 6, storage: 180, price: 29.99, popular: true },
    { id: '24gb', ram: '24GB', players: 100, cpu: 8, storage: 240, price: 44.99 },
    { id: '32gb', ram: '32GB', players: 128, cpu: 8, storage: 320, price: 59.99, topTier: true },
  ];

  const selectedPlan = plans[selectedPlanIndex];

  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center py-20 relative overflow-hidden">
      
      {/* Header Navigation */}
      <header className="absolute top-0 w-full p-6 flex justify-between items-center z-50">
        <div className="text-xl font-bold text-white">
          843 <span className="text-blue-500">Hosting</span>
        </div>
        <Link 
          href="/login" 
          className="bg-[#1E2538] hover:bg-[#2A344B] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors border border-[#2A344B]"
        >
          Client Area
        </Link>
      </header>
      {/* Background Glow Effects */}
      <div className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[150px] pointer-events-none" />

      {/* Hero Section */}
      <div className="z-10 text-center max-w-3xl px-4 flex flex-col items-center">
        {/* Top Banner Tag */}
        <div className="border border-blue-500/30 bg-blue-900/20 text-blue-300 text-xs font-semibold px-4 py-1.5 rounded-full mb-8 flex items-center gap-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
          <span className="w-2 h-2 rounded-full bg-blue-400 shadow-[0_0_8px_#60A5FA]"></span>
          Summer Sale — 30% off FiveM Packs & VPS
        </div>

        <h1 className="text-5xl font-extrabold tracking-tight mb-4 text-white">
          843 <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 drop-shadow-[0_0_15px_rgba(59,130,246,0.5)]">Hosting</span>
        </h1>
        
        <p className="text-gray-400 text-sm md:text-base leading-relaxed mb-10 max-w-2xl mx-auto">
          High-performance VPS hosting built for game servers. Full control, no restrictions — run FiveM, Minecraft, Rust and more on a dedicated virtual machine.
        </p>

        <div className="flex gap-4 mb-12">
          <a href="#pricing" className="bg-blue-600 hover:bg-blue-500 transition-all text-white font-semibold py-3 px-8 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)]">
            Find My Plan
          </a>
          <a href="#pricing" className="bg-[#1A2035] hover:bg-[#2A3045] transition-all border border-[#2A3045] text-white font-semibold py-3 px-8 rounded-lg">
            See Specs
          </a>
        </div>

        {/* Feature Checks */}
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300 font-medium tracking-wide">
          <div className="flex items-center gap-2"><span className="text-green-400">✓</span> 99.99% Uptime</div>
          <div className="flex items-center gap-2"><span className="text-blue-400">●</span> DDoS Protection</div>
          <div className="flex items-center gap-2"><span className="text-indigo-400">■</span> Windows/Linux Server</div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="z-10 mt-20 w-full max-w-6xl px-4 scroll-mt-10">
        <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-8 shadow-2xl">
          
          {/* Header of Pricing Box */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 border-b border-[#1E2538] pb-6">
            <div className="flex items-center gap-4">
              <div className="bg-blue-600/20 text-blue-400 font-bold w-10 h-10 flex items-center justify-center rounded-lg">1</div>
              <div>
                <p className="text-xs text-gray-500 uppercase tracking-widest mb-1">Step 1 of 2</p>
                <h2 className="text-xl font-bold text-white">Choose Your <span className="text-blue-400">Game VPS Plan</span></h2>
                <p className="text-gray-400 text-xs mt-1">Player counts are recommended, not limited</p>
              </div>
            </div>

            <div className="flex gap-3 mt-4 md:mt-0 text-[10px] font-semibold">
              <span className="bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800/50">Instant Deploy</span>
              <span className="bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800/50">Premium Hardware</span>
              <span className="bg-blue-900/30 text-blue-300 px-3 py-1.5 rounded-full border border-blue-800/50">DDoS Protected</span>
            </div>
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {plans.map((plan, i) => {
              const isSelected = selectedPlanIndex === i;
              return (
                <div 
                  key={i} 
                  onClick={() => setSelectedPlanIndex(i)}
                  className={`relative flex flex-col items-center bg-[#0C1018] border ${isSelected ? 'border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.3)]' : 'border-[#1E2538]'} ${plan.popular && !isSelected ? 'border-blue-900' : ''} rounded-xl p-6 transition-all hover:border-blue-400 cursor-pointer group`}
                >
                  
                  {plan.popular && (
                    <div className="absolute -top-3 bg-blue-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                      Popular
                    </div>
                  )}
                  {plan.topTier && (
                    <div className="absolute -top-3 bg-indigo-500 text-white text-[10px] font-bold px-3 py-1 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]">
                      Top Tier
                    </div>
                  )}

                  <div className={`w-12 h-12 rounded-full ${isSelected ? 'bg-blue-600 text-white' : 'bg-[#161C2C] text-blue-400'} border border-[#2A3045] flex items-center justify-center mb-4 transition-colors`}>
                    <span>⚡</span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-1">Game VPS {plan.ram}</h3>
                  <p className="text-blue-400 text-xs font-semibold mb-2">Up to {plan.players} Players</p>
                  <p className="text-gray-500 text-[10px] text-center mb-6 h-8">
                    {i === 0 ? "Perfect for small communities running heavy packs" : 
                     i === 1 ? "Large communities and multi-game setups" :
                     i === 2 ? "High-traffic networks and competitive servers" : "Maximum standard-tier power for serious operations"}
                  </p>

                  <div className="flex justify-between w-full text-[10px] text-gray-400 border-t border-b border-[#1E2538] py-3 mb-6">
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-xs">{plan.cpu}</span> CPU
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-xs">{plan.ram}</span> RAM
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-white font-bold text-xs">{plan.storage}GB</span> Storage
                    </div>
                  </div>

                  <div className="mt-auto flex flex-col items-center">
                    <span className="text-gray-500 text-[10px] uppercase">Starting from</span>
                    <div className="text-2xl font-black text-white">
                      ${plan.price} <span className="text-xs text-gray-500 font-medium">/mo</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer of Pricing Box */}
          <div className="mt-6 border-t border-[#1E2538] pt-6 flex justify-between items-center">
             <div className="text-xs text-gray-400 flex items-center gap-2">
               <span className="text-blue-400 text-lg">⚙</span> Need exact specs for your server? <br/> Build a completely custom plan.
             </div>
             <Link href="/custom" className="text-blue-400 text-xs font-bold hover:text-blue-300">
               Custom Build →
             </Link>
          </div>

          <Link 
            href={`/checkout?id=${selectedPlan.id}&name=Game+VPS+${selectedPlan.ram}&price=${selectedPlan.price}`} 
            className="block text-center w-full mt-6 bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all"
          >
            Continue with {selectedPlan.ram} Plan (${selectedPlan.price}) →
          </Link>
        </div>
      </div>
    </div>
  );
}
