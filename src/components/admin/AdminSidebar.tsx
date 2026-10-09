'use client';

import React from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import {
  LayoutDashboard,
  Film,
  CalendarCheck,
  TrendingUp,
  Settings,
  ArrowLeft,
} from 'lucide-react';

export type AdminTab = 'overview' | 'movies' | 'bookings' | 'revenue';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
}) => {
  const menuItems = [
    { id: 'overview' as AdminTab, label: 'Tổng Quan Báo Cáo', icon: LayoutDashboard },
    { id: 'movies' as AdminTab, label: 'Quản Trị Kho Phim', icon: Film },
    { id: 'bookings' as AdminTab, label: 'Booking Video AI (B2B)', icon: CalendarCheck },
    { id: 'revenue' as AdminTab, label: 'Doanh Thu PayOS', icon: TrendingUp },
  ];

  return (
    <aside className="w-64 border-r border-[var(--border-color)] bg-[var(--bg-surface)] flex flex-col justify-between p-4 flex-shrink-0 transition-colors duration-300">
      <div className="space-y-6">
        {/* Brand Header */}
        <div className="pt-2 px-2">
          <Link href="/">
            <BrandLogo showTagline={false} />
          </Link>
          <div className="mt-2 inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold bg-[#E0A030]/20 text-[#E0A030] border border-[#E0A030]/30">
            <span>Admin Cinema Hub</span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#B83A26] text-[#F5EEE1] shadow-md'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)]'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#F5EEE1]' : 'text-[#E0A030]'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Back Button */}
      <div className="pt-4 border-t border-[var(--border-color)] space-y-2">
        <Link
          href="/"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-primary)] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Về Rạp Xem Phim</span>
        </Link>
      </div>
    </aside>
  );
};
