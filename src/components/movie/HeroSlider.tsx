'use client';

import React, { useEffect, useState, useMemo } from 'react';
import { Movie } from '@/types/movie';
import { useCinemaStore } from '@/store/cinema-store';
import { Play, Bookmark, Check, Eye, ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface HeroSliderProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({ movies, onSelectMovie }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const { watchlist, toggleWatchlist } = useCinemaStore();

  const featured = useMemo(() => {
    const list = movies.filter((m) => m.isFeatured);
    return list.length >= 3 ? list : movies.slice(0, 7);
  }, [movies]);

  const activeMovie = featured[currentIndex] || movies[0];
  const inWatchlist = watchlist.includes(activeMovie.id);

  // Auto-slide every 5 seconds (5000ms), pauses when hovered
  useEffect(() => {
    if (featured.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % featured.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [featured.length, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + featured.length) % featured.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % featured.length);
  };

  // Build 3 relative card slots for right-hand showcase: [-1 (prev), 0 (active), +1 (next)]
  const slots = useMemo(() => {
    const n = featured.length;
    return [-1, 0, 1].map((offset) => {
      const idx = (currentIndex + offset + n * 10) % n;
      return {
        offset,
        movie: featured[idx],
        idx,
      };
    });
  }, [currentIndex, featured]);

  return (
    <section
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full h-[65vh] min-h-[460px] max-h-[620px] overflow-hidden select-none bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center"
    >
      {/* Ambient background glow from the active movie poster */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={activeMovie.posterUrl}
          alt={activeMovie.title}
          className="w-full h-full object-cover filter blur-3xl opacity-25 scale-125 transition-all duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10 py-6">
        
        {/* LEFT COLUMN (50% - 55%): Comprehensive Movie Info & CTAs */}
        <div className="w-full md:w-[55%] flex flex-col justify-center space-y-3 sm:space-y-4 text-left z-20">
          
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-3 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px] shadow-sm ${
                activeMovie.accessType === 'vip'
                  ? 'bg-[#E0A030] text-[#211D18]'
                  : activeMovie.accessType === 'ppv'
                  ? 'bg-[#B83A26] text-[#F5EEE1]'
                  : 'bg-emerald-600 text-[#F5EEE1]'
              }`}
            >
              {activeMovie.accessType === 'vip' ? 'Gói VIP' : activeMovie.accessType === 'ppv' ? 'Vé Lẻ PPV' : 'Miễn Phí'}
            </span>

            <span className="px-2.5 py-0.5 rounded-full font-semibold bg-[rgba(245,238,225,0.15)] text-[var(--text-primary)] border border-[var(--border-color)] backdrop-blur-sm text-[11px]">
              {activeMovie.quality}
            </span>

            <span className="flex items-center gap-1 text-[#E0A030] font-bold text-xs bg-[rgba(224,160,48,0.15)] px-2.5 py-0.5 rounded-full border border-[rgba(224,160,48,0.3)]">
              <Star className="w-3.5 h-3.5 fill-[#E0A030]" />
              {activeMovie.rating}
            </span>

            <span className="text-[var(--text-muted)] text-xs">
              • {activeMovie.duration}
            </span>

            <span className="text-[var(--text-muted)] flex items-center gap-1 text-xs" suppressHydrationWarning>
              • <Eye className="w-3.5 h-3.5" />
              {activeMovie.views.toLocaleString('vi-VN')} lượt xem
            </span>
          </div>

          {/* Title */}
          <h1 className="font-lora text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.15] drop-shadow-md line-clamp-2">
            {activeMovie.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-[#E0A030] font-medium italic line-clamp-1">
            &ldquo;{activeMovie.tagline}&rdquo;
          </p>

          {/* Synopsis */}
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] line-clamp-3 leading-relaxed max-w-xl">
            {activeMovie.synopsis}
          </p>

          {/* CTAs Buttons */}
          <div className="flex items-center gap-3 pt-2">
            <button
              onClick={() => onSelectMovie(activeMovie)}
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs sm:text-sm shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>Xem Phim Ngay</span>
            </button>

            <button
              onClick={() => toggleWatchlist(activeMovie.id)}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-xs sm:text-sm transition-all duration-200 hover:border-[#E0A030] cursor-pointer"
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

          {/* Carousel Navigation & Indicators */}
          <div className="flex items-center gap-4 pt-3">
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrev}
                className="p-2 rounded-full bg-[var(--bg-surface)] hover:bg-[#B83A26] hover:text-[#F5EEE1] text-[var(--text-muted)] border border-[var(--border-color)] transition-all cursor-pointer"
                aria-label="Phim trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                className="p-2 rounded-full bg-[var(--bg-surface)] hover:bg-[#B83A26] hover:text-[#F5EEE1] text-[var(--text-muted)] border border-[var(--border-color)] transition-all cursor-pointer"
                aria-label="Phim tiếp theo"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {featured.map((movie, idx) => (
                <button
                  key={movie.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                    currentIndex === idx
                      ? 'w-7 bg-[#E0A030]'
                      : 'w-2 bg-[rgba(245,238,225,0.25)] hover:bg-[rgba(245,238,225,0.6)]'
                  }`}
                  aria-label={`Chuyển đến phim ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (45% - 50%): 3D Layered 9:16 Showcase Deck */}
        <div className="w-full md:w-[45%] h-full flex items-center justify-center relative min-h-[280px]">
          <div className="relative w-full max-w-sm sm:max-w-md h-full flex items-center justify-center">
            {slots.map(({ offset, movie, idx }) => {
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let zIndex = 10;
              let scaleClass = 'scale-85 opacity-60 hover:opacity-90';
              let translateClass = '';
              let heightClass = 'h-[250px] sm:h-[300px] md:h-[340px]';

              if (isCenter) {
                zIndex = 30;
                scaleClass = 'scale-100 opacity-100 ring-4 ring-[#E0A030] shadow-[0_20px_60px_rgba(224,160,48,0.4)]';
                heightClass = 'h-[300px] sm:h-[360px] md:h-[400px]';
                translateClass = 'translate-x-0 z-30';
              } else if (isLeft) {
                zIndex = 15;
                translateClass = '-translate-x-[45%] sm:-translate-x-[55%] -rotate-3 z-15';
              } else if (isRight) {
                zIndex = 15;
                translateClass = 'translate-x-[45%] sm:translate-x-[55%] rotate-3 z-15';
              }

              return (
                <div
                  key={`${movie.id}-${offset}`}
                  onClick={() => {
                    if (isCenter) {
                      onSelectMovie(movie);
                    } else {
                      setCurrentIndex(idx);
                    }
                  }}
                  style={{ zIndex }}
                  className={`absolute transition-all duration-500 ease-out cursor-pointer select-none ${translateClass}`}
                >
                  <div
                    className={`relative ${heightClass} aspect-[9/16] rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-[var(--border-color)] bg-black/90 transition-all duration-500 ${scaleClass}`}
                  >
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-full h-full object-cover object-center"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                    {/* Center Card Play Button & Title */}
                    {isCenter ? (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-[#B83A26]/90 hover:bg-[#B83A26] text-[#F5EEE1] flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all">
                            <Play className="w-5 sm:w-7 h-5 sm:h-7 fill-current ml-0.5" />
                          </div>
                        </div>

                        <div className="absolute bottom-3 inset-x-3 text-center">
                          <p className="font-lora text-xs sm:text-sm font-bold text-[#F5EEE1] truncate drop-shadow">
                            {movie.title}
                          </p>
                          <span className="text-[10px] text-[#E0A030] font-medium">
                            Chạm để xem ngay
                          </span>
                        </div>
                      </>
                    ) : (
                      /* Preview title on side cards */
                      <div className="absolute bottom-2 inset-x-2 text-center">
                        <p className="text-[10px] font-medium text-[var(--text-secondary)] truncate">
                          {movie.title}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
