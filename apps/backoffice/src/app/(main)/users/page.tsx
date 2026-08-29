import { withDefaultPagination } from "@ui/lib/pagination";
import type { TQueryParams } from "@ui/types/globals";

import {
  fetchBackofficeControllerGetUsersDashboard,
  fetchBackofficeControllerListUsers,
} from "@repo/services/backoffice";

import { UsersTable } from "./table";

export default async function UsersPage(props: TQueryParams) {
  const searchParams = await props.searchParams;
  const initialData = await fetchBackofficeControllerListUsers({
    queryParams: withDefaultPagination(searchParams),
  });
  const dashboardInitialData = await fetchBackofficeControllerGetUsersDashboard(
    {},
  );

  return (
    <UsersTable
      searchParams={searchParams}
      initialData={initialData}
      dashboardInitialData={dashboardInitialData}
    />
  );
}
