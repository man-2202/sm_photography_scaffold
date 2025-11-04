import React from 'react';
import { Outlet } from 'react-router-dom';
import ClientNav from './components/ClientNav';

const ClientLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30">
      <div className="flex h-full">
        {/* Sidebar - Professional glass morphism design */}
        <aside className="fixed inset-y-0 left-0 z-50 hidden lg:flex w-80 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-2xl">
          <ClientNav />
        </aside>
        
        {/* Mobile Sidebar Overlay */}
        <aside className="fixed inset-y-0 left-0 z-50 flex lg:hidden w-80 flex-col border-r border-slate-200/80 bg-white/80 backdrop-blur-xl shadow-2xl transform -translate-x-full transition-transform">
          <ClientNav />
        </aside>
        
        {/* Main Content with sophisticated styling */}
        <main className="flex-1 overflow-y-auto lg:ml-80">
          <div className="min-h-screen">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 lg:px-12">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClientLayout;