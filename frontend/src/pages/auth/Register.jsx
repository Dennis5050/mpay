import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // After registration, redirect to dashboard or login
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans">
      <div className="mb-8 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Create Account</h1>
        <p className="text-slate-500 text-sm">Join M Pay and start managing payments across Africa.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 w-full max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">First name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Last name</label>
              <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Business name</label>
            <input type="text" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Country</label>
            <select className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500 bg-white">
              <option>Select country</option>
              <option value="KE">Kenya</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Phone number</label>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500">+</span>
              <input type="text" placeholder="7XXXXXXXX" className="w-full px-4 py-2.5 rounded-r-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <p className="text-[10px] text-slate-400 italic">Enter number without country code</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Confirm password</label>
              <input type="password" placeholder="••••••••" className="w-full px-4 py-2.5 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-emerald-500" />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input type="checkbox" className="rounded text-emerald-600 focus:ring-emerald-500" />
            <label className="text-sm text-slate-600">I agree to the <span className="text-emerald-600 font-bold">Terms & Conditions</span></label>
          </div>

          <button className="w-full bg-[#0f172a] text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all">
            Create Account
          </button>
        </form>
      </div>
      
      <p className="mt-6 text-sm text-slate-600">
        Already have an account? <Link to="/login" className="text-emerald-600 font-bold hover:underline">Sign in</Link>
      </p>
    </div>
  );
};

export default Register;