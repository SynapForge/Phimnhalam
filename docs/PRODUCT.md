# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Tailwind v4), CSS Variables tokens
- **Theming**: Song song Light & Dark Mode (Dark: Đen than lá tre, Light: Trắng giấy điệp)
- **Video Playback Engine**: Cloudflare Stream Player SDK / Hls.js
- **State Management**: Zustand (Theme, Watchlist, History, Filter state, Cinema preferences)
- **Realtime Integration**: Realtime Payment UI (Server-Sent Events - SSE) cho trạng thái thanh toán PayOS
- **SEO & Tracking**: Schema.org Movie & VideoObject JSON-LD, Core Web Vitals (LCP < 1.8s), Google Analytics 4 (GA4), Meta Pixel

## Users

Khán giả đại chúng yêu thích xem phim online, đặc biệt là các thể loại phim do AI tạo ra (AI-generated video / AI cinema) và các tác phẩm sáng tạo độc lập mang dấu ấn văn hóa Việt Nam. Người dùng tìm kiếm trải nghiệm khám phá, tìm kiếm và xem phim nhanh chóng, mượt mà trên nền tảng web hiện đại.

## Product Purpose

Cung cấp nền tảng web trực tuyến chuyên phát và trình chiếu các tác phẩm phim ngắn, video được tạo bằng trí tuệ nhân tạo (AI Video Cinema) với tinh thần "Phim Nhà Làm - Ai cũng là nhà làm phim". Tôn vinh nét đẹp điện ảnh truyền thống giao thoa với công nghệ hiện đại.

## Positioning

Nền tảng phát phim AI video đầu tiên kết hợp bản sắc văn hóa Việt (màu sắc dân gian: Đỏ son, Vàng hoa hòe, Đen than lá tre, Trắng giấy điệp) cùng công nghệ streaming thích ứng hiện đại (Cloudflare Stream/Hls.js) và cơ chế thanh toán tức thời (SSE).

## Operating Context

- Trình duyệt máy tính (Desktop) và thiết bị di động (Mobile responsive).
- Người xem duyệt danh mục phim, xem đoạn giới thiệu ngắn (trailer/preview), lọc theo thể loại phim AI, đọc thông tin tác phẩm/tác giả và thưởng thức phim với trình phát video chất lượng cao thích ứng băng thông.

## Capabilities and Constraints

- **Capabilities**:
  - Danh mục phim AI phân loại theo thể loại, phong cách prompt, tác giả.
  - Bộ lọc đa tiêu chí (Thể loại, Phong cách AI, Gói cước Free/VIP/PPV) kết hợp Instant Search.
  - Cloudflare Stream / Hls.js Video Player: Tự động điều chỉnh độ phân giải, gesture vuốt tua 10s mobile, haptic feedback, auto fullscreen xoay ngang.
  - Zustand State: Quản lý Theme (Light/Dark), Watchlist, Lịch sử xem (History), trạng thái bộ lọc.
  - Realtime Payment UI (SSE): Hiển thị trạng thái giao dịch PayOS QR Code cập nhật tức thì.
  - Bảng giá gói VIP & Vé lẻ PPV 48h.
  - Admin CMS Mini-CRM và Quản lý Phim.
- **Constraints**:
  - Tối ưu Core Web Vitals với mục tiêu LCP < 1.8s, CLS = 0.
  - Tuân thủ bảng 4 màu cốt lõi và hệ thống Typography Lora + Be Vietnam Pro.

## Brand Commitments

### 1. Tên gọi & Slogan
- **Tên thương hiệu**: **Phim Nhà Làm**
- **Slogan / Tagline**: *"Ai cũng là nhà làm phim"*

### 2. Bảng màu chủ đạo (Brand Palette) - 4 màu cốt lõi
- **Đỏ son**: `#B83A26` — Màu nhấn chính (Primary Accent / CTA).
- **Vàng hoa hòe**: `#E0A030` — Màu điểm xuyết (Secondary Accent / Badges / Highlight).
- **Đen than lá tre**: `#211D18` — Màu nền tối rạp chiếu (Dark Background / Cinema Surface).
- **Trắng giấy điệp**: `#F5EEE1` — Màu chữ sáng & nền chế độ sáng (Foreground / Light Background Surface).

### 3. Quy chuẩn Light & Dark Mode (Dựa trên Evidence)
- **Dark Mode (Mặc định - Rạp chiếu tối)**:
  - Nền trang: Đen than lá tre (`#211D18`)
  - Bề mặt Card/Modal: Đen than xám (`#2B2520`)
  - Chữ chính: Trắng giấy điệp (`#F5EEE1`)
  - Logo: Mái đình Vàng hoa hòe (`#E0A030`) hoặc Đỏ son (`#B83A26`), chữ Trắng giấy điệp (`#F5EEE1`)
- **Light Mode (Chế độ Trắng Giấy Điệp thanh nhã)**:
  - Nền trang: Trắng giấy điệp (`#F5EEE1`)
  - Bề mặt Card/Modal: Trắng ngà sáng (`#FFFFFF` hoặc `#EFE6D6`)
  - Chữ chính: Đen than lá tre (`#211D18`)
  - Logo: Mái đình Đỏ son (`#B83A26`), chữ Đen than lá tre (`#211D18`)

### 4. Typography (Kiểu chữ)
- **Tiêu đề & Logo (Display / Brand)**: **Lora** (Serif cổ điển, thanh lịch, mang chất điện ảnh văn hóa).
- **Phụ đề & Thân bài (Body / UI / Subtitle)**: **Be Vietnam Pro** (Sans-serif hiện đại, rõ ràng, hỗ trợ tiếng Việt hoàn hảo).

### 5. Biểu tượng & Logo (Brand Mark)
- **Biểu tượng (Icon / App Mark)**: Cách điệu kết hợp giữa **mái đình Việt truyền thống** và **nút Play video**.
- **Ứng dụng trên giao diện**:
  - Favicon/App Icon: Nền vuông bo góc màu đỏ son (`#B83A26`), biểu tượng mái đình màu trắng giấy điệp (`#F5EEE1`).

## Evidence on Hand

- Hướng dẫn nhận diện thương hiệu & màu sắc: [docs/1791453054121_2584052554044322117_g6766583990485185662_2b513a3d729517d525181bec55786711.jpg](file:///d:/project/phimnhalam/docs/1791453054121_2584052554044322117_g6766583990485185662_2b513a3d729517d525181bec55786711.jpg)
- Hướng dẫn Logo: [docs/1791453049411_2584052554044322117_g6766583990485185662_d6c2c0e55e751fd4ff5f4e4cd33cd2a7.jpg](file:///d:/project/phimnhalam/docs/1791453049411_2584052554044322117_g6766583990485185662_d6c2c0e55e751fd4ff5f4e4cd33cd2a7.jpg)

## Product Principles

1. **Văn hóa gặp gỡ Công nghệ**: Giữ bản sắc mộc mạc (Đỏ son, Đen than, Giấy điệp, Lora) đi cùng công nghệ streaming AI hàng đầu thế giới (Cloudflare Stream/Hls.js).
2. **Hiệu năng Điện ảnh Cực hạn**: Đảm bảo Core Web Vitals LCP < 1.8s, video khởi động tức thì.
3. **Thanh toán Realtime Trong Suốt**: Cơ chế SSE cập nhật trạng thái thanh toán vé phim không cần bấm tải lại trang.
