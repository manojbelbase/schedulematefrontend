"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { motion } from "motion/react";

import { SidebarTrigger } from "@ui/components/animate-ui/components/radix/sidebar";
import { Button } from "@ui/components/ui/button";
import { useIsMobile } from "@ui/hooks/use-mobile";

export type TPageHeaderProps = {
  title?: string;
  sidebarToggle?: boolean;
  backButton?:
    | {
        path?: string;
      }
    | boolean;
};

export default function PageHeader({
  title,
  sidebarToggle = true,
  backButton = false,
}: TPageHeaderProps) {
  const router = useRouter();
  const isMobile = useIsMobile();
  if (!sidebarToggle && !title) return null;
  return (
    <motion.div
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex items-center gap-2"
    >
      {sidebarToggle && isMobile && <SidebarTrigger />}
      {typeof backButton === "object" && backButton.path && (
        <Button asChild variant="outline" size="icon-xs" className="rounded-sm">
          <Link href={backButton.path}>
            <ChevronLeft className="text-primary" />
          </Link>
        </Button>
      )}
      {typeof backButton === "boolean" && backButton && (
        <Button
          asChild
          variant="outline"
          size="icon-xs"
          className="rounded-sm"
          onClick={() => router.back()}
        >
          <ChevronLeft className="text-primary" />
        </Button>
      )}
      {title && (
        <h1 className="lg:text-2xl text-lg font-medium tracking-tight">
          {title}
        </h1>
      )}
    </motion.div>
  );
}
