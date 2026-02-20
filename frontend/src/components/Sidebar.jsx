import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';

const Sidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  // Navigation Items (Merchant / Fintech)
  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View financial overview'
    },
    {
      label: 'Account',
      path: '/account',
      icon: 'User',
      tooltip: 'Manage profile and settings'
    },
    {
      label: 'Send Money',
      path: '/send-money',
      icon: 'Send',
      tooltip: 'Transfer funds across Africa'
    },
    {
      label: 'Withdraw',
      path: '/withdraw-funds',
      icon: 'Wallet',
      tooltip: 'Withdraw to bank or mobile money'
    },
    {
      label: 'Transactions',
      path: '/transactions',
      icon: 'Receipt',
      tooltip: 'View transaction history'
    },
    {
      label: 'Payments',
      path: '/payments',
      icon: 'CreditCard',
      tooltip: 'Manage payment collections'
    },
    {
      label: 'API Transactions',
      path: '/api-transactions',
      icon: 'Database',
      tooltip: 'View API payment logs'
    },
    {
      label: 'Transfer',
      path: '/transfer',
      icon: 'ArrowRightLeft',
      tooltip: 'Internal wallet transfers'
    },
    {
      label: 'Services',
      path: '/services',
      icon: 'Layers',
      tooltip: 'Additional merchant services'
    },
    {
      label: 'Documentation',
      path: '/docs',
      icon: 'FileText',
      tooltip: 'API documentation'
    },
    {
      label: 'Support',
      path: '/support',
      icon: 'LifeBuoy',
      tooltip: 'Contact support'
    }
  ];

  // Active route (supports nested routes)
  const isActive = (path) => location.pathname.startsWith(path);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Logout handler (Laravel-ready)
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-200 border border-border"
        aria-label="Toggle navigation menu"
      >
        <Icon
          name={isMobileOpen ? 'X' : 'Menu'}
          size={22}
          color="var(--color-foreground)"
        />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-40
          transition-all duration-200 ease-out
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        {/* Header */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
            <Icon name="Banknote" size={22} color="#FFFFFF" />
          </div>

          {!isCollapsed && (
            <div className="ml-3">
              <h2 className="text-sm font-semibold text-foreground">
                MPay Africa
              </h2>
              <p className="text-xs text-muted-foreground">
                Merchant Panel
              </p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1.5 mt-2" aria-label="Main navigation">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`
                nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg transition
                ${
                  isActive(item.path)
                    ? 'bg-green-600 text-white'
                    : 'text-foreground hover:bg-muted'
                }
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item.tooltip : ''}
            >
              <Icon
                name={item.icon}
                size={20}
                color={isActive(item.path) ? '#FFFFFF' : 'currentColor'}
              />
              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border space-y-2">
          {/* User Info */}
          <div
            className={`flex items-center gap-2.5 ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
              <Icon name="User" size={18} color="#FFFFFF" />
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">
                  User Account
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  user@mpay.africa
                </p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`nav-item flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition ${
              isCollapsed ? 'justify-center' : ''
            }`}
          >
            <Icon name="LogOut" size={20} />
            {!isCollapsed && (
              <span className="text-sm font-medium">Logout</span>
            )}
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;
