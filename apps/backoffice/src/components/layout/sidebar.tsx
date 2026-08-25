"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, LogOut, Settings, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import { Separator } from "@ui/components/ui/separator";
import { cn } from "@ui/lib/utils";

import Logo from "@/components/logo";
import { useAuthStore } from "@/zustand/auth";

type NavItem = {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
};

const navItems: NavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/users", label: "Users", icon: Users },
];

export default function Sidebar() {
  const path = usePathname();
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);

  const displayName = user?.name || user?.username || "Account";
  const initial = displayName.slice(0, 2).toUpperCase();

  return (
    <aside className="relative flex h-full w-72 shrink-0 flex-col justify-between border-r border-border bg-sidebar">
      <div className="flex h-full flex-col overflow-hidden">
        <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-4">
          <Link href="/" className="min-w-0">
            <Logo className="scale-[0.6] origin-left" />
          </Link>
        </div>

        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive =
              path === item.href ||
              (item.href !== "/" && path.startsWith(item.href));
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent",
                )}
              >
                <Icon className="size-5 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="shrink-0 border-t border-sidebar-border p-3">
          <div className="space-y-1 rounded-md border border-sidebar-border bg-sidebar/50 p-1.5">
            <div className="flex items-center gap-3 px-2 py-1.5">
              <Avatar className="size-8 shrink-0 bg-primary/10 rounded-sm">
                <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold rounded-sm">
                  {initial}
                </AvatarFallback>
              </Avatar>
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
            </div>
            <Separator className="my-1" />
            <button
              type="button"
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-foreground transition-colors hover:bg-accent"
            >
              <Settings className="size-4 text-muted-foreground" />
              Settings
            </button>
            <Separator className="my-1" />
            <button
              type="button"
              onClick={() => logout()}
              className="flex w-full items-center gap-2.5 rounded-md px-2.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-destructive"
            >
              <LogOut className="size-4" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
