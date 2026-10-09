import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { MovieCategory, AIStyle, AccessType } from '@/types/movie';

interface CinemaStoreState {
  // Theme state
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  setTheme: (theme: 'dark' | 'light') => void;

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

  watchHistory: { movieId: string; timestamp: number; progressSeconds: number }[];
  addToHistory: (movieId: string, progressSeconds: number) => void;

  // Modal Player / Preview State
  activePreviewMovieId: string | null;
  setActivePreviewMovieId: (movieId: string | null) => void;
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
      watchlist: ['phim-1', 'phim-3'],
      toggleWatchlist: (movieId) => {
        const current = get().watchlist;
        const exists = current.includes(movieId);
        set({
          watchlist: exists ? current.filter((id) => id !== movieId) : [...current, movieId],
        });
      },
      isInWatchlist: (movieId) => get().watchlist.includes(movieId),

      // History
      watchHistory: [
        { movieId: 'phim-1', timestamp: Date.now() - 3600000, progressSeconds: 142 },
      ],
      addToHistory: (movieId, progressSeconds) => {
        const filtered = get().watchHistory.filter((item) => item.movieId !== movieId);
        set({
          watchHistory: [
            { movieId, timestamp: Date.now(), progressSeconds },
            ...filtered.slice(0, 19), // keep latest 20
          ],
        });
      },

      // Preview
      activePreviewMovieId: null,
      setActivePreviewMovieId: (id) => set({ activePreviewMovieId: id }),
    }),
    {
      name: 'phimnhalam-cinema-storage',
      partialize: (state) => ({
        theme: state.theme,
        watchlist: state.watchlist,
        watchHistory: state.watchHistory,
      }),
    }
  )
);
