'use client';

import React, { useState, useEffect } from 'react';
import { useCinemaStore } from '@/store/cinema-store';
import { DICTIONARY } from '@/types/i18n';
import { Sparkles, Film, Play, Keyboard, ArrowRight, X, CheckCircle2 } from 'lucide-react';

interface OnboardingModalProps {
  onComplete?: () => void;
}

const STORAGE_KEY = 'phimnhalam_onboarded_v1';

export const OnboardingModal: React.FC<OnboardingModalProps> = ({ onComplete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const { language } = useCinemaStore();
  const t = DICTIONARY[language];

  useEffect(() => {
    // Only open on client side if user has not completed onboarding
    const seen = localStorage.getItem(STORAGE_KEY);
    if (!seen) {
      // Short delay for silky-smooth entrance after page hydration
      const timer = setTimeout(() => {
        setIsOpen(true);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = React.useCallback(() => {
    localStorage.setItem(STORAGE_KEY, 'true');
    setIsOpen(false);
    if (onComplete) onComplete();
  }, [onComplete]);

  const handleNext = () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
    } else {
      handleDismiss();
    }
  };

  // Listen to Escape key to dismiss gracefully
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        handleDismiss();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleDismiss]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-300">
      <div className="relative w-full max-w-lg rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden animate-modal-enter">
        {/* Decorative Top Accent Glow */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B83A26] via-[#E0A030] to-[#B83A26]" />

        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E0A030] px-2.5 py-0.5 rounded-full bg-[#E0A030]/10 border border-[#E0A030]/20">
              {language === 'vi' ? `Bước ${step} / 3` : `Step ${step} of 3`}
            </span>
          </div>

          <button
            onClick={handleDismiss}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 p-1 rounded-md"
            title="Esc"
          >
            <span>{t.onboardSkip}</span>
            <X className="w-4 h-4 ml-0.5" />
          </button>
        </div>

        {/* Step Content */}
        <div className="space-y-4 py-2 min-h-[220px] flex flex-col justify-center">
          {step === 1 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#B83A26]/15 border border-[#B83A26]/30 flex items-center justify-center text-[#B83A26] mx-auto sm:mx-0 shadow-inner">
                <Film className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold font-lora text-[var(--text-primary)]">
                  {t.onboardStep1Title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t.onboardStep1Desc}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-1 justify-center sm:justify-start">
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)]">
                  4K HDR Master
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)]">
                  Midjourney v7
                </span>
                <span className="text-[11px] px-2.5 py-1 rounded-full bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-muted)]">
                  Kling & Sora Cinema
                </span>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#E0A030]/15 border border-[#E0A030]/30 flex items-center justify-center text-[#E0A030] mx-auto sm:mx-0 shadow-inner">
                <Keyboard className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold font-lora text-[var(--text-primary)]">
                  {t.onboardStep2Title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t.onboardStep2Desc}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-[10px] text-[#E0A030] font-bold">
                    SPACE
                  </span>
                  <span className="text-[var(--text-secondary)] text-[11px]">
                    {language === 'vi' ? 'Phát / Tạm Dừng' : 'Play / Pause'}
                  </span>
                </div>
                <div className="p-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] flex items-center gap-2">
                  <span className="px-1.5 py-0.5 rounded bg-[var(--bg-surface)] border border-[var(--border-color)] font-mono text-[10px] text-[#E0A030] font-bold">
                    ← / →
                  </span>
                  <span className="text-[var(--text-secondary)] text-[11px]">
                    {language === 'vi' ? 'Tua 10 Giây' : 'Seek 10s'}
                  </span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300 text-center sm:text-left">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 mx-auto sm:mx-0 shadow-inner">
                <Sparkles className="w-7 h-7" />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-lg sm:text-xl font-bold font-lora text-[var(--text-primary)]">
                  {t.onboardStep3Title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  {t.onboardStep3Desc}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-gradient-to-r from-[#B83A26]/10 to-[#E0A030]/10 border border-[#E0A030]/30 flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-medium text-[var(--text-primary)]">
                  {language === 'vi'
                    ? 'Bạn đã sẵn sàng thưởng thức rạp chiếu chất lượng cao nhất.'
                    : 'You are all set for the uncompressed 4K experience.'}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Navigation & Dots */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border-color)]">
          {/* Progress Dots */}
          <div className="flex items-center gap-1.5">
            {[1, 2, 3].map((dot) => (
              <span
                key={dot}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  dot === step
                    ? 'w-6 bg-[#B83A26]'
                    : 'w-1.5 bg-[var(--border-color)]'
                }`}
              />
            ))}
          </div>

          {/* Action Button */}
          <button
            onClick={handleNext}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-bold transition-transform hover:scale-105 active:scale-95 shadow-md cursor-pointer glow-gold"
          >
            {step < 3 ? (
              <>
                <span>{t.onboardNext}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{t.onboardStart}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
