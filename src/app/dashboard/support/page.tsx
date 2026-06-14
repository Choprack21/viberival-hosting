'use client';

export default function DashboardSupport() {
  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-2">Support Center</h2>
        <p className="text-gray-400 text-sm">Need help with your Game VPS? Open a ticket and our 24/7 team will assist you.</p>
      </div>

      <div className="bg-[#10141F] border border-[#1E2538] rounded-xl p-8 shadow-xl max-w-3xl">
        <form className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Subject</label>
              <input 
                type="text" 
                placeholder="E.g. Server won't start"
                className="w-full bg-[#0C1018] border border-[#1E2538] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Related Server</label>
              <select className="w-full bg-[#0C1018] border border-[#1E2538] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none">
                <option>FiveM Roleplay Server (16GB)</option>
                <option>General Billing Question</option>
              </select>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Message</label>
            <textarea 
              rows={6}
              placeholder="Describe your issue in detail..."
              className="w-full bg-[#0C1018] border border-[#1E2538] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors resize-none"
            ></textarea>
          </div>

          <button 
            type="button" 
            onClick={() => alert("This is a UI prototype! Support tickets will be wired up to Discord/Email later.")}
            className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 px-8 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors"
          >
            Submit Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
