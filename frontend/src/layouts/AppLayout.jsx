import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar"; // Path based on your file tree image

const AppLayout = () => {
  // We lift the collapsed state here so the Main content knows how much to shift
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* 1. YOUR UNTOUCHED SIDEBAR 
          We pass the state down. Your component's internal 
          isMobileOpen logic remains fully intact.
      */}
      <Sidebar isCollapsed={isCollapsed} />

      {/* 2. THE CONTENT WRAPPER
          The magic happens in the margin-left (ml).
          When wide, it shifts 240px (w-60).
          When slim, it shifts 80px (w-20).
      */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ease-out ${
          isCollapsed ? "lg:ml-20" : "lg:ml-60"
        }`}
      >
        {/* TOP HEADER */}
        <header className="sticky top-0 h-[70px] bg-white border-b border-slate-200 flex items-center justify-between px-8 z-30">
          <div className="flex items-center gap-4">
            {/* Toggle button that talks to your Sidebar's isCollapsed prop */}
            <button 
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="hidden lg:flex p-2 hover:bg-slate-100 rounded-lg text-slate-500 transition-colors"
            >
              <span className="text-xl">{isCollapsed ? "➔" : "⬅"}</span>
            </button>
            
            {/* Mobile Title 
                We add ml-12 to stay clear of your Sidebar's mobile toggle button 
            */}
            <h1 className="lg:hidden ml-12 font-bold text-slate-900">Mpay.</h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm">
              KM
            </div>
          </div>
        </header>

        {/* DASHBOARD PAGE CONTENT */}
        <main className="p-6 lg:p-10 w-full overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;