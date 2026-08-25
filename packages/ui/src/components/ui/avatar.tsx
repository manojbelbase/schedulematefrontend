"use client";

import * as React from "react";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

import { cn } from "@ui/lib/utils";

function Avatar({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Root>) {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={cn(
        "relative flex size-8 shrink-0 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    />
  );
}

function AvatarImage({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={cn("aspect-square size-full", className)}
      {...props}
    />
  );
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={cn(
        "bg-muted flex size-full items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

type TUserAvatarProps = {
  name?: string;
  src?: string;
  bg?: string;
  size?: number | string;
  shape?: "rounded" | "radius-md";
  containerClassName?: string;
  className?: string;
  quality?: number;
  withoutTitle?: boolean;
};

function getCharacters(name: string): string {
  const words = name?.split(" ");

  if (words.length > 1) {
    const charW1 = words[0]?.charAt(0);
    const charW2 = words[1]?.charAt(0);

    return (charW1 || "U") + (charW2 || "N");
  }

  const w1 = words[0];

  if (w1 && w1.length > 1) {
    return w1?.charAt(0) + w1?.charAt(1);
  }

  return w1?.charAt(0) || "U";
}

/**
 * Universal name-based avatar. Pass a `name` and it renders the initials,
 * or pass `src` to render the image.
 */
function UserAvatar({
  name,
  src,
  bg,
  size = 40,
  shape,
  containerClassName,
  className,
  withoutTitle,
}: TUserAvatarProps) {
  const pixelSize = typeof size === "number" ? `${size}px` : size || "40px";
  const fontSize =
    typeof size === "number"
      ? `${size / 2.5}px`
      : `calc(${size || "40px"} / 2.5)`;

  return (
    <Avatar
      style={{
        width: pixelSize,
        height: pixelSize,
        aspectRatio: "1 / 1",
      }}
      title={withoutTitle ? undefined : name}
      className={cn(shape === "radius-md" && "rounded-md", containerClassName)}
    >
      {src ? (
        <AvatarImage
          src={src}
          alt={`${name || "User"}'s Avatar`}
          style={{
            width: pixelSize,
            height: pixelSize,
          }}
          className={cn(
            "aspect-square h-full w-full object-cover",
            shape === "radius-md" && "rounded-md",
            className,
          )}
        />
      ) : (
        <AvatarFallback
          className={cn(
            "uppercase flex items-center justify-center text-black",
            shape === "radius-md" && "rounded-md",
            className,
          )}
          style={{
            backgroundColor: bg || "#E1E6FF",
            width: pixelSize,
            height: pixelSize,
            fontSize,
          }}
          title={withoutTitle ? undefined : name || "Avatar"}
        >
          {getCharacters(name || "undefined")}
        </AvatarFallback>
      )}
    </Avatar>
  );
}

export { Avatar, AvatarImage, AvatarFallback };
export default UserAvatar;
