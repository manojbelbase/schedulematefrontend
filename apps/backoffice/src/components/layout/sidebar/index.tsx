"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@ui/lib/utils";

import Logo from "@/components/logo";

import LinksSection from "./links-section";
import { SIDEBAR_NAV } from "./nav-data";
import ProfilePopover from "./profile-popover";

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();

  return (
    <aside
      className={cn(
        "relative flex h-full shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-[68px]" : "w-64",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div
          className={cn(
            "flex h-14 shrink-0 items-center border-b border-sidebar-border px-3",
            collapsed && "justify-center px-0",
          )}
        >
          <Link href="/" className="min-w-0">
            {collapsed ? (
              <span className="text-lg font-bold text-foreground">S</span>
            ) : (
              <Logo className="scale-75 origin-left" />
            )}
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <div className="space-y-3">
            <LinksSection
              sections={SIDEBAR_NAV}
              path={path}
              collapsed={collapsed}
            />
          </div>
        </nav>

        <div className="shrink-0 p-2">
          <ProfilePopover collapsed={collapsed} />
        </div>

        <button
          type="button"
          onClick={() => setCollapsed(!collapsed)}
          className="absolute -right-3 top-20 z-10 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="size-3" />
          ) : (
            <ChevronLeft className="size-3" />
          )}
        </button>
      </div>
    </aside>
  );
}
