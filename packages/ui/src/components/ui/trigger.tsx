"use client";

import { useEffect, type MouseEvent } from "react";
import { Slot } from "@radix-ui/react-slot";

import { useModalContext, type TOpenParams } from "@ui/context/modal";
import { cn } from "@ui/lib/utils";
import type { _LayoutProps } from "@ui/types/globals";

type TProps<T extends object> = Omit<_LayoutProps, "params"> &
  TOpenParams<T> & {
    disabled?: boolean;
    className?: string;
    onDisabledClick?: () => void;
    onSlotClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
    forceOpen?: boolean;
    stopPropagation?: boolean;
  };

export default function ModalTrigger<T extends object>({
  children,
  disabled,
  className,
  onDisabledClick,
  onSlotClick,
  forceOpen,
  ...params
}: TProps<T>) {
  const { open } = useModalContext();

  const handleClick = (_e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    if (disabled) {
      if (onDisabledClick) {
        onDisabledClick();
      }
    } else {
      open(params);
      if (onSlotClick) {
        onSlotClick(_e);
      }
    }
  };

  useEffect(() => {
    if (forceOpen) {
      open(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forceOpen]);

  return (
    <Slot onClick={handleClick} className={cn(className)}>
      {children}
    </Slot>
  );
}
