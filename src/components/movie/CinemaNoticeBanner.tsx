'use client';

import React, { useState } from 'react';
import { Trophy, ArrowRight, X } from 'lucide-react';

export const CinemaNoticeBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Sự kiện liên hoan phim" className="relative w-full border-y border-[#E0A030]/30 bg-gradient-to-r from-[#B83A26]/15 via-[rgba(224,160,48,0.12)] to-[#B83A26]/15 py-3 px-4 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        {/* Left message with badge */}
        <div className="flex items-center gap-2.5 text-center sm:text-left">
          <span className="flex-shrink-0 p-1 rounded-full bg-[#E0A030]/20 text-[#E0A030]">
            <Trophy className="w-3.5 h-3.5" />
          </span>
          <p className="text-[var(--text-primary)]">
            <strong className="font-semibold text-[#E0A030]">Liên Hoan Phim AI Dân Gian Việt Nam 2026:</strong>{' '}
            <span className="text-[var(--text-secondary)]">
              Mở khóa miễn phí toàn bộ các tác phẩm dã sử & tranh sơn mài nhân dịp ra mắt!
            </span>
          </p>
        </div>

        {/* Right CTA and Dismiss */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <a
            href="#the-loai"
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0A030] hover:bg-[#c98818] text-[#211D18] font-bold text-[11px] shadow-sm transition-transform hover:scale-105 cursor-pointer"
          >
            <span>Khám Phá Ngay</span>
            <ArrowRight className="w-3 h-3" />
          </a>

          <button
            onClick={() => setIsVisible(false)}
            className="p-1 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Đóng thông báo"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
