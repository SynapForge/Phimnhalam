"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { MOCK_MOVIES } from "@/data/mock-movies";
import { Movie, AccessType } from "@/types/movie";
import {
  Plus,
  Trash2,
  Sparkles,
  X,
  Search,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

export const MovieManager: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [accessFilter, setAccessFilter] = useState<AccessType | "all">("all");
  const [movieToDelete, setMovieToDelete] = useState<Movie | null>(null);

  // New movie form state
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState("Phim Ngắn AI");
  const [newAIStyle, setNewAIStyle] = useState("Cổ trang Dã sử");
  const [newAccess, setNewAccess] = useState<AccessType>("free");
  const [newPrompt, setNewPrompt] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const filteredMovies = useMemo(() => {
    return movies.filter((m) => {
      const matchSearch =
        searchTerm.trim() === "" ||
        m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        m.aiStyle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchAccess = accessFilter === "all" || m.accessType === accessFilter;

      return matchSearch && matchAccess;
    });
  }, [movies, searchTerm, accessFilter]);

  // Reset về trang 1 khi thay đổi từ khóa hoặc bộ lọc
  const handleSearchChange = (val: string) => {
    setSearchTerm(val);
    setCurrentPage(1);
  };

  const handleAccessChange = (val: AccessType | "all") => {
    setAccessFilter(val);
    setCurrentPage(1);
  };

  const totalPages = Math.max(1, Math.ceil(filteredMovies.length / itemsPerPage));

  const paginatedMovies = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredMovies.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredMovies, currentPage, itemsPerPage]);

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanTitle = newTitle.trim();
    if (!cleanTitle || isSubmitting) return;

    setIsSubmitting(true);

    const created: Movie = {
      id: `phim-${Date.now()}`,
      slug: cleanTitle
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
      title: cleanTitle,
      tagline: "Tác phẩm mới được sản xuất bằng AI",
      synopsis:
        "Mô tả nội dung phim được thêm vào từ ban quản trị hệ thống CMS.",
      posterUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80",
      backdropUrl:
        "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85",
      teaserVideoUrl:
        "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      streamHlsUrl: "https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8",
      year: 2026,
      duration: "20 phút",
      quality: "4K AI",
      ageRating: "16+",
      rating: 9.5,
      views: 120,
      accessType: newAccess,
      category: newCategory as Movie["category"],
      aiStyle: newAIStyle as Movie["aiStyle"],
      aiTools: ["Runway Gen-3", "Midjourney v6.1"],
      director: "Đạo diễn Khách mời AI",
      creatorPromptSnippet:
        newPrompt.trim() || "Cinematic Vietnamese landscape with high-end prompt",
    };

    setMovies([created, ...movies]);
    setIsAddModalOpen(false);
    setNewTitle("");
    setNewPrompt("");
    setIsSubmitting(false);
  };

  const confirmDelete = () => {
    if (movieToDelete) {
      setMovies(movies.filter((m) => m.id !== movieToDelete.id));
      setMovieToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
        <div>
          <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Quản Trị Kho Phim & Phân Quyền Streaming
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Tổng cộng: {movies.length} tác phẩm AI đã được tải lên và cấu hình
            quyền xem (Free / VIP / PPV 19K).
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-semibold shadow transition-transform hover:scale-105 cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Upload Phim AI Mới</span>
        </button>
      </div>

      {/* Quick Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
        <div className="relative w-full sm:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)]" />
          <input
            type="text"
            placeholder="Tìm theo tên phim, đạo diễn, style..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] focus:border-[#E0A030] outline-none transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto self-start sm:self-auto">
          <span className="text-xs text-[var(--text-muted)] whitespace-nowrap">Lọc Quyền Xem:</span>
          <select
            value={accessFilter}
            onChange={(e) => handleAccessChange(e.target.value as AccessType | "all")}
            className="px-3 py-1.5 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-xs text-[var(--text-primary)] outline-none"
          >
            <option value="all">Tất cả quyền xem ({movies.length})</option>
            <option value="free">Miễn Phí (Free)</option>
            <option value="vip">Hội Viên VIP</option>
            <option value="ppv">Vé Lẻ PPV 19K</option>
          </select>
        </div>
      </div>

      {/* Movies Table Container with Scroll Y */}
      <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden shadow-sm">
        {/* Scrollable table container */}
        <div className="overflow-x-auto overflow-y-auto max-h-[480px] hover-scrollbar">
          <table className="w-full text-left text-xs min-w-[700px]">
            <thead className="sticky top-0 z-10 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-md text-[var(--text-muted)]">
              <tr>
                <th className="p-4 font-semibold">Tác Phẩm & Poster</th>
                <th className="p-4 font-semibold">Thể Loại & Phong Cách AI</th>
                <th className="p-4 font-semibold">Quyền Xem</th>
                <th className="p-4 font-semibold">Chất Lượng</th>
                <th className="p-4 font-semibold">Lượt Xem</th>
                <th className="p-4 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              {paginatedMovies.length > 0 ? (
                paginatedMovies.map((movie) => (
                  <tr
                    key={movie.id}
                    className="hover:bg-[var(--bg-primary)]/40 transition-colors"
                  >
                    <td className="p-4 flex items-center gap-3 max-w-[240px]">
                      <div className="relative w-12 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-black/40">
                        <Image
                          src={movie.posterUrl}
                          alt={movie.title}
                          fill
                          sizes="48px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div
                          className="font-bold text-[var(--text-primary)] text-sm truncate"
                          title={movie.title}
                        >
                          {movie.title}
                        </div>
                        <div
                          className="text-[11px] text-[var(--text-muted)] mt-0.5 truncate"
                          title={`Đạo diễn: ${movie.director}`}
                        >
                          Đạo diễn: {movie.director}
                        </div>
                      </div>
                    </td>
                    <td className="p-4 max-w-[180px]">
                      <div className="font-medium text-[var(--text-primary)] truncate">
                        {movie.category}
                      </div>
                      <div className="text-[11px] text-[#E0A030] flex items-center gap-1 mt-0.5 truncate">
                        <Sparkles className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{movie.aiStyle}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase whitespace-nowrap ${
                          movie.accessType === "vip"
                            ? "bg-[#E0A030]/15 text-[#E0A030]"
                            : movie.accessType === "ppv"
                              ? "bg-[#B83A26]/15 text-[#B83A26]"
                              : "bg-emerald-500/15 text-emerald-500"
                        }`}
                      >
                        {movie.accessType === "vip"
                          ? "Gói VIP"
                          : movie.accessType === "ppv"
                            ? "Vé 19K"
                            : "Miễn Phí"}
                      </span>
                    </td>
                    <td className="p-4 font-mono text-[var(--text-primary)] whitespace-nowrap">
                      {movie.quality}
                    </td>
                    <td
                      className="p-4 text-[var(--text-primary)] font-semibold whitespace-nowrap"
                      suppressHydrationWarning
                    >
                      {movie.views.toLocaleString("vi-VN")}
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setMovieToDelete(movie)}
                          className="p-1.5 rounded hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors cursor-pointer"
                          title="Gỡ phim"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-[var(--text-muted)]">
                    Không tìm thấy phim nào khớp với từ khóa hoặc bộ lọc đã chọn.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer Controls */}
        <div className="px-4 py-3 border-t border-[var(--border-color)] bg-[var(--bg-primary)]/40 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="text-[var(--text-muted)]">
            Hiển thị{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {filteredMovies.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}-
              {Math.min(currentPage * itemsPerPage, filteredMovies.length)}
            </span>{" "}
            trong tổng số{" "}
            <span className="font-semibold text-[var(--text-primary)]">
              {filteredMovies.length}
            </span>{" "}
            tác phẩm
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Trang trước"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {Array.from({ length: totalPages }).map((_, idx) => {
              const pageNum = idx + 1;
              const isActive = pageNum === currentPage;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-colors ${
                    isActive
                      ? "bg-[#B83A26] text-[#F5EEE1] shadow-xs"
                      : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] border border-transparent hover:border-[var(--border-color)]"
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-surface)] hover:text-[var(--text-primary)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              title="Trang sau"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Add Movie Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color)]">
              <h3 className="font-lora text-lg font-bold text-[var(--text-primary)]">
                Tải Lên Tác Phẩm Phim AI Mới
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddMovie} className="space-y-4 text-xs">
              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-semibold">
                  Tên Phim (tối đa 120 ký tự)
                </label>
                <input
                  type="text"
                  required
                  maxLength={120}
                  placeholder="Ví dụ: Huyền Sử Dạ Trạch Vương AI"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-semibold">
                    Thể Loại
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none"
                  >
                    <option value="Phim Ngắn AI">Phim Ngắn AI</option>
                    <option value="Series Nhiều Tập">Series Nhiều Tập</option>
                    <option value="Hoạt Hình & Anime">Hoạt Hình & Anime</option>
                    <option value="Dân Gian Huyền Bí">Dân Gian Huyền Bí</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-semibold">
                    Phong Cách AI
                  </label>
                  <select
                    value={newAIStyle}
                    onChange={(e) => setNewAIStyle(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none"
                  >
                    <option value="Cổ trang Dã sử">Cổ trang Dã sử</option>
                    <option value="Cyberpunk Việt Nam">
                      Cyberpunk Việt Nam
                    </option>
                    <option value="Anime Cinematic">Anime Cinematic</option>
                    <option value="Dân gian & Sơn mài">
                      Dân gian & Sơn mài
                    </option>
                    <option value="Photorealistic Cinema">
                      Photorealistic Cinema
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-semibold">
                    Phân Quyền Xem
                  </label>
                  <select
                    value={newAccess}
                    onChange={(e) => setNewAccess(e.target.value as AccessType)}
                    className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] outline-none"
                  >
                    <option value="free">Miễn Phí (Free)</option>
                    <option value="vip">Dành Cho Hội Viên VIP</option>
                    <option value="ppv">Vé Phim Lẻ PPV 19K</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[var(--text-muted)] mb-1 font-semibold">
                  Prompt Gốc / Công Cụ AI Đã Dùng (tối đa 1,000 ký tự)
                </label>
                <textarea
                  rows={3}
                  maxLength={1000}
                  placeholder="Nhập prompt Midjourney / Runway Gen-3 hoặc workflow..."
                  value={newPrompt}
                  onChange={(e) => setNewPrompt(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)]"
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting || !newTitle.trim()}
                  className="px-5 py-2 rounded-lg bg-[#B83A26] hover:bg-[#a03220] disabled:opacity-50 disabled:cursor-not-allowed text-[#F5EEE1] font-bold shadow transition-opacity"
                >
                  {isSubmitting ? 'Đang lưu...' : 'Xác Nhận Đăng Phim'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {movieToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-500/15 text-rose-500 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                  Xác Nhận Gỡ Phim Khỏi Rạp?
                </h3>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">
                  Tác phẩm sẽ được gỡ khỏi danh mục và người xem sẽ không thể truy cập.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center gap-3">
              <div className="relative w-10 h-14 rounded overflow-hidden flex-shrink-0">
                <Image
                  src={movieToDelete.posterUrl}
                  alt={movieToDelete.title}
                  fill
                  sizes="40px"
                  className="object-cover"
                />
              </div>
              <div className="text-xs min-w-0">
                <div className="font-bold text-[var(--text-primary)] truncate">
                  {movieToDelete.title}
                </div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                  Thể loại: {movieToDelete.category}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMovieToDelete(null)}
                className="px-4 py-2 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:bg-[var(--bg-primary)] text-xs font-medium cursor-pointer"
              >
                Hủy Bỏ
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow transition-transform hover:scale-102 cursor-pointer"
              >
                Xác Nhận Gỡ Phim
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
