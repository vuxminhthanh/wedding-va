import type { WeddingData } from "@/data/wedding";

type FooterProps = {
  data: WeddingData;
};

const footerDateFormatter = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric"
});

export function Footer({ data }: FooterProps) {
  return (
    <footer className="bg-sage-deep px-5 pb-28 pt-12 text-center text-ivory sm:pb-12">
      <p className="text-sm leading-7 text-ivory/72">
        Cảm ơn bạn đã dành thời gian xem thiệp mời và chung vui cùng gia đình.
      </p>
      <p className="mt-5 font-serif text-4xl text-ivory">
        {data.groomName} &amp; {data.brideName}
      </p>
      <p className="mt-3 text-sm text-ivory/68">
        {footerDateFormatter.format(new Date(data.weddingDate))}
      </p>
    </footer>
  );
}
