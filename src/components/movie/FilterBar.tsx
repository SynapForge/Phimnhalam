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
    <div id="the-loai" className="w-full space-y-4 py-6 border-b border-[var(--border-color)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-[var(--text-muted)] flex items-center gap-1.5 mr-1 flex-shrink-0">
            <Filter className="w-3.5 h-3.5 text-[#E0A030]" />
            <span>Thể loại:</span>
          </span>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#B83A26] text-[#F5EEE1] shadow-sm'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Access Type Filter: All / Free / VIP / PPV */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-[var(--text-muted)] font-medium">Quyền xem:</span>
          <div className="flex rounded-lg bg-[var(--bg-surface)] p-0.5 border border-[var(--border-color)] text-xs">
            {(['all', 'free', 'vip', 'ppv'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setSelectedAccessType(type)}
                className={`px-2.5 py-1 rounded-md font-medium capitalize cursor-pointer transition-colors ${
                  selectedAccessType === type
                    ? 'bg-[var(--bg-primary)] text-[var(--text-primary)] shadow-xs'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                {type === 'all' ? 'Tất cả' : type === 'free' ? 'Free' : type === 'vip' ? 'VIP' : 'Vé 19K'}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              onClick={resetFilters}
              className="p-1.5 rounded-md text-[var(--text-muted)] hover:text-[#B83A26] transition-colors"
              title="Đặt lại bộ lọc"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* AI Style Chip Row */}
      <div id="ai-styles" className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none text-xs">
        <span className="text-xs font-medium text-[var(--text-muted)] flex items-center gap-1 mr-1 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-[#E0A030]" />
          <span>Phong cách AI:</span>
        </span>
        {AI_STYLES.map((style) => (
          <button
            key={style}
            onClick={() => setSelectedAIStyle(style)}
            className={`px-3 py-1 rounded-md whitespace-nowrap text-xs transition-colors cursor-pointer border ${
              selectedAIStyle === style
                ? 'bg-[rgba(224,160,48,0.2)] border-[#E0A030] text-[#E0A030] font-semibold'
                : 'border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] bg-[var(--bg-surface)]'
            }`}
          >
            {style}
          </button>
        ))}
      </div>
    </div>
  );
};
