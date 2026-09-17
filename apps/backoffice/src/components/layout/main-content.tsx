"use client";

import { cn } from "@ui/lib/utils";

export default function MainContent({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={cn("flex-1 overflow-y-auto")}>
      <div className={cn("max-w-none px-6 py-1 sm:px-6 xl:px-8")}>
        {children}
      </div>
    </main>
  );
}
