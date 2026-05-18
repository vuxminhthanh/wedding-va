import { Countdown } from "@/components/Countdown";
import { EventDetails } from "@/components/EventDetails";
import { FloatingActions } from "@/components/FloatingActions";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { GiftSection } from "@/components/GiftSection";
import { Hero } from "@/components/Hero";
import { InvitationMessage } from "@/components/InvitationMessage";
import { RSVPForm } from "@/components/RSVPForm";
import { Wishes } from "@/components/Wishes";
import { weddingData } from "@/data/wedding";

export default function Home() {
  const weddingImageAlt = `Ảnh cưới ${weddingData.groomName} và ${weddingData.brideName}`;

  return (
    <>
      <main>
        <Hero data={weddingData} />
        <Countdown weddingDate={weddingData.weddingDate} />
        <InvitationMessage data={weddingData} />
        <EventDetails events={weddingData.events} locations={weddingData.locations} />
        <Gallery imageAlt={weddingImageAlt} images={weddingData.galleryImages} />
        <RSVPForm />
        <Wishes />
        <GiftSection bankInfo={weddingData.bankInfo} />
      </main>
      <Footer data={weddingData} />
      <FloatingActions />
    </>
  );
}
