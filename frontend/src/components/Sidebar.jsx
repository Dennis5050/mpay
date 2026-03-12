import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from './AppIcon';
import { getCurrentUser } from "../services/authService";

const Sidebar = ({ isCollapsed = false }) => {

  const location = useLocation();
  const navigate = useNavigate();

  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [userData, setUserData] = useState(null);

  // Load logged user
  useEffect(() => {
    const user = getCurrentUser();

    if (user) {
      setUserData(user);
    }
  }, []);

  // Navigation Items
  const navigationItems = [
    { label: 'Dashboard', path: '/dashboard', icon: 'LayoutDashboard', tooltip: 'View financial overview' },
    { label: 'Account', path: '/account', icon: 'User', tooltip: 'Manage profile and settings' },
    { label: 'KYC', path: '/kyc', icon: 'ShieldCheck', tooltip: 'KYC and identity verification' },
    { label: 'Deposit / Transfer', path: '/send-money', icon: 'ArrowRightLeft', tooltip: 'Deposit or transfer funds' },
    { label: 'Withdraw', path: '/withdraw-funds', icon: 'Wallet', tooltip: 'Withdraw funds' },
    { label: 'Transactions', path: '/transactions', icon: 'Receipt', tooltip: 'Transaction history' },
    { label: 'Payments', path: '/payments', icon: 'CreditCard', tooltip: 'Payment collections' },
    { label: 'API Transactions', path: '/api-transactions', icon: 'Database', tooltip: 'API payment logs' },
    { label: 'Transfer', path: '/transfer', icon: 'ArrowRightLeft', tooltip: 'Internal transfers' },
    { label: 'Services', path: '/services', icon: 'Layers', tooltip: 'Merchant services' },
    { label: 'Documentation', path: '/docs', icon: 'FileText', tooltip: 'API documentation' },
    { label: 'Support', path: '/support', icon: 'LifeBuoy', tooltip: 'Contact support' }
  ];

  const isActive = (path) => location.pathname.startsWith(path);

  const toggleMobileMenu = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("mpay_token");
    localStorage.removeItem("mpay_user");
    localStorage.removeItem("mpay_onboarding_step");
    navigate("/login");
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 lg:hidden p-2.5 rounded-lg bg-card shadow-lg border border-border"
      >
        <Icon name={isMobileOpen ? 'X' : 'Menu'} size={22} />
      </button>

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 h-full bg-card border-r border-border z-40
          transition-all duration-200
          ${isCollapsed ? 'w-20' : 'w-60'}
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >

        {/* Header */}
        <div className="flex items-center p-4 border-b border-border">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center">
            <Icon name="Banknote" size={22} color="#fff" />
          </div>

          {!isCollapsed && (
            <div className="ml-3">
              <h2 className="text-sm font-semibold">MPay Africa</h2>
              <p className="text-xs text-muted-foreground">Merchant Panel</p>
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="p-3 space-y-1.5 mt-2">
          {navigationItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsMobileOpen(false)}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-lg transition
                ${isActive(item.path)
                  ? 'bg-green-600 text-white'
                  : 'hover:bg-muted'}
                ${isCollapsed ? 'justify-center' : ''}
              `}
            >
              <Icon
                name={item.icon}
                size={20}
                color={isActive(item.path) ? '#fff' : 'currentColor'}
              />

              {!isCollapsed && (
                <span className="text-sm font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Bottom Section */}
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-border space-y-3">

          {/* User Info */}
          <div className={`flex items-center gap-2.5 ${isCollapsed ? 'justify-center' : ''}`}>

            {/* Avatar */}
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-600 to-blue-600 flex items-center justify-center text-white text-xs font-bold">
              {userData?.name
                ? userData.name
                    .split(" ")
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join("")
                    .toUpperCase()
                : <Icon name="User" size={18} color="#fff" />}
            </div>

            {!isCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium truncate">
                  {userData?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {userData?.email || ""}
                </p>
                 <p className="text-xs text-muted-foreground">
    {userData?.kyc_status === "verified" && "🟢 Verified"}
    {userData?.kyc_status === "pending" && "🟡 KYC Pending"}
    {userData?.kyc_status === "not_submitted" && "🔴 KYC Required"}
  </p>
              </div>
            )}
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 transition ${
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