import type { Metadata } from "next";
import { Lora, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import NetworkStatusBanner from "@/components/common/NetworkStatusBanner";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin", "vietnamese"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const beVietnamPro = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Phim Nhà Làm - Ai Cũng Là Nhà Làm Phim | AI Cinema",
  description: "Nền tảng phim điện ảnh và video ngắn thế hệ mới sáng tạo bằng AI mang đậm bản sắc văn hóa Việt Nam.",
  keywords: ["phim ai", "ai cinema", "phim nha lam", "video ai", "runway", "kling ai", "sora viet nam"],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Phim Nhà Làm - Ai Cũng Là Nhà Làm Phim",
    description: "Khám phá các tác phẩm điện ảnh và video sáng tạo đột phá từ công nghệ AI.",
    siteName: "Phim Nhà Làm",
    locale: "vi_VN",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" suppressHydrationWarning className="dark">
      <body
        className={`${lora.variable} ${beVietnamPro.variable} antialiased selection:bg-[#B83A26] selection:text-[#F5EEE1]`}
      >
        <NetworkStatusBanner />
        {children}
      </body>
    </html>
  );
}
