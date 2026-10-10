'use client';

import React, { useState } from 'react';
import { AdminSidebar, AdminTab } from '@/components/admin/AdminSidebar';
import { RevenueStats } from '@/components/admin/RevenueStats';
import { BookingTable } from '@/components/admin/BookingTable';
import { MovieManager } from '@/components/admin/MovieManager';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { ShieldCheck } from 'lucide-react';

export default function AdminPage() {
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Sidebar Navigation */}
      <AdminSidebar currentTab={currentTab} onSelectTab={setCurrentTab} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        {/* Top Header */}
        <header className="h-16 border-b border-[var(--border-color)] bg-[var(--bg-surface)] px-6 flex items-center justify-between sticky top-0 z-20">
          <div className="flex items-center gap-3">
            <h1 className="font-lora text-lg font-bold text-[var(--text-primary)]">
              {currentTab === 'overview'
                ? 'Bảng Điều Khiển Tổng Quan'
                : currentTab === 'movies'
                ? 'Quản Trị Phim & Phân Quyền'
                : currentTab === 'bookings'
                ? 'Đơn Hàng Booking B2B (CRM)'
                : 'Báo Cáo Doanh Thu PayOS'}
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 flex items-center gap-1 border border-emerald-500/20">
              <ShieldCheck className="w-3 h-3" />
              <span>Hệ Thống Sẵn Sàng</span>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <div className="w-8 h-8 rounded-full bg-[#B83A26] text-[#F5EEE1] flex items-center justify-center font-bold text-xs shadow">
              AD
            </div>
          </div>
        </header>

        {/* Dynamic Body Content */}
        <main className="p-6 space-y-6 flex-1 max-w-7xl w-full mx-auto">
          {currentTab === 'overview' && (
            <div className="space-y-6">
              <RevenueStats />
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-4">
                <BookingTable />
                <MovieManager />
              </div>
            </div>
          )}

          {currentTab === 'movies' && <MovieManager />}
          {currentTab === 'bookings' && <BookingTable />}
          {currentTab === 'revenue' && <RevenueStats />}
        </main>
      </div>
    </div>
  );
}
