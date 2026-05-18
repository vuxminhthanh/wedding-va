import { MapPin, MessageCircle, Phone } from "lucide-react";

export function FloatingActions() {
  return (
    <nav
      aria-label="Thao tác nhanh"
      className="fixed inset-x-0 bottom-3 z-40 px-4 sm:hidden"
    >
      <div className="mx-auto grid max-w-sm grid-cols-3 gap-2 rounded-full bg-ivory/94 p-2 shadow-soft ring-1 ring-sage/12 backdrop-blur">
        <a
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full bg-sage px-3 text-xs font-semibold text-white"
          href="#rsvp"
        >
          <MessageCircle aria-hidden="true" className="h-4 w-4" />
          Tham gia
        </a>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-3 text-xs font-semibold text-sage-deep hover:bg-sage/10"
          href="#locations"
        >
          <MapPin aria-hidden="true" className="h-4 w-4" />
          Địa điểm
        </a>
        <a
          className="inline-flex min-h-11 items-center justify-center gap-1 rounded-full px-3 text-xs font-semibold text-sage-deep hover:bg-sage/10"
          href="#locations"
        >
          <Phone aria-hidden="true" className="h-4 w-4" />
          Gọi
        </a>
      </div>
    </nav>
  );
}
