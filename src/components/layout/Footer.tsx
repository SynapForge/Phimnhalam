'use client';

import React from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { useCinemaStore } from '@/store/cinema-store';
import { DICTIONARY } from '@/types/i18n';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { language } = useCinemaStore();
  const t = DICTIONARY[language];

  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-12 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info with Tagline */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo showTagline={true} />
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {t.footerAbout}
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--accent-gold)]">
              <Sparkles className="w-4 h-4" />
              <span>{t.footerCommunity}</span>
            </div>
          </div>

          {/* Col 2: Kho Phim */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              {t.footerCinemaCategories}
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">{language === 'vi' ? 'Phim Dã Sử & Cổ Trang AI' : 'Historical & Dynasty AI'}</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">{language === 'vi' ? 'Cyberpunk Việt Nam 2088' : 'Saigon Cyberpunk 2088'}</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">{language === 'vi' ? 'Hoạt Hình Niji Anime' : 'Niji Anime Cinema'}</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">{language === 'vi' ? 'Tranh Sơn Mài Dân Gian' : 'Lacquer Art Folklore'}</a></li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ & Hợp tác */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              {t.footerBusiness}
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#pricing" className="hover:text-[#B83A26] transition-colors">{t.navPricing}</a></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">{language === 'vi' ? 'Cổng Thanh Toán PayOS Tức Thời' : 'Instant PayOS Checkout'}</span></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">{language === 'vi' ? 'Dịch Vụ Sản Xuất Video AI B2B' : 'B2B Generative Production'}</span></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">{language === 'vi' ? 'Chính Sách Bản Quyền & Prompt' : 'Prompt & IP Rights Policy'}</span></li>
            </ul>
          </div>

          {/* Col 4: Công nghệ */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              {t.footerTech}
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              {t.footerTechDesc}
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>{t.footerPaymentSafe}</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>{t.footerCopyright}</p>
          <div className="flex items-center gap-1">
            <span>{t.footerProud}</span>
            <Heart className="w-3.5 h-3.5 text-[#B83A26] fill-[#B83A26]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
