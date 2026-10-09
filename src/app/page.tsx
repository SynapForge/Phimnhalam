'use client';

import React, { useMemo, useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSlider } from '@/components/movie/HeroSlider';
import { FilterBar } from '@/components/movie/FilterBar';
import { MovieRow } from '@/components/movie/MovieRow';
import { MovieCard } from '@/components/movie/MovieCard';
import { CinemaPlayerModal } from '@/components/player/CinemaPlayerModal';
import { PricingModal } from '@/components/pricing/PricingModal';
import { MOCK_MOVIES } from '@/data/mock-movies';
import { Movie } from '@/types/movie';
import { useCinemaStore } from '@/store/cinema-store';
import { Sparkles, Film, Heart } from 'lucide-react';

export default function HomePage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [pricingOpen, setPricingOpen] = useState(false);

  const {
    searchQuery,
    selectedCategory,
    selectedAIStyle,
    selectedAccessType,
  } = useCinemaStore();

  // Realtime Filter logic
  const filteredMovies = useMemo(() => {
    return MOCK_MOVIES.filter((movie) => {
      // 1. Search Query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = movie.title.toLowerCase().includes(q);
        const matchDirector = movie.director.toLowerCase().includes(q);
        const matchStyle = movie.aiStyle.toLowerCase().includes(q);
        const matchTool = movie.aiTools.some((t) => t.toLowerCase().includes(q));
        if (!matchTitle && !matchDirector && !matchStyle && !matchTool) {
          return false;
        }
      }

      // 2. Category
      if (selectedCategory !== 'Tất cả' && movie.category !== selectedCategory) {
        return false;
      }

      // 3. AI Style
      if (selectedAIStyle !== 'Tất cả' && movie.aiStyle !== selectedAIStyle) {
        return false;
      }

      // 4. Access Type
      if (selectedAccessType !== 'all' && movie.accessType !== selectedAccessType) {
        return false;
      }

      return true;
    });
  }, [searchQuery, selectedCategory, selectedAIStyle, selectedAccessType]);

  // Group movies by category for row carousels
  const coTrangMovies = MOCK_MOVIES.filter((m) => m.aiStyle === 'Cổ trang Dã sử');
  const cyberpunkMovies = MOCK_MOVIES.filter((m) => m.aiStyle === 'Cyberpunk Việt Nam');
  const animeMovies = MOCK_MOVIES.filter((m) => m.aiStyle === 'Anime Cinematic');
  const danGianMovies = MOCK_MOVIES.filter((m) => m.aiStyle === 'Dân gian & Sơn mài');

  const isFilteringActive =
    Boolean(searchQuery.trim()) ||
    selectedCategory !== 'Tất cả' ||
    selectedAIStyle !== 'Tất cả' ||
    selectedAccessType !== 'all';

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-300">
      {/* Schema.org Movie JSON-LD SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'MovieSeries',
            name: 'Phim Nhà Làm - AI Video Cinema',
            description: 'Nền tảng phim ngắn và điện ảnh sáng tạo bằng công nghệ AI thuần Việt.',
            genre: ['Sci-Fi', 'Historical', 'Animation', 'Horror'],
            inLanguage: 'vi',
          }),
        }}
      />

      {/* Top Navbar */}
      <Navbar />

      <main className="flex-1">
        {/* Hero 4K Cinema Slider */}
        <HeroSlider movies={MOCK_MOVIES} onSelectMovie={setSelectedMovie} />

        {/* Catalog Section with Realtime Multi-Filter */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
          <FilterBar />

          {/* Conditional View: Search / Filter Results Grid OR Categorized Rows */}
          {isFilteringActive ? (
            <section className="space-y-4 py-4">
              <div className="flex items-center justify-between">
                <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#B83A26]" />
                  <span>Kết Quả Tìm Kiếm & Lọc ({filteredMovies.length} phim)</span>
                </h2>
              </div>

              {filteredMovies.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                  {filteredMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} onSelect={setSelectedMovie} />
                  ))}
                </div>
              ) : (
                <div className="py-16 text-center space-y-2">
                  <p className="font-lora text-lg text-[var(--text-muted)]">
                    Không tìm thấy phim AI phù hợp với từ khóa hoặc tiêu chí đã chọn.
                  </p>
                  <p className="text-xs text-[var(--text-muted)]">
                    Hãy thử chọn lại &quot;Tất cả&quot; hoặc xóa bớt tiêu chí lọc.
                  </p>
                </div>
              )}
            </section>
          ) : (
            <div className="space-y-8">
              {/* Category Rows */}
              <MovieRow
                title="Phim Dã Sử & Cổ Trang AI"
                subtitle="Tái hiện trang phục, lăng tẩm và võ thuật Việt cổ qua prompt siêu thực"
                movies={coTrangMovies}
                onSelectMovie={setSelectedMovie}
                accentColor="#B83A26"
              />

              <MovieRow
                title="Cyberpunk Sài Gòn & Tương Lai"
                subtitle="Ánh đèn neon Chợ Lớn và xe bay tương lai qua mô hình Kling AI & Runway"
                movies={cyberpunkMovies}
                onSelectMovie={setSelectedMovie}
                accentColor="#E0A030"
              />

              <MovieRow
                title="Hoạt Hình & Anime AI"
                subtitle="Chất hoạt họa Niji phong cách Nhật Bản kết hợp bối cảnh làng quê Việt"
                movies={animeMovies}
                onSelectMovie={setSelectedMovie}
                accentColor="#B83A26"
              />

              <MovieRow
                title="Huyền Bí Dân Gian & Tranh Sơn Mài"
                subtitle="Không khí ma mị, huyền ảo lấy cảm hứng từ nét khắc gỗ và màu sơn cánh gián"
                movies={danGianMovies}
                onSelectMovie={setSelectedMovie}
                accentColor="#E0A030"
              />
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Video Cinema Player Modal (HLS.js / Fullscreen Mobile Gestures) */}
      {selectedMovie && (
        <CinemaPlayerModal
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
          onOpenPricing={() => setPricingOpen(true)}
        />
      )}

      {/* Commercial Pricing Modal (VIP + PPV + PayOS SSE Mockup) */}
      <PricingModal isOpen={pricingOpen} onClose={() => setPricingOpen(false)} />
    </div>
  );
}
