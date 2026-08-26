"use client";

import { type Table } from "@tanstack/react-table";
import { Layers } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../animate-ui/components/radix/dropdown-menu";
import type { TCardItem } from "../cards-section";
import { Button } from "../ui/button";

type TProps<TData> = {
  table: Table<TData>;
  items: TCardItem<TData>[];
};

export default function CardVisibility<TData>({ table, items }: TProps<TData>) {
  const meta = table.options.meta;
  const visibility = meta?.cardVisibility ?? {};
  const onChange = meta?.onCardVisibilityChange;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-start font-normal">
          <Layers className="size-4" />
          Overview Cards
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        side="right"
        className="max-h-50vh overflow-y-auto no-scrollbar"
      >
        {items.map((item) => {
          const visible = visibility[item.id] !== false;
          return (
            <DropdownMenuCheckboxItem
              key={item.id}
              className="capitalize"
              checked={visible}
              onCheckedChange={(value) => {
                if (onChange)
                  onChange((prev) => ({ ...prev, [item.id]: !!value }));
              }}
              onSelect={(e) => e.preventDefault()}
            >
              {item.label}
            </DropdownMenuCheckboxItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
