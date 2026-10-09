'use client';

import React from 'react';
import { Movie } from '@/types/movie';
import { useCinemaStore } from '@/store/cinema-store';
import { Play, Bookmark, Check, Sparkles, Eye, Star, Volume2 } from 'lucide-react';

interface HeroSliderProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ movies, onSelectMovie }) => {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { watchlist, toggleWatchlist } = useCinemaStore();

  const featured = movies.filter((m) => m.isFeatured);
  const activeMovie = featured[currentIndex] || movies[0];

  const inWatchlist = watchlist.includes(activeMovie.id);

  return (
    <section className="relative w-full h-[75vh] min-h-[520px] max-h-[720px] overflow-hidden select-none">
      {/* Background Media: Backdrop image with cinema vignette */}
      <div className="absolute inset-0 z-0">
        <img
          src={activeMovie.backdropUrl}
          alt={activeMovie.title}
          className="w-full h-full object-cover object-center filter brightness-[0.65] contrast-[1.05] transition-all duration-700 scale-105"
        />
        {/* Dynamic Multi-stop Gradient Gradients for smooth blending into theme */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[rgba(33,29,24,0.4)] to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[rgba(33,29,24,0.7)] to-transparent w-full md:w-3/4" />
      </div>

      {/* Main Content Info */}
      <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-16">
        <div className="max-w-2xl space-y-4">
          {/* Badges: Quality, AI Style, Access */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded font-bold tracking-wide uppercase bg-[#B83A26] text-[#F5EEE1] shadow">
              {activeMovie.accessType === 'vip' ? 'Gói VIP' : activeMovie.accessType === 'ppv' ? 'Vé Lẻ PPV' : 'Miễn Phí'}
            </span>
            <span className="px-2.5 py-0.5 rounded font-semibold bg-[rgba(245,238,225,0.15)] text-[var(--text-primary)] border border-[var(--border-color)] backdrop-blur-sm">
              {activeMovie.quality}
            </span>
            <span className="px-2.5 py-0.5 rounded font-medium bg-[rgba(224,160,48,0.2)] text-[#E0A030] border border-[rgba(224,160,48,0.4)] flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              {activeMovie.aiStyle}
            </span>
            <span className="text-[var(--text-muted)] flex items-center gap-1 text-xs">
              <Eye className="w-3.5 h-3.5" />
              {activeMovie.views.toLocaleString()} lượt xem
            </span>
          </div>

          {/* Title in Lora font */}
          <h1 className="font-lora text-3xl sm:text-4xl md:text-5xl font-extrabold text-[var(--text-primary)] leading-tight drop-shadow-lg">
            {activeMovie.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-sm sm:text-base text-[#E0A030] font-medium italic">
            &ldquo;{activeMovie.tagline}&rdquo;
          </p>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed max-w-xl">
            {activeMovie.synopsis}
          </p>

          {/* AI Tools Tag List */}
          <div className="flex items-center gap-2 pt-1 text-[11px] text-[var(--text-muted)] flex-wrap">
            <span className="font-semibold text-[var(--text-secondary)]">AI Tools:</span>
            {activeMovie.aiTools.map((tool) => (
              <span
                key={tool}
                className="px-2 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] text-[var(--text-primary)]"
              >
                {tool}
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex items-center gap-4 pt-3">
            <button
              onClick={() => onSelectMovie(activeMovie)}
              className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-semibold text-sm shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Xem Ngay</span>
            </button>

            <button
              onClick={() => toggleWatchlist(activeMovie.id)}
              className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-sm transition-all duration-200 hover:border-[#E0A030] cursor-pointer"
            >
              {inWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>Đã Lưu</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>Xem Sau</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Carousel Pagination dots */}
        <div className="absolute right-4 sm:right-8 bottom-12 flex items-center gap-2 z-20">
          {featured.map((movie, idx) => (
            <button
              key={movie.id}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                currentIndex === idx
                  ? 'w-8 bg-[#E0A030]'
                  : 'w-2 bg-[rgba(245,238,225,0.3)] hover:bg-[rgba(245,238,225,0.6)]'
              }`}
              aria-label={`Chuyển đến phim ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
