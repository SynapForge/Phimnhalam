'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { ThemeToggle } from '@/components/layout/ThemeToggle';
import { LanguageToggle } from '@/components/layout/LanguageToggle';
import { useCinemaStore } from '@/store/cinema-store';
import { DICTIONARY } from '@/types/i18n';
import { Search, Bookmark, Film, Crown, Menu, X, Sparkles, User, LogOut } from 'lucide-react';
import { AuthModal } from '@/components/auth/AuthModal';
import { PricingModal } from '@/components/pricing/PricingModal';

interface NavbarProps {
  showMobileSearch?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ showMobileSearch = true }) => {
  const { searchQuery, setSearchQuery, watchlist, language, user, logout } = useCinemaStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);
  const [vipNotice, setVipNotice] = useState<string | null>(null);
  const t = DICTIONARY[language];

  // Xử lý khi bấm nút "Vào Rạp VIP"
  const handleVipClick = (e: React.MouseEvent) => {
    e.preventDefault();

    // 1. Nếu chưa login -> yêu cầu đăng nhập trước
    if (!user) {
      setAuthModalOpen(true);
      return;
    }

    // 2. Nếu đã login nhưng chưa mua vé VIP
    if (!user.isVip) {
      setVipNotice(`Tài khoản "${user.name}" chưa kích hoạt vé VIP. Vui lòng chọn gói nâng cấp để vào rạp!`);
      setPricingModalOpen(true);
      return;
    }

    // 3. Đã có VIP
    setVipNotice(`Chào mừng Hội viên VIP ${user.name}! Bạn đang có toàn quyền truy cập 4K AI.`);
    setTimeout(() => setVipNotice(null), 3500);
  };

  const handleAuthSuccess = (isVip: boolean) => {
    setAuthModalOpen(false);
    if (!isVip) {
      // Đăng nhập xong mà tài khoản chưa có VIP -> thông báo mua vé
      setVipNotice('Đăng nhập thành công! Tài khoản của bạn chưa có vé VIP, vui lòng đăng ký gói rạp.');
      setPricingModalOpen(true);
    } else {
      setVipNotice('Đăng nhập thành công với tư cách Hội viên VIP!');
      setTimeout(() => setVipNotice(null), 3500);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full cinema-glass border-b border-[var(--border-color)] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Spacious Cinema Header Row (h-16 = 64px) */}
        <div className="h-16 flex items-center justify-between gap-4">
          {/* Left: Brand Logo */}
          <Link href="/" className="flex items-center flex-shrink-0">
            <BrandLogo showTagline={false} />
          </Link>

          {/* Center: Curated Navigation Links */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold tracking-wide">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-[var(--text-primary)] hover:text-[#B83A26] transition-colors py-1"
            >
              <Film className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>{t.navCatalog}</span>
            </Link>

            <Link
              href="/studio"
              className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[#E0A030] transition-colors py-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>Studio AI</span>
            </Link>

            <Link
              href="/library"
              className="flex items-center gap-1.5 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors py-1 relative"
            >
              <Bookmark className="w-3.5 h-3.5 text-[#B83A26]" />
              <span>{t.navLibrary}</span>
              {watchlist.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#B83A26] text-[#F5EEE1] text-[9px] font-bold inline-flex items-center justify-center ml-0.5 shadow-xs">
                  {watchlist.length}
                </span>
              )}
            </Link>

            <Link
              href="/admin"
              className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors text-[11px] font-medium px-2 py-0.5 rounded border border-[var(--border-color)] hover:border-[#E0A030]"
              title="Khu vực quản trị CMS"
            >
              CMS
            </Link>
          </nav>

          {/* Right: Quick Search + Actions */}
          <div className="flex items-center gap-3">
            {/* Realtime Search Bar */}
            <div className="relative hidden lg:block w-48 xl:w-60">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-full bg-[var(--bg-primary)]/80 border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#E0A030] transition-colors"
              />
            </div>

            {/* Language Switcher */}
            <div className="scale-90">
              <LanguageToggle />
            </div>

            {/* Theme Switcher */}
            <div className="scale-90">
              <ThemeToggle />
            </div>

            {/* User Profile Avatar with Dropdown */}
            {user ? (
              <div className="relative pl-1 border-l border-[var(--border-color)]">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-[#B83A26] to-[#211D18] text-[#F5EEE1] font-bold text-xs shadow-md border border-[#E0A030]/50 hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                  title={user.name}
                >
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                  {user.isVip && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-[#E0A030] text-[#211D18] flex items-center justify-center text-[8px] font-black shadow-xs ring-1 ring-black">
                      ★
                    </span>
                  )}
                </button>

                {/* Profile Dropdown Menu */}
                {userMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-10 z-50 w-60 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl p-2 space-y-1.5 animate-modal-enter">
                      {/* User Info Header */}
                      <div className="px-3 py-2.5 rounded-xl bg-[var(--bg-primary)]/70 border border-[var(--border-color)] space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-[var(--text-primary)] truncate">
                            {user.name}
                          </span>
                          {user.isVip ? (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase bg-[#E0A030] text-[#211D18]">
                              VIP Pass
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.2 rounded text-[9px] font-semibold bg-zinc-700/50 text-[var(--text-muted)]">
                              Khách Thường
                            </span>
                          )}
                        </div>
                        <p className="text-[10px] text-[var(--text-muted)] truncate font-mono">
                          {user.email}
                        </p>
                      </div>

                      {/* Dropdown Navigation Actions */}
                      <div className="text-xs space-y-0.5 pt-1">
                        <Link
                          href="/library"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <Bookmark className="w-3.5 h-3.5 text-[#B83A26]" />
                          <span>Tủ Phim & Lịch Sử Xem</span>
                        </Link>

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            setPricingModalOpen(true);
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[#E0A030] transition-colors text-left"
                        >
                          <Crown className="w-3.5 h-3.5 text-[#E0A030]" />
                          <span>{user.isVip ? 'Gia Hạn Thẻ VIP' : 'Nâng Cấp VIP 4K'}</span>
                        </button>

                        <Link
                          href="/admin"
                          onClick={() => setUserMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                        >
                          <Sparkles className="w-3.5 h-3.5 text-[#E0A030]" />
                          <span>Khu Vực Quản Trị CMS</span>
                        </Link>

                        <div className="border-t border-[var(--border-color)] my-1" />

                        <button
                          onClick={() => {
                            setUserMenuOpen(false);
                            logout();
                          }}
                          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-rose-500/10 text-rose-400 text-left font-medium transition-colors"
                        >
                          <LogOut className="w-3.5 h-3.5" />
                          <span>Đăng Xuất Tài Khoản</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="hidden xl:flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] px-2.5 py-1.5 rounded-full hover:bg-[var(--bg-primary)] transition-colors"
              >
                <User className="w-3.5 h-3.5" />
                <span>Đăng nhập</span>
              </button>
            )}

            {/* Primary Action Button: Vào Rạp VIP (Trigger Auth & VIP flow) */}
            <button
              onClick={handleVipClick}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-[11px] sm:text-xs font-bold shadow-md transition-all duration-300 hover:scale-105 active:scale-95 animate-shimmer cursor-pointer flex-shrink-0"
            >
              <Crown className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>{user?.isVip ? 'Đã Có VIP' : t.navVipBtn}</span>
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[var(--text-primary)] rounded-lg hover:bg-[var(--bg-surface)] transition-colors"
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
                placeholder={t.searchPlaceholder}
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

      {/* VIP / Auth Status Notification Toast */}
      {vipNotice && (
        <div className="fixed top-20 right-4 z-50 max-w-sm px-4 py-3 rounded-2xl bg-[var(--bg-surface)] border border-[#E0A030] shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="w-8 h-8 rounded-full bg-[#E0A030]/20 text-[#E0A030] flex items-center justify-center flex-shrink-0">
            <Crown className="w-4 h-4" />
          </div>
          <p className="text-xs text-[var(--text-primary)] font-medium leading-relaxed">
            {vipNotice}
          </p>
          <button
            onClick={() => setVipNotice(null)}
            className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Auth Modal (Login / Register) */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Pricing / VIP Upgrade Modal */}
      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
      />
    </header>
  );
};
