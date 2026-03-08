import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Icon from "../components/AppIcon";

const DashboardLayout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F4F4F4] text-[#1A1A1A] font-body">
      {/* Sidebar: Should now use Maroon (#A32638) backgrounds and Gold (#FFB612) active states */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* --- Equity Mobile Header (Maroon) --- */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-5 py-4 bg-[#A32638] text-white shadow-lg md:hidden">
          <div className="flex items-center gap-3">
            {/* The Iconic Equity 'E' Box */}
            <div className="w-10 h-10 bg-[#FFB612] rounded flex items-center justify-center shadow-inner">
              <span className="text-[#5C2D25] font-black text-2xl leading-none">M</span>
            </div>
            <div className="flex flex-col -space-y-1">
              <span className="font-heading font-bold text-xl tracking-tight">mpay global</span>
              <span className="text-[10px] uppercase tracking-[0.2em] font-medium text-white/80">Online</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 transition-all active:scale-90"
            aria-label="Toggle Menu"
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </header>

        {/* --- Main Content Area --- */}
        <main className="flex-1 overflow-y-auto relative">
          {/* Brand Signature: A thin Gold stripe at the top of the content */}
          <div className="h-1.5 bg-[#FFB612] w-full hidden md:block" />
          
          {/* Subtle Maroon wash for depth */}
          <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[#A32638]/5 to-transparent -z-10" />

          <div className="p-4 md:p-8 lg:p-12 max-w-[1600px] mx-auto w-full">
            {/* Page Content Animation */}
            <div className="animate-in fade-in slide-in-from-bottom-3 duration-700 ease-out">
              {children}
            </div>
          </div>
          
          {/* Corporate Footer */}
          <footer className="px-10 py-10 border-t border-gray-200 mt-auto bg-white">
            <div className="max-w-8xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="flex flex-col items-center md:items-start gap-1">
                <p className="text-[13px] font-bold text-[#5C2D25]">
                  mpay Group Holdings PLC
                </p>
                <p className="text-xs text-gray-500">
                  © 2026 mpay global africa.
                </p>
              </div>
              
              <div className="flex gap-8">
                {["Privacy Policy", "Terms of Use", "Security Tips"].map((item) => (
                  <a key={item} href="#" className="text-[11px] font-bold uppercase tracking-widest text-gray-400 hover:text-[#A32638] transition-colors">
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;