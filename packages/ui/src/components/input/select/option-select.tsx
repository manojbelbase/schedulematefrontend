import {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type FocusEventHandler,
  type ReactNode,
} from "react";
import { type ControllerRenderProps } from "react-hook-form";
import { CommandInput } from "cmdk";
import { CheckIcon, ChevronDown, ListXIcon, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import {
  Popover,
  PopoverAnchor,
  PopoverContent,
} from "@ui/components/animate-ui/components/radix/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import {
  CommandInput as CmdInput,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import { INPUT_CLASSNAME } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Separator } from "@ui/components/ui/separator";
import { useControllableState } from "@ui/hooks/use-controllable-state";
import { cn } from "@ui/lib/utils";

export type TSelectProps<
  Type extends "single" | "multiple" = "single" | "multiple",
> = Partial<Omit<ControllerRenderProps, "value" | "onChange">> & {
  label?: string;

  type?: Type;
  value?: Type extends "single" ? string : string[];
  onChange: <T extends "single" | "multiple">(
    value: T extends "single" ? string : string[],
  ) => void;
  options?: {
    label:
      | string
      | {
          render: (isSelected: boolean) => ReactNode;
          string: string;
        };
    value: string;
    className?: string;
    icon?: ReactNode;
    keywords?: string[];
  }[];
  isForfilter?: boolean;
  onDeleteClick?: (item: string) => void;
  getQuery?: (input: string) => void;
  placeholder?: string;
  onFocus?: FocusEventHandler<HTMLInputElement>;
  disabledSearch?: boolean;
  matchTriggerWidth?: boolean;
  minVisibleCount?: number;
  autoFocus?: boolean;
  contentClassName?: string;
  triggerClassname?: string;
  onFilterRemove?: () => void;
  prependLabel?: string;
  badgeClassname?: string;
  isDeSelectable?: boolean;
};

export default function OptionSelect({
  value,
  onChange,
  options,
  type = "single",
  disabled,
  placeholder,
  name,
  onBlur,
  label,
  getQuery,
  onDeleteClick,
  onFocus,
  disabledSearch = false,
  isForfilter = false,
  matchTriggerWidth = true,
  minVisibleCount = 2,
  autoFocus = false,
  contentClassName,
  triggerClassname,
  onFilterRemove,
  prependLabel,
  badgeClassname,
  isDeSelectable,
  ...props
}: TSelectProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [open, setOpen] = useState<boolean>(false);
  const [input, _setInput] = useState<string>(
    typeof value === "string" ? value : "",
  );
  const [isInputFocused, setIsInputFocused] = useState(false);

  const setInput = (input: string) => {
    _setInput(input);
    getQuery?.(input);
  };

  const [state, setState] = useControllableState({
    onChange,
    defaultProp: value || "",
    prop: value || "",
  });

  const normalizedVisibleCount = Math.max(0, minVisibleCount);
  const multipleSelections = Array.isArray(state) ? state : [];
  const visibleSelections =
    normalizedVisibleCount > 0
      ? multipleSelections.slice(0, normalizedVisibleCount)
      : [];
  const hiddenSelections =
    normalizedVisibleCount > 0
      ? multipleSelections.slice(normalizedVisibleCount)
      : multipleSelections;

  const getOptionLabelInfo = useCallback(
    (tag: string) => {
      const optionLabel = options?.find((opt) => opt.value === tag)?.label;
      if (!optionLabel) return null;
      if (typeof optionLabel === "string") {
        return { node: optionLabel, text: optionLabel };
      }
      return {
        node: optionLabel.render(true),
        text: optionLabel.string,
      };
    },
    [options],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (disabled) return;

    if (e.key === "Enter") {
      setOpen((prev) => !prev);
    }

    // if (e.key === "Backspace" && !e.currentTarget.value) {
    //   if (state !== "") setState(state.slice(0, -1));
    // }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }

    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleRemove = (tag: string) => {
    if (disabled) return;

    setState((prev) => {
      if (type === "single" && !Array.isArray(prev)) return "";
      else if (Array.isArray(prev)) return prev.filter((t) => t !== tag);

      if (type === "single") return "";
      else return [];
    });
  };

  const handleSelect = (selected: string) => {
    if (disabled) return;

    if (type === "multiple") setInput("");

    if (type === "single") {
      const willDeselect =
        isDeSelectable && !Array.isArray(state) && state === selected;
      setInput(willDeselect ? "" : selected);
      setOpen(false);
    }

    setState((prev) => {
      if (type === "single" && !Array.isArray(prev)) {
        const willDeselect = isDeSelectable && prev === selected;
        return willDeselect ? "" : selected;
      } else if (Array.isArray(prev)) {
        const exists = prev.includes(selected);
        if (exists) return prev.filter((t) => t !== selected);
        return [...prev, selected];
      }
      return type === "single" ? selected : [selected];
    });

    if (type === "multiple") setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleFocus = () => {
    if (disabled) return;
    setOpen(true);
  };

  const sortedOptions = useMemo(() => {
    if (!input) return options ?? [];

    const score = (str: string, query: string) => {
      const s = str.toLowerCase();
      const q = query.toLowerCase();
      if (s.startsWith(q)) return 3;
      if (s.includes(q)) return 2;
      return 0;
    };

    return [...(options ?? [])].sort((a, b) => {
      const aLabel = typeof a.label === "string" ? a.label : a.label.string;
      const bLabel = typeof b.label === "string" ? b.label : b.label.string;
      return score(bLabel, input) - score(aLabel, input);
    });
  }, [input, options]);

  useImperativeHandle(props.ref, () => inputRef.current);

  const SelectedIcon = useMemo(() => {
    const option = options?.find((opt) => opt.value === value);
    return option?.icon || null;
  }, [value, options]);

  // Update Popover width dynamically to match trigger
  useEffect(() => {
    const updateWidth = () => {
      if (ref.current) {
        const width = ref.current.offsetWidth;
        ref.current.style.setProperty(
          "--radix-popover-trigger-width",
          `${width}px`,
        );
      }
    };
    if (matchTriggerWidth) updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, [matchTriggerWidth]);

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = 0;
    }
  }, [input, sortedOptions]);

  useEffect(() => {
    if (
      inputRef.current &&
      typeof value === "string" &&
      inputRef.current.value !== value
    ) {
      _setInput(value);
    } else if (
      inputRef.current &&
      typeof value === "undefined" &&
      inputRef.current.value !== value
    ) {
      _setInput("");
    }
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen} modal={true}>
      <Command
        shouldFilter={type === "single" ? false : true}
        className="rounded-sm!"
      >
        <PopoverAnchor
          ref={ref}
          className={cn(
            INPUT_CLASSNAME,
            "h-9 3xl:h-10 grid gap-1 focus-visible:border-primary! focus-within:border-primary!",
            (isInputFocused || open) && "border-primary ring-primary/50 ",
            isForfilter && type === "multiple" && "h-9 p-0! border-none",
            isForfilter && type === "single" && "rounded-sm!",
            isForfilter &&
              type === "single" &&
              Boolean(state) &&
              "bg-accent hover:bg-accent/90! w-fit!",
            !isForfilter &&
              type === "multiple" &&
              "h-10 3xl:h-11 p-0 border-none",
            disabled && "cursor-not-allowed opacity-50",
            triggerClassname,
          )}
          onClick={(e) => {
            if (type === "single" && !disabled) {
              setOpen(true);
              e.stopPropagation();
            }
          }}
        >
          {type === "multiple" ? (
            <>
              {Array.isArray(state) && state.length !== 0 ? (
                <div
                  role="button"
                  className={cn(
                    "flex items-center gap-3 flex-nowrap overflow-hidden justify-start w-full h-full p-1 px-1.5 font-normal text-muted-foreground flex gap-2 items-center border rounded-md cursor-pointer focus-within:border-primary!",
                    disabled && "cursor-not-allowed",
                    open && "border-primary",
                  )}
                  onClick={() => {
                    if (!disabled) setOpen(!open);
                  }}
                >
                  <AnimatePresence initial={false} mode="popLayout">
                    {visibleSelections.map((tag) => {
                      const labelInfo = getOptionLabelInfo(tag);
                      if (!labelInfo) return null;
                      return (
                        <motion.span
                          key={tag}
                          layoutId={tag}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Badge
                            variant="outline"
                            className={cn(
                              "cursor-pointer pl-2 truncate text-primary bg-accent hover:bg-accent/90!",
                              disabled ? "cursor-not-allowed" : "pr-0!",
                              badgeClassname,
                            )}
                            size="md"
                            shape="pill"
                          >
                            <span className="truncate" title={labelInfo.text}>
                              {labelInfo.node}
                            </span>
                            <Button
                              variant={"ghost"}
                              size={"icon-xs"}
                              className={cn(
                                "p-0! h-fit! flex items-center justify-center rounded-full ml-1 ",
                                disabled && "hidden",
                              )}
                              onClick={(e) => {
                                handleRemove(tag);
                                e.stopPropagation();
                              }}
                            >
                              <X className="text-destructive size-4" />
                            </Button>
                          </Badge>
                        </motion.span>
                      );
                    })}
                  </AnimatePresence>
                  {hiddenSelections.length > 0 && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Badge
                          variant="secondary"
                          className="px-2 cursor-default select-none"
                          size="md"
                          shape="pill"
                        >
                          +{hiddenSelections.length} more
                        </Badge>
                      </TooltipTrigger>
                      <TooltipContent
                        className="max-w-xs bg-secondary text-primary border border-muted"
                        side="top"
                        align="start"
                        arrowClassName="bg-secondary fill-secondary border-b border-r border-muted"
                      >
                        <div className="flex flex-col gap-1">
                          {hiddenSelections.map((tag) => {
                            const labelInfo = getOptionLabelInfo(tag);
                            if (!labelInfo) return null;
                            return (
                              <span key={tag} className="text-xs text-primary">
                                {labelInfo.text || labelInfo.node}
                              </span>
                            );
                          })}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              ) : (
                <Button
                  className={cn(
                    "flex items-center gap-2 flex-wrap justify-start w-full h-full px-3 py-1 font-normal text-muted-foreground flex gap-2 items-center",
                    disabled && "cursor-not-allowed",
                    open && "border-primary",
                  )}
                  onClick={() => {
                    if (!disabled) setOpen(!open);
                  }}
                  variant={"outline"}
                >
                  <span className="flex gap-2 items-center justify-between text-muted-foreground w-full">
                    <span>{placeholder}</span>
                    <ChevronDown className="size-3.5!" />
                  </span>
                </Button>
              )}
            </>
          ) : (
            <div className="relative w-full">
              {SelectedIcon && (
                <span
                  onClick={() => {
                    setOpen(true);
                  }}
                  className="absolute w-8 h-6 top-1/2 -translate-y-1/2 left-3 -translate-x-1/2 overflow-hidden flex items-center justify-center rounded-sm cursor-pointer"
                >
                  {SelectedIcon}
                </span>
              )}
              <CommandInput
                {...props}
                autoFocus={autoFocus}
                ref={inputRef}
                onKeyDown={handleKeyDown}
                className={cn(
                  Array.isArray(state) && state.length !== 0 && INPUT_CLASSNAME,
                  disabled && "cursor-not-allowed",
                  "!ring-0 !outline-0 !border-0 text-sm px-1 w-full pr-6 placeholder:text-muted-foreground group",
                  SelectedIcon ? "pl-8" : "",
                  disabledSearch && "cursor-pointer",
                  isForfilter && "text-primary",
                )}
                readOnly={disabledSearch}
                value={
                  isForfilter && prependLabel && Boolean(state)
                    ? `${prependLabel}  ${state}`
                    : input
                }
                onValueChange={setInput}
                placeholder={placeholder}
                onFocus={(event) => {
                  setIsInputFocused(true);
                  handleFocus();
                  onFocus?.(event);
                }}
                onClick={handleFocus}
                disabled={disabled}
                onBlur={() => {
                  setIsInputFocused(false);
                  onBlur?.();
                }}
                name={name}
              />

              {isForfilter && Boolean(state) ? (
                <Button
                  onClick={(e) => {
                    onFilterRemove?.();
                    setOpen(false);
                    e.stopPropagation();
                  }}
                  variant={"outline"}
                  className="absolute top-1/2 -translate-y-1/2 -right-2 overflow-hidden flex items-center justify-center cursor-pointer border-none! p-0! aspect-square size-7! hover:scale-125 transition-all bg-transparent hover:bg-transparent!"
                >
                  <X
                    size={16}
                    className="cursor-pointer z-50 size-4 text-destructive select-none hover:scale-125 transition-all"
                  />
                </Button>
              ) : (
                <span
                  onClick={() => {
                    if (!disabled) setOpen(true);
                  }}
                  className="absolute top-1/2 -translate-y-1/2 -right-2 -translate-x-1/2 overflow-hidden flex items-center justify-center cursor-pointer"
                >
                  <ChevronDown className="text-muted-foreground size-3.5" />
                </span>
              )}
            </div>
          )}
        </PopoverAnchor>

        <PopoverContent
          align="start"
          className={cn(
            "p-1",
            matchTriggerWidth && "w-[var(--radix-popover-trigger-width)]",
            contentClassName,
          )}
          onOpenAutoFocus={(e) => e.preventDefault()}
        >
          {label && (
            <div className="px-2 pt-1">
              <Label className="font-normal py-1 text-muted-foreground">
                {label}
              </Label>
              <div className="px-3 my-1.5">
                <Separator />
              </div>
            </div>
          )}
          {type === "multiple" && (
            <CmdInput placeholder={"Search Options..."} />
          )}
          <CommandList ref={listRef} className="max-h-72 no-scrollbar">
            <CommandEmpty className="flex flex-col items-center py-6 text-muted-foreground space-y-2">
              <ListXIcon />
              <p className="text-sm">No results found</p>
            </CommandEmpty>
            <CommandGroup>
              {sortedOptions?.map((option) => {
                const isSelected = state.includes(option.value);

                if (typeof option.label === "object")
                  return (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      keywords={option.keywords}
                      className={cn(
                        "min-h-10 flex items-center justify-between",
                        isSelected && "bg-accent/60 text-accent-foreground",
                        option.className,
                      )}
                      onSelect={() => handleSelect(option.value)}
                      asChild
                    >
                      {option.label.render(isSelected)}
                    </CommandItem>
                  );

                return (
                  <CommandItem
                    key={option.value}
                    value={option.value}
                    keywords={option.keywords}
                    className={cn(
                      isSelected &&
                        "bg-accent/90! hover:bg-accent/90! text-accent-foreground rounded-none",
                      "min-h-10 flex items-center justify-between group/command-item hover:bg-gray-100/50!",
                      option.className,
                    )}
                    onSelect={() => handleSelect(option.value)}
                  >
                    {option.icon && <span className="mr-2">{option.icon}</span>}
                    <span className="flex items-center justify-between flex-1">
                      {option.label}
                      <span className="flex items-center justify-between gap-3">
                        {isSelected && (
                          <CheckIcon
                            className={cn("text-inherit")}
                            id="check-icon"
                          />
                        )}
                        {onDeleteClick && (
                          <Button
                            variant={"ghost"}
                            className="hidden group-hover/command-item:flex size-7! items-center justify-center p-0!"
                            size={"icon-xs"}
                            onClick={(e) => {
                              onDeleteClick(option.value);
                              e.stopPropagation();
                              e.preventDefault();
                            }}
                          >
                            <Trash2 className="text-destructive" />
                          </Button>
                        )}
                      </span>
                    </span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </PopoverContent>
      </Command>
    </Popover>
  );
}
