import { cn } from "@ui/lib/utils";

export default function TablePageHeaderLoading({
  className,
}: {
  className?: string;
}) {
  return (
    <div
      className={cn("h-10 w-56 loading bg-gray-100/50 rounded-sm", className)}
    />
  );
}
