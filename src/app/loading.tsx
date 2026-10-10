'use client';

import React from 'react';
import { Sparkles } from 'lucide-react';

export default function Loading() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center select-none">
      <div className="relative flex items-center justify-center mb-5">
        {/* Animated glowing outer rings */}
        <div className="w-16 h-16 rounded-full border-2 border-[#E0A030]/20 border-t-[#B83A26] animate-spin" />
        <div className="absolute w-10 h-10 rounded-full border-2 border-[#B83A26]/30 border-b-[#E0A030] animate-spin [animation-duration:1.5s]" />
        
        {/* Center Sparkles Cinema Icon */}
        <div className="absolute w-8 h-8 rounded-full bg-[#211D18] flex items-center justify-center text-[#E0A030] shadow-lg">
          <Sparkles className="w-4 h-4 animate-pulse" />
        </div>
      </div>

      <h3 className="font-lora text-base font-bold text-[#F5EEE1] tracking-wide">
        Đang Khởi Chiếu Phim AI...
      </h3>
      <p className="text-xs text-[var(--text-muted)] mt-1 tracking-wider font-light">
        Đang tải luồng phát video và dữ liệu rạp chiếu
      </p>
    </div>
  );
}
