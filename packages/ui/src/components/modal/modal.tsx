"use client";

import { useEffect, useRef } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui/components/ui/dialog";
import { useModalContext } from "@ui/context/modal";
import { cn } from "@ui/lib/utils";
import type { TModalVariant } from "@ui/types/globals";
import { ModalType } from "@ui/types/types";

type TProps = {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;

  title?: string;
  description?: string;
  children: React.ReactNode;

  variant?: TModalVariant;
  isFormDirty?: boolean;
  className?: string;

  WARN_MODAL_KEY?: Keys.TModalKeys;
  allowExit?: boolean;
};

export default function Modal({
  children,
  title,
  description,
  onOpenChange,
  open,
  isFormDirty,
  variant,
  className,
  WARN_MODAL_KEY,
  allowExit = true,
}: TProps) {
  const { open: openWarningModal } = useModalContext();
  const container = useRef<HTMLDivElement>(null);

  const handleChange = (open: boolean): void => {
    //prevent closing when click outside or pressed escape key if allowExit is false
    if (!open && !allowExit) {
      return;
    }

    if (variant === "form" && isFormDirty && WARN_MODAL_KEY) {
      openWarningModal({
        modalID: WARN_MODAL_KEY,
        type: ModalType.MODAL,
        data: {
          closeOpener: () => onOpenChange && onOpenChange(open),
        },
      });
    } else {
      onOpenChange?.(open);
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.role === "dialog") {
        if (container.current && e.key === "ArrowDown") {
          container.current.scrollTop += 50;
        } else if (container.current && e.key === "ArrowUp") {
          container.current.scrollTop -= 50;
        } else if (container.current && e.key === "PageDown") {
          container.current.scrollTop += 150;
        } else if (container.current && e.key === "PageUp") {
          container.current.scrollTop -= 150;
        } else if (container.current && e.key === "Home") {
          container.current.scrollTop = 0;
        } else if (container.current && e.key === "Space") {
          container.current.scrollTop += 150;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent
        showCloseButton={variant !== "no-exit"}
        className={cn(className, "flex flex-col items-center p-0")}
      >
        <div
          id="content"
          data-test-id={
            title
              ? `modal-${title.replace(/\s+/g, "-").toLowerCase()}`
              : "modal-dialog-box"
          }
          ref={container}
          className={cn(
            "max-h-[90vh] overflow-y-auto w-full h-full scroll-smooth flex flex-col gap-4",
            variant === "form" && "p-6",
            variant === "no-exit" && "max-h-screen",
          )}
        >
          {!title && (
            <DialogTitle className="sr-only">Opened Dialog</DialogTitle>
          )}
          {!description && (
            <DialogDescription className="sr-only">
              Dialog Description
            </DialogDescription>
          )}
          {(title || description) && (
            <DialogHeader>
              {title && (
                <DialogTitle className={cn("text-xl font-medium")}>
                  {title}
                </DialogTitle>
              )}
              {description && (
                <DialogDescription>{description}</DialogDescription>
              )}
            </DialogHeader>
          )}
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
