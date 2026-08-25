import { type UseFormReturn } from "react-hook-form";

import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { type Any } from "@ui/types/globals";

export const FormButtons = ({
  form,
  name,
  disabled,
  actionType = "Add",
  className,
  onReset,
}: {
  form: UseFormReturn<Any>;
  className?: string;
  name: string;
  disabled?: boolean;
  actionType?: "Add" | "Edit";
  onReset?: () => void;
}) => {
  return (
    <div
      className={cn(
        "mt-5 flex w-full items-center justify-between gap-4",
        className,
      )}
    >
      <Button
        type="button"
        onClick={() => (onReset ? onReset() : form.reset())}
        variant={"ghost"}
        disabled={!form.formState.isDirty || form.formState.isSubmitting}
      >
        {actionType === "Add" ? "Reset" : "Discard"}
      </Button>

      <Button
        type="submit"
        variant={"default"}
        className="rounded-sm"
        size="default"
        disabled={disabled || form.formState.isSubmitting}
      >
        Save {name}
      </Button>
    </div>
  );
};
