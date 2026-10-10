'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MOCK_MOVIES } from '@/data/mock-movies';
import { Navbar } from '@/components/layout/Navbar';
import { MovieCard } from '@/components/movie/MovieCard';
import { CinemaPlayerModal } from '@/components/player/CinemaPlayerModal';
import { PricingModal } from '@/components/pricing/PricingModal';
import { useCinemaStore } from '@/store/cinema-store';
import {
  Play,
  Bookmark,
  Check,
  Star,
  Eye,
  Share2,
  ChevronLeft,
  Film,
  Sparkles
} from 'lucide-react';

export default function MovieDetailPage() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const movie = MOCK_MOVIES.find((m) => m.slug === slug || m.id === slug) || MOCK_MOVIES[0];
  const relatedMovies = MOCK_MOVIES.filter((m) => m.id !== movie.id).slice(0, 8);

  const { watchlist, toggleWatchlist } = useCinemaStore();
  const inWatchlist = watchlist.includes(movie.id);

  const [isPlaying, setIsPlaying] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [selectedEpisodeIdx, setSelectedEpisodeIdx] = useState(0);

  // Generate full episodes list for drama (mocking all chapter parts)
  const totalEpisodesCount = parseInt(movie.duration) || 30;
  const episodesList = Array.from({ length: Math.min(totalEpisodesCount, 40) }, (_, i) => ({
    id: `ep-${i + 1}`,
    episodeNumber: i + 1,
    title: `Tập ${i + 1}: ${i === 0 ? 'Khởi đầu định mệnh' : i === 1 ? 'Biến cố bất ngờ' : i === 2 ? 'Lật bài ngửa' : `Tình tiết tập ${i + 1}`}`,
    duration: '2-3 phút',
    isFree: i < 3, // First 3 episodes free, rest VIP
  }));

  const handleShare = () => {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({
        title: movie.title,
        text: movie.synopsis,
        url: window.location.href,
      }).catch(() => {});
    } else if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      alert('Đã sao chép liên kết phim vào bộ nhớ tạm!');
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col">
      <Navbar />

      <main className="flex-1 pb-16">
        {/* Breadcrumb Back Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-2">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[#B83A26] transition-colors cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Quay lại trang chủ</span>
          </button>
        </div>

        {/* Hero Section: 9:16 Cinema Detail Header */}
        <div className="relative w-full border-b border-[var(--border-color)] overflow-hidden py-6 sm:py-10">
          {/* Ambient Backdrop Blur */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <Image
              src={movie.posterUrl}
              alt={movie.title}
              fill
              priority
              sizes="100vw"
              className="object-cover filter blur-3xl opacity-20 scale-125"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-[var(--bg-primary)]/80 to-[var(--bg-primary)]/50" />
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-12">
              
              {/* Left: 9:16 Vertical Poster Spotlight */}
              <div className="flex-shrink-0 group relative w-56 sm:w-64 md:w-72 aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl border-2 border-[var(--border-color)] bg-black/90">
                <Image
                  src={movie.posterUrl}
                  alt={movie.title}
                  fill
                  priority
                  sizes="(max-width: 640px) 224px, (max-width: 768px) 256px, 288px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Play Button Overlay */}
                <div
                  onClick={() => router.push(`/watch/${movie.slug}?ep=1`)}
                  className="absolute inset-0 flex items-center justify-center cursor-pointer group-hover:bg-black/30 transition-colors"
                >
                  <div className="w-16 h-16 rounded-full bg-[#B83A26]/90 group-hover:bg-[#B83A26] text-[#F5EEE1] flex items-center justify-center shadow-2xl transform group-hover:scale-110 active:scale-95 transition-all">
                    <Play className="w-7 h-7 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Badge on Poster */}
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      movie.accessType === 'vip'
                        ? 'bg-[#E0A030] text-[#211D18]'
                        : movie.accessType === 'ppv'
                        ? 'bg-[#B83A26] text-[#F5EEE1]'
                        : 'bg-emerald-600 text-[#F5EEE1]'
                    }`}
                  >
                    {movie.accessType === 'vip' ? 'Gói VIP' : movie.accessType === 'ppv' ? 'Vé Lẻ PPV' : 'Miễn Phí'}
                  </span>
                </div>
              </div>

              {/* Right: Detailed Metadata & Synopsis */}
              <div className="flex-1 space-y-4 text-left">
                {/* Quality & Rating Tags */}
                <div className="flex flex-wrap items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full font-semibold bg-[rgba(245,238,225,0.15)] text-[var(--text-primary)] border border-[var(--border-color)]">
                    {movie.quality}
                  </span>
                  <span className="flex items-center gap-1 text-[#E0A030] font-bold text-xs bg-[rgba(224,160,48,0.15)] px-2.5 py-0.5 rounded-full border border-[rgba(224,160,48,0.3)]">
                    <Star className="w-3.5 h-3.5 fill-[#E0A030]" />
                    {movie.rating} / 10
                  </span>
                  <span className="text-[var(--text-muted)]">
                    • {movie.duration}
                  </span>
                  <span className="text-[var(--text-muted)] flex items-center gap-1" suppressHydrationWarning>
                    • <Eye className="w-3.5 h-3.5" />
                    {movie.views.toLocaleString('vi-VN')} lượt xem
                  </span>
                </div>

                {/* Movie Title */}
                <h1 className="font-lora text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] leading-tight">
                  {movie.title}
                </h1>

                {/* Tagline */}
                {movie.tagline && (
                  <p className="text-sm sm:text-base text-[#E0A030] font-medium italic">
                    &ldquo;{movie.tagline}&rdquo;
                  </p>
                )}

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 py-2 text-xs border-y border-[var(--border-color)]">
                  <div>
                    <span className="text-[var(--text-muted)] block">Thể loại:</span>
                    <span className="font-medium text-[var(--text-primary)]">{movie.category}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block">Đạo diễn / Studio:</span>
                    <span className="font-medium text-[var(--text-primary)]">{movie.director}</span>
                  </div>
                  <div>
                    <span className="text-[var(--text-muted)] block">Độ tuổi:</span>
                    <span className="font-medium text-[var(--text-primary)]">{movie.ageRating}</span>
                  </div>
                </div>

                {/* Synopsis */}
                <div className="space-y-1.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">
                    Tóm Tắt Nội Dung
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    {movie.synopsis}
                  </p>
                </div>

                {/* Action CTAs */}
                <div className="flex flex-wrap items-center gap-3 pt-3">
                  <button
                    onClick={() => router.push(`/watch/${movie.slug}?ep=1`)}
                    className="flex items-center gap-2 px-8 py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-sm shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Xem Tập 1 Ngay</span>
                  </button>

                  <button
                    onClick={() => toggleWatchlist(movie.id)}
                    className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-primary)] font-medium text-xs sm:text-sm transition-all duration-200 hover:border-[#E0A030] cursor-pointer"
                  >
                    {inWatchlist ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span>Đã Lưu Vào Rạp</span>
                      </>
                    ) : (
                      <>
                        <Bookmark className="w-4 h-4" />
                        <span>Lưu Xem Sau</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleShare}
                    className="p-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
                    title="Chia sẻ phim"
                  >
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Content Section: Episodes Grid & Related Movies */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
          
          {/* Episodes Selection Section */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                  <Film className="w-5 h-5 text-[#B83A26]" />
                  <span>Danh Sách Tập Phim ({totalEpisodesCount} tập)</span>
                </h2>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Miễn phí 3 tập đầu tiên • Mở khóa VIP để xem trọn bộ không quảng cáo
                </p>
              </div>

              {movie.accessType !== 'free' && (
                <button
                  onClick={() => setPricingOpen(true)}
                  className="hidden sm:flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#E0A030] text-[#211D18] font-bold text-xs shadow hover:bg-[#d09020] transition-colors cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mở Khóa Toàn Bộ Tập</span>
                </button>
              )}
            </div>

            {/* Episodes Number Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 pt-2">
              {episodesList.map((ep, idx) => (
                <div
                  key={ep.id}
                  onClick={() => {
                    setSelectedEpisodeIdx(idx);
                    if (ep.isFree) {
                      router.push(`/watch/${movie.slug}?ep=${idx + 1}`);
                    } else {
                      setPricingOpen(true);
                    }
                  }}
                  className={`p-3 rounded-xl border cursor-pointer transition-all ${
                    selectedEpisodeIdx === idx
                      ? 'border-[#E0A030] bg-[rgba(224,160,48,0.12)]'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] hover:border-[#B83A26] hover:bg-[var(--bg-surface-elevated)]'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-[var(--text-primary)]">{ep.title.split(':')[0]}</span>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded ${
                        ep.isFree ? 'bg-emerald-600/20 text-emerald-400' : 'bg-[#E0A030]/20 text-[#E0A030]'
                      }`}
                    >
                      {ep.isFree ? 'Miễn phí' : 'VIP'}
                    </span>
                  </div>
                  <p className="text-[11px] text-[var(--text-muted)] truncate mt-1">
                    {ep.title.split(':')[1] || ep.duration}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Related Recommended Movies */}
          <section className="space-y-4 pt-6 border-t border-[var(--border-color)]">
            <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
              Phim Tương Tự Đề Xuất
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
              {relatedMovies.map((relMovie) => (
                <Link
                  key={relMovie.id}
                  href={`/movie/${relMovie.slug}`}
                  className="block"
                >
                  <MovieCard movie={relMovie} onSelect={() => router.push(`/movie/${relMovie.slug}`)} />
                </Link>
              ))}
            </div>
          </section>

        </div>
      </main>

      {/* Video Cinema Player Modal (9:16 Vertical) */}
      {isPlaying && (
        <CinemaPlayerModal
          movie={movie}
          onClose={() => setIsPlaying(false)}
          onOpenPricing={() => setPricingOpen(true)}
        />
      )}

      {/* Pricing Upgrade Modal */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />
    </div>
  );
}
