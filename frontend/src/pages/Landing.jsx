import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Landing = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    // Logic for authentication goes here
    // For now, we redirect to the dashboard home
    if (email && password) {
      navigate('/home');
    } else {
      alert("Please enter your credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased">
      {/* Optimized Navigation Bar */}
      <nav className="bg-[#00a651] p-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center space-x-2 px-4 md:px-12">
          <div className="bg-white p-1 rounded-lg">
            <div className="w-6 h-6 bg-[#00a651] rounded-sm flex items-center justify-center text-white font-bold text-xs italic">m</div>
          </div>
          <span className="text-white font-bold text-xl tracking-tight">MPay</span>
          <span className="text-emerald-100 text-xs ml-4 border-l border-emerald-400 pl-4 hidden md:block uppercase tracking-widest font-medium">Leading Money Handshake</span>
        </div>
        <div className="hidden md:flex space-x-6 px-12 text-white text-sm font-semibold">
          <a href="#solutions" className="hover:text-emerald-200 transition-colors">Solutions</a>
          <a href="#developers" className="hover:text-emerald-200 transition-colors">Developers</a>
          <a href="#pricing" className="hover:text-emerald-200 transition-colors">Pricing</a>
        </div>
      </nav>

      {/* Hero & Auth Section */}
      <main className="flex-grow flex flex-col lg:flex-row items-center justify-center px-6 py-12 md:px-24 gap-16 max-w-7xl mx-auto">
        
        {/* Left Column: Brand Messaging */}
        <div className="max-w-xl space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <h1 className="text-5xl md:text-6xl font-black text-slate-900 leading-tight">
            Payments infrastructure <br />
            <span className="text-[#00a651]">built for modern businesses.</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            MPay helps businesses collect, move, and manage money across Paybill, Till Numbers, Bank Transfers, and APIs — securely and at scale.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              "Secure payment flows",
              "Built for SMEs",
              "API-first platform",
              "Real-time settlement"
            ].map((feature) => (
              <div key={feature} className="flex items-center space-x-3 text-slate-700 font-medium">
                <div className="bg-emerald-100 p-1 rounded-full">
                  <svg className="w-4 h-4 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
          
          <div className="pt-6 border-t border-slate-200">
            <p className="text-sm text-slate-400 font-medium">Trusted by growing businesses and payment partners in Kenya.</p>
          </div>
        </div>

        {/* Right Column: Sign In Portal */}
        <div className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl shadow-slate-200 border border-slate-100 w-full max-w-md relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-[#00a651]"></div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Sign in</h2>
          <p className="text-slate-500 text-sm mb-8 font-medium">Access your MPay Merchant dashboard.</p>
          
          <form className="space-y-5" onSubmit={handleSignIn}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider ml-1">Work Email</label>
              <input 
                required
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Password</label>
                <a href="#" className="text-xs text-emerald-600 font-bold hover:underline">Forgot?</a>
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-300"
              />
            </div>

            <div className="flex items-center space-x-2 px-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
              <label htmlFor="remember" className="text-sm text-slate-600 font-medium select-none">Keep me signed in</label>
            </div>

            <button 
              type="submit"
              className="w-full bg-[#0f172a] hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-[0.98]"
            >
              Sign in to Dashboard
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-600 font-medium">
            New to MPay? <Link to="/register" className="text-emerald-600 font-bold hover:underline underline-offset-4">Create an account</Link>
          </p>
        </div>
      </main>

      {/* Modern Footer */}
      <footer className="p-8 text-center text-xs text-slate-400 border-t border-slate-100 bg-white">
        <p className="font-bold text-slate-500 uppercase tracking-widest">© 2026 Skysoft Technology · MPay Africa</p>
        <div className="mt-4 flex justify-center space-x-6 font-medium">
          <a href="#" className="hover:text-emerald-600">Privacy Policy</a>
          <a href="#" className="hover:text-emerald-600">Terms of Service</a>
          <a href="#" className="hover:text-emerald-600">Compliance</a>
        </div>
      </footer>
    </div>
  );
};

export default Landing;