import React from 'react';

const TransactionTable = () => {
  const headers = ["TRANSACTION TYPE", "AMOUNT", "PHONE NUMBER", "CUSTOMER REF", "DATE", "STATUS"];

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
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-slate-50">
              {headers.map(h => (
                <th key={h} className="px-6 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td colSpan={6} className="p-20 text-center text-slate-400 italic font-medium">
                No Transactions available
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionTable; // This line fixes the error in Home.jsx