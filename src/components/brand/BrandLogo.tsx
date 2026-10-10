import React from "react";

interface BrandLogoProps {
  className?: string;
  variant?: "dark" | "light" | "auto";
  showTagline?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = "",
  showTagline = false,
}) => {
  return (
    <div
      className={`flex items-center gap-2.5 select-none cursor-pointer flex-shrink-0 ${className}`}
    >
      {/* Icon mark: Mái đình cong truyền thống + Hộp video play chuẩn evidence Logo.jpg */}
      <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex-shrink-0">
        <svg
          viewBox="0 0 100 88"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transition-colors duration-200"
        >
          {/* Mái đình cong cổ truyền (Temple curved roof with sharp upturned eaves) */}
          <path
            d="M 50 3 
               C 53 3, 56 6, 61 10 
               C 67 14, 73 16, 85 18 
               C 95 19, 99 15, 100 23 
               C 97 28, 86 31, 79 32 
               C 74 33, 72 36, 71 39 
               L 29 39 
               C 28 36, 26 33, 21 32 
               C 14 31, 3 28, 0 23 
               C 1 15, 5 19, 15 18 
               C 27 16, 33 14, 39 10 
               C 44 6, 47 3, 50 3 Z"
            fill="var(--brand-logo-fill)"
          />

          {/* Thân hộp Video Player bo góc mềm mại */}
          <rect
            x="16"
            y="35"
            width="68"
            height="48"
            rx="10"
            fill="var(--brand-logo-fill)"
          />

          {/* Nút Play tam giác ở tâm màn hình video */}
          <path d="M 44 47 L 62 59 L 44 71 Z" fill="var(--brand-logo-play)" />
        </svg>
      </div>

      {/* Brand Name & Optional Tagline (Chỉ đổi màu duy nhất chữ 'Nhà' theo dark/light mode) */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center whitespace-nowrap leading-none font-lora text-lg sm:text-xl font-bold tracking-tight">
          <span className="text-[var(--text-primary)]">Phim</span>
          <span className="text-[var(--brand-nha-color)] ml-1.5 mr-1.5 transition-colors duration-200">
            Nhà
          </span>
          <span className="text-[var(--text-primary)]">Làm</span>
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
