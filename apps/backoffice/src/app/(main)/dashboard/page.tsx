import type { TQueryParams } from "@ui/types/globals";

import { fetchBackofficeControllerGetUsersDashboard } from "@repo/services/backoffice";

import { DashboardView } from "./dashboard-view";

export default async function DashboardPage(props: TQueryParams) {
  const searchParams = await props.searchParams;

  const dashboardInitialData = await fetchBackofficeControllerGetUsersDashboard(
    {
      queryParams: {
        dateFrom: searchParams.dateFrom as string | undefined,
        dateTo: searchParams.dateTo as string | undefined,
      },
    },
  );

  return <DashboardView initialData={dashboardInitialData} />;
}
