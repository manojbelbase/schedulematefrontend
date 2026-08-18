import { useEffect } from "react";

export function useShortcut(
  keys: string[],
  callback: () => void,
  enabled: boolean = true,
) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        enabled &&
        !["INPUT", "TEXTAREA"].includes(
          document.activeElement?.tagName || "",
        ) &&
        !isAnyDialogOpen() &&
        keys.includes(event.key)
      ) {
        event.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [keys, callback, enabled]);
}
export function isAnyDialogOpen() {
  return Boolean(
    document.body.querySelector(
      '[data-state="open"][role="dialog"], [data-radix-dialog-overlay][data-state="open"]',
    ),
  );
}