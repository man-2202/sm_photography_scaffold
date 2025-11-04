import React from 'react';
import { Outlet } from 'react-router-dom';
import AdminNav from './components/AdminNav';

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-full">
        <aside className="fixed inset-y-0 z-50 flex h-full w-72 flex-col border-r border-border bg-card/40 shadow-sm transition-transform md:relative md:translate-x-0">
          <AdminNav />
        </aside>
        <main className="flex-1 overflow-y-auto p-8">
          <div className="mx-auto max-w-5xl space-y-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;