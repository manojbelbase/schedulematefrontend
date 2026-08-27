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
              <div className="mx-2 mb-1 h-px bg-border/50" />
            ) : (
              <p className="px-3 pb-1 text-xs font-medium text-muted-foreground">
                {section.label}
              </p>
            ))}
          {section.items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              title={collapsed ? item.label : undefined}
              className={cn(
                "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                collapsed && "justify-center px-2",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
              )}
            >
              <item.icon className="size-4 shrink-0" />
              {!collapsed && <span>{item.label}</span>}
            </Link>
          ))}
        </div>
      ))}
    </div>
  );
}
