"use client";

import {
  CalendarPlus,
  Check,
  Clock,
  Copy,
  MapPin,
  Navigation
} from "lucide-react";
import { useState } from "react";

import type { WeddingEvent } from "@/data/wedding";

type EventDetailsProps = {
  events: WeddingEvent[];
};

const displayDateFormatter = new Intl.DateTimeFormat("vi-VN", {
  weekday: "long",
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

function formatDisplayDate(date: string) {
  const parsed = new Date(`${date}T00:00:00+07:00`);
  return Number.isNaN(parsed.getTime()) ? date : displayDateFormatter.format(parsed);
}

function formatGoogleDate(date: Date) {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z");
}

function createCalendarUrl(event: WeddingEvent) {
  const timeMatch = event.time.match(/(\d{1,2}):(\d{2})/);

  if (!timeMatch) {
    return null;
  }

  const [, hour, minute] = timeMatch;
  const start = new Date(
    `${event.date}T${hour.padStart(2, "0")}:${minute}:00+07:00`
  );

  if (Number.isNaN(start.getTime())) {
    return null;
  }

  const end = new Date(start.getTime() + 2 * 60 * 60 * 1000);
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.title,
    dates: `${formatGoogleDate(start)}/${formatGoogleDate(end)}`,
    details: event.note ?? "",
    location: `${event.locationName}, ${event.address}`,
    ctz: "Asia/Ho_Chi_Minh"
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function EventDetails({ events }: EventDetailsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyAddress = async (address: string, index: number) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedIndex(index);
      window.setTimeout(() => setCopiedIndex(null), 1800);
    } catch {
      setCopiedIndex(null);
    }
  };

  return (
    <section className="bg-cream py-16 sm:py-24" id="events">
      <div className="section-shell">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Thông tin sự kiện</p>
          <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
            Lịch trình ngày vui
          </h2>
          <p className="mt-4 text-base leading-7 text-ink/70">
            Mỗi mốc thời gian đều có địa chỉ, chỉ đường và lịch Google Calendar
            để bạn tiện lưu lại.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {events.map((event, index) => {
            const calendarUrl = createCalendarUrl(event);

            return (
              <article
                className="botanical-card botanical-pattern p-5 sm:p-6"
                key={`${event.title}-${event.date}`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sage">
                      {formatDisplayDate(event.date)}
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
                    <Clock aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                    <span>{event.time}</span>
                  </p>
                  <p className="flex gap-3">
                    <MapPin aria-hidden="true" className="mt-0.5 h-4 w-4 shrink-0 text-sage" />
                    <span>
                      <strong className="font-semibold text-ink">
                        {event.locationName}
                      </strong>
                      <br />
                      {event.address}
                    </span>
                  </p>
                  {event.note ? <p className="text-ink/64">{event.note}</p> : null}
                </div>

                <div className="mt-6 grid gap-2 sm:grid-cols-3">
                  <a
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-sage px-4 text-sm font-semibold text-white transition hover:bg-sage-deep"
                    href={event.mapUrl}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <Navigation aria-hidden="true" className="h-4 w-4" />
                    Chỉ đường
                  </a>
                  <button
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-sage-deep ring-1 ring-sage/18 transition hover:bg-cream"
                    onClick={() => copyAddress(event.address, index)}
                    type="button"
                  >
                    {copiedIndex === index ? (
                      <Check aria-hidden="true" className="h-4 w-4" />
                    ) : (
                      <Copy aria-hidden="true" className="h-4 w-4" />
                    )}
                    {copiedIndex === index ? "Đã copy" : "Copy"}
                  </button>
                  {calendarUrl ? (
                    <a
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full bg-white px-4 text-sm font-semibold text-sage-deep ring-1 ring-sage/18 transition hover:bg-cream"
                      href={calendarUrl}
                      rel="noreferrer"
                      target="_blank"
                    >
                      <CalendarPlus aria-hidden="true" className="h-4 w-4" />
                      Lưu lịch
                    </a>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
