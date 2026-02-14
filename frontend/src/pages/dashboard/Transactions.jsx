import React from 'react';

const TransactionTable = () => {
  return (
    <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-slate-50 flex justify-between items-center">
        <h3 className="font-bold text-slate-800">Recent Transactions</h3>
        <div className="relative">
           <input 
             type="text" 
             placeholder="Search..." 
             className="bg-slate-50 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none w-64" 
           />
        </div>
      </div>
      <div className="p-20 text-center text-slate-400 italic">
          No Transactions available
      </div>
    </div>
  );
};

export default TransactionTable;