import type { Metadata, Viewport } from "next";

import "./globals.css";
import { weddingData } from "@/data/wedding";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
);

export const metadata: Metadata = {
  metadataBase,
  title: `Thiệp cưới online - ${weddingData.groomName} & ${weddingData.brideName}`,
  description: `Trân trọng kính mời bạn đến dự lễ cưới của ${weddingData.groomName} và ${weddingData.brideName}.`,
  openGraph: {
    title: `${weddingData.groomName} & ${weddingData.brideName}`,
    description:
      "Thiệp cưới online với thông tin sự kiện, bản đồ và xác nhận tham dự.",
    images: [
      {
        url: weddingData.ogImage,
        width: 1200,
        height: 630,
        alt: `Thiệp cưới ${weddingData.groomName} & ${weddingData.brideName}`
      }
    ],
    locale: "vi_VN",
    type: "website"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#FAF7F1"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  );
}
