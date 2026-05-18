export type WeddingEvent = {
  title: string;
  date: string;
  time: string;
  locationName: string;
  address: string;
  mapUrl: string;
  note?: string;
};

export type BankInfo = {
  enabled: boolean;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrImage?: string;
};

export type WeddingData = {
  groomName: string;
  brideName: string;
  weddingDate: string;
  heroImage: string;
  heroImageMobile: string;
  heroImageDesktop: string;
  ogImage: string;
  secondaryImage: string;
  galleryImages: string[];
  events: WeddingEvent[];
  mapUrl: string;
  address: string;
  phoneBride: string;
  phoneGroom: string;
  bankInfo: BankInfo;
  invitationMessage: string;
};

export const weddingData: WeddingData = {
  groomName: "Chú Rể",
  brideName: "Cô Dâu",
  weddingDate: "2026-12-20T10:00:00+07:00",
  heroImage: "/images/hero-desktop-1920x1080-blur-bg.webp",
  heroImageMobile: "/images/hero-mobile-1080x1920.webp",
  heroImageDesktop: "/images/hero-desktop-1920x1080-blur-bg.webp",
  ogImage: "/images/og-wedding-1200x630.webp",
  secondaryImage: "/images/hero-mobile-1080x1920.webp",
  galleryImages: [
    "/images/hero-desktop-1920x1080-blur-bg.webp",
    "/images/hero-mobile-1080x1920.webp",
    "/images/og-wedding-1200x630.webp"
  ],
  mapUrl: "https://maps.google.com/?q=Trung%20tam%20tiec%20cuoi",
  address: "Trung tâm tiệc cưới, Quận 1, TP. Hồ Chí Minh",
  phoneBride: "0900000001",
  phoneGroom: "0900000002",
  invitationMessage:
    "Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng mình. Chúng mình rất mong được đón bạn trong ngày vui, cùng chia sẻ những khoảnh khắc ấm áp và đáng nhớ bên người thân, bạn bè.",
  events: [
    {
      title: "Lễ ăn hỏi",
      date: "2026-12-19",
      time: "09:00",
      locationName: "Tư gia nhà gái",
      address: "Số 12, Đường Hoa Sữa, Quận 3, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Quan%203%20TP%20Ho%20Chi%20Minh",
      note: "Gia đình thân mật dùng trà và chụp hình lưu niệm."
    },
    {
      title: "Tiệc cưới",
      date: "2026-12-20",
      time: "18:00",
      locationName: "Trung tâm tiệc cưới Garden Hall",
      address: "Số 88, Đường Lá Xanh, Quận 1, TP. Hồ Chí Minh",
      mapUrl: "https://maps.google.com/?q=Quan%201%20TP%20Ho%20Chi%20Minh",
      note: "Đón khách từ 17:30. Tiệc bắt đầu lúc 18:00."
    }
  ],
  bankInfo: {
    enabled: false,
    bankName: "Ngân hàng mẫu",
    accountName: "CO DAU CHU RE",
    accountNumber: "0000000000",
    qrImage: "/images/gift-qr.png"
  }
};
