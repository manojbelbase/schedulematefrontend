"use client";

import { ThemeProvider } from "next-themes";
import { useState, type ReactNode } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import ModalX from "@ui/components/modal";
import { Toaster } from "@ui/components/ui/sonner";
import ModalProvider from "@ui/context/modal";

import { MODALS } from "@/components/modals/data";
import AuthProvider from "@/provider/auth-provider";

export default function Provider({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      }),
  );

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryClientProvider client={queryClient}>
        <ModalProvider>
          <AuthProvider>{children}</AuthProvider>
          <ModalX MODALS={MODALS} WARN_MODAL_KEY="WARN_FORM_EXIT" />
          <Toaster />
        </ModalProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}
