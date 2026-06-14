import React from 'react';
import Link from 'next/link';

export default function CustomBuild() {
  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center p-4">
      <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-8 max-w-md w-full text-center shadow-2xl">
        <div className="w-16 h-16 bg-blue-600/20 text-blue-400 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
          ⚙
        </div>
        <h1 className="text-2xl font-bold text-white mb-2">Custom Build</h1>
        <p className="text-gray-400 text-sm mb-8">
          The custom server configurator is currently under construction. Check back soon!
        </p>
        <Link href="/" className="inline-block bg-[#1A2035] hover:bg-[#2A3045] text-white font-semibold py-3 px-6 rounded-lg transition-colors border border-[#2A3045]">
          ← Back to Plans
        </Link>
      </div>
    </div>
  );
}
