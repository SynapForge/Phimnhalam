import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MovieCategory, AIStyle, AccessType } from '@/types/movie';

export interface BookingOrder {
  id: string;
  clientName: string;
  company?: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  deadline: string;
  status: 'pending' | 'reviewing' | 'completed';
  notes: string;
  createdAt?: string;
  fromStudio?: boolean;
}

interface CinemaStoreState {
  // Theme state
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Language state (i18n)
  language: 'vi' | 'en';
  setLanguage: (lang: 'vi' | 'en') => void;
  toggleLanguage: () => void;

  // Realtime Filter state
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: MovieCategory;
  setSelectedCategory: (category: MovieCategory) => void;
  selectedAIStyle: AIStyle | 'Tất cả';
  setSelectedAIStyle: (style: AIStyle | 'Tất cả') => void;
  selectedAccessType: AccessType | 'all';
  setSelectedAccessType: (access: AccessType | 'all') => void;
  resetFilters: () => void;

  // Watchlist & History
  watchlist: string[]; // movie IDs
  toggleWatchlist: (movieId: string) => void;
  isInWatchlist: (movieId: string) => boolean;
  clearWatchlist: () => void;

  watchHistory: { movieId: string; timestamp: number; progressSeconds: number; episode?: number }[];
  addToHistory: (movieId: string, progressSeconds: number, episode?: number) => void;
  removeFromHistory: (movieId: string) => void;
  clearWatchHistory: () => void;

  // Modal Player / Preview State
  activePreviewMovieId: string | null;
  setActivePreviewMovieId: (movieId: string | null) => void;

  // User & Membership Auth
  user: { id: string; name: string; email: string; isVip: boolean; phone?: string } | null;
  login: (email: string, name?: string) => void;
  logout: () => void;
  upgradeVip: () => void;

  // B2B & Studio Booking Orders (Synced across Admin CMS & Studio Page)
  bookings: BookingOrder[];
  addBooking: (booking: Omit<BookingOrder, 'id' | 'status' | 'createdAt'>) => BookingOrder;
  updateBookingStatus: (id: string, status: 'pending' | 'reviewing' | 'completed') => void;
}

export const useCinemaStore = create<CinemaStoreState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => {
        const nextTheme = get().theme === 'dark' ? 'light' : 'dark';
        if (typeof document !== 'undefined') {
          if (nextTheme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
          }
        }
        set({ theme: nextTheme });
      },
      setTheme: (theme) => {
        if (typeof document !== 'undefined') {
          if (theme === 'light') {
            document.documentElement.classList.remove('dark');
            document.documentElement.classList.add('light');
          } else {
            document.documentElement.classList.remove('light');
            document.documentElement.classList.add('dark');
          }
        }
        set({ theme });
      },

      // Language (i18n)
      language: 'vi',
      setLanguage: (language) => set({ language }),
      toggleLanguage: () => {
        const nextLang = get().language === 'vi' ? 'en' : 'vi';
        set({ language: nextLang });
      },

      // Filters
      searchQuery: '',
      setSearchQuery: (searchQuery) => set({ searchQuery }),
      selectedCategory: 'Tất cả',
      setSelectedCategory: (selectedCategory) => set({ selectedCategory }),
      selectedAIStyle: 'Tất cả',
      setSelectedAIStyle: (selectedAIStyle) => set({ selectedAIStyle }),
      selectedAccessType: 'all',
      setSelectedAccessType: (selectedAccessType) => set({ selectedAccessType }),
      resetFilters: () =>
        set({
          searchQuery: '',
          selectedCategory: 'Tất cả',
          selectedAIStyle: 'Tất cả',
          selectedAccessType: 'all',
        }),

      // Watchlist
      watchlist: ['42000015197', '41000105764'],
      toggleWatchlist: (movieId) => {
        const current = get().watchlist;
        const exists = current.includes(movieId);
        set({
          watchlist: exists ? current.filter((id) => id !== movieId) : [...current, movieId],
        });
      },
      isInWatchlist: (movieId) => get().watchlist.includes(movieId),
      clearWatchlist: () => set({ watchlist: [] }),

      // History
      watchHistory: [
        { movieId: '42000015197', timestamp: Date.now() - 1800000, progressSeconds: 85, episode: 1 },
        { movieId: '41000105764', timestamp: Date.now() - 7200000, progressSeconds: 110, episode: 2 },
      ],
      addToHistory: (movieId, progressSeconds, episode = 1) => {
        const filtered = get().watchHistory.filter((item) => item.movieId !== movieId);
        set({
          watchHistory: [
            { movieId, timestamp: Date.now(), progressSeconds, episode },
            ...filtered.slice(0, 29), // keep latest 30
          ],
        });
      },
      removeFromHistory: (movieId) => {
        set({
          watchHistory: get().watchHistory.filter((item) => item.movieId !== movieId),
        });
      },
      clearWatchHistory: () => set({ watchHistory: [] }),

      // Preview
      activePreviewMovieId: null,
      setActivePreviewMovieId: (id) => set({ activePreviewMovieId: id }),

      // Initial Bookings
      bookings: [
        {
          id: 'BK-2026-01',
          clientName: 'Công ty Cổ phần VinFast Heritage',
          company: 'VinFast Creative',
          email: 'marketing@vinfast.vn',
          phone: '0912 345 678',
          projectType: 'Video AI TVC Quảng cáo 60s (Dân gian + Công nghệ)',
          budget: '85.000.000đ',
          deadline: '25/10/2026',
          status: 'reviewing',
          notes: 'Yêu cầu phong cách tranh sơn mài kết hợp xe điện tương lai bằng Runway Gen-3.',
          createdAt: 'Hôm qua',
          fromStudio: false,
        },
        {
          id: 'BK-2026-02',
          clientName: 'Đạo diễn độc lập Phan Gia Nhật',
          company: 'Indie Film Lab',
          email: 'nhatphan.director@gmail.com',
          phone: '0988 776 554',
          projectType: 'Trailer Phim Điện Ảnh Lịch Sử (Kling AI v1.5)',
          budget: '45.000.000đ',
          deadline: '15/11/2026',
          status: 'pending',
          notes: 'Cần hỗ trợ tạo 30 cảnh chiến trận phục trang thời Trần chuẩn xác.',
          createdAt: '2 ngày trước',
          fromStudio: false,
        },
        {
          id: 'BK-2026-03',
          clientName: 'Tập đoàn Cà phê Trung Nguyên Legend',
          company: 'Trung Nguyên Heritage',
          email: 'brand@trungnguyen.com.vn',
          phone: '0903 112 233',
          projectType: 'Phim Tài Liệu Triết Đạo Cà Phê AI 4K',
          budget: '120.000.000đ',
          deadline: '05/10/2026',
          status: 'completed',
          notes: 'Đã hoàn thiện nghiệm thu và bàn giao bộ prompt gốc.',
          createdAt: '5 ngày trước',
          fromStudio: false,
        },
      ],
      // User & Membership Auth Implementation
      user: null,
      login: (email, name) => {
        set({
          user: {
            id: `usr-${Date.now()}`,
            name: name || email.split('@')[0],
            email,
            isVip: false, // Mặc định người dùng mới chưa kích hoạt vé VIP
          },
        });
      },
      logout: () => set({ user: null }),
      upgradeVip: () => {
        const currentUser = get().user;
        if (currentUser) {
          set({ user: { ...currentUser, isVip: true } });
        }
      },

      // B2B & Studio Booking Orders Implementation
      addBooking: (newOrder) => {
        const order: BookingOrder = {
          ...newOrder,
          id: `ST-${Date.now().toString().slice(-6)}`,
          status: 'pending',
          createdAt: 'Vừa xong',
        };
        set({ bookings: [order, ...get().bookings] });
        return order;
      },
      updateBookingStatus: (id, status) => {
        set({
          bookings: get().bookings.map((b) => (b.id === id ? { ...b, status } : b)),
        });
      },
    }),
    {
      name: 'phimnhalam-cinema-storage',
      partialize: (state) => ({
        theme: state.theme,
        language: state.language,
        watchlist: state.watchlist,
        watchHistory: state.watchHistory,
        bookings: state.bookings,
        user: state.user,
      }),
    }
  )
);
