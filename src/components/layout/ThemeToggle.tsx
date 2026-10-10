"use client";

import React from "react";
import { useCinemaStore } from "@/store/cinema-store";
import { Sun, Moon } from "lucide-react";

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useCinemaStore();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Chuyển đổi giao diện Sáng / Tối"
      className="relative flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--border-color)] bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] transition-all duration-200 text-xs font-medium cursor-pointer shadow-sm"
    >
      {theme === "dark" ? (
        <>
          <Sun className="w-3.5 h-3.5 text-[#E0A030] animate-pulse" />
        </>
      ) : (
        <>
          <Moon className="w-3.5 h-3.5 text-[#B83A26]" />
        </>
      )}
    </button>
  );
};
