import { useEffect, type CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  type Header as THeader,
  type Table as TTable,
} from "@tanstack/react-table";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  PinOff,
  Tally1Icon,
} from "lucide-react";

import { TABLE_CONSTANTS } from "@ui/config/constants";
import { columnSizingHandler, getCommonPinningStyles } from "@ui/lib/table";
import { cn } from "@ui/lib/utils";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "../animate-ui/components/radix/context-menu";
import { Button } from "../ui/button";
import { TableHead } from "../ui/table";

type TProps<TData> = {
  table: TTable<TData>;
  header: THeader<TData, unknown>;
  autoHeaderRowSpan?: boolean;
};

export default function THeadComponent<TData>({
  table,
  header,
  autoHeaderRowSpan,
}: TProps<TData>) {
  const { isDragging, transform, node } = useSortable({
    id: header.column.id,
    disabled: !!header.column.getIsPinned(),
  });

  const columnResizeDirection = table.options.columnResizeDirection;
  const columnResizeMode = table.options.columnResizeMode;
  const isPlaceholder = header.isPlaceholder;
  const enableResizing = header.column.columnDef.enableResizing;
  const isResizing = header.column.getIsResizing();

  let rowSpan = 1;
  const columnRelativeDepth = header.depth - header.column.depth;

  useEffect(() => {
    if (!isDragging) {
      columnSizingHandler(node.current, table, header.column);
    }
  }, [node, isDragging, table]);

  if (
    autoHeaderRowSpan &&
    !isPlaceholder &&
    columnRelativeDepth > 1 &&
    header.id === header.column.id
  ) {
    return null;
  }

  if (isPlaceholder) {
    const leafs = header.getLeafHeaders();
    rowSpan = (leafs[leafs.length - 1]?.depth || 0) - header.depth;
  }

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: CSS.Translate.toString(transform),
    transition: "width transform 0.2s ease-in-out",
    whiteSpace: "nowrap",
    zIndex: isDragging ? 50 : 0,
  };

  const getColumnWidth = () => {
    if (header.id === TABLE_CONSTANTS.SN_HEADER) {
      return TABLE_CONSTANTS.SN_WIDTH;
    } else if (header.id === TABLE_CONSTANTS.ACTIONS_HEADER) {
      return TABLE_CONSTANTS.ACTIONS_WIDTH;
    } else return `calc(var(--col-${header.column.id}-size) * 1px)`;
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <TableHead
          colSpan={header.colSpan}
          rowSpan={autoHeaderRowSpan ? rowSpan : undefined}
          className={cn(
            "group/thead font-semibold",
            header.column.getIsResizing() && "not-last:border-r-blue-500",
            header.column.getIsPinned() &&
              "bg-secondary! dark:bg-secondary! group-hover/trow:bg-surface-muted! dark:group-hover/trow:bg-foreground/5!",
          )}
          style={{
            ...style,
            width: getColumnWidth(),
            ...getCommonPinningStyles(header.column),
          }}
          aria-describedby={header.id}
        >
          {!isPlaceholder || autoHeaderRowSpan
            ? flexRender(header.column.columnDef.header, header.getContext())
            : null}
          {enableResizing && !isPlaceholder && (
            <Button
              onDoubleClick={() => header.column.resetSize()}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              size="icon-sm"
              variant="ghost"
              className={cn(
                "absolute top-1/2 -translate-y-1/2 cursor-col-resize select-none touch-none z-10 size-6 rounded-sm",
                columnResizeDirection === "rtl" ? "-left-3" : "-right-3",
              )}
              style={{
                transform:
                  columnResizeMode === "onEnd" && isResizing
                    ? `translateX(${
                        (columnResizeDirection === "rtl" ? -1 : 1) *
                        (table.getState().columnSizingInfo.deltaOffset ?? 0)
                      }px)`
                    : "",
              }}
            >
              <Tally1Icon />
            </Button>
          )}
        </TableHead>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => header.column.pin("left")}>
          <ArrowLeftIcon />
          Left
        </ContextMenuItem>
        <ContextMenuItem onClick={() => header.column.pin("right")}>
          <ArrowRightIcon />
          Right
        </ContextMenuItem>
        {header.column.getIsPinned() && (
          <>
            <ContextMenuSeparator />
            <ContextMenuItem onClick={() => header.column.pin(false)}>
              <PinOff />
              Unpin
            </ContextMenuItem>
          </>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}
