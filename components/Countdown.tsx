"use client";

import { useEffect, useState } from "react";

type CountdownProps = {
  weddingDate: string;
};

type TimeLeft = {
  total: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(targetDate: string): TimeLeft {
  const total = new Date(targetDate).getTime() - Date.now();
  const safeTotal = Math.max(total, 0);

  return {
    total,
    days: Math.floor(safeTotal / (1000 * 60 * 60 * 24)),
    hours: Math.floor((safeTotal / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((safeTotal / (1000 * 60)) % 60),
    seconds: Math.floor((safeTotal / 1000) % 60)
  };
}

const units: Array<[keyof Omit<TimeLeft, "total">, string]> = [
  ["days", "Ngày"],
  ["hours", "Giờ"],
  ["minutes", "Phút"],
  ["seconds", "Giây"]
];

export function Countdown({ weddingDate }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    const update = () => setTimeLeft(getTimeLeft(weddingDate));
    update();
    const timer = window.setInterval(update, 1000);

    return () => window.clearInterval(timer);
  }, [weddingDate]);

  if (timeLeft && timeLeft.total <= 0) {
    return (
      <section className="bg-ivory py-12">
        <div className="section-shell text-center">
          <p className="section-kicker">Thank you</p>
          <h2 className="mt-3 font-serif text-3xl text-sage-deep">
            Cảm ơn bạn đã chung vui cùng chúng mình
          </h2>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-ivory py-12">
      <div className="section-shell">
        <div className="botanical-card botanical-pattern px-4 py-7 text-center sm:px-8">
          <p className="section-kicker">Đếm ngược ngày vui</p>
          <div className="mt-6 grid grid-cols-4 gap-2 sm:gap-4">
            {units.map(([key, label]) => (
              <div
                className="rounded-lg bg-white/72 px-2 py-4 ring-1 ring-champagne/30"
                key={key}
              >
                <div className="font-serif text-3xl text-sage-deep sm:text-5xl">
                  {timeLeft ? String(timeLeft[key]).padStart(2, "0") : "--"}
                </div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-ink/58 sm:text-xs">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
