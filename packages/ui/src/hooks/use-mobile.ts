"use client";

import * as React from "react";

const MOBILE_BREAKPOINT = 768;

export function useIsMobile(mobileBreakpoint?: number) {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(
    undefined,
  );
  const _MOBILE_BREAKPOINT = mobileBreakpoint || MOBILE_BREAKPOINT;
  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${_MOBILE_BREAKPOINT - 1}px)`);
    const onChange = () => {
      setIsMobile(window.innerWidth < _MOBILE_BREAKPOINT);
    };
    mql.addEventListener("change", onChange);
    setIsMobile(window.innerWidth < _MOBILE_BREAKPOINT);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  return !!isMobile;
}
