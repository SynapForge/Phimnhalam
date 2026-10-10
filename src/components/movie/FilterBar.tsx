'use client';

import React from 'react';
import { useCinemaStore } from '@/store/cinema-store';
import { MovieCategory } from '@/types/movie';
import { DICTIONARY } from '@/types/i18n';
import { RotateCcw } from 'lucide-react';

const CATEGORIES: MovieCategory[] = [
  'Tất cả',
  'Phim Ngắn AI',
  'Series Nhiều Tập',
  'Trailer Ý Tưởng',
  'Hoạt Hình & Anime',
  'Dân Gian Huyền Bí',
];

export const FilterBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedAccessType,
    setSelectedAccessType,
    resetFilters,
    language,
  } = useCinemaStore();

  const t = DICTIONARY[language];

  const isFiltered =
    selectedCategory !== 'Tất cả' ||
    selectedAccessType !== 'all';

  const categoryLabels: Record<MovieCategory, string> = {
    'Tất cả': t.catAll,
    'Phim Ngắn AI': language === 'vi' ? 'Phim Ngắn AI' : 'AI Short Films',
    'Series Nhiều Tập': language === 'vi' ? 'Series Nhiều Tập' : 'Episodic Series',
    'Trailer Ý Tưởng': language === 'vi' ? 'Trailer Ý Tưởng' : 'Concept Trailers',
    'Hoạt Hình & Anime': language === 'vi' ? 'Hoạt Hình & Anime' : 'Animation & Anime',
    'Dân Gian Huyền Bí': language === 'vi' ? 'Dân Gian Huyền Bí' : 'Folklore & Mystery',
  };

  const accessOptions = [
    { type: 'all' as const, label: t.catAll },
    { type: 'free' as const, label: t.accessFree },
    { type: 'vip' as const, label: t.accessVip },
    { type: 'ppv' as const, label: t.accessPpv },
  ];

  return (
    <div id="the-loai" className="w-full py-3.5 border-b border-[var(--border-color)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Horizontal Scrollable Category Pills with Touch Indicators */}
        <div className="relative -mx-3 px-3 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center justify-center select-none ${
                  selectedCategory === cat
                    ? 'bg-[#B83A26] text-[#F5EEE1] shadow-sm font-semibold scale-102'
                    : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]'
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Adaptive Access Type Toggle & Reset Action */}
        <div className="flex items-center justify-between sm:justify-start gap-2 flex-shrink-0 pt-1 md:pt-0">
          <div className="flex rounded-xl bg-[var(--bg-surface)] p-1 border border-[var(--border-color)] text-xs shadow-xs w-full sm:w-auto">
            {accessOptions.map(({ type, label }) => (
              <button
                key={type}
                onClick={() => setSelectedAccessType(type)}
                className={`flex-1 sm:flex-initial min-h-[34px] px-2 sm:px-3 py-1 rounded-lg font-medium cursor-pointer transition-colors text-center select-none text-[11px] sm:text-xs whitespace-nowrap ${
                  selectedAccessType === type
                    ? 'bg-[#B83A26] text-[#F5EEE1] shadow-xs font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="min-h-[38px] min-w-[38px] flex items-center justify-center p-2 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[#B83A26] hover:border-[#B83A26]/40 transition-colors cursor-pointer"
              title={t.resetFilters}
              aria-label={t.resetFilters}
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
