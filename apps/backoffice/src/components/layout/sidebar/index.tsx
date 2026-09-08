"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LayoutDashboard, PanelLeftClose, PanelLeftOpen } from "lucide-react";

import { Button } from "@ui/components/ui/button";
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
        "relative flex h-full shrink-0 flex-col border-r border-border/50 bg-sidebar transition-all duration-200",
        collapsed ? "w-[60px]" : "w-60",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div
          className={cn(
            "flex h-14 shrink-0 items-center justify-between border-b border-border/50 px-3",
            collapsed && "justify-center px-0",
          )}
        >
          <Link href="/" className="min-w-0">
            {collapsed ? (
              <LayoutDashboard className="size-5 text-primary" />
            ) : (
              <Logo className="scale-50 origin-left ml-12" />
            )}
          </Link>
          {!collapsed && (
            <button
              type="button"
              onClick={() => setCollapsed(true)}
              className="rounded-sm p-1.5 text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
              title="Collapse sidebar"
            >
              <PanelLeftClose className="size-4" />
            </button>
          )}
          {collapsed && (
            <Button
              type="button"
              onClick={() => setCollapsed(false)}
              className="absolute -right-3 top-20 z-10 flex size-6 items-center justify-center rounded-full border bg-background text-muted-foreground shadow-sm transition-colors hover:text-foreground"
              title="Expand sidebar"
            >
              <PanelLeftOpen className="size-3" />
            </Button>
          )}
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <LinksSection
            sections={SIDEBAR_NAV}
            path={path}
            collapsed={collapsed}
          />
        </nav>

        <div className="shrink-0 border-t border-border/50 px-2 py-2">
          <ProfilePopover collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
