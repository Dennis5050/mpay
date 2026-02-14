import React from 'react';

const TopNav = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
      {/* Search Bar - Matches the style in your dashboard screenshot */}
      <div className="flex-1 max-w-md">
        <div className="relative group">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
            🔍
          </span>
          <input 
            type="text" 
            placeholder="Search transactions, references..." 
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-emerald-500/20 focus:bg-white outline-none transition-all"
          />
        </div>
      </div>

      {/* Profile & Notifications Section */}
      <div className="flex items-center space-x-6">
        {/* Notification Bell Placeholder */}
        <button className="text-slate-400 hover:text-emerald-600 transition-colors relative">
          <span className="text-xl">🔔</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Info - Matches your "Skysoft Admin" profile design */}
        <div className="flex items-center space-x-3 border-l border-slate-100 pl-6">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">Skysoft Admin</p>
            <p className="text-[10px] text-slate-400 uppercase font-black tracking-widest">Merchant</p>
          </div>
          <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm hover:scale-105 transition-transform cursor-pointer">
            S
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopNav;