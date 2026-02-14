import React from 'react';

const TopNav = () => {
  return (
    <header className="h-16 bg-white border-b border-slate-100 flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex-1 max-w-md">
        <div className="relative">
          <input 
            type="text" 
            placeholder="Search transactions..." 
            className="w-full bg-slate-50 border-none rounded-lg py-2 px-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-bold text-slate-800">Skysoft Admin</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Merchant</p>
        </div>
        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold border-2 border-white shadow-sm">
          S
        </div>
      </div>
    </header>
  );
};

export default TopNav;