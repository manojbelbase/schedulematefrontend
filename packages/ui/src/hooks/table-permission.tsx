"use client";

import React, { createContext, useMemo, type ReactNode } from "react";

type PermissionContextValue = {
  hasEditPermission: boolean;
};
const PermissionContext = createContext<PermissionContextValue | null>(null);
export function TablePermissionProvider({
  hasEditPermission,
  children,
}: {
  hasEditPermission?: boolean;
  children: ReactNode;
}) {
  const value = useMemo(
    () => ({ hasEditPermission: hasEditPermission ?? true }),
    [hasEditPermission],
  );

  return (
    <PermissionContext.Provider value={value}>
      {children}
    </PermissionContext.Provider>
  );
}
export function useTablePermission() {
  const context = React.useContext(PermissionContext);
  if (!context) {
    //Safely returnning null to avoid errors.
    //This hook should be used only when we are sure that the provider is present used specially in status-selector and editable number input
    //for safely extracting hasEditPermission value.
    return null;
  }
  return context;
}
