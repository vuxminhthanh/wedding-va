import { CalendarDays, MapPin } from "lucide-react";
import { getImageProps } from "next/image";

import type { WeddingData } from "@/data/wedding";

type HeroProps = {
  data: WeddingData;
};

const dateFormatter = new Intl.DateTimeFormat("vi-VN", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

export function Hero({ data }: HeroProps) {
  const weddingDate = dateFormatter.format(new Date(data.weddingDate));
  const imageAlt = `Ảnh cưới ${data.groomName} và ${data.brideName}`;
  const desktopHeroImage = data.heroImageDesktop || data.heroImage;
  const imageClassName =
    "h-full w-full object-cover object-[center_32%] min-[769px]:w-auto min-[769px]:max-w-[min(70vw,720px)] min-[769px]:object-contain min-[769px]:object-center min-[769px]:drop-shadow-2xl";
  const {
    props: { srcSet: mobileSrcSet, ...mobileImageProps }
  } = getImageProps({
    alt: imageAlt,
    className: imageClassName,
    height: 1920,
    priority: true,
    quality: 86,
    sizes: "100vw",
    src: data.heroImageMobile || data.heroImage,
    width: 1080
  });
  const {
    props: { srcSet: desktopSrcSet }
  } = getImageProps({
    alt: imageAlt,
    className: imageClassName,
    height: 2048,
    priority: true,
    quality: 92,
    sizes: "(min-width: 769px) min(70vw, 720px), 100vw",
    src: desktopHeroImage,
    width: 1365
  });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-sage-deep text-ivory">
      <div className="botanical-image-fallback absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden scale-[1.08] bg-cover bg-center opacity-85 blur-[28px] min-[769px]:block"
        style={{ backgroundImage: `url("${desktopHeroImage}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-t from-sage-deep/70 via-sage-deep/22 to-ivory/10 min-[769px]:block"
      />
      <picture className="absolute inset-0 min-[769px]:flex min-[769px]:items-center min-[769px]:justify-center">
        <source
          media="(min-width: 769px)"
          sizes="min(70vw, 720px)"
          srcSet={desktopSrcSet}
        />
        <source media="(max-width: 768px)" srcSet={mobileSrcSet} />
        <img {...mobileImageProps} alt={imageAlt} />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/[0.78] via-sage-deep/[0.26] to-ink/[0.06] min-[769px]:from-sage-deep/[0.68] min-[769px]:via-sage-deep/[0.16] min-[769px]:to-transparent" />
      <div className="section-shell relative z-10 px-4 pb-[calc(5.75rem+env(safe-area-inset-bottom))] pt-20 min-[769px]:px-6 min-[769px]:pb-28 min-[769px]:pt-28 lg:px-8">
        <div className="mx-auto w-full max-w-none rounded-md bg-sage-deep/[0.64] px-[18px] py-[22px] text-center shadow-soft ring-1 ring-ivory/[0.12] backdrop-blur-[0.5px] min-[769px]:mx-0 min-[769px]:max-w-2xl min-[769px]:rounded-lg min-[769px]:bg-sage-deep/30 min-[769px]:px-6 min-[769px]:py-7 min-[769px]:text-left min-[769px]:backdrop-blur-[2px]">
          <p className="text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-ivory/85 min-[769px]:text-xs min-[769px]:tracking-[0.26em]">
            We&apos;re getting married
          </p>
          <h1 className="mt-3 flex flex-col items-center font-serif text-[clamp(38px,10vw,52px)] leading-[0.98] text-ivory min-[769px]:mt-5 min-[769px]:block min-[769px]:text-7xl min-[769px]:leading-tight">
            <span className="block min-[769px]:inline">{data.groomName}</span>
            <span className="block text-[0.62em] leading-none text-champagne min-[769px]:mx-3 min-[769px]:inline min-[769px]:text-7xl">
              &amp;
            </span>
            <span className="block min-[769px]:inline">{data.brideName}</span>
          </h1>
          <div className="mt-3 flex items-center justify-center gap-2 text-[15px] font-semibold text-ivory/[0.92] min-[769px]:mt-6 min-[769px]:justify-start min-[769px]:gap-3 min-[769px]:text-base">
            <CalendarDays aria-hidden="true" className="h-[18px] w-[18px] text-champagne min-[769px]:h-5 min-[769px]:w-5" />
            <span>{weddingDate}</span>
          </div>
          <p className="mt-5 hidden max-w-xl text-base leading-8 text-ivory/[0.88] min-[769px]:block min-[769px]:text-lg">
            Trân trọng kính mời bạn đến dự lễ cưới của chúng mình.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-2 min-[769px]:mt-8 min-[769px]:flex min-[769px]:gap-3">
            <a
              className="inline-flex min-h-[52px] min-w-0 flex-1 items-center justify-center rounded-full bg-ivory px-3 text-[13px] font-semibold text-sage-deep shadow-soft transition hover:bg-cream min-[769px]:min-h-12 min-[769px]:flex-none min-[769px]:px-6 min-[769px]:text-sm"
              href="#rsvp"
            >
              Xác nhận tham dự
            </a>
            <a
              className="inline-flex min-h-[52px] min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-ivory/[0.42] bg-sage-deep/[0.44] px-3 text-[13px] font-semibold text-ivory transition hover:bg-sage-deep/[0.55] min-[769px]:min-h-12 min-[769px]:flex-none min-[769px]:gap-2 min-[769px]:bg-transparent min-[769px]:px-6 min-[769px]:text-sm min-[769px]:hover:bg-ivory/12"
              href="#locations"
            >
              <MapPin aria-hidden="true" className="h-[17px] w-[17px] min-[769px]:h-4 min-[769px]:w-4" />
              Xem địa điểm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
