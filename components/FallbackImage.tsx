"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";

type FallbackImageProps = Omit<ImageProps, "onError"> & {
  fallbackClassName?: string;
};

export function FallbackImage({
  alt,
  className,
  fallbackClassName,
  ...props
}: FallbackImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        aria-label={alt}
        className={["botanical-image-fallback", className, fallbackClassName]
          .filter(Boolean)
          .join(" ")}
        role="img"
      />
    );
  }

  return (
    <Image
      {...props}
      alt={alt}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
