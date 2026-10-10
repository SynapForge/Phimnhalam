import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] text-[var(--text-primary)] p-4 text-center">
      <h2 className="font-lora text-4xl font-bold text-[#B83A26] mb-2">404</h2>
      <p className="text-sm text-[var(--text-secondary)] mb-6">Không tìm thấy trang yêu cầu hoặc phim đã ngừng chiếu.</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full bg-[#B83A26] hover:bg-[#a03220] text-[#F5EEE1] text-xs font-semibold shadow transition-transform hover:scale-105"
      >
        Về Kho Phim
      </Link>
    </div>
  );
}
