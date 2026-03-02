import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Icon from "../components/AppIcon";

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar Logic: 
         Ensure your Sidebar component handles the 'isMobileMenuOpen' prop 
         or use a hidden/block responsive class within the Sidebar itself.
      */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        {/* --- Mobile Top Navigation --- */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 py-3 bg-background/80 backdrop-blur-md border-b border-border md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xs">MP</span>
            </div>
            <span className="font-bold text-lg tracking-tight">mPay</span>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-accent transition-colors"
            aria-label="Toggle Menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </header>

        {/* --- Main Content Area --- */}
        <main className="flex-1 overflow-y-auto">
          {/* Horizontal padding: 4 (mobile) -> 8 (tablet) -> 12 (desktop)
             Vertical padding: 6 (mobile) -> 10 (desktop)
          */}
          <div className="p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto w-full transition-all duration-300">
            {/* Page Content Transition Wrapper */}
            <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
              {children}
            </div>
          </div>
          
          {/* Optional: Footer / Copyright */}
          <footer className="px-8 py-6 border-t border-border/40 mt-auto">
            <p className="text-xs text-muted-foreground text-center md:text-left">
              © 2026 mPay Africa. All rights reserved.
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;