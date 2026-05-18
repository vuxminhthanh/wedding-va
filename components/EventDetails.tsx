"use client";

import {
  Check,
  Clock,
  Copy,
  MapPin,
  Navigation,
  Phone
} from "lucide-react";
import { useState } from "react";

import type { WeddingEvent, WeddingLocations } from "@/data/wedding";

type EventDetailsProps = {
  events: WeddingEvent[];
  locations: WeddingLocations;
};

export function EventDetails({ events, locations }: EventDetailsProps) {
  const [copiedLocation, setCopiedLocation] = useState<keyof WeddingLocations | null>(
    null
  );

  const copyAddress = async (address: string, key: keyof WeddingLocations) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedLocation(key);
      window.setTimeout(() => setCopiedLocation(null), 1800);
    } catch {
      setCopiedLocation(null);
    }
  };

  const locationEntries: Array<{
    key: keyof WeddingLocations;
    location: WeddingLocations[keyof WeddingLocations];
  }> = [
    { key: "brideSide", location: locations.brideSide },
    { key: "groomSide", location: locations.groomSide }
  ];

  return (
    <>
      <section className="bg-cream py-16 sm:py-24" id="events">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Thông tin sự kiện</p>
            <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
              Lịch trình ngày vui
            </h2>
            <p className="mt-4 text-base leading-7 text-ink/70">
              Các mốc thời gian chính để bạn tiện sắp xếp tham dự cùng gia đình.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {events.map((event) => (
              <article
                className="botanical-card botanical-pattern p-5 sm:p-6"
                key={`${event.dayLabel}-${event.time}-${event.title}-${event.side ?? "family"}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
                      {event.dayLabel}
                    </p>
                    <h3 className="mt-3 font-serif text-3xl text-sage-deep">
                      {event.title}
                    </h3>
                  </div>
                  <div className="rounded-full bg-sage/10 p-3 text-sage-deep">
                    <Clock aria-hidden="true" className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-5 space-y-4 text-sm leading-6 text-ink/75">
                  <p className="flex gap-3">
                    <Clock
                      aria-hidden="true"
                      className="mt-0.5 h-4 w-4 shrink-0 text-sage"
                    />
                    <span>{event.time}</span>
                  </p>
                  {event.locationLabel ? (
                    <p className="inline-flex min-h-9 items-center gap-2 rounded-full bg-sage/10 px-3 text-sm font-semibold text-sage-deep">
                      <MapPin aria-hidden="true" className="h-4 w-4" />
                      {event.locationLabel}
                    </p>
                  ) : null}
                  {event.note ? <p className="text-ink/64">{event.note}</p> : null}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ivory py-16 sm:py-24" id="locations">
        <div className="section-shell">
          <div className="mx-auto max-w-2xl text-center">
            <p className="section-kicker">Địa điểm &amp; liên hệ</p>
            <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
              Địa điểm tổ chức
            </h2>
            <p className="mt-4 text-base leading-7 text-ink/70">
              Bạn chọn đúng bên tham dự để xem chỉ đường, gọi điện hoặc copy địa
              chỉ khi cần.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {locationEntries.map(({ key, location }) => (
              <article
                className="botanical-card botanical-pattern p-5 sm:p-6"
                key={key}
              >
                <p className="section-kicker">{location.label}</p>
                <p className="mt-4 flex gap-3 text-base leading-7 text-ink/78">
                  <MapPin
                    aria-hidden="true"
                    className="mt-1 h-5 w-5 shrink-0 text-sage"
                  />
                  <span>{location.address}</span>
                </p>
                <p className="mt-3 flex gap-3 text-base font-semibold text-sage-deep">
                  <Phone
                    aria-hidden="true"
                    className="mt-0.5 h-5 w-5 shrink-0 text-sage"
                  />
                  <span>{location.phone}</span>
                </p>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  <a
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-sage px-4 text-sm font-semibold text-white transition hover:bg-sage-deep"
                    href={location.mapUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Navigation aria-hidden="true" className="h-4 w-4" />
                    Chỉ đường
                  </a>
                  <a
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-sage-deep ring-1 ring-sage/18 transition hover:bg-cream"
                    href={`tel:${location.phone}`}
                  >
                    <Phone aria-hidden="true" className="h-4 w-4" />
                    Gọi
                  </a>
                  <button
                    className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-sage-deep ring-1 ring-sage/18 transition hover:bg-cream"
                    onClick={() => copyAddress(location.address, key)}
                    type="button"
                  >
                    {copiedLocation === key ? (
                      <Check aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Copy aria-hidden="true" className="h-4 w-4" />
                    )}
                    {copiedLocation === key ? "Đã copy" : "Copy địa chỉ"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
