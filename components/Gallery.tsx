import { FallbackImage } from "@/components/FallbackImage";

type GalleryProps = {
  images: string[];
};

export function Gallery({ images }: GalleryProps) {
  const visibleImages = images.slice(0, 8);

  if (!visibleImages.length) {
    return null;
  }

  return (
    <section className="bg-ivory py-16 sm:py-24">
      <div className="section-shell">
        <div className="max-w-2xl">
          <p className="section-kicker">Gallery</p>
          <h2 className="mt-4 font-serif text-4xl text-sage-deep sm:text-5xl">
            Những khoảnh khắc của chúng mình
          </h2>
        </div>

        <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {visibleImages.map((image, index) => (
            <figure
              className={[
                "relative overflow-hidden rounded-lg bg-sage/10 shadow-soft",
                index === 0 ? "aspect-[4/5] lg:col-span-2 lg:row-span-2" : "aspect-[4/5]"
              ].join(" ")}
              key={`${image}-${index}`}
            >
              <FallbackImage
                fill
                alt={`Ảnh cưới ${index + 1}`}
                className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
                fallbackClassName="absolute inset-0"
                sizes={
                  index === 0
                    ? "(min-width: 1024px) 50vw, (min-width: 640px) 50vw, 100vw"
                    : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                }
                src={image}
              />
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
