import { FallbackImage } from "@/components/FallbackImage";
import type { WeddingData } from "@/data/wedding";

type InvitationMessageProps = {
  data: WeddingData;
};

export function InvitationMessage({ data }: InvitationMessageProps) {
  return (
    <section className="py-16 sm:py-24">
      <div className="section-shell grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-sage/10 shadow-soft">
          <FallbackImage
            fill
            alt={`Ảnh cưới ${data.groomName} và ${data.brideName}`}
            className="h-full w-full object-cover"
            fallbackClassName="absolute inset-0"
            sizes="(min-width: 1024px) 40vw, 100vw"
            src={data.secondaryImage}
          />
        </div>
        <div className="max-w-2xl">
          <p className="section-kicker">Lời mời</p>
          <h2 className="mt-4 font-serif text-4xl leading-tight text-sage-deep sm:text-5xl">
            Gửi đến những người thương mến
          </h2>
          <div className="botanical-divider ml-0" />
          <p className="whitespace-pre-line text-base leading-8 text-ink/78 sm:text-lg">
            {data.invitationMessage}
          </p>
          <p className="mt-6 font-serif text-3xl text-sage-deep">
            {data.groomName} &amp; {data.brideName}
          </p>
        </div>
      </div>
    </section>
  );
}
