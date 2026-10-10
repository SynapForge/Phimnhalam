'use client';

import React, { useState, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Movie } from '@/types/movie';
import { useCinemaStore } from '@/store/cinema-store';
import { Play, Bookmark, Check, Sparkles, Clock } from 'lucide-react';

interface MovieCardProps {
  movie: Movie;
  onSelect?: (movie: Movie) => void;
  className?: string;
}

export const MovieCard: React.FC<MovieCardProps> = ({ movie, onSelect, className = '' }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { watchlist, toggleWatchlist } = useCinemaStore();

  const inWatchlist = watchlist.includes(movie.id);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(() => {});
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  const router = useRouter();

  const handleClick = () => {
    if (onSelect) {
      onSelect(movie);
    } else {
      router.push(`/movie/${movie.slug}`);
    }
  };

  const [imgError, setImgError] = useState(false);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className={`group relative w-full rounded-xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#E0A030] transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer select-none ${className}`}
    >
      {/* Media Box: Vertical Poster (9:16) + Hover Video Teaser */}
      <div className="relative aspect-[9/16] w-full overflow-hidden bg-black/40">
        {!imgError ? (
          <Image
            src={movie.posterUrl}
            alt={movie.title}
            fill
            sizes="(max-width: 640px) 176px, (max-width: 768px) 208px, 224px"
            className={`object-cover object-center transition-opacity duration-300 ${
              isHovered ? 'opacity-0' : 'opacity-100'
            }`}
            loading="lazy"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-b from-[#211D18] via-[#2a241f] to-[#171411] flex flex-col items-center justify-center p-3 text-center border-b border-[#B83A26]/30">
            <div className="w-10 h-10 rounded-full bg-[#B83A26]/20 border border-[#B83A26]/40 flex items-center justify-center text-[#E0A030] mb-2">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="font-lora text-xs font-bold text-[#F5EEE1] line-clamp-2 px-1">
              {movie.title}
            </span>
            <span className="text-[10px] text-[var(--text-muted)] mt-1 tracking-wide">
              Phim Nhà Làm AI
            </span>
          </div>
        )}

        {/* Teaser loop video on hover */}
        <video
          ref={videoRef}
          src={movie.teaserVideoUrl}
          muted
          loop
          playsInline
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />

        {/* Top Badges */}
        <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
              movie.accessType === 'vip'
                ? 'bg-[#E0A030] text-[#211D18] shadow-md animate-shimmer'
                : movie.accessType === 'ppv'
                ? 'bg-[#B83A26] text-[#F5EEE1]'
                : 'bg-emerald-600 text-[#F5EEE1]'
            }`}
          >
            {movie.accessType === 'vip' ? 'VIP' : movie.accessType === 'ppv' ? 'Vé 19K' : 'Free'}
          </span>
          <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-black/60 text-[#F5EEE1] backdrop-blur-xs">
            {movie.quality}
          </span>
        </div>

        {/* Quick Watchlist Bookmark Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWatchlist(movie.id);
          }}
          className="absolute top-2 right-2 z-10 p-1.5 rounded-full bg-black/50 hover:bg-[#B83A26] active:scale-90 text-[#F5EEE1] transition-transform duration-200"
          title="Lưu xem sau"
        >
          {inWatchlist ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
        </button>

        {/* Play Overlay Button on hover with cinema ease */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/35 pointer-events-none transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div
            className={`w-12 h-12 rounded-full bg-[#B83A26] text-[#F5EEE1] flex items-center justify-center shadow-2xl ring-2 ring-[#E0A030]/60 transition-transform duration-300 ease-out ${
              isHovered ? 'scale-100 rotate-0' : 'scale-75 -rotate-12'
            }`}
          >
            <Play className="w-4 h-4 fill-current ml-0.5" />
          </div>
        </div>
      </div>

      {/* Movie Details Bottom Bar */}
      <div className="p-3 space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {movie.duration}
          </span>
          <span className="text-[#E0A030] font-semibold">★ {movie.rating}</span>
        </div>

        <h3 className="font-lora text-sm font-bold text-[var(--text-primary)] group-hover:text-[#B83A26] transition-colors line-clamp-1">
          {movie.title}
        </h3>

        {/* AI Style & Main Model */}
        <div className="flex items-center gap-1.5 text-[10px] text-[var(--text-muted)]">
          <Sparkles className="w-3 h-3 text-[#E0A030]" />
          <span className="truncate">{movie.aiStyle}</span>
          <span>•</span>
          <span className="truncate">{movie.aiTools[0]}</span>
        </div>
      </div>
    </div>
  );
};
