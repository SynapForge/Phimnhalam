import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'dark' | 'light' | 'auto';
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  showTagline = false,
}) => {
  return (
    <div className={`flex items-center gap-2.5 select-none cursor-pointer flex-shrink-0 ${className}`}>
      {/* Icon mark */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
        <svg
          viewBox="0 0 120 120"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-sm"
        >
          {/* Temple curved roof top (Mái đình cong) */}
          <path
            d="M60 12 C64 12 68 18 70 24 C72 30 76 33 86 35 C96 37 106 32 108 42 C109 47 104 52 94 53 C86 54 80 57 78 61 L42 61 C40 57 34 54 26 53 C16 52 11 47 12 42 C14 32 24 37 34 35 C44 33 48 30 50 24 C52 18 56 12 60 12 Z"
            fill="currentColor"
            className="text-[#B83A26]"
          />
          {/* Top roof ornament / peak */}
          <path
            d="M56 15 C58 11 62 11 64 15 L66 22 L54 22 Z"
            fill="#E0A030"
          />
          {/* Cinema Screen Body with rounded corners */}
          <rect
            x="22"
            y="54"
            width="76"
            height="52"
            rx="12"
            fill="currentColor"
            className="text-[#B83A26]"
          />
          {/* Play Triangle button inside (Trắng giấy điệp) */}
          <path
            d="M52 68 L74 80 L52 92 Z"
            fill="#F5EEE1"
          />
        </svg>
      </div>

      {/* Brand Name & Optional Tagline */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center whitespace-nowrap leading-none">
          <span className="font-lora text-lg sm:text-xl font-bold tracking-tight text-[var(--text-primary)]">
            Phim
          </span>
          <span className="font-lora text-lg sm:text-xl font-bold tracking-tight text-[#B83A26] ml-1.5">
            Nhà Làm
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] tracking-wider text-[var(--text-muted)] font-medium mt-1">
            Ai cũng là nhà làm phim
          </span>
        )}
      </div>
    </div>
  );
};
