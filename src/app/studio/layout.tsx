import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio Sản Xuất Phim & Video AI | Phim Nhà Làm",
  description:
    "Dịch vụ sản xuất video và phim ngắn AI chất lượng cao 4K chuẩn điện ảnh Việt Nam: Trailer, TVC quảng cáo, Short-Drama và chuyển giao pipeline AI Cinema.",
  keywords: [
    "AI Cinema",
    "Sản xuất phim AI",
    "TVC AI",
    "Short-Drama AI",
    "Phim Nhà Làm Studio",
    "Kling AI",
    "Runway Gen-3",
  ],
  openGraph: {
    title: "Phim Nhà Làm Studio • Generative AI Cinema Lab",
    description:
      "Studio sản xuất phim ngắn, trailer và TVC quảng cáo bằng công nghệ trí tuệ nhân tạo tạo sinh tiên tiến nhất.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
