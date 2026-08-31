import {
  Bot,
  LayoutDashboard,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

import { LINKS } from "@/config/links";

export type SidebarNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export type SidebarNavSection = {
  label?: string;
  items: SidebarNavItem[];
};

export const SIDEBAR_NAV: SidebarNavSection[] = [
  {
    items: [
      { href: LINKS.DASHBOARD, label: "Dashboard", icon: LayoutDashboard },
      { href: LINKS.USERS, label: "Users", icon: Users },
      {
        href: LINKS.ACCESS_REQUESTS,
        label: "Access Requests",
        icon: ShieldCheck,
      },
      { href: LINKS.LLM_CONFIG, label: "LLM Config", icon: Bot },
    ],
  },
];
