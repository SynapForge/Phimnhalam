'use client';

import React from 'react';
import { useCinemaStore } from '@/store/cinema-store';
import { MovieCategory, AIStyle, AccessType } from '@/types/movie';
import { Filter, Sparkles, Crown, RotateCcw } from 'lucide-react';

const CATEGORIES: MovieCategory[] = [
  'Tất cả',
  'Phim Ngắn AI',
  'Series Nhiều Tập',
  'Hoạt Hình & Anime',
  'Dân Gian Huyền Bí',
];

const AI_STYLES: (AIStyle | 'Tất cả')[] = [
  'Tất cả',
  'Cổ trang Dã sử',
  'Cyberpunk Việt Nam',
  'Anime Cinematic',
  'Dân gian & Sơn mài',
  'Photorealistic Cinema',
];

export const FilterBar: React.FC = () => {
  const {
    selectedCategory,
    setSelectedCategory,
    selectedAIStyle,
    setSelectedAIStyle,
    selectedAccessType,
    setSelectedAccessType,
    resetFilters,
  } = useCinemaStore();

  const isFiltered =
    selectedCategory !== 'Tất cả' ||
    selectedAIStyle !== 'Tất cả' ||
    selectedAccessType !== 'all';

  return (
    <div id="the-loai" className="w-full py-4 border-b border-[var(--border-color)]">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills (Unified & Clean, no redundant label text) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B83A26] text-[#F5EEE1] shadow-sm font-semibold'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Access Type Quick Switch: All / Free / VIP / PPV */}
        <div className="flex items-center gap-2 flex-shrink-0 self-start sm:self-auto">
          <div className="flex rounded-lg bg-[var(--bg-surface)] p-0.5 border border-[var(--border-color)] text-xs">
            {(['all', 'free', 'vip', 'ppv'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedAccessType(type)}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer transition-colors ${
                  selectedAccessType === type
                    ? 'bg-[#B83A26] text-[#F5EEE1] shadow-xs font-semibold'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {type === 'all' ? 'Tất cả' : type === 'free' ? 'Miễn phí' : type === 'vip' ? 'VIP' : 'Vé 19K'}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[#B83A26] transition-colors cursor-pointer"
              title="Đặt lại bộ lọc"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
