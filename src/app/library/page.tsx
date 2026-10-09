'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { MovieCard } from '@/components/movie/MovieCard';
import { useCinemaStore } from '@/store/cinema-store';
import { MOCK_MOVIES } from '@/data/mock-movies';
import {
  Bookmark,
  History,
  Trash2,
  Play,
  Clock,
  Sparkles,
  Film,
  CheckCircle2,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

export default function LibraryPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'watchlist' | 'history'>('watchlist');

  const {
    watchlist,
    toggleWatchlist,
    clearWatchlist,
    watchHistory,
    removeFromHistory,
    clearWatchHistory,
  } = useCinemaStore();

  // Map IDs to full Movie objects
  const watchlistMovies = MOCK_MOVIES.filter((m) => watchlist.includes(m.id));

  const historyItems = watchHistory
    .map((item) => {
      const movie = MOCK_MOVIES.find((m) => m.id === item.movieId);
      return movie ? { ...item, movie } : null;
    })
    .filter(Boolean) as {
    movieId: string;
    timestamp: number;
    progressSeconds: number;
    episode?: number;
    movie: (typeof MOCK_MOVIES)[0];
  }[];

  const formatTimeAgo = (time: number) => {
    const diff = Math.floor((Date.now() - time) / 60000); // minutes
    if (diff < 1) return 'Vừa xem';
    if (diff < 60) return `${diff} phút trước`;
    const hours = Math.floor(diff / 60);
    if (hours < 24) return `${hours} giờ trước`;
    return `${Math.floor(hours / 24)} ngày trước`;
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10 w-full space-y-6">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--border-color)] pb-6">
          <div>
            <h1 className="font-lora text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[var(--text-primary)] flex items-center gap-3">
              <span className="w-2.5 h-8 rounded-full bg-[#B83A26]" />
              <span>Tủ Phim Của Bạn</span>
            </h1>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] mt-1.5 ml-5.5">
              Quản lý danh sách các bộ phim lưu xem sau và theo dõi tiến trình lịch sử tập phim đã xem.
            </p>
          </div>

          {/* Action Tabs Switcher */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
            <button
              onClick={() => setActiveTab('watchlist')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'watchlist'
                  ? 'bg-[#B83A26] text-[#F5EEE1] shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Xem Sau ({watchlistMovies.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'history'
                  ? 'bg-[#E0A030] text-[#211D18] shadow-md'
                  : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <History className="w-3.5 h-3.5" />
              <span>Lịch Sử Xem ({historyItems.length})</span>
            </button>
          </div>
        </div>

        {/* TAB 1: WATCHLIST SECTION */}
        {activeTab === 'watchlist' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-lora text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <Bookmark className="w-4 h-4 text-[#B83A26]" />
                <span>Danh Sách Đã Lưu ({watchlistMovies.length} phim)</span>
              </h2>

              {watchlistMovies.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa tất cả phim đã lưu trong danh sách xem sau?')) {
                      clearWatchlist();
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa tất cả</span>
                </button>
              )}
            </div>

            {watchlistMovies.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 pt-2">
                {watchlistMovies.map((movie) => (
                  <div key={movie.id} className="relative group">
                    <MovieCard movie={movie} />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleWatchlist(movie.id);
                      }}
                      className="absolute top-2 right-2 z-20 p-1.5 rounded-full bg-black/70 hover:bg-rose-600 text-[#F5EEE1] transition-colors shadow cursor-pointer opacity-0 group-hover:opacity-100"
                      title="Bỏ lưu phim này"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              /* Empty Watchlist State */
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center mx-auto text-[var(--text-muted)] shadow">
                  <Bookmark className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-lora text-lg font-bold text-[var(--text-primary)]">
                    Danh Sách Xem Sau Đang Trống
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Bạn chưa lưu bộ phim nào. Hãy bấm biểu tượng &quot;Lưu Xem Sau&quot; ở trang chi tiết phim để theo dõi thuận tiện hơn!
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs shadow-lg transition-transform hover:scale-105"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Khám Phá Phim Hay Ngay</span>
                </Link>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: WATCH HISTORY SECTION */}
        {activeTab === 'history' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-lora text-lg sm:text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <History className="w-4 h-4 text-[#E0A030]" />
                <span>Phim Bạn Đã Xem Gần Đây ({historyItems.length})</span>
              </h2>

              {historyItems.length > 0 && (
                <button
                  onClick={() => {
                    if (confirm('Bạn có chắc muốn xóa toàn bộ lịch sử xem phim?')) {
                      clearWatchHistory();
                    }
                  }}
                  className="flex items-center gap-1 text-xs text-rose-400 hover:text-rose-500 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa lịch sử</span>
                </button>
              )}
            </div>

            {historyItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 pt-2">
                {historyItems.map((item) => {
                  const epNum = item.episode || 1;
                  return (
                    <div
                      key={item.movieId}
                      className="group flex items-center justify-between p-3 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#E0A030] transition-all shadow-sm hover:shadow-md"
                    >
                      {/* Left: Thumbnail 9:16 vertical crop */}
                      <div
                        onClick={() => router.push(`/watch/${item.movie.slug}?ep=${epNum}`)}
                        className="flex items-center gap-3.5 cursor-pointer flex-1 min-w-0"
                      >
                        <div className="relative w-16 sm:w-20 aspect-[9/16] rounded-xl overflow-hidden bg-black flex-shrink-0 border border-[var(--border-color)]">
                          <img
                            src={item.movie.posterUrl}
                            alt={item.movie.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          />
                          <div className="absolute inset-0 bg-black/25 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-7 h-7 rounded-full bg-[#B83A26] text-white flex items-center justify-center shadow">
                              <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                            </div>
                          </div>
                        </div>

                        {/* Middle info */}
                        <div className="space-y-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#E0A030]/20 text-[#E0A030] border border-[#E0A030]/30">
                              Đang xem: Tập {epNum}
                            </span>
                            <span className="text-[10px] text-[var(--text-muted)]">
                              {formatTimeAgo(item.timestamp)}
                            </span>
                          </div>

                          <h3 className="font-lora text-sm sm:text-base font-bold text-[var(--text-primary)] group-hover:text-[#B83A26] transition-colors truncate">
                            {item.movie.title}
                          </h3>

                          <p className="text-[11px] text-[var(--text-muted)] truncate">
                            {item.movie.category} • {item.movie.duration} • ★ {item.movie.rating}
                          </p>

                          {/* Fake progress indicator */}
                          <div className="pt-1 flex items-center gap-2 text-[10px] text-[var(--text-secondary)]">
                            <div className="w-24 sm:w-32 h-1 bg-white/20 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-[#B83A26] rounded-full"
                                style={{ width: `${Math.min(90, Math.max(25, item.progressSeconds % 100))}%` }}
                              />
                            </div>
                            <span>Còn 1 phút</span>
                          </div>
                        </div>
                      </div>

                      {/* Right Action: Play resume & Delete button */}
                      <div className="flex items-center gap-2 pl-3 flex-shrink-0">
                        <button
                          onClick={() => router.push(`/watch/${item.movie.slug}?ep=${epNum}`)}
                          className="px-3.5 py-2 rounded-xl bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs flex items-center gap-1 shadow transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
                          <span className="hidden sm:inline">Xem Tiếp</span>
                        </button>

                        <button
                          onClick={() => removeFromHistory(item.movieId)}
                          className="p-2 rounded-xl hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
                          title="Xóa khỏi lịch sử"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Empty History State */
              <div className="py-20 text-center space-y-4 max-w-md mx-auto">
                <div className="w-16 h-16 rounded-full bg-[var(--bg-surface)] border border-[var(--border-color)] flex items-center justify-center mx-auto text-[var(--text-muted)] shadow">
                  <History className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="font-lora text-lg font-bold text-[var(--text-primary)]">
                    Lịch Sử Xem Phim Trống
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1">
                    Khi bạn phát bất kỳ bộ phim nào, lịch sử tiến trình và tập phim đang xem dở sẽ tự động được ghi lại ở đây.
                  </p>
                </div>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs shadow-lg transition-transform hover:scale-105"
                >
                  <Film className="w-3.5 h-3.5" />
                  <span>Bắt Đầu Xem Phim</span>
                </Link>
              </div>
            )}
          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
