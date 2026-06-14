import Link from 'next/link'
import { login } from './actions'

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const resolvedSearchParams = await searchParams;
  const error = resolvedSearchParams?.error;

  return (
    <div className="min-h-screen bg-[#0A0D14] flex flex-col items-center justify-center p-4">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#10141F] border border-[#1E2538] rounded-2xl p-8 shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <Link href="/" className="text-2xl font-bold text-white inline-block mb-2">
            843 <span className="text-blue-500">Hosting</span>
          </Link>
          <h1 className="text-xl font-semibold text-white">Welcome Back</h1>
          <p className="text-gray-400 text-sm mt-1">Sign in to manage your servers</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg mb-6 text-center">
            {error}
          </div>
        )}

        <form className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Email Address</label>
            <input 
              name="email"
              type="email" 
              required
              placeholder="you@example.com"
              className="w-full bg-[#0C1018] border border-[#1E2538] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">Password</label>
              <a href="#" className="text-xs text-blue-400 hover:text-blue-300 transition-colors">Forgot password?</a>
            </div>
            <input 
              name="password"
              type="password" 
              required
              placeholder="••••••••"
              className="w-full bg-[#0C1018] border border-[#1E2538] rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
            />
          </div>

          <button 
            formAction={login}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-lg shadow-[0_0_15px_rgba(37,99,235,0.3)] transition-colors mt-2"
          >
            Sign In
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/signup" className="text-blue-400 hover:text-blue-300 transition-colors font-medium">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  )
}
