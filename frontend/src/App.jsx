import React from 'react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Top Navigation Bar */}
      <nav className="bg-[#00a651] p-4 flex items-center shadow-md">
        <div className="flex items-center space-x-2 px-4 md:px-12">
          <div className="bg-white p-1 rounded-lg">
             <div className="w-6 h-6 bg-[#00a651] rounded-sm flex items-center justify-center text-white font-bold text-xs italic">m</div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">MPay</span>
          <span className="text-emerald-100 text-xs ml-4 border-l border-emerald-400 pl-4 hidden md:block">Leading Money Handshake</span>
        </div>
      </nav>

      {/* Main Hero Section */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 py-12 md:px-24 gap-16">
        
        {/* Left Column: Value Proposition */}
        <div className="max-w-xl space-y-8">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight">
            Payments infrastructure <br />
            <span className="text-[#00a651]">built for modern businesses</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            MPay helps businesses collect, move, and manage money across Paybill, Till Numbers, Bank Transfers, and APIs — securely and at scale.
          </p>
          
          <ul className="space-y-4 text-slate-700">
            <li className="flex items-center space-x-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Secure & compliant payment flows</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>Built for SMEs, enterprises & partners</span>
            </li>
            <li className="flex items-center space-x-3">
              <span className="text-emerald-500 font-bold">✓</span>
              <span>API-first, automation-ready platform</span>
            </li>
          </ul>
          
          <p className="text-sm text-slate-400 pt-4 border-t border-slate-200">
            Trusted by growing businesses and payment partners.
          </p>
        </div>

        {/* Right Column: Sign In Card */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-xl border border-slate-100 w-full max-w-md">
          <h2 className="text-2xl font-bold text-slate-900 mb-1">Sign in</h2>
          <p className="text-slate-500 text-sm mb-8">Access your MPay dashboard.</p>
          
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Email address</label>
              <input 
                type="email" 
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-semibold text-slate-700">Password</label>
                <a href="#" className="text-xs text-emerald-600 font-bold hover:underline">Forgot password?</a>
              </div>
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div className="flex items-center">
              <input type="checkbox" id="remember" className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <label htmlFor="remember" className="ml-2 text-sm text-slate-600">Remember me</label>
            </div>

            <button className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-3.5 rounded-lg transition-all shadow-lg">
              Sign in
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600">
            New to MPay? <a href="#" className="text-emerald-600 font-bold hover:underline">Create an account</a>
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 text-center text-xs text-slate-400 border-t border-slate-100">
        <p>© 2026 Skysoft Technology · <a href="#" className="text-emerald-600">skysofttechnology.com</a></p>
        <p className="mt-2 space-x-4">
          <span>Secure</span> • <span>Compliant</span> • <span>Built for scale</span>
        </p>
      </footer>
    </div>
  );
};

export default LandingPage;