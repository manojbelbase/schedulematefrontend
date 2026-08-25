import * as NImage from "next/image";
import { forwardRef } from "react";

import { ASSETS } from "@ui/assets";
// import { ASSETS } from "@ui/assets";
import type { PartialBy } from "@ui/types/globals";

type TProps = PartialBy<NImage.ImageProps, "src" | "alt" | "height" | "width">;

const Image = forwardRef<HTMLImageElement, TProps>(
  ({ src, height, width, alt, ...props }, ref) => {
    return (
      <NImage.default
        src={src || ASSETS.PLACEHOLDER_IMAGE}
        alt={alt || "Image"}
        width={width || 1920}
        height={height || 1080}
        ref={ref}
        {...props}
      />
    );
  },
);

Image.displayName = "Image";

export default Image;
