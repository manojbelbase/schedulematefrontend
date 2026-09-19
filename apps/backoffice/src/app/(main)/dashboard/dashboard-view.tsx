"use client";

import { useMemo } from "react";
import { parseAsIsoDateTime, parseAsStringLiteral, useQueryStates } from "nuqs";

import DatePicker, {
  DEFAULT_DATE_RANGE_SELECTOR_PRESET,
  getFromToByPreset,
  SUPPORTED_PRESET_VALUES,
  type TDatePickerProps,
} from "@ui/components/input/date-picker";

import {
  useBackofficeControllerGetUsersDashboard,
  type UsersDashboardResponse,
} from "@repo/services/backoffice";

import { ApiUsageCard } from "@/components/dashboard/api-usage-card";
import { CalendarConnectionCard } from "@/components/dashboard/calendar-connection-card";
import { ChatRoleChart } from "@/components/dashboard/chat-role-chart";
import { ProviderBreakdownCard } from "@/components/dashboard/provider-breakdown-card";
import { SignupMethodDonut } from "@/components/dashboard/signup-method-donut";
import { StatCards } from "@/components/dashboard/stat-cards";
import { UsersByRoleChart } from "@/components/dashboard/users-by-role-chart";

export function DashboardView({
  initialData,
}: {
  initialData: UsersDashboardResponse;
}) {
  const [params, setParams] = useQueryStates({
    dateFrom: parseAsIsoDateTime,
    dateTo: parseAsIsoDateTime,
    preset: parseAsStringLiteral(SUPPORTED_PRESET_VALUES),
  });

  const date = useMemo(() => {
    if (!params.dateFrom || !params.dateTo) return undefined;
    return { from: params.dateFrom, to: params.dateTo };
  }, [params.dateFrom, params.dateTo]);

  const pickerValue: TDatePickerProps["value"] = {
    date,
    preset: params.preset ?? undefined,
  };

  const { data } = useBackofficeControllerGetUsersDashboard(
    {
      queryParams: {
        dateFrom: params.dateFrom?.toISOString(),
        dateTo: params.dateTo?.toISOString(),
      },
    },
    { placeholderData: initialData },
  );

  const stats = data?.data;

  const previousRange = useMemo(() => {
    if (!params.dateFrom || !params.dateTo) return undefined;
    const from = params.dateFrom.getTime();
    const to = params.dateTo.getTime();
    const span = to - from;
    return {
      dateFrom: new Date(from - span - 1).toISOString(),
      dateTo: new Date(from - 1).toISOString(),
    };
  }, [params.dateFrom, params.dateTo]);

  const { data: previousData } = useBackofficeControllerGetUsersDashboard(
    { queryParams: previousRange },
    { enabled: Boolean(previousRange) },
  );

  const previousStats = previousData?.data;

  const handleReset = () => {
    const defaultRange = getFromToByPreset(
      DEFAULT_DATE_RANGE_SELECTOR_PRESET,
      new Date(),
    );
    void setParams({
      dateFrom: defaultRange?.from ?? null,
      dateTo: defaultRange?.to ?? null,
      preset: DEFAULT_DATE_RANGE_SELECTOR_PRESET,
    });
  };

  return (
    <div className="flex flex-col min-h-0 flex-1">
      <header className="w-full shrink-0 sticky top-0 z-30 border-b border-border/50 bg-background/80 backdrop-blur-sm">
        <div className="flex justify-between items-center py-1 sm:py-3 gap-2">
          <div className="flex items-center gap-2">
            <h1 className="text-base sm:text-lg font-semibold">Dashboard</h1>
          </div>
          <DatePicker
            value={pickerValue}
            onChange={(next) => {
              void setParams({
                dateFrom: next.date?.from ?? null,
                dateTo: next.date?.to ?? null,
                preset: next.preset ?? null,
              });
            }}
            onFilterRemove={handleReset}
          />
        </div>
      </header>
      <div className="w-full overflow-auto pt-4 pb-4 flex flex-col gap-3 custom-scrollbar-thin">
        <StatCards stats={stats} previousStats={previousStats} />
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-12">
          <ApiUsageCard stats={stats} className="lg:col-span-4" />
          <UsersByRoleChart stats={stats} className="lg:col-span-4" />
          <SignupMethodDonut stats={stats} className="lg:col-span-4" />
          <ChatRoleChart stats={stats} className="lg:col-span-6" />
          <CalendarConnectionCard stats={stats} className="lg:col-span-6" />
          <ProviderBreakdownCard stats={stats} className="lg:col-span-12" />
        </div>
      </div>
    </div>
  );
}
