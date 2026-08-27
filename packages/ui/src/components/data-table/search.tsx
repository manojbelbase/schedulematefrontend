"use client";

import { useEffect, useRef, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";

import { buttonVariants } from "@ui/components/ui/button";
import { useDebounce } from "@ui/hooks/useDebounce";
import { useQueryParamsFilter } from "@ui/hooks/useQueryParamsFilter";
import { cn } from "@ui/lib/utils";

export type TDataTableSearchProps = {
  param: string;
  placeholder?: string;
};

export default function DataTableSearch({
  param,
  placeholder = "Search items...",
}: TDataTableSearchProps) {
  const { state, setFilter, removeFilter } = useQueryParamsFilter();
  const query = state?.[param];
  const defaultValue = typeof query === "string" ? query : "";

  const [open, setOpen] = useState(Boolean(defaultValue));
  const [value, setValue] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const debouncedValue = useDebounce(value, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setOpen(true);
  };

  useEffect(() => {
    if (debouncedValue?.trim()) {
      setFilter(param, debouncedValue.trim());
    } else {
      removeFilter(param);
    }
  }, [debouncedValue, param]);

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
      setOpen(true);
    } else {
      setValue("");
    }
  }, [defaultValue]);

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setValue("");
    setOpen(false);
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="grid gap-2 py-1">
      <div
        className={cn(
          buttonVariants({ variant: "outline" }),
          "justify-start w-fit relative",
          "focus-within:ring-[3px] focus-within:border-gray-400 focus-within:ring-gray-300 dark:focus-within:border-gray-600 dark:focus-within:ring-gray-700",
          open &&
            "focus-within:ring-2 focus-within:ring-gray-400 dark:focus-within:ring-gray-600 focus-within:ring-offset-2 ring-offset-background focus-within:border-border",
        )}
        onClick={() => {
          setOpen(true);
          inputRef.current?.focus();
        }}
      >
        <SearchIcon className={cn(open && "text-muted-foreground")} />
        <input
          ref={inputRef}
          onClick={() => setOpen(true)}
          onBlur={() => {
            if (value === "") {
              setOpen(false);
            }
          }}
          className={cn(
            "h-9 bg-transparent text-xs font-normal outline-none placeholder:text-dark-500 pt-0.5 w-[49px] transition-all",
            !open && "placeholder:text-dark-500 cursor-pointer text-sm",
            open && "w-[170px]",
          )}
          value={value}
          onChange={handleChange}
          placeholder={open ? placeholder : "Search"}
        />
        {open && (
          <p className="block cursor-pointer" onClick={handleClear}>
            <XIcon />
          </p>
        )}
      </div>
    </div>
  );
}
