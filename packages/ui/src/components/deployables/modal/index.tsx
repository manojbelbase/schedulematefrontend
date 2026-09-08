"use client";

import { useMemo } from "react";

import { useModalContext } from "@ui/context/modal-context";
import type { TStoredForm } from "@ui/types/globals";

import Modal from "./modal";

type TProps = {
  slot: Keys.TModalSlots;
  items: Keys.TModals;
  EXIT_WARNING_MODAL: Keys.TModalKeys;
};

export default function ModalX({ slot, items, EXIT_WARNING_MODAL }: TProps) {
  const { data, setForm, close, open } = useModalContext();

  const modals = useMemo(
    () => data.filter((d) => d.slot === slot) || [],
    [data, slot],
  );

  const safeExtract = (key: Keys.TModalKeys) => {
    return key in items
      ? items[key]
      : {
          component: null,
          variant: "default" as const,
          className: "",
          title: "",
          description: "",
        };
  };

  return modals.map((modal, i) => {
    if (modal.type !== "MODAL") return null;

    const isModalOpened = modal.isOpen;
    const modalId = modal.modalID;
    const modalData = modal.data || {};
    const modalOnClose = modal.onClose || (() => {});
    const form = modal.form;

    const {
      component: ModalComponent,
      variant,
      className,
      title = "",
      description = "",
    } = safeExtract(modalId);

    // The deployed modal components own heterogeneous props; the registry entry is widened so the
    // generic deployment layer can spread its runtime payload (close/open/data/setForm) over them.
    const ModalComp = ModalComponent as unknown as React.ComponentType<
      Record<string, unknown>
    > | null;

    const handleClose = () => {
      if (modalId) {
        close(modalId);
        modalOnClose();
      }
    };

    const setFormCallback = (form: TStoredForm) => {
      if (modalId) setForm(form, modalId);

      return () => {};
    };

    return (
      <Modal
        key={i}
        open={isModalOpened}
        onOpenChange={handleClose}
        form={form}
        variant={variant || "form"}
        title={title}
        description={description}
        className={className}
        EXIT_WARNING_MODAL={EXIT_WARNING_MODAL}
      >
        {ModalComp && (
          <ModalComp
            {...({
              close: handleClose,
              open,

              data: modalData,
              setForm: setFormCallback,
            } as Record<string, unknown>)}
          />
        )}
      </Modal>
    );
  });
}
