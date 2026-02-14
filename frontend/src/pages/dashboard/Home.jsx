import React from 'react';
// Note: You can later move these to their own files in components/dashboard/
import WalletCard from '../../components/dashboard/WalletCard';

const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm">welcome back skysysoft!</p>
      </header>

      {/* Wallet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 shadow-sm relative overflow-hidden group">
          <div className="flex items-center space-x-2 text-emerald-800 mb-4">
             <span className="text-sm font-bold uppercase tracking-wider">🏦 Account Balance</span>
          </div>
          <div className="text-3xl font-black text-slate-900">KES 0.00</div>
          <button className="w-full mt-6 py-2.5 rounded-xl border-2 border-emerald-500 text-emerald-600 font-bold hover:bg-emerald-500 hover:text-white transition-all flex items-center justify-center space-x-2">
            <span>⊕</span> <span>Recharge</span>
          </button>
        </div>

        <div className="p-6 bg-[#00a651] rounded-2xl shadow-lg shadow-emerald-200 relative overflow-hidden">
          <div className="flex items-center space-x-2 text-white/90 mb-4">
             <span className="text-sm font-bold uppercase tracking-wider">💳 Service Wallet</span>
          </div>
          <div className="text-3xl font-black text-white">KES 0.00</div>
          <button className="w-full mt-6 py-2.5 rounded-xl bg-white text-[#00a651] font-bold hover:bg-emerald-50 transition-all flex items-center justify-center space-x-2 shadow-md">
            <span>⊕</span> <span>Recharge</span>
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
         <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group">
            <div className="bg-emerald-50 p-3 rounded-full group-hover:bg-emerald-100 transition-colors">↑</div>
            <span className="text-sm font-bold text-slate-700">Top Up Wallet</span>
         </button>
         <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group">
            <div className="bg-emerald-50 p-3 rounded-full group-hover:bg-emerald-100 transition-colors">回</div>
            <span className="text-sm font-bold text-slate-700">Generate QR</span>
         </button>
      </div>

      {/* Charts & Table Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[300px]">
           <h3 className="font-bold text-slate-800 mb-1">Monthly Payments Received In 2026</h3>
           <p className="text-xs text-slate-400 mb-8">Summary of all monthly payments received in current year.</p>
           {/* Placeholder for Chart.js/Recharts */}
           <div className="h-48 flex items-center justify-center border-b border-l border-slate-100 relative">
              <span className="text-slate-300 text-sm italic">Chart data loading...</span>
           </div>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
           <h3 className="font-bold text-slate-800 mb-8 self-start">transaction</h3>
           <div className="w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
              <span className="text-slate-400 text-xs font-bold uppercase">No Data</span>
           </div>
        </div>
      </div>
      
      {/* Recent Transactions Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h3 className="font-bold text-slate-800">Recent Transactions</h3>
          <div className="relative">
             <input type="text" placeholder="Search..." className="bg-slate-50 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64" />
          </div>
        </div>
        <div className="p-12 text-center text-slate-400 italic">
           No Transactions available
        </div>
      </div>
    </div>
  );
};

export default Home;