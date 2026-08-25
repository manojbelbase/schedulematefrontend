"use client";

import { Fragment, type ComponentProps, type ReactNode } from "react";
import { Plus } from "lucide-react";

import { type TOpenParams } from "@ui/context/modal-context";
import { type Any } from "@ui/types/globals";

import ModalTrigger from "../deployables/trigger";
import { Button } from "../ui/button";

export type TAddButtonProps = Partial<ComponentProps<typeof Button>> & {
  label: ReactNode;
  withoutShortcut?: boolean;
} & (
    | {
        onClick: () => void;
      }
    | {
        modal: TOpenParams;
      }
  );

export default function AddButton({
  label,
  children,
  withoutShortcut,
  ...rest
}: TAddButtonProps) {
  const onClick = "onClick" in rest ? rest.onClick : () => {};
  const modal = "modal" in rest ? rest.modal : undefined;

  const Component = (
    <Button
      variant="default"
      onClick={onClick}
      shortcut={
        !withoutShortcut
          ? rest.shortcut || {
              nodes: ["N"],
              key: ["n"],
            }
          : undefined
      }
      {...rest}
    >
      {children ? (
        children
      ) : (
        <Fragment>
          <Plus className="size-3 scale-165 mr-0.5" />
          {label}
        </Fragment>
      )}
    </Button>
  );

  if (modal) {
    // modal is inferred as any here because modal trigger consumes props based on type of deployable opened
    return <ModalTrigger {...(modal as Any)}>{Component}</ModalTrigger>;
  }

  return Component;
}
