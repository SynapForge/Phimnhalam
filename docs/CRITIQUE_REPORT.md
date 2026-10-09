# Báo Cáo Đánh Giá Thiết Kế UI/UX: Phim Nhà Làm (Impeccable Critique)

**Target**: `src/app/page.tsx` & Component Ecosystem  
**Method**: `⚠️ DEGRADED: single-context (Deterministic CLI scan + Heuristic Design Review)`  
**Ngày đánh giá**: 09/10/2026

---

### 1. Bảng Điểm Sức Khỏe Thiết Kế (Nielsen's 10 Heuristics Score)

| # | Tiêu chí Heuristic | Điểm (0-4) | Nhận xét chi tiết |
|---|---|---|---|
| 1 | **Visibility of System Status** | **4/4** | Rất tốt: Có nhãn phân giải (4K AI), badge gói (Free/VIP/Vé 19K), tiến độ video thanh bar, SSE mô phỏng trạng thái thanh toán. |
| 2 | **Match Between System and Real World** | **4/4** | Bản sắc văn hóa độc đáo: Đen than lá tre, Trắng giấy điệp, Đỏ son mái đình. Ngôn ngữ thân thuộc ("Ai cũng là nhà làm phim", "Vào rạp VIP"). |
| 3 | **User Control and Freedom** | **3/4** | Tốt: Nút quay lại/đóng modal video, gạt theme tức thì. Cần thêm nút đóng bằng phím `Escape`. |
| 4 | **Consistency and Standards** | **4/4** | Tuyệt vời: 4 màu thương hiệu đồng nhất trên mọi card, button và modal; font Lora & Be Vietnam Pro phân cấp rành mạch. |
| 5 | **Error Prevention** | **3/4** | Ổn định: Bộ lọc realtime tự động xử lý trạng thái không có kết quả với thông báo hướng dẫn người dùng. |
| 6 | **Recognition Rather Than Recall** | **4/4** | Rất cao: Hover card phát trailer xem trước ngay lập tức; số lượng phim trong Watchlist hiển thị trực quan trên badge. |
| 7 | **Flexibility and Efficiency** | **3/4** | Tốt: Tìm kiếm realtime tức thời, filter chip nhanh; phím tắt tua video 10s trên web và double-tap trên mobile. |
| 8 | **Aesthetic and Minimalist Design** | **4/4** | Đậm chất rạp chiếu phim (Cinematic dark & Warm paper light), không bị rối mắt, layout thở tốt. |
| 9 | **Help Users Recover from Errors** | **3/4** | Nút "Đặt lại bộ lọc" (Reset) xuất hiện ngay khi người dùng chọn lọc để dễ dàng hoàn tác. |
| 10 | **Help and Documentation** | **n/a** | *(Không bắt buộc đối với bề mặt giải trí / streaming catalog)* |
| **Tổng điểm** | | **29/36 (~80.5%)** | **Xếp hạng: Strong (Mạnh mẽ & Chuẩn mực)** |

---

### 2. Đánh Giá Độ Đặc Trưng Thương Hiệu (Design Specificity Verdict)

- **LLM Design Assessment**: Giao diện **hoàn toàn thoát khỏi khuôn mẫu generic/templated của các web phim thông thường**. Việc phối hợp nền Đen than lá tre (`#211D18`) và Trắng giấy điệp (`#F5EEE1`) cùng icon Mái Đình - Nút Play tạo nên linh hồn điện ảnh dân gian Việt Nam hiếm có.
- **Deterministic Scan (`impeccable detect`)**:
  - Phát hiện 1 Anti-pattern nhẹ tại `PricingModal.tsx` (dòng 167):
    - `animate-bounce`: Hiệu ứng nảy lò xo khi thanh toán thành công có cảm giác hơi "tacky" (cũ kỹ). Đề xuất chuyển sang chuyển động mượt mà hoặc scale phóng nhẹ (`ease-out-expo` / `transition-all duration-300`).

---

### 3. Những Điểm Làm Tốt Nhất (What's Working)
1. **Logo & Navbar tinh chỉnh hoàn hảo**: Sau khi bỏ slogan trên header, logo Mái Đình và chữ *Phim Nhà Làm* hiển thị gọn gàng, tỉ lệ căn lề và độ co giãn không còn bị tràn trên bất kỳ độ phân giải nào.
2. **Cơ chế Dual Theme đối xứng**: Cả 2 chế độ Dark (Đen Than) và Light (Trắng Giấy Điệp) đều giữ được sự tương phản ấm áp, chuyển đổi êm mượt không bị chói sáng.
3. **Card phim thông minh**: Tự động loop video teaser khi hover mang lại cảm giác trải nghiệm tương tác cao cấp như Netflix / Apple TV+.

---

### 4. Các Điểm Cần Tối Ưu Ưu Tiên (Priority Issues)
1. **Anti-pattern Motion**: Thay `animate-bounce` ở icon thanh toán thành công bằng hiệu ứng scale nhẹ nhàng tinh tế.
2. **Hỗ trợ phím tắt Keyboard Accessibility**: Bổ sung lắng nghe sự kiện phím `Escape` để tắt `CinemaPlayerModal` và `PricingModal`.
3. **Tối ưu thẻ `<img>` sang Next/Image**: Một số ảnh đang dùng thẻ `<img>` gốc; có thể chuyển dần sang `<Image />` để tăng tốc độ tải LCP dưới 1.5s.
