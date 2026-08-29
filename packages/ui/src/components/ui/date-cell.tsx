import { format } from "date-fns";

type DateCellProps = {
  value?: string | Date | null;
  formatString?: string;
  fallback?: string;
  className?: string;
};

export function DateCell({
  value,
  formatString = "dd MMM, yyyy",
  fallback = "—",
  className,
}: DateCellProps) {
  if (!value) return <span className={className}>{fallback}</span>;

  return (
    <span className={className}>
      {format(
        typeof value === "string" ? new Date(value) : value,
        formatString,
      )}
    </span>
  );
}
