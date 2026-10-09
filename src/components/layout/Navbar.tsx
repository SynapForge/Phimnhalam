'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { useCinemaStore } from '@/store/cinema-store';
import { Search, Bookmark, Sparkles, Film, Crown, Menu, X } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { searchQuery, setSearchQuery, watchlist } = useCinemaStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full cinema-glass border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between gap-3 sm:gap-6">
        {/* Brand Logo without tagline */}
        <Link href="/" className="flex items-center flex-shrink-0">
          <BrandLogo showTagline={false} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#B83A26] transition-colors"
          >
            <Film className="w-4 h-4 text-[#E0A030]" />
            <span>Kho Phim AI</span>
          </Link>
          <a
            href="#the-loai"
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            Thể Loại
          </a>
          <a
            href="#ai-styles"
            className="flex items-center gap-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E0A030]" />
            <span>Phong Cách AI</span>
          </a>
          <a
            href="#pricing"
            className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Crown className="w-4 h-4 text-[#E0A030]" />
            <span>Gói VIP & Vé Rạp</span>
          </a>
          <Link
            href="/admin"
            className="text-[var(--text-secondary)] hover:text-[#B83A26] transition-colors text-xs font-semibold px-2.5 py-1 rounded-md border border-[var(--border-color)] hover:border-[#B83A26]"
          >
            Quản Trị CMS
          </Link>
        </nav>

        {/* Search & Actions */}
        <div className="flex items-center gap-3">
          {/* Quick Realtime Search Bar */}
          <div className="relative hidden sm:block w-48 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Tìm phim, prompt, AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#E0A030] transition-colors"
            />
          </div>

          {/* Watchlist Counter */}
          <a
            href="#watchlist"
            className="relative p-2 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            title="Danh sách xem sau"
          >
            <Bookmark className="w-5 h-5" />
            {watchlist.length > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#B83A26] text-[#F5EEE1] text-[10px] font-bold flex items-center justify-center">
                {watchlist.length}
              </span>
            )}
          </a>

          {/* Theme Switcher */}
          <ThemeToggle />

          {/* Upgrade VIP Button */}
          <a
            href="#pricing"
            className="hidden lg:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-semibold shadow-md transition-transform hover:scale-105 active:scale-95"
          >
            <Crown className="w-3.5 h-3.5 text-[#E0A030]" />
            <span>Vào Rạp VIP</span>
          </a>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[var(--text-primary)]"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-3 pb-6 border-t border-[var(--border-color)] bg-[var(--bg-surface)] space-y-3">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
            <input
              type="text"
              placeholder="Tìm phim, prompt, AI..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)]"
            />
          </div>
          <div className="flex flex-col gap-2 pt-2 text-sm">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[var(--bg-primary)] text-[var(--text-primary)] font-medium"
            >
              Kho Phim AI
            </Link>
            <a
              href="#the-loai"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[var(--bg-primary)] text-[var(--text-secondary)]"
            >
              Thể Loại
            </a>
            <a
              href="#pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-md hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] flex items-center justify-between"
            >
              <span>Gói VIP & Vé Rạp</span>
              <Crown className="w-4 h-4 text-[#E0A030]" />
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
