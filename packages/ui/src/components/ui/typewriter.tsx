"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@ui/lib/utils";

export type TypewriterProps = {
  words: string[];
  typeSpeed?: number;
  deleteSpeed?: number;
  pauseMs?: number;
  loop?: boolean;
  showCaret?: boolean;
  className?: string;
  caretClassName?: string;
};

export function Typewriter({
  words,
  typeSpeed = 90,
  deleteSpeed = 45,
  pauseMs = 1600,
  loop = true,
  showCaret = true,
  className,
  caretClassName,
}: TypewriterProps) {
  const [enabled, setEnabled] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const [paused, setPaused] = useState(false);
  const wordsRef = useRef(words);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!words.length) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setText(words[0]!);
      return;
    }
    setEnabled(true);
  }, [words]);

  useEffect(() => {
    if (wordsRef.current.join("\u0000") !== words.join("\u0000")) {
      wordsRef.current = words;
      setWordIndex(0);
      setText("");
      setDeleting(false);
      setPaused(false);
    }
  }, [words]);

  useEffect(() => {
    if (!enabled) return;

    const list = wordsRef.current;
    if (!list.length) return;

    const word = list[wordIndex % list.length]!;

    if (paused) {
      const isLast = !loop && wordIndex === list.length - 1;
      timerRef.current = setTimeout(() => {
        if (isLast) {
          setEnabled(false);
        } else {
          setPaused(false);
          setDeleting(true);
        }
      }, pauseMs);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }

    if (deleting && text === "") {
      setDeleting(false);
      setWordIndex(wordIndex < list.length - 1 ? wordIndex + 1 : 0);
      return;
    }

    timerRef.current = setTimeout(
      () => {
        setText(
          deleting
            ? word.slice(0, Math.max(0, text.length - 1))
            : word.slice(0, text.length + 1),
        );
        if (!deleting && text.length + 1 >= word.length) {
          setPaused(true);
        }
      },
      deleting ? deleteSpeed : typeSpeed,
    );

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [
    enabled,
    text,
    deleting,
    paused,
    wordIndex,
    deleteSpeed,
    typeSpeed,
    pauseMs,
    loop,
  ]);

  return (
    <span className={cn("whitespace-nowrap", className)}>
      {text}
      {showCaret && (
        <span
          aria-hidden
          className={cn(
            "ml-0.5 inline-block h-[0.85em] w-px translate-y-0.5 animate-pulse bg-current",
            caretClassName,
          )}
        />
      )}
    </span>
  );
}
