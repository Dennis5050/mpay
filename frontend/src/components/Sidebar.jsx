import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from './AppIcon';

const Sidebar = ({ isCollapsed = false }) => {
  const location = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/dashboard',
      icon: 'LayoutDashboard',
      tooltip: 'View your financial overview and quick actions'
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
      tooltip: 'View your transaction history'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  return (
    <>
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-lg bg-card shadow-lg hover:shadow-xl transition-all duration-250 border border-border"
        aria-label="Toggle navigation menu"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={22} color="var(--color-foreground)" />
      </button>
      <aside
        className={`
          fixed lg:fixed top-0 left-0 h-full bg-card border-r border-border z-40
          transition-all duration-250 ease-out
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'sidebar-collapsed' : ''}
        `}
      >
        <div className="sidebar-header">
          <div className="sidebar-logo">
            <Icon name="Banknote" size={isCollapsed ? 24 : 32} color="#FFFFFF" />
          </div>
          {!isCollapsed && (
            <div className="ml-3 text-left">
              <h2 className="text-base font-heading font-semibold text-foreground">MPay Africa</h2>
              <p className="text-xs text-muted-foreground font-caption">Financial Freedom</p>
            </div>
          )}
        </div>

        <nav className="p-3 space-y-1.5 mt-3" aria-label="Main navigation">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              onClick={() => setIsMobileOpen(false)}
              className={`
                nav-item
                ${isActive(item?.path) ? 'active' : 'text-foreground hover:text-primary'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
              title={isCollapsed ? item?.tooltip : ''}
              aria-current={isActive(item?.path) ? 'page' : undefined}
            >
              <Icon 
                name={item?.icon} 
                size={22} 
                color={isActive(item?.path) ? 'var(--color-primary-foreground)' : 'currentColor'} 
              />
              {!isCollapsed && (
                <span className="font-body font-medium text-sm">{item?.label}</span>
              )}
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border">
          <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-glow">
              <Icon name="User" size={18} color="#FFFFFF" />
            </div>
            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-foreground truncate">User Account</p>
                <p className="text-xs text-muted-foreground truncate">user@mpay.africa</p>
              </div>
            )}
          </div>
        </div>
      </aside>
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-30 lg:hidden"
          onClick={toggleMobileMenu}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Sidebar;