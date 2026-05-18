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
  const imageClassName = "absolute inset-0 h-full w-full object-cover";
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
    height: 1080,
    priority: true,
    quality: 86,
    sizes: "100vw",
    src: data.heroImageDesktop || data.heroImage,
    width: 1920
  });

  return (
    <section className="relative flex min-h-[92svh] items-end overflow-hidden bg-sage-deep text-ivory sm:min-h-screen">
      <div className="botanical-image-fallback absolute inset-0" />
      <picture className="absolute inset-0">
        <source media="(min-width: 640px)" srcSet={desktopSrcSet} />
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
        <img {...mobileImageProps} alt={imageAlt} />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/80 via-sage-deep/36 to-ink/10" />
      <div className="section-shell relative z-10 pb-24 pt-28 sm:pb-28">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ivory/85">
            We&apos;re getting married
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-tight text-ivory sm:text-7xl">
            {data.groomName}
            <span className="mx-3 text-champagne">&amp;</span>
            {data.brideName}
          </h1>
          <div className="mt-6 flex items-center gap-3 text-sm font-medium text-ivory/92 sm:text-base">
            <CalendarDays aria-hidden="true" className="h-5 w-5 text-champagne" />
            <span>{weddingDate}</span>
          </div>
          <p className="mt-5 max-w-xl text-base leading-8 text-ivory/88 sm:text-lg">
            Trân trọng kính mời bạn đến dự lễ cưới của chúng mình.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-ivory px-6 text-sm font-semibold text-sage-deep shadow-soft transition hover:bg-cream"
              href="#rsvp"
            >
              Xác nhận tham dự
            </a>
            <a
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ivory/42 px-6 text-sm font-semibold text-ivory transition hover:bg-ivory/12"
              href={data.mapUrl}
              rel="noreferrer"
              target="_blank"
            >
              <MapPin aria-hidden="true" className="h-4 w-4" />
              Xem địa điểm
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
