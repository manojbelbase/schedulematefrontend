import { Fragment, useMemo, type CSSProperties } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  flexRender,
  type Cell,
  type Row,
  type Table,
} from "@tanstack/react-table";

import ModalTrigger, {
  type TTriggerProps,
} from "@ui/components/deployables/trigger";
import { TABLE_CONSTANTS } from "@ui/config/constants";
import { getCommonPinningStyles } from "@ui/lib/table";
import { cn } from "@ui/lib/utils";
import { useTableUiConfigStore } from "@ui/zustand/table/expandable-textarea";

import { TableCell } from "../ui/table";

type TProps<TData> = {
  cell: Cell<TData, unknown>;
  table: Table<TData>;
  row: Row<TData>;
  className?: string;
};

export default function TCellComponent<TData>({
  cell,
  table,
  row,
  className,
}: TProps<TData>) {
  type TRightClickProps = {
    id: string;
    row: TData;
    fromRightClick: boolean;
    children: React.ReactNode;
  };
  const { isDragging, setNodeRef, transform } = useSortable({
    id: cell.column.id,
    disabled: !!cell.column.getIsPinned(),
  });
  const { textWrapped } = useTableUiConfigStore();
  const { deployable, stopRowClickPropagation } =
    cell.column.columnDef.meta || {};

  const style: CSSProperties = {
    opacity: isDragging ? 0.8 : 1,
    position: "relative",
    transform: isDragging ? CSS.Translate.toString(transform) : undefined,
    transition: isDragging ? "width transform 0.2s ease-in-out" : undefined,
    zIndex: isDragging ? 50 : 0,
    pointerEvents: stopRowClickPropagation ? "none" : undefined,
    willChange: isDragging ? "transform" : undefined,
  };

  const Trigger = deployable ? ModalTrigger : Fragment;
  const { onRightClick } = table.options.meta || {};

  const [RightClickComponent, idForMenu] = useMemo(() => {
    return onRightClick
      ? [
          onRightClick(row.original).component,
          onRightClick(row.original).idforRowMenu,
        ]
      : [Fragment, undefined];
  }, [onRightClick, row]);
  const shouldClamp =
    (textWrapped ?? true) && cell.column.id !== TABLE_CONSTANTS.SN_HEADER;

  const getColumnWidth = () => {
    if (cell.column.id === TABLE_CONSTANTS.SN_HEADER) {
      return TABLE_CONSTANTS.SN_WIDTH;
    } else if (cell.column.id === TABLE_CONSTANTS.ACTIONS_HEADER) {
      return TABLE_CONSTANTS.ACTIONS_WIDTH;
    } else return `calc(var(--col-${cell.column.id}-size) * 1px)`;
  };

  return (
    <Trigger
      {...((deployable
        ? { ...deployable, stopPropagation: true }
        : {}) as TTriggerProps)}
    >
      <RightClickComponent
        {...(RightClickComponent !== Fragment
          ? ({
              fromRightClick: true,
              id: idForMenu,
              row: row.original,
            } as TRightClickProps)
          : ({
              fromRightClick: false,
              id: idForMenu,
              row: row.original,
            } as TRightClickProps))}
      >
        <TableCell
          className={cn(
            cell.column.getIsPinned() && "max-w-sm! py-2",
            [
              TABLE_CONSTANTS.SN_HEADER,
              TABLE_CONSTANTS.ACTIONS_HEADER,
            ].includes(cell.column.id) &&
              cn(
                "w-0! min-w-0! max-w-fit!",
                cell.column.getIsPinned() && "min-w-8!",
              ),
            "group/tcell max-w-sm!",
            cell.column.getIsResizing() && "not-last:border-r-blue-500",
            className,
          )}
          style={{
            ...style,
            width: getColumnWidth(),
            minWidth:
              cell.column.columnDef.size || cell.column.columnDef.minSize,
            maxWidth:
              cell.column.columnDef.size || cell.column.columnDef.maxSize,
            ...getCommonPinningStyles(cell.column),
          }}
          ref={setNodeRef}
        >
          <div
            className={cn(
              "[&_]:break-all whitespace-nowrap text-wrap!",
              shouldClamp && "line-clamp-1!",
              cell.column.id === TABLE_CONSTANTS.ACTIONS_HEADER &&
                "flex! justify-end! items-center",
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        </TableCell>
      </RightClickComponent>
    </Trigger>
  );
}
