# Social Tools - Công cụ Chia sẻ Mạng Xã hội

Ứng dụng web giúp tạo và tối ưu nội dung cho các nền tảng mạng xã hội khác nhau sử dụng AI Gemini 2.0 Flash.

## ✨ Tính năng

- **Tạo nội dung thông minh**: Sử dụng Gemini AI để tối ưu nội dung
- **Đa nền tảng**: Hỗ trợ Facebook, Twitter, Instagram, LinkedIn, TikTok, YouTube
- **Chọn tông giọng**: 7 tông giọng khác nhau (bình thường, chuyên nghiệp, hài hước, v.v.)
- **Mẫu có sẵn**: Các mẫu nội dung được định nghĩa trước
- **Trang xem trước**: Giao diện riêng để xem và quản lý nội dung đã tạo
- **Lịch sử nội dung**: Lưu trữ và tìm kiếm các nội dung đã tạo
- **Giao diện tiếng Việt**: Hoàn toàn bằng tiếng Việt
- **Lưu tùy chọn**: Ghi nhớ sở thích người dùng
- **Sao chép nhanh**: Một click để sao chép nội dung
- **Responsive design**: Tối ưu cho cả desktop và mobile

## 🚀 Cài đặt

1. Clone repository:
\`\`\`bash
git clone <repository-url>
cd social-tools
\`\`\`

2. Cài đặt dependencies:
\`\`\`bash
npm install
\`\`\`

3. Tạo file `.env.local` và thêm API key của Gemini:
\`\`\`
GEMINI_API_KEY=your_gemini_api_key_here
\`\`\`

4. Chạy ứng dụng:
\`\`\`bash
npm run dev
\`\`\`

5. Mở trình duyệt và truy cập: `http://localhost:3000`

## 🎯 Cách sử dụng

### Trang chính (Tạo nội dung)
1. **Tạo nội dung**: Nhập nội dung gốc hoặc chọn từ mẫu có sẵn
2. **Chọn tông giọng**: Chọn phong cách phù hợp với mục đích
3. **Chọn nền tảng**: Đánh dấu các nền tảng muốn chia sẻ
4. **Tạo nội dung**: Hệ thống sẽ tự động chuyển đến trang xem trước

### Trang xem trước (/preview)
- **Xem chi tiết**: Hiển thị nội dung cho từng nền tảng
- **Mock preview**: Xem trước nội dung như trên nền tảng thực
- **Thống kê**: Số ký tự, hashtags, thời gian đọc
- **Sao chép nhanh**: Sao chép nội dung cho từng nền tảng
- **Cảnh báo**: Thông báo khi vượt quá giới hạn ký tự

### Trang lịch sử (/history)
- **Xem lại**: Tất cả nội dung đã tạo trước đó
- **Tìm kiếm**: Tìm kiếm theo nội dung hoặc nền tảng
- **Quản lý**: Xóa từng mục hoặc toàn bộ lịch sử
- **Sao chép lại**: Sao chép nội dung cũ để sử dụng lại

## 🛠️ Công nghệ

- **Next.js 14**: React framework
- **TypeScript**: Type safety
- **Tailwind CSS**: Styling
- **Gemini AI 2.0 Flash**: Content generation
- **React Hot Toast**: Notifications

## 📱 Nền tảng hỗ trợ

- **Facebook**: Tối đa 63,206 ký tự
- **Twitter/X**: Tối đa 280 ký tự
- **Instagram**: Tối đa 2,200 ký tự
- **LinkedIn**: Tối đa 3,000 ký tự
- **TikTok**: Tối đa 150 ký tự
- **YouTube**: Tối đa 5,000 ký tự

## 🎨 Tông giọng

- **Bình thường**: Tự nhiên, thân thiện
- **Chuyên nghiệp**: Trang trọng, lịch sự
- **Hài hước**: Vui vẻ, khôi hài
- **Thông tin**: Rõ ràng, có giá trị
- **Khẩn cấp**: Gấp gáp, cần hành động
- **Truyền cảm hứng**: Động viên, tích cực
- **Quảng cáo**: Bán hàng, thu hút

## 📄 License

MIT License
