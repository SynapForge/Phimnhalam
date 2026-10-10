"use client";

import React, { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { Movie } from "@/types/movie";
import { useCinemaStore } from "@/store/cinema-store";
import { DICTIONARY } from "@/types/i18n";
import {
  Play,
  Bookmark,
  Check,
  ChevronLeft,
  ChevronRight,
  Star,
  Eye,
} from "lucide-react";

interface HeroSliderProps {
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  movies,
  onSelectMovie,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  const { watchlist, toggleWatchlist, language } = useCinemaStore();
  const t = DICTIONARY[language];

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

  // Touch Swipe Handlers for mobile gestures
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEndX(null);
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (touchStartX === null || touchEndX === null) return;
    const distance = touchStartX - touchEndX;
    if (distance > 45) {
      handleNext();
    } else if (distance < -45) {
      handlePrev();
    }
    setTouchStartX(null);
    setTouchEndX(null);
  };

  // Build 3 relative card slots: [-1 (prev), 0 (active), +1 (next)]
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
      className="relative w-full min-h-[490px] max-h-[580px] h-[66vh] md:h-[65vh] md:min-h-[460px] md:max-h-[620px] overflow-hidden select-none bg-[var(--bg-primary)] border-b border-[var(--border-color)] flex items-center"
    >
      {/* Ambient background glow from the active movie poster with slow Ken-burns effect */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <Image
          src={activeMovie.posterUrl}
          alt={activeMovie.title}
          fill
          priority
          sizes="100vw"
          className="object-cover filter blur-3xl opacity-30 scale-125 transition-all duration-1000 animate-kenburns"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]/60" />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-[var(--bg-primary)]/40" />
      </div>

      {/* ========================================================= */}
      {/* 1. MOBILE RESPONSIVE LAYOUT (< 768px): App-Native Showcase */}
      {/* ========================================================= */}
      <div
        className="md:hidden relative z-10 w-full h-full flex flex-col justify-between py-3 px-3 select-none"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* 3D Spotlight Poster Deck (Center card prominent, side peek blurred without text) */}
        <div className="relative w-full flex items-center justify-center py-1 my-auto">
          {/* Left Peek (Prev) */}
          <div
            onClick={handlePrev}
            className="absolute left-2 xs:left-5 w-[85px] h-[150px] xs:w-[98px] xs:h-[172px] rounded-xl overflow-hidden opacity-35 scale-90 blur-[0.5px] cursor-pointer transition-all duration-300 -rotate-6 z-10"
            aria-label="Phim trước"
          >
            <Image
              src={slots[0].movie.posterUrl}
              alt=""
              fill
              sizes="100px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>

          {/* Center Active Poster Card (Main) */}
          <div
            onClick={() => onSelectMovie(activeMovie)}
            className="relative z-20 w-[140px] h-[240px] xs:w-[155px] xs:h-[265px] rounded-2xl overflow-hidden border-2 border-[#E0A030] ring-4 ring-[#E0A030]/20 shadow-[0_16px_40px_rgba(224,160,48,0.35)] cursor-pointer transition-all duration-300 active:scale-95 group"
          >
            <Image
              src={activeMovie.posterUrl}
              alt={activeMovie.title}
              fill
              priority
              sizes="170px"
              className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

            {/* Top Badge on Card */}
            <div className="absolute top-2 left-2 flex items-center gap-1">
              <span
                className={`px-2 py-0.5 rounded-full font-bold uppercase tracking-wider text-[9px] shadow-sm ${
                  activeMovie.accessType === "vip"
                    ? "bg-[#E0A030] text-[#211D18]"
                    : activeMovie.accessType === "ppv"
                      ? "bg-[#B83A26] text-[#F5EEE1]"
                      : "bg-emerald-600 text-[#F5EEE1]"
                }`}
              >
                {activeMovie.accessType === "vip"
                  ? "VIP"
                  : activeMovie.accessType === "ppv"
                    ? "PPV"
                    : "Miễn Phí"}
              </span>
            </div>

            {/* Center Play Button */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-[#B83A26]/90 text-[#F5EEE1] flex items-center justify-center shadow-xl group-hover:scale-110 active:scale-95 transition-all">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </div>
            </div>

            {/* Bottom hint - Clean, NO duplicate movie title */}
            <div className="absolute bottom-2 inset-x-2 text-center">
              <span className="text-[10px] text-[#E0A030] font-semibold tracking-wide drop-shadow">
                Chạm để xem
              </span>
            </div>
          </div>

          {/* Right Peek (Next) */}
          <div
            onClick={handleNext}
            className="absolute right-2 xs:right-5 w-[85px] h-[150px] xs:w-[98px] xs:h-[172px] rounded-xl overflow-hidden opacity-35 scale-90 blur-[0.5px] cursor-pointer transition-all duration-300 rotate-6 z-10"
            aria-label="Phim tiếp theo"
          >
            <Image
              src={slots[2].movie.posterUrl}
              alt=""
              fill
              sizes="100px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
          </div>
        </div>

        {/* Compact Metadata & Action Buttons Block */}
        <div className="w-full flex flex-col items-center text-center space-y-2 pt-1 pb-2">
          {/* Movie Title (Single prominent line, no clash) */}
          <h1 className="font-lora text-xl xs:text-2xl font-extrabold text-[var(--text-primary)] leading-tight drop-shadow line-clamp-1 px-2">
            {activeMovie.title}
          </h1>

          {/* Badges Row */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 text-[11px]">
            <span className="px-2 py-0.5 rounded-full font-semibold bg-[rgba(245,238,225,0.15)] text-[var(--text-primary)] border border-[var(--border-color)]">
              {activeMovie.quality}
            </span>
            <span className="flex items-center gap-1 text-[#E0A030] font-bold bg-[rgba(224,160,48,0.15)] px-2 py-0.5 rounded-full border border-[rgba(224,160,48,0.3)]">
              <Star className="w-3 h-3 fill-[#E0A030]" />
              {activeMovie.rating}
            </span>
            <span className="text-[var(--text-muted)]">
              • {activeMovie.duration}
            </span>
            <span
              className="text-[var(--text-muted)] flex items-center gap-0.5"
              suppressHydrationWarning
            >
              • <Eye className="w-3 h-3" />
              {activeMovie.views.toLocaleString("vi-VN")}
            </span>
          </div>

          {/* Tagline */}
          {activeMovie.tagline && (
            <p className="text-xs text-[#E0A030] font-medium italic line-clamp-1 px-4 max-w-sm">
              &ldquo;{activeMovie.tagline}&rdquo;
            </p>
          )}

          {/* Action CTAs */}
          <div className="flex items-center justify-center gap-2.5 w-full max-w-xs pt-0.5 px-2">
            <button
              onClick={() => onSelectMovie(activeMovie)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs shadow-lg transition-all active:scale-95 cursor-pointer glow-gold"
            >
              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
              <span>{t.heroWatchNow}</span>
            </button>

            <button
              onClick={() => toggleWatchlist(activeMovie.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-xs transition-all active:scale-95 cursor-pointer"
            >
              {inWatchlist ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.heroSaved}</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{t.heroSave}</span>
                </>
              )}
            </button>
          </div>

          {/* Dots Indicator (No clumsy floating arrows on mobile) */}
          <div className="flex items-center justify-center gap-1.5 pt-1">
            {featured.map((movie, idx) => (
              <button
                key={movie.id}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? "w-6 bg-[#E0A030]"
                    : "w-1.5 bg-[rgba(245,238,225,0.25)]"
                }`}
                aria-label={`Chuyển đến phim ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. DESKTOP SPLIT LAYOUT (>= 768px): Cinematic 2-Column Deck */}
      {/* ========================================================= */}
      <div className="hidden md:flex relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full h-full items-center justify-between gap-6 md:gap-10 py-6">
        {/* LEFT COLUMN (55%): Comprehensive Movie Info & CTAs */}
        <div className="w-[55%] flex flex-col justify-center space-y-3 sm:space-y-4 text-left z-20">
          {/* Top Badges */}
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span
              className={`px-3 py-0.5 rounded-full font-bold uppercase tracking-wider text-[11px] shadow-sm ${
                activeMovie.accessType === "vip"
                  ? "bg-[#E0A030] text-[#211D18]"
                  : activeMovie.accessType === "ppv"
                    ? "bg-[#B83A26] text-[#F5EEE1]"
                    : "bg-emerald-600 text-[#F5EEE1]"
              }`}
            >
              {activeMovie.accessType === "vip"
                ? "Gói VIP"
                : activeMovie.accessType === "ppv"
                  ? "Vé Lẻ PPV"
                  : "Miễn Phí"}
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

            <span
              className="text-[var(--text-muted)] flex items-center gap-1 text-xs"
              suppressHydrationWarning
            >
              • <Eye className="w-3.5 h-3.5" />
              {activeMovie.views.toLocaleString("vi-VN")} lượt xem
            </span>
          </div>

          {/* Title */}
          <h1 className="font-lora text-3xl lg:text-5xl font-extrabold text-[var(--text-primary)] leading-[1.15] drop-shadow-md line-clamp-2">
            {activeMovie.title}
          </h1>

          {/* Tagline / Subtitle */}
          <p className="text-sm md:text-base text-[#E0A030] font-medium italic line-clamp-1">
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
              className="flex items-center gap-2 px-6 sm:px-8 py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs sm:text-sm shadow-xl transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer glow-gold animate-shimmer"
            >
              <Play className="w-4 h-4 fill-current ml-0.5" />
              <span>{t.heroWatchNow}</span>
            </button>

            <button
              onClick={() => toggleWatchlist(activeMovie.id)}
              className="flex items-center gap-2 px-5 sm:px-6 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-xs sm:text-sm transition-all duration-200 hover:border-[#E0A030] cursor-pointer"
            >
              {inWatchlist ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span>{t.heroSaved}</span>
                </>
              ) : (
                <>
                  <Bookmark className="w-4 h-4" />
                  <span>{t.heroSave}</span>
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
                      ? "w-7 bg-[#E0A030]"
                      : "w-2 bg-[rgba(245,238,225,0.25)] hover:bg-[rgba(245,238,225,0.6)]"
                  }`}
                  aria-label={`Chuyển đến phim ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN (45%): 3D Layered 9:16 Showcase Deck */}
        <div className="w-[45%] h-full flex items-center justify-center relative min-h-[300px]">
          <div className="relative w-full max-w-sm sm:max-w-md h-full flex items-center justify-center">
            {slots.map(({ offset, movie, idx }) => {
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;

              let zIndex = 10;
              let scaleClass = "scale-85 opacity-60 hover:opacity-90";
              let translateClass = "";
              const heightClass = isCenter
                ? "h-[360px] md:h-[400px]"
                : "h-[300px] md:h-[340px]";

              if (isCenter) {
                zIndex = 30;
                scaleClass =
                  "scale-100 opacity-100 ring-4 ring-[#E0A030] shadow-[0_20px_60px_rgba(224,160,48,0.4)]";
                translateClass = "translate-x-0 z-30";
              } else if (isLeft) {
                zIndex = 15;
                translateClass =
                  "-translate-x-[50%] sm:-translate-x-[55%] -rotate-3 z-15";
              } else if (isRight) {
                zIndex = 15;
                translateClass =
                  "translate-x-[50%] sm:translate-x-[55%] rotate-3 z-15";
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
                    <Image
                      src={movie.posterUrl}
                      alt={movie.title}
                      fill
                      sizes="280px"
                      priority={isCenter}
                      className="object-cover object-center"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/20" />

                    {/* Center Card Play Button & Title */}
                    {isCenter ? (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-[#B83A26]/90 hover:bg-[#B83A26] text-[#F5EEE1] flex items-center justify-center shadow-2xl transform hover:scale-110 active:scale-95 transition-all">
                            <Play className="w-6 md:w-7 h-6 md:h-7 fill-current ml-0.5" />
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
                      /* Side cards: subtle preview */
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
