import Link from "next/link";

import { cn } from "@ui/lib/utils";

import type { SidebarNavSection } from "./nav-data";

type TProps = {
  sections: SidebarNavSection[];
  path: string;
  collapsed: boolean;
};

export default function LinksSection({ sections, path, collapsed }: TProps) {
  const isActive = (href: string) =>
    path === href || (href !== "/" && path.startsWith(href));

  return (
    <div className="space-y-4">
      {sections.map((section, sectionIndex) => (
        <div key={section.label ?? sectionIndex} className="space-y-0.5">
          {section.label &&
            (collapsed ? (
              <div className="mx-2 my-1 h-px bg-border/40" />
            ) : (
              <p className="px-2.5 pb-1 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {section.label}
              </p>
            ))}
          {section.items.map((item) => {
            const active = isActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "relative flex items-center gap-2.5 rounded-sm px-2.5 py-1.5 text-sm font-medium transition-all duration-150",
                  collapsed && "justify-center px-0",
                  active
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                )}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full bg-primary" />
                )}
                <item.icon className="size-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </div>
      ))}
    </div>
  );
}
