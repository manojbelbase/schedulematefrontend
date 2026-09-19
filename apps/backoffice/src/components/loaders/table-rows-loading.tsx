import { Table, TableBody, TableCell, TableRow } from "@ui/components/ui/table";
import { cn } from "@ui/lib/utils";

const MIN_ROWS = 12;
const MIN_COLUMNS = 8;

const BAR_WIDTHS = [100, 78, 92, 64, 85, 58, 72, 66];

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
    <div className="rounded-sm overflow-hidden pointer-events-none">
      <Table>
        <TableBody>
          {Array.from({ length: safeRows }).map((_, rowIndex) => (
            <TableRow
              key={`table-row-loading-${rowIndex}`}
              className={cn(
                "border-b border-border last:border-b-0",
                rowIndex === 0 && "bg-secondary! dark:bg-secondary!",
              )}
            >
              {Array.from({ length: safeColumns }).map((_, colIndex) => (
                <TableCell
                  key={`table-cell-loading-${rowIndex}-${colIndex}`}
                  className="py-3"
                >
                  <div
                    className={cn(
                      "h-5 rounded-sm animate-pulse bg-accent",
                      colIndex === safeColumns - 1 && "ml-auto!",
                    )}
                    style={{
                      width: `${
                        BAR_WIDTHS[colIndex % BAR_WIDTHS.length] ?? 100
                      }%`,
                    }}
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
