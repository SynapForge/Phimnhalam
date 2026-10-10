'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import Hls from 'hls.js';
import { Movie, Episode } from '@/types/movie';
import {
  Play,
  Pause,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Maximize,
  Minimize,
  Sparkles,
  X
} from 'lucide-react';

interface CinemaPlayerModalProps {
  movie: Movie;
  onClose: () => void;
  onOpenPricing: () => void;
}

export const CinemaPlayerModal: React.FC<CinemaPlayerModalProps> = ({
  movie,
  onClose,
  onOpenPricing,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isBuffering, setIsBuffering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(
    movie.episodes ? movie.episodes[0] : null
  );

  // Trigger mobile Haptic vibration feedback
  const triggerHaptic = (ms = 40) => {
    if (typeof window !== 'undefined' && 'navigator' in window && 'vibrate' in navigator) {
      try {
        navigator.vibrate(ms);
      } catch {
        // Ignore haptic failures
      }
    }
  };

  // Video stream source (HLS or Fallback MP4)
  const videoSource = selectedEpisode?.videoHlsUrl || movie.streamHlsUrl;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let hls: Hls | null = null;

    if (videoSource.endsWith('.m3u8')) {
      if (Hls.isSupported()) {
        hls = new Hls({
          enableWorker: true,
          lowLatencyMode: true,
        });
        hls.loadSource(videoSource);
        hls.attachMedia(video);
        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play().catch(() => {});
        });
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        // Native Safari HLS
        video.src = videoSource;
        video.play().catch(() => {});
      }
    } else {
      video.src = movie.teaserVideoUrl;
      video.play().catch(() => {});
    }

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [videoSource, movie.teaserVideoUrl]);

  // Handle Play/Pause
  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    triggerHaptic(30);
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play().catch(() => {});
    }
    setIsPlaying((prev) => !prev);
  }, [isPlaying]);

  // Handle keyboard shortcuts (Escape to close, Space to toggle play)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (!document.fullscreenElement) {
          onClose();
        }
      } else if (e.code === 'Space') {
        e.preventDefault();
        togglePlay();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose, togglePlay]);

  // Skip 10s Backward / Forward (Mobile gesture tap / buttons)
  const skip = (seconds: number) => {
    if (!videoRef.current) return;
    triggerHaptic(50);
    videoRef.current.currentTime = Math.max(0, Math.min(duration, videoRef.current.currentTime + seconds));
  };

  // Fullscreen with automatic landscape orientation request
  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    triggerHaptic(40);

    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen().catch(() => {});
      setIsFullscreen(true);

      // Mobile lock landscape orientation if supported
      if (screen.orientation && 'lock' in screen.orientation) {
        try {
          // @ts-expect-error screen.orientation.lock is available on mobile browsers
          await screen.orientation.lock('landscape');
        } catch {}
      }
    } else {
      await document.exitFullscreen().catch(() => {});
      setIsFullscreen(false);
      if (screen.orientation && 'unlock' in screen.orientation) {
        try {
          screen.orientation.unlock();
        } catch {}
      }
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = Math.floor(timeInSeconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4">
      <div
        ref={containerRef}
        className="relative w-full max-w-md sm:max-w-lg md:max-w-xl rounded-2xl overflow-hidden bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl flex flex-col max-h-[96vh]"
      >
        {/* Top Header bar */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-primary)]">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B83A26] animate-ping" />
            <span className="font-lora text-base font-bold text-[var(--text-primary)] truncate max-w-[240px] sm:max-w-xs">
              {movie.title}
            </span>
            <span className="text-[10px] sm:text-xs text-[var(--text-muted)] hidden sm:inline">
              (9:16 Dọc • {movie.quality})
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-[var(--bg-surface)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player Box: 9:16 Vertical Ratio */}
        <div className="relative aspect-[9/16] max-h-[65vh] w-full bg-black flex items-center justify-center group mx-auto">
          <video
            ref={videoRef}
            playsInline
            onTimeUpdate={() => {
              if (videoRef.current) setCurrentTime(videoRef.current.currentTime);
            }}
            onLoadedMetadata={() => {
              if (videoRef.current) {
                setDuration(videoRef.current.duration);
                setIsPlaying(!videoRef.current.paused);
              }
            }}
            onEnded={() => setIsPlaying(false)}
            onWaiting={() => setIsBuffering(true)}
            onPlaying={() => {
              setIsBuffering(false);
              setHasError(false);
            }}
            onError={() => {
              setIsBuffering(false);
              setHasError(true);
            }}
            onClick={togglePlay}
            className="w-full h-full object-contain cursor-pointer"
          />

          {/* Buffering Indicator */}
          {isBuffering && !hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 pointer-events-none">
              <div className="w-10 h-10 border-3 border-[#E0A030] border-t-transparent rounded-full animate-spin" />
              <span className="text-[11px] text-[#F5EEE1] mt-2 font-medium">Đang tải luồng chiếu 4K...</span>
            </div>
          )}

          {/* Network Error Fallback & Retry Button */}
          {hasError && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 p-6 text-center z-30 space-y-3">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping" />
              <p className="text-xs text-[var(--text-primary)] font-bold">
                Không thể kết nối đến luồng phát video AI
              </p>
              <p className="text-[10px] text-[var(--text-muted)] max-w-xs">
                Đường truyền mạng bị gián đoạn hoặc định dạng video đang được máy chủ xử lý lại.
              </p>
              <button
                onClick={() => {
                  setHasError(false);
                  setIsBuffering(true);
                  if (videoRef.current) {
                    videoRef.current.load();
                    videoRef.current.play().catch(() => {});
                  }
                }}
                className="px-4 py-1.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-bold transition-transform hover:scale-105 cursor-pointer shadow-lg"
              >
                Thử Lại Kết Nối
              </button>
            </div>
          )}

          {/* Quick Double-tap Mobile zones simulation */}
          <div
            onDoubleClick={() => skip(-10)}
            className="absolute left-0 top-0 bottom-16 w-1/4 cursor-pointer"
            title="Nhấp đúp tua lùi 10s"
          />
          <div
            onDoubleClick={() => skip(10)}
            className="absolute right-0 top-0 bottom-16 w-1/4 cursor-pointer"
            title="Nhấp đúp tua tới 10s"
          />

          {/* Player Custom Controls Overlay */}
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-4 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-200">
            {/* Progress bar */}
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
              className="w-full h-1 bg-white/20 accent-[#B83A26] rounded cursor-pointer"
            />

            <div className="flex items-center justify-between pt-2 text-[#F5EEE1] text-xs">
              {/* Left buttons: Play, Skip 10s, Volume, Time */}
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-1.5 rounded-full hover:bg-white/20 transition-colors"
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 fill-current" />}
                </button>

                <button
                  onClick={() => skip(-10)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors flex items-center gap-0.5 text-[11px]"
                  title="Tua lùi 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="text-[10px]">10s</span>
                </button>

                <button
                  onClick={() => skip(10)}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors flex items-center gap-0.5 text-[11px]"
                  title="Tua tới 10s"
                >
                  <RotateCw className="w-4 h-4" />
                  <span className="text-[10px]">10s</span>
                </button>

                <div className="flex items-center gap-1.5 ml-2">
                  <button
                    onClick={() => {
                      if (!videoRef.current) return;
                      videoRef.current.muted = !isMuted;
                      setIsMuted(!isMuted);
                    }}
                    className="p-1 hover:text-[#E0A030]"
                  >
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  </button>
                  <span className="text-[11px] text-white/70">
                    {formatTime(currentTime)} / {formatTime(duration)}
                  </span>
                </div>
              </div>

              {/* Right buttons: Speed, Fullscreen, Haptic info */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => {
                    const speeds = [1, 1.25, 1.5, 2];
                    const next = speeds[(speeds.indexOf(playbackRate) + 1) % speeds.length];
                    setPlaybackRate(next);
                    if (videoRef.current) videoRef.current.playbackRate = next;
                  }}
                  className="px-2 py-0.5 rounded bg-white/10 hover:bg-white/20 text-[11px] font-semibold"
                >
                  {playbackRate}x
                </button>

                <button
                  onClick={toggleFullscreen}
                  className="p-1 rounded-full hover:bg-white/20 transition-colors"
                  title="Toàn màn hình & Tự động xoay"
                >
                  {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Details & Episodes List */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <p className="text-xs text-[#E0A030] font-semibold flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Phong cách: {movie.aiStyle} • Đạo diễn: {movie.director}</span>
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1 max-w-2xl">
                {movie.synopsis}
              </p>
            </div>

            {/* Access prompt */}
            {movie.accessType !== 'free' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenPricing();
                }}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#E0A030] text-[#211D18] font-bold text-xs shadow hover:bg-[#d09020] transition-colors flex-shrink-0"
              >
                <span>Mở khóa toàn bộ tập (VIP / PPV)</span>
              </button>
            )}
          </div>

          {/* Episode List if series */}
          {movie.episodes && movie.episodes.length > 0 && (
            <div className="pt-2 border-t border-[var(--border-color)]">
              <h4 className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider mb-2">
                Danh sách tập phim ({movie.episodes.length} tập)
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {movie.episodes.map((ep) => (
                  <div
                    key={ep.id}
                    onClick={() => setSelectedEpisode(ep)}
                    className={`flex items-center gap-3 p-2 rounded-lg border cursor-pointer transition-colors ${
                      selectedEpisode?.id === ep.id
                        ? 'border-[#E0A030] bg-[rgba(224,160,48,0.1)]'
                        : 'border-[var(--border-color)] hover:bg-[var(--bg-primary)]'
                    }`}
                  >
                    <div className="relative w-16 h-10 rounded overflow-hidden flex-shrink-0">
                      <Image
                        src={ep.thumbnailUrl}
                        alt={ep.title}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="text-xs truncate">
                      <p className="font-semibold text-[var(--text-primary)] truncate">{ep.title}</p>
                      <p className="text-[10px] text-[var(--text-muted)]">{ep.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
