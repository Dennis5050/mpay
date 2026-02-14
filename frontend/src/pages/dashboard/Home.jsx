import React from 'react';
import WalletCard from '../../components/dashboard/WalletCard';
import PaymentChart from '../../components/dashboard/PaymentChart';
import TransactionTable from '../../components/dashboard/TransactionTable';

const Home = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <header>
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <p className="text-slate-500 text-sm">welcome back skysoft!</p>
      </header>

      {/* Reusable Wallet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <WalletCard 
          title="Account Balance" 
          balance="0.00" 
          type="default" 
        />
        <WalletCard 
          title="Service Wallet" 
          balance="0.00" 
          type="service" 
        />
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
         <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group">
            <div className="bg-emerald-50 p-3 rounded-full group-hover:bg-emerald-100 transition-colors text-emerald-600 font-bold">↑</div>
            <span className="text-sm font-bold text-slate-700">Top Up Wallet</span>
         </button>
         <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-center space-y-2 group">
            <div className="bg-emerald-50 p-3 rounded-full group-hover:bg-emerald-100 transition-colors text-emerald-600 font-bold">回</div>
            <span className="text-sm font-bold text-slate-700">Generate QR</span>
         </button>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm min-h-[350px]">
           <h3 className="font-bold text-slate-800 mb-1">Monthly Payments Received In 2026</h3>
           <p className="text-xs text-slate-400 mb-8">Summary of all monthly payments received in current year.</p>
           <PaymentChart />
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm flex flex-col items-center justify-center">
           <h3 className="font-bold text-slate-800 mb-8 self-start">transaction</h3>
           <div className="w-40 h-40 rounded-full border-[16px] border-slate-100 flex items-center justify-center">
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">No Data</span>
           </div>
        </div>
      </div>
      
      {/* Recent Transactions Table */}
      <TransactionTable />
    </div>
  );
};

export default Home;