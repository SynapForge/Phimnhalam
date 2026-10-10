'use client';

import React from 'react';
import { Calendar, Phone, Mail, Plus } from 'lucide-react';
import { useCinemaStore } from '@/store/cinema-store';

export const BookingTable: React.FC = () => {
  const { bookings, updateBookingStatus } = useCinemaStore();

  const updateStatus = (id: string, newStatus: 'pending' | 'reviewing' | 'completed') => {
    updateBookingStatus(id, newStatus);
  };

  return (
    <div className="space-y-6">
      {/* Header and Quick Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)]">
        <div>
          <h2 className="font-lora text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
            Quản Lý Đơn Booking Làm Phim AI (B2B CRM)
          </h2>
          <p className="text-xs text-[var(--text-muted)] mt-1">
            Theo dõi yêu cầu sản xuất video thương mại và hợp tác sản xuất nội dung AI chuyên nghiệp.
          </p>
        </div>

        <button className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-semibold shadow transition-colors cursor-pointer self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Tạo Đơn Booking Mới</span>
        </button>
      </div>

      {/* Bookings Table */}
      <div className="rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] overflow-hidden">
        <div className="overflow-x-auto overflow-y-auto max-h-[480px] hover-scrollbar">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead className="sticky top-0 z-10 border-b border-[var(--border-color)] bg-[var(--bg-primary)]/95 backdrop-blur-md text-[var(--text-muted)]">
              <tr>
                <th className="p-4 font-semibold">Khách Hàng & Doanh Nghiệp</th>
                <th className="p-4 font-semibold">Gói Yêu Cầu</th>
                <th className="p-4 font-semibold">Ngân Sách</th>
                <th className="p-4 font-semibold">Hạn Bàn Giao</th>
                <th className="p-4 font-semibold">Trạng Thái</th>
                <th className="p-4 font-semibold text-right">Thao Tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-[var(--bg-primary)]/40 transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div className="font-semibold text-[var(--text-primary)] text-sm">
                        {booking.clientName}
                      </div>
                      {booking.fromStudio && (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-[#0068FF]/15 text-[#0068FF] border border-[#0068FF]/30">
                          Zalo Studio
                        </span>
                      )}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)] flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {booking.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {booking.phone}
                      </span>
                    </div>
                  </td>
                  <td className="p-4 max-w-xs">
                    <p className="font-medium text-[var(--text-primary)]">{booking.projectType}</p>
                    <p className="text-[11px] text-[var(--text-muted)] truncate mt-0.5">{booking.notes}</p>
                  </td>
                  <td className="p-4 font-bold text-[#E0A030] text-sm">
                    {booking.budget}
                  </td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1 text-[11px]">
                      <Calendar className="w-3.5 h-3.5 text-[var(--text-muted)]" />
                      <span>{booking.deadline}</span>
                    </span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                        booking.status === 'completed'
                          ? 'bg-emerald-500/15 text-emerald-500'
                          : booking.status === 'reviewing'
                          ? 'bg-[#E0A030]/15 text-[#E0A030]'
                          : 'bg-rose-500/15 text-rose-400'
                      }`}
                    >
                      {booking.status === 'completed'
                        ? 'Đã Nghiệm Thu'
                        : booking.status === 'reviewing'
                        ? 'Đang Sản Xuất AI'
                        : 'Chờ Tiếp Nhận'}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <select
                      value={booking.status}
                      onChange={(e) =>
                        updateStatus(
                          booking.id,
                          e.target.value as 'pending' | 'reviewing' | 'completed'
                        )
                      }
                      className="px-2 py-1 rounded-md bg-[var(--bg-primary)] border border-[var(--border-color)] text-[11px] text-[var(--text-primary)] focus:outline-none focus:border-[#E0A030]"
                    >
                      <option value="pending">Chờ tiếp nhận</option>
                      <option value="reviewing">Đang sản xuất</option>
                      <option value="completed">Đã nghiệm thu</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
