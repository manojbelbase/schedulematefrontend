"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { PanelLeftClose, PanelLeftOpen } from "lucide-react";

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
        "relative flex h-full shrink-0 flex-col border-r border-border bg-sidebar transition-all duration-200",
        collapsed ? "w-[60px]" : "w-56",
      )}
    >
      <div className="flex h-full flex-col overflow-hidden">
        <div
          className={cn(
            "flex h-14 shrink-0 items-center justify-between border-b border-border px-3",
            collapsed && "justify-center px-0",
          )}
        >
          <Link href="/" className={cn("min-w-0", collapsed && "mx-auto")}>
            {collapsed ? (
              <Image
                src="/schedulemate-logo.png"
                alt="ScheduleMate AI"
                width={300}
                height={300}
                className="size-8"
              />
            ) : (
              <Logo className="scale-50 origin-left ml-12" />
            )}
          </Link>
          <Button
            type="button"
            onClick={() => setCollapsed((prev) => !prev)}
            className="absolute -right-3 top-4 z-10 flex size-6 items-center justify-center  rounded-full border bg-background hover:bg-accent text-muted-foreground shadow-xs transition-colors hover:text-foreground"
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? (
              <PanelLeftOpen className="size-3" />
            ) : (
              <PanelLeftClose className="size-3" />
            )}
          </Button>
        </div>

        <nav className="flex-1 overflow-y-auto px-2 py-3">
          <LinksSection
            sections={SIDEBAR_NAV}
            path={path}
            collapsed={collapsed}
          />
        </nav>

        <div className="shrink-0 border-t border-border px-2 py-2">
          <ProfilePopover collapsed={collapsed} />
        </div>
      </div>
    </aside>
  );
}
