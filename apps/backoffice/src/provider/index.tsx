"use client";

import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Toaster } from "@ui/components/ui/sonner";
import { DataTableProvider } from "@ui/context/data-table-context";
import ModalContextProvider from "@ui/context/modal-context";

import { ModalsRenderer } from "@/components/modals";

import AuthProvider from "./auth-provider";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <DataTableProvider>
            <ModalContextProvider>
              {children}
              <ModalsRenderer />
              <Toaster />
            </ModalContextProvider>
          </DataTableProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
