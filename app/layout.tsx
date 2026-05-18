import type { Metadata, Viewport } from "next";

import "./globals.css";
import { weddingData } from "@/data/wedding";

const metadataBase = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
);

const coupleDisplayName = weddingData.displayName;
const siteTitle = `Thiệp cưới online - ${coupleDisplayName}`;
const siteDescription = `Thiệp cưới online của ${coupleDisplayName}, trân trọng kính mời bạn đến dự lễ cưới.`;
const imageAlt = `Ảnh cưới ${weddingData.groomName} và ${weddingData.brideName}`;

export const metadata: Metadata = {
  metadataBase,
  title: siteTitle,
  description: siteDescription,
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    images: [
      {
        url: weddingData.ogImage,
        width: 1200,
        height: 630,
        alt: imageAlt
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
