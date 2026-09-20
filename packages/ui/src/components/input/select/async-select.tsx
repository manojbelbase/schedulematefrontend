"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ComponentProps,
  type MouseEvent,
} from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { isEqual } from "lodash";
import { ChevronDown, Loader2, PlusIcon, Star, Trash2, X } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/components/animate-ui/components/radix/popover";
import ModalTrigger, {
  type TTriggerProps,
} from "@ui/components/deployables/trigger";
import { Button } from "@ui/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui/components/ui/command";
import { INPUT_CLASSNAME } from "@ui/components/ui/input";
import { useDebounce } from "@ui/hooks/useDebounce";
import {
  withDefaultPagination,
  type PaginationDTO as PaginationResponseDTO,
} from "@ui/lib/pagination";
import { cn } from "@ui/lib/utils";
import type { TDeleteItemModalData } from "@ui/types/extended";

export type TFetcherCallableOptions = {
  queryParams: Record<string, unknown>;
  pathParams?: Record<string, unknown>;
};

export type TFetcherCallableResult = {
  message: string;
  data: unknown[];
  pagination?: PaginationResponseDTO;
};

export type FetcherLike = (...args: never[]) => Promise<TFetcherCallableResult>;

export type TFetcherFallback = (
  options?: TFetcherCallableOptions,
) => Promise<TFetcherCallableResult>;

export type TPaginatedResponse<T> = {
  message: string;
  data: T;
  pagination: PaginationResponseDTO;
};

type TFetcher<
  Fetcher extends FetcherLike,
  FetcherParameters extends TFetcherCallableOptions = TFetcherCallableOptions,
  FetcherResponse extends TFetcherCallableResult = Awaited<ReturnType<Fetcher>>,
  Item = FetcherResponse["data"][number],
  SearchQueryKey = FetcherParameters["queryParams"],
> = {
  /**
   * Please only pass paginated fetch functions here.
   */
  fn: Fetcher;
  queryKey: string[];
  params?: FetcherParameters;
  withClientSearch?: boolean;
  search?: keyof NonNullable<SearchQueryKey>;
  renderables: {
    getValueFromItem: (item: Item) => string;
    getLabelFromItem: (item: Item) => string;
    getIconFromItem?: (item: Item) => string;
  };
  onItemSelect?: (item: Item, isDeselected: boolean) => void;
};

type TCreate =
  | {
      type: "hard";
      callback?: (value: string) => void;
    }
  | {
      type: "soft";
      uniqueBy: "value" | "label";
    }
  | {
      type: "form";
      label: React.ReactNode;
      event: Omit<TTriggerProps, "children">;
    };

type TItemComponentProps<Item, Option> = {
  props: {
    className: string;
    disabled: boolean;
    value: string;
    selected: boolean;
    onSelect: () => void;
    keywords: string[];
  };
  item: Item | Option;
  /**
   * @description This function is used to get the item object with forced type.
   * @returns The item object.
   */
  isOption: (renderable: Item | Option) => renderable is Option;
  Component: typeof CommandItem;
};

type TComponents<Item, Option> = {
  trigger?: (props: {
    selected: TOption | TOption[];
    label: string;
  }) => React.ReactNode;
} & (
  | {
      item?: (props: TItemComponentProps<Item, Option>) => React.ReactNode;
    }
  | {
      icon?: (props: {
        value?: string;
        isTrigger?: boolean;
      }) => React.ReactNode;
    }
);

type TProps<
  Fetcher extends FetcherLike,
  _ModalProps extends object,
  FetcherResponse extends TFetcherCallableResult = Awaited<ReturnType<Fetcher>>,
  Item = FetcherResponse["data"][number],
  TypeofAsyncSelect extends "single" | "multiple" = "single" | "multiple",
> = {
  create?: TCreate;
  remove?: TDeleteItemModalData;
  showDropIcon?: boolean;
  autoSelectFirst?: boolean;
  withSearch?: boolean;
  deselectable?: boolean;
  popover?: {
    content?: ComponentProps<typeof PopoverContent>;
    trigger?: ComponentProps<typeof PopoverTrigger>;
  };
  classNames?: {
    item?: string;
    trigger?: string;
  };
  maxLabelCount?: number;
  disabled?: boolean;
  ignoreMaxHeight?: boolean;
  disabledOptions?: string[];
  fetcher?: TFetcher<Fetcher>;
  options?: TOption[];
  components?: TComponents<Item, TOption>;
  renderIconWithLabel?: boolean;
  renderIconOnly?: boolean;
  placeholder?: string;
  onOptionSelect?: (item: TOption, isDeselected: boolean) => void;
  type?: TypeofAsyncSelect;
  value?: TypeofAsyncSelect extends "single" ? string : string[];
  onChange?: (
    value: TypeofAsyncSelect extends "single" ? string : string[],
  ) => void;
  itemHeight?: number;
  prependLabel?: string;
  id?: string;
  forceShowPrependLabel?: boolean;
  onQueryChange?: (value: string) => void;
  onFilterRemove?: () => void;
  isModal?: boolean;
};

export type TOption = {
  value: string;
  label: string;
  icon?: string;
  isDefault?: boolean;
  hideInList?: boolean;
  keywords?: string[];
  renderAPIDelete?: boolean;
};

type TSelected<SelectType> = SelectType extends "single" ? TOption : TOption[];

type TSelectHandler<Item> = (
  param: {
    preventDefault?: boolean;
    deselect?: boolean;
    optionLike: TOption;
  } & (
    | {
        item: Item;
        kind: "fetcher";
      }
    | {
        item: TOption;
        kind: "options";
      }
  ),
) => void;

type TCreateHandler = (
  param:
    | {
        type: "mouseclick";
        event: MouseEvent<HTMLDivElement, globalThis.MouseEvent>;
      }
    | {
        type: "keyboard";
        event: React.KeyboardEvent<HTMLInputElement>;
      },
) => void;

const NULL_FETCHER = {
  fn: async () => ({
    message: "No fetcher provided",
    data: [] as never[],
    pagination: {
      count: 0,
      total: 0,
    } satisfies PaginationResponseDTO,
  }),
  queryKey: [] as string[],
  renderables: {
    getLabelFromItem: () => "",
    getValueFromItem: () => "",
  },
};

const TAKE = 10;

export default function AsyncSelect<
  T extends FetcherLike,
  _ModalProps extends object = object,
  FetcherResponse extends TFetcherCallableResult = Awaited<ReturnType<T>>,
  Item = FetcherResponse["data"][number],
>({
  type = "single",
  showDropIcon = true,
  create,
  maxLabelCount,
  options: _options = [],
  fetcher,
  autoSelectFirst,
  withSearch,
  popover,
  disabledOptions,
  components,
  onChange,
  value,
  deselectable,
  classNames,
  renderIconWithLabel,
  renderIconOnly,
  placeholder,
  disabled,
  ignoreMaxHeight,
  onOptionSelect,
  itemHeight,
  prependLabel,
  remove,
  id,
  forceShowPrependLabel,
  onQueryChange,
  onFilterRemove,
  isModal = true,
}: TProps<T, _ModalProps>) {
  const [state, _setState] = useState<TSelected<typeof type>>(
    type === "single" ? { value: "", label: "" } : [],
  );

  const setState = (
    input: TSelected<typeof type>,
    triggerOnChange: boolean = true,
  ) => {
    _setState(input);
    if (onChange && triggerOnChange) {
      if (type === "single" && !Array.isArray(input)) {
        onChange(input.value || "");
      } else if (type === "multiple" && Array.isArray(input)) {
        onChange(
          input
            .map((item) => item.value)
            .filter((itx): itx is string => Boolean(itx)),
        );
      }
    }
  };

  const [options, setOptions] = useState<TOption[]>(_options);
  const [open, setOpen] = useState<boolean>(false);
  const [input, setInput] = useState<string>("");

  const search = useDebounce(input, 300);

  const queryable: NonNullable<typeof fetcher> = useMemo(
    () =>
      fetcher ??
      // Fallback fetcher only kicks in when no fetcher is provided; it returns an empty page.
      (NULL_FETCHER as NonNullable<typeof fetcher>),
    [fetcher],
  );

  const {
    data: results,
    fetchNextPage,
    hasNextPage,
    isLoading,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: [...queryable.queryKey, queryable.search && search ? search : ""],
    queryFn: ({ pageParam }) =>
      (
        queryable.fn as unknown as (
          options: TFetcherCallableOptions,
        ) => Promise<TFetcherCallableResult>
      )({
        queryParams: withDefaultPagination({
          ...(queryable.search && search ? { [queryable.search]: search } : {}),
          ...queryable.params?.queryParams,
          page: pageParam.toString(),
          take: TAKE.toString(),
        }),
        pathParams: queryable.params?.pathParams,
      }),
    getNextPageParam: (data: TFetcherCallableResult) => {
      if (!data || !data.pagination || !("nextPage" in data.pagination))
        return undefined;
      return data.pagination.nextPage ?? undefined;
    },
    initialPageParam: 0,
    enabled: autoSelectFirst || (open && !!fetcher),
  });

  const data = useMemo(
    () =>
      fetcher
        ? {
            data: (results?.pages ?? []).flatMap((page) => page.data ?? []),
            count: results?.pages.at(0)?.data?.length || 0,
            pagination: results?.pages.at(-1)?.pagination,
          }
        : {},
    [results, fetcher],
  );

  const handleCreate: TCreateHandler = useCallback(
    ({ event, type: inputType }) => {
      if (!create?.type) return;
      if (create.type === "form") return;
      const matches = options.filter((opt) => {
        if (create.type === "soft" && create.uniqueBy === "value") {
          return opt.value.toLowerCase().includes(input.toLowerCase());
        } else {
          return opt.label.toLowerCase().includes(input.toLowerCase());
        }
      });

      // Check that the input is non-empty and no matches exist
      if (
        ((inputType === "keyboard" && event.key === "Enter") ||
          inputType === "mouseclick") &&
        matches.length === 0 &&
        input.trim() !== ""
      ) {
        setOptions([
          ...options,
          {
            value: input,
            label: input,
            "@instanceof": Symbol.for("option"),
          } as TOption,
        ]);
        if (create.type === "hard" && create.callback) {
          create.callback(input);
        }
        setInput("");
      }
    },
    [create, options, input],
  );

  const handleSelect: TSelectHandler<Item> = useCallback(
    ({ item, kind, optionLike, deselect }) => {
      setInput("");
      if (deselect) {
        if (type === "multiple") {
          setState(
            Array.isArray(state)
              ? state.filter((it) => it.value !== optionLike.value)
              : [],
          );
        }
        if (type === "single") {
          setState({ value: "", label: "" });
          setOpen(false);
        }
        if (fetcher?.onItemSelect) fetcher.onItemSelect(item, true);
        if (onOptionSelect) onOptionSelect(optionLike, true);
        return;
      }
      if (kind === "fetcher") {
        if (type === "single") {
          setState(optionLike);
          setOpen(false);
        } else {
          setState(
            Array.isArray(state) ? [...state, optionLike] : [optionLike],
          );
        }
        if (fetcher?.onItemSelect) fetcher.onItemSelect(item, false);
      }
      if (kind === "options") {
        if (type === "single") {
          setState(optionLike);
          setOpen(false);
        } else {
          setState(
            Array.isArray(state) ? [...state, optionLike] : [optionLike],
          );
        }
        if (onOptionSelect) onOptionSelect(optionLike, false);
      }
    },
    [queryable, type, state, fetcher, onOptionSelect],
  );

  const maxHeight = useMemo(() => {
    const count = fetcher
      ? (data.data?.length || 0) + (options?.length || 0)
      : options?.length;
    const height = count ? count * (itemHeight || 44) : 80;

    if (count === 0) return 180;
    if (ignoreMaxHeight) return height;
    if (height > 180) return 180;
    return height;
  }, [data.data, fetcher, options, ignoreMaxHeight, itemHeight]);

  const getIsSelected = useCallback(
    (id: string) => {
      if (type === "multiple" && Array.isArray(state)) {
        return !!state.find((item) => item.value === id);
      } else if (type === "single" && !Array.isArray(state)) {
        return state.value === id;
      }

      return false;
    },
    [state, type],
  );

  const handleFetchMoreOnScroll = useCallback(
    (e: React.UIEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
      if (
        e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
          e.currentTarget.clientHeight &&
        hasNextPage
      ) {
        fetchNextPage();
      }
    },
    [hasNextPage, fetchNextPage],
  );

  const isOption = useCallback((obj: Item | TOption): obj is TOption => {
    return (
      typeof obj === "object" &&
      obj !== null &&
      (obj as Record<string | symbol, unknown>)["@instanceof"] ===
        Symbol.for("option")
    );
  }, []);

  const Item = useMemo(
    () => components && "item" in components && components.item,
    [components],
  );
  const Icon = useMemo(
    () => components && "icon" in components && components.icon,
    [components],
  );
  const Trigger = useMemo(
    () => components && components.trigger,
    [components?.trigger],
  );

  const label = useMemo(() => {
    if (type === "single" && !Array.isArray(state)) {
      return (
        state.label ||
        options.find((opt) => opt.value === state.value)?.label ||
        placeholder ||
        "Select an option"
      );
    }
    if (type === "multiple" && Array.isArray(state) && state.length) {
      const labels = state.map((item) => item.label);
      if (maxLabelCount) {
        const postpendLabel =
          labels.length - maxLabelCount > 0
            ? ` + ${labels.length - maxLabelCount} more`
            : "";
        return `${labels.slice(0, maxLabelCount).join(", ")}` + postpendLabel;
      }
      return labels.join(", ");
    }

    return placeholder || "Select an option";
  }, [state, type, state, options, placeholder]);

  const isActive =
    (!Array.isArray(state) && state?.value) ||
    (Array.isArray(state) && state?.length);

  useEffect(() => {
    const isStateEmpty =
      type === "single" ? !state : Array.isArray(state) && state.length === 0;
    if (autoSelectFirst && isStateEmpty) {
      const zeroth = fetcher ? data.data?.at(0) : options?.at(0);
      if (zeroth) {
        if (fetcher) {
          const value = fetcher.renderables.getValueFromItem(zeroth);
          const label = fetcher.renderables.getLabelFromItem(zeroth);
          const icon = fetcher.renderables.getIconFromItem?.(zeroth);
          if (value) {
            setState(
              type === "single"
                ? { label, value, icon }
                : [{ label, value, icon }],
            );
          }
        } else if (options) {
          const opt = zeroth as TOption;
          if (opt) setState(type === "single" ? opt : [opt]);
        }
      }
    }
  }, [autoSelectFirst, data, fetcher, options, state, type]);

  // Sync options on change
  useEffect(() => {
    if (!isEqual(options, _options)) {
      setOptions(_options);
    }
  }, [_options, options]);

  // This effect syncs value from the form state either string | string[] to internal component state
  useEffect(() => {
    if (typeof value === "string" && !Array.isArray(state)) {
      if (value === "" && state.value !== value) {
        setState({ label: "", value: "" }, false);
      } else {
        const selected = options.find((item) => item.value === value);
        if (selected) setState(selected);
      }
    } else if (Array.isArray(value) && Array.isArray(state)) {
      const ids = state
        .map((itx) => itx.value)
        .filter((itx): itx is string => Boolean(itx));

      if (value.length === 0 && !isEqual(ids, value)) {
        setState([], false);
      } else {
        const selected = value
          .map((id) => options.find((it) => it.value === id))
          .filter((it): it is TOption => Boolean(it));

        const stateIds = state.map((item) => item.value);

        if (selected.length !== 0 && !isEqual(value, stateIds)) {
          setState(selected);
        }
      }
    }
  }, [value, options, state]);

  useEffect(() => {
    if (onQueryChange) {
      onQueryChange(input);
    }
  }, [input]);

  return (
    <Popover
      open={open}
      onOpenChange={(e) => {
        setOpen(e);
        if (!e) {
          setInput("");
        }
      }}
      modal={isModal}
    >
      {Trigger ? (
        <Trigger selected={state} label={label} />
      ) : (
        <PopoverTrigger asChild disabled={disabled}>
          {onFilterRemove && isActive ? (
            <div className="relative inline-flex">
              <Button
                variant="outline"
                className={cn(
                  "justify-between text-sm 3xl:text-sm gap-3 px-3 h-10 3xl:h-11 border-border text-primary! placeholder:text-muted-foreground focus-visible:border-primary! focus-visible:ring-primary/50! bg-accent hover:bg-accent/90!",
                  open && "border-primary! focus-visible:ring-primary/50!",
                  type === "single" &&
                    !Array.isArray(state) &&
                    state?.value &&
                    "text-dark dark:text-white",
                  type === "multiple" &&
                    Array.isArray(state) &&
                    state.length &&
                    "text-black dark:text-white",
                  "font-normal",
                  classNames?.trigger,
                )}
                data-test-id={id || label || "async-select"}
                {...(popover?.trigger as React.ComponentProps<typeof Button>)}
              >
                {(prependLabel &&
                  ((!Array.isArray(state) && state.value) ||
                    (Array.isArray(state) && state.length) ||
                    forceShowPrependLabel) && <span>{prependLabel}</span>) ||
                  ""}
                <div className="flex gap-3 items-center break-all line-clamp-1 overflow-hidden">
                  {(renderIconWithLabel || renderIconOnly) &&
                    !Array.isArray(state) &&
                    type === "single" &&
                    state &&
                    state.icon &&
                    (Icon ? (
                      <Icon value={state.icon} isTrigger={true} />
                    ) : (
                      <div>{state.icon}</div>
                    ))}
                  {renderIconOnly && state ? null : (
                    <div className="line-clamp-1 overflow-ellipsis">
                      {label}
                    </div>
                  )}
                </div>
                <ChevronDown size={16} className={cn("shrink-0 opacity-0")} />
              </Button>
              <X
                size={16}
                className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-50 text-destructive select-none hover:scale-125 transition-all"
                onClick={(e) => {
                  e.stopPropagation();
                  onFilterRemove();
                  setOpen(false);
                }}
              />
            </div>
          ) : (
            <Button
              variant="outline"
              className={cn(
                "justify-between text-xs 3xl:text-sm gap-3 px-3 h-10 3xl:h-11 border-border text-muted-foreground placeholder:text-muted-foreground line-clamp-1",
                "focus-visible:border-primary! focus-visible:ring-primary/50! ",
                open && "border-primary! focus-visible:ring-primary/50!",
                INPUT_CLASSNAME,
                type === "single" &&
                  !Array.isArray(state) &&
                  state?.value &&
                  "text-dark dark:text-white",
                type === "multiple" &&
                  Array.isArray(state) &&
                  state.length &&
                  "text-black dark:text-white",
                "font-normal",
                classNames?.trigger,
              )}
              data-test-id={id || label || "async-select"}
              {...(popover?.trigger as React.ComponentProps<typeof Button>)}
            >
              {(prependLabel &&
                ((!Array.isArray(state) && state.value) ||
                  (Array.isArray(state) && state.length) ||
                  forceShowPrependLabel) && <span>{prependLabel}</span>) ||
                ""}
              <div className="flex gap-3 items-center break-all line-clamp-1 overflow-hidden">
                {(renderIconWithLabel || renderIconOnly) &&
                  !Array.isArray(state) &&
                  type === "single" &&
                  state &&
                  state.icon &&
                  (Icon ? (
                    <Icon value={state.icon} isTrigger={true} />
                  ) : (
                    <div className="h-4 w-6">{state.icon}</div>
                  ))}
                {renderIconOnly && state ? null : (
                  <div className="line-clamp-1 overflow-ellipsis">{label}</div>
                )}
              </div>
              {showDropIcon && <ChevronDown size={16} className="shrink-0" />}
            </Button>
          )}
        </PopoverTrigger>
      )}
      <PopoverContent
        {...popover?.content}
        className={cn(
          "p-2 w-(--radix-popover-trigger-width)",
          popover?.content?.className,
        )}
        align={popover?.content?.align || "start"}
      >
        <Command
          filter={!fetcher?.withClientSearch && fetcher ? () => 1 : undefined}
        >
          {withSearch && (
            <CommandInput
              placeholder="Search options..."
              onKeyDown={(event) => handleCreate({ event, type: "keyboard" })}
              value={input}
              onValueChange={(value) => setInput(value)}
            />
          )}
          <CommandList
            className={cn(withSearch && "mt-1", "no-scrollbar")}
            style={{ maxHeight }}
            onScroll={handleFetchMoreOnScroll}
          >
            <CommandEmpty className={cn(create && "py-0")}>
              {create && create.type !== "form" ? (
                <div
                  className={cn(
                    "relative flex cursor-default select-none items-center rounded-sm text-xs 3xl:text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-secondary/50 min-h-10 3xl:min-h-11 data-[disabled=true]:opacity-50 py-2 px-3 bg-accent/20 break-all",
                  )}
                  onClick={(event) =>
                    handleCreate({ event, type: "mouseclick" })
                  }
                >
                  <span className="shrink-0">Create</span>{" "}
                  <q className="ml-1">{input}</q>
                </div>
              ) : (
                <div>
                  {fetcher && isLoading ? (
                    <div className="flex items-center justify-center h-20">
                      <Loader2 className="animate-spin" size={22} />
                    </div>
                  ) : (
                    <span className="text-xs w-full text-center block py-4">
                      No option found.
                    </span>
                  )}
                </div>
              )}
            </CommandEmpty>
            <CommandGroup>
              {options.map((item, i) => {
                if (item.hideInList) return null;

                const isSelected = getIsSelected(item.value);
                const isDisabled =
                  disabledOptions?.includes(item.value) || false;

                const className = cn(
                  "relative py-2 px-3 group/commandInput",
                  isSelected && "!bg-accent/20 text-primary",
                  isDisabled && "opacity-50 cursor-not-allowed",
                  classNames?.item,
                );

                const deselect =
                  type === "multiple" ? isSelected : deselectable && isSelected;

                if (Item) {
                  return (
                    <Item
                      key={item.value}
                      data-test-id={`item-${i}`}
                      Component={CommandItem}
                      isOption={isOption}
                      item={item}
                      props={{
                        className,
                        disabled: isDisabled,
                        value: item.value,
                        selected: isSelected,
                        onSelect: () =>
                          handleSelect({
                            item,
                            kind: "options",
                            optionLike: {
                              label: item.label,
                              value: item.value,
                              icon: item.icon,
                              keywords: item.keywords,
                            },
                            deselect,
                          }),
                        keywords: item.keywords || [item.label],
                      }}
                    />
                  );
                }

                return (
                  <CommandItem
                    className={className}
                    key={item.value}
                    value={item.value}
                    keywords={item.keywords || [item.label]}
                    disabled={isDisabled}
                    data-test-id={`item-${i}`}
                    onSelect={() =>
                      handleSelect({
                        item,
                        kind: "options",
                        optionLike: {
                          label: item.label,
                          value: item.value,
                          icon: item.icon,
                          keywords: item.keywords,
                        },
                        deselect,
                      })
                    }
                  >
                    <div className="flex items-center gap-2">
                      {Icon ? (
                        <Icon value={item.icon} isTrigger={false} />
                      ) : (
                        item.icon
                      )}
                    </div>
                    <div className="flex items-center justify-between w-full">
                      <div className="flex items-cenetr gap-1">
                        <span>{item.label} </span>
                        {item.isDefault && (
                          <Star size={14} className="text-yellow-300" />
                        )}
                      </div>
                      {remove && item.renderAPIDelete && (
                        <ModalTrigger
                          data={{
                            ...remove,
                            initiatorName: item.value,
                            callback() {
                              if (type === "multiple" && Array.isArray(state)) {
                                setState(
                                  state.filter((it) => it.value !== value),
                                );
                              }
                              if (type === "single" && !Array.isArray(state)) {
                                setState({ value: "", label: "" });
                              }
                              setOpen(false);
                            },
                          }}
                          type="MODAL"
                          modalID={"DELETE_MODAL"}
                          className="opacity-0 group-hover/commandInput:opacity-100"
                          onSlotClick={(e) => e.stopPropagation()}
                        >
                          <Button size="icon-xs" variant="ghost">
                            <Trash2 size={16} className="text-destructive" />
                          </Button>
                        </ModalTrigger>
                      )}
                    </div>
                  </CommandItem>
                );
              })}
              {fetcher &&
                data.data?.map((rawItem) => {
                  const item = rawItem as Item;
                  const label = fetcher.renderables.getLabelFromItem(item);
                  const value = fetcher.renderables.getValueFromItem(item);
                  const icon = fetcher.renderables.getIconFromItem?.(item);

                  const isSelected = getIsSelected(value);
                  const isDisabled = disabledOptions?.includes(value) || false;

                  const className = cn(
                    "relative py-3 px-3 group/commandInput hover:bg-surface-muted/50!",
                    isSelected &&
                      "bg-accent/90! hover:bg-accent/90! text-accent-foreground",
                    isDisabled && "opacity-50 cursor-not-allowed ",
                    classNames?.item,
                  );

                  const deselect =
                    type === "multiple"
                      ? isSelected
                      : deselectable && isSelected;

                  // Prevent duplicates if option already exists
                  if (options.find((option) => option.value === value))
                    return null;

                  if (Item) {
                    return (
                      <Item
                        key={value}
                        Component={CommandItem}
                        isOption={isOption}
                        item={item}
                        props={{
                          className,

                          disabled: isDisabled,
                          value,
                          selected: isSelected,
                          onSelect: () =>
                            handleSelect({
                              item,
                              kind: "fetcher",
                              optionLike: {
                                label,
                                value,
                                icon,
                                keywords: [label],
                              },
                              deselect,
                            }),
                          keywords: [label],
                        }}
                      />
                    );
                  }

                  return (
                    <CommandItem
                      className={className}
                      key={value}
                      value={value}
                      keywords={[label]}
                      disabled={isDisabled}
                      onSelect={() =>
                        handleSelect({
                          item,
                          kind: "fetcher",
                          optionLike: {
                            label,
                            value,
                            icon,
                            keywords: [label],
                          },
                          deselect,
                        })
                      }
                    >
                      <div className="flex items-center gap-2">
                        {Icon ? <Icon value={icon} isTrigger={false} /> : icon}
                      </div>
                      <div className="flex items-center justify-between w-full">
                        <span>{label}</span>
                        {remove && (
                          <ModalTrigger
                            type={"MODAL"}
                            data={{
                              ...remove,
                              name: label,
                              initiatorName: value,
                              callback() {
                                if (
                                  type === "multiple" &&
                                  Array.isArray(state)
                                ) {
                                  setState(
                                    state.filter((it) => it.value !== value),
                                  );
                                }
                                if (
                                  type === "single" &&
                                  !Array.isArray(state)
                                ) {
                                  setState({ value: "", label: "" });
                                }
                                setOpen(false);
                              },
                            }}
                            modalID={"DELETE_MODAL"}
                            className="opacity-0 group-hover/commandInput:opacity-100"
                            onSlotClick={(e) => e.stopPropagation()}
                          >
                            <Button
                              size="icon-xs"
                              variant="ghost"
                              className="text-destructive"
                            >
                              <Trash2 size={16} className="text-destructive" />
                            </Button>
                          </ModalTrigger>
                        )}
                      </div>
                    </CommandItem>
                  );
                })}
              {isFetchingNextPage &&
                Array.from({ length: 3 }).map((_, i) => (
                  <div className="loading h-11 rounded-md" key={i} />
                ))}
            </CommandGroup>
          </CommandList>
          {create?.type === "form" && (
            <ModalTrigger {...(create.event as TTriggerProps)}>
              <Button className="w-full mt-2" variant="secondary">
                <PlusIcon />
                {create.label}
              </Button>
            </ModalTrigger>
          )}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
