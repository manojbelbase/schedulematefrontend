import { type CellContext } from "@tanstack/react-table";

import { getSN } from "@ui/lib/table";
import { cn } from "@ui/lib/utils";

import { Checkbox } from "../animate-ui/components/radix/checkbox";

export default function SNCell<T, V>(
  props: CellContext<T, V> & { snTitle?: string },
) {
  return (
    <div className="h-4 min-w-6 w-fit flex items-center justify-center relative pr-1">
      <Checkbox
        checked={props.row.getIsSelected()}
        onCheckedChange={(value) => props.row.toggleSelected(!!value)}
        aria-label="Select row"
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "absolute z-10 transition-all ease-in-out duration-200 opacity-0 group-hover/tcell:opacity-100",
          props.row.getIsSelected() && "opacity-100",
        )}
      />
      <span
        className={cn(
          "transition-all group-hover/tcell:opacity-0",
          props.row.getIsSelected() && "opacity-0",
        )}
      >
        {props.snTitle || getSN(props)}
      </span>
    </div>
  );
}
