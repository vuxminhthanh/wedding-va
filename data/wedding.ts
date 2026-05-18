export type WeddingEvent = {
  title: string;
  dayLabel: string;
  time: string;
  side: "bride" | "groom" | null;
  locationLabel?: string;
  note?: string;
};

export type WeddingLocation = {
  label: string;
  address: string;
  mapUrl: string;
  phone: string;
};

export type WeddingLocations = {
  brideSide: WeddingLocation;
  groomSide: WeddingLocation;
};

export type BankAccountInfo = {
  label: string;
  bankName: string;
  accountName: string;
  accountNumber: string;
  qrImage: string;
};

export type BankInfo = {
  enabled: boolean;
  accounts: BankAccountInfo[];
};

export type WeddingData = {
  groomName: string;
  brideName: string;
  displayName: string;
  weddingDate: string;
  heroImage: string;
  heroImageMobile: string;
  heroImageDesktop: string;
  ogImage: string;
  secondaryImage: string;
  galleryImages: string[];
  events: WeddingEvent[];
  locations: WeddingLocations;
  bankInfo: BankInfo;
  invitationMessage: string;
};

export const weddingData: WeddingData = {
  groomName: "Việt Anh",
  brideName: "Lê Tươi",
  displayName: "Việt Anh & Lê Tươi",
  weddingDate: "2026-05-31T10:00:00+07:00",
  heroImage: "/images/hero-desktop-1920x1080-blur-bg.webp",
  heroImageMobile: "/images/hero-mobile-1080x1920.webp",
  heroImageDesktop: "/images/hero-desktop-1920x1080-blur-bg.webp",
  ogImage: "/images/og-wedding-1200x630.webp",
  secondaryImage: "/images/wedding-invitation-photo.webp",
  galleryImages: [
    "/images/gallery/gallery-couple-floral-arch-full.webp",
    "/images/gallery/gallery-couple-floral-arch-side.webp",
    "/images/gallery/gallery-couple-garden-close.webp",
    "/images/gallery/gallery-couple-studio.webp",
    "/images/gallery/gallery-bride-portrait.webp",
    "/images/gallery/gallery-groom-portrait.webp"
  ],
  locations: {
    brideSide: {
      label: "Nhà gái",
      address: "Thôn Kha Lý, xã Bắc Thuỵ Anh, tỉnh Hưng Yên",
      mapUrl: "https://maps.app.goo.gl/M1KJSBdvR1D1dsnp8",
      phone: "0364561255"
    },
    groomSide: {
      label: "Nhà trai",
      address: "Số 21 Nguyễn Khuyến, TDP Ngoại Trình, xã Thái Thuỵ, tỉnh Hưng Yên",
      mapUrl: "https://maps.app.goo.gl/vSAcDFycFcPnMRMy5",
      phone: "0383263393"
    }
  },
  invitationMessage:
    "Sự hiện diện của bạn là niềm vinh hạnh của gia đình chúng mình. Chúng mình rất mong được đón bạn trong ngày vui, cùng chia sẻ những khoảnh khắc ấm áp và đáng nhớ bên người thân, bạn bè.",
  events: [
    {
      dayLabel: "Chủ Nhật",
      time: "09:00",
      title: "Tiệc cưới",
      side: "bride",
      locationLabel: "Nhà gái"
    },
    {
      dayLabel: "Chủ Nhật",
      time: "09:30",
      title: "Tiệc cưới",
      side: "groom",
      locationLabel: "Nhà trai"
    }
  ],
  bankInfo: {
    enabled: true,
    accounts: [
      {
        label: "Nhà trai",
        accountName: "VU VIET ANH",
        bankName: "Techcombank",
        accountNumber: "1903 8608 7610 10",
        qrImage: "/images/qr/qr-nha-trai.webp"
      },
      {
        label: "Nhà gái",
        accountName: "LE THI TUOI",
        bankName: "VPBank",
        accountNumber: "6868281200",
        qrImage: "/images/qr/qr-nha-gai.webp"
      }
    ]
  }
};
