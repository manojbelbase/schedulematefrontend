"use client";

import { useEffect, type MouseEvent } from "react";
import { Slot } from "@radix-ui/react-slot";

import { useModalContext, type TOpenParams } from "@ui/context/modal-context";
import { cn } from "@ui/lib/utils";
import type { TLayoutProps } from "@ui/types/globals";

export type TTriggerProps = TLayoutProps &
  TOpenParams & {
    disabled?: boolean;
    className?: string;
    onDisabledClick?: () => void;
    onSlotClick?: (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => void;
    forceOpen?: boolean;
    stopPropagation?: boolean;
    withDelay?: boolean;
  };

export default function ModalTrigger({
  children,
  disabled,
  className,
  onDisabledClick,
  onSlotClick,
  forceOpen,
  withDelay,
  stopPropagation,
  ...params
}: TTriggerProps) {
  const { open } = useModalContext();

  const handleClick = (e: MouseEvent<HTMLElement, globalThis.MouseEvent>) => {
    const selection =
      typeof window !== "undefined" ? window.getSelection() : null;
    // If user has selected text, do nothing
    if (selection && selection.toString().length > 0) {
      return;
    }
    if (stopPropagation) e.stopPropagation();
    if (disabled) {
      if (onDisabledClick) return onDisabledClick();
      return;
    }

    if (onSlotClick) onSlotClick(e);
    if (withDelay) setTimeout(() => open(params), 200);
    else open(params);
  };

  useEffect(() => {
    if (forceOpen) open(params);
  }, [forceOpen]);

  return (
    <Slot
      onClick={handleClick}
      className={cn(className, disabled && "cursor-auto")}
    >
      {children}
    </Slot>
  );
}
