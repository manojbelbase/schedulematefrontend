"use client";

import * as React from "react";
import {
  useCallback,
  useEffect,
  useRef,
  type ChangeEvent,
  type ClipboardEvent,
  type KeyboardEvent,
} from "react";

import { cn } from "@ui/lib/utils";

type OtpInputProps = Omit<
  React.ComponentProps<"input">,
  "value" | "onChange"
> & {
  length?: number;
  value: string;
  onChange: (value: string) => void;
  classNamePerBox?: string;
};

function OtpInput({
  length = 6,
  value,
  onChange,
  className,
  classNamePerBox,
  autoFocus,
  ...props
}: OtpInputProps) {
  const boxesRef = useRef<Array<HTMLInputElement | null>>([]);
  const valueRef = useRef(value);
  valueRef.current = value;

  const focusBox = useCallback((index: number) => {
    const box = boxesRef.current[index];
    box?.focus();
  }, []);

  const emitChange = useCallback(
    (next: string) => {
      const digits = next.replace(/\D/g, "");
      onChange(digits.slice(0, length));
    },
    [length, onChange],
  );

  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>, index: number) => {
      const current = valueRef.current;
      const incoming = event.target.value.replace(/\D/g, "");

      const next = current.split("");
      if (incoming.length === 0) {
        // Backspace emptied the box
        next[index] = "";
      } else {
        // A single typed character, or a paste landing on this box
        next[index] = incoming[0] ?? "";
        if (incoming.length > 1) {
          // Pasting multiple digits: fill from this index forward
          for (let i = 0; i < incoming.length; i++) {
            next[index + i] = incoming[i] ?? "";
          }
        }
      }

      const joined = next.join("");
      emitChange(joined);

      const lastFilled = Math.min(joined.length, Math.max(0, length - 1));
      focusBox(incoming.length > 1 ? length - 1 : lastFilled);
    },
    [emitChange, focusBox, length],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>, index: number) => {
      const current = valueRef.current;
      // Backspace on an empty box moves to the previous box
      if (event.key === "Backspace" && !current[index]) {
        event.preventDefault();
        focusBox(Math.max(0, index - 1));
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        focusBox(Math.max(0, index - 1));
      } else if (event.key === "ArrowRight") {
        event.preventDefault();
        focusBox(Math.min(length - 1, index + 1));
      }
    },
    [focusBox, length],
  );

  const handlePaste = useCallback(
    (event: ClipboardEvent<HTMLInputElement>, index: number) => {
      event.preventDefault();
      const text = event.clipboardData.getData("text").replace(/\D/g, "");
      if (!text) return;

      const next = valueRef.current.split("");
      for (let i = 0; i < text.length; i++) {
        if (index + i >= length) break;
        next[index + i] = text[i] ?? "";
      }
      emitChange(next.join(""));
      focusBox(Math.min(length - 1, index + text.length - 1));
    },
    [emitChange, focusBox, length],
  );

  useEffect(() => {
    if (autoFocus) {
      focusBox(0);
    }
  }, [autoFocus, focusBox]);

  return (
    <div className={cn("flex items-center justify-center gap-2", className)}>
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => {
            boxesRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={index === 0 ? length : 1}
          aria-label={`Digit ${index + 1} of ${length}`}
          value={value[index] ?? ""}
          onFocus={(e) => e.target.select()}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={(e) => handlePaste(e, index)}
          className={cn(
            "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-14 w-11 rounded-lg border bg-transparent text-center text-xl font-semibold tabular-nums shadow-xs outline-none focus-visible:ring-[3px]",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            classNamePerBox,
          )}
          {...props}
        />
      ))}
    </div>
  );
}

export { OtpInput };
