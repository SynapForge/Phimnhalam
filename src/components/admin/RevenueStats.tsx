import React from 'react';
import { DollarSign, Ticket, Users, PlaySquare, ArrowUpRight } from 'lucide-react';

export const RevenueStats: React.FC = () => {
  const stats = [
    {
      title: 'Tổng Doanh Thu PayOS',
      value: '142.850.000đ',
      change: '+18.4% so với tháng trước',
      icon: DollarSign,
      color: '#E0A030',
    },
    {
      title: 'Vé Lẻ PPV 19K Đã Bán',
      value: '2.480 vé',
      change: '+310 vé trong 48h qua',
      icon: Ticket,
      color: '#B83A26',
    },
    {
      title: 'Hội Viên VIP Đang Hoạt Động',
      value: '1.240 người',
      change: '+12.5% tỷ lệ gia hạn',
      icon: Users,
      color: '#E0A030',
    },
    {
      title: 'Lượt Xem Stream AI',
      value: '845.200 lượt',
      change: 'Băng thông Cloudflare ổn định',
      icon: PlaySquare,
      color: '#B83A26',
    },
  ];

  return (
    <div className="space-y-6">
      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-3 relative overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-[var(--text-muted)]">
                  {stat.title}
                </span>
                <div
                  className="p-2 rounded-xl"
                  style={{ backgroundColor: `${stat.color}15`, color: stat.color }}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div>
                <h3 className="font-lora text-2xl font-extrabold text-[var(--text-primary)]">
                  {stat.value}
                </h3>
                <p className="text-[11px] text-emerald-500 font-medium flex items-center gap-1 mt-1">
                  <ArrowUpRight className="w-3 h-3" />
                  <span>{stat.change}</span>
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* PayOS Transaction Stream Feed */}
      <div className="p-6 rounded-2xl bg-[var(--bg-surface)] border border-[var(--border-color)] space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="font-lora text-lg font-bold text-[var(--text-primary)]">
              Luồng Giao Dịch PayOS Thời Gian Thực (SSE)
            </h3>
            <p className="text-xs text-[var(--text-muted)]">
              Tự động khớp lệnh thanh toán QR Code ngân hàng qua Webhook
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>SSE Kết Nối Trực Tiếp</span>
          </span>
        </div>

        {/* Table of recent transactions */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-[var(--border-color)] text-[var(--text-muted)]">
              <tr>
                <th className="pb-3 font-semibold">Mã Đơn</th>
                <th className="pb-3 font-semibold">Khách Hàng</th>
                <th className="pb-3 font-semibold">Loại Gói / Vé</th>
                <th className="pb-3 font-semibold">Số Tiền</th>
                <th className="pb-3 font-semibold">Cổng</th>
                <th className="pb-3 font-semibold">Trạng Thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border-color)] text-[var(--text-secondary)]">
              {[
                { id: 'PAYOS-9481', user: 'Nguyen.Minh@...', item: 'Vé Lẻ: Bến Đò Không Đèn', amount: '19.000đ', time: '1 phút trước', status: 'Thành Công' },
                { id: 'PAYOS-9480', user: 'TranBao_AI@...', item: 'VIP Tháng (Cinema Pass)', amount: '69.000đ', time: '4 phút trước', status: 'Thành Công' },
                { id: 'PAYOS-9479', user: 'CinemaLover@...', item: 'VIP Năm (Bảo Trợ Điện Ảnh)', amount: '590.000đ', time: '12 phút trước', status: 'Thành Công' },
                { id: 'PAYOS-9478', user: 'PhamVu@...', item: 'Vé Lẻ: Cổ Đô Nghìn Năm', amount: '19.000đ', time: '25 phút trước', status: 'Thành Công' },
              ].map((tx) => (
                <tr key={tx.id} className="hover:bg-[var(--bg-primary)]/40 transition-colors">
                  <td className="py-3 font-mono font-medium text-[var(--text-primary)]">{tx.id}</td>
                  <td className="py-3">{tx.user}</td>
                  <td className="py-3 font-medium text-[var(--text-primary)]">{tx.item}</td>
                  <td className="py-3 font-semibold text-[#E0A030]">{tx.amount}</td>
                  <td className="py-3">VietQR / PayOS</td>
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/15 text-emerald-500">
                      {tx.status}
                    </span>
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
