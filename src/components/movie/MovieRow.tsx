'use client';

import React from 'react';
import { Movie } from '@/types/movie';
import { MovieCard } from '@/components/movie/MovieCard';
import { ChevronRight } from 'lucide-react';

interface MovieRowProps {
  title: string;
  subtitle?: string;
  movies: Movie[];
  onSelectMovie: (movie: Movie) => void;
  accentColor?: string;
}

export const MovieRow: React.FC<MovieRowProps> = ({
  title,
  subtitle,
  movies,
  onSelectMovie,
  accentColor = '#B83A26',
}) => {
  if (movies.length === 0) return null;

  return (
    <section className="w-full space-y-3 py-4">
      {/* Row Header */}
      <div className="flex items-end justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-4.5 rounded-full" style={{ backgroundColor: accentColor }} />
            <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              {title}
            </h2>
          </div>
          {subtitle && (
            <p className="text-xs text-[var(--text-muted)] mt-0.5 ml-3.5">
              {subtitle}
            </p>
          )}
        </div>

        <button className="flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[#B83A26] transition-colors cursor-pointer font-medium">
          <span>Xem tất cả ({movies.length})</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Horizontal Carousel List */}
      <div className="flex items-center gap-4 overflow-x-auto pb-4 pt-1 scrollbar-thin scrollbar-thumb-[var(--border-color)]">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onSelect={onSelectMovie} />
        ))}
      </div>
    </section>
  );
};
