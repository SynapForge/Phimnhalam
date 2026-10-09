import React from 'react';
import { BrandLogo } from '@/components/brand/BrandLogo';
import { Heart, ShieldCheck, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-surface)] py-12 mt-20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand Info with Tagline */}
          <div className="space-y-4 md:col-span-1">
            <BrandLogo showTagline={true} />
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Nền tảng phát phim và video ngắn sáng tạo bằng trí tuệ nhân tạo (AI Cinema) đầu tiên kết hợp bản sắc văn hóa nghệ thuật dân gian Việt Nam.
            </p>
            <div className="flex items-center gap-2 text-xs text-[var(--accent-gold)]">
              <Sparkles className="w-4 h-4" />
              <span>Khởi tạo từ cộng đồng AI Creators</span>
            </div>
          </div>

          {/* Col 2: Kho Phim */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              Danh Mục Điện Ảnh
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">Phim Dã Sử & Cổ Trang AI</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">Cyberpunk Việt Nam 2088</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">Hoạt Hình Niji Anime</a></li>
              <li><a href="#the-loai" className="hover:text-[#B83A26] transition-colors">Tranh Sơn Mài Kinh Dị Dân Gian</a></li>
            </ul>
          </div>

          {/* Col 3: Dịch vụ & Hợp tác */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              Thương Mại & Bản Quyền
            </h4>
            <ul className="space-y-2 text-xs text-[var(--text-secondary)]">
              <li><a href="#pricing" className="hover:text-[#B83A26] transition-colors">Bảng Giá Vé Rạp & Hội Viên VIP</a></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">Cổng Thanh Toán PayOS Tức Thời</span></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">Dịch Vụ Sản Xuất Video AI B2B</span></li>
              <li><span className="hover:text-[#B83A26] cursor-pointer">Chính Sách Bản Quyền & Tác Quyền Prompt</span></li>
            </ul>
          </div>

          {/* Col 4: Công nghệ */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-[var(--text-primary)] font-lora">
              Công Nghệ Streaming
            </h4>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              Trang bị chuẩn phát luồng Cloudflare Stream Adaptive Bitrate & HLS tự động thích ứng với tốc độ mạng 4G/5G/Wifi.
            </p>
            <div className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Chuẩn an toàn thanh toán số</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-muted)]">
          <p>© 2026 Phim Nhà Làm. Nền tảng Video AI Cinema Việt Nam.</p>
          <div className="flex items-center gap-1">
            <span>Xây dựng với niềm tự hào văn hóa Việt</span>
            <Heart className="w-3.5 h-3.5 text-[#B83A26] fill-[#B83A26]" />
          </div>
        </div>
      </div>
    </footer>
  );
};
