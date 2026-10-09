'use client';

import React, { useState, useEffect } from 'react';
import { MOCK_PRICING_PLANS } from '@/data/mock-movies';
import { PricingPlan } from '@/types/movie';
import { Crown, Check, QrCode, Sparkles, CheckCircle2, X } from 'lucide-react';

interface PricingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PricingModal: React.FC<PricingModalProps> = ({ isOpen, onClose }) => {
  const [selectedPlan, setSelectedPlan] = useState<PricingPlan>(MOCK_PRICING_PLANS[1]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success'>('pending');

  // Listen for Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Simulate Realtime Payment UI (Server-Sent Events - SSE emulation)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isCheckingOut) {
      setPaymentStatus('pending');
      // Simulate real-time webhook callback via SSE after 4.5 seconds
      timer = setTimeout(() => {
        setPaymentStatus('success');
      }, 4500);
    }
    return () => clearTimeout(timer);
  }, [isCheckingOut]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isCheckingOut ? (
          <>
            {/* Header */}
            <div className="text-center space-y-2 max-w-xl mx-auto">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgba(224,160,48,0.15)] text-[#E0A030] text-xs font-semibold border border-[rgba(224,160,48,0.3)]">
                <Crown className="w-3.5 h-3.5" />
                <span>Đặc Quyền Rạp Chiếu AI</span>
              </div>
              <h2 className="font-lora text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                Nâng Cấp VIP & Vé Phim Lẻ
              </h2>
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                Thưởng thức trọn vẹn những thước phim AI đột phá không giới hạn với chất lượng 4K AI và âm thanh vòm điện ảnh.
              </p>
            </div>

            {/* Pricing Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {MOCK_PRICING_PLANS.map((plan) => (
                <div
                  key={plan.id}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative rounded-xl p-5 border flex flex-col justify-between cursor-pointer transition-all duration-200 ${
                    selectedPlan.id === plan.id
                      ? 'border-[#E0A030] bg-[rgba(224,160,48,0.06)] shadow-lg ring-1 ring-[#E0A030]'
                      : 'border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--text-muted)]'
                  }`}
                >
                  {plan.badge && (
                    <span className="absolute -top-2.5 right-4 px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#B83A26] text-[#F5EEE1] shadow">
                      {plan.badge}
                    </span>
                  )}

                  <div className="space-y-3">
                    <div>
                      <h3 className="font-lora text-base font-bold text-[var(--text-primary)]">
                        {plan.name}
                      </h3>
                      <p className="text-[11px] text-[var(--text-muted)] mt-1">
                        {plan.description}
                      </p>
                    </div>

                    <div className="pt-2">
                      <span className="text-2xl font-extrabold text-[var(--text-primary)]" suppressHydrationWarning>
                        {plan.price.toLocaleString('vi-VN')}đ
                      </span>
                      <span className="text-xs text-[var(--text-muted)] ml-1">
                        / {plan.billingCycle}
                      </span>
                    </div>

                    <ul className="space-y-2 pt-2 border-t border-[var(--border-color)] text-xs text-[var(--text-secondary)]">
                      {plan.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-[#E0A030] flex-shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPlan(plan);
                        setIsCheckingOut(true);
                      }}
                      className={`w-full py-2.5 rounded-full font-semibold text-xs transition-colors cursor-pointer ${
                        selectedPlan.id === plan.id
                          ? 'bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] shadow'
                          : 'bg-[var(--bg-surface)] hover:bg-[var(--bg-surface-elevated)] text-[var(--text-primary)] border border-[var(--border-color)]'
                      }`}
                    >
                      Chọn Gói Này
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          /* Realtime Payment Screen (Simulating PayOS QR Code & Server-Sent Events SSE) */
          <div className="text-center space-y-6 py-4 max-w-md mx-auto">
            {paymentStatus === 'pending' ? (
              <>
                <div className="space-y-2">
                  <h3 className="font-lora text-xl font-bold text-[var(--text-primary)]">
                    Quét Mã PayOS Để Kích Hoạt
                  </h3>
                  <p className="text-xs text-[var(--text-muted)]" suppressHydrationWarning>
                    Gói: <strong className="text-[var(--text-primary)]">{selectedPlan.name}</strong> • Số tiền: <strong className="text-[#E0A030]">{selectedPlan.price.toLocaleString('vi-VN')}đ</strong>
                  </p>
                </div>

                {/* QR Code Container */}
                <div className="relative mx-auto w-56 h-56 p-4 rounded-xl bg-white shadow-xl border border-[var(--border-color)] flex flex-col items-center justify-center">
                  <img
                    src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=PhimNhaLam-Payment-PayOS-Demo"
                    alt="PayOS QR Code"
                    className="w-44 h-44 object-contain"
                  />
                  <div className="absolute inset-0 border-2 border-dashed border-[#B83A26]/30 rounded-xl pointer-events-none" />
                </div>

                {/* Realtime SSE indicator */}
                <div className="flex items-center justify-center gap-2 text-xs text-[var(--text-muted)]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>Kênh SSE thời gian thực: Đang chờ ngân hàng xác nhận giao dịch...</span>
                </div>

                <button
                  onClick={() => setIsCheckingOut(false)}
                  className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] underline cursor-pointer"
                >
                  Quay lại chọn gói khác
                </button>
              </>
            ) : (
              /* Success State */
              <div className="space-y-4 py-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto text-emerald-500 transition-transform duration-500 hover:scale-110">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                </div>
                <h3 className="font-lora text-2xl font-bold text-[var(--text-primary)]">
                  Thanh Toán Thành Công!
                </h3>
                <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
                  Tài khoản của bạn đã được nâng cấp lên <strong>{selectedPlan.name}</strong>. Giờ đây bạn có thể thưởng thức toàn bộ kho phim 4K AI không giới hạn!
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-bold shadow-lg transition-transform hover:scale-105"
                >
                  Bắt Đầu Xem Phim Ngay
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
