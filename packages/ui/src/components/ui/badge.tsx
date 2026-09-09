import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";

import { cn } from "@ui/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] transition-[color,box-shadow] [&>svg]:shrink-0 leading-normal",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive:
          "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40",
        outline:
          "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground bg-background",
        yellow: "bg-yellow-600/10 border-yellow-600/30 text-yellow-600",
        red: "bg-red-500/10 border-red-600/30 text-red-600",
        green: "bg-green-600/10 border-green-600/30 text-green-600",
        blue: "bg-blue-600/10 border-blue-600/30 text-blue-600",
        orange: "bg-orange-600/10 border-orange-600/30 text-orange-600",
        pending: "bg-yellow-500/20 border-yellow-300 text-yellow-600",
        processing: "bg-blue-500/20 border-blue-300 text-blue-600",
        bridging: "bg-gray-500/20 border-gray-300 text-gray-600",
        granted: "bg-green-500/20 border-green-300 text-green-600",
        rejected: "bg-red-500/20 border-red-300 text-red-600",
      },
      size: {
        md: "py-0.5",
        lg: "py-1 px-2 text-sm",
        sm: "py-0.5 px-1.5 text-[10px]",
        xs: "py-0.5 px-1.5 text-[10px]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type TBadgeVariantProps = VariantProps<typeof badgeVariants>;

function Badge({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  TBadgeVariantProps & { asChild?: boolean; shape?: "rounded" | "pill" }) {
  const Comp = asChild ? Slot.Root : "span";

  return (
    <Comp
      data-slot="badge"
      className={cn(
        badgeVariants({ variant, size }),
        className,
        props.shape === "pill" ? "rounded-sm" : "rounded-full",
      )}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
