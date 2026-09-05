import { withDefaultPagination } from "@ui/lib/pagination";
import type { TQueryParams } from "@ui/types/globals";

import {
  fetchBackofficeControllerGetUsersDashboard,
  fetchBackofficeControllerListUsers,
} from "@repo/services/backoffice";

import { UsersTable } from "./table";

export const metadata = { title: "Users" };

export default async function UsersPage(props: TQueryParams) {
  const searchParams = await props.searchParams;
  const initialData = await fetchBackofficeControllerListUsers({
    queryParams: withDefaultPagination(searchParams),
  });
  const dashboardInitialData = await fetchBackofficeControllerGetUsersDashboard(
    {
      queryParams: {
        dateFrom: searchParams.dateFrom as string | undefined,
        dateTo: searchParams.dateTo as string | undefined,
      },
    },
  );

  return (
    <UsersTable
      searchParams={searchParams}
      initialData={initialData}
      dashboardInitialData={dashboardInitialData}
    />
  );
}
