'use client';

import React, { useState } from 'react';
import { MOCK_MOVIES } from '@/data/mock-movies';
import { Movie, AccessType } from '@/types/movie';
import { Plus, Edit3, Trash2, Eye, Sparkles, UploadCloud, X } from 'lucide-react';

export const MovieManager: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>(MOCK_MOVIES);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New movie form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Phim Ngắn AI');
  const [newAIStyle, setNewAIStyle] = useState('Cổ trang Dã sử');
  const [newAccess, setNewAccess] = useState<AccessType>('free');
  const [newPrompt, setNewPrompt] = useState('');

  const handleAddMovie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created: Movie = {
      id: `phim-${Date.now()}`,
      slug: newTitle.toLowerCase().replace(/\s+/g, '-'),
      title: newTitle,
      tagline: 'Tác phẩm mới được sản xuất bằng AI',
      synopsis: 'Mô tả nội dung phim được thêm vào từ ban quản trị hệ thống CMS.',
      posterUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      backdropUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1920&q=85',
      teaserVideoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      streamHlsUrl: 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8',
      year: 2026,
      duration: '20 phút',
      quality: '4K AI',
      ageRating: '16+',
      rating: 9.5,
      views: 120,
      accessType: newAccess,
      category: newCategory as Movie['category'],
      aiStyle: newAIStyle as Movie['aiStyle'],
      aiTools: ['Runway Gen-3', 'Midjourney v6.1'],
      director: 'Đạo diễn Khách mời AI',
      creatorPromptSnippet: newPrompt || 'Cinematic Vietnamese landscape with high-end prompt',
    };

    setMovies([created, ...movies]);
    setIsAddModalOpen(false);
    setNewTitle('');
    setNewPrompt('');
  };

  const handleDelete = (id: string) => {
    setMovies(movies.filter((m) => m.id !== id));
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
            Tổng cộng: {movies.length} tác phẩm AI đã được tải lên và cấu hình quyền xem (Free / VIP / PPV 19K).
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

      {/* Movies Table */}
      <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--border-color)] bg-[var(--bg-primary)]/50 text-[var(--text-muted)]">
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
              {movies.map((movie) => (
                <tr key={movie.id} className="hover:bg-[var(--bg-primary)]/40 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <img
                      src={movie.posterUrl}
                      alt={movie.title}
                      className="w-12 h-16 object-cover rounded-lg flex-shrink-0"
                    />
                    <div>
                      <div className="font-bold text-[var(--text-primary)] text-sm">
                        {movie.title}
                      </div>
                      <div className="text-[11px] text-[var(--text-muted)] mt-0.5">
                        Đạo diễn: {movie.director}
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-[var(--text-primary)]">{movie.category}</div>
                    <div className="text-[11px] text-[#E0A030] flex items-center gap-1 mt-0.5">
                      <Sparkles className="w-3 h-3" />
                      <span>{movie.aiStyle}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        movie.accessType === 'vip'
                          ? 'bg-[#E0A030]/15 text-[#E0A030]'
                          : movie.accessType === 'ppv'
                          ? 'bg-[#B83A26]/15 text-[#B83A26]'
                          : 'bg-emerald-500/15 text-emerald-500'
                      }`}
                    >
                      {movie.accessType === 'vip' ? 'Gói VIP' : movie.accessType === 'ppv' ? 'Vé 19K' : 'Miễn Phí'}
                    </span>
                  </td>
                  <td className="p-4 font-mono text-[var(--text-primary)]">
                    {movie.quality}
                  </td>
                  <td className="p-4 text-[var(--text-primary)] font-semibold" suppressHydrationWarning>
                    {movie.views.toLocaleString('vi-VN')}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleDelete(movie.id)}
                        className="p-1.5 rounded hover:bg-rose-500/10 text-[var(--text-muted)] hover:text-rose-500 transition-colors"
                        title="Xóa phim"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <label className="block text-[var(--text-muted)] mb-1 font-semibold">Tên Phim</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Huyền Sử Dạ Trạch Vương AI"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[var(--text-muted)] mb-1 font-semibold">Thể Loại</label>
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
                  <label className="block text-[var(--text-muted)] mb-1 font-semibold">Phân Quyền Xem</label>
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
                <label className="block text-[var(--text-muted)] mb-1 font-semibold">Prompt Gốc / Công Cụ AI Đã Dùng</label>
                <textarea
                  rows={3}
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
                  className="px-5 py-2 rounded-lg bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold shadow"
                >
                  Xác Nhận Đăng Phim
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
