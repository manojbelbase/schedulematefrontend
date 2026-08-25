import FilterLoading from "@/components/loaders/filter-loading";
import PaginationLoading from "@/components/loaders/pagination-loading";
import TablePageHeaderLoading from "@/components/loaders/table-page-header-loading";

type TProps = {
  children?: React.ReactNode;
};

export default function TableLoading({ children }: TProps) {
  return (
    <div className="space-y-6 flex flex-col flex-1 pt-4">
      <div className="space-y-4 bg-gray-100/10 rounded-sm">
        <div className="flex w-full items-center justify-between">
          <TablePageHeaderLoading />
          <TablePageHeaderLoading className="w-80" />
        </div>
        <FilterLoading />
      </div>
      {children}
      <div className="loading flex-1 bg-gray-100/60 rounded-sm" />
      <PaginationLoading />
    </div>
  );
}
