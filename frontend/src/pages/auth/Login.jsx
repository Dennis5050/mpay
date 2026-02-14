import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = (e) => {
    e.preventDefault();
    navigate('/home'); // Redirects to the Merchant Panel
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-slate-200">
        <div className="flex justify-center mb-6">
          <div className="w-12 h-12 bg-[#00a651] rounded-xl flex items-center justify-center text-white font-black italic text-xl">m</div>
        </div>
        <h2 className="text-3xl font-bold text-slate-900 text-center mb-2">Sign in</h2>
        <p className="text-slate-500 text-center mb-8">Welcome back to MPay.</p>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Email address</label>
            <input type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
            <input type="password" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 outline-none" />
          </div>
          <button className="w-full bg-[#0f172a] text-white font-bold py-4 rounded-xl shadow-lg hover:bg-slate-800 transition-all">
            Sign in
          </button>
        </form>
        
        <p className="mt-8 text-center text-sm text-slate-600 font-medium">
          New to MPay? <Link to="/register" className="text-emerald-600 font-bold hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;