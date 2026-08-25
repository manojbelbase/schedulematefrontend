import { Table, TableBody, TableCell, TableRow } from "@ui/components/ui/table";
import { cn } from "@ui/lib/utils";

const MIN_ROWS = 15;
const MIN_COLUMNS = 8;

type TableRowsLoadingProps = {
  rows?: number;
  columns?: number;
};

export default function TableRowsLoading({
  rows = MIN_ROWS,
  columns = MIN_COLUMNS,
}: TableRowsLoadingProps) {
  const safeRows = Math.max(rows, MIN_ROWS);
  const safeColumns = Math.max(columns, MIN_COLUMNS);

  return (
    <div className="rounded-md overflow-hidden pointer-events-none">
      <Table>
        <TableBody>
          {Array.from({ length: safeRows }).map((_, rowIndex) => (
            <TableRow
              key={`table-row-loading-${rowIndex}`}
              className={cn(
                "border-b border-gray-100 last:border-b-0 dark:border-gray-800",
                rowIndex === 0 && "bg-[#f9fbfd]! dark:bg-background",
              )}
            >
              {Array.from({ length: safeColumns }).map((_, colIndex) => (
                <TableCell
                  key={`table-cell-loading-${rowIndex}-${colIndex}`}
                  className="py-3"
                >
                  <div
                    className={cn(
                      "h-5 rounded-sm animate-pulse bg-gray-200/50 dark:bg-gray-700",
                    )}
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
