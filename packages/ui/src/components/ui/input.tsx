import * as React from "react";

import { cn, formatNumber } from "@ui/lib/utils";

export const INPUT_CLASSNAME = cn(
  "flex h-10 3xl:h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-xs 3xl:text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground dark:placeholder:text-gray-500 disabled:cursor-not-allowed disabled:opacity-50 focus:pl-3.5 transition-all ease-in-out duration-300 outline-none",
);

export type InputProps = {
  preventFocusStyles?: boolean;
  preventNegativeValues?: boolean;
  maxVal?: number;
  ignoreDefaultOnChange?: boolean;
  ignorePriceLimit?: boolean;
  value?: string | number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value">;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type,
      maxVal,
      preventFocusStyles = true,
      preventNegativeValues,
      ignoreDefaultOnChange = false,
      ignorePriceLimit = false,
      value,
      ...props
    },
    ref,
  ) => {
    const step = props.step?.toString().split(".")[1]?.length || 0;

    return (
      <input
        type={type}
        className={cn(
          "flex h-10 3xl:h-11 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus:pl-3.5 transition-all ease-in-out duration-300",
          !preventFocusStyles
            ? "focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1"
            : "outline-none focus-visible:border-primary focus-visible:ring-primary/50 ",
          className,
        )}
        ref={ref}
        {...props}
        {...(value !== undefined && { value })}
        {...(type === "number" && {
          onWheel: (e) => e.currentTarget.blur(),
        })}
        {...(type === "number" && {
          onKeyDown: (e) =>
            formatNumber(
              e,
              props.step === "any" ? undefined : step - 1,
              maxVal,
              ignorePriceLimit,
              preventNegativeValues,
            ),
          min: preventNegativeValues ? 0 : undefined,
        })}
        {...(type === "number" &&
          !ignoreDefaultOnChange && {
            onChange: (e) =>
              (
                props.onChange as ((value: string | number) => void) | undefined
              )?.(
                Number.isNaN(e.target.valueAsNumber)
                  ? ""
                  : e.target.valueAsNumber,
              ),
          })}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
