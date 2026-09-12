"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

type ProductShotProps = {
  src: string;
  alt: string;
  fallback: ReactNode;
  priority?: boolean;
};

export function ProductShot({
  src,
  alt,
  fallback,
  priority = false,
}: ProductShotProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-[0_24px_50px_-30px_rgba(0,0,0,0.25)]">
      {failed || !src ? (
        fallback
      ) : (
        <Image
          src={src}
          alt={alt}
          width={1280}
          height={860}
          unoptimized
          priority={priority}
          onError={() => setFailed(true)}
          className="h-auto w-full"
        />
      )}
    </div>
  );
}
