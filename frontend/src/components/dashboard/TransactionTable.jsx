import React from 'react';
import TransactionTable from '../../components/dashboard/TransactionTable';

const Transactions = () => {
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Transaction History</h1>
          <p className="text-slate-500 text-sm">View and manage all your MPay payments.</p>
        </div>
        <button className="bg-[#00a651] text-white px-4 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-emerald-600 transition-all">
          Export CSV
        </button>
      </div>

      {/* Reuse the table component we already built */}
      <TransactionTable />
    </div>
  );
};

export default Transactions;