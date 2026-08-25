"use client";

import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@ui/components/ui/sonner";
import { DataTableProvider } from "@ui/context/data-table-context";
import ModalContextProvider from "@ui/context/modal-context";

import { ModalsRenderer } from "@/components/modals";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <DataTableProvider>
        <ModalContextProvider>
          {children}
          <ModalsRenderer />
          <Toaster />
        </ModalContextProvider>
      </DataTableProvider>
    </QueryClientProvider>
  );
}
