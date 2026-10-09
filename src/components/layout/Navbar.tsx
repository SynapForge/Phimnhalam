'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useCinemaStore } from '@/store/cinema-store';
import { Search, Bookmark, Film, Crown, Menu, X } from 'lucide-react';

interface NavbarProps {
  showMobileSearch?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showMobileSearch = true }) => {
  const { searchQuery, setSearchQuery, watchlist } = useCinemaStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full cinema-glass border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Compact Navbar Row: height reduced from 64-72px to ~44-48px (h-11 sm:h-12) */}
        <div className="h-11 sm:h-12 flex items-center justify-between gap-2 sm:gap-6">
          {/* Brand Logo without tagline */}
          <Link href="/" className="flex items-center flex-shrink-0 scale-90 sm:scale-95 origin-left">
            <BrandLogo showTagline={false} />
          </Link>

          {/* Desktop Navigation Links (Compact text & gap) */}
          <nav className="hidden md:flex items-center gap-5 text-xs font-medium">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#B83A26] transition-colors"
            >
              <Film className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>Kho Phim AI</span>
            </Link>
            <a
              href="#the-loai"
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              Thể Loại
            </a>
            <Link
              href="/library"
              className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#B83A26]" />
              <span>Tủ Phim</span>
            </Link>
            <a
              href="#pricing"
              className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Crown className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>Gói VIP & Vé Rạp</span>
            </a>
            <Link
              href="/admin"
              className="text-[var(--text-secondary)] hover:text-[#B83A26] transition-colors text-[11px] font-semibold px-2 py-0.5 rounded border border-[var(--border-color)] hover:border-[#B83A26]"
            >
              Quản Trị CMS
            </Link>
          </nav>

          {/* Search (Desktop) & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5">
            {/* Quick Realtime Search Bar on Desktop */}
            <div className="relative hidden md:block w-40 lg:w-56">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
              <input
                type="text"
                placeholder="Tìm phim, prompt..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1 text-[11px] rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#E0A030] transition-colors"
              />
            </div>

            {/* Watchlist & Library Link */}
            <Link
              href="/library"
              className="relative p-1.5 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              title="Tủ phim: Xem sau & Lịch sử"
            >
              <Bookmark className="w-4 h-4" />
              {watchlist.length > 0 && (
                <span className="absolute top-0 right-0 w-3.5 h-3.5 rounded-full bg-[#B83A26] text-[#F5EEE1] text-[9px] font-bold flex items-center justify-center">
                  {watchlist.length}
                </span>
              )}
            </Link>

            {/* Theme Switcher */}
            <div className="scale-90">
              <ThemeToggle />
            </div>

            {/* Upgrade VIP Button */}
            <a
              href="#pricing"
              className="hidden lg:flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-[11px] font-semibold shadow-sm transition-transform hover:scale-105 active:scale-95"
            >
              <Crown className="w-3 h-3 text-[#E0A030]" />
              <span>Vào Rạp VIP</span>
            </a>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-1.5 text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* ALWAYS-VISIBLE SEARCH BAR ON MOBILE (Only when showMobileSearch is true) */}
        {showMobileSearch && (
          <div className="md:hidden pb-2 pt-0">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[#E0A030]" />
              <input
                type="text"
                placeholder="Tìm kiếm phim, diễn viên..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8.5 pr-3 py-1.5 text-xs rounded-full bg-[var(--bg-surface)] border border-[#E0A030]/50 text-[var(--text-primary)] placeholder-[var(--text-muted)] shadow-xs focus:outline-none focus:border-[#E0A030]"
              />
            </div>
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 border-t border-[var(--border-color)] bg-[var(--bg-surface)] space-y-2">
          <div className="flex flex-col gap-1 text-xs">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-primary)] font-medium flex items-center gap-2"
            >
              <Film className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>Kho Phim AI</span>
            </Link>
            <a
              href="#the-loai"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]"
            >
              Thể Loại Phim
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] flex items-center justify-between"
            >
              <span>Gói VIP & Vé Rạp</span>
              <Crown className="w-3.5 h-3.5 text-[#E0A030]" />
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded-lg hover:bg-[var(--bg-primary)] text-[#B83A26] font-semibold"
            >
              Quản Trị CMS
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
