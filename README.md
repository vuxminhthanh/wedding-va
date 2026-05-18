# Thiệp Cưới Online

Website thiệp cưới online dùng Next.js App Router, TypeScript và Tailwind CSS. Nội dung chính được quản lý tại `data/wedding.ts`, form xác nhận tham dự gửi qua API server-side đến Google Apps Script để ghi vào Google Sheet.

## Cài đặt

```bash
npm install
npm run dev
```

Mở `http://localhost:3000`.

## Đổi thông tin thiệp

Sửa toàn bộ nội dung tại `data/wedding.ts`:

- `groomName`, `brideName`
- `displayName`
- `weddingDate`
- `heroImage`, `heroImageMobile`, `heroImageDesktop`, `ogImage`
- `secondaryImage`, `galleryImages`
- `events`
- `locations`
- `bankInfo`
- `invitationMessage`

## Thêm ảnh

Đặt ảnh vào `public/images` theo tên mặc định:

- `hero-mobile-1080x1920.webp`
- `hero-desktop-1920x1080-blur-bg.webp`
- `og-wedding-1200x630.webp`

Bạn có thể đổi tên hoặc thêm ảnh mới, chỉ cần cập nhật lại đường dẫn trong `data/wedding.ts`.

## Tạo Google Sheet và Apps Script

1. Tạo Google Sheet mới.
2. Vào `Extensions > Apps Script`.
3. Copy nội dung file `docs/google-apps-script.js` vào Apps Script.
4. Chạy `setupSheetHeaders` một lần để tạo cột.
5. Chọn `Deploy > New deployment > Web app`.
6. Chọn `Execute as: Me`.
7. Chọn `Who has access: Anyone with the link`.
8. Deploy và copy Web App URL.

Các cột được ghi: Timestamp, Name, Phone, Attending, Guests, Event, Message.
Timestamp được tạo trong Apps Script theo múi giờ Việt Nam và ghi dạng `dd/MM/yyyy`; API chỉ gửi `name`, `phone`, `attending`, `guests`, `event`, `message` đã được trim trước khi ghi Sheet.

## Biến môi trường local

Tạo file `.env.local`:

```bash
GOOGLE_SCRIPT_URL="https://script.google.com/macros/s/xxxxx/exec"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
```

Nếu thiếu biến này, website vẫn render bình thường. Form xác nhận tham dự sẽ báo lỗi cấu hình khi submit.
`NEXT_PUBLIC_SITE_URL` chỉ dùng để tạo Open Graph URL đầy đủ; khi deploy hãy đổi sang domain thật.

## Deploy Vercel

1. Push source lên GitHub/GitLab/Bitbucket.
2. Import project vào Vercel.
3. Vào `Settings > Environment Variables`.
4. Thêm `GOOGLE_SCRIPT_URL` với Web App URL của Apps Script.
5. Thêm `NEXT_PUBLIC_SITE_URL` với domain Vercel hoặc domain thật.
6. Deploy.

## Test xác nhận tham dự

1. Chạy local hoặc mở link Vercel.
2. Gửi form xác nhận tham dự với tên hợp lệ, số khách 1-10.
3. Kiểm tra Google Sheet có thêm một dòng mới.
4. Nếu lỗi, kiểm tra lại quyền deploy Apps Script và biến môi trường `GOOGLE_SCRIPT_URL`.

## Build kiểm tra

```bash
npm run build
```
