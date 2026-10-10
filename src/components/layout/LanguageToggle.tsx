'use client';

import React from 'react';
import { useCinemaStore } from '@/store/cinema-store';
import { Languages } from 'lucide-react';

export const LanguageToggle: React.FC = () => {
  const { language, toggleLanguage } = useCinemaStore();

  return (
    <button
      onClick={toggleLanguage}
      aria-label="Chuyển đổi ngôn ngữ Tiếng Việt / English"
      className="relative flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] transition-all duration-200 text-xs font-bold cursor-pointer shadow-sm"
      title={language === 'vi' ? 'Switch to English' : 'Chuyển sang Tiếng Việt'}
    >
      <Languages className="w-3.5 h-3.5 text-[#E0A030]" />
      <span className="uppercase text-[11px]">{language}</span>
    </button>
  );
};
