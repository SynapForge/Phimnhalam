'use client';

import React, { useEffect, useState } from 'react';
import { useCinemaStore } from '@/store/cinema-store';

export default function NetworkStatusBanner() {
  const { language } = useCinemaStore();
  const [isOffline, setIsOffline] = useState(false);
  const [reconnected, setReconnected] = useState(false);

  useEffect(() => {
    // Chỉ kích hoạt trên client browser
    if (typeof window === 'undefined') return;

    const handleOffline = () => {
      setIsOffline(true);
      setReconnected(false);
    };

    const handleOnline = () => {
      setIsOffline(false);
      setReconnected(true);
      // Tự động tắt thông báo đã kết nối lại sau 3.5 giây
      const timer = setTimeout(() => {
        setReconnected(false);
      }, 3500);
      return () => clearTimeout(timer);
    };

    // Kiểm tra trạng thái ban đầu
    if (!navigator.onLine) {
      setIsOffline(true);
    }

    window.addEventListener('offline', handleOffline);
    window.addEventListener('online', handleOnline);

    return () => {
      window.removeEventListener('offline', handleOffline);
      window.removeEventListener('online', handleOnline);
    };
  }, []);

  if (!isOffline && !reconnected) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-[999] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2.5 text-xs font-medium tracking-wide backdrop-blur-md transition-all duration-300 ${
        isOffline
          ? 'bg-[#B83A26]/95 text-[#F5EEE1] border border-[#B83A26]/60 animate-pulse'
          : 'bg-[#211D18]/95 text-[#E0A030] border border-[#E0A030]/40'
      }`}
    >
      <span className="w-2 h-2 rounded-full inline-block animate-ping bg-current" />
      <span>
        {isOffline
          ? language === 'vi'
            ? 'Mất kết nối mạng. Video và dữ liệu có thể không tải được.'
            : 'No internet connection. Playback and data may be unavailable.'
          : language === 'vi'
          ? 'Đã kết nối lại mạng thành công.'
          : 'Back online! Connection restored.'}
      </span>
      {isOffline && (
        <button
          onClick={() => window.location.reload()}
          className="ml-2 px-2 py-0.5 rounded bg-[#F5EEE1]/20 hover:bg-[#F5EEE1]/30 text-white font-bold text-[11px] transition-colors"
        >
          {language === 'vi' ? 'Thử lại' : 'Retry'}
        </button>
      )}
    </div>
  );
}
