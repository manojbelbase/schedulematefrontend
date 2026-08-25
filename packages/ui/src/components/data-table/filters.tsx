import type { ComponentProps, ReactNode } from "react";
import { type DateRange } from "react-day-picker";
import { Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { useDataTableQueryContext } from "@ui/context/data-table-query-context";
import { cn, unique } from "@ui/lib/utils";
import { type Any } from "@ui/types/globals";

import DatePicker, { type TDatePickerProps } from "../input/date-picker";
import AsyncSelect, { type TOption } from "../input/select/async-select";
import OptionSelect, { type TSelectProps } from "../input/select/option-select";
import { Button } from "../ui/button";

export type TSelectFilter = {
  key: string;
  type: "select";
  props: Omit<TSelectProps, "value" | "onChange">;
};

export type TAsyncSelectFilter<
  Fetcher extends (...args: any[]) => any,
  Props = ComponentProps<typeof AsyncSelect<Fetcher>>,
> = {
  key: {
    label: string;
    value: string;
  };
  type: "asyncSelect";
  props: Props;
};

export type TDateFilter = {
  key: {
    dateFrom: string;
    dateTo: string;
    preset: string;
  };
  type: "date";
  props: Omit<TDatePickerProps, "value" | "onChange">;
};

export type TCustomFilter<Value = unknown> = {
  key: string;
  type: "custom";
  render: (onChange: (value: Value) => void, value: Value) => ReactNode;
};

export type TFilterItem =
  TSelectFilter | TDateFilter | TCustomFilter | TAsyncSelectFilter<Any>;

export type TFilterType = TFilterItem["type"];

export type TFilterKeyByType<Type extends TFilterType> = Extract<
  TFilterItem,
  { type: Type }
>["key"];

export type TFiltersProps = {
  items?: {
    [key: string]: TFilterItem;
  };
  show?: boolean;
  hideResetButton?: boolean;
};

export default function Filters({
  items,
  show,
  hideResetButton = false,
}: TFiltersProps) {
  const { state, setState, clearState, hasValueChanged, clearStates } =
    useDataTableQueryContext();

  if (!items) return null;

  return (
    <AnimatePresence mode="sync">
      {show && (
        <div className="flex items-center gap-2 flex-wrap overflow-hidden">
          {Object.entries(items).map(([key, filter], index) => {
            if (filter.type === "date") {
              const preset = state[filter.key.preset] as
                TDatePickerProps["preset"] | undefined;
              const value: DateRange | undefined =
                state[filter.key.dateFrom] || state[filter.key.dateTo]
                  ? {
                      from: state[filter.key.dateFrom],
                      to: state[filter.key.dateTo],
                    }
                  : undefined;
              const pickerValue: TDatePickerProps["value"] = {
                date: value,
                preset,
              };

              return (
                <motion.div
                  key={key}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <DatePicker
                    preset={preset}
                    value={pickerValue}
                    onChange={(next) => {
                      if (next.date) {
                        setState({
                          ...state,
                          [filter.key.dateFrom]: next.date?.from,
                          [filter.key.dateTo]: next.date?.to,
                          [filter.key.preset]: next.preset,
                        });
                      } else {
                        clearState("date", {
                          dateFrom: filter.key.dateFrom,
                          dateTo: filter.key.dateTo,
                          preset: filter.key.preset,
                        });
                      }
                    }}
                    onFilterRemove={() => {
                      clearState("date", {
                        dateFrom: filter.key.dateFrom,
                        dateTo: filter.key.dateTo,
                        preset: filter.key.preset,
                      });
                    }}
                    {...filter.props}
                  />
                </motion.div>
              );
            }
            if (filter.type === "custom") {
              return (
                <motion.div
                  key={key}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  {filter.render(
                    (value) => setState({ [key]: value }),
                    state[key],
                  )}
                </motion.div>
              );
            }
            if (filter.type === "select") {
              const getValue = ({ type }: { type: "single" | "multiple" }) => {
                if (type === "single") {
                  return typeof state[filter.key] === "string"
                    ? state[filter.key]
                    : Array.isArray(state[filter.key])
                      ? state[filter.key][0]
                      : "";
                } else {
                  return Array.isArray(JSON.parse(state[filter.key] || "[]"))
                    ? JSON.parse(state[filter.key] || "[]")
                    : [];
                }
              };

              return (
                <motion.div
                  key={key}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <OptionSelect
                    {...filter.props}
                    value={getValue({ type: filter.props.type || "single" })}
                    isForfilter={true}
                    onFilterRemove={() => {
                      clearState("select", filter.key);
                    }}
                    disabledSearch={filter.props.disabledSearch ?? true}
                    onChange={(value) =>
                      setState({
                        ...state,
                        [filter.key]:
                          filter.props.type === "single"
                            ? value
                              ? value
                              : ""
                            : value.length > 0
                              ? JSON.stringify(value)
                              : "",
                      })
                    }
                  />
                </motion.div>
              );
            }
            if (filter.type === "asyncSelect") {
              const props = filter.props;
              const defaultOptions: TOption[] =
                filter.props.type === "single" && state[filter.key.value]
                  ? [
                      {
                        label: String(state[filter.key.label] || ""),
                        value: String(state[filter.key.value] || ""),
                      },
                    ]
                  : state[filter.key.label]
                    ? JSON.parse(String(state[filter.key.label]))
                    : [];

              const value =
                filter.props.type === "single"
                  ? state[filter.key.value] || ""
                  : state[filter.key.value]
                    ? JSON.parse(String(state[filter.key.value]))
                    : "";

              return (
                <motion.div
                  key={key}
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -20, opacity: 0 }}
                  transition={{ duration: 0.2, delay: index * 0.1 }}
                >
                  <AsyncSelect
                    {...filter.props}
                    value={value}
                    options={unique(
                      [...(filter.props.options || []), ...defaultOptions],
                      "value",
                    )}
                    classNames={
                      props.classNames
                        ? {
                            trigger: cn(props.classNames?.trigger),
                            item: cn(props.classNames?.item),
                          }
                        : {
                            trigger: "h-9!",
                            item: "",
                          }
                    }
                    popover={{
                      ...filter.props.popover,
                      content: {
                        align: "start",
                        ...filter.props.popover?.content,
                      },
                    }}
                    onFilterRemove={() => {
                      clearState("asyncSelect", {
                        label: filter.key.label,
                        value: filter.key.value,
                      });
                    }}
                    fetcher={
                      props.fetcher
                        ? {
                            ...props.fetcher,
                            onItemSelect: props.fetcher.onItemSelect
                              ? props.fetcher.onItemSelect
                              : (item, isDeselected) => {
                                  const id =
                                    props.fetcher?.renderables.getValueFromItem(
                                      item,
                                    );
                                  const name =
                                    props.fetcher?.renderables.getLabelFromItem(
                                      item,
                                    );

                                  // if (filter.linked) {
                                  //   filter.linked.forEach((linkedKey) => {
                                  //     removeFilter(linkedKey);
                                  //     removeFilter(`${linkedKey}_name`);
                                  //   });
                                  // }

                                  if (!isDeselected) {
                                    if (props.type === "single") {
                                      setState({
                                        ...state,
                                        [filter.key.value]: id,
                                        [filter.key.label]: name,
                                      });
                                    } else {
                                      const currentValues = JSON.parse(
                                        String(state[filter.key.value] || "[]"),
                                      );
                                      setState({
                                        ...state,
                                        [filter.key.value]: JSON.stringify([
                                          ...currentValues,
                                          id,
                                        ]),
                                        [filter.key.label]: JSON.stringify([
                                          ...currentValues,
                                          {
                                            label: name,
                                            value: id,
                                          },
                                        ]),
                                      });
                                    }
                                  } else {
                                    if (props.type === "single") {
                                      clearState("asyncSelect", {
                                        label: filter.key.label,
                                        value: filter.key.value,
                                      });
                                    } else {
                                      const currentValues: string[] =
                                        JSON.parse(
                                          String(
                                            state[filter.key.value] || "[]",
                                          ),
                                        );
                                      const currentLabels: TOption[] =
                                        JSON.parse(
                                          String(
                                            state[filter.key.label] || "[]",
                                          ),
                                        );
                                      const newValue = currentValues.filter(
                                        (v) => v !== id,
                                      );
                                      const newLabels = currentLabels.filter(
                                        (v) => v.value !== id,
                                      );
                                      setState({
                                        ...state,
                                        [filter.key.value]:
                                          JSON.stringify(newValue),
                                        [filter.key.label]:
                                          JSON.stringify(newLabels),
                                      });
                                    }
                                  }
                                },
                          }
                        : undefined
                    }
                  />
                </motion.div>
              );
            }
          })}
          {hasValueChanged && !hideResetButton && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearStates}
              className="text-destructive"
            >
              <Trash2 className="size-4" />
              Reset Filters
            </Button>
          )}
        </div>
      )}
    </AnimatePresence>
  );
}

export function definePaginatedSelect<Fetcher extends (...args: Any[]) => Any>(
  props: ComponentProps<typeof AsyncSelect<Fetcher>>,
): TAsyncSelectFilter<Fetcher> {
  return {
    props,
    type: "asyncSelect",
    key: {
      label: "value",
      value: "options",
    },
  };
}
