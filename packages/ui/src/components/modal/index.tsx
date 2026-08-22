"use client";

import { useModalContext } from "@ui/context/modal";
import type { _TModal, TSetDirtyFn } from "@ui/types/extended";
import { ModalType } from "@ui/types/types";

import Modal from "./modal";

type TProps = {
  MODALS: {
    [x: string]: _TModal;
  };
  WARN_MODAL_KEY: Keys.TModalKeys;
};

export default function ModalX({ MODALS, WARN_MODAL_KEY }: TProps) {
  const { data, close, setDirty, open } = useModalContext();

  const allOpenModals = data.filter((d) => d) || [];

  return allOpenModals.map((modal, i) => {
    if (modal.type !== ModalType.MODAL) return null;

    const isModalOpened = modal.isOpen;
    const openedModalID = modal.modalID;
    const isModalDirty = modal.isDirty;
    const modalInitiator = modal.initiatorName;
    const data = modal.data;
    const queryKeys = modal.queryKeys;
    const onClose = modal.onClose;
    const allowExit = modal?.allowExit;

    const safeExtract = (obj: typeof MODALS, key?: Keys.TModalKeys) => {
      if (!key) return null;

      return obj[key];
    };

    const ModalComponent = openedModalID
      ? safeExtract(MODALS, openedModalID)?.component
      : undefined;

    if (!ModalComponent) {
      return null;
    }

    const handleClose = () => {
      if (openedModalID) {
        close(openedModalID);
        if (onClose) onClose();
      }
    };

    const setDirtyCallback: TSetDirtyFn = (form, ignoredFields) => {
      if (setDirty && openedModalID) {
        if (typeof form === "boolean") {
          return setDirty(form, openedModalID);
        }

        const dirtyFieldKeys = Object?.keys(
          form?.formState?.dirtyFields || {},
        ).filter((key) => !ignoredFields?.includes(key));

        return setDirty(dirtyFieldKeys.length > 0, openedModalID);
      }

      return () => {};
    };

    return (
      <Modal
        key={modal.uid ?? i}
        open={isModalOpened}
        onOpenChange={handleClose}
        title={safeExtract(MODALS, openedModalID)?.title}
        description={safeExtract(MODALS, openedModalID)?.description}
        variant={safeExtract(MODALS, openedModalID)?.variant}
        isFormDirty={isModalDirty}
        className={safeExtract(MODALS, openedModalID)?.className}
        WARN_MODAL_KEY={WARN_MODAL_KEY}
        allowExit={allowExit}
      >
        {ModalComponent && (
          <ModalComponent
            setDirty={setDirtyCallback}
            close={handleClose}
            open={open}
            initiatorName={modalInitiator}
            data={data}
            queryKeys={queryKeys}
          />
        )}
      </Modal>
    );
  });
}
