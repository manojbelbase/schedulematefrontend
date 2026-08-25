import { useMemo, useState } from "react";
import type {
  DateRange,
  DropdownNavProps,
  DropdownProps,
} from "react-day-picker";
import {
  differenceInDays,
  endOfMonth,
  endOfYear,
  format,
  startOfMonth,
  startOfYear,
  subDays,
  subMonths,
  subYears,
} from "date-fns";
import { CalendarIcon, ChevronDown, X } from "lucide-react";

import { Button } from "@ui/components/ui/button";
import { Calendar } from "@ui/components/ui/calendar";
import { DATE_FORMAT } from "@ui/config/constants";
import { useControllableState } from "@ui/hooks/use-controllable-state";
import { cn } from "@ui/lib/utils";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../animate-ui/components/radix/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export const CUSTOM_DATE_RANGE_PRESET = "custom" as const;

type TSupportedPresets =
  | "today"
  | "yesterday"
  | "last-7"
  | "last-30"
  | "this-month"
  | "last-month"
  | "this-year"
  | "last-year"
  | "lifetime"
  | typeof CUSTOM_DATE_RANGE_PRESET;

const startOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
};

const endOfDay = (d: Date) => {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
};

export const getFromToByPreset = (
  preset: TSupportedPresets,
  today: Date,
): DateRange | undefined => {
  switch (preset) {
    case "today": {
      return { from: startOfDay(today), to: endOfDay(today) };
    }
    case "yesterday":
      return {
        from: startOfDay(subDays(today, 1)),
        to: endOfDay(subDays(today, 1)),
      };
    case "last-7":
      return {
        from: startOfDay(subDays(today, 6)),
        to: endOfDay(today),
      };
    case "last-30":
      return { from: startOfDay(subDays(today, 29)), to: endOfDay(today) };
    case "this-month":
      return { from: startOfMonth(today), to: endOfDay(today) };
    case "last-month":
      return {
        from: startOfMonth(subMonths(today, 1)),
        to: endOfMonth(subMonths(today, 1)),
      };
    case "this-year":
      return { from: startOfYear(today), to: endOfDay(today) };
    case "last-year":
      return {
        from: startOfYear(subYears(today, 1)),
        to: endOfYear(subYears(today, 1)),
      };
    case "lifetime":
      return {
        from: new Date(0),
        to: endOfDay(today),
      };
    case CUSTOM_DATE_RANGE_PRESET:
      return undefined;
    default:
      throw new Error("Invalid preset");
  }
};

type TState = {
  date: DateRange | undefined;
  preset: TSupportedPresets | undefined;
};

export type TDatePickerProps = {
  preset?: TSupportedPresets;
  value?: TState;
  onChange: (value: TState) => void;
  onFilterRemove?: () => void;
};

export const DEFAULT_DATE_RANGE_SELECTOR_PRESET: TSupportedPresets = "lifetime";

export const PRESETS: {
  label: string;
  value: TSupportedPresets;
}[] = [
  {
    label: "Today",
    value: "today",
  },
  {
    label: "Yesterday",
    value: "yesterday",
  },
  {
    label: "Last 7 days",
    value: "last-7",
  },
  {
    label: "Last 30 days",
    value: "last-30",
  },
  {
    label: "This Month",
    value: "this-month",
  },
  {
    label: "Last month",
    value: "last-month",
  },
  {
    label: "This year",
    value: "this-year",
  },
  {
    label: "Last year",
    value: "last-year",
  },
  {
    label: "Lifetime",
    value: "lifetime",
  },
];

export const SUPPORTED_PRESET_VALUES: readonly TSupportedPresets[] = [
  ...PRESETS.map((item) => item.value),
  CUSTOM_DATE_RANGE_PRESET,
];

export default function DatePicker({
  onChange,
  value,
  onFilterRemove,
}: TDatePickerProps) {
  const today = useMemo(() => new Date(), []);

  const [open, setOpen] = useState(false);
  const [month, setMonth] = useState(today);
  const [state, setState] = useControllableState<TState>({
    caller: "DatePicker",
    prop: value,
    defaultProp: {
      date: undefined,
      preset: undefined,
    },
    onChange,
  });

  const handlePresetChange = (value: TSupportedPresets) => {
    const updated = getFromToByPreset(value, today);

    setState({ date: updated, preset: value });
    if (updated?.to) setMonth(updated.to);
  };

  const presetInfo = useMemo(
    () => PRESETS.find((item) => item.value === state.preset),
    [state.preset],
  );

  const isCustomRange = useMemo(() => {
    if (!state.preset || state.preset === CUSTOM_DATE_RANGE_PRESET) return true;

    const presetDates = getFromToByPreset(state.preset, today);

    return (
      state.date?.from?.getTime() !== presetDates?.from?.getTime() &&
      state.date?.to?.getTime() !== presetDates?.to?.getTime()
    );
  }, [state, today]);

  const isFilterActive =
    (state.preset || DEFAULT_DATE_RANGE_SELECTOR_PRESET) !==
    DEFAULT_DATE_RANGE_SELECTOR_PRESET;

  const differenceInDaysValue = differenceInDays(
    state.date?.to || today,
    state.date?.from || today,
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <div className="relative">
          <Button
            variant={"outline"}
            className={cn(
              "font-normal text-muted-foreground flex gap-2 items-center z-20!",
              isFilterActive && "bg-accent hover:bg-accent/90! text-primary",
              open && "border-primary",
            )}
          >
            <CalendarIcon className="size-4" />
            {state.date ? (
              presetInfo?.label && !isCustomRange ? (
                presetInfo.label
              ) : (
                <span>
                  {state.date.from && format(state.date.from, DATE_FORMAT)}{" "}
                  {state.date.to &&
                  state.date.from !== state.date.to &&
                  differenceInDaysValue > 0
                    ? `- ${format(state.date.to, DATE_FORMAT)}`
                    : ""}
                </span>
              )
            ) : (
              <span>Lifetime</span>
            )}

            <ChevronDown
              size={16}
              className={cn("shrink-0", isFilterActive && "opacity-0")}
            />
          </Button>
          {isFilterActive && (
            <X
              className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer z-50! text-destructive select-none hover:scale-125 size-4 transition-transform duration-200"
              onClick={(e) => {
                onFilterRemove?.();
                setOpen(false);
                e.stopPropagation();
              }}
            />
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent className="p-0 w-full" align="center">
        <div className="flex max-sm:flex-col">
          <div className="relative py-4 max-sm:order-1 max-sm:border-t sm:w-32">
            <div className="h-full sm:border-e">
              <div className="flex flex-col px-2 space-y-0.5">
                {PRESETS.map((item) => (
                  <Button
                    key={item.value}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "w-full justify-start",
                      item.value === state.preset
                        ? "bg-accent text-primary hover:bg-accent/90"
                        : "text-muted-foreground",
                    )}
                    onClick={() => handlePresetChange(item.value)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <Calendar
            mode="range"
            selected={state.date}
            onSelect={(updated) => {
              if (updated?.from && updated?.from === updated?.to) {
                setState({
                  date: {
                    from: startOfDay(updated?.from),
                    to: endOfDay(updated?.to),
                  },
                  preset: CUSTOM_DATE_RANGE_PRESET,
                });
              } else {
                setState({
                  date: updated,
                  preset: CUSTOM_DATE_RANGE_PRESET,
                });
              }
            }}
            month={month}
            onMonthChange={setMonth}
            className="p-2"
            captionLayout="dropdown"
            disabled={[{ after: today }]}
            components={{
              DropdownNav: (props: DropdownNavProps) => {
                return (
                  <div className="flex w-full items-center gap-2 z-40!">
                    {props.children}
                  </div>
                );
              },
              Dropdown: (props: DropdownProps) => {
                return (
                  <Select
                    value={String(props.value)}
                    onValueChange={(value) => {
                      props.onChange?.({
                        target: { value },
                      } as React.ChangeEvent<HTMLSelectElement>);
                    }}
                  >
                    <SelectTrigger className="h-8 w-fit font-medium first:grow">
                      <SelectValue className="z-50!" />
                    </SelectTrigger>
                    <SelectContent className="max-h-[min(26rem,var(--radix-select-content-available-height))]">
                      {props.options?.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                          disabled={option.disabled}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                );
              },
            }}
          />
        </div>
      </PopoverContent>
    </Popover>
  );
}
