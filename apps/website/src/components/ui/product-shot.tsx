"use client";

import Image, { type StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";

type ProductShotProps = {
  src: string | StaticImageData;
  alt: string;
  fallback?: ReactNode;
  priority?: boolean;
};

export function ProductShot({
  src,
  alt,
  fallback = null,
  priority = false,
}: ProductShotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-md border border-zinc-200 bg-white shadow-[0_24px_50px_-30px_rgba(0,0,0,0.25)]">
      {failed || !src ? (
        fallback
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1920}
          height={1048}
          unoptimized
          priority={priority}
          onError={() => setFailed(true)}
          className="h-auto w-full"
        />
      )}
    </div>
  );
}
