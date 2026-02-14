import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';

const LayoutWrapper = () => {
  return (
    <div className="flex min-h-screen bg-[#fcfdfe]">
      {/* Sidebar remains fixed on the left */}
      <Sidebar />

      {/* Main container scrolls on the right */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-y-auto p-8">
          {/* This renders Home.jsx or any other page inside the route */}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default LayoutWrapper;