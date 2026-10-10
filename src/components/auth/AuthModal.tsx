'use client';

import React, { useState } from 'react';
import { useCinemaStore } from '@/store/cinema-store';
import { Crown, X, Mail, Lock, User, ArrowRight } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (isVip: boolean) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
}) => {
  const { login } = useCinemaStore();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    // Giả lập đăng nhập thành công
    login(email.trim(), name.trim() || undefined);
    
    // Gọi callback: người dùng mới mặc định isVip = false
    onSuccess(false);
  };

  const handleQuickDemoLogin = (type: 'regular' | 'vip') => {
    if (type === 'vip') {
      login('vip.member@phimnhalam.vn', 'Khách VIP Rạp Chiếu');
      const store = useCinemaStore.getState();
      store.upgradeVip();
      onSuccess(true);
    } else {
      login('khan-gia@phimnhalam.vn', 'Khán Giả Trải Nghiệm');
      onSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] shadow-2xl p-6 sm:p-8 space-y-6 overflow-hidden animate-modal-enter">
        {/* Top Glow Decor */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#B83A26] via-[#E0A030] to-[#B83A26]" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[var(--bg-primary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-[#B83A26]/15 border border-[#B83A26]/30 text-[#E0A030] flex items-center justify-center mx-auto shadow-md">
            <Crown className="w-6 h-6" />
          </div>
          <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            {isRegister ? 'Tạo Tài Khoản Rạp Chiếu' : 'Đăng Nhập Vào Rạp VIP'}
          </h2>
          <p className="text-xs text-[var(--text-muted)] max-w-xs mx-auto">
            Khám phá kho phim điện ảnh AI 4K độc quyền và lưu trữ tủ phim cá nhân.
          </p>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {isRegister && (
            <div>
              <label className="block text-[var(--text-secondary)] mb-1 font-semibold">
                Tên hiển thị
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Hoàng Nam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[var(--text-secondary)] mb-1 font-semibold">
              Email hoặc Số điện thoại
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="text"
                required
                placeholder="name@example.com hoặc 0988..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[var(--text-secondary)] mb-1 font-semibold">
              Mật khẩu
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-primary)] focus:border-[#E0A030] outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] font-bold text-xs shadow-lg transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 glow-gold mt-2 cursor-pointer"
          >
            <span>{isRegister ? 'Đăng Ký & Vào Rạp' : 'Đăng Nhập Ngay'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Testing Short-cuts (Demo convenience for evaluation) */}
        <div className="pt-2 border-t border-[var(--border-color)] space-y-2">
          <div className="text-[11px] text-center text-[var(--text-muted)]">
            Đăng nhập nhanh để trải nghiệm:
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('regular')}
              className="px-2.5 py-1.5 rounded-lg border border-[var(--border-color)] hover:bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] font-medium transition-colors"
            >
              Tài khoản Thường (Chưa VIP)
            </button>
            <button
              type="button"
              onClick={() => handleQuickDemoLogin('vip')}
              className="px-2.5 py-1.5 rounded-lg bg-[#E0A030]/15 hover:bg-[#E0A030]/25 text-[#E0A030] border border-[#E0A030]/30 font-semibold transition-colors"
            >
              ★ Tài khoản Đã Có VIP
            </button>
          </div>
        </div>

        {/* Toggle Register / Login */}
        <div className="text-center text-xs text-[var(--text-muted)]">
          {isRegister ? 'Đã có tài khoản?' : 'Chưa có tài khoản rạp chiếu?'}{' '}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            className="text-[#E0A030] hover:underline font-semibold ml-1 cursor-pointer"
          >
            {isRegister ? 'Đăng nhập ngay' : 'Đăng ký miễn phí'}
          </button>
        </div>
      </div>
    </div>
  );
};
