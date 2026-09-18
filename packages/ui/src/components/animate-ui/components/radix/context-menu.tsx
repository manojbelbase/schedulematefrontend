"use client";

import * as React from "react";
import { Check, ChevronRight, Circle } from "lucide-react";
import {
  AnimatePresence,
  motion,
  type HTMLMotionProps,
  type Transition,
} from "motion/react";
import { ContextMenu as ContextMenuPrimitive } from "radix-ui";

import {
  MotionHighlight,
  MotionHighlightItem,
} from "@ui/components/animate-ui/effects/motion-highlight";
import { cn } from "@ui/lib/utils";

type ContextMenuContextType = {
  isOpen: boolean;
  highlightTransition: Transition;
  animateOnHover: boolean;
};

const ContextMenuContext = React.createContext<
  ContextMenuContextType | undefined
>(undefined);

const useContextMenu = (): ContextMenuContextType => {
  const context = React.useContext(ContextMenuContext);
  if (!context) {
    throw new Error("useContextMenu must be used within a ContextMenu");
  }
  return context;
};

type ContextMenuProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Root
> & {
  transition?: Transition;
  animateOnHover?: boolean;
};

function ContextMenu({
  children,
  transition = { type: "spring", stiffness: 350, damping: 35 },
  animateOnHover = true,
  ...props
}: ContextMenuProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleOpenChange = React.useCallback(
    (open: boolean) => {
      setIsOpen(open);
      props.onOpenChange?.(open);
    },
    [props],
  );

  return (
    <ContextMenuContext.Provider
      value={{ isOpen, highlightTransition: transition, animateOnHover }}
    >
      <ContextMenuPrimitive.Root
        data-slot="dropdown-menu"
        {...props}
        onOpenChange={handleOpenChange}
      >
        {children}
      </ContextMenuPrimitive.Root>
    </ContextMenuContext.Provider>
  );
}

type ContextMenuTriggerProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Trigger
>;

function ContextMenuTrigger(props: ContextMenuTriggerProps) {
  return (
    <ContextMenuPrimitive.Trigger
      data-slot="dropdown-menu-trigger"
      {...props}
    />
  );
}

type ContextMenuGroupProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Group
>;

function ContextMenuGroup(props: ContextMenuGroupProps) {
  return (
    <ContextMenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />
  );
}

type ContextMenuPortalProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Portal
>;

function ContextMenuPortal(props: ContextMenuPortalProps) {
  return (
    <ContextMenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />
  );
}

type ContextMenuSubProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Sub
>;

function ContextMenuSub(props: ContextMenuSubProps) {
  return <ContextMenuPrimitive.Sub data-slot="dropdown-menu-sub" {...props} />;
}

type ContextMenuRadioGroupProps = React.ComponentProps<
  typeof ContextMenuPrimitive.RadioGroup
>;

function ContextMenuRadioGroup(props: ContextMenuRadioGroupProps) {
  return (
    <ContextMenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

type ContextMenuSubTriggerProps = React.ComponentProps<
  typeof ContextMenuPrimitive.SubTrigger
> & {
  inset?: boolean;
};

function ContextMenuSubTrigger({
  className,
  children,
  inset,
  disabled,
  ...props
}: ContextMenuSubTriggerProps) {
  return (
    <MotionHighlightItem disabled={disabled}>
      <ContextMenuPrimitive.SubTrigger {...props} disabled={disabled} asChild>
        <motion.div
          data-slot="dropdown-menu-sub-trigger"
          data-inset={inset}
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground [&:not([data-highlight])]:data-[state=open]:bg-accent data-[state=open]:text-accent-foreground data-[state=open]:[&_[data-chevron]]:rotate-90 [&_[data-chevron]]:transition-transform [&_[data-chevron]]:duration-150 [&_[data-chevron]]:ease-in-out [&_svg:not([class*='text-'])]:text-muted-foreground relative z-[1] flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            inset && "pl-8",
            className,
          )}
        >
          {children}
          <ChevronRight data-chevron className="ml-auto" />
        </motion.div>
      </ContextMenuPrimitive.SubTrigger>
    </MotionHighlightItem>
  );
}

type ContextMenuSubContentProps = React.ComponentProps<
  typeof ContextMenuPrimitive.SubContent
>;

function ContextMenuSubContent({
  className,
  ...props
}: ContextMenuSubContentProps) {
  return (
    <ContextMenuPrimitive.SubContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
        className,
      )}
      {...props}
    />
  );
}

type ContextMenuContentProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Content
> &
  HTMLMotionProps<"div"> & {
    transition?: Transition;
  };

function ContextMenuContent({
  className,
  children,
  transition = { duration: 0.2 },
  ...props
}: ContextMenuContentProps) {
  const { isOpen, highlightTransition, animateOnHover } = useContextMenu();

  return (
    <AnimatePresence>
      {isOpen && (
        <ContextMenuPrimitive.Portal
          forceMount
          data-slot="dropdown-menu-portal"
        >
          <ContextMenuPrimitive.Content asChild {...props}>
            <motion.div
              key="dropdown-menu-content"
              data-slot="dropdown-menu-content"
              className={cn(
                "z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-[--radix-dropdown-menu-content-transform-origin]",
                className,
              )}
              initial={{
                opacity: 0,
                scale: 0.95,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
              }}
              transition={transition}
              style={{ willChange: "opacity, transform" }}
              {...props}
            >
              <MotionHighlight
                hover
                className="rounded-sm"
                controlledItems
                transition={highlightTransition}
                enabled={animateOnHover}
              >
                {children}
              </MotionHighlight>
            </motion.div>
          </ContextMenuPrimitive.Content>
        </ContextMenuPrimitive.Portal>
      )}
    </AnimatePresence>
  );
}

type ContextMenuItemProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Item
> & {
  inset?: boolean;
  variant?: "default" | "destructive";
};

function ContextMenuItem({
  className,
  children,
  inset,
  disabled,
  variant = "default",
  ...props
}: ContextMenuItemProps) {
  return (
    <MotionHighlightItem
      activeClassName={
        variant === "default"
          ? "bg-accent"
          : "bg-destructive/10 dark:bg-destructive/20"
      }
      disabled={disabled}
    >
      <ContextMenuPrimitive.Item {...props} disabled={disabled} asChild>
        <motion.div
          data-slot="dropdown-menu-item"
          data-inset={inset}
          data-variant={variant}
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground data-[variant=destructive]:text-destructive [&:not([data-highlight])]:data-[variant=destructive]:focus:bg-destructive/10 dark:[&:not([data-highlight])]:data-[variant=destructive]:focus:bg-destructive/20 data-[variant=destructive]:focus:text-destructive data-[variant=destructive]:*:[svg]:!text-destructive [&_svg:not([class*='text-'])]:text-muted-foreground relative z-[1] flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus-visible:text-accent-foreground data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
            inset && "pl-8",
            className,
          )}
        >
          {children}
        </motion.div>
      </ContextMenuPrimitive.Item>
    </MotionHighlightItem>
  );
}

type ContextMenuCheckboxItemProps = React.ComponentProps<
  typeof ContextMenuPrimitive.CheckboxItem
>;

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  disabled,
  ...props
}: ContextMenuCheckboxItemProps) {
  return (
    <MotionHighlightItem disabled={disabled}>
      <ContextMenuPrimitive.CheckboxItem
        {...props}
        checked={checked}
        disabled={disabled}
        asChild
      >
        <motion.div
          data-slot="dropdown-menu-checkbox-item"
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
          )}
        >
          <span className="absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator data-slot="dropdown-menu-checkbox-item-indicator">
              <Check className="size-4" />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </motion.div>
      </ContextMenuPrimitive.CheckboxItem>
    </MotionHighlightItem>
  );
}

type ContextMenuRadioItemProps = React.ComponentProps<
  typeof ContextMenuPrimitive.RadioItem
>;

function ContextMenuRadioItem({
  className,
  children,
  disabled,
  ...props
}: ContextMenuRadioItemProps) {
  return (
    <MotionHighlightItem disabled={disabled}>
      <ContextMenuPrimitive.RadioItem {...props} disabled={disabled} asChild>
        <motion.div
          data-slot="dropdown-menu-radio-item"
          data-disabled={disabled}
          whileTap={{ scale: 0.95 }}
          className={cn(
            "[&:not([data-highlight])]:focus:bg-accent focus:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 pr-2 pl-8 text-sm outline-hidden select-none data-[disabled=true]:pointer-events-none data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
            className,
          )}
        >
          <span className="pointer-events-none absolute left-2 flex size-3.5 items-center justify-center">
            <ContextMenuPrimitive.ItemIndicator data-slot="dropdown-menu-radio-item-indicator">
              <Circle className="size-2 fill-current" />
            </ContextMenuPrimitive.ItemIndicator>
          </span>
          {children}
        </motion.div>
      </ContextMenuPrimitive.RadioItem>
    </MotionHighlightItem>
  );
}

type ContextMenuLabelProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Label
> & {
  inset?: boolean;
};

function ContextMenuLabel({
  className,
  inset,
  ...props
}: ContextMenuLabelProps) {
  return (
    <ContextMenuPrimitive.Label
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

type ContextMenuSeparatorProps = React.ComponentProps<
  typeof ContextMenuPrimitive.Separator
>;

function ContextMenuSeparator({
  className,
  ...props
}: ContextMenuSeparatorProps) {
  return (
    <ContextMenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

type ContextMenuShortcutProps = React.ComponentProps<"span">;

function ContextMenuShortcut({
  className,
  ...props
}: ContextMenuShortcutProps) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "text-muted-foreground ml-auto text-xs tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuGroup,
  ContextMenuPortal,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuRadioGroup,
  type ContextMenuProps,
  type ContextMenuTriggerProps,
  type ContextMenuContentProps,
  type ContextMenuItemProps,
  type ContextMenuCheckboxItemProps,
  type ContextMenuRadioItemProps,
  type ContextMenuLabelProps,
  type ContextMenuSeparatorProps,
  type ContextMenuShortcutProps,
  type ContextMenuGroupProps,
  type ContextMenuPortalProps,
  type ContextMenuSubProps,
  type ContextMenuSubContentProps,
  type ContextMenuSubTriggerProps,
  type ContextMenuRadioGroupProps,
};
