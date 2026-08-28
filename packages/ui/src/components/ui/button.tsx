"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { motion, type HTMLMotionProps, type Transition } from "motion/react";

import { useShortcut } from "@ui/hooks/use-shortcut";
import { cn } from "@ui/lib/utils";

const buttonVariants = cva(
  "relative cursor-pointer overflow-hidden inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-sm text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-3.5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        link: "text-blue-700 bg-none hover:text-blue-700 hover:underline shadow-none",
        default:
          "bg-primary text-primary-foreground hover:bg-primary/90 border border-primary",
        destructive:
          "bg-background text-destructive hover:bg-secondary border border-destructive focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background text-dark-500 dark:bg-input/30 dark:border-input dark:hover:bg-input/50 focus-visible:ring-secondary focus-visible:border-border",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 focus-visible:ring-secondary focus-visible:border-gray-300",
        ghost:
          "hover:bg-accent border border-transparent dark:hover:bg-secondary/20 shadow-none focus-visible:ring-secondary focus-visible:border focus-visible:border-gray-300",
        "table-header": "bg-none shadow-none text-dark font-semibold",
        success:
          "bg-green-500 text-white hover:bg-success/90 border border-green-600/70 focus-visible:border-green-700/50 focus-visible:ring-green-500/20 dark:focus-visible:ring-green-600/40 dark:bg-green-600/60",
      },
      size: {
        default: "h-10 px-4 py-2 has-[>svg]:px-3",
        sm: "h-9 rounded-sm gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-11 px-8 has-[>svg]:px-6",
        icon: "size-10",
        xs: "size-8",
        "icon-xs": "size-7",
        "icon-sm": "size-9",
        "icon-lg": "size-11",
        link: "h-fit px-0 py-0",
        "table-header": "h-fit px-0 py-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "sm",
    },
  },
);

const rippleVariants = cva("absolute rounded-full size-5 pointer-events-none", {
  variants: {
    variant: {
      default: "bg-secondary",
      destructive: "bg-destructive/20",
      outline: "bg-gray-300/80",
      secondary: "bg-gray-300/80",
      ghost: "bg-gray-300/70",
      success: "bg-secondary/80",
      link: "",
      "table-header": "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const shortcutVariants = cva(
  "bg-white/20 aspect-square ms-1 -me-1 inline-flex h-[17px] items-center rounded border-[0.5px] border-white/30 px-1 font-[inherit] text-[0.625rem] font-medium",
  {
    variants: {
      variant: {
        default: "bg-white/20",
        destructive: "border-destructive/30 bg-destructive/10",
        ghost: "border-border",
        outline: "bg-secondary border-border",
        secondary: "bg-background border-border",
        success: "bg-green-200",
        link: "",
        "table-header": "",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

const loadingVariants = cva("w-[1.2rem]", {
  variants: {
    variant: {
      default: "text-white",
      destructive: "text-white",
      ghost: "text-black",
      outline: "text-black",
      secondary: "text-black",
      success: "text-white",
      link: "",
      "table-header": "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type Ripple = {
  id: number;
  x: number;
  y: number;
};

type ButtonProps = HTMLMotionProps<"button"> & {
  children: React.ReactNode;
  rippleClassName?: string;
  scale?: number;
  isLoading?: boolean;
  transition?: Transition;
  shortcut?: {
    nodes: React.ReactNode[];
    key: string[];
    callback?: () => void;
    className?: string;
  };
  asChild?: boolean;
  href?: string;
  type?: "button" | "submit" | "reset"; // Explicitly define allowed types
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
} & VariantProps<typeof buttonVariants>;

function Button({
  children,
  onClick,
  disabled,
  className,
  rippleClassName,
  variant,
  size,
  scale = 10,
  isLoading,
  shortcut,
  style,
  transition = { duration: 0.6, ease: "easeOut" },
  asChild = false,
  type = "button", // Set default type to "button",
  ref,
  ...props
}: ButtonProps) {
  const [ripples, setRipples] = React.useState<Ripple[]>([]);
  const buttonOrAnchorRef = React.useRef<HTMLButtonElement>(null);

  React.useImperativeHandle(ref, () => buttonOrAnchorRef.current!);

  const createRipple = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      const element = buttonOrAnchorRef.current;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const newRipple: Ripple = {
        id: Date.now(),
        x,
        y,
      };
      setRipples((prev) => [...prev, newRipple]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
      }, 600);
    },
    [],
  );

  const handleClick = React.useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      if (disabled || isLoading) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      createRipple(event);
      onClick?.(event);
    },
    [createRipple, onClick, disabled, isLoading],
  );

  useShortcut(
    shortcut?.key || [],
    () => {
      if (shortcut?.callback) {
        shortcut.callback();
      } else {
        buttonOrAnchorRef.current?.click();
      }
    },
    !disabled && !isLoading,
  );

  // Shared UI parts
  const spinner = (
    <span
      className={`loading-spinner loading-spin loading-md ${loadingVariants({
        variant,
      })}`}
    ></span>
  );

  const overlays = (
    <>
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale, opacity: 0 }}
          transition={transition}
          className={cn(
            rippleVariants({ variant, className: rippleClassName }),
          )}
          style={{
            position: "absolute",
            top: ripple.y - 10,
            left: ripple.x - 10,
          }}
        />
      ))}
      {shortcut && (
        <kbd
          className={cn(
            shortcutVariants({ variant }),
            "relative -top-[0.5px] flex items-center justify-center",
            shortcut.className,
          )}
        >
          {shortcut?.nodes?.map((node, index) => (
            <span key={index} className="leading-[1px]">
              {node}
            </span>
          ))}
        </kbd>
      )}
    </>
  );

  // Choose rendering path explicitly to avoid union typing issues
  if (asChild) {
    const slotProps: React.ComponentPropsWithoutRef<typeof Slot> = {
      ref: buttonOrAnchorRef as unknown as React.RefObject<HTMLElement>,
      onClick: handleClick as unknown as React.MouseEventHandler<HTMLElement>,
      className: cn(
        buttonVariants({ variant, size, className }),
        "antialiased",
      ),
      // Omit style here to avoid MotionStyle vs CSSProperties type conflicts
      "aria-disabled": disabled || isLoading ? true : undefined,
      "data-disabled": disabled || isLoading ? "true" : undefined,
    } as React.ComponentPropsWithoutRef<typeof Slot>;

    const onlyChild = React.Children.only(children) as React.ReactElement<{
      children: React.ReactNode;
    }>;
    const mergedChildren = isLoading ? (
      spinner
    ) : (
      <>
        {onlyChild.props?.children}
        {overlays}
      </>
    );
    const childWithEnhancements = React.cloneElement(
      onlyChild,
      {},
      mergedChildren,
    );
    return <Slot {...slotProps}>{childWithEnhancements}</Slot>;
  }

  const buttonProps: HTMLMotionProps<"button"> = {
    ref: buttonOrAnchorRef as unknown as React.RefObject<HTMLButtonElement>,
    onClick: handleClick,
    className: cn(buttonVariants({ variant, size, className }), "antialiased"),
    style: { ...style },
    type,
    disabled: disabled || isLoading,
    whileTap: { scale: 0.95 },
    transition,
    "aria-disabled": disabled || isLoading ? true : undefined,
    ...props,
  };

  return (
    <motion.button {...buttonProps}>
      {isLoading ? (
        spinner
      ) : (
        <>
          {children}
          {overlays}
        </>
      )}
    </motion.button>
  );
}

export { type ButtonProps, buttonVariants, Button };
