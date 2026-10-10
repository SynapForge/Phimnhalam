"use client";

import React, { useState, useCallback } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import {
  Sparkles,
  Clapperboard,
  Cpu,
  Film,
  Zap,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from "lucide-react";

import { useCinemaStore } from "@/store/cinema-store";

// Hoisted constants to prevent re-allocation on every render
const ZALO_PHONE = "";
const ZALO_LINK = `https://zalo.me/${ZALO_PHONE}`;

export default function StudioPage() {
  // Selector optimization: Only subscribe to addBooking function, avoid re-renders on store state changes
  const addBooking = useCinemaStore((state) => state.addBooking);

  const [copiedPhone, setCopiedPhone] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    projectNeed: "Sản xuất Trailer / TVC AI",
    budget: "Dưới 30 triệu",
    notes: "",
  });

  const handleCopyPhone = useCallback(() => {
    if (typeof navigator !== "undefined") {
      navigator.clipboard.writeText(ZALO_PHONE);
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2500);
    }
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!formData.name.trim() || !formData.phone.trim()) return;

      // 1. Lưu vào hệ thống CMS Admin (Zustand + LocalStorage)
      addBooking({
        clientName: formData.name.trim(),
        phone: formData.phone.trim(),
        email: `${formData.phone.trim()}@khachhang.phimnhalam.vn`,
        projectType: formData.projectNeed,
        budget: formData.budget,
        deadline: "Theo thỏa thuận Zalo",
        notes:
          formData.notes.trim() ||
          "Khách gửi yêu cầu trực tiếp từ trang Studio",
        fromStudio: true,
      });

      setFormSent(true);

      // 2. Tự động chuyển hướng / mở tab Zalo với nội dung đã được soạn sẵn
      if (typeof window !== "undefined") {
        window.open(ZALO_LINK, "_blank", "noopener,noreferrer");
      }
    },
    [formData, addBooking],
  );

  return (
    <div className="min-h-screen flex flex-col bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <Navbar />

      <main className="flex-1">
        {/* HERO SECTION: Studio Header (Quieter refinement) */}
        <section className="relative overflow-hidden py-16 sm:py-20 border-b border-[var(--border-color)]">
          {/* Subtle Ambient Background - Soft & Calm */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-gradient-to-r from-[#B83A26]/8 via-[#E0A030]/10 to-transparent blur-[140px] pointer-events-none" />

          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] text-[#E0A030] text-xs font-medium border border-[var(--border-color)]">
              <Sparkles className="w-3.5 h-3.5 text-[#E0A030]" />
              <span>Phim Nhà Làm Studio • Generative AI Cinema Lab</span>
            </div>

            <h1 className="font-lora text-3xl sm:text-5xl font-bold text-[var(--text-primary)] tracking-tight leading-[1.25]">
              Studio Sản Xuất Phim & Video AI <br />
              <span className="text-[#E0A030]">Đậm Bản Sắc Việt Nam</span>
            </h1>

            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
              Chúng tôi kết hợp các mô hình trí tuệ nhân tạo tạo sinh đỉnh cao
              thế giới (Runway Gen-3, Kling AI 1.5, Midjourney v6.1, Hailuo)
              cùng tư duy đạo diễn điện ảnh chuẩn mực để tạo nên những thước
              phim đột phá cho cá nhân và thương hiệu.
            </p>

            {/* CTAs: Nút Zalo & Đăng Ký Tư Vấn - Quiet & Refined */}
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <a
                href={ZALO_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 px-6 py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-semibold text-xs sm:text-sm border border-[#E0A030]/30 shadow-sm hover:shadow transition-all group"
              >
                <div className="w-4 h-4 rounded-full bg-[#E0A030] text-[#211D18] flex items-center justify-center font-black text-[9px]">
                  Z
                </div>
                <span>
                  Chat Trực Tiếp Qua Zalo ({ZALO_PHONE || "0988 776 554"})
                </span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform opacity-75" />
              </a>

              <a
                href="#booking-form"
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[#E0A030]/50 text-[var(--text-primary)] text-xs sm:text-sm font-medium transition-colors"
              >
                <Clapperboard className="w-4 h-4 text-[#E0A030]" />
                <span>Nhận Báo Giá Dự Án</span>
              </a>
            </div>

            {/* Micro stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 max-w-3xl mx-auto border-t border-[var(--border-color)] text-center">
              <div>
                <div className="font-lora text-xl sm:text-2xl font-bold text-[#E0A030]">
                  4K UHD
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Upscale AI Chuẩn Điện Ảnh
                </div>
              </div>
              <div>
                <div className="font-lora text-xl sm:text-2xl font-bold text-[#B83A26]">
                  7 - 14 Ngày
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Tiến Độ Bàn Giao Thần Tốc
                </div>
              </div>
              <div>
                <div className="font-lora text-xl sm:text-2xl font-bold text-[#E0A030]">
                  Tiết Kiệm 70%
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  So Với Quay Phim Truyền Thống
                </div>
              </div>
              <div>
                <div className="font-lora text-xl sm:text-2xl font-bold text-[#B83A26]">
                  100% Bản Quyền
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Bàn Giao Trọn Bộ Prompt & Source
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES: Các dịch vụ mũi nhọn */}
        <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-2">
            <h2 className="font-lora text-2xl sm:text-3xl font-bold text-[var(--text-primary)]">
              Dịch Vụ Sản Xuất Video AI Toàn Diện
            </h2>
            <p className="text-xs sm:text-sm text-[var(--text-muted)] max-w-xl mx-auto">
              Từ ý tưởng sơ khai trên giấy đến sản phẩm phát sóng chuẩn rạp
              chiếu và mạng xã hội.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Service 1 */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#E0A030]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B83A26]/10 text-[#B83A26] flex items-center justify-center">
                <Film className="w-5 h-5" />
              </div>
              <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                Trailer & Short-Drama AI
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Sản xuất series phim ngắn 9:16 dọc hoặc 16:9 ngang cho TikTok,
                Facebook Reels, YouTube. Cốt truyện kịch tính, nhịp nhanh, giữ
                chân khán giả tuyệt đối.
              </p>
              <ul className="text-[11px] text-[var(--text-muted)] space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Dã sử, kiếm hiệp, huyền bí dân gian</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Cyberpunk, tương lai, khoa học viễn tưởng</span>
                </li>
              </ul>
            </div>

            {/* Service 2 */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#E0A030]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#E0A030]/10 text-[#E0A030] flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                TVC Quảng Cáo & Video Thương Hiệu
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Biến những bối cảnh bất khả thi ngoài đời thực thành những thước
                phim quảng cáo hoành tráng: bão tuyết, cung điện cổ, thế giới
                viễn tưởng với chi phí tối ưu.
              </p>
              <ul className="text-[11px] text-[var(--text-muted)] space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Tích hợp sản phẩm 3D vào video AI</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Kịch bản phân cảnh (Storyboard) rõ ràng</span>
                </li>
              </ul>
            </div>

            {/* Service 3 */}
            <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] hover:border-[#E0A030]/40 transition-colors space-y-4">
              <div className="w-10 h-10 rounded-xl bg-[#B83A26]/10 text-[#E0A030] flex items-center justify-center">
                <Cpu className="w-5 h-5" />
              </div>
              <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                Tư Vấn & Đào Tạo Pipeline AI Cinema
              </h3>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                Chuyển giao toàn bộ quy trình sản xuất (Workflow ComfyUI, Kling
                AI, Runway Gen-3) giúp doanh nghiệp và agency tự chủ sản xuất
                nội dung video AI.
              </p>
              <ul className="text-[11px] text-[var(--text-muted)] space-y-1.5 pt-2 border-t border-[var(--border-color)]">
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Kho Prompt độc quyền tối ưu nhân vật</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#E0A030]" />
                  <span>Kỹ thuật đồng bộ giọng nói & lồng tiếng AI</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* WORKFLOW: Quy trình 4 bước */}
        <section className="py-12 bg-[var(--bg-surface)]/60 border-y border-[var(--border-color)]">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="text-center space-y-1">
              <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Quy Trình Làm Việc Chuyên Nghiệp
              </h2>
              <p className="text-xs text-[var(--text-muted)]">
                Minh bạch, tốc độ và cam kết chất lượng từng khung hình
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-center">
              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#B83A26]/20 border border-[#B83A26]/40 text-[#B83A26] text-xs font-bold flex items-center justify-center mx-auto">
                  1
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  Tiếp Nhận & Kịch Bản
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Phân tích yêu cầu, xây dựng cốt truyện và Moodboard phong
                  cách.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#E0A030]/20 border border-[#E0A030]/40 text-[#E0A030] text-xs font-bold flex items-center justify-center mx-auto">
                  2
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  Tạo Nhân Vật & Cảnh
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Khóa ngoại hình nhân vật (Consistent Face) và sinh shot hình
                  nền.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#B83A26]/20 border border-[#B83A26]/40 text-[#B83A26] text-xs font-bold flex items-center justify-center mx-auto">
                  3
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  Chuyển Động & Âm Thanh
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Sinh chuyển động video 60fps, lồng tiếng cảm xúc và nhạc nền
                  cinema.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] space-y-2">
                <div className="w-7 h-7 rounded-full bg-[#E0A030]/20 border border-[#E0A030]/40 text-[#E0A030] text-xs font-bold flex items-center justify-center mx-auto">
                  4
                </div>
                <h4 className="font-bold text-xs text-[var(--text-primary)]">
                  Nghiệm Thu & Bàn Giao
                </h4>
                <p className="text-[11px] text-[var(--text-muted)] leading-relaxed">
                  Chỉnh sửa chi tiết, xuất bản 4K và chuyển giao toàn quyền sở
                  hữu.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING FORM & ZALO CONTACT BOX - Calm & Quiet design */}
        <section
          id="booking-form"
          className="py-14 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 sm:p-8 space-y-6">
            <div className="text-center space-y-1.5">
              <span className="px-3 py-1 rounded-full text-[10px] font-medium tracking-wider bg-[var(--bg-primary)] text-[#E0A030] border border-[var(--border-color)]">
                KẾT NỐI TRỰC TIẾP
              </span>
              <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                Bắt Đầu Dự Án Phim Cùng Studio
              </h2>
              <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto">
                Nhắn tin Zalo để nhận tư vấn kỹ thuật ngay hoặc để lại thông tin
                để Studio liên hệ báo giá.
              </p>
            </div>

            {/* Quick Zalo Direct CTA Card - Quiet & Balanced */}
            <div className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 text-left">
                <div className="w-10 h-10 rounded-xl bg-[#E0A030]/10 border border-[#E0A030]/30 text-[#E0A030] flex items-center justify-center font-bold text-base flex-shrink-0">
                  Z
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-[var(--text-primary)]">
                    Kênh Zalo Tư Vấn Nhanh
                  </h4>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">
                    Hotline:{" "}
                    <strong className="text-[var(--text-primary)] font-mono">
                      {ZALO_PHONE}
                    </strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={handleCopyPhone}
                  className="px-3 py-2 rounded-full border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] transition-colors"
                >
                  {copiedPhone ? "Đã chép số!" : "Chép số"}
                </button>
                <a
                  href={ZALO_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#B83A26] hover:bg-[#a03220] border border-[#E0A030]/20 text-[#F5EEE1] font-medium text-xs transition-colors"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Mở Zalo Ngay</span>
                </a>
              </div>
            </div>

            {/* Booking Inquiry Form */}
            {!formSent ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-4 text-xs pt-4 border-t border-[var(--border-color)]"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="studio-name"
                      className="block text-[var(--text-secondary)] mb-1 font-medium"
                    >
                      Họ và Tên / Đơn Vị{" "}
                      <span className="text-[#B83A26]">*</span>
                    </label>
                    <input
                      id="studio-name"
                      name="name"
                      autoComplete="name"
                      type="text"
                      required
                      placeholder="Ví dụ: Nguyễn Văn A"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030]/60 outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="studio-phone"
                      className="block text-[var(--text-secondary)] mb-1 font-medium"
                    >
                      Số Điện Thoại / Zalo{" "}
                      <span className="text-[#B83A26]">*</span>
                    </label>
                    <input
                      id="studio-phone"
                      name="tel"
                      autoComplete="tel"
                      type="tel"
                      required
                      placeholder="0988 xxx xxx"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030]/60 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[var(--text-secondary)] mb-1 font-medium">
                      Nhu Cầu Dự Án
                    </label>
                    <select
                      value={formData.projectNeed}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          projectNeed: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none"
                    >
                      <option value="Sản xuất Trailer / TVC AI">
                        Sản xuất Trailer / TVC AI
                      </option>
                      <option value="Series Phim Ngắn Short-Drama (TikTok/Reels)">
                        Series Phim Ngắn Short-Drama (TikTok/Reels)
                      </option>
                      <option value="Video Quảng Cáo Sản Phẩm B2B">
                        Video Quảng Cáo Sản Phẩm B2B
                      </option>
                      <option value="Đào Tạo & Chuyển Giao Quy Trình AI">
                        Đào Tạo & Chuyển Giao Quy Trình AI
                      </option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[var(--text-secondary)] mb-1 font-medium">
                      Dự Trù Ngân Sách
                    </label>
                    <select
                      value={formData.budget}
                      onChange={(e) =>
                        setFormData({ ...formData, budget: e.target.value })
                      }
                      className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none"
                    >
                      <option value="Dưới 30 triệu">Dưới 30 triệu</option>
                      <option value="30 - 80 triệu">30 - 80 triệu</option>
                      <option value="80 - 150 triệu">80 - 150 triệu</option>
                      <option value="Trên 150 triệu (Dự án lớn)">
                        Trên 150 triệu (Dự án lớn)
                      </option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[var(--text-secondary)] mb-1 font-medium">
                    Mô Tả Ý Tưởng Hoặc Yêu Cầu Chi Tiết
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Mô tả sơ lược về câu chuyện, bối cảnh, thời lượng dự kiến..."
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData({ ...formData, notes: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030]/60 outline-none transition-colors"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-semibold text-xs border border-[#E0A030]/30 shadow-sm hover:shadow transition-colors cursor-pointer"
                  >
                    Gửi Thông Tin Cho Studio
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-8 text-center space-y-4 bg-[var(--bg-primary)] rounded-xl border border-[var(--border-color)] animate-in fade-in">
                <div className="w-10 h-10 rounded-full bg-[#E0A030]/10 text-[#E0A030] flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                    Đã Gửi Thành Công & Lưu Vào Hệ Thống!
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] max-w-md mx-auto mt-1 leading-relaxed">
                    Yêu cầu đã được lưu vào hệ thống quản lý CMS. Trình duyệt
                    cũng đã tự động mở kênh chat Zalo với Studio.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] text-xs text-left max-w-sm mx-auto">
                  <span className="w-2 h-2 rounded-full bg-[#E0A030]" />
                  <span className="text-[var(--text-secondary)]">
                    Khách hàng:{" "}
                    <strong className="text-[var(--text-primary)]">
                      {formData.name}
                    </strong>{" "}
                    • SĐT:{" "}
                    <strong className="text-[var(--text-primary)]">
                      {formData.phone}
                    </strong>
                  </span>
                </div>

                <div className="pt-2 flex flex-wrap justify-center gap-3">
                  <a
                    href={ZALO_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#B83A26] hover:bg-[#a03220] border border-[#E0A030]/30 text-[#F5EEE1] text-xs font-medium transition-colors"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    <span>Mở Lại Cửa Sổ Zalo Chat</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSent(false);
                      setFormData({
                        name: "",
                        phone: "",
                        projectNeed: "Sản xuất Trailer / TVC AI",
                        budget: "Dưới 30 triệu",
                        notes: "",
                      });
                    }}
                    className="px-3.5 py-2 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] text-xs transition-colors"
                  >
                    Gửi yêu cầu khác
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </main>

      {/* Floating Zalo Contact Button at bottom right - Quiet & Minimal */}
      <a
        href={ZALO_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-5 right-5 z-40 flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--bg-surface)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[#E0A030]/50 text-[var(--text-primary)] text-xs font-medium shadow-sm transition-colors group"
        title="Chat với Studio qua Zalo"
      >
        <div className="w-5 h-5 rounded-full bg-[#E0A030]/15 text-[#E0A030] flex items-center justify-center font-bold text-[10px]">
          Z
        </div>
        <span className="hidden sm:inline text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
          Zalo Studio
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#E0A030]" />
      </a>

      <Footer />
    </div>
  );
}
