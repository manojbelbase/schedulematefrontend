"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@ui/components/ui/dialog";
import { useModalContext, type TOpenParams } from "@ui/context/modal-context";
import { cn } from "@ui/lib/utils";
import { ModalType, type TStoredForm } from "@ui/types/globals";

type TProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  variant: "form" | "warning" | "default";
  form?: TStoredForm;
  className?: string;
  title?: string;
  description?: string;
  children: React.ReactNode;
  EXIT_WARNING_MODAL: Keys.TModalKeys;
};

export default function Modal({
  open,
  onOpenChange,
  children,
  title,
  description,
  form,
  variant,
  className,
  EXIT_WARNING_MODAL,
}: TProps) {
  const { open: openWarningModal } = useModalContext();
  const handleChange = (open: boolean) => {
    if (variant === "form" && form && form.formState.isDirty) {
      openWarningModal({
        modalID: EXIT_WARNING_MODAL,
        type: ModalType.MODAL,
        data: {
          close: () => onOpenChange(open),
          closeOpener: () => onOpenChange(open),

          // The exit-warning modal consumes this payload; its shape is owned by the registry component.
        } as Record<string, unknown>,
      } as TOpenParams);
    } else {
      onOpenChange?.(open);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleChange}>
      <DialogContent className={cn("flex flex-col overflow-hidden", className)}>
        <DialogTitle
          className={cn(
            !title && "sr-only",
            "w-full text-center text-xl font-medium mb-6",
          )}
        >
          {title || "Modal"}
        </DialogTitle>
        <DialogDescription className={cn(!description && "sr-only")}>
          {description || "A Dialog Opened"}
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
}
