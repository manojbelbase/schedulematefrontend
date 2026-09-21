import { withDefaultPagination } from "@ui/lib/pagination";
import type { TQueryParams } from "@ui/types/globals";

import { fetchBackofficeAccessRequestControllerList } from "@repo/services/backoffice";

import { AccessRequestsTable } from "@/components/pages/access-requests/table";

export const metadata = { title: "Access Requests" };

export default async function AccessRequestsPage(props: TQueryParams) {
  const searchParams = await props.searchParams;
  const initialData = await fetchBackofficeAccessRequestControllerList({
    queryParams: withDefaultPagination(searchParams),
  });

  return (
    <AccessRequestsTable
      searchParams={searchParams}
      initialData={initialData}
    />
  );
}
