import { useEffect, useState } from "react";

/**
 *
 * @param value @type {T}
 * @param timeMS
 * @returns @type {T}
 *
 */
export function useDebounce<T>(value: T, timeMS?: number): T | undefined {
  const [val, setVal] = useState<T>();
  const delay = timeMS || 500;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVal(value);
    }, delay);
    return () => {
      clearTimeout(timeout);
    };
  }, [delay, value]);

  return val;
}