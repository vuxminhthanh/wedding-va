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
    "h-full w-full object-cover sm:w-auto sm:max-w-[min(70vw,720px)] sm:object-contain sm:object-center sm:drop-shadow-2xl";
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
    sizes: "(min-width: 640px) min(70vw, 720px), 100vw",
    src: desktopHeroImage,
    width: 1365
  });

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden bg-sage-deep text-ivory">
      <div className="botanical-image-fallback absolute inset-0" />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden scale-[1.08] bg-cover bg-center opacity-85 blur-[28px] sm:block"
        style={{ backgroundImage: `url("${desktopHeroImage}")` }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 hidden bg-gradient-to-t from-sage-deep/70 via-sage-deep/22 to-ivory/10 sm:block"
      />
      <picture className="absolute inset-0 sm:flex sm:items-center sm:justify-center">
        <source
          media="(min-width: 640px)"
          sizes="min(70vw, 720px)"
          srcSet={desktopSrcSet}
        />
        <source media="(max-width: 639px)" srcSet={mobileSrcSet} />
        <img {...mobileImageProps} alt={imageAlt} />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-t from-sage-deep/86 via-sage-deep/34 to-ink/8 sm:from-sage-deep/68 sm:via-sage-deep/16 sm:to-transparent" />
      <div className="section-shell relative z-10 pb-20 pt-28 sm:pb-28">
        <div className="mx-auto max-w-xl rounded-lg bg-sage-deep/60 px-5 py-5 text-center shadow-soft ring-1 ring-ivory/12 backdrop-blur-[2px] sm:mx-0 sm:max-w-2xl sm:bg-sage-deep/30 sm:px-6 sm:py-7 sm:text-left">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-ivory/85">
            We&apos;re getting married
          </p>
          <h1 className="mt-4 flex flex-col items-center font-serif text-4xl leading-none text-ivory sm:mt-5 sm:block sm:text-7xl sm:leading-tight">
            <span className="block sm:inline">{data.groomName}</span>
            <span className="block text-2xl leading-none text-champagne sm:mx-3 sm:inline sm:text-7xl">
              &amp;
            </span>
            <span className="block sm:inline">{data.brideName}</span>
          </h1>
          <div className="mt-4 flex items-center justify-center gap-3 text-sm font-semibold text-ivory/92 sm:mt-6 sm:justify-start sm:text-base">
            <CalendarDays aria-hidden="true" className="h-5 w-5 text-champagne" />
            <span>{weddingDate}</span>
          </div>
          <p className="mt-5 hidden max-w-xl text-base leading-8 text-ivory/88 sm:block sm:text-lg">
            Trân trọng kính mời bạn đến dự lễ cưới của chúng mình.
          </p>
          <div className="mt-5 grid grid-cols-1 gap-2 sm:mt-8 sm:flex sm:gap-3">
            <a
              className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center rounded-full bg-ivory px-3 text-xs font-semibold text-sage-deep shadow-soft transition hover:bg-cream sm:flex-none sm:px-6 sm:text-sm"
              href="#rsvp"
            >
              Xác nhận tham dự
            </a>
            <a
              className="inline-flex min-h-12 min-w-0 flex-1 items-center justify-center gap-1 rounded-full border border-ivory/42 bg-sage-deep/40 px-3 text-xs font-semibold text-ivory transition hover:bg-sage-deep/55 sm:flex-none sm:gap-2 sm:bg-transparent sm:px-6 sm:text-sm sm:hover:bg-ivory/12"
              href="#locations"
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
