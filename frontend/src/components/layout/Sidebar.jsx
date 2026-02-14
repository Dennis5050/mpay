import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const location = useLocation();

  const toggleMenu = (menu) => setOpenMenu(openMenu === menu ? null : menu);

  const navItems = [
    { name: 'Dashboard', path: '/home', icon: '📊' },
    { 
      name: 'Account', 
      icon: '👤', 
      subItems: [
        { name: 'Account Details', path: '/account/details' },
        { name: 'Update Account', path: '/account/update' },
        { name: 'Payment Methods', path: '/account/methods' }
      ] 
    },
    { 
      name: 'Payments', 
      icon: '💳', 
      subItems: [
        { name: 'Transactions', path: '/transactions' },
        { name: 'STK Push', path: '/payments/stk' },
        { name: 'Pricing', path: '/payments/pricing' }
      ] 
    },
    { name: 'Api Transactions', path: '/api-settings', icon: '⚙️' }
  ];

  return (
    <div className="w-64 bg-white border-r border-slate-100 min-h-screen flex flex-col p-4">
      <div className="flex items-center space-x-3 mb-10 px-2">
        <div className="w-8 h-8 bg-[#00a651] rounded-lg flex items-center justify-center text-white font-bold italic">m</div>
        <span className="font-bold text-slate-800">MPay Merchant</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <div key={item.name}>
            {item.subItems ? (
              <>
                <button 
                  onClick={() => toggleMenu(item.name)}
                  className="w-full flex items-center justify-between p-3 text-slate-600 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                >
                  <div className="flex items-center space-x-3"><span>{item.icon}</span> <span>{item.name}</span></div>
                  <span className={`text-xs transition-transform ${openMenu === item.name ? 'rotate-180' : ''}`}>▼</span>
                </button>
                {openMenu === item.name && (
                  <div className="pl-10 space-y-1 mt-1">
                    {item.subItems.map(sub => (
                      <Link key={sub.name} to={sub.path} className="block p-2 text-sm text-slate-500 hover:text-emerald-600 transition-colors">
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <Link 
                to={item.path} 
                className={`flex items-center space-x-3 p-3 rounded-xl font-medium transition-colors ${location.pathname === item.path ? 'bg-emerald-50 text-emerald-600' : 'text-slate-600 hover:bg-slate-50'}`}
              >
                <span>{item.icon}</span> <span>{item.name}</span>
              </Link>
            )}
          </div>
          
        ))}
      </nav>

      <div className="pt-6 border-t border-slate-50">
        <button className="w-full flex items-center space-x-3 p-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-colors">
          <span>logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;