"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Edit3, Eye, Trash2 } from "lucide-react";

import Icon from "@ui/assets/icons";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@ui/components/animate-ui/components/radix/context-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui/components/animate-ui/components/radix/dropdown-menu";
import ModalTrigger, {
  type TTriggerProps,
} from "@ui/components/deployables/trigger";
import { Button } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import { type Any } from "@ui/types/globals";

type TLink = {
  path: string;
};

type TProps = {
  edit?: TLink | Omit<TTriggerProps, "children">;
  view?: TLink | Omit<TTriggerProps, "children">;
  remove?: Omit<TTriggerProps, "children"> & { label?: string };
  icon?: React.ReactElement;
  children?: React.ReactNode;
  className?: string;
  name?: string;
  fromRightClick?: boolean;
  trigger?: React.ReactElement;
  defaultToggle?: boolean | undefined;
  items?: React.ReactNode;
  itemsPosition?: "first" | "last";
  containerClassName?: string;
};

export default function ActionButtons({
  remove,
  edit,
  view,
  children,
  icon,
  className,
  name,
  fromRightClick = false,
  items,
  defaultToggle,
  itemsPosition = "first",
  containerClassName,
}: TProps) {
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    if (defaultToggle) {
      setToggle(false);
    }
  }, [defaultToggle]);

  const Menu = fromRightClick ? ContextMenu : DropdownMenu;
  const Trigger = fromRightClick ? ContextMenuTrigger : DropdownMenuTrigger;
  const Content = fromRightClick ? ContextMenuContent : DropdownMenuContent;
  const Item = fromRightClick ? ContextMenuItem : DropdownMenuItem;

  if (!fromRightClick && !edit && !view && !remove && !children && !items) {
    return null;
  }

  return (
    <Menu onOpenChange={setToggle} open={toggle} modal={false}>
      {fromRightClick ? (
        <Trigger disabled={!edit && !view && !remove && !items} asChild>
          {children}
        </Trigger>
      ) : (
        <Trigger
          asChild
          onContextMenu={(e) => {
            e.stopPropagation();
          }}
        >
          <Button
            variant="ghost"
            size="icon-sm"
            className={cn(
              "flex items-center justify-center data-[state=open]:bg-accent focus-visible:ring-0! focus-visible:border-none! mx-1",
              "permission-all_permissions:flex",
              className,
            )}
            onClick={(e) => e.stopPropagation()}
          >
            {icon ? (
              icon
            ) : (
              <Icon name="more-horizontal" className="size-4! 3xl:size-5! " />
            )}
          </Button>
        </Trigger>
      )}
      <Content
        className={cn("w-fit font-medium no-scrollbar", containerClassName)}
        align="end"
        onClick={(e) => {
          e.stopPropagation();
        }}
        onContextMenu={(e) => {
          e.stopPropagation();
        }}
      >
        {itemsPosition === "first" && items}
        {!fromRightClick && children}
        {view && "modalID" in view && (
          <ModalTrigger {...(view as Any)}>
            <Item
              onContextMenu={(e) => {
                e.stopPropagation();
              }}
              onClick={(e) => {
                e.stopPropagation();
              }}
              className="w-full px-3"
            >
              <Eye size={16} className="mr-2.5" /> View {name}
            </Item>
          </ModalTrigger>
        )}
        {view && "path" in view && (
          <Item
            onContextMenu={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className="w-full px-3"
            asChild
          >
            <Link href={view.path} prefetch>
              <Eye size={16} className="mr-2.5" />
              View {name}
            </Link>
          </Item>
        )}
        {edit && "modalID" in edit && (
          <ModalTrigger {...(edit as Any)}>
            <Item
              onContextMenu={(e) => {
                e.stopPropagation();
              }}
              className={cn("w-full px-3")}
            >
              <Edit3
                size={16}
                className="mr-2.5 hover:text-accent-foreground!"
              />
              Edit {name}
            </Item>
          </ModalTrigger>
        )}
        {edit && "path" in edit && (
          <Item
            onContextMenu={(e) => {
              e.stopPropagation();
            }}
            onClick={(e) => {
              e.stopPropagation();
            }}
            className={cn("w-full px-3")}
            asChild
          >
            <Link href={edit.path} prefetch>
              <Edit3 size={16} className="mr-2.5 hover:text-current!" />
              Edit {name}
            </Link>
          </Item>
        )}
        {remove && (
          <ModalTrigger {...(remove as Any)}>
            <Item
              className={cn(
                "text-red-500 font-medium px-3 hover:text-red-500!",
              )}
              onContextMenu={(e) => {
                e.stopPropagation();
              }}
            >
              <Trash2 size={16} className="mr-2.5 text-red-500" />
              {remove.label || "Delete "} {name}
            </Item>
          </ModalTrigger>
        )}
        {itemsPosition === "last" && items}
      </Content>
    </Menu>
  );
}
