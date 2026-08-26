"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@ui/components/ui/avatar";
import { Separator } from "@ui/components/ui/separator";
import { cn } from "@ui/lib/utils";

import Logo from "@/components/logo";
import { LINKS } from "@/config/links";
import { useAuthStore } from "@/zustand/auth";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
};

const navItems: NavItem[] = [
  { href: LINKS.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
  { href: LINKS.USERS, label: "Users", icon: Users },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const path = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName = user?.name || user?.username || "Account";
  const initial = displayName.slice(0, 2).toUpperCase();

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
          <div className="space-y-0.5">
            {navItems.map((item) => {
              const isActive =
                path === item.href ||
                (item.href !== "/" && path.startsWith(item.href));
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  title={collapsed ? item.label : undefined}
                  className={cn(
                    "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    collapsed && "justify-center px-2",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <Icon className="size-4 shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="shrink-0 border-t border-sidebar-border p-2">
          <div
            className={cn("rounded-md bg-sidebar/50 p-2", collapsed && "p-1.5")}
          >
            <div
              className={cn(
                "flex items-center gap-2.5",
                collapsed ? "justify-center" : "px-1.5 py-1",
              )}
            >
              <Avatar className="size-8 shrink-0 rounded-md bg-primary/10">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold rounded-md">
                  {initial}
                </AvatarFallback>
              </Avatar>
              {!collapsed && (
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {displayName}
                  </p>
                  {user?.email && (
                    <p className="truncate text-xs text-muted-foreground">
                      {user.email}
                    </p>
                  )}
                </div>
              )}
            </div>

            {!collapsed && (
              <>
                <Separator className="my-2" />
                <button
                  type="button"
                  className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  <Settings className="size-4" />
                  Settings
                </button>
              </>
            )}

            <Separator className="my-2" />
            <button
              type="button"
              onClick={() => logout()}
              title={collapsed ? "Sign out" : undefined}
              className={cn(
                "flex w-full items-center gap-2.5 rounded-md px-2.5 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-destructive",
                collapsed && "justify-center px-0",
              )}
            >
              <LogOut className="size-4" />
              {!collapsed && "Sign out"}
            </button>
          </div>
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
