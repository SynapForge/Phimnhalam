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
  clearWatchlist: () => void;

  watchHistory: { movieId: string; timestamp: number; progressSeconds: number; episode?: number }[];
  addToHistory: (movieId: string, progressSeconds: number, episode?: number) => void;
  removeFromHistory: (movieId: string) => void;
  clearWatchHistory: () => void;

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
