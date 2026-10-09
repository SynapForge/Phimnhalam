# Design Brief: Hệ Thống Xem Phim & Quản Trị "Phim Nhà Làm"

<!-- impeccable:brief-schema 1 -->

## 1. Job and Audience
- **Visitor Modes**:
  - **Client Facing**: *Persuade & Experience* — Khán giả yêu thích điện ảnh và video sáng tạo AI trải nghiệm duyệt phim sống động, xem thử tức thì, thưởng thức phim toàn màn hình và nâng cấp gói VIP/PPV.
  - **Admin CMS**: *Operate* — Quản trị viên theo dõi doanh thu (PayOS), quản lý đơn đặt hàng/booking B2B và cập nhật kho phim AI.
- **Audience**: Người dùng trẻ, đam mê công nghệ, mê phim ảnh Việt và trào lưu AI video (Runway, Sora, Midjourney, Kling, Luma...).

## 2. Outcome and Proof
- **Mục tiêu cốt lõi**:
  - Biến các video AI ngắn/dài thành trải nghiệm chuẩn rạp chiếu phim kỹ thuật số (Digital Cinema).
  - Khám phá phim không độ trễ: Hover card xem video preview nhanh, bộ lọc tức thì không load lại trang.
  - Thuyết phục nâng cấp gói VIP / mua vé xem phim lẻ (PPV 48h) với bảng giá thương mại ấn tượng và thanh toán thời gian thực Realtime Payment (SSE).
- **Bằng chứng & Bản sắc**:
  - Bộ nhận diện thuần Việt: Đỏ son (`#B83A26`), Vàng hoa hòe (`#E0A030`), Đen than lá tre (`#211D18`), Trắng giấy điệp (`#F5EEE1`).
  - Font chữ Lora (tiêu đề/logo) & Be Vietnam Pro (giao diện thao tác).
  - Hỗ trợ chuyển đổi **Light & Dark Mode** nhịp nhàng chuẩn Brand: Nền Đen than rạp chiếu ban đêm vs Nền Trắng giấy điệp thanh nhã ban ngày.

## 3. Technology Stack Bắt Buộc

- **Framework**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS (Tailwind v4), CSS Variables tokens
- **Theming**: Song song Light / Dark Mode với CSS Variables & Zustand theme persistence
- **Video Engine**: Cloudflare Stream Player SDK / Hls.js (Adaptive Bitrate Streaming HLS)
- **State Management**: **Zustand** (Theme, Watchlist, History, Realtime filter state, Cinema preferences)
- **Realtime Payment**: Server-Sent Events (SSE) cập nhật trạng thái đơn hàng PayOS tức thì
- **SEO & Tracking**:
  - Schema.org `Movie` & `VideoObject` JSON-LD (Google Rich Snippets)
  - Core Web Vitals (LCP < 1.8s, CLS = 0, FID/INP tối ưu)
  - Google Analytics 4 (GA4) & Meta Pixel conversion tracking events

## 4. Chi Tiết Tính Năng Theo Kiến Trúc Phân Tầng

### Phase 1: Client Cinema Experience (Trải nghiệm khán giả)
1. **Trang chủ Catalog Điện ảnh**:
   - *Hero Slider 4K Cinema*: Video loop nền, poster lớn, hiệu ứng chuyển cảnh điện ảnh, nút "Xem Ngay" & "Thêm vào Danh Sách".
   - *Hàng phim theo Thể loại*: Phim AI Cổ trang, Viễn tưởng Cyberpunk Việt Nam, Hoạt hình AI, Kinh dị dân gian.
   - *Interactive Movie Card*: Hover mở rộng preview video ngắn (Hls.js / Cloudflare Stream low-res preview), hiển thị badge phân giải, thời lượng, tag Free/VIP/PPV và công cụ AI đã dùng.
   - *Nút Toggle Theme Light/Dark*: Tùy biến nhanh giữa Đen than lá tre và Trắng giấy điệp.
2. **Bộ Lọc Đa Tiêu Chí & Tìm Kiếm Realtime (Quản lý qua Zustand)**:
   - Thanh search tức thời (Instant Search bar).
   - Filter chip: Thể loại, Phong cách AI (Anime, Photorealistic, Cyberpunk, Tranh sơn mài), Trạng thái (Miễn phí, VIP, Vé lẻ PPV).
3. **Trang Chi Tiết Phim & Cinema Player**:
   - *Cloudflare Stream Player SDK / Hls.js Integration*: Chế độ rạp chiếu, tự động nhảy bitrate theo mạng.
   - *Mobile Cinema Controls*: Gesture chạm 2 lần / vuốt tua 10 giây, rung phản hồi (Haptic feedback API), tự động xoay ngang khi full-screen.
   - Danh sách tập phim (Episode List) & Thông tin prompt / AI model sử dụng.
   - Quản lý *Lịch sử xem (History)* và *Watchlist* bằng **Zustand** (đồng bộ LocalStorage).
4. **Bảng Giá Thương Mại & Realtime Payment UI (SSE)**:
   - Gói VIP 1 Tháng & 1 Năm + Vé phim lẻ PPV 48h.
   - Modal thanh toán QR Code PayOS hiển thị thông báo "Đang chờ thanh toán" -> "Thành công" tự động qua Server-Sent Events (SSE).
5. **SEO & Performance Optimization**:
   - Next.js dynamic metadata & Movie Schema JSON-LD.
   - Scripts GA4 & Meta Pixel tích hợp sẵn sàng đo lường phễu chuyển đổi.
   - Tối ưu LCP < 1.8s với Next Image và dynamic streaming video nạp lazy.

### Phase 2: Admin CMS Dashboard (Trang Quản trị)
1. *Mini-CRM & Quản lý Booking B2B*: Danh sách yêu cầu làm phim AI, trạng thái đơn hàng.
2. *Báo cáo Doanh thu & Tương tác*: Biểu đồ doanh thu PayOS, lượt xem và thời lượng xem trung bình.
3. *Quản trị Phim & Media*: Form tải phim lên, nhập metadata (prompt, AI tools, đạo diễn), phân quyền Free/VIP/PPV.

## 5. Scope & Next Steps
- Cài đặt các thư viện lõi: `zustand`, `hls.js`, `lucide-react`.
- Triển khai Phase 1 theo đúng quy chuẩn thiết kế.
