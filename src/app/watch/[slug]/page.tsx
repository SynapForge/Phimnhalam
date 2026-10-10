'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { MOCK_MOVIES } from '@/data/mock-movies';
import { Navbar } from '@/components/layout/Navbar';
import { PricingModal } from '@/components/pricing/PricingModal';
import { useCinemaStore } from '@/store/cinema-store';
import { DICTIONARY } from '@/types/i18n';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize2,
  ChevronLeft,
  Bookmark,
  Check,
  Heart,
  Sparkles,
  Lock,
  MessageSquare,
  Send,
  Film,
  SkipBack,
  SkipForward
} from 'lucide-react';

export default function WatchMoviePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const { language } = useCinemaStore();
  const t = DICTIONARY[language];

  const slug = params?.slug as string;
  const initialEp = parseInt(searchParams.get('ep') || '1', 10);

  const movie = MOCK_MOVIES.find((m) => m.slug === slug || m.id === slug) || MOCK_MOVIES[0];
  const totalEpisodesCount = parseInt(movie.duration) || 30;

  const [currentEpisode, setCurrentEpisode] = useState(initialEp);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isBuffering, setIsBuffering] = useState(false);
  const [pricingOpen, setPricingOpen] = useState(false);
  const [likesCount, setLikesCount] = useState(1280);
  const [isLiked, setIsLiked] = useState(false);
  const [activeTab, setActiveTab] = useState<'episodes' | 'comments'>('episodes');

  // Mock comments
  const [comments, setComments] = useState([
    { id: 'c1', user: 'Minh Anh', avatar: 'M', time: '10 phút trước', text: 'Cốt truyện cuốn quá, xem một lèo 10 tập luôn!' },
    { id: 'c2', user: 'Tuấn Kiệt', avatar: 'T', time: '25 phút trước', text: 'Hình ảnh góc quay mượt mà, diễn biến nhanh gọn đúng chuẩn short-drama.' },
    { id: 'c3', user: 'Hải Đăng', avatar: 'H', time: '1 giờ trước', text: 'Mong ra thêm nhiều tập nữa, đoạn kết kịch tính ghê!' },
  ]);
  const [newComment, setNewComment] = useState('');

  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const { watchlist, toggleWatchlist, addToHistory } = useCinemaStore();
  const inWatchlist = watchlist.includes(movie.id);

  // Free first 3 episodes, others require VIP
  const isEpisodeLocked = currentEpisode > 3 && movie.accessType !== 'free';

  // Video stream source
  const videoSource = movie.teaserVideoUrl || 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4';

  useEffect(() => {
    if (isEpisodeLocked) {
      if (videoRef.current) videoRef.current.pause();
      setIsPlaying(false);
    } else {
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
        videoRef.current.play().catch(() => {});
        setIsPlaying(true);
      }
      // Record to history
      addToHistory(movie.id, 10, currentEpisode);
    }
  }, [currentEpisode, isEpisodeLocked, movie.id, addToHistory]);

  const togglePlay = () => {
    if (isEpisodeLocked) {
      setPricingOpen(true);
      return;
    }
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  const handleNextEpisode = () => {
    if (currentEpisode < totalEpisodesCount) {
      setCurrentEpisode((prev) => prev + 1);
    }
  };

  const handlePrevEpisode = () => {
    if (currentEpisode > 1) {
      setCurrentEpisode((prev) => prev - 1);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        id: `c-${Date.now()}`,
        user: 'Bạn',
        avatar: 'B',
        time: 'Vừa xong',
        text: newComment.trim(),
      },
      ...comments,
    ]);
    setNewComment('');
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="min-h-screen md:h-screen md:max-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] flex flex-col overflow-y-auto md:overflow-hidden">
      {/* Hide mobile search bar on watch page to preserve screen height */}
      <Navbar showMobileSearch={false} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 py-1.5 sm:py-2 w-full flex flex-col min-h-0">
        
        {/* Compact Breadcrumb Header */}
        <div className="flex items-center justify-between py-1 flex-shrink-0 text-xs px-1">
          <Link
            href={`/movie/${movie.slug}`}
            className="flex items-center gap-1 text-[var(--text-muted)] hover:text-[#B83A26] transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="truncate max-w-[180px] sm:max-w-md">
              <strong className="text-[var(--text-primary)] font-semibold">{movie.title}</strong>
            </span>
          </Link>

          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-[#E0A030] font-bold">
              Tập {currentEpisode} / {totalEpisodesCount}
            </span>
            <span className="text-[var(--text-muted)] hidden sm:inline">
              • {movie.quality}
            </span>
          </div>
        </div>

        {/* Responsive Stage: Stack on Mobile, Side-by-side on Desktop */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center gap-4 lg:gap-8 min-h-0 py-1">
          
          {/* THE 9:16 CINEMA PLAYER CONTAINER */}
          <div className="w-full md:w-auto h-auto md:h-full flex flex-col items-center justify-center relative flex-shrink-0">
            {/* Video Box: Auto-scaled height on Mobile (max-h-[62vh]), full 85vh on Desktop */}
            <div
              ref={containerRef}
              className="relative w-full max-w-[340px] sm:max-w-[380px] md:max-w-none h-[58vh] sm:h-[65vh] md:h-[calc(100vh-5.5rem)] md:max-h-[760px] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-[0_20px_60px_rgba(0,0,0,0.85)] border-2 border-[var(--border-color)] group flex items-center justify-center select-none mx-auto flex-shrink-0"
            >
              {isEpisodeLocked ? (
                /* VIP Lock Overlay Screen */
                <div className="absolute inset-0 bg-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4 text-center space-y-3 z-30">
                  <div className="w-12 h-12 rounded-full bg-[#E0A030]/20 border border-[#E0A030] flex items-center justify-center text-[#E0A030] shadow-lg">
                    <Lock className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-lora text-base sm:text-lg font-bold text-[#F5EEE1]">
                      {t.watchEp} {currentEpisode} {t.watchVipRequired}
                    </h3>
                    <p className="text-[11px] text-[var(--text-muted)] mt-0.5 max-w-xs leading-relaxed">
                      {t.watchVipDesc}
                    </p>
                  </div>
                  <button
                    onClick={() => setPricingOpen(true)}
                    className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#B83A26] to-[#E0A030] text-[#F5EEE1] font-bold text-xs shadow-xl transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{t.watchUnlockBtn} (59.000đ/tháng)</span>
                  </button>
                </div>
              ) : (
                /* Video Element */
                <video
                  ref={videoRef}
                  src={videoSource}
                  playsInline
                  autoPlay
                  onWaiting={() => setIsBuffering(true)}
                  onPlaying={() => setIsBuffering(false)}
                  onCanPlay={() => setIsBuffering(false)}
                  onSeeking={() => setIsBuffering(true)}
                  onSeeked={() => setIsBuffering(false)}
                  onTimeUpdate={() => {
                    if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
                  }}
                  onLoadedMetadata={() => {
                    if (videoRef.current) {
                      setDuration(videoRef.current.duration);
                      setIsPlaying(!videoRef.current.paused);
                    }
                  }}
                  onEnded={handleNextEpisode}
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />
              )}

              {/* Video Buffering / Loading Indicator */}
              {isBuffering && !isEpisodeLocked && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 backdrop-blur-xs z-25 pointer-events-none">
                  <div className="w-12 h-12 rounded-full border-3 border-[#E0A030]/20 border-t-[#B83A26] animate-spin mb-2" />
                  <span className="text-[11px] font-medium text-[#F5EEE1] tracking-wider animate-pulse">
                    Đang đệm video...
                  </span>
                </div>
              )}

              {/* Big Centered Play/Pause Indicator (Shown when paused and not buffering) */}
              {!isPlaying && !isEpisodeLocked && !isBuffering && (
                <div
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-black/35 cursor-pointer z-20"
                >
                  <div className="w-14 sm:w-16 h-14 sm:h-16 rounded-full bg-[#B83A26]/90 text-[#F5EEE1] flex items-center justify-center shadow-2xl transform scale-105 hover:scale-115 transition-transform">
                    <Play className="w-6 sm:w-7 h-6 sm:h-7 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Top Watermark & Info Overlay */}
              <div className="absolute top-2.5 inset-x-2.5 flex items-center justify-between z-20 pointer-events-none">
                <span className="px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-black/70 text-[#F5EEE1] backdrop-blur-md border border-white/10">
                  Tập {currentEpisode} • {movie.quality}
                </span>
                <span className="text-[9px] text-[#E0A030] font-semibold tracking-wider bg-black/70 px-2.5 py-0.5 rounded-full backdrop-blur-md border border-white/10">
                  PHIM NHÀ LÀM
                </span>
              </div>

              {/* Video Bottom Full Controls */}
              {!isEpisodeLocked && (
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 pt-6 z-20 space-y-1.5 opacity-100 sm:opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <input
                    type="range"
                    min={0}
                    max={duration || 100}
                    value={currentTime}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setCurrentTime(val);
                      if (videoRef.current) videoRef.current.currentTime = val;
                    }}
                    className="w-full h-1 bg-white/25 accent-[#B83A26] rounded cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-[#F5EEE1] text-xs">
                    <div className="flex items-center gap-1.5 sm:gap-2">
                      <button onClick={togglePlay} className="p-1 hover:text-[#E0A030] transition-colors cursor-pointer">
                        {isPlaying ? <Pause className="w-4 h-4 sm:w-5 sm:h-5" /> : <Play className="w-4 h-4 sm:w-5 sm:h-5 fill-current" />}
                      </button>
                      <button onClick={() => skip(-10)} className="p-0.5 hover:text-[#E0A030] transition-colors cursor-pointer" title="Lùi 10s">
                        <RotateCcw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button onClick={() => skip(10)} className="p-0.5 hover:text-[#E0A030] transition-colors cursor-pointer" title="Tua 10s">
                        <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                      <button onClick={toggleMute} className="p-0.5 hover:text-[#E0A030] transition-colors cursor-pointer">
                        {isMuted ? <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-rose-400" /> : <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
                      </button>
                      <span className="text-[10px] sm:text-[11px] text-gray-300 ml-0.5 font-mono">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 sm:gap-2">
                      <button
                        onClick={handlePrevEpisode}
                        disabled={currentEpisode <= 1}
                        className="p-1 hover:text-[#E0A030] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="Tập trước"
                      >
                        <SkipBack className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNextEpisode}
                        disabled={currentEpisode >= totalEpisodesCount}
                        className="p-1 hover:text-[#E0A030] disabled:opacity-30 disabled:cursor-not-allowed transition-colors cursor-pointer"
                        title="Tập tiếp theo"
                      >
                        <SkipForward className="w-4 h-4" />
                      </button>
                      <button onClick={toggleFullscreen} className="p-1 hover:text-[#E0A030] transition-colors cursor-pointer" title="Toàn màn hình">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT SIDEBAR: Episodes Grid & Audience Comments */}
          <div className="w-full md:w-80 lg:w-96 h-auto md:h-full md:max-h-[calc(100vh-5.5rem)] rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-lg flex flex-col overflow-hidden flex-shrink-0 mt-2 md:mt-0 mb-6 md:mb-0">
            
            {/* Header & Movie Quick Actions */}
            <div className="p-3 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/40 flex items-center justify-between">
              <div>
                <h2 className="font-lora text-sm font-bold text-[var(--text-primary)] truncate max-w-[180px]">
                  {movie.title}
                </h2>
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                  <span>★ {movie.rating}</span>
                  <span>• {totalEpisodesCount} tập</span>
                </div>
              </div>

              {/* Like & Bookmark Quick Icons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => {
                    setIsLiked(!isLiked);
                    setLikesCount((prev) => (isLiked ? prev - 1 : prev + 1));
                  }}
                  className={`p-1.5 rounded-lg border text-xs font-semibold transition-colors cursor-pointer flex items-center gap-1 ${
                    isLiked
                      ? 'border-rose-500 bg-rose-500/10 text-rose-500'
                      : 'border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-rose-500'
                  }`}
                  title="Yêu thích"
                >
                  <Heart className={`w-3.5 h-3.5 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="text-[10px]">{likesCount}</span>
                </button>

                <button
                  onClick={() => toggleWatchlist(movie.id)}
                  className="p-1.5 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[#E0A030] transition-colors cursor-pointer"
                  title="Lưu xem sau"
                >
                  {inWatchlist ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Bookmark className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            {/* Tab Nav */}
            <div className="flex items-center border-b border-[var(--border-color)] px-2 bg-[var(--bg-primary)]/20 text-xs">
              <button
                onClick={() => setActiveTab('episodes')}
                className={`flex-1 py-2 font-semibold text-center transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-1 ${
                  activeTab === 'episodes'
                    ? 'border-[#B83A26] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <Film className="w-3.5 h-3.5 text-[#B83A26]" />
                <span>{t.watchTabEpisodes}</span>
              </button>

              <button
                onClick={() => setActiveTab('comments')}
                className={`flex-1 py-2 font-semibold text-center transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-1 ${
                  activeTab === 'comments'
                    ? 'border-[#E0A030] text-[var(--text-primary)]'
                    : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#E0A030]" />
                <span>{t.watchTabComments} ({comments.length})</span>
              </button>
            </div>

            {/* Scrollable Tab Body */}
            <div className="p-3 overflow-y-auto max-h-[300px] md:max-h-none md:flex-1 scrollbar-thin">
              {activeTab === 'episodes' ? (
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)]">
                    <span>{t.watchFreeEpsHint}</span>
                    <span className="text-[#E0A030] font-medium">{t.watchClickToPlay}</span>
                  </div>

                  {/* 5-Column Compact Grid */}
                  <div className="grid grid-cols-4 sm:grid-cols-5 gap-1.5">
                    {Array.from({ length: totalEpisodesCount }, (_, i) => i + 1).map((epNum) => {
                      const isLocked = epNum > 3 && movie.accessType !== 'free';
                      const isCurrent = epNum === currentEpisode;

                      return (
                        <button
                          key={epNum}
                          onClick={() => {
                            setCurrentEpisode(epNum);
                            if (isLocked) setPricingOpen(true);
                          }}
                          className={`relative min-h-[42px] py-2 rounded-xl font-bold text-xs flex flex-col items-center justify-center transition-all cursor-pointer ${
                            isCurrent
                              ? 'bg-[#B83A26] text-[#F5EEE1] ring-2 ring-[#E0A030] shadow'
                              : isLocked
                              ? 'bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border-color)] hover:border-[#E0A030]'
                              : 'bg-[var(--bg-primary)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[#B83A26]'
                          }`}
                        >
                          <span>{epNum}</span>
                          {isLocked && (
                            <Lock className="w-2.5 h-2.5 text-[#E0A030] absolute top-1 right-1" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {movie.accessType !== 'free' && (
                    <div className="pt-2">
                      <button
                        onClick={() => setPricingOpen(true)}
                        className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#B83A26] to-[#E0A030] text-[#F5EEE1] font-bold text-xs flex items-center justify-center gap-1.5 shadow transition-transform hover:scale-102 cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Mở Khóa Toàn Bộ {totalEpisodesCount} Tập</span>
                      </button>
                    </div>
                  )}

                  {/* Synopsis snippet in drawer */}
                  <div className="pt-2 border-t border-[var(--border-color)] text-[11px] text-[var(--text-secondary)] space-y-1">
                    <p className="font-bold text-[var(--text-primary)]">Tóm tắt:</p>
                    <p className="line-clamp-3 leading-relaxed">{movie.synopsis}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 h-full flex flex-col">
                  {/* Comments Input */}
                  <form onSubmit={handleSendComment} className="flex gap-1.5">
                    <input
                      type="text"
                      placeholder="Viết bình luận..."
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      className="flex-1 px-3 py-1.5 text-xs rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[#E0A030]"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-xl bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      <Send className="w-3 h-3" />
                    </button>
                  </form>

                  {/* Comments Stream */}
                  <div className="flex-1 space-y-2.5 overflow-y-auto pr-1">
                    {comments.map((c) => (
                      <div key={c.id} className="flex gap-2 text-xs">
                        <div className="w-6 h-6 rounded-full bg-[#E0A030]/20 text-[#E0A030] font-bold flex items-center justify-center flex-shrink-0 text-[10px]">
                          {c.avatar}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-[var(--text-primary)] text-[11px]">{c.user}</span>
                            <span className="text-[9px] text-[var(--text-muted)]">{c.time}</span>
                          </div>
                          <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed">{c.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>

        </div>

      </main>

      {/* Pricing Upgrade Modal */}
      <PricingModal
        isOpen={pricingOpen}
        onClose={() => setPricingOpen(false)}
      />
    </div>
  );
}
