"use client";

import * as React from "react";
import { MessageCirclePlus } from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/animate-ui/components/radix/tooltip";
import { TooltipPortal } from "@ui/components/animate-ui/primitives/radix/tooltip";
import { Textarea } from "@ui/components/ui/textarea";
import { cn } from "@ui/lib/utils";
import { useTableUiConfigStore } from "@ui/zustand/table/expandable-textarea";

type ExpandableTextAreaProps = {
  value: string;
  placeholder?: string;
  isPending?: boolean;
  onSave?: (value: string) => void;
  setValue?: (value: string) => void;
  isEditing?: boolean;
  setIsEditing?: (value: boolean) => void;
  disable?: boolean;
  className?: string;
  showTooltip?: boolean;
  tooltipContentClassName?: string;
  preserveWhitespace?: boolean;
  defaultValue?: string;
  defaultTextWrapped?: boolean;
};

export function ExpandableTextArea({
  defaultValue,
  value,
  setValue,
  isEditing,
  setIsEditing,
  placeholder = "Add remarks..",
  isPending = false,
  onSave,
  className,
  disable,
  showTooltip = false,
  tooltipContentClassName,
  preserveWhitespace = true,
  defaultTextWrapped,
}: ExpandableTextAreaProps) {
  const { textWrapped: _txtwraped } = useTableUiConfigStore();
  const textWrapped =
    defaultTextWrapped !== undefined ? defaultTextWrapped : _txtwraped;

  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const rootRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (isEditing && textareaRef.current) {
      const el = textareaRef.current;
      el.focus();
      const length = el.value.length;
      el.setSelectionRange(length, length);

      // adjust height immediately on entering edit mode
      el.style.height = "auto";
      el.style.height = Math.max(40, el.scrollHeight) + "px";
    }
  }, [isEditing]);

  const handleSave = () => {
    if (isEditing && onSave) {
      onSave(value);
      setIsEditing?.(false);
    }
  };

  function onKeyDown(e: React.KeyboardEvent) {
    if (isEditing) {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSave();
      }
    }
    if (e.key === "Escape" && isEditing) {
      e.preventDefault();
      setValue?.(defaultValue || "");
      setIsEditing?.(false);
      e.nativeEvent.stopImmediatePropagation();
      e.preventDefault();
    }
  }

  React.useEffect(() => {
    const onDocKeyDown = (ev: KeyboardEvent) => {
      if (ev.key !== "Escape") return;

      const active = document.activeElement;
      if (!rootRef.current) return;
      if (rootRef.current.contains(active)) {
        ev.preventDefault();
        ev.stopPropagation();
        ev.stopImmediatePropagation?.();
      }
      if (textareaRef.current) {
        textareaRef.current.blur();
      }
    };
    window.addEventListener("keydown", onDocKeyDown, true);
    return () => window.removeEventListener("keydown", onDocKeyDown, true);
  }, []);

  if (!isEditing) {
    return (
      <div
        className={cn(
          "w-full cursor-pointer px-2 py-1 rounded transition-colors min-h-[40px] flex items-center",
          disable && "cursor-not-allowed",
          className,
        )}
        onClick={(e) => {
          e.stopPropagation();
          if (disable) {
            return;
          }
          setIsEditing?.(true);
        }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (disable) {
              return;
            }
            setIsEditing?.(true);
          }
        }}
      >
        {value?.length ? (
          showTooltip ? (
            textWrapped ? (
              <TooltipProvider delayDuration={100}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={cn(
                        "text-sm w-full",
                        !textWrapped
                          ? "min-w-72 text-wrap break-words"
                          : "break-all line-clamp-1 text-ellipsis",
                      )}
                    >
                      {value}
                    </span>
                  </TooltipTrigger>
                  <TooltipPortal>
                    <TooltipContent
                      className={cn(
                        "max-w-sm bg-secondary text-foreground",
                        tooltipContentClassName,
                      )}
                      arrowClassName="bg-secondary fill-secondary"
                      side="top"
                      align="start"
                    >
                      <span className="text-sm text-wrap">{value}</span>
                    </TooltipContent>
                  </TooltipPortal>
                </Tooltip>
              </TooltipProvider>
            ) : (
              <span
                title={textWrapped ? value : ""}
                className={cn(
                  "text-sm w-full",
                  preserveWhitespace && "whitespace-pre-wrap!",
                  !textWrapped
                    ? "min-w-72 text-wrap break-words"
                    : "break-all line-clamp-1 text-ellipsis",
                )}
              >
                {value}
              </span>
            )
          ) : (
            <span
              title={textWrapped ? value : ""}
              className={cn(
                "text-sm w-full",
                preserveWhitespace && "whitespace-pre-wrap!",
                !textWrapped
                  ? "min-w-72 text-wrap break-words"
                  : "break-all line-clamp-1 text-ellipsis",
              )}
            >
              {value}
            </span>
          )
        ) : (
          <span className="text-text-tertiary text-sm flex items-center gap-2">
            <MessageCirclePlus className="w-6 h-6" />
            <span className="px-2 py-1 border rounded-lg border-dashed">
              {placeholder}
            </span>
          </span>
        )}
      </div>
    );
  }

  return (
    <div className="w-full" ref={rootRef}>
      <Textarea
        ref={textareaRef}
        autoFocus
        value={value}
        rows={1}
        disabled={isPending || disable}
        onClick={(e) => e.stopPropagation()}
        onChange={(e) => {
          setValue?.(e.target.value);

          const el = e.target;
          el.style.height = "auto";
          el.style.height = Math.max(40, Math.min(el.scrollHeight, 200)) + "px"; //rows grows as per user typing text..
        }}
        onKeyDown={onKeyDown}
        onBlur={() => {
          if (isEditing) {
            setIsEditing?.(false);
            setValue?.(defaultValue || "");
          }
        }}
        className={cn(
          "resize-none py-1 px-3 placeholder:text-text-disabled border-none focus:border-none focus:ring-0 bg-transparent text-sm overflow-hidden transition-all duration-200 ease-in-out min-h-[40px] max-h-[200px] w-full disabled:focus-none",
          className,
        )}
        placeholder={"Press Enter to save."}
      />
    </div>
  );
}
